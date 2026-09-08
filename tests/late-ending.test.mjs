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

test("the late trail branches from one group name into independent relay and follower evidence", async () => {
  const pages = await readFile(path.join(root, "app/final-trail-pages.tsx"), "utf8");
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  for (const fact of ["你不是神，你只是把死人删掉，把活人留下", "近身见证", "守潮人-17", "LC·7M21"]) assert.match(pages, new RegExp(fact.replaceAll("·", "\\·")));
  assert.match(search, /normalized === "近身见证"/);
  assert.match(search, /openFollowerRelay[\s\S]*openFanaticArchive/);
  assert.match(search, /LC·7M21[\s\S]*openAccidentDossier/);
  assert.doesNotMatch(pages, /追踪撤回的转发|查看归岸者旧站存档|调取同号车辆影像/);
  assert.match(pages, /先生没有否认/);
  assert.match(pages, /他没让我们跪，也没有叫我们起来/);
  assert.match(pages, /一个真正懂得被崇拜的人，不需要承认自己是神，也不需要亲自动手/);
});

test("the final dossier requires already-read sources and reaches one ending without a summary quiz", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(page, /setFinished\(true\)/);
  assert.match(page, /finished[\s\S]*EndingScreen/);
  assert.match(page, /discoveries\.message && discoveries\.relay && discoveries\.fanatic/);
  const ending = await readFile(path.join(root, "app/final-trail-pages.tsx"), "utf8");
  assert.match(ending, /将补充材料交给警方/);
  assert.doesNotMatch(ending, /INCIDENT_EVENTS|按发生时间从早到晚依次点选|生成事故时间线|INCIDENT_FIELDS|isIncidentAnswerCorrect|填写四份/);
  assert.match(ending, /她为什么曾经想让你死[\s\S]*是谁让她真的死去/);
});

test("all new late pages have browser addresses and direct-url recovery", async () => {
  const { resolveBrowserInput } = await import("../lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("browser://downloads/recovered/message-cache", true), { tab: "zhou-gu-message", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/messages/WX-0825", true), { tab: "zhou-gu-message", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/relay/GZ-825-17", true), { tab: "follower-relay", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/relay/near-witness", true), { tab: "follower-relay", query: "" });
  assert.deepEqual(resolveBrowserInput("guichao.example/archive/returners", true), { tab: "fanatic-archive", query: "" });
  assert.deepEqual(resolveBrowserInput("wuting-traffic.example/case/LC-7M21", true), { tab: "accident-dossier", query: "" });
  assert.equal(resolveBrowserInput("anshi-office.example/archive/incident-cross-M0826", true)?.tab, "not-found");
});
