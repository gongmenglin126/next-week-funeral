"use client";

import { ArrowUpRight, FileText, LockKeyhole } from "lucide-react";

export function RecordRevisionPage({ onOpenRule }: { onOpenRule: () => void }) {
  return <article className="min-h-full bg-[#e7e9e8] px-5 py-8 text-[#262b29] md:px-10 md:py-12">
    <div className="mx-auto max-w-[920px] overflow-hidden border border-[#afb5b2] bg-[#f7f8f7] shadow-[0_18px_45px_rgba(31,40,36,.12)]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#bcc2bf] bg-[#d9dddb] px-6 py-4 md:px-9">
        <div className="flex items-center gap-3"><FileText aria-hidden="true" className="size-5 text-[#56635d]" /><div><strong className="block text-[15px]">搜索缓存</strong><span className="text-[12px] text-[#6d7772]">捕获于 8月19日 09:12</span></div></div>
        <span className="border border-[#9da7a2] px-3 py-1 text-[12px] text-[#5d6863]">原页面已停止公开访问</span>
      </header>

      <main className="px-6 py-8 md:px-10 md:py-11">
        <p className="text-[13px] tracking-[.15em] text-[#76807b]">归潮见证 / 记录校对</p>
        <h1 className="mt-3 font-serif text-[32px] font-normal leading-tight md:text-[42px]">R-06-4 公开记录修订单</h1>
        <p className="mt-5 max-w-[720px] text-[15px] leading-8 text-[#59625e]">页面标题与第七期归档来信编号相同。缓存保留了发布前后的字段，但没有保留编辑人的姓名。</p>

        <section className="mt-9 overflow-hidden border border-[#c7cbc9] bg-white">
          <div className="grid border-b border-[#d2d6d4] bg-[#eef0ef] text-[13px] font-semibold md:grid-cols-[160px_1fr_1fr]"><span className="px-5 py-3">字段</span><span className="border-l border-[#d2d6d4] px-5 py-3">原始记录</span><span className="border-l border-[#d2d6d4] px-5 py-3">公开版本</span></div>
          <div className="grid border-b border-[#dfe2e0] text-[14px] leading-7 md:grid-cols-[160px_1fr_1fr]"><strong className="bg-[#f4f5f4] px-5 py-4">账号状态</strong><p className="border-l border-[#dfe2e0] px-5 py-4">8月18日 08:40<br />原联系人无法确认</p><p className="border-l border-[#dfe2e0] px-5 py-4">仅展示<br />互动功能关闭</p></div>
          <div className="grid border-b border-[#dfe2e0] text-[14px] leading-7 md:grid-cols-[160px_1fr_1fr]"><strong className="bg-[#f4f5f4] px-5 py-4">最近动态</strong><p className="border-l border-[#dfe2e0] px-5 py-4">8月16日 02:11<br />“明天住院……可能不会再更。”</p><p className="border-l border-[#dfe2e0] px-5 py-4">8月19日 09:00<br />“状态还可以，之后会慢慢恢复更新。”</p></div>
          <div className="grid text-[14px] leading-7 md:grid-cols-[160px_1fr_1fr]"><strong className="bg-[#f4f5f4] px-5 py-4">处理要求</strong><p className="border-l border-[#dfe2e0] px-5 py-4">保留原始内容与时间</p><p className="border-l border-[#dfe2e0] px-5 py-4">不加入死亡信息；继续使用参与者口吻；发布人显示为原账号</p></div>
        </section>

        <aside className="mt-7 border-l-4 border-[#6e7a74] bg-[#ecefed] px-5 py-4 text-[14px] leading-7 text-[#4d5752]">
          <strong>校对备注</strong>
          <p className="mt-1">此记录由项目组账号 RC-03 于8月18日接手。对外页面不得显示接手过程。</p>
        </aside>

        <button className="mt-8 inline-flex items-center gap-3 border border-[#5d6963] bg-[#2f3834] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#202723]" onClick={onOpenRule}>
          查看引用规则：S-17 <ArrowUpRight aria-hidden="true" className="size-4" />
        </button>
      </main>
    </div>
  </article>;
}

export function ContinuityRulePage({ onOpenMinutes }: { onOpenMinutes: () => void }) {
  return <article className="min-h-full bg-[#17211d] px-5 py-8 text-[#eef2ed] md:px-10 md:py-12">
    <div className="mx-auto max-w-[940px]">
      <header className="flex items-center justify-between gap-5 border-b border-white/20 pb-5">
        <div><strong className="text-[15px] tracking-[.18em]">安时项目办公室</strong><p className="mt-2 text-[12px] text-white/50">INTERNAL DOCUMENT / S-17</p></div>
        <LockKeyhole aria-hidden="true" className="size-6 text-[#9db4a6]" />
      </header>

      <main className="py-10 md:py-14">
        <p className="text-[13px] tracking-[.18em] text-[#90aa9a]">内部工作说明 · 修订于2023年8月</p>
        <h1 className="mt-4 max-w-[760px] font-serif text-[36px] font-normal leading-tight md:text-[48px]">参与记录续写与关系筛选说明</h1>
        <p className="mt-6 max-w-[760px] text-[16px] leading-8 text-white/65">供联络组与记录组使用。公开活动人员只接触场地、交通与普通陪伴流程，不接收本文件。</p>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="border border-white/15 bg-white/[.04] p-6 md:p-8"><span className="text-[12px] tracking-[.14em] text-[#90aa9a]">01 / 关系筛选</span><h2 className="mt-4 font-serif text-[24px] font-normal">每组必须是两个人</h2><p className="mt-4 text-[15px] leading-8 text-white/65">一人为病情已进入不可逆阶段的申请者；另一人为申请者自行确认的最深关系人。联络组须确认申请者相信：对方会因自己的死亡产生真实且持久的悲伤。</p><p className="mt-4 text-[15px] leading-8 text-white/65">关系人只收到公开活动与接送信息。完整目的由申请者决定何时告知。捐赠记录与支付能力不得进入筛选表。</p></article>
          <article className="border border-white/15 bg-white/[.04] p-6 md:p-8"><span className="text-[12px] tracking-[.14em] text-[#90aa9a]">02 / 记录续写</span><h2 className="mt-4 font-serif text-[24px] font-normal">公开记录不能出现失败</h2><p className="mt-4 text-[15px] leading-8 text-white/65">参与者无法继续维护账号时，由记录组接管公开资料。死亡信息、家属说明及与既定解释冲突的治疗结果不进入回访页面。</p><p className="mt-4 text-[15px] leading-8 text-white/65">至少保留一名“仍在继续”的叙述者。必要时沿用原账号语气发布低频动态，并关闭互动。</p></article>
        </section>

        <section className="mt-6 border border-[#8da095]/40 bg-[#213029] p-6 md:p-8">
          <h2 className="font-serif text-[25px] font-normal">知情范围</h2>
          <ol className="mt-5 grid gap-4 text-[15px] leading-7 md:grid-cols-2">
            <li><strong className="text-[#b7c9bd]">公开服务组</strong><p className="text-white/60">只知道生命关怀活动、场地和车辆安排；其中不少人相信顾惟真的幸存让他更懂得帮助病人。</p></li>
            <li><strong className="text-[#b7c9bd]">联络组</strong><p className="text-white/60">知道成对筛选及关系确认要求。</p></li>
            <li><strong className="text-[#b7c9bd]">记录组</strong><p className="text-white/60">知道死者账号会被接管和续写，内部称之为“保护还没有准备好理解结果的人”。</p></li>
            <li><strong className="text-[#b7c9bd]">说明会成员</strong><p className="text-white/60">接受顾惟真对全部结果的最终解释。</p></li>
          </ol>
        </section>

        <p className="mt-8 max-w-[760px] border-l-2 border-[#9db4a6] pl-5 text-[15px] italic leading-8 text-white/60">“外界看到的是一个人的结局。我们要保留的是被留下者能够继续相信的解释。”——文件页边批注，无署名</p>

        <button className="mt-9 inline-flex items-center gap-3 border border-[#9db4a6] px-5 py-3 text-[14px] font-semibold text-[#dce8df] hover:bg-white/10" onClick={onOpenMinutes}>
          查看附件：项目说明会纪要 <ArrowUpRight aria-hidden="true" className="size-4" />
        </button>
      </main>
    </div>
  </article>;
}

export function FounderBriefingPage() {
  return <article className="min-h-full bg-white px-5 py-8 text-[#161616] md:px-10 md:py-12">
    <div className="mx-auto max-w-[850px] border-x border-black/15 px-6 md:px-12">
      <header className="flex items-start justify-between gap-6 border-b-2 border-black pb-5">
        <div><strong className="text-[16px] tracking-[.16em]">安时项目说明会纪要</strong><p className="mt-2 text-[13px] text-black/55">2019年4月17日 · 海岬会馆二层</p></div>
        <span className="border-2 border-[#8b1e1e] px-3 py-1 text-[13px] font-bold tracking-[.18em] text-[#8b1e1e]">内部</span>
      </header>

      <main className="py-9 md:py-12">
        <dl className="grid gap-3 border-b border-black/20 pb-7 text-[14px] leading-7 md:grid-cols-2"><div><dt className="text-black/45">主讲</dt><dd>顾惟真</dd></div><div><dt className="text-black/45">记录</dt><dd>秘书处 / 纪要稿第三版</dd></div><div><dt className="text-black/45">参会范围</dt><dd>联络、记录与项目决策人员</dd></div><div><dt className="text-black/45">会前物品</dt><dd>无面小像一尊，置于主讲人右侧</dd></div></dl>

        <section className="mt-9 space-y-9 font-serif text-[16px] leading-9">
          <div><p className="mb-2 font-sans text-[13px] font-semibold text-black/50">问：为什么每一期都必须选两个人？</p><p>顾惟真：只害怕自己死，还不足以让死亡回头。一个人必须清楚知道，世上有谁会为他真正悲伤；也必须愿意把那个人放到死亡能够看见的位置。关系越深，选择才越有分量。</p></div>
          <div><p className="mb-2 font-sans text-[13px] font-semibold text-black/50">问：如果最后死去的仍是申请者，是否说明仪式没有作用？</p><p>顾惟真：你还在计算谁死了。我只看谁被留下。死亡从来都会收取代价，不存在“没有作用”，只存在你有没有资格解释它为什么这样选择。</p></div>
          <blockquote className="border-y border-black py-7 text-[22px] leading-10">“我从海岬那一夜活下来，不是因为幸运。闻川付出了代价，而我得到了说明这件事的资格。”</blockquote>
          <div><p className="mb-2 font-sans text-[13px] font-semibold text-black/50">问：公开记录与家属发布的死亡信息冲突时，应该以哪一边为准？</p><p>顾惟真：讣告只记录一个人的结束。安时记录的是留下的人为什么仍能继续。不要用外面的事实替我们下结论。</p></div>
        </section>

        <section className="mt-10 border-t border-black/30 pt-7 text-[14px] leading-8">
          <h2 className="font-sans text-[15px] font-bold">会后确认</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5"><li>“失败”“无效”“错误对象”等词不得进入内部结案材料。</li><li>对外回访由记录组统一维护，具体处理沿用 S-17。</li><li>所有仪式结果的最终说明权归顾惟真本人。</li></ul>
        </section>

        <footer className="mt-12 flex items-center gap-3 border-t border-black/20 py-6 text-[12px] text-black/45"><FileText aria-hidden="true" className="size-4" />附件编号：M-2019-0417 / 页码 3—5</footer>
      </main>
    </div>
  </article>;
}
