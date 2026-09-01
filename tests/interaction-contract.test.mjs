import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(() => vite.close());

test("entering the desktop cannot reuse the intro button as a focused photo icon", async () => {
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");
  assert.match(source, /<main key="intro" className="intro-screen"/);
  assert.match(source, /<main key="desktop" className="computer-desktop"/);
  assert.doesNotMatch(css, /\.desktop-icons button:focus\s+\.desktop-app/);
  assert.match(css, /\.desktop-icons button:focus-visible \.desktop-app\s*\{[^}]*outline:/);
  assert.doesNotMatch(css, /\.desktop-icons button:hover \.desktop-app\s*\{[^}]*outline:/);
});

test("every exposed game button has an action or submits a handled form", async () => {
  const failures = [];
  let buttons = 0;
  for (const name of ["app/page.tsx", "app/chapter-one.tsx", "app/desktop-evidence.tsx", "app/search-box.tsx", "app/forum-page.tsx", "app/search-results.tsx", "app/activity-page.tsx"]) {
    const source = ts.createSourceFile(name, await readFile(path.join(root, name), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        if (["button", "Button"].includes(node.tagName.getText(source))) {
          buttons++;
          const attrs = node.attributes.properties;
          const click = attrs.find((a) => a.name?.getText(source) === "onClick");
          const type = attrs.find((a) => a.name?.getText(source) === "type");
          let form = node.parent;
          while (form && !(ts.isJsxElement(form) && form.openingElement.tagName.getText(source) === "form")) form = form.parent;
          const submits = type?.initializer?.text === "submit" && form?.openingElement.attributes.properties.some((a) => a.name?.getText(source) === "onSubmit");
          if (!click?.initializer && !submits) failures.push(`${name}:${source.getLineAndCharacterOfPosition(node.pos).line + 1}`);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.ok(buttons > 50, "audit must include all three game surfaces");
  assert.deepEqual(failures, [], "buttons without a connected action");
});

test("photo assets exist, are unique, and restored images remain cropped", async () => {
  const { visiblePhotos, DELETED_PHOTO } = await vite.ssrLoadModule("/lib/photo-library.ts");
  const initial = visiblePhotos(false);
  const restored = visiblePhotos(true);
  assert.equal(new Set(initial.map((photo) => photo.src)).size, initial.length);
  assert.equal(new Set(restored.map((photo) => photo.id)).size, restored.length);
  assert.equal(restored.length, initial.length + 1);
  assert.equal(restored.at(-1).id, DELETED_PHOTO.id);
  assert.equal(restored.at(-1).cropped, true, "restoring a crop must not reveal a supposed original");
  for (const photo of restored) await access(path.join(root, "public", photo.src));
});

test("restoring the deleted image empties the trash and exposes that file in the album", async () => {
  const { DesktopPanel } = await vite.ssrLoadModule("/app/desktop-evidence.tsx");
  const render = (kind, restoredPhoto) => renderToStaticMarkup(React.createElement(DesktopPanel, {
    kind, restoredPhoto, onRestorePhoto() {}, onClose() {}, onDownloads() {}, onPanelChange() {},
  }));
  assert.match(render("trash", false), /恢复到旅行照片/);
  assert.match(render("trash", false), /IMG_4821_crop.jpg/);
  assert.doesNotMatch(render("photos", false), /IMG_4821_crop.jpg/);
  assert.match(render("photos", true), /IMG_4821_crop.jpg/);
  assert.match(render("trash", true), /回收站为空/);
  for (const kind of ["photos", "trash", "files"]) {
    assert.doesNotMatch(render(kind, false), /给你\.txt|IMG_4818|未找到原图|session07_notice_old/);
  }
});

test("photo preview exposes navigation, zoom controls, and file details", async () => {
  const { PhotoViewer } = await vite.ssrLoadModule("/app/desktop-evidence.tsx");
  const { DELETED_PHOTO } = await vite.ssrLoadModule("/lib/photo-library.ts");
  const html = renderToStaticMarkup(React.createElement(PhotoViewer, { photo: DELETED_PHOTO, onClose() {}, onPrevious() {}, onNext() {} }));
  for (const label of ["返回列表", "上一张照片", "下一张照片", "缩小照片", "放大照片", "拍摄时间", "裁剪副本"]) assert.ok(html.includes(label), label);
  assert.match(html, /is-cropped/);
  assert.match(html, /width:min\(100%, calc\(\(min\(47vh, 440px\) - 24px\)/);
  assert.match(html, /适合窗口/);
});

test("deleted photos cannot be opened through downloads and every photo fits both viewport bounds", async () => {
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.doesNotMatch(source, /IMG_4821_crop|DELETED_PHOTO|PhotoViewer|下载预览副本/);
  const { visiblePhotos } = await vite.ssrLoadModule("/lib/photo-library.ts");
  const { PhotoViewer } = await vite.ssrLoadModule("/app/desktop-evidence.tsx");
  for (const photo of visiblePhotos(true)) {
    const ratio = photo.width / photo.height / (photo.cropped ? 1.28 : 1);
    const html = renderToStaticMarkup(React.createElement(PhotoViewer, { photo, onClose() {} }));
    const renderedRatio = Number(html.match(/\* ([\d.]+)\)\)/)?.[1]);
    assert.ok(Math.abs(renderedRatio - ratio) < 1e-12);
    for (const [width, height] of [[280, 600], [680, 768], [1000, 1080]]) {
      const availableHeight = Math.min(height * 0.47, 440) - 24;
      const imageWidth = Math.min(width - 24, availableHeight * ratio);
      assert.ok(imageWidth <= width - 24);
      assert.ok(imageWidth / ratio <= availableHeight + 0.001);
    }
  }
});

test("the itinerary note uses only the requested copy and retains five checkboxes", async () => {
  const { NotesPanel } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  const html = renderToStaticMarkup(React.createElement(NotesPanel, {
    checked: ["south"], onCheck() {}, onClose() {},
  }));
  assert.match(html, /<h1>雾汀旅游之旅<\/h1>/);
  assert.match(html, /都在<strong>泊岸旅行<\/strong>预定的/);
  assert.doesNotMatch(html, /账号没退|剩下这些|照着日期|灯塔那张电子票在下载里|别到门口|盐场记得|不怕脏|私人记事本|勾选仅作标记|雾汀，慢慢玩/);
  assert.equal((html.match(/aria-label="记事本勾选/g) ?? []).length, 5);
  assert.equal((html.match(/class="is-checked"/g) ?? []).length, 1);
});

test("the shared itinerary PDF is absent from downloads and the file folder", async () => {
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.doesNotMatch(source, /雾汀行程_共同版\.pdf|雾汀共同旅行计划|WUTING \/ OUR TRIP/);
  const { DesktopPanel } = await vite.ssrLoadModule("/app/desktop-evidence.tsx");
  const html = renderToStaticMarkup(React.createElement(DesktopPanel, {
    kind: "files", restoredPhoto: false, onRestorePhoto() {}, onClose() {}, onDownloads() {}, onPanelChange() {},
  }));
  assert.doesNotMatch(html, /共同版|共同旅行/);
  assert.doesNotMatch(html, /订单与票据/);
  assert.match(html, /灯塔接驳电子票\.pdf/);
  const fileTable = html.match(/<div class="file-table">([\s\S]*?)<\/div>/)?.[1] ?? "";
  assert.equal((fileTable.match(/<button\b/g) ?? []).length, 1);
  const panelSource = await readFile(path.join(root, "app/desktop-evidence.tsx"), "utf8");
  assert.match(panelSource, /onClick=\{\(\) => onDownloads\("灯塔接驳电子票\.pdf"\)\}/);
});

test("sibling components never share a reconciliation key when navigating materials", async () => {
  const failures = [];
  for (const name of ["app/page.tsx", "app/chapter-one.tsx", "app/desktop-evidence.tsx", "app/search-box.tsx", "app/forum-page.tsx", "app/search-results.tsx", "app/activity-page.tsx"]) {
    const source = ts.createSourceFile(name, await readFile(path.join(root, name), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
        const keys = new Set();
        for (const child of node.children) {
          const opening = ts.isJsxElement(child) ? child.openingElement : ts.isJsxSelfClosingElement(child) ? child : null;
          const key = opening?.attributes.properties.find((attr) => ts.isJsxAttribute(attr) && attr.name.getText(source) === "key");
          if (!key?.initializer) continue;
          const value = key.initializer.getText(source);
          if (keys.has(value)) failures.push(`${name}:${source.getLineAndCharacterOfPosition(child.pos).line + 1}: duplicate sibling key ${value}`);
          keys.add(value);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.deepEqual(failures, [], "duplicate keys can leave old search forms behind after query changes");
});

test("the search page has a labelled input and a submit button that rejects blank text", async () => {
  const { SearchBox } = await vite.ssrLoadModule("/app/search-box.tsx");
  const render = (query) => renderToStaticMarkup(React.createElement(SearchBox, { query, onSearch() {} }));
  for (const query of ["", "   "]) {
    const html = render(query);
    assert.match(html, /<form[^>]*role="search"/);
    assert.match(html, /aria-label="搜索网站或关键词"/);
    assert.match(html, /<button[^>]*type="submit"[^>]*\sdisabled(?:=|[\s>])/);
  }
  const populated = render("泊岸旅行");
  assert.equal((populated.match(/<form\b/g) ?? []).length, 1);
  assert.equal((populated.match(/<input\b/g) ?? []).length, 1);
  assert.equal((populated.match(/<button\b/g) ?? []).length, 1);
  assert.doesNotMatch(populated, /<svg\b/);
  assert.match(populated, /value="泊岸旅行"/);
  assert.doesNotMatch(populated, /<button[^>]*\sdisabled(?:=|[\s>])/);
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(source, /<SearchBox key=\{`search-box:\$\{query\}`\} query=\{query\} onSearch=\{submitBrowserInput\}/);
  assert.match(source, /<SearchResults key=\{`search-results:\$\{query\}`\}/);
  assert.doesNotMatch(source, /在上方地址栏输入网站名称或关键词/);
  assert.equal((source.match(/<SearchBox\b/g) ?? []).length, 1);
  assert.doesNotMatch(source, /aria-label="搜索"|<Search\s/);
  assert.match(source, /<TabsContent value="search"/);
});

test("the lighthouse ticket and dated forum reply expose the timeline without explaining it", async () => {
  const { LighthouseTicket } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  const { ForumPage, LIGHTHOUSE_THREAD, FORUM_THREADS } = await vite.ssrLoadModule("/app/forum-page.tsx");
  const ticket = renderToStaticMarkup(React.createElement(LighthouseTicket));
  assert.match(ticket, /<dt>购票时间<\/dt><dd>8月18日 23:47<\/dd>/);
  assert.match(ticket, /<dt>预订人<\/dt><dd>周惜<\/dd>/);
  assert.match(ticket, /<dt>乘客<\/dt><dd>林知还、周惜<\/dd>/);
  assert.match(ticket, /7642/);
  const reply = FORUM_THREADS[LIGHTHOUSE_THREAD].replies.find((item) => item.author === "潮汐失眠");
  assert.equal(reply.date, "8月22日 21:14");
  assert.match(reply.text, /刚说服朋友陪我去了，两个人第一次来/);
  for (const unlocked of [false, true]) {
    const html = renderToStaticMarkup(React.createElement(ForumPage, { unlocked, thread: LIGHTHOUSE_THREAD, setThread() {} }));
    assert.match(html, /<span>潮汐失眠<\/span><time>8月22日 21:14<\/time>/);
    assert.ok(html.includes(reply.text));
    assert.doesNotMatch(html + ticket, /<mark\b|data-clue|提前购买|日期矛盾|你还没答应|这说明/);
  }
});

test("the discussion opens from its forum row, returns to the list, and has an independent history entry", async () => {
  const { ForumPage, LIGHTHOUSE_THREAD } = await vite.ssrLoadModule("/app/forum-page.tsx");
  let selected = null;
  function elements(node) {
    if (!React.isValidElement(node)) return [];
    return [node, ...React.Children.toArray(node.props.children).flatMap(elements)];
  }
  const props = { unlocked: false, thread: null, setThread(value) { selected = value; } };
  const list = ForumPage(props);
  const row = elements(list).find((element) => element.type === "button" && elements(element).some((child) => child.type === "h3" && child.props.children === LIGHTHOUSE_THREAD));
  assert.ok(row, "travel discussion must be accessible before cancellations");
  row.props.onClick();
  assert.equal(selected, LIGHTHOUSE_THREAD);
  const detail = ForumPage({ ...props, thread: selected });
  elements(detail).find((element) => element.props.className === "forum-back").props.onClick();
  assert.equal(selected, null);
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(source, /\["21:23", LIGHTHOUSE_THREAD, "wuting-talk\.example\/thread\/60285", "forum", LIGHTHOUSE_THREAD\]/);
  const { resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("wuting-talk.example/thread/60285", false), { tab: "forum", query: LIGHTHOUSE_THREAD });
  assert.doesNotMatch(renderToStaticMarkup(list), /有人参加过安时/);
});

test("the discarded first-guest change is removed without changing mountain cancellation requirements", async () => {
  const source = await readFile(path.join(root, "app/chapter-one.tsx"), "utf8");
  assert.doesNotMatch(source, /第一入住人|信息修改记录|ota-change/);
  assert.match(source, /查看退款规则/);
  assert.match(source, /我已阅读退款规则/);
});

test("note position is bounded and retained independently of whether the window is open", async () => {
  const { clampNotePosition } = await vite.ssrLoadModule("/lib/window-position.ts");
  const panel = { width: 400, height: 480 };
  const desktop = { width: 1440, height: 900 };
  assert.deepEqual(clampNotePosition({ x: -99, y: -99 }, panel, desktop), { x: 8, y: 34 });
  assert.deepEqual(clampNotePosition({ x: 2000, y: 2000 }, panel, desktop), { x: 1032, y: 356 });
  assert.deepEqual(clampNotePosition({ x: 200, y: 100 }, panel, desktop), { x: 200, y: 100 });
  assert.deepEqual(clampNotePosition({ x: 999, y: 999 }, panel, { width: 320, height: 400 }), { x: 8, y: 34 });
  const { NotesPanel } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  const html = renderToStaticMarkup(React.createElement(NotesPanel, { position: { x: 200, y: 100 }, checked: ["south"], onPositionChange() {}, onCheck() {}, onClose() {} }));
  assert.match(html, /left:200px;top:100px;transform:none/);
  assert.match(html, /aria-label="记事本标题栏，可拖动或按方向键移动"/);
  assert.equal((html.match(/class="is-checked"/g) ?? []).length, 1);
  const home = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(home, /<NotesPanel position=\{notePosition\} onPositionChange=\{setNotePosition\}/);
  const hook = await readFile(path.join(root, "app/use-note-drag.ts"), "utf8");
  for (const action of ["setPointerCapture", "releasePointerCapture", "onPointerCancel", "onLostPointerCapture", "onKeyDown"]) assert.ok(hook.includes(action));
  assert.match(hook, /closest\("button"\)/);
  assert.match(hook, /window\.removeEventListener\("resize", fit\)/);
});

test("activity aliases resolve while invalid addresses cannot bypass the ride gate", async () => {
  const { isActivitySearch, resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  for (const input of ["安时活动服务", " 安时 活动 服务 ", "安时活动服务官网", "安时接送", "ANSHI"]) assert.equal(isActivitySearch(input), true, input);
  assert.equal(isActivitySearch("安时间活动服务"), false);
  assert.equal(resolveBrowserInput("  ", false), null);
  assert.deepEqual(resolveBrowserInput("安时活动服务", false), { tab: "search", query: "安时活动服务" });
  for (const input of ["anshi.example/activities", "https://anshi.example/activities/"]) assert.deepEqual(resolveBrowserInput(input, false), { tab: "activity", query: "" });
  for (const input of ["anshi.example/typo", "https://boan.example/wrong", "https://bogus.example/", "https://anshi.example.evil/activities", "https://fake@anshi.example/activities"]) assert.equal(resolveBrowserInput(input, true).tab, "not-found", input);
  assert.equal(resolveBrowserInput("anshi.example/booking/WT-0831-2140", false).tab, "not-found");
  assert.equal(resolveBrowserInput("anshi.example/booking/WT-0831-2140", true).tab, "ride");
  assert.equal(resolveBrowserInput("wuting-talk.example/thread/60307", false).tab, "not-found");
  assert.equal(resolveBrowserInput("wuting-talk.example/thread/60307", true).tab, "forum");
});

test("activity search has one result and wrong text or URLs show explicit recoverable feedback", async () => {
  const { SearchResults, BrowserNotFound } = await vite.ssrLoadModule("/app/search-results.tsx");
  const render = (query) => renderToStaticMarkup(React.createElement(SearchResults, { query, unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openWitness() {}, openObituary() {} }));
  const html = render("安时活动服务");
  assert.match(html, /安时活动服务 · 雾汀生命关怀/);
  assert.equal((html.match(/<button\b/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<form\b|<input\b/);
  assert.match(render("安时间活动服务"), /未找到与“安时间活动服务”相关的网页/);
  assert.doesNotMatch(render("安时间活动服务"), /推荐关键词|试试搜索/);
  const missing = renderToStaticMarkup(React.createElement(BrowserNotFound, { address: "wrong.example", onSearch() {} }));
  assert.match(missing, /无法打开此页面/);
  assert.match(missing, /返回雾搜/);
  assert.match(missing, /wrong.example/);
});

test("the activity homepage is reachable from the ride and keeps ride access gated", async () => {
  const { ActivityPage } = await vite.ssrLoadModule("/app/activity-page.tsx");
  const publicPage = renderToStaticMarkup(React.createElement(ActivityPage, { onOpenArchive() {} }));
  assert.match(publicPage, /公开归档 · 共6期/);
  assert.equal((publicPage.match(/class="activity-archive-list"[\s\S]*?<\/div>/)?.[0].match(/<button/g) ?? []).length, 6);
  assert.doesNotMatch(publicPage, /第七期|海边同行|归潮见证/);
  assert.equal((publicPage.match(/<details>/g) ?? []).length, 3);
  assert.doesNotMatch(publicPage, /查看我的接送订单|替死|借命|邪教/);
  assert.match(renderToStaticMarkup(React.createElement(ActivityPage, { onOpenRide() {}, onOpenArchive() {} })), /查看我的接送订单/);
  const { SecretRide } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  const ride = renderToStaticMarkup(React.createElement(SecretRide, { onOpenActivity() {} }));
  assert.match(ride, /<button class="ride-source-link"/);
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(source, /openActivity=\{\(\) => navigate\("activity"\)\}/);
  assert.match(source, /<SecretRide onOpenActivity=\{\(\) => navigate\("activity"\)\}/);
});

test("the unlisted seventh archive must be reached by changing 06 to 07", async () => {
  const { resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  for (const issue of ["01", "02", "03", "04", "05", "06"]) {
    assert.deepEqual(resolveBrowserInput(`anshi.example/activities/archive/${issue}`, true), { tab: "activity", query: `archive/${issue}` });
  }
  assert.deepEqual(resolveBrowserInput("anshi.example/activities/archive/07", true), { tab: "activity", query: "archive/07" });
  assert.equal(resolveBrowserInput("anshi.example/activities/archive/08", true).tab, "not-found");
  const { ActivityArchivePage, HiddenSeventhPage } = await vite.ssrLoadModule("/app/activity-page.tsx");
  const sixth = renderToStaticMarkup(React.createElement(ActivityArchivePage, { issue: "06", onBack() {} }));
  assert.match(sixth, /ARCHIVE \/ 06/);
  assert.doesNotMatch(sixth, /第七期|归潮见证/);
  const seventh = renderToStaticMarkup(React.createElement(HiddenSeventhPage, { onBack() {} }));
  assert.match(seventh, /ARCHIVE \/ 07/);
  assert.match(seventh, /此页面未列入公开归档/);
  for (const line of ["归期没有告诉家里", "潮落时，他说自己不怕了", "见不到明天也没关系", "证词会替我们留下来"]) assert.ok(seventh.includes(line));
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  assert.doesNotMatch(search, /第七期生前告别体验|session-07|图片匹配 · 低清存档/);
  const home = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.doesNotMatch(home, /session07_notice_old|第七期参与须知/);
});

test("the optional fraud trail requires the acrostic and then the witness's real name", async () => {
  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openWitness() {}, openObituary() {} };
  const renderSearch = (query) => renderToStaticMarkup(React.createElement(SearchResults, { ...props, query }));
  assert.match(renderSearch("归潮见证"), /他替我走了最后一程/);
  assert.match(renderSearch("程叙白"), /程叙白先生讣告/);
  for (const query of ["第七期", "雨停以后", "讣告", "安时骗局"]) assert.match(renderSearch(query), /未找到与/);
  const { WitnessPage, SurvivorProfile, ObituaryPage } = await vite.ssrLoadModule("/app/activity-page.tsx");
  const witness = renderToStaticMarkup(React.createElement(WitnessPage, { onOpenProfile() {} }));
  assert.match(witness, /8月17日，阿岚在临川北岸溺亡/);
  assert.match(witness, /雨停以后/);
  const profile = renderToStaticMarkup(React.createElement(SurvivorProfile));
  assert.match(profile, /原简介：程叙白，肺腺癌晚期/);
  assert.match(profile, /8月19日 09:00/);
  assert.match(profile, /原账号联系人于8月18日申请停用/);
  const obituary = renderToStaticMarkup(React.createElement(ObituaryPage));
  assert.match(obituary, /8月17日 03:26/);
  assert.match(obituary, /8月18日 10:42/);
  assert.doesNotMatch(witness + profile + obituary, /这说明|账号已被组织接管|骗局已揭穿/);
});

test("the crop hides session seven while the full corridor is last in the mountain inn gallery", async () => {
  const { MOUNTAIN_INN_GALLERY } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  assert.equal(MOUNTAIN_INN_GALLERY.length, 3);
  assert.deepEqual(MOUNTAIN_INN_GALLERY.slice(0, 2).map((photo) => photo.src), ["./game/mountain-inn-exterior.webp", "./game/mountain-inn-twin-room.webp"]);
  assert.equal(MOUNTAIN_INN_GALLERY.at(-1).src, "./game/inn-corridor-original.webp");
  assert.match(MOUNTAIN_INN_GALLERY.at(-1).alt, /第七期/);
  for (const photo of MOUNTAIN_INN_GALLERY) await access(path.join(root, "public", photo.src));
  const chapter = await readFile(path.join(root, "app/chapter-one.tsx"), "utf8");
  assert.match(chapter, /order\.id === "mountain" && <section className="inn-gallery"/);
  assert.match(chapter, /setHotelPhotoIndex\(0\)/);
  assert.match(chapter, /item\.category === "酒店" \? <img src=\{item\.image\}/);
  assert.doesNotMatch(chapter, /hotel-crop|南岸民宿走廊/);
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");
  assert.match(css, /\.evidence-image\.is-cropped img, \.evidence-thumbnail\.is-cropped img \{ width: 128%; max-width: none; transform: translateX\(-22%\); \}/);
});
