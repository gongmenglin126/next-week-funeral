import { ArrowUpRight, Download, FileText, Globe2, History, MessageSquareText } from "lucide-react";
import type { BrowserRoute } from "@/lib/browser-navigation";
import { browserAddress, browserTabLabel } from "@/lib/browser-tabs";

export function visitedHistory(routes: BrowserRoute[]) {
  const seen = new Set<string>();
  return [...routes].reverse().flatMap((route) => {
    if (["history", "downloads", "not-found"].includes(route.tab) || (route.tab === "search" && !route.query.trim())) return [];
    const key = `${route.tab}:${route.query}`;
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      ...route,
      title: route.tab === "search" ? `搜索：${route.query}` : browserTabLabel(route.tab, [route]),
      url: route.tab === "search" ? `wusou.example/search?q=${encodeURIComponent(route.query)}` : browserAddress(route.tab, route.query),
    }];
  });
}

export function HistoryPage({ navigate, routes }: { navigate: (action: string, query: string) => void; routes: BrowserRoute[] }) {
  const entries = visitedHistory(routes);

  return (
    <div className="browser-record-page">
      <header><History /><div><h2>历史记录</h2><p>本次打开过的网页</p></div></header>
      {entries.length === 0 ? <p className="evidence-empty">暂无浏览记录。</p> : <section>
        <h3>本次会话</h3>
        {entries.map((entry, index) => <button key={`${entry.tab}:${entry.query}`} onClick={() => navigate(entry.tab, entry.query)}>
          <time>{index === 0 ? "刚刚" : `${index + 1}步前`}</time><Globe2 /><span><strong>{entry.title}</strong><small>{entry.url}</small></span><ArrowUpRight aria-hidden="true" />
        </button>)}
      </section>}
    </div>
  );
}

export function DownloadsPage({ accountArchiveAvailable, messageCacheAvailable, onOpenApplication, onOpenMessage }: {
  accountArchiveAvailable: boolean;
  messageCacheAvailable: boolean;
  onOpenApplication: () => void;
  onOpenMessage: () => void;
}) {
  return (
    <div className="browser-record-page">
      <header><Download /><div><h2>下载内容</h2><p>本机文件与恢复项目</p></div></header>
      {!accountArchiveAvailable ? <p className="evidence-empty">暂无下载记录。</p> : <section>
        <h3>今天 · 设备恢复</h3>
        <button onClick={onOpenApplication}>
          <time>11:09</time><FileText /><span><strong>潮汐失眠_账户数据导出.html</strong><small>从本机网页数据中恢复 · 申请记录 1 项</small></span><ArrowUpRight aria-hidden="true" />
        </button>
        {messageCacheAvailable ? <button onClick={onOpenMessage}>
          <time>11:11</time><MessageSquareText /><span><strong>事故前消息缓存.html</strong><small>从同一账户导出中恢复 · 最后同步于8月25日00:29</small></span><ArrowUpRight aria-hidden="true" />
        </button> : null}
      </section>}
    </div>
  );
}
