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
