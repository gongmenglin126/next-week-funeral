"use client";

import { ArrowUpRight, Building2, FileText, Stethoscope } from "lucide-react";

export function BeiluRehabilitationPage({ onOpenReview, onOpenArchive }: { onOpenReview: () => void; onOpenArchive: () => void }) {
  return <article className="min-h-full bg-[#eef4f6] text-[#22323a]">
    <header className="border-b border-[#c5d3d9] bg-white">
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-6 px-7 py-7 md:px-12">
        <div className="flex items-center gap-4"><Stethoscope aria-hidden="true" className="size-7 text-[#4c8298]" /><div><strong className="text-[20px] font-semibold tracking-[.08em] text-[#28586c]">临川北麓康复中心</strong><p className="mt-1 text-[10px] tracking-[.14em] text-[#8a9ba2]">BEILU RECOVERY &amp; FAMILY CARE</p></div></div>
        <span className="text-[11px] text-[#768990]">中心介绍</span>
      </div>
    </header>

    <main className="mx-auto max-w-[980px] px-7 py-12 md:px-12 md:py-16">
      <p className="text-[11px] tracking-[.18em] text-[#708993]">异地就医 · 康复衔接 · 家属支持</p>
      <h1 className="mt-4 max-w-[760px] font-serif text-[42px] font-normal leading-[1.25] md:text-[54px]">让病床之外的日子，<br />也有人接住。</h1>
      <p className="mt-7 max-w-[740px] text-[15px] leading-8 text-[#5d7078]">临川北麓康复中心为异地就医家庭提供院外短住、出院后的生活训练、照护者喘息与医疗资源转介。中心不设急诊与重症病床，诊断和治疗均由合作医院完成。</p>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="border-t-2 border-[#76a1b2] bg-white px-5 py-6"><small className="text-[11px] text-[#87999f]">院外衔接</small><h2 className="mt-3 font-serif text-[22px] font-normal">陪护短住</h2><p className="mt-3 text-[13px] leading-7 text-[#687a81]">为转诊、复查和长期陪护家庭提供阶段性住所。</p></article>
        <article className="border-t-2 border-[#76a1b2] bg-white px-5 py-6"><small className="text-[11px] text-[#87999f]">照护支持</small><h2 className="mt-3 font-serif text-[22px] font-normal">家属喘息</h2><p className="mt-3 text-[13px] leading-7 text-[#687a81]">由护理员和社工协助日常照护、信息登记与复诊安排。</p></article>
        <article className="border-t-2 border-[#76a1b2] bg-white px-5 py-6"><small className="text-[11px] text-[#87999f]">资源协调</small><h2 className="mt-3 font-serif text-[22px] font-normal">临潮重症援助</h2><p className="mt-3 text-[13px] leading-7 text-[#687a81]">协调会诊、转运、重症床位、特殊用药及必要费用。</p></article>
      </section>

      <section className="mt-10 border border-[#bdced5] bg-white p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div><p className="text-[11px] tracking-[.14em] text-[#81949b]">公开项目档案 · 2019</p><h2 className="mt-3 font-serif text-[28px] font-normal">临潮重症援助计划回顾</h2><p className="mt-3 max-w-[610px] text-[14px] leading-7 text-[#687b83]">中心曾为危重患者家庭提供就医资源协调。公开回顾保留了获得授权的项目记录和康复随访。</p></div>
        <button className="mt-6 inline-flex shrink-0 items-center gap-2 border border-[#50798a] px-5 py-3 text-[13px] font-semibold text-[#315f72] hover:bg-[#e8f0f3] md:mt-0" onClick={onOpenReview}>查看项目回顾 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
      </section>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#c2d0d5] pt-5 text-[11px] text-[#82949a]"><span>地址：临川市北麓路17号东院 · 预约来访请提前登记</span><button className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#486f7f] underline underline-offset-4" onClick={onOpenArchive}>为什么地址写“东院”？查看院区沿革 <ArrowUpRight aria-hidden="true" className="size-3" /></button></footer>
    </main>
  </article>;
}

export function LinchaoAidReviewPage() {
  return <article className="min-h-full bg-[#edf3f6] text-[#202d34]">
    <header className="border-b border-[#b9c9d1] bg-white">
      <div className="mx-auto max-w-[940px] px-7 py-6 md:px-12"><strong className="text-[15px] tracking-[.1em] text-[#285269]">临川北麓康复中心 · 项目档案</strong><span className="ml-5 text-[11px] text-[#8797a0]">临潮重症援助</span></div>
    </header>

    <main className="mx-auto max-w-[940px] px-7 py-12 md:px-12 md:py-16">
      <div className="flex items-start gap-4"><Stethoscope aria-hidden="true" className="mt-1 size-7 text-[#3d7188]" /><div><p className="text-[11px] tracking-[.16em] text-[#6f8792]">2019 项目回顾</p><h1 className="mt-3 font-serif text-[38px] font-normal leading-tight md:text-[48px]">把能够抵达的医疗资源，送到病床前</h1></div></div>
      <p className="mt-7 max-w-[760px] text-[15px] leading-8 text-[#5d7079]">项目为多名危重患者协调会诊、转运、重症床位、特殊用药与陪护住宿。以下公开回访均来自患者或家属授权，医疗处置由接诊医院完成。</p>

      <section className="mt-10 overflow-hidden border border-[#b9cbd3] bg-white">
        <header className="border-b border-[#c8d6dc] bg-[#dbe8ed] px-6 py-4"><strong className="text-[14px]">公开回访节选</strong></header>
        <div className="divide-y divide-[#d9e2e6] text-[14px] leading-7">
          <article className="grid gap-2 px-6 py-5 md:grid-cols-[130px_1fr]"><strong className="text-[#436d80]">转运与床位</strong><p>完成跨市转运后进入重症监护，接受医院评估与后续治疗；家属称“终于等到了一张床”。</p></article>
          <article className="grid gap-2 px-6 py-5 md:grid-cols-[130px_1fr]"><strong className="text-[#436d80]">会诊与用药</strong><p>项目承担会诊交通和阶段性药费，患者度过危险期后转入普通病房。</p></article>
          <article className="grid gap-2 px-6 py-5 md:grid-cols-[130px_1fr]"><strong className="text-[#436d80]">陪护与短住</strong><p>照护者在中心短住十九天，直至患者病情稳定并返回当地继续治疗。</p></article>
        </div>
      </section>

      <section className="mt-8 border-l-4 border-[#668da0] bg-white/70 px-6 py-5 text-[13px] leading-7 text-[#586b74]">
        <strong>项目说明</strong>
        <p className="mt-2">回访结果来自医疗救治、照护条件与患者自身情况。项目不提供任何治疗效果承诺。</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-[26px] font-normal">归档留言</h2>
        <div className="mt-5 space-y-3 text-[13px] leading-7">
          <blockquote className="border border-[#c5d2d8] bg-white px-5 py-4"><strong className="text-[#4c7283]">潮生未眠</strong><p className="mt-1">这里公开的几个人，后来都好转了。项目当时只接过这些人吗？</p></blockquote>
          <blockquote className="border border-[#c5d2d8] bg-white px-5 py-4"><strong className="text-[#4c7283]">归岸</strong><p className="mt-1">完整申请没有公开，页面上只留了公开项目批次。</p></blockquote>
        </div>
      </section>

      <footer className="mt-12 border-t border-[#bdccd3] pt-5 text-[11px] leading-6 text-[#7a8d96]">公开项目批次：LC-19 · 个案申请资料不对外展示</footer>
    </main>
  </article>;
}

export function BeiluPlaceArchivePage({ onOpenCentre, onOpenSelection }: { onOpenCentre: () => void; onOpenSelection: () => void }) {
  return <article className="min-h-full bg-[#f1eee7] px-5 py-10 text-[#302f2a] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px] border border-[#c1bcae] bg-[#faf8f2] shadow-[0_16px_40px_rgba(58,52,39,.1)]">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-[#bcb6a8] bg-[#4b5550] px-7 py-6 text-white md:px-10"><div className="flex items-center gap-4"><Building2 aria-hidden="true" className="size-7 text-[#cad4cc]" /><div><strong className="text-[16px] tracking-[.14em]">临川地方建筑档案</strong><p className="mt-1 text-[10px] text-white/55">旧址沿革 · BL-17</p></div></div><span className="text-[11px] text-white/60">北麓路17号</span></header>
      <main className="px-7 py-9 md:px-10 md:py-12">
        <p className="text-[11px] tracking-[.16em] text-[#858074]">建筑沿革资料卡</p>
        <h1 className="mt-3 font-serif text-[36px] font-normal">北麓疗养院旧址</h1>
        <p className="mt-5 max-w-[730px] text-[14px] leading-8 text-[#69665d]">旧址由东西两院组成，几经停办和改作。附近居民至今仍把整片院落称作“栖潮旧院”。</p>

        <dl className="mt-9 divide-y divide-[#d2cdc1] border-y border-[#bdb6a7] text-[13px] leading-7">
          <div className="grid gap-2 py-5 md:grid-cols-[90px_1fr]"><dt className="font-semibold text-[#6b756f]">1958</dt><dd>北麓疗养院建成，设东西两院，主要接收术后及慢性病休养者。</dd></div>
          <div className="grid gap-2 py-5 md:grid-cols-[90px_1fr]"><dt className="font-semibold text-[#6b756f]">1987</dt><dd>增挂“栖潮疗养院”院名。停办后，地方口语中逐渐留下“栖潮旧院”的称呼。</dd></div>
          <div className="grid gap-2 py-5 md:grid-cols-[90px_1fr]"><dt className="font-semibold text-[#6b756f]">2007</dt><dd>停止住院疗养业务，东院经过修缮，西院暂作资料保管和办公用房。</dd></div>
          <div className="grid gap-2 py-5 md:grid-cols-[90px_1fr]"><dt className="font-semibold text-[#6b756f]">2018</dt><dd>东院登记为临川北麓康复中心；西院不对外开放，登记用途仍为办公与档案保管。</dd></div>
        </dl>

        <section className="mt-8 grid gap-4 md:grid-cols-2"><article className="border border-[#cbc5b8] bg-[#f1ede4] p-5"><small className="text-[#8a867d]">东院</small><h2 className="mt-2 font-serif text-[21px]">康复与家属支持</h2><p className="mt-2 text-[12px] leading-6 text-[#716d64]">现为公开登记机构，可预约来访。</p></article><article className="border border-[#cbc5b8] bg-[#f1ede4] p-5"><small className="text-[#8a867d]">西院</small><h2 className="mt-2 font-serif text-[21px]">办公与资料保管</h2><p className="mt-2 text-[12px] leading-6 text-[#716d64]">院门常闭，不列入公开参观范围。</p></article></section>

        <aside className="mt-6 border border-[#c7c0b2] bg-[#eee9df] px-5 py-4 text-[12px] leading-7 text-[#716b60]">
          <strong className="text-[#55564e]">数字化移交附记</strong>
          <p className="mt-1">2019年西院资料移交时，一份援助项目工作材料未随建筑档案公开。索引页仍保留了可读取的扫描副本。</p>
          <button className="mt-3 inline-flex items-center gap-2 font-semibold text-[#3f5148] underline underline-offset-4" onClick={onOpenSelection}>打开援助项目工作批注 <ArrowUpRight aria-hidden="true" className="size-3" /></button>
        </aside>

        <button className="mt-8 inline-flex items-center gap-2 border border-[#596b62] px-5 py-3 text-[13px] font-semibold text-[#45594f] hover:bg-[#e8ece8]" onClick={onOpenCentre}>查看东院现用机构 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
      </main>
    </div>
  </article>;
}

export function BeiluSelectionMemoPage({ onOpenRevision }: { onOpenRevision: () => void }) {
  return <article className="min-h-full bg-[#d8d1c2] px-5 py-9 text-[#29251d] md:px-10 md:py-14">
    <div className="mx-auto max-w-[860px] rotate-[-.12deg] border border-[#958c79] bg-[#f7f1e4] px-7 py-8 shadow-[0_18px_50px_rgba(53,43,27,.18)] md:px-12 md:py-11">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#3c372d] pb-5"><div><p className="text-[11px] tracking-[.16em] text-[#776f60]">会前材料 / 工作批注</p><h1 className="mt-3 font-serif text-[34px] font-normal">QC-AID-19 项目筛选与公开回访</h1></div><span className="border-2 border-[#8e2f28] px-3 py-1 text-[12px] font-bold tracking-[.18em] text-[#8e2f28]">内部</span></header>

      <main className="py-8">
        <p className="text-[14px] leading-8 text-[#5d5547]">“QC”为栖潮疗养院旧档案沿用的卷宗前缀。本件仅供援助项目决策及回访人员使用。</p>

        <section className="mt-8 border-y border-[#aaa08e] py-6"><h2 className="text-[15px] font-bold">援助名单确认</h2><ol className="mt-4 list-decimal space-y-3 pl-5 text-[14px] leading-7"><li>先由合作医院确认仍存在明确可逆因素，且转运、床位或特殊用药可能在短期内改变结果。</li><li>条件接近时，优先确认愿意持续公开回访、病程变化便于记录的申请者。</li><li>援助后未出现改善或已经死亡的个案仍保留在内部救助台账，但不进入公开回顾。</li><li>最终援助名单与公开回访名单均由顾惟真本人确认。</li></ol></section>

        <section className="mt-7 grid gap-5 md:grid-cols-2"><article className="border border-[#b2a794] bg-[#efe6d5] p-5"><h2 className="text-[14px] font-bold">官方口径</h2><p className="mt-3 text-[13px] leading-7">安时与北麓中心不得使用“神迹”“大罗无相尊显应”等字样。所有康复均写明医疗处置与资源支持。</p></article><article className="border border-[#b2a794] bg-[#efe6d5] p-5"><h2 className="text-[14px] font-bold">社区处理</h2><p className="mt-3 text-[13px] leading-7">参与者自行使用“被看见”“被点过名”等称呼时，不主动引用，也不要求更正；仅在涉及收费与治疗承诺时处理。</p></article></section>

        <blockquote className="mt-8 border-l-4 border-[#7c332c] bg-[#eee2cf] px-6 py-5 font-serif text-[17px] leading-8">“不要替他们说，也不必替他们改。让他们自己从被留下的人里找到答案。”<span className="mt-2 block font-sans text-[11px] text-[#796e5d]">——页边批注，经秘书处确认为顾惟真原话</span></blockquote>
        <p className="mt-8 text-[13px] leading-7 text-[#665d4f]">这份材料不否认援助确实发生；它只规定哪些人先得到稀缺资源、哪些结果会被外界看见，以及哪些称呼可以在官方否认之外继续流传。</p>
        <section className="mt-8 border border-[#a39986] bg-[#f0e8d9] px-5 py-4 text-[13px] leading-7 text-[#615849]">
          <p className="text-[11px] font-semibold tracking-[.13em] text-[#807664]">关联抽查样本</p>
          <p className="mt-2">第六期公开回访曾被内部抽查，缓存里保留了公开前后的字段差异。</p>
          <button className="mt-3 inline-flex items-center gap-2 font-semibold text-[#493f33] underline underline-offset-4" onClick={onOpenRevision}>查看第六期记录校对样本 <ArrowUpRight aria-hidden="true" className="size-3" /></button>
        </section>
      </main>

      <footer className="flex items-center gap-3 border-t border-[#aaa08e] pt-5 text-[11px] text-[#7a7162]"><FileText aria-hidden="true" className="size-4" />批注版本：2019年4月 / 与当月说明会材料同批归档</footer>
    </div>
  </article>;
}
