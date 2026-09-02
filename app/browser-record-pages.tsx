import { ArrowLeft, ArrowUpRight, Download, FileSearch, Globe2, History } from "lucide-react";

import { LighthouseTicket } from "./chapter-one";
import { LIGHTHOUSE_THREAD } from "./forum-page";

export function HistoryPage({ navigate, unlocked }: { navigate: (action: string, query: string) => void; unlocked: boolean }) {
  const groups = [
    {
      date: "昨天 · 8月25日",
      items: [
        ["04:53", "北站附近有通宵药店吗？最好能送到老城", "wuting-talk.example/thread/60318", "forum", "北站附近有通宵药店吗？最好能送到老城"],
      ],
    },
    {
      date: "8月24日",
      items: [
        ["23:14", "泊岸旅行｜我的订单", "boan.example/account/orders", "trip", ""],
        ["16:20", "有人参加过安时那边的周末活动吗", "wuting-talk.example/thread/60307", "forum", "有人参加过安时那边的周末活动吗"],
      ],
    },
    {
      date: "8月22日",
      items: [["21:23", LIGHTHOUSE_THREAD, "wuting-talk.example/thread/60285", "forum", LIGHTHOUSE_THREAD]],
    },
  ];

  return (
    <div className="browser-record-page">
      <header><History /><div><h2>历史记录</h2><p>此设备上的浏览记录</p></div></header>
      {groups.map((group) => (
        <section key={group.date}>
          <h3>{group.date}</h3>
          {group.items.filter((item) => unlocked || !item[1].includes("安时")).map(([time, title, url, action, pageQuery]) => (
            <button key={time + title} onClick={() => navigate(action, pageQuery)}>
              <time>{time}</time><Globe2 /><span><strong>{title}</strong><small>{url}</small></span><ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </section>
      ))}
    </div>
  );
}

export function DownloadsPage({ preview, setPreview }: { preview: string | null; setPreview: (name: string | null) => void }) {
  if (preview === "灯塔接驳电子票.pdf") {
    return (
      <div className="document-preview">
        <header><button onClick={() => setPreview(null)}><ArrowLeft />返回下载内容</button><span>{preview}</span></header>
        <LighthouseTicket />
      </div>
    );
  }

  return (
    <div className="browser-record-page">
      <header><Download /><div><h2>下载内容</h2><p>最近下载的文件</p></div></header>
      <section>
        <h3>本周</h3>
        <button onClick={() => setPreview("灯塔接驳电子票.pdf")}>
          <time>8月18日</time><FileSearch /><span><strong>灯塔接驳电子票.pdf</strong><small>186 KB · 下载完成</small></span><ArrowUpRight aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
