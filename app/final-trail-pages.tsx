"use client";

import { useState } from "react";
import { ArrowUpRight, Check, FileWarning, MessageSquareText, Radio, RotateCcw, ShieldAlert } from "lucide-react";

export function ZhouGuMessagePage({ onOpenRelay }: { onOpenRelay: () => void }) {
  return <article className="min-h-full bg-[#101419] px-5 py-10 text-[#e7eaed] md:px-10 md:py-14">
    <div className="mx-auto max-w-[760px]">
      <header className="border-b border-white/15 pb-7"><p className="text-[12px] tracking-[.16em] text-[#87939d]">事故设备恢复 / 通讯片段</p><h1 className="mt-3 font-serif text-[34px] font-normal md:text-[46px]">周惜与顾惟真</h1><p className="mt-4 text-[14px] leading-7 text-white/48">本地缓存于8月25日00:29停止同步。以下内容未被发送者删除。</p></header>
      <section className="mt-9 space-y-6 text-[15px] leading-8">
        <div className="mr-12 border-l-2 border-[#9ba7af] bg-white/[.045] px-5 py-4"><strong className="text-[13px] text-[#aeb8bf]">周惜　00:18</strong><p className="mt-2">R-06-4里死人还在发帖，QC-AID-19只挑本来就更可能救回来的人。你不是神，你只是把死人删掉，把活人留下。</p></div>
        <div className="mr-12 border-l-2 border-[#9ba7af] bg-white/[.045] px-5 py-4"><strong className="text-[13px] text-[#aeb8bf]">周惜　00:20</strong><p className="mt-2">我居然还想拿林知还的命换我的。现在想想，你连骗子都当得没什么创意。大罗无相尊？你配吗。</p></div>
        <div className="ml-12 border-r-2 border-[#75675e] bg-[#332d29] px-5 py-4 text-right"><strong className="text-[13px] text-[#c0afa2]">顾惟真　00:24</strong><p className="mt-2 text-left">你可以嘲笑我。不要嘲笑那些因为相信我才活下来的人。</p></div>
        <div className="mr-12 border-l-2 border-[#9ba7af] bg-white/[.045] px-5 py-4"><strong className="text-[13px] text-[#aeb8bf]">周惜　00:26</strong><p className="mt-2">我明早就把这些发出去。让他们看看自己拜的到底是什么。</p></div>
        <div className="ml-12 border-r-2 border-[#75675e] bg-[#332d29] px-5 py-4 text-right"><strong className="text-[13px] text-[#c0afa2]">顾惟真　00:27</strong><p className="mt-2 text-left">他们会知道该怎样理解你。</p></div>
      </section>
      <footer className="mt-10 border-t border-white/15 pt-6 text-[13px] leading-7 text-white/45"><p>恢复工具检测到00:31发生一次外部转发。原消息已被移除，但接收端仍留有一份撤回回执。</p><button className="mt-5 inline-flex items-center gap-2 border border-white/25 px-4 py-2 text-[13px] font-semibold text-white/75 hover:bg-white/5" onClick={onOpenRelay}>追踪撤回的转发 <ArrowUpRight aria-hidden="true" className="size-4" /></button></footer>
    </div>
  </article>;
}

export function FollowerRelayPage({ onOpenArchive }: { onOpenArchive: () => void }) {
  return <article className="min-h-full bg-[#f1f3f3] px-5 py-10 text-[#263238] md:px-10 md:py-14">
    <div className="mx-auto max-w-[860px] border border-[#cbd2d4] bg-white p-6 shadow-sm md:p-10">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#3d4f56] pb-6"><div><p className="text-[12px] tracking-[.14em] text-[#718087]">消息中继归档 / GZ-825-17</p><h1 className="mt-2 font-serif text-[34px] font-normal">转发回执</h1></div><span className="border border-[#8d5c55] px-3 py-1 text-[12px] font-semibold text-[#8d5c55]">已撤回</span></header>
      <dl className="mt-7 grid border-y border-[#d7dddf] text-[14px] leading-7 md:grid-cols-2"><div className="p-4"><dt className="text-[#859197]">转发账号</dt><dd className="mt-1 font-semibold">G.Weizhen / 顾惟真</dd></div><div className="border-t border-[#d7dddf] p-4 md:border-l md:border-t-0"><dt className="text-[#859197]">接收群</dt><dd className="mt-1 font-semibold">近身见证</dd></div></dl>
      <section className="mt-7 border-l-4 border-[#748990] bg-[#edf1f2] p-5 text-[15px] leading-8"><p>转发内容包含周惜00:18—00:27的完整对话截图。</p><p className="mt-3">附言：<strong>“她住在山线民宿，05:10前会沿海路前往北站。她手里有内部材料。”</strong></p></section>
      <section className="mt-8 space-y-3 text-[14px] leading-7"><div className="border-b border-[#dde2e3] pb-3"><strong>归舟-3　00:37</strong><p>需要我们去劝她吗？</p></div><div className="border-b border-[#dde2e3] pb-3"><strong>顾惟真　00:41</strong><p>我没有要求任何人做什么。只是有人正在伤害大家相信的东西。</p></div><div className="border-b border-[#dde2e3] pb-3"><strong>守潮人-17　00:42</strong><p>明白。</p></div></section>
      <footer className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-[#d7dddf] pt-6"><p className="text-[13px] text-[#718087]">“近身见证”成员的公开发言曾被同步至归岸者旧站。</p><button className="inline-flex items-center gap-2 border border-[#425860] px-4 py-2 text-[13px] font-semibold" onClick={onOpenArchive}>查看归岸者旧站存档 <ArrowUpRight aria-hidden="true" className="size-4" /></button></footer>
    </div>
  </article>;
}

export function FanaticArchivePage({ onOpenAccident }: { onOpenAccident: () => void }) {
  return <article className="min-h-full bg-[#171313] px-5 py-10 text-[#e9dfdb] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px]">
      <header className="border-b border-[#6e4b47] pb-7"><p className="text-[12px] tracking-[.18em] text-[#9c7772]">归岸者 / 只读镜像</p><h1 className="mt-3 font-serif text-[38px] font-normal">先生见证存档</h1><p className="mt-4 max-w-[720px] text-[15px] leading-8 text-white/50">原站关闭后，部分公开帖子仍被搜索引擎保留。账号昵称与发布时间未经修订。</p></header>
      <section className="mt-9 space-y-5">
        <article className="border border-white/10 bg-white/[.035] p-6"><small className="text-[#9f7b75]">留灯的人 · 3月11日</small><h2 className="mt-3 text-[20px] font-medium">有人当面问先生是不是“大罗无相尊”</h2><p className="mt-3 text-[15px] leading-8 text-white/62">先生没有否认，只说：“名字不重要。你们应该记住，是谁让你们相信自己还能活下来。”后来大家都跪了。他没让我们跪，也没有叫我们起来。</p></article>
        <article className="border border-white/10 bg-white/[.035] p-6"><small className="text-[#9f7b75]">归舟-3 · 5月26日</small><h2 className="mt-3 text-[20px] font-medium">别再逼先生承认什么</h2><p className="mt-3 text-[15px] leading-8 text-white/62">神不会拿身份证明自己是神。先生不说，是在保护我们，也是看谁能够自己认出来。有人羞辱先生，就是在羞辱所有被留下的人。</p></article>
        <article className="border border-[#7f4943] bg-[#271b1a] p-6"><div className="flex flex-wrap items-center justify-between gap-3"><small className="text-[#c08a82]">守潮人-17 · 8月25日 04:51</small><span className="border border-[#94574f] px-2 py-1 text-[11px] text-[#c88d84]">删除缓存</span></div><h2 className="mt-3 text-[20px] font-medium">天亮前</h2><p className="mt-3 text-[15px] leading-8 text-white/70">白色七座还能开，临牌已经换回 <strong className="font-mono text-[#e2b3aa]">LC·7M21</strong>。从西院出去，天亮前能到沿海路。</p><div className="mt-5 border-t border-white/10 pt-4 text-[14px] text-white/48"><strong>06:07 更新：</strong>已经安静了。先生不必再看。</div></article>
      </section>
      <footer className="mt-8 border-t border-white/10 pt-6 text-[13px] leading-7 text-white/38"><p>存档没有证明帖子作者驾驶了车辆。号牌必须与独立的事故影像记录核验。</p><button className="mt-5 inline-flex items-center gap-2 border border-[#825650] px-4 py-2 text-[13px] font-semibold text-[#d1a19a] hover:bg-white/5" onClick={onOpenAccident}>调取同号车辆影像 <ArrowUpRight aria-hidden="true" className="size-4" /></button></footer>
    </div>
  </article>;
}

export function AccidentDossierPage({ onOpenFinal }: { onOpenFinal: () => void }) {
  return <article className="min-h-full bg-[#e7ecef] px-5 py-10 text-[#233039] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px] bg-white px-6 py-8 shadow-[0_10px_45px_rgba(35,48,57,.12)] md:px-11 md:py-12">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#293c47] pb-6"><div><p className="text-[12px] tracking-[.15em] text-[#687c87]">雾汀交通事故补充影像目录</p><h1 className="mt-2 font-serif text-[34px] font-normal">沿海路口事故车辆核验</h1></div><FileWarning aria-hidden="true" className="size-8 text-[#826057]" /></header>
      <dl className="mt-7 grid border-y border-[#d4dcdf] text-[14px] md:grid-cols-2"><div className="p-4"><dt className="text-[#819099]">事故时间</dt><dd className="mt-1 font-semibold">8月25日 05:33</dd></div><div className="border-t border-[#d4dcdf] p-4 md:border-l md:border-t-0"><dt className="text-[#819099]">关联车辆</dt><dd className="mt-1 font-mono font-semibold">白色七座 / LC·7M21</dd></div></dl>
      <section className="mt-8 space-y-0 border border-[#d4dcdf] text-[14px] leading-7"><div className="grid border-b border-[#d4dcdf] md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">04:58</strong><p className="p-4">北麓路17号西院出口摄像头记录该车驶离。</p></div><div className="grid border-b border-[#d4dcdf] md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">05:31:48</strong><p className="p-4">沿海路东向摄像头记录该车在周惜身后约十一米处持续同向行驶。</p></div><div className="grid border-b border-[#d4dcdf] md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">05:33:06</strong><p className="p-4">路口监控被大型车辆短暂遮挡；同期记录到急刹与碰撞声。</p></div><div className="grid md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">05:39</strong><p className="p-4">同一车辆沿非北站方向驶离，右前灯在画面中已经熄灭。</p></div></section>
      <aside className="mt-7 border-l-4 border-[#8c6b61] bg-[#f2eeeb] p-5 text-[14px] leading-8"><strong>材料边界</strong><p className="mt-1">这些影像单独只能证明车辆尾随与异常离场；它们必须与顾惟真的转发记录、群内回应及事后删帖共同核验。</p></aside>
      <button className="mt-8 inline-flex items-center gap-3 bg-[#293c47] px-5 py-3 text-[14px] font-semibold text-white" onClick={onOpenFinal}><ShieldAlert aria-hidden="true" className="size-5" />整理事故时间线 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
    </div>
  </article>;
}

const INCIDENT_EVENTS = [
  { id: "deleted", time: "06:07", text: "守潮人-17发布“已经安静了”，随后删除帖子。", order: 5 },
  { id: "message", time: "00:18", text: "周惜指出筛选与账号续写造假，并说天亮后会公开证据。", order: 1 },
  { id: "collision", time: "05:33", text: "同号白色七座尾随至沿海路口，监控记录急刹与碰撞声。", order: 4 },
  { id: "relay", time: "00:31—00:42", text: "顾转发她的住处与出发时间；守潮人-17回复“明白”。", order: 2 },
  { id: "departure", time: "04:51—04:58", text: "守潮人-17发布车辆信息；该车随后从北麓路17号西院驶出。", order: 3 },
] as const;

export function FinalIncidentPuzzlePage({ unlocked, onUnlock, onFinish }: { unlocked: boolean; onUnlock: () => void; onFinish: () => void }) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [error, setError] = useState("");

  function selectEvent(id: string) {
    if (sequence.includes(id)) return;
    setError("");
    setSequence((current) => [...current, id]);
  }

  function rebuildTimeline() {
    const correct = sequence.every((id, index) => INCIDENT_EVENTS.find((event) => event.id === id)?.order === index + 1);
    if (correct && sequence.length === INCIDENT_EVENTS.length) onUnlock();
    else setError("这条时间线还对不上。注意转发发生在车辆离开西院之前，删除帖子发生在事故之后。");
  }

  return <article className="min-h-full bg-[#101615] px-5 py-10 text-[#e6ece9] md:px-10 md:py-14">
    <div className="mx-auto max-w-[920px]">
      <header className="border-b border-white/15 pb-7"><p className="text-[12px] tracking-[.18em] text-[#82a092]">事故补充材料 / 限制访问</p><h1 className="mt-3 font-serif text-[36px] font-normal md:text-[48px]">重建最后六小时</h1><p className="mt-4 max-w-[760px] text-[15px] leading-8 text-white/50">五张记录卡来自不同页面。按发生时间从早到晚依次点选，把威胁、转发、出发、尾随和事后删帖连成一条时间线。</p></header>
      {!unlocked ? <section className="mt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {INCIDENT_EVENTS.map((event) => {
            const step = sequence.indexOf(event.id);
            return <button className={`relative text-left border p-5 transition-colors ${step >= 0 ? "border-[#9db6a8] bg-[#223229]" : "border-white/12 bg-white/[.035] hover:bg-white/[.07]"}`} key={event.id} onClick={() => selectEvent(event.id)} disabled={step >= 0}>
              <span className="text-[12px] tracking-[.12em] text-[#8ca397]">{event.time}</span>
              <strong className="mt-2 block pr-8 text-[15px] font-normal leading-7 text-white/75">{event.text}</strong>
              {step >= 0 ? <b className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-[#d7e1dc] text-[13px] text-[#17221d]">{step + 1}</b> : null}
            </button>;
          })}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4"><button className="inline-flex items-center gap-2 bg-[#d7e1dc] px-5 py-3 text-[14px] font-semibold text-[#17221d] disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={sequence.length !== INCIDENT_EVENTS.length} onClick={rebuildTimeline}>生成事故时间线 <ArrowUpRight aria-hidden="true" className="size-4" /></button><button className="inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-[13px] text-white/65" type="button" onClick={() => { setSequence([]); setError(""); }}><RotateCcw aria-hidden="true" className="size-4" />清空重排</button>{error ? <p className="max-w-[600px] text-[13px] leading-6 text-[#d28f88]" role="alert">{error}</p> : null}</div>
      </section> : <section className="mt-9" aria-live="polite">
        <div className="flex items-center gap-3 border border-[#6e8a7c] bg-[#19251f] p-5 text-[14px] text-[#d1e0d8]"><Check aria-hidden="true" className="size-5" /><strong>时间线成立：五条记录属于同一事件链</strong></div>
        <div className="mt-6 overflow-hidden border border-white/15 text-[14px] leading-7"><div className="grid border-b border-white/10 md:grid-cols-[160px_1fr]"><strong className="bg-white/[.04] p-4">8月25日 00:18</strong><p className="p-4">周惜向顾惟真指出筛选与账号续写造假，并嘲笑其神化身份。</p></div><div className="grid border-b border-white/10 md:grid-cols-[160px_1fr]"><strong className="bg-white/[.04] p-4">00:31—00:42</strong><p className="p-4">顾将她的对话、住处和出发时间转给近身见证；守潮人-17回复“明白”。</p></div><div className="grid border-b border-white/10 md:grid-cols-[160px_1fr]"><strong className="bg-white/[.04] p-4">04:51—05:33</strong><p className="p-4">该账号发布车辆信息；同号车辆从西院驶出并持续尾随周惜直至碰撞发生。</p></div><div className="grid md:grid-cols-[160px_1fr]"><strong className="bg-white/[.04] p-4">06:07</strong><p className="p-4">账号发布“已经安静了”，随后删除帖子。</p></div></div>
        <article className="mt-9 border border-[#705d55] bg-[#211d1a] p-6 md:p-9"><header className="flex items-center gap-3 border-b border-white/10 pb-5"><Radio aria-hidden="true" className="size-5 text-[#b79d90]" /><div><p className="text-[11px] tracking-[.14em] text-[#9d887e]">删除语音转写 / GW-DRAFT-4</p><h2 className="mt-1 font-serif text-[27px] font-normal">顾惟真，未公开独白</h2></div></header><div className="mt-6 space-y-4 font-serif text-[17px] leading-9 text-white/72"><p>“他们总问我是不是大罗无相尊。我从不回答。回答会把神变成一句可以被截图的话。”</p><p>“周惜以为揭穿筛选和账号续写，就能让我失去他们。她不明白，信徒不需要事实，只需要一个被冒犯的对象。”</p><p>“我没有命令任何人。我只告诉他们，她住在哪里，几点离开。剩下的话，他们会替我说完。”</p><p>“一个真正懂得被崇拜的人，不需要承认自己是神，也不需要亲自动手。”</p></div></article>
        <button className="mt-8 inline-flex items-center gap-3 bg-[#d7e1dc] px-5 py-3 text-[14px] font-semibold text-[#17221d]" onClick={onFinish}><MessageSquareText aria-hidden="true" className="size-5" />提交证据，结束调查</button>
      </section>}
    </div>
  </article>;
}

export function EndingScreen() {
  return <main className="ending-screen min-h-dvh bg-[#080b0c] px-6 py-12 text-[#e8eceb]">
    <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-[780px] flex-col justify-center">
      <p className="text-[12px] tracking-[.22em] text-[#7f918a]">调查结束</p><h1 className="mt-4 font-serif text-[48px] font-normal leading-tight md:text-[72px]">神没有亲自动手</h1>
      <section className="mt-10 space-y-5 border-y border-white/15 py-8 text-[16px] leading-9 text-white/64"><p>8月30日，周惜死亡案由交通事故转为刑事调查。顾惟真与“守潮人-17”的真实身份被列入调查范围，安时相关账号及北麓路17号西院材料被查封。</p><p>警方归还周惜手机时，一段未发送的草稿仍停在编辑界面：</p><blockquote className="border-l-2 border-[#8da096] pl-5 font-serif text-[18px] leading-9 text-white/78">“我想过拿她的命换我的。这件事不能因为顾惟真是骗子，就变得没有发生过。明早我会把证据发出去。之后要不要再见我，应该由林知还决定。”</blockquote><p>她没有来得及发出证据，也没有来得及请求原谅。</p></section>
      <p className="mt-9 max-w-[690px] font-serif text-[22px] leading-10 text-white/82">你查明了她为什么曾经想让你死，也查明了是谁让她真的死去。两件事都是真的。</p>
      <button className="mt-12 w-fit border border-white/30 px-5 py-3 text-[14px] text-white/70 hover:bg-white/5" onClick={() => window.location.reload()}>重新开始</button>
    </div>
  </main>;
}
