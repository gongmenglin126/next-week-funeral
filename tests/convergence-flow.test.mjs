import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

test("Cheng Xubai's index proves posthumous posting without exposing the late bridge", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const activity = await readFile(path.join(root, "app/activity-page.tsx"), "utf8");
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const records = await readFile(path.join(root, "app/browser-record-pages.tsx"), "utf8");
  const profile = activity.slice(activity.indexOf("export function SurvivorIndexPage"), activity.indexOf("export function ObituaryPage"));

  assert.doesNotMatch(page + activity, /obituarySeen|网页缓存：此页存在两个版本/);
  assert.match(search, /query\.trim\(\) === "程叙白"[\s\S]*程叙白先生讣告[\s\S]*雨停以后[\s\S]*米粒是一只猫/);
  assert.match(profile, /8月17日 02:41[\s\S]*8月19日 09:06[\s\S]*诸神皆默，唯我是我/);
  assert.doesNotMatch(profile, /R-06-4|无相尊略传|修订号/);
  assert.doesNotMatch(page + records, /下载内容|DownloadsPage|accountArchiveAvailable|messageCacheAvailable|download-ready-dot|潮汐失眠_账户数据导出|事故前消息缓存/);
});

test("the hagiography transforms Gu's life and leaves one natural source title", async () => {
  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const founder = await readFile(path.join(root, "app/founder-deep-pages.tsx"), "utf8");
  const biography = qichao.slice(qichao.indexOf("export function DaluoBiographyPage"), qichao.indexOf("export function BeiluOralHistoryPage"));
  const unpublished = founder.slice(founder.indexOf("export function GuWeizhenUnpublishedPage"), founder.indexOf("export function GuWeizhenInterviewPage"));

  for (const clue of ["晨暮持名", "观音、地藏", "诸神皆默，唯我是我", "同行者殁，而尊独归", "尽去旧供", "从诸神座前起身"]) {
    assert.ok(biography.includes(clue), clue);
  }
  assert.match(biography, /来源：[\s\S]*北麓旧院口述史整理项目/);
  assert.match(biography, /《听见我的人》[\s\S]*讲述者栏空白/);
  assert.doesNotMatch(biography, /顾惟真/);
  assert.match(unpublished, /我带来的是奇迹[\s\S]*死亡信息也处理了[\s\S]*R-06-4/);
  assert.doesNotMatch(biography, /<button|输入|下一页/);
});

test("the North page confirms place and control through a reused corridor, not a click chain", async () => {
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const navigation = await import("../lib/browser-navigation.ts");

  assert.match(search, /无相尊略传[\s\S]*openDaluoBiography/);
  assert.match(search, /北麓旧院口述史整理项目[\s\S]*openBeiluOralHistory/);
  assert.match(search, /\["北麓旧院", "北麓旧院口述史整理项目", "北麓旧院口述史"\]/);
  for (const clue of ["海岬和济医院东院", "安时生命关怀基金会", "进场与钥匙由基金会项目办公室统一登记", "inn-corridor-original.webp", "《无相尊略传》", "撰者不详"]) {
    assert.ok(qichao.includes(clue), clue);
  }
  const beilu = qichao.slice(qichao.indexOf("export function BeiluOralHistoryPage"));
  assert.doesNotMatch(beilu, /顾惟真/);
  assert.doesNotMatch(qichao, /<button|临潮重症援助|QC-AID-19|输入|下一页/);
  assert.deepEqual(navigation.resolveBrowserInput("linchuan-memory.example/texts/wuxiang-zun", true), { tab: "daluo-biography", query: "" });
  assert.deepEqual(navigation.resolveBrowserInput("linchuan-memory.example/projects/beilu-old-hospital", true), { tab: "beilu-oral-history", query: "" });
  assert.deepEqual(navigation.resolveBrowserInput("wusou-index.example/pages/wuting-talk/rain-after", true), { tab: "survivor-index", query: "" });
  assert.equal(navigation.resolveBrowserInput("wusou-cache.example/snapshot/QC-AID-19", true)?.tab, "not-found");
  assert.equal(navigation.resolveBrowserInput("browser://downloads/recovered/account-export", true)?.tab, "not-found");
});
