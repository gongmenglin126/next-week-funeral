"use client";

import { useEffect, useState } from "react";
import { FileWarning, FolderOpen, MessageSquareText, Newspaper, NotebookPen, Scale, Smartphone } from "lucide-react";

export function ZhouGuMessagePage() {
  return <article className="min-h-full bg-[#101419] px-5 py-10 text-[#e7eaed] md:px-10 md:py-14">
    <div className="mx-auto max-w-[760px]">
      <header className="border-b border-white/15 pb-7">
        <p className="text-[12px] tracking-[.16em] text-[#87939d]">争议信息留存 / 07-01</p>
        <h1 className="mt-3 font-serif text-[34px] font-normal md:text-[46px]">申请者异议</h1>
        <p className="mt-4 text-[14px] leading-7 text-white/48">接收账号：G.Weizhen / 顾惟真 · 8月25日</p>
      </header>

      <section className="mt-9 space-y-6 text-[15px] leading-8">
        <div className="mr-8 border-l-2 border-[#9ba7af] bg-white/[.045] px-5 py-5 md:mr-16">
          <strong className="text-[13px] text-[#aeb8bf]">周惜　00:18</strong>
          <div className="mt-3 space-y-4">
            <p>你在造神！！！你是不是很享受这一切！！！看着他们跪你、叫你尊，你就真以为自己能决定谁活、谁死了？</p>
            <p>你这个卑鄙小人，自以为是的骗子。我要把申请名单、修改记录，还有那些假见证全发出去！！！</p>
            <p>所谓换寿，笑话。真能换，我倒要看看你能不能长命百岁。</p>
          </div>
        </div>
        <div className="ml-8 border-r-2 border-[#75675e] bg-[#332d29] px-5 py-5 text-right md:ml-16">
          <strong className="text-[13px] text-[#c0afa2]">顾惟真　00:24</strong>
          <p className="mt-3 text-left">发吧。只是那些因我活下来的人，未必会原谅你。</p>
        </div>
      </section>

      <footer className="mt-10 border-t border-white/15 pt-6 text-[13px] leading-7 text-white/45">
        <p>00:31，系统记录顾惟真将本页截图转发至外部会话。正文已撤回，只保留接收端标签：</p>
        <strong className="mt-3 block font-serif text-[20px] font-normal text-white/78">近身见证</strong>
      </footer>
    </div>
  </article>;
}

export function FanaticArchivePage() {
  return <article className="min-h-full bg-[#171313] px-5 py-10 text-[#e9dfdb] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px]">
      <header className="border-b border-[#6e4b47] pb-7">
        <p className="text-[12px] tracking-[.18em] text-[#9c7772]">归岸者旧站 / 小组公开页镜像</p>
        <h1 className="mt-3 font-serif text-[38px] font-normal">近身见证</h1>
        <p className="mt-4 max-w-[720px] text-[15px] leading-8 text-white/50">原页于8月25日07:12删除。以下内容来自搜索引擎最后一次收录。</p>
      </header>

      <section className="mt-9 space-y-5">
        <article className="border border-white/10 bg-white/[.035] p-6"><small className="text-[#9f7b75]">先生为大 · 8月23日 21:09</small><h2 className="mt-3 text-[20px] font-medium">先生救过的人，不会装作没看见</h2><p className="mt-3 text-[15px] leading-8 text-white/62">外面的人只看得见病历，我们知道是谁把自己从等死的日子里拉了回来。有人要毁掉先生，就是要把我们活下来的意义一起毁掉。</p></article>
        <article className="border border-white/10 bg-white/[.035] p-6"><small className="text-[#9f7b75]">归舟-3 · 8月25日 00:38</small><h2 className="mt-3 text-[20px] font-medium">她手里有名单</h2><p className="mt-3 text-[15px] leading-8 text-white/62">刚收到先生转来的图。这个人说所有见证都是假的，还要把参与者名字发出去。名单里有很多正在治疗的人，不能让她这么做。</p></article>
        <article className="border border-[#7f4943] bg-[#271b1a] p-6"><div className="flex flex-wrap items-center justify-between gap-3"><small className="text-[#c08a82]">守潮人-17 · 8月25日 04:51</small><span className="border border-[#94574f] px-2 py-1 text-[11px] text-[#c88d84]">删除缓存</span></div><h2 className="mt-3 text-[20px] font-medium">天亮前</h2><p className="mt-3 text-[15px] leading-8 text-white/70">白色七座还能开，临牌已经换回 <strong className="font-mono text-[#e2b3aa]">LC·7M21</strong>。从西院出去，天亮前能到沿海路。</p><div className="mt-5 border-t border-white/10 pt-4 text-[14px] text-white/48"><strong>06:07 更新：</strong>已经安静了。</div></article>
      </section>

      <footer className="mt-8 border-t border-white/10 pt-6 text-[13px] leading-7 text-white/38">页面还保留一个完整号牌。</footer>
    </div>
  </article>;
}

export function AccidentDossierPage({ onFinish }: { onFinish: () => void }) {
  return <article className="min-h-full bg-[#e7ecef] px-5 py-10 text-[#233039] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px] bg-white px-6 py-8 shadow-[0_10px_45px_rgba(35,48,57,.12)] md:px-11 md:py-12">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#293c47] pb-6"><div><p className="text-[12px] tracking-[.15em] text-[#687c87]">雾汀交通事故影像协查</p><h1 className="mt-2 font-serif text-[34px] font-normal">沿海路口关联车辆</h1></div><FileWarning aria-hidden="true" className="size-8 text-[#826057]" /></header>
      <dl className="mt-7 grid border-y border-[#d4dcdf] text-[14px] md:grid-cols-2"><div className="p-4"><dt className="text-[#819099]">事故时间</dt><dd className="mt-1 font-semibold">8月25日 05:33</dd></div><div className="border-t border-[#d4dcdf] p-4 md:border-l md:border-t-0"><dt className="text-[#819099]">待核车辆</dt><dd className="mt-1 font-mono font-semibold">白色七座 / LC·7M21</dd></div></dl>
      <section className="mt-8 space-y-0 border border-[#d4dcdf] text-[14px] leading-7"><div className="grid border-b border-[#d4dcdf] md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">04:58</strong><p className="p-4">北麓路17号西院出口摄像头记录该车驶离。</p></div><div className="grid border-b border-[#d4dcdf] md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">05:31:48</strong><p className="p-4">沿海路东向摄像头记录该车在周惜身后约十一米处持续同向行驶。</p></div><div className="grid border-b border-[#d4dcdf] md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">05:33:06</strong><p className="p-4">路口监控被大型车辆短暂遮挡；同期记录到急刹与碰撞声。</p></div><div className="grid md:grid-cols-[150px_1fr]"><strong className="bg-[#edf1f3] p-4">05:39</strong><p className="p-4">同一车辆沿非北站方向驶离，右前灯在画面中已经熄灭。</p></div></section>
      <section className="mt-8 border border-[#8ba0a9] bg-[#edf2f4] p-5 text-[14px] leading-7"><p>协查页面正在征集该车辆与事故发生前后的相关信息。</p><button className="mt-5 inline-flex items-center gap-3 bg-[#293c47] px-5 py-3 text-[14px] font-semibold text-white" onClick={onFinish}><MessageSquareText aria-hidden="true" className="size-5" />提交所查到的相关网页</button></section>
    </div>
  </article>;
}

type EndingPhase = "dossier" | "opening" | "typing" | "erasing" | "note" | "final";

function AftermathDossier({ onClose }: { onClose: () => void }) {
  return <main className="min-h-dvh bg-[#101513] px-5 py-10 text-[#e4e8e5] md:px-10 md:py-16">
    <div className="mx-auto max-w-[1050px]">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-white/15 pb-8"><div><p className="text-[11px] tracking-[.2em] text-[#809089]">案后归档 · 周惜死亡案</p><h1 className="mt-3 font-serif text-[40px] font-normal md:text-[58px]">后来发生的事</h1><p className="mt-4 max-w-[710px] text-[14px] leading-8 text-white/48">你提交的网页让警方重新调取北麓路17号与沿海路的完整影像。8月30日，交通事故转为刑事案件。此后送到你手里的消息，按时间收在同一份案卷里。</p></div><FolderOpen className="size-9 text-[#82968d]" /></header>

      <div className="mt-10 border-l border-white/15 pl-5 md:pl-9">
        <section className="relative bg-[#ece9e2] px-5 py-8 text-[#2c302e] shadow-[0_18px_55px_rgba(0,0,0,.18)] md:px-9 md:py-11">
          <span className="absolute -left-[29px] top-11 size-4 rounded-full border-4 border-[#101513] bg-[#a6b7ae] md:-left-[45px]" />
          <header className="flex flex-wrap items-start justify-between gap-5 border-b border-[#bfc3bd] pb-7"><div><p className="text-[11px] tracking-[.16em] text-[#7d8881]">9月12日 · 扣押物品返还</p><h2 className="mt-3 font-serif text-[34px] font-normal md:text-[46px]">周惜的手机</h2><p className="mt-4 max-w-[730px] text-[14px] leading-8 text-[#657069]">警方完成数据提取后，把手机交还给你。屏幕已经碎了，电量还剩百分之十一。只读副本里，有三个被标记的项目。</p></div><Smartphone className="size-8 text-[#6e7c75]" /></header>
          <div className="mt-8 grid gap-7 lg:grid-cols-[290px_1fr]">
            <div className="mx-auto w-full max-w-[290px] rounded-[34px] border-[7px] border-[#242625] bg-[#111412] p-3 shadow-[0_20px_50px_rgba(25,28,26,.24)]"><div className="rounded-[22px] bg-[#e8e6df] px-5 py-7 text-[#313633]"><p className="text-center text-[10px] text-[#7c837e]">8月25日　05:17</p><div className="mt-7 space-y-4"><div className="border-b border-[#c9cdc7] pb-3"><small className="text-[#878e89]">最近打开</small><strong className="mt-1 block text-[13px]">第七期申请名单</strong></div><div className="border-b border-[#c9cdc7] pb-3"><small className="text-[#878e89]">已下载</small><strong className="mt-1 block text-[13px]">第六期修改对照</strong></div><div><small className="text-[#878e89]">未发送邮件</small><strong className="mt-1 block text-[13px]">收件人：临川晚讯调查部</strong></div></div><p className="mt-16 text-center text-[10px] text-[#929892]">只读副本 · 部分系统数据已损坏</p></div></div>
            <div className="space-y-4">
              <article className="border border-[#c7cbc5] bg-white/65 p-5"><small className="text-[11px] text-[#89918c]">01 · 截图</small><h3 className="mt-2 text-[18px] font-semibold">07-01 / 关系人登记</h3><p className="mt-3 text-[14px] leading-7 text-[#5d6761]">申请者一栏是周惜，关系人一栏是林知还。截图时间为8月24日23:51；她在图片上圈出了“代偿结果”四个字。</p></article>
              <article className="border border-[#c7cbc5] bg-white/65 p-5"><small className="text-[11px] text-[#89918c]">02 · 下载文件</small><h3 className="mt-2 text-[18px] font-semibold">第六期见证修改对照</h3><p className="mt-3 text-[14px] leading-7 text-[#5d6761]">文件同时保存了程叙白的死亡登记和8月19日仍以他口吻发布的动态。周惜在页边写：<strong>“他们只留下碰巧活着的人。”</strong></p></article>
              <article className="border border-[#9a7770] bg-[#f3e9e6] p-5"><small className="text-[11px] text-[#9b7770]">03 · 未发送邮件</small><h3 className="mt-2 text-[18px] font-semibold">主题：安时在伪造患者见证</h3><p className="mt-3 text-[14px] leading-7 text-[#65504c]">附件包括申请名单、修改记录与顾惟真的消息截图。正文只写到：“我也报名过。我知道这会让我的话很难听，但名单里的人需要先被告知……”</p><p className="mt-3 text-[12px] text-[#9a7c76]">最后编辑：8月25日 05:17 · 未发送</p></article>
            </div>
          </div>
        </section>

        <section className="relative mt-8 bg-[#eef1f0] px-5 py-8 text-[#24302d] shadow-[0_18px_55px_rgba(0,0,0,.18)] md:px-9 md:py-11">
          <span className="absolute -left-[29px] top-11 size-4 rounded-full border-4 border-[#101513] bg-[#a6b7ae] md:-left-[45px]" />
          <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-[#364944] pb-7"><div><p className="text-[11px] tracking-[.16em] text-[#75847f]">次年7月18日 · 临川市中级人民法院</p><h2 className="mt-3 font-serif text-[34px] font-normal md:text-[46px]">案件判决</h2><p className="mt-3 text-[14px] text-[#66746f]">周惜死亡案一审宣判</p></div><Scale className="size-9 text-[#566b64]" /></header>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="border border-[#aebbb6] bg-white p-6"><p className="text-[11px] tracking-[.12em] text-[#7b8a84]">被告人 · 梁孟海</p><h3 className="mt-3 text-[24px] font-semibold">故意杀人罪</h3><p className="mt-4 text-[14px] leading-8 text-[#53615c]">梁孟海即账号“守潮人-17”。法院认定其驾车尾随并故意撞击周惜，判处无期徒刑，剥夺政治权利终身。</p></article>
            <article className="border border-[#9d817a] bg-[#f5ece9] p-6"><p className="text-[11px] tracking-[.12em] text-[#91736c]">被告人 · 顾惟真</p><h3 className="mt-3 text-[24px] font-semibold">侵犯公民个人信息罪</h3><p className="mt-4 text-[14px] leading-8 text-[#66534e]">顾惟真利用基金会留存的报名资料，将周惜的病情、住处与清晨路线发给“近身见证”多人，判处有期徒刑三年六个月，并处罚金。</p></article>
          </div>
          <aside className="mt-6 border-l-4 border-[#775e58] bg-white px-6 py-6 text-[14px] leading-8 text-[#56635f]"><h3 className="text-[18px] font-semibold text-[#34433f]">他为什么没有以故意杀人罪被判刑？</h3><p className="mt-3">顾没有说“杀了她”。他转发周惜的辱骂、身份资料和路线后，只写了“别让更多人被她骗”。梁孟海回复“明白”，两人此前也没有留下关于杀人的明确约定。</p><p className="mt-3">判决认为，这些证据足以证明顾把一个濒死者暴露给狂热信徒，却不足以排除他只想让信徒恐吓、阻止周惜公开资料的可能。因此检察机关没有把他作为故意杀人的共犯起诉。</p><p className="mt-3 font-semibold text-[#704f48]">判决划出了刑事责任的边界，没有替他洗清那条消息之后发生的事。</p></aside>
          <p className="mt-7 border-t border-[#c3ccc8] pt-5 text-[13px] leading-7 text-[#73807b]">安时生命关怀基金会停止运作。仍在接受资助的患者由三家公益机构接续，北麓路17号的资料间被永久封存。</p>
        </section>

        <section className="relative mt-8 bg-[#f2efe7] px-5 py-8 text-[#292b29] shadow-[0_18px_55px_rgba(0,0,0,.18)] md:px-9 md:py-11">
          <span className="absolute -left-[29px] top-11 size-4 rounded-full border-4 border-[#101513] bg-[#a6b7ae] md:-left-[45px]" />
          <header className="flex items-start justify-between gap-5 border-y-4 border-double border-[#373b38] py-6"><div><p className="text-[11px] tracking-[.2em] text-[#777d78]">判决后一周 · 临川晚讯特别报道</p><h2 className="mt-4 font-serif text-[34px] font-normal leading-tight md:text-[46px]">顾惟真争议</h2><p className="mt-3 text-[13px] text-[#777d78]">善款是真的，假见证是真的，死者也是真的。</p></div><Newspaper className="size-8 shrink-0 text-[#6b716d]" /></header>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="border-t-4 border-[#6e8778] bg-white/65 p-6"><small className="text-[#78877f]">受助者来信</small><h3 className="mt-3 font-serif text-[24px] font-normal">“他确实帮过我们。”</h3><p className="mt-4 text-[14px] leading-8 text-[#5c635f]">公开账目复核显示，安时多年间支付过真实的床位、药费、交通和临终照护支出。一些家属说，如果没有顾惟真的钱，他们连最后一次治疗都撑不到。</p></article>
            <article className="border-t-4 border-[#9a665e] bg-white/65 p-6"><small className="text-[#926e67]">病友组织声明</small><h3 className="mt-3 font-serif text-[24px] font-normal">“帮助不该索取信仰。”</h3><p className="mt-4 text-[14px] leading-8 text-[#625956]">安时把偶然好转包装成被神选中，又让病情恶化者相信自己不够虔诚，或必须由最亲近的人“代偿”。钱缓解了一部分痛苦，造神则给濒死者添上了第二种绝望。</p></article>
            <article className="border-t-4 border-[#6a667e] bg-white/65 p-6"><small className="text-[#77738a]">评论版</small><h3 className="mt-3 font-serif text-[24px] font-normal">“他需要别人相信他是神。”</h3><p className="mt-4 text-[14px] leading-8 text-[#5d5a66]">顾惟真病危时求遍神佛而没有得到回应，此后卖掉全部佛教藏品。他也许早已不信神，却把自己的生还写进伪造的古老传说，让别人的崇拜成为唯一回答。</p></article>
          </div>
          <blockquote className="mt-7 border-y border-[#bbb9b1] py-7 font-serif text-[20px] leading-10 text-[#414540] md:px-10">庭审最后，顾惟真仍说：“我从未要求任何人把我当作神。”<br /><span className="text-[15px] text-[#747a75]">他没有解释，为什么所有要求否认这一说法的稿件都被他退回。</span></blockquote>
          <p className="mt-7 text-[13px] leading-7 text-[#747a75]">赞扬、憎恨和辩解持续占据新闻评论区。没有一篇报道能把他简单写成救人者，也没有一份判决能替那些病人回答：他们接受的帮助，究竟要付出什么。</p>
        </section>
      </div>

      <footer className="mt-10 border-t border-white/12 pt-8"><p className="max-w-[650px] text-[13px] leading-7 text-white/38">案卷到这里结束。再往后，没有新的调查材料。</p><button className="mt-5 border border-white/25 px-5 py-3 text-[13px] text-white/72 transition hover:bg-white/5" onClick={onClose}>合上案卷</button></footer>
    </div>
  </main>;
}

function EndingTakeover({ phase, typedLength, onFinish }: { phase: EndingPhase; typedLength: number; onFinish: () => void }) {
  const apology = "对不起...";
  if (phase === "final") return <main className="ending-screen min-h-dvh bg-[#080b0c] px-6 py-12 text-[#e8eceb]"><div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-[820px] flex-col justify-center"><p className="text-[12px] tracking-[.22em] text-[#7f918a]">唯一结局</p><h1 className="mt-4 font-serif text-[52px] font-normal leading-tight md:text-[78px]">下周，葬礼照常举行</h1><div className="mt-9 border-y border-white/15 py-8"><p className="max-w-[720px] font-serif text-[22px] leading-10 text-white/82">你揭穿了顾惟真的神迹，也终于知道周惜曾经怎样背叛你。她是受害者，但这不会自动让她变得无辜。</p><p className="mt-5 text-[15px] leading-8 text-white/48">周惜替你预订的，是一场为活人准备的告别。她死后，那份预订被取消；同一周，家属为她办了真正的葬礼。</p><p className="mt-5 font-serif text-[20px] leading-9 text-white/72">下周无论如何都有一场葬礼。只是最后躺在那里的人变了。</p></div><button className="mt-12 w-fit border border-white/30 px-5 py-3 text-[14px] text-white/70 hover:bg-white/5" onClick={() => window.location.reload()}>重新开始</button></div></main>;

  return <main className="ending-takeover min-h-dvh overflow-hidden bg-[#17201c] text-[#25302b]" aria-live="polite">
    <header className="flex h-8 items-center justify-between bg-[#e8e9e4]/90 px-4 text-[11px] text-[#4f5b55]"><strong>记事本</strong><span>7月26日　00:08</span></header>
    <div className="relative min-h-[calc(100dvh-2rem)] bg-[radial-gradient(circle_at_25%_20%,#52625a_0,transparent_38%),linear-gradient(145deg,#26352f,#101714)] p-5 md:p-10">
      {phase === "opening" ? <div className="absolute inset-0 grid place-items-center bg-black/35 text-center text-white/65"><div><NotebookPen className="mx-auto size-10 stroke-[1.3]" /><p className="mt-4 text-[13px] tracking-[.12em]">记事本正在打开……</p><small className="mt-2 block text-white/35">没有检测到鼠标或键盘操作</small></div></div> : null}
      {phase !== "opening" ? <section className="ending-note-window mx-auto max-w-[760px] overflow-hidden rounded-lg border border-black/30 bg-[#fbfaf4] shadow-[0_28px_90px_rgba(0,0,0,.48)]">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#dad8cf] bg-[#eeece5] px-4 py-3"><div className="flex gap-2"><i className="size-3 rounded-full bg-[#d07a72]" /><i className="size-3 rounded-full bg-[#d3ad65]" /><i className="size-3 rounded-full bg-[#7fa177]" /></div><strong className="text-[12px] font-medium text-[#73766f]">未命名</strong><span /></header>
        {phase === "note" ? <div className="ending-note-reveal px-7 py-9 md:px-12 md:py-12"><p className="text-[11px] tracking-[.16em] text-[#999b92]">周惜 · 本地备忘录 · 最后修改 8月25日 05:21</p><div className="mt-7 space-y-5 font-serif text-[17px] leading-9 text-[#373b37]"><p>对不起是最无力的道歉，尤其是从身死之人口中说出。</p><p>他们让我填一个最亲近的人。我填了你。我不是不知道那意味着什么。我只是太想活了，想到真的愿意相信，只要你替我承受，我就能被允许活着。</p><p>今晚我看见程叙白的死亡记录，也看见他死后还在更新的账号。顾惟真救不了我，他只是精心挑选存活率大的人作为宣传，而我的生命已然要走到尽头。</p><p>名单和修改记录我已经存好了。我原本想明天发出去。可揭穿他，不等于我没有背叛你。</p><p>一滴泪的重量，取决于落在谁身上。知还，我爱过你，我恨过你。我爱你垂泪的眼睛，我恨你的眼睛看向其他方向。<br />还是不要原谅我了。</p></div><button className="mt-9 border border-[#aeb2aa] px-4 py-2 text-[12px] text-[#626a65] hover:bg-[#efeee8]" onClick={onFinish}>合上记事本</button></div> : <div className="min-h-[420px] px-7 py-10 font-serif text-[25px] leading-10 text-[#343a36] md:px-12"><span>{apology.slice(0, typedLength)}</span><i className="ending-note-cursor ml-1 inline-block h-7 w-px bg-[#4e5c55] align-middle" /></div>}
      </section> : null}
    </div>
  </main>;
}

export function EndingScreen() {
  const [phase, setPhase] = useState<EndingPhase>("dossier");
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (phase === "opening") timer = setTimeout(() => setPhase("typing"), 1300);
    if (phase === "typing") timer = setTimeout(() => typedLength < 6 ? setTypedLength((length) => length + 1) : setPhase("erasing"), typedLength < 6 ? 420 : 1400);
    if (phase === "erasing") timer = setTimeout(() => typedLength > 0 ? setTypedLength((length) => length - 1) : setPhase("note"), typedLength > 0 ? 170 : 800);
    return () => { if (timer) clearTimeout(timer); };
  }, [phase, typedLength]);

  if (phase === "dossier") return <AftermathDossier onClose={() => setPhase("opening")} />;
  return <EndingTakeover phase={phase} typedLength={typedLength} onFinish={() => setPhase("final")} />;
}
