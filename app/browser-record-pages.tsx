import { ArrowUpRight, Globe2, History } from "lucide-react";
import type { BrowserRoute } from "@/lib/browser-navigation";
import { browserAddress, browserTabLabel } from "@/lib/browser-tabs";

export function visitedHistory(routes: BrowserRoute[]) {
  const seen = new Set<string>();
  return [...routes].reverse().flatMap((route) => {
    if (["history", "not-found"].includes(route.tab) || (route.tab === "search" && !route.query.trim())) return [];
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
