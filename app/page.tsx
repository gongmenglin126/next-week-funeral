"use client";

import { FormEvent, useReducer, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  Bell,
  Bookmark,
  Clock3,
  Download,
  FileSearch,
  FolderClosed,
  Globe2,
  History,
  Image,
  LaptopMinimal,
  LockKeyhole,
  Menu,
  Minus,
  MoveRight,
  MoreHorizontal,
  NotebookPen,
  Plane,
  Plus,
  RotateCw,
  Search,
  Trash2,
  Wifi,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allOrdersCancelled, chapterReducer, initialChapterState } from "@/lib/chapter-one";
import { LighthouseTicket, NotesPanel, SecretRide, TravelPlatform } from "./chapter-one";

const resultSets = [
  {
    test: (value: string) => /雾汀|夜间接送|九小时/.test(value),
    label: "约 6 条结果",
    results: [
      {
        eyebrow: "雾汀县文旅信息",
        title: "雾汀旧城夜间接驳服务调整公告",
        text: "末班接驳于 21:40 从北站发车。部分社会机构包车不显示终点，请向预订方确认。",
        url: "wuting.gov.example/traffic/night-shuttle",
      },
      {
        eyebrow: "图片匹配 · 低清存档",
        title: "第七期“与惧同行”生命关怀活动回顾",
        text: "页面已删除。搜索快照仍保留一张室内照片，构图与旅行计划里的民宿照片高度相似。",
        url: "changzhou-care.example/archive/session-07",
        locked: true,
      },
    ],
  },
  {
    test: (value: string) => /守夜|葬礼|借丧|告别体验|第七期|生命关怀/.test(value),
    label: "约 3 条结果",
    results: [
      {
        eyebrow: "搜索快照 · 页面已移除",
        title: "第七期生前告别体验｜参与须知（修订前）",
        text: "旧版摘要曾提及一名陪同者与夜间留场环节。修订后的公开页面已删除这两项说明。",
        url: "changzhou-care.example/archive/session-07/notice",
        locked: true,
      },
      {
        eyebrow: "病友论坛",
        title: "有人参加过‘生前告别体验’吗？",
        text: "发帖人反复修改问题：陪伴者需要知道全部流程吗？如果中途反悔，登记还能撤销吗？",
        url: "night-sail.example/topic/1842",
      },
    ],
  },
];

function SearchResults({ query, unlocked, openTravel, openForum }: { query: string; unlocked: boolean; openTravel: () => void; openForum: () => void }) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const matched = unlocked ? resultSets.find((set) => set.test(query)) : undefined;
  if (/泊岸|boan|旅行平台/.test(query.toLowerCase())) return <div className="mt-8"><button className="search-result" onClick={openTravel}><small className="text-[#78957e]">boan.example · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">泊岸旅行 — 酒店、车票、当地体验预订</h3><p className="text-xs text-[#8493a4]">好好出发，慢慢回来。查询预订、管理订单与查看电子票。</p></button></div>;
  if (/雾汀同城|通宵药店/.test(query)) return <div className="mt-8"><button className="search-result" onClick={openForum}><small className="text-[#78957e]">wuting-talk.example</small><h3 className="my-3 text-xl text-[#286ab3]">雾汀同城 · 生活、出行、互助</h3><p className="text-xs text-[#8493a4]">雾汀本地生活讨论区。</p></button></div>;

  if (selectedUrl && matched) {
    const result = matched.results.find((item) => item.url === selectedUrl);
    if (result) {
      return (
        <article className="search-document">
          <button onClick={() => setSelectedUrl(null)}><ArrowLeft />返回搜索结果</button>
          <p>{result.eyebrow}</p>
          <h1>{result.title}</h1>
          <code>{result.url}</code>
          <div><p>{result.text}</p><p>此页面的公开版本仅保留部分内容。页面编号与发布日期仍可用于查找早期存档。</p></div>
        </article>
      );
    }
  }

  if (!query) {
    return (
      <div className="grid min-h-[330px] place-content-center justify-items-center gap-3 text-center text-[#87959b]">
        <Search className="size-8 stroke-[1.3]" aria-hidden="true" />
        <p className="m-0 text-[13px] text-[#5c6d74]">在上方地址栏输入网站名称或关键词。</p>
      </div>
    );
  }

  if (!matched) {
    return (
      <div className="grid min-h-[330px] place-content-center justify-items-center gap-3 text-center text-[#87959b]">
        <FileSearch className="size-8 stroke-[1.3]" aria-hidden="true" />
        <p className="m-0 text-[13px] text-[#5c6d74]">没有找到足够相关的结果</p>
        <span className="max-w-[440px] text-[11px] leading-7">
          试着把关键词拆短，地点、时间和原句通常比完整问题更有效。
        </span>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-[860px]">
      <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">
        {matched.label}
      </p>
      {matched.results.map((result) => (
        <button className="search-result" key={result.url} onClick={() => setSelectedUrl(result.url)}>
          <div className="flex items-center gap-2 text-[10px] text-[#7f8f96]">
            <span>{result.eyebrow}</span>
            {result.locked ? <LockKeyhole className="size-3" aria-label="网页无法直接打开" /> : null}
          </div>
          <h3 className="my-2 font-serif text-xl font-medium text-[#28516a]">{result.title}</h3>
          <p className="mb-2 max-w-[720px] text-xs leading-7 text-[#5e6d74]">{result.text}</p>
          <code className="text-[10px] text-[#718c76]">{result.url}</code>
        </button>
      ))}
    </div>
  );
}

function ForumPage({ unlocked }: { unlocked: boolean }) {
  const [thread, setThread] = useState<string | null>(null);
  const threads: Record<string, { tag: string; author: string; date: string; body: string[]; replies: string[] }> = {
    "沿海公路夜间施工，临时公交调整汇总": {
      tag: "置顶", author: "雾汀交通志愿组", date: "8月25日", body: ["沿海公路南段本周22:00至次日06:00施工，公交临时绕行北站路。", "步行去海堤的游客请使用旧城东侧步道，不要穿过施工路口。"], replies: ["白天公交已经恢复，夜间还是看站牌通知。"],
    },
    "老城民宿到旧灯塔，早上五点能叫到车吗": {
      tag: "旅行", author: "山雀", date: "8月22日", body: ["想去看日出，住在老城民宿，怕一早叫不到车。", "有人坐过游客中心的灯塔接驳吗？"], replies: ["坐过，五点十分发车，提前十分钟到就行。", "我在泊岸旅行订的，下载好电子票，验票要看尾号。"],
    },
    "北站附近有通宵药店吗？最好能送到老城": {
      tag: "求助", author: "玻璃海", date: "8月25日 04:51", body: ["朋友半夜不太舒服，老城这边跑了两家都关门了。", "想问北站附近有没有通宵药店，最好能送到民宿。"], replies: ["北站东口有一家，但送老城至少四十分钟。", "沿海路那边没有药店，别往南走。"],
    },
    "有人参加过安时那边的周末活动吗": {
      tag: "闲聊", author: "灰鲸", date: "8月23日", body: ["朋友收到过邀请，公开页面只写了生命教育。", "想问问有没有人去过，具体都做什么？"], replies: ["参加过普通场，写信、聊天，没什么特别的。", "你说的是第七期吗？那一期后来删页了。"],
    },
  };

  if (thread && threads[thread]) {
    const data = threads[thread];
    return (
      <div className="forum-page">
        <header className="forum-header"><div><strong>雾汀同城</strong><span>生活 · 出行 · 互助</span></div><div className="forum-user"><span className="forum-avatar">潮</span><span>潮汐失眠</span></div></header>
        <article className="forum-thread">
          <button className="forum-back" onClick={() => setThread(null)}><ArrowLeft />返回雾汀生活</button>
          <span className="thread-tag">{data.tag}</span>
          <h1>{thread}</h1>
          <p className="thread-meta">{data.author} · 发布于 {data.date}</p>
          <div className="thread-body">{data.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <h2>回复</h2>
          {data.replies.map((reply, index) => <div className="thread-reply" key={reply}><span>{index + 1}F</span><p>{reply}</p></div>)}
        </article>
      </div>
    );
  }

  return (
    <div className="forum-page">
      <header className="forum-header">
        <div><strong>雾汀同城</strong><span>生活 · 出行 · 互助</span></div>
        <div className="forum-user"><span className="forum-avatar">潮</span><span>潮汐失眠</span></div>
      </header>
      <div className="forum-layout">
        <section>
          <p className="forum-board-title">雾汀生活 / 最新讨论</p>
          {[
            ["置顶", "沿海公路夜间施工，临时公交调整汇总", "雾汀交通志愿组", "8-25"],
            ["求助", "北站附近有通宵药店吗？最好能送到老城", "玻璃海", "8-25"],
            ["闲聊", "有人参加过安时那边的周末活动吗", "灰鲸", "8-23"],
            ["旅行", "老城民宿到旧灯塔，早上五点能叫到车吗", "山雀", "8-22"],
          ].filter(([, title]) => unlocked || !title.includes("安时")).map(([tag, title, author, date]) => (
            <button className="forum-row" key={title} onClick={() => threads[title] && setThread(title)} disabled={!threads[title]}>
              <span>{tag}</span>
              <div><h3>{title}</h3><p>{author} · 最后回复 {date}</p></div>
              <small>{date}</small>
            </button>
          ))}
        </section>
        <aside className="forum-sidebar">
          <p>当前账号</p>
          <strong>潮汐失眠</strong>
          <span>注册于 2025-11-07</span>
          <hr />
          <div className="forum-stat">我的回复 <b>12</b></div>
          <div className="forum-stat">我的收藏 <b>3</b></div>
          <div className="forum-stat">草稿箱 <b>1</b></div>
        </aside>
      </div>
    </div>
  );
}

function HistoryPage({ navigate, unlocked }: { navigate: (action: string) => void; unlocked: boolean }) {
  const groups = [
    {
      date: "昨天 · 8月25日",
      items: [
        ["04:53", "北站附近有通宵药店吗？最好能送到老城", "wuting-talk.example/thread/60318", "forum"],
        ["04:47", "雾汀地图｜老城与沿海区域", "map.example/wuting/old-town", "map"],
      ],
    },
    {
      date: "8月24日",
      items: [
        ["23:14", "泊岸旅行｜我的订单", "boan.example/account/orders", "trip"],
        ["22:46", "潮汐失眠的个人主页", "wuting-talk.example/u/tidal-insomnia", "forum"],
        ["16:20", "第七期生命关怀活动回顾", "changzhou-care.example/archive/session-07", "activity"],
      ],
    },
  ];
  return (
    <div className="browser-record-page">
      <header><History /><div><h2>历史记录</h2><p>此设备上的浏览记录</p></div></header>
      {groups.map((group) => (
        <section key={group.date}>
          <h3>{group.date}</h3>
          {group.items.filter((item) => unlocked || item[3] !== "activity").map(([time, title, url, action]) => (
            <button key={time + title} onClick={() => navigate(action)}>
              <time>{time}</time><Globe2 /><span><strong>{title}</strong><small>{url}</small></span><MoreHorizontal />
            </button>
          ))}
        </section>
      ))}
    </div>
  );
}

function DownloadsPage({ unlocked, preview, setPreview }: { unlocked: boolean; preview: string | null; setPreview: (name: string | null) => void }) {
  if (preview) {
    return (
      <div className="document-preview">
        <header><button onClick={() => setPreview(null)}><ArrowLeft />返回下载内容</button><span>{preview}</span></header>
        {preview === "灯塔接驳电子票.pdf" ? <LighthouseTicket /> : preview === "雾汀行程_共同版.pdf" ? <article className="pdf-sheet"><p className="pdf-mark">WUTING / OUR TRIP</p><h1>雾汀旅行</h1><p>8月21日一起确定的旅行计划</p><hr /><h2>预订清单 · 泊岸旅行</h2><p>8月26日—28日　南岸民宿</p><p>8月27日 05:10　灯塔接驳</p><p>8月28日—30日　山线民宿</p><p>8月26日 16:00　旧盐场手作体验</p><p>8月31日 16:20　回程高铁</p><hr /><p>想去的地方不一定都去。天气不好就睡个懒觉。</p></article> : preview.endsWith(".pdf") ? (
          <article className="pdf-sheet">
            <p className="pdf-mark">SESSION 07 / ARCHIVED COPY</p>
            <h1>{preview.includes("session07") ? "第七期参与须知" : "雾汀共同旅行计划"}</h1>
            <p>本文件由浏览器于8月24日 16:22 下载。来源网页当前无法访问。</p>
            <hr />
            <h2>陪同人员说明</h2>
            <p>夜间环节需由登记陪同人留场。具体地点与到达方式将在活动开始前单独发送。</p>
            <p className="pdf-foot">第 1 页 / 共 6 页</p>
          </article>
        ) : (
          <div className="photo-preview crop-preview"><img src="/game/inn-corridor-original.webp" alt="被裁剪过的民宿走廊照片" /></div>
        )}
      </div>
    );
  }
  return (
    <div className="browser-record-page">
      <header><Download /><div><h2>下载内容</h2><p>最近下载的文件</p></div></header>
      <section>
        <h3>本周</h3>
        {[
          ["8月18日", "灯塔接驳电子票.pdf", "186 KB · 下载完成"],
          ["8月24日", "session07_notice_old.pdf", "428 KB · 来源页面已无法访问"],
          ["8月24日", "IMG_4821_crop.jpg", "1.8 MB · 已移动到回收站"],
          ["8月21日", "雾汀行程_共同版.pdf", "246 KB · 下载完成"],
        ].filter(([, title]) => unlocked || !title.includes("session07")).map(([time, title, meta]) => (
          <button key={title} onClick={() => setPreview(title)}>
            <time>{time}</time><FileSearch /><span><strong>{title}</strong><small>{meta}</small></span><MoreHorizontal />
          </button>
        ))}
      </section>
    </div>
  );
}

type DesktopPanelKind = "files" | "photos" | "trash";

function DesktopPanel({ kind, onClose, onDownloads }: { kind: DesktopPanelKind; onClose: () => void; onDownloads: (name?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const content = {
    files: {
      title: "雾汀旅行",
      subtitle: "3 个项目",
      rows: [
        ["文件夹", "订单与票据", "8月24日"],
        ["PDF", "雾汀行程_共同版.pdf", "8月21日 19:26"],
        ["PDF", "灯塔接驳电子票.pdf", "8月18日 23:47"],
      ],
    },
    photos: {
      title: "旅行照片",
      subtitle: "按拍摄时间排列",
      rows: [
        ["照片", "IMG_4819.jpg", "8月24日 17:42"],
        ["照片", "IMG_4820.jpg", "8月24日 17:43"],
        ["缺失", "IMG_4821.jpg", "未找到原图"],
      ],
    },
    trash: {
      title: "回收站",
      subtitle: "最近删除的文件",
      rows: [
        ["图片", "IMG_4821_crop.jpg", "8月25日 04:38 删除"],
        ["PDF", "session07_notice_old.pdf", "8月24日 16:31 删除"],
        ["文本文档", "给你.txt", "8月24日 23:02 删除 · 0 KB"],
      ],
    },
  }[kind];

  const photos = [
    ["IMG_4818.jpg", "/game/seaside-dinner.webp", "8月22日 · 盐场预约附件"],
    ["IMG_4819.jpg", "/game/seaside-dinner.webp", "8月24日 17:42 · 栖潮餐厅"],
    ["IMG_4820.jpg", "/game/wuting-sea-wallpaper.webp", "8月24日 17:43 · 雾汀老城"],
    ["IMG_4821.jpg", "", "原始文件未找到"],
  ];

  if (kind === "photos") {
    const current = photos.find(([name]) => name === selected);
    return (
      <section className="desktop-panel photo-window" aria-label="旅行照片">
        <header><div className="window-controls"><button onClick={onClose} aria-label="关闭窗口"><X /></button><button onClick={onClose} aria-label="最小化"><Minus /></button></div><strong>旅行照片</strong><span /></header>
        <div className="photo-app-layout">
          <aside><strong>图库</strong><div className="photo-nav active"><Image />所有照片</div><div className="photo-nav"><Clock3 />最近项目</div><div className="photo-nav"><Trash2 />最近删除</div></aside>
          <section className="photo-main">
            <header><div><h2>雾汀旅行</h2><p>4 个项目</p></div>{current ? <button onClick={() => setSelected(null)}>关闭预览</button> : null}</header>
            {current ? (
              <div className="photo-viewer">
                {current[1] ? <img src={current[1]} alt={current[0]} /> : <div className="missing-photo"><FileSearch /><span>找不到原始文件</span></div>}
                <footer><strong>{current[0]}</strong><span>{current[2]}</span></footer>
              </div>
            ) : (
              <div className="photo-grid">
                {photos.map(([name, src, meta]) => (
                  <button key={name} onClick={() => setSelected(name)}>
                    {src ? <img src={src} alt="雾汀旅行照片缩略图" /> : <span className="missing-thumb"><FileSearch /></span>}
                    <strong>{name}</strong><small>{meta}</small>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="desktop-panel" aria-label={content.title}>
      <header>
        <div className="window-controls">
          <button onClick={onClose} aria-label="关闭窗口"><X /></button>
          <button onClick={onClose} aria-label="最小化"><Minus /></button>
        </div>
        <strong>{content.title}</strong>
        <MoreHorizontal />
      </header>
      <div className="desktop-panel-body">
        <aside>
          <span>个人收藏</span>
          <div className="panel-nav active"><Clock3 />最近使用</div>
          <div className="panel-nav"><Download />下载</div>
          <div className="panel-nav"><FolderClosed />文稿</div>
          <span>位置</span>
          <div className="panel-nav"><LaptopMinimal />这台电脑</div>
        </aside>
        <section className="desktop-panel-content">
          <div><h2>{content.title}</h2><p>{content.subtitle}</p></div>
          <div className="file-table">
            {content.rows.map(([type, name, meta]) => (
              <button key={name} onClick={() => { setSelected(name); if (kind === "files") onDownloads(name.endsWith(".pdf") ? name : undefined); }} className={selected === name ? "selected" : ""}>
                <span className={type === "缺失" ? "missing-file" : ""}><FileSearch /></span>
                <strong>{name}</strong><small>{type}</small><time>{meta}</time>
              </button>
            ))}
          </div>
          {selected ? (
            <aside className="file-inspector">
              <FileSearch /><div><strong>{selected}</strong><p>{selected.includes("4821") ? "已删除的裁剪图片。原始文件不在此文件夹。" : selected.endsWith(".pdf") ? "PDF 文稿 · 可以在浏览器下载记录中打开。" : "最后修改时间已记录。"}</p></div>
            </aside>
          ) : null}
          {selected === "IMG_4821_crop.jpg" ? <div className="trash-photo crop-preview"><img src="/game/inn-corridor-original.webp" alt="被裁剪过的民宿走廊照片" /></div> : null}
        </section>
      </div>
    </section>
  );
}

type BrowserRoute = { tab: string; query: string };

export default function Home() {
  const [enteredComputer, setEnteredComputer] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [desktopPanel, setDesktopPanel] = useState<DesktopPanelKind | "notes" | null>(null);
  const [chapter, dispatch] = useReducer(chapterReducer, undefined, initialChapterState);
  const [checked, setChecked] = useState<string[]>([]);
  const [downloadPreview, setDownloadPreview] = useState<string | null>(null);
  const [routes, setRoutes] = useState<BrowserRoute[]>([{ tab: "search", query: "" }]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [address, setAddress] = useState("");
  const [travelDiscovered, setTravelDiscovered] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [browserMenuOpen, setBrowserMenuOpen] = useState(false);
  const [notificationCentre, setNotificationCentre] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const route = routes[routeIndex];
  const activeTab = route.tab;
  const query = route.query;
  const unlocked = allOrdersCancelled(chapter);
  const urls: Record<string, string> = { trip: "boan.example/account/orders", forum: "wuting-talk.example/latest", history: "browser://history", downloads: "browser://downloads", ride: "anshi.example/booking/WT-0831-2140" };
  const labels: Record<string, string> = { trip: "泊岸旅行", forum: "雾汀同城", history: "历史记录", downloads: "下载内容", search: "雾搜", ride: "安时接送" };
  const visibleTabs = ["search", ...(travelDiscovered ? ["trip"] : []), ...(["forum", "history", "downloads"].includes(activeTab) ? [activeTab] : []), ...(unlocked ? ["ride"] : [])];
  // The ride tab is only exposed after its notification has actually been opened.
  const displayedTabs = visibleTabs.filter((tab) => tab !== "ride" || routes.some((item) => item.tab === "ride"));

  function navigate(tab: string, nextQuery = "") {
    if (tab === "ride" && !unlocked) return;
    if (tab === "trip") setTravelDiscovered(true);
    if (tab === "downloads") setDownloadPreview(nextQuery || null);
    setRoutes((oldRoutes) => [...oldRoutes.slice(0, routeIndex + 1), { tab, query: nextQuery }]);
    setRouteIndex(routeIndex + 1);
    setAddress(urls[tab] ?? nextQuery);
    setBrowserOpen(true); setDesktopPanel(null);
    setBookmarkOpen(false); setBrowserMenuOpen(false);
  }
  function moveHistory(delta: number) {
    const nextIndex = routeIndex + delta;
    if (nextIndex < 0 || nextIndex >= routes.length) return;
    setRouteIndex(nextIndex);
    setAddress(urls[routes[nextIndex].tab] ?? routes[nextIndex].query);
  }
  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = address.trim();
    if (!value) return;
    if (/^(https?:\/\/)?boan\.example/.test(value)) { navigate("trip"); return; }
    if (value === "browser://downloads") { navigate("downloads"); return; }
    if (value === "browser://history") { navigate("history"); return; }
    if (/^(https?:\/\/)?anshi\.example/.test(value) && unlocked) { navigate("ride"); return; }
    navigate("search", value);
  }
  function openRide() { dispatch({ type: "dismiss-notification" }); setNotificationCentre(false); navigate("ride"); }
  function openBrowser() { setBrowserOpen(true); setDesktopPanel(null); }
  function closeNotification() { dispatch({ type: "dismiss-notification" }); setNotificationCentre(false); }

  if (!enteredComputer) return (
    <main className="intro-screen">
      <div className="intro-noise" aria-hidden="true" />
      <header className="intro-masthead"><span>雾汀 · 8月26日</span><span>事故后的第二天</span></header>
      <section className="intro-copy" aria-labelledby="game-title">
        <p className="intro-kicker">一场没有走完的旅行</p><h1 id="game-title">下周的葬礼</h1>
        <div className="intro-story">
          <p>你们来雾汀的第三天，旅行突然结束了。</p>
          <p>昨天清晨，她说头疼，下楼买药。后来，警方打来电话：她在沿海公路的路口遭遇车祸，经抢救无效死亡。</p>
          <p>她的手机暂时留作事故调查，电脑还摊在民宿的桌上。剩下的房间、车票和预约都是她订的。</p>
          <p>你得先替这趟旅行收个尾。</p>
        </div>
        <button className="computer-link" onClick={() => setEnteredComputer(true)}><span className="computer-link-icon"><LaptopMinimal /></span><span><small>行程清单放在记事本里</small><strong>打开她的电脑</strong></span><MoveRight /></button>
      </section>
      <div className="intro-photo" aria-hidden="true" />
      <footer className="intro-footer"><span>第一章 · 取消行程</span><span>游戏不会读取你的真实浏览记录</span></footer>
    </main>
  );

  return (
    <main className="computer-desktop" aria-label="她的电脑桌面">
      <div className="desktop-wallpaper" aria-hidden="true" />
      <header className="desktop-menubar">
        <div><span className="desktop-mark">雾</span><strong>{desktopPanel === "notes" ? "记事本" : browserOpen && !desktopPanel ? "雾行浏览器" : "访达"}</strong><span>文件</span><span>显示</span></div>
        <div><Wifi /><BatteryFull /><button className="notification-toggle" onClick={() => setNotificationCentre(!notificationCentre)} aria-label="通知中心" aria-expanded={notificationCentre}><Bell />{unlocked && <i />}</button><span>8月26日 周三 11:08</span></div>
      </header>
      <section className="desktop-icons" aria-label="桌面应用">
        <button onClick={openBrowser}><span className="desktop-app browser-app"><Globe2 /></span><strong>雾行浏览器</strong></button>
        <button onClick={() => setDesktopPanel("notes")}><span className="desktop-app notes-app"><NotebookPen /></span><strong>记事本</strong></button>
        <button onClick={() => setDesktopPanel("files")}><span className="desktop-app"><FolderClosed /></span><strong>雾汀旅行</strong></button>
        <button onClick={() => setDesktopPanel("photos")}><span className="desktop-app photo-app"><Image /></span><strong>旅行照片</strong></button>
        <button onClick={() => setDesktopPanel("trash")}><span className="desktop-app trash-app"><Trash2 /></span><strong>回收站</strong></button>
      </section>
      <div className="desktop-notification"><span className="notification-icon"><NotebookPen /></span><div><strong>记事本</strong><p>雾汀，慢慢玩。</p></div><time>8月24日</time></div>
      <nav className="desktop-dock" aria-label="常用应用">
        <button onClick={openBrowser} aria-label="打开雾行浏览器"><Globe2 /></button>
        <button onClick={() => setDesktopPanel("notes")} aria-label="打开记事本"><NotebookPen /></button>
        <button onClick={() => setDesktopPanel("files")} aria-label="打开文件"><FolderClosed /></button>
        <button onClick={() => setDesktopPanel("photos")} aria-label="打开照片"><Image /></button>
        <i /><button onClick={() => setDesktopPanel("trash")} aria-label="打开回收站"><Trash2 /></button>
      </nav>

      <section className="browser-window" aria-label="雾行浏览器" hidden={!browserOpen}>
        <div className="browser-titlebar"><div className="window-controls"><button onClick={() => setBrowserOpen(false)} aria-label="关闭浏览器"><X /></button><button onClick={() => setBrowserOpen(false)} aria-label="最小化浏览器"><Minus /></button></div><p>雾行浏览器</p><span /></div>
        <Tabs value={activeTab} onValueChange={(value) => navigate(value, value === "search" ? query : "")} className="h-[calc(100%-34px)] gap-0!">
          <TabsList className="browser-tabs">
            {displayedTabs.map((tab) => <TabsTrigger value={tab} key={tab}>{tab === "trip" ? <Plane /> : tab === "search" ? <Search /> : tab === "downloads" ? <Download /> : tab === "history" ? <History /> : <Globe2 />}{labels[tab]}</TabsTrigger>)}
            <Button variant="ghost" size="icon-xs" aria-label="新建搜索标签页" onClick={() => navigate("search")}><Plus /></Button>
          </TabsList>
          <form className="browser-toolbar" onSubmit={runSearch}>
            <div className="browser-nav">
              <button type="button" disabled={routeIndex === 0} onClick={() => moveHistory(-1)} aria-label="返回"><ArrowLeft /></button>
              <button type="button" disabled={routeIndex === routes.length - 1} onClick={() => moveHistory(1)} aria-label="前进"><ArrowRight /></button>
              <button type="button" onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 400); }} aria-label="刷新"><RotateCw className={refreshing ? "refreshing" : ""} /></button>
            </div>
            <div className="browser-address"><LockKeyhole /><Input aria-label="地址栏和搜索框" placeholder="搜索网页或输入网址" value={address} onChange={(event) => setAddress(event.target.value)} onFocus={(event) => event.currentTarget.select()} spellCheck={false} /></div>
            <Button type="submit" variant="ghost" size="icon-sm" aria-label="搜索"><Search /></Button>
            <div className="browser-action-wrap bookmark-control">
              <Button type="button" variant="ghost" size="icon-sm" aria-label="书签" onClick={() => { setBookmarkOpen(!bookmarkOpen); setBrowserMenuOpen(false); }}><Bookmark /></Button>
              {bookmarkOpen && <div className="browser-popover"><strong>书签</strong><button type="button" onClick={() => navigate("forum")}>雾汀同城</button>{travelDiscovered && <button type="button" onClick={() => navigate("trip")}>泊岸旅行 · 我的订单</button>}</div>}
            </div>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="历史记录" onClick={() => navigate("history")}><History /></Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="下载内容" onClick={() => navigate("downloads")}><Download /></Button>
            <div className="browser-action-wrap">
              <Button type="button" variant="ghost" size="icon-sm" aria-label="浏览器菜单" onClick={() => { setBrowserMenuOpen(!browserMenuOpen); setBookmarkOpen(false); }}><Menu /></Button>
              {browserMenuOpen && <div className="browser-popover menu-popover"><button type="button" onClick={() => navigate("history")}><History />历史记录</button><button type="button" onClick={() => navigate("downloads")}><Download />下载内容</button><button type="button" onClick={() => { setDesktopPanel("notes"); setBrowserMenuOpen(false); }}><NotebookPen />打开记事本</button></div>}
            </div>
          </form>
          <div className="browser-viewport">
            <TabsContent forceMount value="trip" className="min-h-full data-[state=inactive]:hidden"><TravelPlatform state={chapter} onCancel={dispatch} onDownloads={() => navigate("downloads")} /></TabsContent>
            <TabsContent forceMount value="forum" className="min-h-full bg-[#f4f1e9] data-[state=inactive]:hidden"><ForumPage unlocked={unlocked} /></TabsContent>
            <TabsContent forceMount value="history" className="min-h-full bg-[#fbfcfc] data-[state=inactive]:hidden"><HistoryPage unlocked={unlocked} navigate={(action) => {
              if (action === "forum" || action === "trip") { navigate(action); return; }
              navigate("search", action === "activity" ? "第七期 生命关怀" : "雾汀 老城地图");
            }} /></TabsContent>
            <TabsContent forceMount value="downloads" className="min-h-full bg-[#fbfcfc] data-[state=inactive]:hidden"><DownloadsPage unlocked={unlocked} preview={downloadPreview} setPreview={setDownloadPreview} /></TabsContent>
            <TabsContent forceMount value="search" className="browser-search-content data-[state=inactive]:hidden">
              <header><p className="m-0 font-serif text-2xl text-[#6c828c]">雾搜</p><h2 className="my-3 font-serif text-[28px] font-medium">{query ? "“" + query + "”" : "找一找，想去的地方。"}</h2></header>
              <SearchResults key={query} query={query} unlocked={unlocked} openTravel={() => navigate("trip")} openForum={() => navigate("forum")} />
            </TabsContent>
            {unlocked && <TabsContent forceMount value="ride" className="min-h-full data-[state=inactive]:hidden"><SecretRide /></TabsContent>}
          </div>
        </Tabs>
      </section>

      {desktopPanel === "notes" ? <NotesPanel checked={checked} onCheck={(id) => setChecked((oldChecked) => oldChecked.includes(id) ? oldChecked.filter((value) => value !== id) : [...oldChecked, id])} onClose={() => setDesktopPanel(null)} /> : desktopPanel ? <DesktopPanel key={desktopPanel} kind={desktopPanel} onClose={() => setDesktopPanel(null)} onDownloads={(name) => navigate("downloads", name)} /> : null}

      {(chapter.notification === "visible" || notificationCentre) && <aside className="chapter-notification" role="status" aria-live="polite" aria-label={unlocked ? "安时接送通知" : "通知中心"}>
        <header><Bell /><strong>{unlocked ? "安时接送 · 行程提醒" : "通知中心"}</strong><button aria-label="收起通知" onClick={closeNotification}><X /></button></header>
        <p>{unlocked ? "您预约的夜间接送即将开放乘车信息。" : "暂无新通知"}</p>
        {unlocked && <><small>8月31日 21:40｜雾汀北站｜2人</small><Button variant="secondary" onClick={openRide}>查看订单 <ArrowUpRight /></Button></>}
      </aside>}
    </main>
  );
}
