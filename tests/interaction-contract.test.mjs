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

async function readProjectCss() {
  return Promise.all([
    "app/globals.css",
    "app/styles/base.css",
    "app/styles/game-shell.css",
    "app/styles/investigation-pages.css",
    "app/styles/responsive.css",
  ].map((name) => readFile(path.join(root, name), "utf8"))).then((files) => files.join("\n"));
}

test("entering the desktop cannot reuse the intro button as a focused photo icon", async () => {
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const css = await readProjectCss();
  assert.match(source, /<main key="intro" className="intro-screen"/);
  assert.match(source, /<main key="desktop" className="computer-desktop"/);
  assert.doesNotMatch(css, /\.desktop-icons button:focus\s+\.desktop-app/);
  assert.match(css, /\.desktop-icons button:focus-visible \.desktop-app\s*\{[^}]*outline:/);
  assert.doesNotMatch(css, /\.desktop-icons button:hover \.desktop-app\s*\{[^}]*outline:/);
});

test("every exposed game button has an action or submits a handled form", async () => {
  const failures = [];
  let buttons = 0;
  for (const name of ["app/page.tsx", "app/browser-record-pages.tsx", "app/chapter-one.tsx", "app/desktop-evidence.tsx", "app/search-box.tsx", "app/forum-page.tsx", "app/search-results.tsx", "app/activity-page.tsx", "app/cat-trail-pages.tsx", "app/founder-trail-pages.tsx", "app/founder-deep-pages.tsx", "app/anshi-internal-pages.tsx"]) {
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
  for (const name of ["app/page.tsx", "app/browser-record-pages.tsx", "app/chapter-one.tsx", "app/desktop-evidence.tsx", "app/search-box.tsx", "app/forum-page.tsx", "app/search-results.tsx", "app/activity-page.tsx", "app/founder-trail-pages.tsx", "app/founder-deep-pages.tsx"]) {
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
  const source = await readFile(path.join(root, "app/browser-record-pages.tsx"), "utf8");
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

test("photos, trash, and files share the same retained draggable window position", async () => {
  const { DesktopPanel } = await vite.ssrLoadModule("/app/desktop-evidence.tsx");
  const render = (kind) => renderToStaticMarkup(React.createElement(DesktopPanel, {
    kind, position: { x: 118, y: 76 }, onPositionChange() {}, restoredPhoto: false,
    onRestorePhoto() {}, onClose() {}, onDownloads() {}, onPanelChange() {},
  }));
  for (const [kind, title] of [["photos", "旅行照片"], ["trash", "回收站"], ["files", "雾汀旅行"]]) {
    const html = render(kind);
    assert.match(html, /left:118px;top:76px;transform:none/);
    assert.ok(html.includes(`${title}窗口标题栏，可拖动或按方向键移动`));
  }
  const home = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(home, /const \[evidencePosition, setEvidencePosition\] = useState<WindowPoint \| null>\(null\)/);
  assert.match(home, /<DesktopPanel key=\{desktopPanel\} position=\{evidencePosition\} onPositionChange=\{setEvidencePosition\}/);
  const css = await readProjectCss();
  assert.match(css, /\.evidence-window > header \{ cursor: grab; touch-action: none; user-select: none; \}/);
  assert.match(css, /\.evidence-window > header\[data-dragging="true"\] \{ cursor: grabbing; \}/);
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
  assert.deepEqual(resolveBrowserInput("guichao.example/home", true), { tab: "activity", query: "community" });
  assert.deepEqual(resolveBrowserInput("guichao.example/records/session-06", true), { tab: "activity", query: "witness" });
  assert.deepEqual(resolveBrowserInput("anshi-foundation.example/about", true), { tab: "activity", query: "foundation" });
  assert.deepEqual(resolveBrowserInput("linchuan-pets.example/lost/mili-0818", true), { tab: "lost-cat", query: "" });
  assert.deepEqual(resolveBrowserInput("qingtongli.example/notices/0822", true), { tab: "neighborhood-notice", query: "" });
  assert.deepEqual(resolveBrowserInput("linchuan-people.example/figures/gu-weizhen", true), { tab: "founder-profile", query: "" });
  assert.deepEqual(resolveBrowserInput("mingchuan-books.example/title/walk-to-today", true), { tab: "biography", query: "" });
  assert.deepEqual(resolveBrowserInput("mingchuan-books.example/title/remaining-time", true), { tab: "not-found", query: "mingchuan-books.example/title/remaining-time" });
  assert.deepEqual(resolveBrowserInput("linchuan-business.example/archive/2016/lu-wenchuan", true), { tab: "lu-memorial", query: "" });
  assert.deepEqual(resolveBrowserInput("haijia-heji.example/history/2016-gu-weizhen", true), { tab: "hospital", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/snapshot/R-06-4", true), { tab: "record-revision", query: "" });
  assert.deepEqual(resolveBrowserInput("anshi-office.example/rules/S-17", true), { tab: "continuity-rule", query: "" });
  assert.deepEqual(resolveBrowserInput("anshi-office.example/minutes/2019-04-17", true), { tab: "founder-briefing", query: "" });
});

test("activity search has one result and wrong text or URLs show explicit recoverable feedback", async () => {
  const { SearchResults, BrowserNotFound } = await vite.ssrLoadModule("/app/search-results.tsx");
  const render = (query) => renderToStaticMarkup(React.createElement(SearchResults, { query, unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openFounder() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} }));
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
  assert.equal((publicPage.match(/<details>/g) ?? []).length, 2);
  assert.doesNotMatch(publicPage, /取消旅行平台的订单，会取消活动吗|旅行订单与活动登记不属于同一笔预约/);
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
  const seventhText = seventh.replace(/<[^>]+>/g, "");
  for (const line of ["归来的日期没有告诉家里", "潮落时，他说自己不怕了", "见不到明天也没关系", "证词会替我们留下来"]) assert.ok(seventhText.includes(line));
  const letter = seventh.match(/<blockquote>([\s\S]*?)<\/blockquote>/)?.[1] ?? "";
  assert.deepEqual([...letter.matchAll(/<strong>([^<]+)<\/strong>/g)].map((match) => match[1]), ["归", "潮", "见", "证"]);
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  assert.doesNotMatch(search, /第七期生前告别体验|session-07|图片匹配 · 低清存档/);
  const home = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.doesNotMatch(home, /session07_notice_old|第七期参与须知/);
});

test("the optional fraud trail moves from the witness's cat to an address and then the real obituary", async () => {
  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openFounder() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const renderSearch = (query) => renderToStaticMarkup(React.createElement(SearchResults, { ...props, query }));
  const communitySearch = renderSearch("归潮见证");
  assert.match(communitySearch, /病友与家属互助社区/);
  assert.doesNotMatch(communitySearch, /他替我走了最后一程|第六期个案记录/);
  assert.match(renderSearch("米粒"), /寻猫启事｜米粒/);
  assert.match(renderSearch("米粒 猫"), /未找到与/);
  assert.match(renderSearch("临川市青桐里3栋"), /青桐里3栋居民治丧通知/);
  assert.match(renderSearch("程叙白"), /程叙白先生讣告/);
  for (const query of ["第七期", "雨停以后", "讣告", "安时骗局"]) assert.match(renderSearch(query), /未找到与/);
  const { CommunityPage, FoundationPage, WitnessPage, SurvivorProfile, ObituaryPage } = await vite.ssrLoadModule("/app/activity-page.tsx");
  const community = renderToStaticMarkup(React.createElement(CommunityPage, { onOpenWitness() {}, onOpenFoundation() {} }));
  assert.match(community, /当前账号[\s\S]*潮汐失眠/);
  assert.match(community, /最近留下的文字/);
  assert.doesNotMatch(community, /有人把一段经历留在这里/);
  assert.doesNotMatch(community, /我的帖子|community-avatar|<h2>复查结果/);
  assert.match(community, /胃低分化腺癌/);
  assert.match(community, /腹膜及肝脏多发转移，较前进展/);
  assert.match(community, /我这种情况还能活多久/);
  assert.doesNotMatch(community, /不知道还能一起走多远/);
  assert.ok(community.indexOf("潮汐失眠") < community.indexOf("海盐苏打"));
  assert.match(community, /由安时生命关怀基金会提供支持/);
  assert.doesNotMatch(community, /同行人|归期|承时|留下者|见证完成/);
  const foundation = renderToStaticMarkup(React.createElement(FoundationPage, { onBack() {} }));
  assert.match(foundation, /创办人[\s\S]*顾惟真/);
  assert.match(foundation, /一次重病康复后发起安时计划/);
  const witness = renderToStaticMarkup(React.createElement(WitnessPage, { onBack() {}, onOpenProfile() {} }));
  assert.match(witness, /雨停以后/);
  assert.match(witness, /资料最后更新于8月19日/);
  assert.doesNotMatch(witness, /他替我走了最后一程|阿岚|溺亡|身体指标|有人替我|第二次生命/);
  const profile = renderToStaticMarkup(React.createElement(SurvivorProfile));
  assert.match(profile, /原简介：肺腺癌晚期/);
  assert.match(profile.replace(/<[^>]+>/g, ""), /米粒是一只猫/);
  assert.ok((profile.match(/<strong>米粒<\/strong>/g) ?? []).length >= 3);
  assert.doesNotMatch(profile, /程叙白|站务说明|原账号联系人/);
  assert.match(profile, /8月19日 09:00/);
  assert.match(profile, /之后会慢慢恢复更新/);
  assert.doesNotMatch(profile, /有人替我|第二次生命|离开的不是我/);
  const { LostCatPage, NeighborhoodNoticePage } = await vite.ssrLoadModule("/app/cat-trail-pages.tsx");
  const lostCat = renderToStaticMarkup(React.createElement(LostCatPage));
  assert.match(lostCat, /mili-lost-cat\.webp/);
  assert.match(lostCat, /临川市青桐里3栋东门附近/);
  assert.match(lostCat, /原主人近日突发状况/);
  assert.doesNotMatch(lostCat, /程叙白/);
  const notice = renderToStaticMarkup(React.createElement(NeighborhoodNoticePage, { onOpenObituary() {} }));
  assert.match(notice, /青桐里3栋居民治丧通知/);
  assert.match(notice, /程叙白/);
  assert.match(notice, /查看正式治丧信息/);
  const obituary = renderToStaticMarkup(React.createElement(ObituaryPage));
  assert.match(obituary, /8月17日 03:26/);
  assert.match(obituary, /8月18日 10:42/);
  assert.match(obituary, /cheng-xubai-memorial\.webp/);
  await access(path.join(root, "public/game/mili-lost-cat.webp"));
  await access(path.join(root, "public/game/cheng-xubai-memorial.webp"));
  assert.doesNotMatch(community + foundation + witness + profile + lostCat + notice + obituary, /这说明|账号已被组织接管|骗局已揭穿/);
});

test("the founder trail delays the hospital night until chapter seven and exposes two searchable names", async () => {
  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openFounder() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const search = (query) => renderToStaticMarkup(React.createElement(SearchResults, { ...props, query }));
  assert.match(search("顾惟真"), /企业家、公益基金会发起人/);
  assert.doesNotMatch(search("顾惟真"), /没有回应的夜晚|陆闻川|海岬和济/);
  assert.match(search("走到今天"), /顾惟真口述自传/);
  assert.match(search("《走到今天》"), /顾惟真口述自传/);
  assert.match(search("把余下的时间还给别人"), /未找到与/);
  assert.match(search("陆闻川"), /因交通事故去世/);
  assert.match(search("海岬和济医院"), /持续十七小时的生命接力/);

  const { FounderProfilePage, BiographyPage, LuWenchuanMemorialPage, HaijiaHospitalPage } = await vite.ssrLoadModule("/app/founder-trail-pages.tsx");
  const founder = renderToStaticMarkup(React.createElement(FounderProfilePage));
  assert.match(founder, /澜序实业集团创办人/);
  assert.match(founder, /2021年[\s\S]*海州年度公益人物/);
  assert.match(founder, /《走到今天》/);
  assert.doesNotMatch(founder, /神佛|病危|闻川却没能等到天亮/);

  const biography = renderToStaticMarkup(React.createElement(BiographyPage));
  assert.equal((biography.match(/<button/g) ?? []).length, 7);
  assert.match(biography, /第六章|没有回应的夜晚/);
  assert.doesNotMatch(biography, /观音、地藏、耶稣|顾惟真（左）与陆闻川/);
  const biographySource = await readFile(path.join(root, "app/founder-trail-pages.tsx"), "utf8");
  assert.match(biographySource, /每天放学后在家中观音像前抄《心经》/);
  assert.match(biographySource, /每月初一、十五茹素/);
  assert.match(biographySource, /这个习惯持续了三十多年/);
  assert.match(biographySource, /撤去佛堂里的供桌/);
  assert.match(biographySource, /澜序旧藏·佛教艺术/);
  assert.match(biographySource, /我不能再对着它们假装还有谁在听/);
  assert.match(biographySource, /三十多年的供奉[ -￿]*得到的是同一种沉默/);
  assert.match(biographySource, /<strong>海岬和济医院<\/strong>/);
  assert.match(biographySource, /顾惟真（左）与陆闻川，2014年/);
  assert.match(biographySource, /gu-weizhen-lu-wenchuan-2014\.webp/);

  const friend = renderToStaticMarkup(React.createElement(LuWenchuanMemorialPage));
  assert.match(friend, /2016年11月3日 03:47/);
  assert.match(friend, /2016年11月3日 04:26/);
  assert.match(friend, /准备前往海岬和济医院/);
  const hospital = renderToStaticMarkup(React.createElement(HaijiaHospitalPage));
  assert.match(hospital, /暴发性心肌炎、心源性休克/);
  assert.match(hospital, /恢复自主循环，37天后出院/);
  assert.match(hospital, /海岬奇迹/);
  await access(path.join(root, "public/game/gu-weizhen-lu-wenchuan-2014.webp"));

  const css = await readProjectCss();
  assert.match(css, /\.founder-profile-page \{[^}]*background: #fff;/);
  assert.match(css, /\.biography-page \{[^}]*background: #171713;/);
  assert.match(css, /\.lu-memorial-page \{[^}]*background: #fff;/);
  assert.match(css, /\.hospital-history-page \{[^}]*background: #f6f9fc;/);
  assert.match(css, /\.biography-contents > button strong \{[^}]*font-size: 18px;/);
  assert.match(css, /\.biography-contents > button small \{[^}]*font-size: 13px;/);
  assert.match(css, /\.biography-contents > button span \{[^}]*font-size: 11px;/);
});

test("Gu's decades of Buddhist devotion end in a documented 2017 collection sale", async () => {
  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openRecordRevision() {}, openFounder() {}, openFounderInterview() {}, openFounderPoem() {}, openFounderCollection() {}, openBuddhistSale() {}, openRehabCenter() {}, openBeiluAddress() {}, openAidSelection() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const search = renderToStaticMarkup(React.createElement(SearchResults, { ...props, query: "澜序旧藏·佛教艺术" }));
  assert.match(search, /2017春拍成交图录/);
  assert.match(search, /31件拍品，全部成交/);
  assert.doesNotMatch(search, /无面小像|大罗无相尊/);

  const { GuWeizhenBuddhistSalePage, GuWeizhenInterviewPage, GuWeizhenAuctionPage } = await vite.ssrLoadModule("/app/founder-deep-pages.tsx");
  const sale = renderToStaticMarkup(React.createElement(GuWeizhenBuddhistSalePage));
  assert.match(sale, /入藏时间横跨1989年至2015年/);
  assert.match(sale, /长期用于家中供奉/);
  assert.match(sale, /顾惟真手抄《心经》册/);
  assert.match(sale, /愿母病安/);
  assert.match(sale, /香炉内底刻“惟真敬奉”/);
  assert.match(sale, /未披露成交款用途/);

  const interview = renderToStaticMarkup(React.createElement(GuWeizhenInterviewPage));
  assert.match(interview, /2014年第一次采访时[ -￿]*三层供架/);
  assert.match(interview, /2017年嘉闻春拍“澜序旧藏·佛教艺术”专场之后/);
  assert.match(interview, /我已经不信这些了/);

  const facelessAuction = renderToStaticMarkup(React.createElement(GuWeizhenAuctionPage));
  assert.match(facelessAuction, /2018 秋拍/);
  assert.match(facelessAuction, /竞得方[ -￿]*匿名委托/);
  assert.doesNotMatch(facelessAuction, /顾惟真/);

  const { resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("jiawen-auction.example/catalog/2017-spring/lanxu-buddhist-art", true), { tab: "buddhist-sale", query: "" });
});

test("the hidden record number opens a layered internal trail instead of explaining the cult on the public page", async () => {
  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openRecordRevision() {}, openFounder() {}, openFounderInterview() {}, openFounderPoem() {}, openFounderCollection() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const search = renderToStaticMarkup(React.createElement(SearchResults, { ...props, query: "R-06-4" }));
  assert.match(search, /R-06-4 公开记录校对单/);
  assert.match(search, /已停止公开访问/);
  assert.doesNotMatch(search, /死者账号|接管|顾惟真|仪式结果/);

  const { RecordRevisionPage, ContinuityRulePage, FounderBriefingPage } = await vite.ssrLoadModule("/app/anshi-internal-pages.tsx");
  const revision = renderToStaticMarkup(React.createElement(RecordRevisionPage, { onOpenRule() {} }));
  assert.match(revision, /8月16日 02:11/);
  assert.match(revision, /8月19日 09:00/);
  assert.match(revision, /项目组账号 RC-03/);
  assert.match(revision, /查看引用规则：S-17/);

  const rule = renderToStaticMarkup(React.createElement(ContinuityRulePage, { onOpenMinutes() {} }));
  assert.match(rule, /每组必须是两个人/);
  assert.match(rule, /申请者自行确认的最深关系人/);
  assert.match(rule, /捐赠记录与支付能力不得进入筛选表/);
  assert.match(rule, /公开记录不能出现失败/);
  assert.match(rule, /公开服务组[\s\S]*联络组[\s\S]*记录组[\s\S]*说明会成员/);
  assert.match(rule, /保护还没有准备好理解结果的人/);
  assert.match(rule, /查看附件：项目说明会纪要/);

  const minutes = renderToStaticMarkup(React.createElement(FounderBriefingPage));
  assert.match(minutes, /无面小像一尊/);
  assert.match(minutes, /闻川付出了代价/);
  assert.match(minutes, /最终说明权归顾惟真本人/);
  assert.doesNotMatch(revision + rule + minutes, /守夜人|承受人|借丧礼|生期转移/);

  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(page, /navigate\("record-revision"\)/);
  assert.match(page, /navigate\("continuity-rule"\)/);
  assert.match(page, /navigate\("founder-briefing"\)/);
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
  const css = await readProjectCss();
  assert.match(css, /\.evidence-image\.is-cropped img, \.evidence-thumbnail\.is-cropped img \{ width: 128%; max-width: none; transform: translateX\(-22%\); \}/);
});

test("the faceless figurine trail remains reachable after the browser split", async () => {
  const { GuWeizhenInterviewPage, GuWeizhenCollectionPage, GuWeizhenAuctionPage } = await vite.ssrLoadModule("/app/founder-deep-pages.tsx");
  const interview = renderToStaticMarkup(React.createElement(GuWeizhenInterviewPage));
  assert.match(interview, /gu-weizhen-study-2022-v3\.webp/);
  assert.match(interview, /无面小像/);
  assert.match(interview, /2014年第一次采访时/);
  assert.match(interview, /早晚礼佛/);
  assert.match(interview, /2016年以后就没有再用过/);
  assert.match(interview, /我已经不信这些了/);
  const collection = renderToStaticMarkup(React.createElement(GuWeizhenCollectionPage, { onOpenAuction() {} }));
  assert.match(collection, /大罗无相尊仪轨残卷/);
  assert.match(collection, /查看同场拍卖记录/);
  const auction = renderToStaticMarkup(React.createElement(GuWeizhenAuctionPage));
  assert.match(auction, /无面小像/);
  assert.match(auction, /¥86,000/);
  await access(path.join(root, "public/game/gu-weizhen-study-2022-v3.webp"));

  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(page, /navigate\("founder-interview"\)/);
  assert.match(page, /navigate\("founder-poem"\)/);
  assert.match(page, /navigate\("founder-collection"\)/);
  assert.match(page, /navigate\("founder-auction"\)/);

  const { resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("jiawen-auction.example/results/2018-autumn/linchuan", true), { tab: "founder-auction", query: "" });
});

test.skip("legacy Qichao academy contract", async () => {
  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openRecordRevision() {}, openFounder() {}, openFounderInterview() {}, openFounderPoem() {}, openFounderCollection() {}, openQichaoAcademy() {}, openQichaoSelection() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const academySearch = renderToStaticMarkup(React.createElement(SearchResults, { ...props, query: "栖潮书院" }));
  assert.match(academySearch, /山居、阅读与病中生活支持/);
  assert.doesNotMatch(academySearch, /神迹|大罗无相尊|顾惟真本人确认/);
  const memoSearch = renderToStaticMarkup(React.createElement(SearchResults, { ...props, query: "QC-AID-19" }));
  assert.match(memoSearch, /项目筛选与公开回访/);
  assert.doesNotMatch(memoSearch, /被点过名|最终援助名单/);

  const { GuWeizhenPoemPage } = await vite.ssrLoadModule("/app/founder-deep-pages.tsx");
  const poem = renderToStaticMarkup(React.createElement(GuWeizhenPoemPage));
  assert.match(poem, /写于栖潮书院，2019年秋/);

  const { QichaoAcademyPage, QichaoAidReviewPage, QichaoSelectionMemoPage } = await vite.ssrLoadModule("/app/qichao-pages.tsx");
  const academy = renderToStaticMarkup(React.createElement(QichaoAcademyPage, { onOpenReview() {} }));
  assert.match(academy, /2018年起[ -￿]*安时生命关怀基金会/);
  assert.match(academy, /临潮重症援助计划回顾/);
  const review = renderToStaticMarkup(React.createElement(QichaoAidReviewPage));
  assert.match(review, /会诊、转运、重症床位、特殊用药与陪护住宿/);
  assert.match(review, /医疗救治、照护条件与患者自身情况/);
  assert.match(review, /这里公开的好像都是后来转好的/);
  assert.doesNotMatch(review, /大罗无相尊|顾先生/);
  assert.match(review, /QC-AID-19/);
  const memo = renderToStaticMarkup(React.createElement(QichaoSelectionMemoPage, { onOpenMinutes() {} }));
  assert.match(memo, /仍存在明确可逆因素/);
  assert.match(memo, /不进入书院公开回顾/);
  assert.match(memo, /最终援助名单与公开回访名单均由顾惟真本人确认/);
  assert.match(memo, /不主动引用，也不要求删除/);
  assert.match(memo, /不要替他们说，也不必替他们改/);
  assert.doesNotMatch(academy + review + memo, /守夜人|承受人|借丧礼|生期转移/);

  const { resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("qichao-house.example/about", true), { tab: "qichao-academy", query: "" });
  assert.deepEqual(resolveBrowserInput("qichao-house.example/archive/coastal-aid-2019", true), { tab: "qichao-review", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/snapshot/QC-AID-19", true), { tab: "qichao-selection", query: "" });
});

test("the Beilu trail begins independently and converges at address 17", async () => {
  const historySource = await readFile(path.join(root, "app/browser-record-pages.tsx"), "utf8");
  assert.match(historySource, /8月20日[\s\S]*01:18[\s\S]*临川异地就医 陪护短住/);

  const { SearchResults } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openRecordRevision() {}, openFounder() {}, openFounderInterview() {}, openFounderPoem() {}, openFounderCollection() {}, openRehabCenter() {}, openBeiluAddress() {}, openAidSelection() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const firstSearch = renderToStaticMarkup(React.createElement(SearchResults, { ...props, query: "临川异地就医 陪护短住" }));
  assert.match(firstSearch, /1 条相关结果/);
  assert.match(firstSearch, /临川北麓康复中心/);
  assert.doesNotMatch(firstSearch, /北麓疗养院旧址|栖潮旧院/);
  assert.doesNotMatch(firstSearch, /安时|顾惟真|大罗无相尊|神迹|QC-AID-19/);

  const { GuWeizhenPoemPage } = await vite.ssrLoadModule("/app/founder-deep-pages.tsx");
  const poem = renderToStaticMarkup(React.createElement(GuWeizhenPoemPage));
  assert.match(poem, /写于栖潮旧院，2019年秋/);

  const { BeiluPlaceArchivePage, BeiluRehabilitationPage, BeiluSelectionMemoPage, LinchaoAidReviewPage } = await vite.ssrLoadModule("/app/qichao-pages.tsx");
  const center = renderToStaticMarkup(React.createElement(BeiluRehabilitationPage, { onOpenReview() {} }));
  assert.match(center, /临川市北麓路17号东院/);
  assert.match(center, /临潮重症援助计划回顾/);
  assert.doesNotMatch(center, /安时|顾惟真|大罗无相尊|神迹|QC-AID-19/);

  const review = renderToStaticMarkup(React.createElement(LinchaoAidReviewPage));
  assert.match(review, /会诊、转运、重症床位、特殊用药与陪护住宿/);
  assert.match(review, /这里公开的几个人，后来都好转了/);
  assert.doesNotMatch(review, /安时|顾惟真|大罗无相尊|神迹|QC-AID-19/);

  const archive = renderToStaticMarkup(React.createElement(BeiluPlaceArchivePage, { onOpenCentre() {} }));
  assert.match(archive, /北麓疗养院/);
  assert.match(archive, /栖潮疗养院/);
  assert.match(archive, /栖潮旧院/);
  assert.match(archive, /东院登记为临川北麓康复中心/);
  assert.match(archive, /西院不对外开放/);

  const memo = renderToStaticMarkup(React.createElement(BeiluSelectionMemoPage, { onOpenMinutes() {} }));
  assert.match(memo, /栖潮疗养院旧档案沿用的卷宗前缀/);
  assert.match(memo, /仍存在明确可逆因素/);
  assert.match(memo, /已经死亡的个案/);
  assert.match(memo, /最终援助名单与公开回访名单均由顾惟真本人确认/);
  assert.match(memo, /不得使用“神迹”/);
  assert.match(memo, /不要求更正/);

  const { FounderBriefingPage } = await vite.ssrLoadModule("/app/anshi-internal-pages.tsx");
  const minutes = renderToStaticMarkup(React.createElement(FounderBriefingPage, { onOpenAidSelection() {} }));
  assert.match(minutes, /临川市北麓路17号西院/);
  assert.match(minutes, /查看会前材料：QC-AID-19/);

  const { resolveBrowserInput } = await vite.ssrLoadModule("/lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("beilu-care.example/about", true), { tab: "rehab-center", query: "" });
  assert.deepEqual(resolveBrowserInput("linchuan-archive.example/places/beilu-17", true), { tab: "beilu-address", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/snapshot/QC-AID-19", true), { tab: "aid-selection", query: "" });
});

test("searching Daluo Wuxiang exposes an ordinary folk belief post without identifying Gu", async () => {
  const { SearchResults, DaluoPraiseThread } = await vite.ssrLoadModule("/app/search-results.tsx");
  const props = { unlocked: true, openTravel() {}, openForum() {}, openActivity() {}, openCommunity() {}, openLostCat() {}, openCommunityNotice() {}, openObituary() {}, openRecordRevision() {}, openFounder() {}, openFounderInterview() {}, openFounderPoem() {}, openFounderCollection() {}, openRehabCenter() {}, openBeiluAddress() {}, openAidSelection() {}, openBiography() {}, openLuMemorial() {}, openHospital() {} };
  const search = renderToStaticMarkup(React.createElement(SearchResults, { ...props, query: "大罗无相尊" }));
  assert.match(search, /2 条相关结果/);
  assert.match(search, /有人听说过“大罗无相尊”吗/);
  assert.match(search, /旧书摊偶然听到这个名字/);
  assert.match(search, /大罗无相尊仪轨残卷/);
  assert.doesNotMatch(search, /先生|名单|栖潮书院|顾惟真本人|筛选更可能/);

  const thread = renderToStaticMarkup(React.createElement(DaluoPraiseThread, { onBack() {} }));
  assert.match(thread, /逛旧书摊[ -￿]*偶然听到这个名字/);
  assert.match(thread, /名字写在纸上[ -￿]*放了一杯清水/);
  assert.match(thread, /医院突然通知有床位[ -￿]*手术后来也很顺利/);
  assert.match(thread, /这多半只是碰巧/);
  assert.match(thread, /顾惟真在一次公开文化活动里提过这个名字/);
  assert.equal((thread.match(/顾惟真/g) ?? []).length, 1);
  assert.doesNotMatch(thread, /先生|名单|栖潮书院/);
  assert.doesNotMatch(thread, /守夜人|承受人|借丧礼|生期转移/);
});
