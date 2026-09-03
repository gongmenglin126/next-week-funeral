"use client";

import { ArrowUpRight, FileText, Landmark, Stethoscope } from "lucide-react";

export function QichaoAcademyPage({ onOpenReview }: { onOpenReview: () => void }) {
  return <article className="min-h-full bg-[#f4f1ea] text-[#26302c]">
    <header className="border-b border-[#c8c3b8] bg-[#23332d] text-[#f6f3eb]">
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-6 px-7 py-7 md:px-12">
        <div className="flex items-center gap-4"><Landmark aria-hidden="true" className="size-7 text-[#c7b98e]" /><div><strong className="font-serif text-[23px] font-normal tracking-[.12em]">栖潮书院</strong><p className="mt-1 text-[10px] tracking-[.16em] text-white/45">QICHAO HOUSE</p></div></div>
        <span className="text-[11px] text-white/55">关于书院</span>
      </div>
    </header>

    <main className="mx-auto max-w-[980px] px-7 py-12 md:px-12 md:py-16">
      <p className="text-[11px] tracking-[.18em] text-[#7d806f]">山居、阅读与病中生活支持</p>
      <h1 className="mt-4 max-w-[760px] font-serif text-[42px] font-normal leading-[1.25] md:text-[54px]">让暂时离开医院的人，<br />有一处可以停下来的地方。</h1>
      <p className="mt-7 max-w-[720px] text-[15px] leading-8 text-[#62685f]">栖潮书院位于临川北麓，提供短期居住、阅读活动与照护者休息空间。2018年起，安时生命关怀基金会持续承担场地维护，并与书院共同开展重症患者临时援助。</p>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="border-t-2 border-[#65786e] bg-[#ebe7dd] px-5 py-6"><small className="text-[11px] text-[#85877e]">开放空间</small><h2 className="mt-3 font-serif text-[22px] font-normal">山居阅读室</h2><p className="mt-3 text-[13px] leading-7 text-[#686d65]">旧书、地方志与捐赠文献预约阅览。</p></article>
        <article className="border-t-2 border-[#65786e] bg-[#ebe7dd] px-5 py-6"><small className="text-[11px] text-[#85877e]">照护支持</small><h2 className="mt-3 font-serif text-[22px] font-normal">家属短住</h2><p className="mt-3 text-[13px] leading-7 text-[#686d65]">为异地就医家庭提供短期住宿与交通协助。</p></article>
        <article className="border-t-2 border-[#65786e] bg-[#ebe7dd] px-5 py-6"><small className="text-[11px] text-[#85877e]">联合项目</small><h2 className="mt-3 font-serif text-[22px] font-normal">临潮重症援助</h2><p className="mt-3 text-[13px] leading-7 text-[#686d65]">协调会诊、转运、重症床位及必要费用。</p></article>
      </section>

      <section className="mt-10 border border-[#beb9ae] bg-[#faf8f3] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div><p className="text-[11px] tracking-[.14em] text-[#8b887e]">项目档案 · 2019</p><h2 className="mt-3 font-serif text-[28px] font-normal">临潮重症援助计划回顾</h2><p className="mt-3 max-w-[610px] text-[14px] leading-7 text-[#696c65]">公开档案记录书院与安时如何为危重患者协调医疗资源，以及几份被反复转载的康复回访。</p></div>
        <button className="mt-6 inline-flex shrink-0 items-center gap-2 border border-[#50635a] px-5 py-3 text-[13px] font-semibold text-[#32463d] hover:bg-[#e8ece8] md:mt-0" onClick={onOpenReview}>查看项目回顾 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
      </section>

      <footer className="mt-12 border-t border-[#cac5bb] pt-5 text-[11px] text-[#85867f]">运营支持：安时生命关怀基金会 · 联系与预约由书院办公室统一处理</footer>
    </main>
  </article>;
}

export function QichaoAidReviewPage() {
  return <article className="min-h-full bg-[#edf3f6] text-[#202d34]">
    <header className="border-b border-[#b9c9d1] bg-white">
      <div className="mx-auto max-w-[940px] px-7 py-6 md:px-12"><strong className="text-[15px] tracking-[.12em] text-[#285269]">栖潮书院 · 项目档案</strong><span className="ml-5 text-[11px] text-[#8797a0]">临潮重症援助</span></div>
    </header>

    <main className="mx-auto max-w-[940px] px-7 py-12 md:px-12 md:py-16">
      <div className="flex items-start gap-4"><Stethoscope aria-hidden="true" className="mt-1 size-7 text-[#3d7188]" /><div><p className="text-[11px] tracking-[.16em] text-[#6f8792]">2019 项目回顾</p><h1 className="mt-3 font-serif text-[38px] font-normal leading-tight md:text-[48px]">把能够抵达的医疗资源，送到病床前</h1></div></div>
      <p className="mt-7 max-w-[760px] text-[15px] leading-8 text-[#5d7079]">项目为多名危重患者协调会诊、转运、重症床位、特殊用药与陪护住宿。以下公开回访均来自患者或家属授权，医疗处置由接诊医院完成。</p>

      <section className="mt-10 overflow-hidden border border-[#b9cbd3] bg-white">
        <header className="border-b border-[#c8d6dc] bg-[#dbe8ed] px-6 py-4"><strong className="text-[14px]">公开回访节选</strong></header>
        <div className="divide-y divide-[#d9e2e6] text-[14px] leading-7">
          <article className="grid gap-2 px-6 py-5 md:grid-cols-[130px_1fr]"><strong className="text-[#436d80]">转运与床位</strong><p>完成跨市转运后进入重症监护，接受医院评估与后续治疗；家属称“终于等到了一张床”。</p></article>
          <article className="grid gap-2 px-6 py-5 md:grid-cols-[130px_1fr]"><strong className="text-[#436d80]">会诊与用药</strong><p>书院承担会诊交通和阶段性药费，患者度过危险期后转入普通病房。</p></article>
          <article className="grid gap-2 px-6 py-5 md:grid-cols-[130px_1fr]"><strong className="text-[#436d80]">陪护与短住</strong><p>照护者在栖潮书院短住十九天，直至患者病情稳定并返回当地继续治疗。</p></article>
        </div>
      </section>

      <section className="mt-8 border-l-4 border-[#668da0] bg-white/70 px-6 py-5 text-[13px] leading-7 text-[#586b74]">
        <strong>项目说明</strong>
        <p className="mt-2">康复结果来自医疗救治、照护条件与患者自身情况。栖潮书院和安时基金会不使用“神迹”等表述，也不提供任何治疗效果承诺。</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-[26px] font-normal">归档留言</h2>
        <div className="mt-5 space-y-3 text-[13px] leading-7">
          <blockquote className="border border-[#c5d2d8] bg-white px-5 py-4"><strong className="text-[#4c7283]">潮生未眠</strong><p className="mt-1">这里公开的好像都是后来转好的。项目当时还接过其他人吗？</p></blockquote>
          <blockquote className="border border-[#c5d2d8] bg-white px-5 py-4"><strong className="text-[#4c7283]">归岸</strong><p className="mt-1">完整申请没有公开，页脚只留了一个材料编号。</p></blockquote>
        </div>
      </section>

      <footer className="mt-12 border-t border-[#bdccd3] pt-5 text-[11px] leading-6 text-[#7a8d96]">公开材料编号：QC-AID-19 · 完整申请资料不对外展示</footer>
    </main>
  </article>;
}

export function QichaoSelectionMemoPage({ onOpenMinutes }: { onOpenMinutes: () => void }) {
  return <article className="min-h-full bg-[#d8d1c2] px-5 py-9 text-[#29251d] md:px-10 md:py-14">
    <div className="mx-auto max-w-[860px] rotate-[-.12deg] border border-[#958c79] bg-[#f7f1e4] px-7 py-8 shadow-[0_18px_50px_rgba(53,43,27,.18)] md:px-12 md:py-11">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#3c372d] pb-5">
        <div><p className="text-[11px] tracking-[.16em] text-[#776f60]">安时项目办公室 / 工作批注</p><h1 className="mt-3 font-serif text-[34px] font-normal">QC-AID-19 项目筛选与公开回访</h1></div>
        <span className="border-2 border-[#8e2f28] px-3 py-1 text-[12px] font-bold tracking-[.18em] text-[#8e2f28]">内部</span>
      </header>

      <main className="py-8">
        <p className="text-[14px] leading-8 text-[#5d5547]">栖潮书院临潮重症援助计划，仅供项目决策与宣传回访人员使用。</p>

        <section className="mt-8 border-y border-[#aaa08e] py-6">
          <h2 className="text-[15px] font-bold">援助名单确认</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-[14px] leading-7">
            <li>先由合作医院确认仍存在明确可逆因素，且转运、床位或特殊用药可能在短期内改变结果。</li>
            <li>条件接近时，优先确认愿意持续公开回访、病程变化便于记录的申请者。</li>
            <li>援助后未出现改善或已经死亡的个案仍保留在救助台账，但不进入书院公开回顾。</li>
            <li>最终援助名单与公开回访名单均由顾惟真本人确认。</li>
          </ol>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-2">
          <article className="border border-[#b2a794] bg-[#efe6d5] p-5"><h2 className="text-[14px] font-bold">官方口径</h2><p className="mt-3 text-[13px] leading-7">安时与栖潮书院不得使用“神迹”“大罗无相尊显应”等字样。所有康复均写明医疗处置与资源支持。</p></article>
          <article className="border border-[#b2a794] bg-[#efe6d5] p-5"><h2 className="text-[14px] font-bold">社区处理</h2><p className="mt-3 text-[13px] leading-7">参与者自行使用“被看见”“被点过名”等称呼时，不主动引用，也不要求删除；仅在涉及收费与治疗承诺时处理。</p></article>
        </section>

        <blockquote className="mt-8 border-l-4 border-[#7c332c] bg-[#eee2cf] px-6 py-5 font-serif text-[17px] leading-8">“不要替他们说，也不必替他们改。让他们自己从被留下的人里找到答案。”<span className="mt-2 block font-sans text-[11px] text-[#796e5d]">——页边批注，经秘书处确认为顾惟真原话</span></blockquote>

        <p className="mt-8 text-[13px] leading-7 text-[#665d4f]">这份材料不否认援助确实发生；它只规定哪些人先得到稀缺资源、哪些结果会被外界看见，以及哪些称呼可以在官方否认之外继续流传。</p>

        <button className="mt-8 inline-flex items-center gap-3 border border-[#544b3d] bg-[#393228] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#262119]" onClick={onOpenMinutes}>查看同批说明会纪要 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
      </main>

      <footer className="flex items-center gap-3 border-t border-[#aaa08e] pt-5 text-[11px] text-[#7a7162]"><FileText aria-hidden="true" className="size-4" />批注版本：2019年4月 / 与 M-2019-0417 同批归档</footer>
    </div>
  </article>;
}
