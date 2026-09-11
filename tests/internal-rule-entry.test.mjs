import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("R-06-4 appears only in Gu Weizhen's late unpublished recording", async () => {
  const activity = await readFile(path.join(root, "app/activity-page.tsx"), "utf8");
  const founder = await readFile(path.join(root, "app/founder-deep-pages.tsx"), "utf8");
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const hiddenPage = activity.slice(activity.indexOf("export function HiddenSeventhPage"), activity.indexOf("export function CommunityPage"));
  const witness = activity.slice(activity.indexOf("export function WitnessPage"), activity.indexOf("export function SurvivorProfile"));
  const profile = activity.slice(activity.indexOf("export function SurvivorProfile"), activity.indexOf("export function ObituaryPage"));
  const unpublished = founder.slice(founder.indexOf("export function GuWeizhenUnpublishedPage"), founder.indexOf("export function GuWeizhenInterviewPage"));

  assert.doesNotMatch(hiddenPage, /R-06-4|无相尊略传|来信编号/);
  assert.match(hiddenPage, /归[\s\S]*潮[\s\S]*见[\s\S]*证/);
  assert.doesNotMatch(witness, /R-06-4|修订号/);
  assert.doesNotMatch(page + profile, /obituarySeen|网页缓存：此页存在两个版本/);
  assert.match(search, /query\.trim\(\) === "程叙白"[\s\S]*openObituary[\s\S]*openSurvivorIndex/);
  assert.match(profile, /SurvivorIndexPage[\s\S]*8月17日 02:41[\s\S]*8月19日 09:06[\s\S]*这句话不是他自己写的/);
  assert.doesNotMatch(profile, /R-06-4|修订号|无相尊略传/);
  assert.match(unpublished, /顾惟真[\s\S]*我带来的是奇迹[\s\S]*死亡信息也处理了[\s\S]*R-06-4/);
  assert.match(unpublished, /工作台截屏[\s\S]*https:\/\/[\s\S]*\.example\/[\s\S]*\/r[\s\S]*见证材料维护/);
  assert.doesNotMatch(unpublished, /anshi\.example\/witness\/r06-4/);
});

test("the secret address is assembled across three trails and cannot be opened early", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const navigation = await readFile(path.join(root, "lib/browser-navigation.ts"), "utf8");

  assert.doesNotMatch(search, /normalized\.toUpperCase\(\) === "R-06-4"|"S-17", "S17"|normalized\.toUpperCase\(\) === "QC-AID-19"/);
  assert.doesNotMatch(navigation, /snapshot\/R-06-4|rules\/S-17|QC-AID-19/);
  assert.match(navigation, /\/witness\/r06-4["'] && access\.manual/);
  assert.match(page, /hasVisited\("fanatic-profile"\)[\s\S]*hasVisited\("activity", "archive\/07"\)[\s\S]*hasVisited\("gu-unpublished"\)/);
  assert.match(page, /AnshiManualPage[\s\S]*SeventhApplicationPage[\s\S]*ZhouGuMessagePage/);
  await assert.rejects(access(path.join(root, "app/anshi-internal-pages.tsx")));
});

test("the late Gu trail uses natural document titles, never codes as search terms", async () => {
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const founder = await readFile(path.join(root, "app/founder-deep-pages.tsx"), "utf8");

  assert.match(search, /if \(normalized\.replace\(\/\[《》\]\/g, ""\) === "无相尊略传"\)[\s\S]*openDaluoBiography/);
  assert.match(search, /if \(normalized\.replace\(\/\[《》\]\/g, ""\) === "听见我的人"\)[\s\S]*openGuUnpublished/);
  assert.match(search, /\["北麓旧院", "北麓旧院口述史整理项目", "北麓旧院口述史"\][\s\S]*openBeiluOralHistory/);
  assert.doesNotMatch(search, /临潮重症援助|北麓路17号"\)|栖潮疗养院|栖潮旧院/);
  assert.doesNotMatch(founder.slice(founder.indexOf("export function GuWeizhenPoemPage"), founder.indexOf("export function GuWeizhenUnpublishedPage")), /《无相尊略传》/);
  assert.match(qichao, /已公开整理目录[\s\S]*《无相尊略传》/);
  assert.match(qichao, /《听见我的人》[\s\S]*讲述者栏空白/);
  assert.doesNotMatch(qichao, /onOpen|<button|查看项目|下一页/);
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
  assert.doesNotMatch(interview, /您可以直接否认吗|这不是一个否认|我不替别人规定应当相信什么/);
});
