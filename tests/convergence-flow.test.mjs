import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

test("distributed discoveries recover the account export without a quiz", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(page, /discoveries\.seventh && discoveries\.community && discoveries\.obituary && discoveries\.revision && discoveries\.aidSelection/);
  assert.match(page, /accountArchiveAvailable=\{accountArchiveAvailable\}/);
  assert.match(page, /download-ready-dot/);
  assert.doesNotMatch(page, /crossIndexUnlocked|incidentIndexUnlocked|ConvergencePuzzlePage|FinalIncidentPuzzlePage/);
  assert.doesNotMatch(page, /record-revision|continuity-rule|founder-briefing/);
  await assert.rejects(access(path.join(root, "app/anshi-internal-pages.tsx")));
});

test("the restored files appear progressively in downloads", async () => {
  const downloads = await readFile(path.join(root, "app/browser-record-pages.tsx"), "utf8");
  for (const clue of ["accountArchiveAvailable", "messageCacheAvailable", "潮汐失眠_账户数据导出.html", "事故前消息缓存.html"]) assert.ok(downloads.includes(clue), clue);
  assert.match(downloads, /messageCacheAvailable \? <button/);

  const application = await readFile(path.join(root, "app/seventh-application-page.tsx"), "utf8");
  for (const fact of ["第七期申请确认单", "周惜 / 潮汐失眠", "林知还 / 同行朋友", "8月23日 00:14", "申请条款摘录 / S-17", "另存到了浏览器的下载内容"]) assert.ok(application.includes(fact), fact);
  assert.doesNotMatch(application, /<input|选择.{0,4}证据|归档所选|onOpenMessage/);
});

test("obsolete summary-test routes are removed", async () => {
  const { resolveBrowserInput } = await import("../lib/browser-navigation.ts");
  const tabs = await readFile(path.join(root, "lib/browser-tabs.ts"), "utf8");
  assert.match(tabs, /"seventh-application": "browser:\/\/downloads\/recovered\/account-export"/);
  assert.deepEqual(resolveBrowserInput("browser://downloads/recovered/account-export", true), { tab: "seventh-application", query: "" });
  assert.equal(resolveBrowserInput("anshi-office.example/archive/cross-index-A00", true)?.tab, "not-found");
  assert.equal(resolveBrowserInput("anshi-office.example/archive/incident-cross-M0826", true)?.tab, "not-found");
  assert.doesNotMatch(tabs, /convergence-index|incident-index|交叉索引|事件核验/);
});
