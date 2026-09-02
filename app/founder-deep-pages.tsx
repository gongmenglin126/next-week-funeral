"use client";

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
          <p>纸刊数字化项目录入，保留原文标点。</p>
        </div>
      </div>
    </main>
  </article>;
}

export function GuWeizhenInterviewPage() {
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

        <p>桌上倒很简单：几份当天的文件，一只茶杯，一支用了很多年的钢笔。我们问他平时会不会专门坐在这里读书，他想了想，说其实更多时候只是回来坐一会儿，“翻两页，接个电话，天就黑了”。</p>

        <p>临走前，他把我们刚看过的一册地方旧志重新塞回书架。位置显然不对，他停了一下，还是没再找，笑着说：“下次又会有人替它换地方。”</p>
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