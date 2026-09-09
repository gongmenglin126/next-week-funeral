import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

test("the record revision stays out of the seventh archive and appears only after revisiting the dead account", async () => {
  const activity = await readFile(path.join(root, "app/activity-page.tsx"), "utf8");
  const hiddenPage = activity.slice(activity.indexOf("export function HiddenSeventhPage"), activity.indexOf("export function CommunityPage"));
  assert.doesNotMatch(hiddenPage, /R-06-4|来信编号/);
  assert.match(hiddenPage, /归[\s\S]*潮[\s\S]*见[\s\S]*证/);

  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const placeArchive = qichao.slice(qichao.indexOf("export function BeiluPlaceArchivePage"), qichao.indexOf("export function BeiluSelectionMemoPage"));
  const selectionMemo = qichao.slice(qichao.indexOf("export function BeiluSelectionMemoPage"));
  assert.match(placeArchive, /数字化移交附记[\s\S]*按当年的公开项目名称建立索引/);
  assert.doesNotMatch(placeArchive, /打开援助项目工作批注|onOpenSelection/);
  assert.doesNotMatch(selectionMemo, /关联抽查样本|查看第六期记录校对样本|onOpenRevision/);
  assert.doesNotMatch(placeArchive + selectionMemo, /输入|搜索编号/);
  assert.doesNotMatch(selectionMemo, /大罗无相尊/);

  const profile = activity.slice(activity.indexOf("export function SurvivorProfile"), activity.indexOf("export function ObituaryPage"));
  assert.match(profile, /obituarySeen[\s\S]*网页缓存：此页存在两个版本[\s\S]*R-06-4/);
  assert.match(profile, /8月17日 03:26[\s\S]*RC-03[\s\S]*8月19日 09:00/);
  assert.match(profile, /onRevisionFound/);
});

test("the old internal click chain is gone and its facts live where they belong", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.doesNotMatch(page, /record-revision|continuity-rule|founder-briefing/);
  await assert.rejects(access(path.join(root, "app/anshi-internal-pages.tsx")));

  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  assert.doesNotMatch(search, /normalized\.toUpperCase\(\) === "R-06-4"|"S-17", "S17"|normalized\.toUpperCase\(\) === "QC-AID-19"/);
  const application = await readFile(path.join(root, "app/seventh-application-page.tsx"), "utf8");
  assert.match(application, /申请条款摘录 \/ S-17/);
  const ending = await readFile(path.join(root, "app/final-trail-pages.tsx"), "utf8");
  assert.match(ending, /2019年项目说明会纪要[\s\S]*“失败”“无效”不得进入结案材料/);
});

test("public Beilu browsing leaves an address to investigate instead of a next-page button", async () => {
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  assert.doesNotMatch(search, /hasQichaoName && hasBeiluReference|可以补充门牌地址/);
  assert.match(search, /if \(normalized === "北麓路17号"\)[\s\S]*openRehabCenter[\s\S]*openBeiluAddress/);
  assert.match(search, /\["栖潮疗养院", "栖潮旧院", "北麓路17号西院"\]/);
  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  assert.match(qichao, /地址：临川市北麓路17号东院/);
  assert.doesNotMatch(qichao, /为什么地址写“东院”？查看院区沿革|onOpenArchive/);
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
