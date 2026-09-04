import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

test("R-06-4 is withheld from the seventh archive and first appears in the late selection memo", async () => {
  const activity = await readFile(path.join(root, "app/activity-page.tsx"), "utf8");
  const hiddenPage = activity.slice(activity.indexOf("export function HiddenSeventhPage"), activity.indexOf("export function CommunityPage"));
  assert.doesNotMatch(hiddenPage, /R-06-4|来信编号/);
  assert.match(hiddenPage, /归[\s\S]*潮[\s\S]*见[\s\S]*证/);

  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const placeArchive = qichao.slice(qichao.indexOf("export function BeiluPlaceArchivePage"), qichao.indexOf("export function BeiluSelectionMemoPage"));
  const selectionMemo = qichao.slice(qichao.indexOf("export function BeiluSelectionMemoPage"));
  assert.match(placeArchive, /数字化移交附记[\s\S]*QC-AID-19/);
  assert.match(selectionMemo, /关联抽查样本[\s\S]*R-06-4/);
  assert.doesNotMatch(selectionMemo, /onOpenMinutes|查看同批说明会纪要/);
});

test("the late record chain cannot skip from the selection memo to the briefing", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(page, /<BeiluSelectionMemoPage\s*\/>/);
  assert.doesNotMatch(page, /<BeiluSelectionMemoPage onOpenMinutes/);

  const internalPages = await readFile(path.join(root, "app/anshi-internal-pages.tsx"), "utf8");
  assert.match(internalPages, /R-06-4 公开记录修订单[\s\S]*查看引用规则：S-17/);
  assert.match(internalPages, /S-17[\s\S]*查看附件：项目说明会纪要/);
});

test("public Beilu browsing and the Qichao nickname must be combined before the old archive appears", async () => {
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  assert.match(search, /hasQichaoName && hasBeiluReference/);
  assert.match(search, /“栖潮旧院”是地方俗称，暂时无法定位唯一地点/);
  assert.match(search, /可以补充门牌地址或现用机构名称后再次搜索/);
  const earlyBeiluBlock = search.slice(search.indexOf('["临川异地就医陪护短住"'), search.indexOf('if (normalized === "栖潮疗养院")'));
  assert.match(earlyBeiluBlock, /openRehabCenter/);
  assert.doesNotMatch(earlyBeiluBlock, /openBeiluAddress/);
});

test("the seventh-event hint no longer gives away the archive number", async () => {
  const forum = await readFile(path.join(root, "app/forum-page.tsx"), "utf8");
  const activityThread = forum.slice(forum.indexOf('"有人参加过安时那边的周末活动吗"'), forum.indexOf("[LIGHTHOUSE_THREAD]"));
  assert.match(activityThread, /后来没列进公开归档的那一期/);
  assert.doesNotMatch(activityThread, /第七期|07/);
});

test("the founder trail reveals biography, interview, and poem progressively", async () => {
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const founderResult = search.slice(search.indexOf('if (normalized === "顾惟真")'), search.indexOf('if (normalized.replace(/[《》]/g, "") === "顾惟真的书房")'));
  assert.match(founderResult, /1 条相关结果/);
  assert.match(founderResult, /openFounder/);
  assert.doesNotMatch(founderResult, /openFounderInterview|openFounderPoem|山居杂记/);

  const biography = await readFile(path.join(root, "app/founder-trail-pages.tsx"), "utf8");
  const interview = await readFile(path.join(root, "app/founder-deep-pages.tsx"), "utf8");
  assert.match(biography, /selected.number === "06"[\s\S]*顾惟真的书房/);
  assert.match(interview, /onOpenPoem[\s\S]*查看顾惟真刊载旧作《山居杂记》/);
});
