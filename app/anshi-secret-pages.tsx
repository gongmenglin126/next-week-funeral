"use client";

import { ArrowUpRight, ClipboardList, FileClock, ShieldAlert } from "lucide-react";

export function FanaticProfilePage() {
  return <article className="min-h-full bg-[#191716] px-5 py-9 text-[#ebe5df] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px]">
      <header className="border-b border-[#594a43] pb-8">
        <p className="text-[12px] tracking-[.17em] text-[#9d877c]">临川生活闲谈 · 用户归档</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
          <div><h1 className="font-serif text-[42px] font-normal md:text-[58px]">先生为大</h1><p className="mt-3 text-[14px] text-white/45">原账号已注销 · 共收录公开内容 4 条</p></div>
          <span className="border border-[#725a50] px-3 py-1 text-[12px] text-[#b79c90]">只读镜像</span>
        </div>
      </header>

      <section className="mt-9 space-y-5">
        <article className="border border-white/10 bg-white/[.035] p-6 md:p-7">
          <small className="text-[#a48e83]">2021-05-09 00:37 · 回复记录</small>
          <p className="mt-4 text-[15px] leading-8 text-white/68">你们没见过，就敢说是巧合。我第一次去见先生的时候已经下不了床，是他让我别怕。现在我还能站在这里，这还不够吗？</p>
        </article>

        <article className="border border-[#6a554c] bg-[#24201e] p-6 md:p-7">
          <small className="text-[#b49a8e]">2023-11-26 19:14 · 答谢会手机录像转写</small>
          <h2 className="mt-3 font-serif text-[24px] font-normal">他说“让她说完”</h2>
          <div className="mt-5 border-l-2 border-[#80695f] pl-5 text-[15px] leading-8 text-white/70">
            <p>台下一名女子跪下，连续三次称顾惟真为“大罗无相尊”。主持人上前想拦住她，顾抬手打断：</p>
            <blockquote className="my-4 font-serif text-[20px] text-white/88">“让她说完。”</blockquote>
            <p>女子讲完后将一幅写有尊号的白绢交给他。顾收下白绢，只说：“记住是谁让你撑到了今天。”现场随后又有多人跪下，他没有再作解释。</p>
          </div>
        </article>

        <article className="border border-[#6f4641] bg-[#281b1a] p-6 md:p-7">
          <small className="text-[#c18d84]">2025-04-17 02:06 · 已删除动态</small>
          <h2 className="mt-3 text-[21px] font-medium">别再替先生谦虚</h2>
          <p className="mt-3 text-[15px] leading-8 text-white/70">先生不亲口承认，是因为神不需要向谁证明。有人拿“医学”“概率”来羞辱先生，就是想把我们重新推回等死的日子。这样的人，不配被温和对待。</p>
        </article>

        <article className="border border-[#8a7768] bg-[#e8dfcf] p-6 text-[#39332d] md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><small className="text-[#806f61]">8月20日 16:42 · 志愿者资料</small><h2 className="mt-2 font-serif text-[25px] font-normal">新来的，先照这张填写</h2></div><ClipboardList aria-hidden="true" className="size-7 text-[#6f5c50]" /></div>
          <p className="mt-4 text-[14px] leading-7 text-[#61584f]">别把见证写成病历，也别擅自替先生解释。外发复核的主机和路径分开传，传出去之前自己对一遍。</p>
          <figure className="mt-6 rotate-[-.7deg] border border-[#b8aa94] bg-[#f8f3e8] p-5 shadow-[0_12px_30px_rgba(58,43,29,.18)] md:p-7">
            <figcaption className="border-b border-[#cfc2ae] pb-4 text-[12px] tracking-[.14em] text-[#766958]">第七期见证人填写说明 · 内部打印件</figcaption>
            <div className="mt-5 grid gap-3 text-[13px] leading-7 text-[#655b50] md:grid-cols-2"><p>01　只写本人亲历，不引用诊断结论</p><p>02　称谓沿用当事人口述，不主动改写</p><p>03　结果描述以修订页为准</p><p>04　提交前确认当前版本号</p></div>
            <footer className="mt-7 border-t border-[#cfc2ae] pt-4"><p className="text-[11px] text-[#857866]">外发复核镜像 · 主机</p><code className="mt-2 block break-all font-mono text-[14px] font-semibold text-[#453c34]">anshi.example</code><p className="mt-2 text-[11px] text-[#857866]">外发地址不随打印件保存。路径写在当期未公开页，校对后缀以先生终审记录为准。</p></footer>
          </figure>
        </article>
      </section>

      <footer className="mt-9 border-t border-[#594a43] pt-6 text-[12px] leading-6 text-white/35">归档仅保存原站公开内容及搜索引擎曾收录的删除页。</footer>
    </div>
  </article>;
}

export function AnshiManualPage({ onOpenApplication }: { onOpenApplication: () => void }) {
  return <article className="min-h-full bg-[#dfe4e3] px-4 py-8 text-[#1f2c2b] md:px-9 md:py-12">
    <div className="mx-auto max-w-[1040px] overflow-hidden border border-[#8d9996] bg-[#f8faf9] shadow-[0_18px_55px_rgba(30,45,43,.16)]">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-[#677572] bg-[#263432] px-6 py-5 text-[#eef3f1] md:px-9">
        <div><strong className="text-[15px] tracking-[.16em]">安时内容协作平台</strong><p className="mt-1 text-[11px] text-white/50">外发复核镜像 · 只读</p></div>
        <div className="flex items-center gap-3 text-[12px] text-white/65"><ShieldAlert aria-hidden="true" className="size-4" />禁止公开转发</div>
      </header>

      <main className="px-6 py-9 md:px-10 md:py-12">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[#c3ccca] pb-8">
          <div><p className="text-[12px] tracking-[.16em] text-[#6f817d]">内容维护 / 见证材料</p><h1 className="mt-3 font-serif text-[38px] font-normal leading-tight md:text-[52px]">见证材料维护手册</h1><p className="mt-4 text-[14px] text-[#63716e]">当前修订：R-06-4 · 审定：顾惟真</p></div>
          <span className="border border-[#8c5e56] bg-[#f3e8e5] px-3 py-2 text-[12px] font-semibold text-[#7b4d46]">内部资料</span>
        </div>

        <section className="mt-9 grid gap-6 lg:grid-cols-2">
          <article className="border border-[#bbc5c2] bg-white p-6 md:p-7">
            <h2 className="text-[20px] font-semibold">称谓与公开回应</h2>
            <ol className="mt-5 space-y-4 text-[14px] leading-7 text-[#52615e]">
              <li><strong className="mr-2 text-[#2d3e3a]">01</strong>参与者将顾先生称为“尊”或“大罗无相尊”时，不纠正、不代为确认。</li>
              <li><strong className="mr-2 text-[#2d3e3a]">02</strong>面对外部追问，不发布否认说明；统一表述为“尊重参与者个人理解”。</li>
              <li><strong className="mr-2 text-[#2d3e3a]">03</strong>相关说法由见证者账号自行发布，机构账号只转述康复结果与活动感受。</li>
              <li><strong className="mr-2 text-[#2d3e3a]">04</strong>涉及顾先生的标题、引语及结尾，发布前送本人审定。</li>
            </ol>
          </article>

          <article className="border border-[#bbc5c2] bg-white p-6 md:p-7">
            <h2 className="text-[20px] font-semibold">结果筛选与账号维护</h2>
            <ol className="mt-5 space-y-4 text-[14px] leading-7 text-[#52615e]">
              <li><strong className="mr-2 text-[#2d3e3a]">01</strong>公开回访优先选择短期指标好转、治疗反应明确或情绪稳定的参与者。</li>
              <li><strong className="mr-2 text-[#2d3e3a]">02</strong>死亡、失联及病情继续恶化者移出公开名单，原始记录转入封存。</li>
              <li><strong className="mr-2 text-[#2d3e3a]">03</strong>已移交的账号保持原有语气；必要时继续发布日常内容，避免见证突然中断。</li>
              <li><strong className="mr-2 text-[#2d3e3a]">04</strong>治疗、床位与自然波动不单独解释，以“被留下”“有人替其承受”等叙述串联。</li>
            </ol>
          </article>
        </section>

        <section className="mt-7 border border-[#9eaaa7] bg-[#edf2f0] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c4cecb] pb-5"><div><p className="text-[11px] tracking-[.15em] text-[#71817d]">案例修订 / 06-04</p><h2 className="mt-2 font-serif text-[27px] font-normal">“雨停以后”公开页</h2></div><FileClock aria-hidden="true" className="size-7 text-[#647975]" /></div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="border border-[#c3cbc9] bg-white p-5"><small className="text-[#87928f]">原始状态 · 8月17日</small><p className="mt-3 text-[14px] leading-7 text-[#4f5d5a]">家属确认当日03:26死亡。账号停止同步，最后私人动态为8月16日。</p></article>
            <article className="border border-[#92a29e] bg-[#f7faf8] p-5"><small className="text-[#6d817c]">发布稿 · 8月19日</small><p className="mt-3 text-[14px] leading-7 text-[#42534f]">“今天状态还可以，谢谢大家关心。诸神皆默，唯我是我。之后会慢慢恢复更新。”</p></article>
          </div>
          <dl className="mt-5 grid border-y border-[#c3ccca] text-[13px] leading-7 md:grid-cols-3"><div className="p-4"><dt className="text-[#81908c]">取句来源</dt><dd className="mt-1 font-semibold">《无相尊略传》整理稿</dd></div><div className="border-t border-[#c3ccca] p-4 md:border-l md:border-t-0"><dt className="text-[#81908c]">账号执行</dt><dd className="mt-1 font-semibold">见证维护组</dd></div><div className="border-t border-[#c3ccca] p-4 md:border-l md:border-t-0"><dt className="text-[#81908c]">终审</dt><dd className="mt-1 font-semibold">顾惟真 / 已通过</dd></div></dl>
        </section>

        <section className="mt-8 border-t-2 border-[#526460] pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] tracking-[.15em] text-[#74837f]">SESSION 07 / 关系人登记</p><h2 className="mt-2 font-serif text-[30px] font-normal">第七期 · 海边同行</h2></div><p className="text-[13px] text-[#687773]">8月31日 21:40 · 雾汀北站 · 2人</p></div>
          <div className="mt-6 overflow-hidden border border-[#aeb9b6] bg-white">
            <button className="grid w-full gap-4 p-5 text-left transition-colors hover:bg-[#eef3f1] md:grid-cols-[95px_1fr_1fr_145px_auto] md:items-center" onClick={onOpenApplication}>
              <span className="font-mono text-[13px] text-[#6f7f7b]">07-01</span><span><small className="block text-[11px] text-[#89938f]">申请者</small><strong className="mt-1 block text-[15px]">周惜 / 潮汐失眠</strong></span><span><small className="block text-[11px] text-[#89938f]">关系人</small><strong className="mt-1 block text-[15px]">林知还</strong></span><span className="w-fit border border-[#9a645c] bg-[#f5eae7] px-3 py-1 text-[12px] text-[#85554e]">异议待复核</span><ArrowUpRight aria-hidden="true" className="size-5 text-[#61746f]" />
            </button>
          </div>
          <aside className="mt-5 grid gap-3 border-l-4 border-[#75685d] bg-[#ede9e2] px-5 py-4 text-[13px] leading-7 text-[#625b53] md:grid-cols-[170px_1fr]"><strong>终场内部流程</strong><p>关系确认、影像留存、<strong>生前告别</strong>。关系人不得提前收到流程单。</p></aside>
        </section>
      </main>

      <footer className="border-t border-[#bdc7c4] bg-[#edf1f0] px-6 py-5 font-mono text-[12px] text-[#6b7a76] md:px-10">anshi.example/witness/r06-4 · mirror expires 09/01</footer>
    </div>
  </article>;
}
