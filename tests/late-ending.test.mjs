import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

test("the hidden album moves from affection to resentment without proving the murder", async () => {
  const { isPrivateAlbumAnswer, PRIVATE_PHOTOS } = await import("../lib/private-album.ts");
  assert.equal(isPrivateAlbumAnswer(" 林 知 还 "), true);
  assert.equal(isPrivateAlbumAnswer("周惜"), false);
  assert.deepEqual(PRIVATE_PHOTOS.map((photo) => photo.marked), [false, false, true, true]);
  assert.match(PRIVATE_PHOTOS[2].note + PRIVATE_PHOTOS[3].note, /为什么偏偏是你[\s\S]*最亲近的人，才算数/);
  assert.deepEqual(PRIVATE_PHOTOS.slice(2).map((photo) => photo.time), ["8月21日 23:49", "8月22日 00:06"]);
  assert.notEqual(PRIVATE_PHOTOS[0].src, PRIVATE_PHOTOS[2].src);
  assert.notEqual(PRIVATE_PHOTOS[1].src, PRIVATE_PHOTOS[3].src);
  const desktop = await readFile(path.join(root, "app/desktop-evidence.tsx"), "utf8");
  assert.match(desktop, /我的少女心事/);
  assert.match(desktop, /请输入三个字/);
  assert.match(desktop, /隐私相册/);
  assert.match(desktop, /private-photo-frame[\s\S]*is-marked/);
  assert.doesNotMatch(desktop, /顾惟真|近身见证|LC·7M21/);
});

test("the unfinished murder and ending branch is not exposed in this playable slice", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  assert.doesNotMatch(page, /final-trail-pages|EndingScreen|AccidentDossierPage|ZhouGuMessagePage|setFinished/);
  assert.doesNotMatch(search, /近身见证|LC·7M21|openFollowerRelay|openFanaticArchive|openAccidentDossier/);
});

test("the hagiography and North archive have direct addresses while obsolete shortcuts do not", async () => {
  const { resolveBrowserInput } = await import("../lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("linchuan-memory.example/texts/wuxiang-zun", true), { tab: "daluo-biography", query: "" });
  assert.deepEqual(resolveBrowserInput("linchuan-memory.example/projects/beilu-old-hospital", true), { tab: "beilu-oral-history", query: "" });
  for (const oldAddress of ["browser://downloads/recovered/message-cache", "wusou-cache.example/snapshot/QC-AID-19", "beilu-care.example/archive/linchao-2019", "wuting-traffic.example/case/LC-7M21"]) {
    assert.equal(resolveBrowserInput(oldAddress, true)?.tab, "not-found");
  }
});
