"use client";

import { ArrowUpRight } from "lucide-react";

export function GuWeizhenPoemPage() {
  return <article className="min-h-full bg-[#fbfaf7] text-[#252a27]">
    <header className="border-b border-[#dedbd4] bg-white">
      <div className="mx-auto flex max-w-[920px] items-end justify-between gap-6 px-7 py-6 md:px-12">
        <div><strong className="font-serif text-[20px] font-normal tracking-[.08em]">临川文艺</strong><p className="mt-1 text-[10px] tracking-[.14em] text-[#908b82]">LINCHUAN LITERATURE</p></div>
        <span className="text-[10px] text-[#918d86]">2020年第3期 · 诗页存档</span>
      </div>
    </header>

    <main className="mx-auto max-w-[920px] px-7 pb-20 pt-14 md:px-12 md:pt-20">
      <div className="mx-auto max-w-[560px]">
        <p className="mb-3 text-center text-[10px] tracking-[.18em] text-[#979188]">旧作</p>
        <h1 className="m-0 text-center font-serif text-[34px] font-normal tracking-[.08em] text-[#252825]">山居杂记</h1>
        <p className="mt-4 text-center text-[11px] tracking-[.12em] text-[#8a857d]">顾惟真</p>

        <div className="mx-auto mt-14 w-fit font-serif text-[17px] leading-[2.35] tracking-[.08em] text-[#373a36]">
          <p>雨歇山窗暮色迟，<br />一壶新水煮陈枝。<br />闲翻旧册消长夜，<br />偶读大罗无相尊。</p>
          <p className="mt-8">檐外松声时断续，<br />阶前苔影自参差。<br />明朝仍有城中事，<br />收卷吹灯不复思。</p>
        </div>

        <div className="mt-16 border-t border-[#dedad2] pt-5 text-[10px] leading-6 text-[#8d887f]">
          <p>原载《临川文艺》2020年第3期，第46页。</p>
          <p>作者自注：写于栖潮旧院，2019年秋。</p>
          <p>纸刊数字化项目录入，保留原文标点。</p>
        </div>
      </div>
    </main>
  </article>;
}

export function GuWeizhenInterviewPage({ onOpenPoem }: { onOpenPoem: () => void }) {
  return <article className="min-h-full bg-[#f3efe8] text-[#292d2a]">
    <header className="bg-[#202622] text-[#f4f0e8]">
      <div className="mx-auto max-w-[980px] px-7 pb-10 pt-7 md:px-12 md:pb-12 md:pt-9">
        <div className="mb-12 flex items-center justify-between border-b border-white/20 pb-3 text-[10px] tracking-[.14em] text-white/55">
          <strong className="text-[12px] tracking-[.22em] text-white/90">海州人物</strong>
          <span>空间 / 2023.11</span>
        </div>
        <p className="mb-3 text-[10px] tracking-[.18em] text-[#b8b0a4]">VISIT</p>
        <h1 className="m-0 font-serif text-[40px] font-normal leading-[1.2] tracking-[-.02em] md:text-[52px]">顾惟真的书房</h1>
        <p className="mt-5 max-w-[650px] text-[13px] leading-7 text-white/65">旧书、地方志、工程资料，还有一些连主人自己也说不清来历的小东西。</p>
        <p className="mt-7 text-[10px] text-white/45">文 / 孟嘉　摄影 / 陈昀　2023年11月16日</p>
      </div>
    </header>

    <main className="mx-auto max-w-[980px] px-7 py-10 md:px-12 md:py-14">
      <figure className="mx-auto max-w-[860px] text-center">
        <img className="mx-auto block h-auto w-full max-w-[860px] object-contain" src="./game/gu-weizhen-study-2022-v3.webp" alt="顾惟真书房一角，木质书架与书桌，书架上摆着一尊无面小像" />
        <figcaption className="mt-3 text-center text-[10px] leading-5 text-[#8b877f]">顾惟真书房一角，2022年。</figcaption>
      </figure>

      <div className="mx-auto mt-12 max-w-[700px] space-y-7 font-serif text-[15px] leading-[2.05] text-[#3c403c]">
        <p>顾惟真的书房在二楼，朝西。下午光线最好的时候，窗边那张桌子会先亮起来，靠墙的书架反而一直有些暗。采访那天，他刚从公司回来，外套还搭在椅背上。</p>

        <p>书并没有按什么严格的次序放。地方志旁边是海工设备手册，旧刊里夹着几册碑拓，底层还有一摞没有装订的纸页。他说前几年曾找人整理过一次，没过多久又乱回去了。</p>

        <p>“不是为了研究。”顾惟真说，“看见喜欢的就留下。有些看得懂，有些看不懂，先放着。”朋友知道他有这个习惯，出差碰见旧书、旧地图，也会顺手带回来。</p>

        <p>靠窗矮柜的最下层还收着一只旧香炉和一串念珠。孟嘉记得2014年第一次采访时，这间屋子另一侧还是三层供架；顾惟真早晚礼佛，出差也不会中断。2017年嘉闻春拍“澜序旧藏·佛教艺术”专场之后，供架和大部分藏品都不见了，只剩这两件东西留在箱底。</p>

        <p>顾惟真把盒盖重新合上：“2016年以后就没有再用过。不是换了一尊去信，我已经不信这些了。留下它们，也不是舍不得，只是扔掉不能改变什么。”</p>

        <p>桌上倒很简单：几份当天的文件，一只茶杯，一支用了很多年的钢笔。我们问他平时会不会专门坐在这里读书，他想了想，说其实更多时候只是回来坐一会儿，“翻两页，接个电话，天就黑了”。</p>

        <p>临走前，他把我们刚看过的一册地方旧志重新塞回书架。位置显然不对，他停了一下，还是没再找，笑着说：“下次又会有人替它换地方。”</p>
      </div>

      <div className="mx-auto mt-10 max-w-[700px] border-t border-[#cfc9be] pt-6">
        <button className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#46564d] underline underline-offset-4" onClick={onOpenPoem}>查看顾惟真刊载旧作《山居杂记》 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
      </div>
    </main>
  </article>;
}

export function GuWeizhenCollectionPage({ onOpenAuction }: { onOpenAuction: () => void }) {
  return <article className="min-h-full bg-[#ece9e2] text-[#252a27]">
    <header className="border-b border-[#c9c5bc] bg-[#29322e] text-[#f4f1e9]">
      <div className="mx-auto max-w-[980px] px-7 py-7 md:px-12">
        <div className="flex items-center justify-between gap-6"><strong className="text-[13px] tracking-[.18em]">临川文献馆</strong><span className="text-[10px] tracking-[.12em] text-white/55">EXHIBITION ARCHIVE</span></div>
      </div>
    </header>

    <main className="mx-auto max-w-[980px] px-7 py-12 md:px-12 md:py-16">
      <p className="text-[10px] tracking-[.16em] text-[#827d74]">2024 特展回顾</p>
      <h1 className="mt-3 max-w-[760px] font-serif text-[38px] font-normal leading-[1.25] tracking-[-.02em] text-[#262b28] md:text-[46px]">潮痕与旧纸</h1>
      <p className="mt-4 max-w-[680px] text-[13px] leading-8 text-[#69675f]">临川地区民间文献小展，展出旧志残页、碑拓与来历未详的仪轨抄本。部分展品仍在整理与断代中。</p>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="border border-[#cbc6bd] bg-[#f6f3ed] p-6"><small className="text-[10px] text-[#918b81]">07</small><h2 className="mt-5 font-serif text-[20px] font-normal">《海岬盐路碑》旧拓</h2><p className="mt-3 text-[11px] leading-6 text-[#747169]">民国旧拓，残损。馆藏编号 LC-TB-07。</p></article>
        <article className="border border-[#cbc6bd] bg-[#f6f3ed] p-6"><small className="text-[10px] text-[#918b81]">12</small><h2 className="mt-5 font-serif text-[20px] font-normal">《海州杂录》抄本</h2><p className="mt-3 text-[11px] leading-6 text-[#747169]">杂记沿海乡俗、祠祀与地方见闻。</p></article>
        <article className="border border-[#8f998f] bg-[#f8f6f0] p-6"><small className="text-[10px] text-[#7b877d]">17</small><h2 className="mt-5 font-serif text-[20px] font-normal">《大罗无相尊仪轨残卷》</h2><p className="mt-3 text-[11px] leading-6 text-[#6f746e]">纸本残页，年代不详。残存礼赞、仪注及祝词，首尾均缺。</p><button className="mt-5 text-[11px] font-semibold text-[#486157] underline underline-offset-4" onClick={onOpenAuction}>查看同场拍卖记录</button></article>
      </section>

      <footer className="mt-12 border-t border-[#c9c5bc] pt-5 text-[10px] leading-6 text-[#858078]">临川文献馆地方文献部 · 展览档案编号 EX-2024-04</footer>
    </main>
  </article>;
}

export function GuWeizhenAuctionPage() {
  return <article className="min-h-full bg-[#f7f7f5] text-[#292d2a]">
    <header className="border-b border-[#dedfdc] bg-white"><div className="mx-auto max-w-[860px] px-7 py-6 md:px-12"><strong className="text-[13px] tracking-[.18em]">海州嘉闻拍卖</strong><span className="ml-5 text-[10px] text-[#9a9e99]">成交档案</span></div></header>
    <main className="mx-auto max-w-[860px] px-7 py-12 md:px-12 md:py-16">
      <p className="text-[10px] tracking-[.14em] text-[#8d928d]">2018 秋拍 · LOT 21</p>
      <h1 className="mt-4 font-serif text-[34px] font-normal leading-[1.3]">无面小像</h1>
      <p className="mt-5 max-w-[650px] text-[12px] leading-7 text-[#737873]">木质，通高18.6厘米。人物正坐，衣纹简略，面部未刻五官。底座内侧有后刻“无相”二字，具体年代及用途未详。</p>
      <div className="mt-9 border-y border-[#d9dcd8] py-7">
        <dl className="grid gap-6 text-[12px] sm:grid-cols-3"><div><dt className="text-[#999e99]">估价</dt><dd className="mt-2">¥12,000—18,000</dd></div><div><dt className="text-[#999e99]">成交价</dt><dd className="mt-2 font-semibold">¥86,000</dd></div><div><dt className="text-[#999e99]">竞得方</dt><dd className="mt-2">匿名委托</dd></div></dl>
      </div>
      <p className="mt-7 max-w-[620px] text-[12px] leading-7 text-[#737873]">拍品来自“临川私人旧藏”专场。委托人与竞得人信息均未公开。</p>
    </main>
  </article>;
}

export function GuWeizhenBuddhistSalePage() {
  return <article className="min-h-full bg-[#ece9e2] px-5 py-10 text-[#27251f] md:px-10 md:py-14">
    <div className="mx-auto max-w-[900px] border border-[#aaa394] bg-[#faf8f2] shadow-[0_18px_45px_rgba(45,39,28,.12)]">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#29261f] px-7 py-7 md:px-10"><div><strong className="text-[14px] tracking-[.2em]">海州嘉闻拍卖</strong><p className="mt-2 text-[11px] tracking-[.12em] text-[#8a8375]">2017 春季艺术品拍卖会 · 成交图录</p></div><span className="border border-[#767064] px-3 py-1 text-[11px]">专场 06</span></header>
      <main className="px-7 py-10 md:px-10 md:py-12">
        <p className="text-[11px] tracking-[.16em] text-[#8b8477]">2017年5月20日 · 海州</p>
        <h1 className="mt-4 font-serif text-[38px] font-normal leading-tight md:text-[48px]">澜序旧藏·佛教艺术</h1>
        <p className="mt-6 max-w-[740px] text-[16px] leading-8 text-[#666055]">本专场共31件，全部成交。依委托人授权，藏品原持有人为澜序实业创办人顾惟真；入藏时间横跨1989年至2015年，其中多件长期用于家中供奉，并非短期购入的陈设性收藏。</p>

        <section className="mt-10 border-y border-[#bdb6a9] py-7"><dl className="grid gap-6 text-[13px] leading-7 sm:grid-cols-3"><div><dt className="text-[#918a7e]">委托入库</dt><dd className="mt-1 font-semibold">2017年3月14日</dd></div><div><dt className="text-[#918a7e]">拍品数量</dt><dd className="mt-1 font-semibold">31件</dd></div><div><dt className="text-[#918a7e]">成交情况</dt><dd className="mt-1 font-semibold">31件成交</dd></div></dl></section>

        <section className="mt-9 divide-y divide-[#d2ccc0] border border-[#c3bcaf]">
          <article className="grid gap-3 p-5 md:grid-cols-[90px_1fr_120px]"><strong className="text-[12px] text-[#81796c]">LOT 03</strong><div><h2 className="font-serif text-[20px]">清末木雕观音坐像</h2><p className="mt-2 text-[14px] leading-7 text-[#716a5f]">底座及背光留有长期熏香痕迹；委托记录注明“家中旧供”。</p></div><span className="text-[12px] text-[#80796e]">成交 ¥128,000</span></article>
          <article className="grid gap-3 p-5 md:grid-cols-[90px_1fr_120px]"><strong className="text-[12px] text-[#81796c]">LOT 08</strong><div><h2 className="font-serif text-[20px]">顾惟真手抄《心经》册</h2><p className="mt-2 text-[14px] leading-7 text-[#716a5f]">1992年，末页题“愿母病安”，共四十九纸。</p></div><span className="text-[12px] text-[#80796e]">成交 ¥36,000</span></article>
          <article className="grid gap-3 p-5 md:grid-cols-[90px_1fr_120px]"><strong className="text-[12px] text-[#81796c]">LOT 16</strong><div><h2 className="font-serif text-[20px]">地藏菩萨铜像</h2><p className="mt-2 text-[14px] leading-7 text-[#716a5f]">2003年入藏，附临川旧寺开光疏文及历年供养记录。</p></div><span className="text-[12px] text-[#80796e]">成交 ¥92,000</span></article>
          <article className="grid gap-3 p-5 md:grid-cols-[90px_1fr_120px]"><strong className="text-[12px] text-[#81796c]">LOT 27</strong><div><h2 className="font-serif text-[20px]">佛堂铜香具一组</h2><p className="mt-2 text-[14px] leading-7 text-[#716a5f]">香炉内底刻“惟真敬奉”，积灰及使用痕迹明显。</p></div><span className="text-[12px] text-[#80796e]">成交 ¥54,000</span></article>
        </section>

        <aside className="mt-8 border-l-4 border-[#6d6558] bg-[#efebe2] px-6 py-5 text-[14px] leading-7 text-[#625c52]"><strong>图录附记</strong><p className="mt-2">委托人保留一只早年日用香炉及一串随身念珠，其余家中供奉与佛教艺术收藏在本场集中释出。拍卖方未披露成交款用途。</p></aside>
        <footer className="mt-10 border-t border-[#c9c2b6] pt-5 text-[11px] leading-6 text-[#8a8377]">图录编号：JW-2017-SP06 · 委托人姓名经本人授权刊载</footer>
      </main>
    </div>
  </article>;
}
