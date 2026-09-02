import { ACTIVITY_URL, type BrowserRoute } from "./browser-navigation";

export const BROWSER_URLS: Record<string, string> = {
  trip: "boan.example/account/orders",
  forum: "wuting-talk.example/latest",
  history: "browser://history",
  downloads: "browser://downloads",
  ride: "anshi.example/booking/WT-0831-2140",
  activity: ACTIVITY_URL,
  survivor: "wuting-talk.example/u/rain-after",
  "lost-cat": "linchuan-pets.example/lost/mili-0818",
  "neighborhood-notice": "qingtongli.example/notices/0822",
  obituary: "linchuan-memorial.example/notices/cheng-xubai",
  "founder-profile": "linchuan-people.example/figures/gu-weizhen",
  "founder-interview": "haizhou-people.example/interview/gu-weizhen-2023",
  "founder-poem": "linchuan-literature.example/archive/2020/gu-weizhen",
  "founder-collection": "linchuan-archive.example/exhibitions/tide-paper",
  "founder-auction": "jiawen-auction.example/results/2018-autumn/linchuan",
  biography: "mingchuan-books.example/title/remaining-time",
  "lu-memorial": "linchuan-business.example/archive/2016/lu-wenchuan",
  hospital: "haijia-heji.example/history/2016-gu-weizhen",
};

export const BROWSER_LABELS: Record<string, string> = {
  trip: "泊岸旅行",
  forum: "雾汀同城",
  history: "历史记录",
  downloads: "下载内容",
  search: "雾搜",
  ride: "安时接送",
  activity: "安时活动服务",
  survivor: "雨停以后",
  "lost-cat": "寻猫启事",
  "neighborhood-notice": "社区通知",
  obituary: "治丧信息",
  "founder-profile": "顾惟真",
  "founder-interview": "海州人物",
  "founder-poem": "临川文艺",
  "founder-collection": "文献收藏展",
  "founder-auction": "秋拍记录",
  biography: "顾惟真自传",
  "lu-memorial": "旧报归档",
  hospital: "海岬和济",
  "not-found": "页面未找到",
};

const OPTIONAL_TABS = [
  "forum",
  "history",
  "downloads",
  "activity",
  "survivor",
  "lost-cat",
  "neighborhood-notice",
  "obituary",
  "founder-profile",
  "founder-interview",
  "founder-poem",
  "founder-collection",
  "founder-auction",
  "biography",
  "lu-memorial",
  "hospital",
  "not-found",
];

export function browserAddress(tab: string, pageQuery: string) {
  const forumPaths: Record<string, string> = {
    "北站附近有通宵药店吗？最好能送到老城": "60318",
    "有人参加过安时那边的周末活动吗": "60307",
    "沿海公路夜间施工，临时公交调整汇总": "60320",
    "老城民宿到旧灯塔，早上五点能叫到车吗": "60285",
  };
  if (tab === "forum" && forumPaths[pageQuery]) return `wuting-talk.example/thread/${forumPaths[pageQuery]}`;
  if (tab === "activity" && pageQuery.startsWith("archive/")) return `anshi.example/activities/${pageQuery}`;
  if (tab === "activity" && pageQuery === "community") return "guichao.example/home";
  if (tab === "activity" && pageQuery === "witness") return "guichao.example/records/session-06";
  if (tab === "activity" && pageQuery === "foundation") return "anshi-foundation.example/about";
  return BROWSER_URLS[tab] ?? pageQuery;
}

export function browserTabLabel(tab: string, routes: BrowserRoute[]) {
  if (tab !== "activity") return BROWSER_LABELS[tab];
  const activityQuery = [...routes].reverse().find((item) => item.tab === "activity")?.query;
  if (["community", "witness"].includes(activityQuery ?? "")) return "归潮见证";
  if (activityQuery === "foundation") return "安时基金会";
  return BROWSER_LABELS.activity;
}

export function visibleBrowserTabs(routes: BrowserRoute[], travelDiscovered: boolean, unlocked: boolean) {
  return [
    "search",
    ...(travelDiscovered ? ["trip"] : []),
    ...OPTIONAL_TABS.filter((tab) => routes.some((item) => item.tab === tab)),
    ...(unlocked ? ["ride"] : []),
  ];
}
