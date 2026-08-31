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
  for (const name of ["app/page.tsx", "app/chapter-one.tsx", "app/desktop-evidence.tsx", "app/search-box.tsx"]) {
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
  assert.match(html, /灯塔接驳电子票\.pdf/);
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
  assert.match(source, /<SearchBox key=\{query\} query=\{query\} onSearch=\{\(value\) => navigate\("search", value\)\}/);
  assert.doesNotMatch(source, /在上方地址栏输入网站名称或关键词/);
  assert.equal((source.match(/<SearchBox\b/g) ?? []).length, 1);
  assert.doesNotMatch(source, /aria-label="搜索"|<Search\s/);
  assert.match(source, /<TabsContent value="search"/);
});
