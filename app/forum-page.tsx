"use client";

import { ArrowLeft } from "lucide-react";

type ForumReply = { id: string; author: string; date: string; text: string };
type ForumThread = { tag: string; author: string; date: string; body: string[]; replies: ForumReply[]; locked?: boolean };

export const LIGHTHOUSE_THREAD = "老城民宿到旧灯塔，早上五点能叫到车吗";
export const FORUM_THREADS: Record<string, ForumThread> = {
  "沿海公路夜间施工，临时公交调整汇总": {
    tag: "置顶", author: "雾汀交通志愿组", date: "8月25日 08:10",
    body: ["沿海公路南段本周22:00至次日06:00施工，公交临时绕行北站路。", "步行去海堤的游客请使用旧城东侧步道，不要穿过施工路口。"],
    replies: [{ id: "traffic-1", author: "渡口阿泽", date: "8月25日 09:36", text: "白天公交已经恢复，夜间还是看站牌通知。" }],
  },
  "北站附近有通宵药店吗？最好能送到老城": {
    tag: "求助", author: "玻璃海", date: "8月25日 04:51",
    body: ["朋友半夜不太舒服，老城这边跑了两家都关门了。", "想问北站附近有没有通宵药店，最好能送到民宿。"],
    replies: [
      { id: "pharmacy-1", author: "北站小陈", date: "8月25日 04:55", text: "北站东口有一家，但送老城至少四十分钟。" },
      { id: "pharmacy-2", author: "渡口阿泽", date: "8月25日 05:02", text: "沿海路那边没有药店，别往南走。" },
    ],
  },
  "有人参加过安时那边的周末活动吗": {
    tag: "闲聊", author: "灰鲸", date: "8月23日 15:09", locked: true,
    body: ["朋友收到过邀请，公开页面只写了生命关怀活动。", "想问问有没有人去过，具体都做什么？"],
    replies: [
      { id: "activity-1", author: "一杯温水", date: "8月23日 16:42", text: "参加过普通场，写信、聊天，没什么特别的。" },
      { id: "activity-2", author: "纸船", date: "8月23日 18:03", text: "你说的是后来没列进公开归档的那一期吗？公开页面里找不到。" },
    ],
  },
  [LIGHTHOUSE_THREAD]: {
    tag: "旅行", author: "山雀", date: "8月22日 19:40",
    body: ["想去看日出，住在老城民宿，怕一早叫不到车。", "有人坐过游客中心的灯塔接驳吗？"],
    replies: [
      { id: "lighthouse-1", author: "渡口阿泽", date: "8月22日 20:11", text: "坐过，五点十分发车，提前十分钟到就行。" },
      { id: "lighthouse-2", author: "小满", date: "8月22日 20:46", text: "我在泊岸旅行订的，下载好电子票，验票要看尾号。" },
      { id: "lighthouse-3", author: "潮汐失眠", date: "8月22日 21:14", text: "刚说服朋友陪我去了，两个人第一次来，有什么需要注意的吗？我们也想去灯塔看日出。" },
      { id: "lighthouse-4", author: "渡口阿泽", date: "8月22日 21:21", text: "海边早上风大，带件外套。出发前看看天气，阴天不一定能看到日出。" },
    ],
  },
};

export function ForumPage({ unlocked, thread, setThread }: { unlocked: boolean; thread: string | null; setThread: (thread: string | null) => void }) {
  const selected = thread ? FORUM_THREADS[thread] : undefined;
  const data = selected && (!selected.locked || unlocked) ? selected : undefined;
  return <div className="forum-page">
    <header className="forum-header">
      <div><strong>雾汀同城</strong><span>生活 · 出行 · 互助</span></div>
      <div className="forum-user"><span className="forum-avatar">潮</span><span>潮汐失眠</span></div>
    </header>
    {data ? <article className="forum-thread">
      <button className="forum-back" onClick={() => setThread(null)}><ArrowLeft />返回雾汀生活</button>
      <span className="thread-tag">{data.tag}</span>
      <h1>{thread}</h1>
      <p className="thread-meta">{data.author} · 发布于 {data.date}</p>
      <div className="thread-body">{data.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <h2>回复</h2>
      {data.replies.map((reply, index) => <article className="thread-reply" key={reply.id}>
        <span>{index + 1}F</span>
        <div><p className="thread-reply-meta"><span>{reply.author}</span><time>{reply.date}</time></p><p>{reply.text}</p></div>
      </article>)}
    </article> : <div className="forum-layout">
      <section>
        <p className="forum-board-title">雾汀生活 / 最新讨论</p>
        {Object.entries(FORUM_THREADS).filter(([, item]) => unlocked || !item.locked).map(([title, item]) => {
          const lastReplyDate = item.replies.at(-1)?.date ?? item.date;
          return <button className="forum-row" key={title} onClick={() => setThread(title)}>
            <span>{item.tag}</span>
            <div><h3>{title}</h3><p>{item.author} · 最后回复 {lastReplyDate}</p></div>
            <small>{lastReplyDate.split(" ")[0]}</small>
          </button>;
        })}
      </section>
      <aside className="forum-sidebar"><p>当前账号</p><strong>潮汐失眠</strong><span>注册于 2025-11-07</span></aside>
    </div>}
  </div>;
}
