export type BrowserRoute = { tab: string; query: string };

export const ACTIVITY_URL = "anshi.example/activities";
const ACTIVITY_NAMES = new Set(["安时", "安时活动", "安时活动服务", "安时接送", "安时生命关怀", "anshi"]);
export function isActivitySearch(query: string) {
  return ACTIVITY_NAMES.has(query.normalize("NFKC").replace(/\s+/g, "").replace(/官网$/, "").toLowerCase());
}

const FORUM_PATHS: Record<string, string> = {
  "/thread/60318": "北站附近有通宵药店吗？最好能送到老城",
  "/thread/60320": "沿海公路夜间施工，临时公交调整汇总",
  "/thread/60285": "老城民宿到旧灯塔，早上五点能叫到车吗",
  "/thread/60307": "有人参加过安时那边的周末活动吗",
};

export function resolveBrowserInput(input: string, unlocked: boolean): BrowserRoute | null {
  const value = input.trim();
  if (!value) return null;
  if (value === "browser://downloads") return { tab: "downloads", query: "" };
  if (value === "browser://history") return { tab: "history", query: "" };
  const looksLikeUrl = /^[a-z][a-z\d+.-]*:\/\//i.test(value) || /^[a-z\d-]+(?:\.[a-z\d-]+)+(?:[/:?#].*)?$/i.test(value);
  if (!looksLikeUrl) return { tab: "search", query: value };
  const missing = { tab: "not-found", query: value };
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (url.username || url.password || url.port) return missing;
    const path = url.pathname.replace(/\/$/, "") || "/";
    if (url.hostname === "boan.example" && ["/", "/account/orders"].includes(path)) return { tab: "trip", query: "" };
    if (url.hostname === "anshi.example") {
      if (["/", "/activities"].includes(path)) return { tab: "activity", query: "" };
      const archive = path.match(/^\/activities\/archive\/(0[1-7])$/);
      if (archive) return { tab: "activity", query: `archive/${archive[1]}` };
      if (path === "/booking/WT-0831-2140" && unlocked) return { tab: "ride", query: "" };
      return missing;
    }
    if (url.hostname === "guichao.example") {
      if (["/", "/home"].includes(path)) return { tab: "activity", query: "community" };
      if (path === "/records/session-06") return { tab: "activity", query: "witness" };
      if (path === "/archive/returners") return { tab: "fanatic-archive", query: "" };
      return missing;
    }
    if (url.hostname === "anshi-foundation.example" && path === "/about") return { tab: "activity", query: "foundation" };
    if (url.hostname === "wuting-talk.example") {
      if (["/", "/latest"].includes(path)) return { tab: "forum", query: "" };
      if (path === "/u/rain-after") return { tab: "survivor", query: "" };
      if (FORUM_PATHS[path] && (path !== "/thread/60307" || unlocked)) return { tab: "forum", query: FORUM_PATHS[path] };
    }
    if (url.hostname === "linchuan-pets.example" && path === "/lost/mili-0818") return { tab: "lost-cat", query: "" };
    if (url.hostname === "qingtongli.example" && path === "/notices/0822") return { tab: "neighborhood-notice", query: "" };
    if (url.hostname === "linchuan-memorial.example" && path === "/notices/cheng-xubai") return { tab: "obituary", query: "" };
    if (url.hostname === "linchuan-people.example" && path === "/figures/gu-weizhen") return { tab: "founder-profile", query: "" };
    if (url.hostname === "haizhou-people.example" && path === "/interview/gu-weizhen-2023") return { tab: "founder-interview", query: "" };
    if (url.hostname === "linchuan-literature.example" && path === "/archive/2020/gu-weizhen") return { tab: "founder-poem", query: "" };
    if (url.hostname === "linchuan-archive.example" && path === "/exhibitions/tide-paper") return { tab: "founder-collection", query: "" };
    if (url.hostname === "jiawen-auction.example" && path === "/results/2018-autumn/linchuan") return { tab: "founder-auction", query: "" };
    if (url.hostname === "jiawen-auction.example" && path === "/catalog/2017-spring/lanxu-buddhist-art") return { tab: "buddhist-sale", query: "" };
    if (url.hostname === "beilu-care.example" && path === "/about") return { tab: "rehab-center", query: "" };
    if (url.hostname === "beilu-care.example" && path === "/archive/linchao-2019") return { tab: "aid-review", query: "" };
    if (url.hostname === "linchuan-archive.example" && path === "/places/beilu-17") return { tab: "beilu-address", query: "" };
    if (url.hostname === "mingchuan-books.example" && path === "/title/walk-to-today") return { tab: "biography", query: "" };
    if (url.hostname === "linchuan-business.example" && path === "/archive/2016/lu-wenchuan") return { tab: "lu-memorial", query: "" };
    if (url.hostname === "haijia-heji.example" && path === "/history/2016-gu-weizhen") return { tab: "hospital", query: "" };
    if (url.hostname === "wusou-cache.example" && path === "/snapshot/R-06-4") return { tab: "record-revision", query: "" };
    if (url.hostname === "wusou-cache.example" && path === "/snapshot/QC-AID-19") return { tab: "aid-selection", query: "" };
    if (url.hostname === "anshi-office.example" && path === "/rules/S-17") return { tab: "continuity-rule", query: "" };
    if (url.hostname === "anshi-office.example" && path === "/minutes/2019-04-17") return { tab: "founder-briefing", query: "" };
    if (url.hostname === "anshi-office.example" && path === "/archive/cross-index-A00") return { tab: "convergence-index", query: "" };
    if (url.hostname === "wusou-cache.example" && path === "/messages/WX-0825") return { tab: "zhou-gu-message", query: "" };
    if (url.hostname === "wusou-cache.example" && path === "/relay/GZ-825-17") return { tab: "follower-relay", query: "" };
    if (url.hostname === "wuting-traffic.example" && path === "/case/LC-7M21") return { tab: "accident-dossier", query: "" };
    if (url.hostname === "anshi-office.example" && path === "/archive/incident-cross-M0826") return { tab: "incident-index", query: "" };
    return missing;
  } catch {
    return missing;
  }
}
