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
  assert.match(PRIVATE_PHOTOS[2].note + PRIVATE_PHOTOS[3].note, /别再这样看我[\s\S]*从来没有选过我/);
  const desktop = await readFile(path.join(root, "app/desktop-evidence.tsx"), "utf8");
  assert.match(desktop, /周惜的少女心事/);
  assert.match(desktop, /private-photo-frame[\s\S]*is-marked/);
  assert.doesNotMatch(desktop, /顾惟真|近身见证|LC·7M21/);
});

test("the late trail progresses from mockery to relay, fanatic archive, vehicle and synthesis", async () => {
  const pages = await readFile(path.join(root, "app/final-trail-pages.tsx"), "utf8");
  const convergence = await readFile(path.join(root, "app/convergence-puzzle.tsx"), "utf8");
  for (const fact of ["你不是神，你只是把死人删掉，把活人留下", "GZ-825-17", "近身见证", "守潮人-17", "LC·7M21", "M-0826"]) assert.match(pages, new RegExp(fact.replaceAll("·", "\\·")));
  assert.match(convergence, /WX-0825/);
  assert.match(pages, /先生没有否认/);
  assert.match(pages, /他没让我们跪，也没有叫我们起来/);
  assert.match(pages, /一个真正懂得被崇拜的人，不需要承认自己是神，也不需要亲自动手/);
});

test("the final index requires four independent exact clues and reaches one ending", async () => {
  const { isIncidentAnswerCorrect } = await import("../lib/final-puzzle.ts");
  assert.equal(isIncidentAnswerCorrect("message", "GZ-825-17"), true);
  assert.equal(isIncidentAnswerCorrect("circle", "近身见证"), true);
  assert.equal(isIncidentAnswerCorrect("witness", "守潮人-17"), true);
  assert.equal(isIncidentAnswerCorrect("vehicle", "LC·7M21"), true);
  assert.equal(isIncidentAnswerCorrect("witness", "顾惟真"), false);
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(page, /setFinished\(true\)/);
  assert.match(page, /finished[\s\S]*EndingScreen/);
  const ending = await readFile(path.join(root, "app/final-trail-pages.tsx"), "utf8");
  assert.match(ending, /她为什么曾经想让你死[\s\S]*是谁让她真的死去/);
});

test("all new late pages have browser addresses and direct-url recovery", async () => {
  const { resolveBrowserInput } = await import("../lib/browser-navigation.ts");
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/messages/WX-0825", true), { tab: "zhou-gu-message", query: "" });
  assert.deepEqual(resolveBrowserInput("wusou-cache.example/relay/GZ-825-17", true), { tab: "follower-relay", query: "" });
  assert.deepEqual(resolveBrowserInput("guichao.example/archive/returners", true), { tab: "fanatic-archive", query: "" });
  assert.deepEqual(resolveBrowserInput("wuting-traffic.example/case/LC-7M21", true), { tab: "accident-dossier", query: "" });
  assert.deepEqual(resolveBrowserInput("anshi-office.example/archive/incident-cross-M0826", true), { tab: "incident-index", query: "" });
});
