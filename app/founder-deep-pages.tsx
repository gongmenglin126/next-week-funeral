"use client";

import { useState } from "react";

export function GuWeizhenPoemPage() {
  return <article className="search-document max-w-[860px]">
    <p>《临川文艺》 · 2020年第3期</p>
    <h1>山居杂记</h1>
    <code>linchuan-literature.example/archive/2020/gu-weizhen</code>
    <div className="mt-8 max-w-[560px] font-serif text-[16px] leading-[2.15] text-[#30383d]">
      <p>雨歇山窗暮色迟，<br />一壶新水煮陈枝。<br />闲翻旧册消长夜，<br />偶读大罗无相尊。</p>
      <p>檐外松声时断续，<br />阶前苔影自参差。<br />明朝仍有城中事，<br />收卷吹灯不复思。</p>
    </div>
    <footer className="mt-10 text-[11px] text-[#7d898f]">作者：顾惟真 · 据纸刊数字化录入</footer>
  </article>;
}

export function GuWeizhenInterviewPage() {
  const [photoOpen, setPhotoOpen] = useState(false);

  return <article className="min-h-full bg-[#f5f2ec] text-[#292e2c]">
    <header className="border-b border-[#d8d1c6] bg-[#faf8f4]">
      <div className="mx-auto max-w-[980px] px-7 pb-10 pt-7 md:px-12 md:pb-14 md:pt-10">
        <div className="mb-9 flex items-center justify-between border-b border-[#cfc7bb] pb-3 text-[10px] tracking-[.16em] text-[#77736c]">
          <strong className="font-sans text-[12px] tracking-[.22em] text-[#252824]">海州人物</strong>
          <span>2023.11 · 人物</span>
        </div>
        <p className="mb-4 text-[11px] tracking-[.14em] text-[#8a8176]">PROFILE / GU WEIZHEN</p>
        <h1 className="m-0 max-w-[760px] font-serif text-[38px] font-normal leading-[1.25] tracking-[-.03em] text-[#232622] md:text-[48px]">顾惟真，病后七年</h1>
        <p className="mt-6 max-w-[690px] text-[14px] leading-8 text-[#625f58]">七年前的一场重病改变了他的作息，却没有让他彻底离开公司。现在，他把更多时间留给基金会，也留给一间堆满旧书、拓片和残页的书房。</p>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-[10px] text-[#8a857d]"><span>文 / 孟嘉</span><span>摄影 / 陈昀</span><span>2023年11月16日</span></div>
      </div>
    </header>

    <main className="mx-auto max-w-[980px] px-7 py-10 md:px-12 md:py-14">
      <figure className="m-0">
        <button className="group block w-full cursor-zoom-in overflow-hidden bg-[#dedbd5] text-left" onClick={() => setPhotoOpen(true)} aria-label="放大查看顾惟真书房照片">
          <img className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.008]" src="./game/gu-weizhen-study-2022.webp" alt="顾惟真书房一角，木质书架与书桌" />
        </button>
        <figcaption className="mt-3 flex justify-between gap-4 border-b border-[#d7d0c5] pb-4 text-[10px] leading-5 text-[#858078]"><span>顾惟真书房一角，2022年。</span><span>受访者供图</span></figcaption>
      </figure>

      <div className="mx-auto mt-11 grid max-w-[840px] gap-10 md:grid-cols-[150px_minmax(0,1fr)] md:gap-14">
        <aside className="text-[10px] leading-6 text-[#8a847b]">
          <div className="border-t border-[#bfb7ac] pt-3">
            <strong className="block text-[11px] font-semibold text-[#514e48]">顾惟真</strong>
            <span>澜序实业集团创办人</span><br />
            <span>安时生命关怀基金会发起人</span>
          </div>
        </aside>

        <section className="space-y-7 font-serif text-[15px] leading-[2.05] text-[#3d403c]">
          <p>下午两点多，顾惟真从公司回来。采访原本约在会议室，他临时改了地方，说书房安静些。进门以后，他先把桌上的文件往旁边推了推，又问我们喝茶还是咖啡。最后茶泡得有点浓，他自己先皱了下眉。</p>

          <p>他现在仍然去公司，只是不再从早待到晚。上午看文件、见人，下午有时去基金会，有时直接回来。说起以前的日程，他笑了一下：“那时候什么都往里塞，一天排十件也觉得正常。现在不行了，排满了反而烦。”</p>

          <p>书房占了房子里不小的一块地方。靠墙的几排柜子没有统一整理，企业管理、地方志、旧刊、碑拓册混在一起，最上层还有几摞没有装订的残页。顾惟真说自己算不上收藏家，“就是看见顺眼的东西会留下”。</p>

          <div className="my-9 border-y border-[#cfc7bc] py-6 font-sans text-[13px] leading-7 text-[#4f524d]">
            <p><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">记者</span>这些都看得完吗？</p>
            <p className="mt-3"><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">顾惟真</span>当然看不完。收藏跟看完是两回事。</p>
            <p className="mt-3"><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">记者</span>那还继续收？</p>
            <p className="mt-3"><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">顾惟真</span>碰到了就收一点。有人知道我喜欢这些，也会往这里送。时间长了，自己都记不清哪件是哪来的。</p>
          </div>

          <p>聊到作息时，他才顺带提起2016年那次住院。出院后的头几个月，医生要求他尽量在十一点前睡觉，对一个多年凌晨两三点才回家的人来说，这件事比他预想得难得多。“最开始不是睡得早，是躺得早。”他说，“关了灯还是醒着，后来才一点点改过来。”</p>

          <p>那场抢救后来被不少报道写成“海岬奇迹”。他看过其中几篇，但没有特意保存。</p>

          <div className="my-9 border-l-2 border-[#9e9589] pl-6 font-sans text-[13px] leading-7 text-[#4d504b]">
            <p><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">记者</span>你介意别人一直这么叫吗？</p>
            <p className="mt-3"><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">顾惟真</span>以前觉得夸张。现在也懒得纠正了，新闻总要有个标题。</p>
            <p className="mt-3"><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">记者</span>自己会把那次经历看成运气吗？</p>
            <p className="mt-3"><span className="mr-3 text-[10px] font-semibold tracking-[.12em] text-[#91897f]">顾惟真</span>医生救的，机器撑的，最后人醒了。怎么解释都行。我现在不太想替那件事下结论。</p>
          </div>

          <p>采访快结束时，他接了一个基金会的电话。对方问晚上的饭局是否照旧，他想了几秒，说：“能推就推吧。”挂断之后，他把已经凉掉的茶倒掉，又重新添了一点热水。</p>
        </section>
      </div>
    </main>

    {photoOpen && <button className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-black/80 p-6" onClick={() => setPhotoOpen(false)} aria-label="关闭大图">
      <img className="max-h-[88vh] max-w-[94vw] object-contain shadow-2xl" src="./game/gu-weizhen-study-2022.webp" alt="放大的顾惟真书房照片" />
    </button>}
  </article>;
}

export function GuWeizhenCollectionPage({ onOpenAuction }: { onOpenAuction: () => void }) {
  return <article className="search-document max-w-[900px]">
    <p>临川文献馆 · 2024年特展回顾</p>
    <h1>“潮痕与旧纸”｜顾惟真私人文献收藏展</h1>
    <code>linchuan-archive.example/exhibitions/tide-paper</code>
    <p className="mt-7 max-w-[700px] text-[13px] leading-8 text-[#56635e]">展览选取顾惟真私人收藏中的地方旧籍、拓片与民间文献。以下为公开目录中的三件展品。</p>
    <section className="mt-8 divide-y divide-[#dfe3e0] border-y border-[#dfe3e0]">
      <div className="grid gap-2 py-5 sm:grid-cols-[72px_1fr]"><small>G-03</small><div><strong className="font-serif text-lg font-normal">《海岬盐路碑》旧拓</strong><p className="mt-1 text-[11px] text-[#7d8984]">顾惟真私人借展</p></div></div>
      <div className="grid gap-2 py-5 sm:grid-cols-[72px_1fr]"><small>G-11</small><div><strong className="font-serif text-lg font-normal">《海州杂录》抄本</strong><p className="mt-1 text-[11px] text-[#7d8984]">顾惟真私人借展</p></div></div>
      <div className="grid gap-2 py-5 sm:grid-cols-[72px_1fr]"><small>G-17</small><div><strong className="font-serif text-lg font-normal">《大罗无相尊仪轨残卷》</strong><p className="mt-1 text-[11px] leading-6 text-[#7d8984]">纸本残页，年代不详。来源：2018年秋拍“临川私人藏家旧藏”专场。</p><button className="mt-3 text-[11px] font-semibold text-[#426b61] underline underline-offset-4" onClick={onOpenAuction}>查看来源记录</button></div></div>
    </section>
  </article>;
}

export function GuWeizhenAuctionPage() {
  return <article className="search-document max-w-[820px]">
    <p>海州嘉闻拍卖 · 2018年秋拍</p>
    <h1>“临川私人藏家旧藏”专场成交记录</h1>
    <code>jiawen-auction.example/results/2018-autumn/linchuan</code>
    <div className="mt-8 border-y border-[#d9dedb] py-7">
      <small className="text-[#79857f]">LOT 17</small>
      <h2 className="mt-2 font-serif text-2xl font-normal text-[#29332f]">《大罗无相尊仪轨残卷》</h2>
      <dl className="mt-6 grid gap-4 text-[12px] sm:grid-cols-3">
        <div><dt className="text-[#89928e]">估价</dt><dd className="mt-1">¥80,000—120,000</dd></div>
        <div><dt className="text-[#89928e]">成交价</dt><dd className="mt-1 font-semibold">¥380,000</dd></div>
        <div><dt className="text-[#89928e]">竞得方</dt><dd className="mt-1 font-semibold">临川私人藏家</dd></div>
      </dl>
    </div>
    <p className="mt-7 max-w-[620px] text-[12px] leading-7 text-[#67736e]">本场部分成交拍品后由私人机构借展公开，具体流转信息不再披露。</p>
  </article>;
}
