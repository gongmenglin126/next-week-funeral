import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

test("the late bridge is learned from the dead account instead of recovered downloads", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const activity = await readFile(path.join(root, "app/activity-page.tsx"), "utf8");
  const downloads = await readFile(path.join(root, "app/browser-record-pages.tsx"), "utf8");

  assert.match(page, /if \(tab === "obituary"\) setObituarySeen\(true\)/);
  assert.match(page, /<SurvivorProfile obituarySeen=\{obituarySeen\}/);
  assert.match(activity, /obituarySeen[\s\S]*网页缓存：此页存在两个版本[\s\S]*R-06-4[\s\S]*《无相尊略传》/);
  assert.match(downloads, /暂无下载记录/);
  assert.doesNotMatch(page + downloads, /accountArchiveAvailable|messageCacheAvailable|download-ready-dot|潮汐失眠_账户数据导出|事故前消息缓存/);
});

test("the hagiography transforms Gu's life and leaves one natural source title", async () => {
  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const biography = qichao.slice(qichao.indexOf("export function DaluoBiographyPage"), qichao.indexOf("export function BeiluOralHistoryPage"));

  for (const clue of ["晨暮持名", "观音、地藏", "同行者殁，而尊独归", "尽去旧供", "从诸神座前起身"]) {
    assert.ok(biography.includes(clue), clue);
  }
  assert.match(biography, /来源：[\s\S]*北麓旧院口述史整理项目/);
  assert.doesNotMatch(biography, /<button|输入|下一页/);
});

test("the North page confirms place and control through a reused corridor, not a click chain", async () => {
  const search = await readFile(path.join(root, "app/search-results.tsx"), "utf8");
  const qichao = await readFile(path.join(root, "app/qichao-pages.tsx"), "utf8");
  const navigation = await import("../lib/browser-navigation.ts");

  assert.match(search, /无相尊略传[\s\S]*openDaluoBiography/);
  assert.match(search, /北麓旧院口述史整理项目[\s\S]*openBeiluOralHistory/);
  for (const clue of ["海岬和济医院东院", "安时生命关怀基金会", "基金会发起人", "进场与钥匙由基金会项目办公室统一登记", "inn-corridor-original.webp"]) {
    assert.ok(qichao.includes(clue), clue);
  }
  assert.doesNotMatch(qichao, /<button|临潮重症援助|QC-AID-19|输入|下一页/);
  assert.deepEqual(navigation.resolveBrowserInput("linchuan-memory.example/texts/wuxiang-zun", true), { tab: "daluo-biography", query: "" });
  assert.deepEqual(navigation.resolveBrowserInput("linchuan-memory.example/projects/beilu-old-hospital", true), { tab: "beilu-oral-history", query: "" });
  assert.equal(navigation.resolveBrowserInput("wusou-cache.example/snapshot/QC-AID-19", true)?.tab, "not-found");
  assert.equal(navigation.resolveBrowserInput("browser://downloads/recovered/account-export", true)?.tab, "not-found");
});
