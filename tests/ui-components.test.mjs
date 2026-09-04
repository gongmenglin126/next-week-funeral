import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

test("the travel account renders exactly five visible bookings, not the secret shuttle", async () => {
  const { TravelPlatform } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  const { initialChapterState, chapterReducer, BOOKING_IDS, TICKET_SUFFIX } = await vite.ssrLoadModule("/lib/chapter-one.ts");
  const render = (state) => renderToStaticMarkup(React.createElement(TravelPlatform, { state, onCancel() {} }));
  const initial = render(initialChapterState());
  assert.equal((initial.match(/class="ota-order-card"/g) ?? []).length, 5);
  assert.match(initial, /我的订单/);
  assert.doesNotMatch(initial, /安时|WT-0831|葬礼|一滴泪/);
  let finished = initialChapterState();
  for (const id of BOOKING_IDS) finished = chapterReducer(finished, { type: "cancel", id, code: TICKET_SUFFIX, policyAccepted: true, ticketOpened: true, passengerIds: ["lin", "zhou"] });
  assert.equal((render(finished).match(/class="ota-state cancelled"/g) ?? []).length, 5);
});

test("notes keep the starting clue and downloads no longer expose the lighthouse ticket", async () => {
  const { NotesPanel } = await vite.ssrLoadModule("/app/chapter-one.tsx");
  const { DownloadsPage } = await vite.ssrLoadModule("/app/browser-record-pages.tsx");
  const { TICKET_SUFFIX } = await vite.ssrLoadModule("/lib/chapter-one.ts");
  const notes = renderToStaticMarkup(React.createElement(NotesPanel, { checked: [], onCheck() {}, onClose() {} }));
  assert.match(notes, /泊岸旅行/);
  assert.equal((notes.match(/role="checkbox"/g) ?? []).length, 5);
  assert.doesNotMatch(notes, /安时|葬礼|一滴泪/);
  const downloads = renderToStaticMarkup(React.createElement(DownloadsPage));
  assert.match(downloads, /暂无下载记录/);
  assert.doesNotMatch(downloads, /灯塔接驳电子票/);
  const chapter = await readFile(path.join(root, "app/chapter-one.tsx"), "utf8");
  assert.match(chapter, /TICKET_SUFFIX/);
  assert.equal(TICKET_SUFFIX, "7642");
  assert.match(chapter, /运营方凭证/);
});

test("closing a browser tab removes its history and selects the nearest previous page", async () => {
  const { closeBrowserTabHistory, visibleBrowserTabs } = await vite.ssrLoadModule("/lib/browser-tabs.ts");
  const history = [
    { tab: "search", query: "顾惟真" },
    { tab: "founder-profile", query: "" },
    { tab: "founder-interview", query: "" },
  ];

  const closedCurrent = closeBrowserTabHistory(history, 2, "founder-interview");
  assert.deepEqual(closedCurrent, {
    routes: history.slice(0, 2),
    routeIndex: 1,
  });

  const closedInactive = closeBrowserTabHistory(history, 2, "founder-profile");
  assert.deepEqual(closedInactive, {
    routes: [history[0], history[2]],
    routeIndex: 1,
  });

  assert.deepEqual(visibleBrowserTabs(closedInactive.routes, true, false), ["search", "founder-interview"]);
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("emits the catalog's animation and scrolling utilities", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /--tw-enter-opacity/);
  assert.match(css, /scrollbar-width:\s*thin/);
  assert.match(css, /scrollbar-width:\s*none/);
  assert.match(css, /scrollbar-gutter:\s*stable/);
  assert.match(css, /scroll-fade-reveal-b/);
  assert.match(css, /mask-image:/);
  assert.match(css, /tw-shimmer/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});
