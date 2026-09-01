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
      return missing;
    }
    if (url.hostname === "anshi-foundation.example" && path === "/about") return { tab: "activity", query: "foundation" };
    if (url.hostname === "wuting-talk.example") {
      if (["/", "/latest"].includes(path)) return { tab: "forum", query: "" };
      if (path === "/u/rain-after") return { tab: "survivor", query: "" };
      if (FORUM_PATHS[path] && (path !== "/thread/60307" || unlocked)) return { tab: "forum", query: FORUM_PATHS[path] };
    }
    if (url.hostname === "linchuan-memorial.example" && path === "/notices/cheng-xubai") return { tab: "obituary", query: "" };
    return missing;
  } catch {
    return missing;
  }
}
