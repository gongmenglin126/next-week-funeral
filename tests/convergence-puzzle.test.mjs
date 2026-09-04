import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

test("cross-index accepts exact evidence with harmless typography variations", async () => {
  const { isCrossIndexAnswerCorrect, normalizeCrossIndexAnswer } = await import("../lib/convergence-puzzle.ts");
  assert.equal(normalizeCrossIndexAnswer(" 《无面小像》 "), "无面小像");
  assert.equal(isCrossIndexAnswerCorrect("origin", "陆闻川"), true);
  assert.equal(isCrossIndexAnswerCorrect("object", "《无面小像》"), true);
  assert.equal(isCrossIndexAnswerCorrect("place", "栖潮疗养院"), true);
  assert.equal(isCrossIndexAnswerCorrect("participant", "程叙白"), true);
  assert.equal(isCrossIndexAnswerCorrect("origin", "顾惟真"), false);
  assert.equal(isCrossIndexAnswerCorrect("place", "栖潮旧院"), true, "the place archive explicitly records this local name");
  assert.equal(isCrossIndexAnswerCorrect("participant", "R-06-4"), false);
});

test("the locked index asks for four prior clues before rendering its reward", async () => {
  const source = await readFile(path.join(root, "app/convergence-puzzle.tsx"), "utf8");
  const lockedBranch = source.slice(source.indexOf("{!unlocked ?"), source.indexOf(": <CrossIndexResult />"));
  for (const feature of ["CROSS_INDEX_FIELDS.map", "<label", "<input", "type=\"submit\"", "noValidate"]) assert.ok(lockedBranch.includes(feature), feature);
  assert.doesNotMatch(lockedBranch, /索引结论|第七期申请确认单|A-07-02|周惜 \/ 社区账号/);
  const fields = await readFile(path.join(root, "lib/convergence-puzzle.ts"), "utf8");
  for (const clue of ["2016年海岬病危夜晚", "2018年匿名成交", "北麓路17号", "原使用者的真实姓名"]) assert.ok(fields.includes(clue), clue);
});

test("the convergence reward joins all four systems and preserves the limits of the application record", async () => {
  const source = await readFile(path.join(root, "app/convergence-puzzle.tsx"), "utf8");
  for (const evidence of ["海岬和济医院 / 陆闻川事故", "佛教旧藏图录 / 无面小像", "QC-AID-19 / 北麓路17号西院", "程叙白讣告 / R-06-4"]) assert.match(source, new RegExp(evidence.replaceAll("/", "\\/")));
  for (const fact of ["A-07-02", "周惜 / 社区账号“潮汐失眠”", "林知还 / 同行朋友", "8月20日 19:44", "归潮社区站内消息", "8月23日 00:14", "本人勾选并二次输入关系人姓名", "不能单独证明她最后没有反悔"]) assert.ok(source.includes(fact), fact);
  assert.match(source, /没有证明死亡能够转移/);
});

test("the cross-index is a late internal route linked from the briefing", async () => {
  const { resolveBrowserInput } = await import("../lib/browser-navigation.ts");
  const tabs = await readFile(path.join(root, "lib/browser-tabs.ts"), "utf8");
  assert.match(tabs, /"convergence-index": "anshi-office\.example\/archive\/cross-index-A00"/);
  assert.match(tabs, /"convergence-index": "交叉索引"/);
  assert.deepEqual(resolveBrowserInput("anshi-office.example/archive/cross-index-A00", true), { tab: "convergence-index", query: "" });
  const briefing = await readFile(path.join(root, "app/anshi-internal-pages.tsx"), "utf8");
  assert.match(briefing, /打开关联档案检索/);
  assert.match(briefing, /onOpenCrossIndex/);
});
