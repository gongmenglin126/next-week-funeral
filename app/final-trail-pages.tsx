"use client";

import { FileWarning, MessageSquareText, ShieldCheck } from "lucide-react";

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
        <article className="border border-[#7f4943] bg-[#271b1a] p-6"><div className="flex flex-wrap items-center justify-between gap-3"><small className="text-[#c08a82]">守潮人-17 · 8月25日 04:51</small><span className="border border-[#94574f] px-2 py-1 text-[11px] text-[#c88d84]">删除缓存</span></div><h2 className="mt-3 text-[20px] font-medium">天亮前</h2><p className="mt-3 text-[15px] leading-8 text-white/70">白色七座还能开，临牌已经换回 <strong className="font-mono text-[#e2b3aa]">LC·7M21</strong>。从西院出去，天亮前能到沿海路。</p><div className="mt-5 border-t border-white/10 pt-4 text-[14px] text-white/48"><strong>06:07 更新：</strong>已经安静了。先生不必再看。</div></article>
      </section>

      <footer className="mt-8 border-t border-white/10 pt-6 text-[13px] leading-7 text-white/38">页面还保留一个完整号牌。帖子没有说明车辆后来去了哪里。</footer>
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

export function EndingScreen() {
  return <main className="ending-screen min-h-dvh bg-[#080b0c] px-6 py-12 text-[#e8eceb]">
    <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-[820px] flex-col justify-center">
      <p className="text-[12px] tracking-[.22em] text-[#7f918a]">唯一结局 · 真相公开</p>
      <h1 className="mt-4 font-serif text-[48px] font-normal leading-tight md:text-[72px]">下周没有葬礼</h1>

      <section className="mt-10 space-y-6 border-y border-white/15 py-8 text-[16px] leading-9 text-white/64">
        <p>你提交的网页让警方重新调取了北麓路17号与沿海路的完整影像。白色七座登记在安时基金会名下，驾驶人“守潮人-17”是第七期现场志愿者。</p>
        <p>8月30日，周惜死亡案转为刑事调查。顾惟真与涉事信徒被控制，安时的服务器、见证账号和西院资料间被查封。</p>

        <article className="border border-white/15 bg-white/[.035] p-6">
          <header className="flex items-center gap-3 border-b border-white/10 pb-4"><ShieldCheck aria-hidden="true" className="size-5 text-[#9cafaa]" /><strong className="text-[14px] text-white/75">服务器核查结果</strong></header>
          <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-8 text-white/62 marker:text-[#8ca098]">
            <li>47份“见证”中，11名参与者实际已经死亡，8个账号仍在死后继续更新。</li>
            <li>公开页面只保留好转者；死亡与恶化记录统一封存，再被改写成“代偿”或“有人替其承受”。</li>
            <li>《无相尊略传》并非流传多年的民间旧本。2019年，顾惟真办公室根据他的病史、自传和旧院经历写成初稿，再借口述史项目存入地方资料库。</li>
            <li>顾惟真亲自审定见证稿，并要求任何人不得公开否认他与“大罗无相尊”的关系。</li>
          </ul>
        </article>

        <article className="border border-white/15 bg-white/[.035] p-6">
          <header className="flex items-center gap-3 border-b border-white/10 pb-4"><Radio aria-hidden="true" className="size-5 text-[#b79d90]" /><strong className="text-[14px] text-white/75">8月25日转发链</strong></header>
          <div className="mt-5 grid gap-3 text-[14px] leading-7 md:grid-cols-[95px_1fr]"><strong>00:31</strong><p>顾惟真把周惜的消息、住处和清晨路线发至“近身见证”。</p><strong>00:42</strong><p>守潮人-17回复“明白”。</p><strong>04:58</strong><p>基金会车辆驶出北麓旧院。</p><strong>05:33</strong><p>周惜在沿海路口遭遇碰撞。</p></div>
        </article>

        <p>警方在第七期日程中找到了8月31日晚的最后环节：接送两名关系人前往旧院，留下告别影像。内部流程只写了四个字——<strong className="text-white/80">生前葬礼</strong>。那就是周惜替你预订、又始终没有告诉你的下一段行程。</p>

        <p>手机归还时，周惜的备忘录停在一段没有发出的草稿上：</p>
        <blockquote className="border-l-2 border-[#8da096] pl-5 font-serif text-[18px] leading-9 text-white/78">“我怕死。怕到真的把林知还填了进去。识破顾惟真，不代表这件事没有发生。<br /><br />一滴泪的重量，取决于落在谁身上。<br /><br />明天先把名单发出去。别的，应该由她自己决定。”</blockquote>
        <p>她没有来得及公开名单，也没有来得及请求你的原谅。</p>
      </section>

      <p className="mt-9 max-w-[720px] font-serif text-[22px] leading-10 text-white/82">你揭穿了顾惟真的神迹，也终于知道周惜曾经怎样背叛你。她是受害者，但这不会自动让她变得无辜。</p>
      <button className="mt-12 w-fit border border-white/30 px-5 py-3 text-[14px] text-white/70 hover:bg-white/5" onClick={() => window.location.reload()}>重新开始</button>
    </div>
  </main>;
}
