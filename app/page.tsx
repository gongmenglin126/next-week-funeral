"use client";

import { FormEvent, useReducer, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  Bell,
  Bookmark,
  Download,
  FolderClosed,
  Globe2,
  History,
  Image as ImageIcon,
  LaptopMinimal,
  LockKeyhole,
  Menu,
  MoveRight,
  NotebookPen,
  Plane,
  Trash2,
  Wifi,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allOrdersCancelled, chapterReducer, initialChapterState } from "@/lib/chapter-one";
import { browserAddress, browserTabLabel, visibleBrowserTabs } from "@/lib/browser-tabs";
import { NotesPanel, SecretRide, TravelPlatform } from "./chapter-one";
import { DownloadsPage, HistoryPage } from "./browser-record-pages";
import { DesktopPanel, type DesktopPanelKind } from "./desktop-evidence";
import { SearchBox } from "./search-box";
import { ForumPage } from "./forum-page";
import { SearchResults, BrowserNotFound } from "./search-results";
import { ActivityArchivePage, ActivityPage, CommunityPage, FoundationPage, HiddenSeventhPage, ObituaryPage, SurvivorProfile, WitnessPage } from "./activity-page";
import { LostCatPage, NeighborhoodNoticePage } from "./cat-trail-pages";
import { BiographyPage, FounderProfilePage, HaijiaHospitalPage, LuWenchuanMemorialPage } from "./founder-trail-pages";
import { resolveBrowserInput, type BrowserRoute } from "@/lib/browser-navigation";
import type { WindowPoint } from "@/lib/window-position";

export default function Home() {
  const [enteredComputer, setEnteredComputer] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [desktopPanel, setDesktopPanel] = useState<DesktopPanelKind | "notes" | null>(null);
  const [chapter, dispatch] = useReducer(chapterReducer, undefined, initialChapterState);
  const [checked, setChecked] = useState<string[]>([]);
  const [notePosition, setNotePosition] = useState<WindowPoint | null>(null);
  const [evidencePosition, setEvidencePosition] = useState<WindowPoint | null>(null);
  const [downloadPreview, setDownloadPreview] = useState<string | null>(null);
  const [routes, setRoutes] = useState<BrowserRoute[]>([{ tab: "search", query: "" }]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [address, setAddress] = useState("");
  const [travelDiscovered, setTravelDiscovered] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [browserMenuOpen, setBrowserMenuOpen] = useState(false);
  const [notificationCentre, setNotificationCentre] = useState(false);
  const [restoredPhoto, setRestoredPhoto] = useState(false);
  const route = routes[routeIndex];
  const activeTab = route.tab;
  const query = route.query;
  const unlocked = allOrdersCancelled(chapter);
  const visibleTabs = visibleBrowserTabs(routes, travelDiscovered, unlocked);
  // The ride tab is only exposed after its notification has actually been opened.
  const displayedTabs = visibleTabs.filter((tab) => tab !== "ride" || routes.some((item) => item.tab === "ride"));

  function navigate(tab: string, nextQuery = "") {
    if (tab === "ride" && !unlocked) return;
    if (tab === "trip") setTravelDiscovered(true);
    if (tab === "downloads") setDownloadPreview(nextQuery || null);
    setRoutes((oldRoutes) => [...oldRoutes.slice(0, routeIndex + 1), { tab, query: nextQuery }]);
    setRouteIndex(routeIndex + 1);
    setAddress(browserAddress(tab, nextQuery));
    setBrowserOpen(true); setDesktopPanel(null);
    setBookmarkOpen(false); setBrowserMenuOpen(false);
  }
  function moveHistory(delta: number) {
    const nextIndex = routeIndex + delta;
    if (nextIndex < 0 || nextIndex >= routes.length) return;
    setRouteIndex(nextIndex);
    setAddress(browserAddress(routes[nextIndex].tab, routes[nextIndex].query));
    if (routes[nextIndex].tab === "downloads") setDownloadPreview(routes[nextIndex].query || null);
    setBookmarkOpen(false); setBrowserMenuOpen(false);
  }
  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitBrowserInput(address);
  }
  function submitBrowserInput(value: string) {
    const target = resolveBrowserInput(value, unlocked);
    if (target) navigate(target.tab, target.query);
  }
  function openRide() { dispatch({ type: "dismiss-notification" }); setNotificationCentre(false); navigate("ride"); }
  function openBrowser() { setBrowserOpen(true); setDesktopPanel(null); }
  function closeNotification() { dispatch({ type: "dismiss-notification" }); setNotificationCentre(false); }

  if (!enteredComputer) return (
    <main key="intro" className="intro-screen">
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
    <main key="desktop" className="computer-desktop" aria-label="她的电脑桌面">
      <div className="desktop-wallpaper" aria-hidden="true" />
      <header className="desktop-menubar">
        <div><span className="desktop-mark">雾</span><strong>{desktopPanel === "notes" ? "记事本" : browserOpen && !desktopPanel ? "雾行浏览器" : "访达"}</strong></div>
        <div><Wifi /><BatteryFull /><button className="notification-toggle" onClick={() => setNotificationCentre(!notificationCentre)} aria-label="通知中心" aria-expanded={notificationCentre}><Bell />{unlocked && <i />}</button><span>8月26日 周三 11:08</span></div>
      </header>
      <section className="desktop-icons" aria-label="桌面应用">
        <button onClick={openBrowser}><span className="desktop-app browser-app"><Globe2 /></span><strong>雾行浏览器</strong></button>
        <button onClick={() => setDesktopPanel("notes")}><span className="desktop-app notes-app"><NotebookPen /></span><strong>记事本</strong></button>
        <button onClick={() => setDesktopPanel("files")}><span className="desktop-app"><FolderClosed /></span><strong>雾汀旅行</strong></button>
        <button onClick={() => setDesktopPanel("photos")}><span className="desktop-app photo-app"><ImageIcon /></span><strong>旅行照片</strong></button>
        <button onClick={() => setDesktopPanel("trash")}><span className="desktop-app trash-app"><Trash2 /></span><strong>回收站</strong></button>
      </section>
      <nav className="desktop-dock" aria-label="常用应用">
        <button onClick={openBrowser} aria-label="打开雾行浏览器"><Globe2 /></button>
        <button onClick={() => setDesktopPanel("notes")} aria-label="打开记事本"><NotebookPen /></button>
        <button onClick={() => setDesktopPanel("files")} aria-label="打开文件"><FolderClosed /></button>
        <button onClick={() => setDesktopPanel("photos")} aria-label="打开照片"><ImageIcon /></button>
        <i /><button onClick={() => setDesktopPanel("trash")} aria-label="打开回收站"><Trash2 /></button>
      </nav>

      <section className="browser-window" aria-label="雾行浏览器" hidden={!browserOpen}>
        <div className="browser-titlebar"><div className="window-controls"><button onClick={() => setBrowserOpen(false)} aria-label="关闭浏览器"><X /></button></div><p>雾行浏览器</p><span /></div>
        <Tabs value={activeTab} onValueChange={(value) => navigate(value, [...routes].reverse().find((item) => item.tab === value)?.query ?? "")} className="h-[calc(100%-34px)] gap-0!">
          <TabsList className="browser-tabs">
            {displayedTabs.map((tab) => <TabsTrigger value={tab} key={tab}>{tab === "trip" ? <Plane /> : tab === "downloads" ? <Download /> : tab === "history" ? <History /> : <Globe2 />}{browserTabLabel(tab, routes)}</TabsTrigger>)}
          </TabsList>
          <form className="browser-toolbar" onSubmit={runSearch}>
            <div className="browser-nav">
              <button type="button" disabled={routeIndex === 0} onClick={() => moveHistory(-1)} aria-label="返回"><ArrowLeft /></button>
              <button type="button" disabled={routeIndex === routes.length - 1} onClick={() => moveHistory(1)} aria-label="前进"><ArrowRight /></button>
            </div>
            <div className="browser-address"><LockKeyhole /><Input aria-label="地址栏和搜索框" placeholder="搜索网页或输入网址" value={address} onChange={(event) => setAddress(event.target.value)} onFocus={(event) => event.currentTarget.select()} spellCheck={false} /></div>
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
            <TabsContent forceMount value="forum" className="min-h-full bg-[#f4f1e9] data-[state=inactive]:hidden"><ForumPage unlocked={unlocked} thread={activeTab === "forum" ? query || null : null} setThread={(title) => navigate("forum", title ?? "")} /></TabsContent>
            <TabsContent forceMount value="history" className="min-h-full bg-[#fbfcfc] data-[state=inactive]:hidden"><HistoryPage unlocked={unlocked} navigate={navigate} /></TabsContent>
            <TabsContent forceMount value="downloads" className="min-h-full bg-[#fbfcfc] data-[state=inactive]:hidden"><DownloadsPage preview={downloadPreview} setPreview={(name) => navigate("downloads", name ?? "")} /></TabsContent>
            <TabsContent value="search" className="browser-search-content data-[state=inactive]:hidden">
              <header><h1 className="search-page-title">雾搜</h1></header>
              <SearchBox key={`search-box:${query}`} query={query} onSearch={submitBrowserInput} />
              <SearchResults key={`search-results:${query}`} query={query} unlocked={unlocked} openTravel={() => navigate("trip")} openForum={() => navigate("forum")} openActivity={() => navigate("activity")} openCommunity={() => navigate("activity", "community")} openLostCat={() => navigate("lost-cat")} openCommunityNotice={() => navigate("neighborhood-notice")} openObituary={() => navigate("obituary")} openFounder={() => navigate("founder-profile")} openBiography={() => navigate("biography")} openLuMemorial={() => navigate("lu-memorial")} openHospital={() => navigate("hospital")} />
            </TabsContent>
            <TabsContent value="activity" className="min-h-full data-[state=inactive]:hidden">{query === "community" ? <CommunityPage onOpenWitness={() => navigate("activity", "witness")} onOpenFoundation={() => navigate("activity", "foundation")} /> : query === "witness" ? <WitnessPage onBack={() => navigate("activity", "community")} onOpenProfile={() => navigate("survivor")} /> : query === "foundation" ? <FoundationPage onBack={() => navigate("activity", "community")} /> : query === "archive/07" ? <HiddenSeventhPage onBack={() => navigate("activity")} /> : query.startsWith("archive/") ? <ActivityArchivePage issue={query.slice(-2)} onBack={() => navigate("activity")} /> : <ActivityPage onOpenRide={unlocked ? openRide : undefined} onOpenArchive={(issue) => navigate("activity", `archive/${issue}`)} />}</TabsContent>
            <TabsContent value="survivor" className="min-h-full data-[state=inactive]:hidden"><SurvivorProfile /></TabsContent>
            <TabsContent value="lost-cat" className="min-h-full data-[state=inactive]:hidden"><LostCatPage /></TabsContent>
            <TabsContent value="neighborhood-notice" className="min-h-full data-[state=inactive]:hidden"><NeighborhoodNoticePage onOpenObituary={() => navigate("obituary")} /></TabsContent>
            <TabsContent value="obituary" className="min-h-full data-[state=inactive]:hidden"><ObituaryPage /></TabsContent>
            <TabsContent value="founder-profile" className="min-h-full data-[state=inactive]:hidden"><FounderProfilePage /></TabsContent>
            <TabsContent value="biography" className="min-h-full data-[state=inactive]:hidden"><BiographyPage /></TabsContent>
            <TabsContent value="lu-memorial" className="min-h-full data-[state=inactive]:hidden"><LuWenchuanMemorialPage /></TabsContent>
            <TabsContent value="hospital" className="min-h-full data-[state=inactive]:hidden"><HaijiaHospitalPage /></TabsContent>
            <TabsContent value="not-found" className="min-h-full data-[state=inactive]:hidden"><BrowserNotFound address={query} onSearch={() => navigate("search")} /></TabsContent>
            {unlocked && <TabsContent forceMount value="ride" className="min-h-full data-[state=inactive]:hidden"><SecretRide onOpenActivity={() => navigate("activity")} /></TabsContent>}
          </div>
        </Tabs>
      </section>

      {desktopPanel === "notes" ? <NotesPanel position={notePosition} onPositionChange={setNotePosition} checked={checked} onCheck={(id) => setChecked((oldChecked) => oldChecked.includes(id) ? oldChecked.filter((value) => value !== id) : [...oldChecked, id])} onClose={() => setDesktopPanel(null)} /> : desktopPanel ? <DesktopPanel key={desktopPanel} position={evidencePosition} onPositionChange={setEvidencePosition} kind={desktopPanel} restoredPhoto={restoredPhoto} onRestorePhoto={() => setRestoredPhoto(true)} onClose={() => setDesktopPanel(null)} onDownloads={(name) => navigate("downloads", name)} onPanelChange={setDesktopPanel} /> : null}

      {(chapter.notification === "visible" || notificationCentre) && <aside className="chapter-notification" role="status" aria-live="polite" aria-label={unlocked ? "安时接送通知" : "通知中心"}>
        <header><Bell /><strong>{unlocked ? "安时接送 · 行程提醒" : "通知中心"}</strong><button aria-label="收起通知" onClick={closeNotification}><X /></button></header>
        <p>{unlocked ? "您预约的夜间接送即将开放乘车信息。" : "暂无新通知"}</p>
        {unlocked && <><small>8月31日 21:40｜雾汀北站｜2人</small><Button variant="secondary" onClick={openRide}>查看订单 <ArrowUpRight /></Button></>}
      </aside>}
    </main>
  );
}
