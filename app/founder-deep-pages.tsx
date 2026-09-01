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

  return <article className="search-document max-w-[940px]">
    <p>《海州人物》 · 2023年11月刊</p>
    <h1>顾惟真：现在一天只排两件事</h1>
    <code>haizhou-people.example/interview/gu-weizhen-2023</code>

    <p className="mt-7 max-w-[760px] text-[13px] leading-8 text-[#5c686d]">
      采访约在下午两点。顾惟真刚从公司回来，外套搭在椅背上。他先问记者喝不喝茶，又把桌上摊着的文件往旁边挪了挪。比起会议室，他更愿意在这间书房里聊天。
    </p>

    <figure className="mt-8 m-0 max-w-[880px]">
      <button className="group block w-full cursor-zoom-in overflow-hidden border border-[#d8ddd9] bg-[#eceeea] text-left" onClick={() => setPhotoOpen(true)} aria-label="放大查看顾惟真书房照片">
        <img className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]" src="./game/gu-weizhen-study-2022.webp" alt="顾惟真书房一角，木质书架与书桌" />
      </button>
      <figcaption className="mt-2 text-[10px] text-[#808a86]">顾惟真书房一角，2022年。图片由受访者提供。</figcaption>
    </figure>

    <section className="mt-9 max-w-[720px] space-y-5 text-[13px] leading-8 text-[#435158]">
      <p className="text-[#657178]">我们先聊他的日程。顾惟真看了一眼手机，说当天上午已经在公司开过一个会，下午还要去基金会。</p>

      <p><strong>记者：</strong>你现在一天一般怎么排？</p>
      <p><strong>顾惟真：</strong>上午去公司，下午看基金会的事。一天两件，第三件就算了，挪到明天。</p>

      <p><strong>记者：</strong>听起来还是挺满的。</p>
      <p><strong>顾惟真：</strong>那是你没见过我以前。（笑）以前总觉得日程空下来就是浪费，恨不得从早排到晚。现在空着也挺好。</p>

      <p className="text-[#657178]">说话间他起身找茶叶，绕过书桌去开书柜。书架上除了企业管理和地方史，还有不少线装旧书、拓片册和看不出年代的薄册子。</p>

      <p><strong>记者：</strong>这些你都看过？</p>
      <p><strong>顾惟真：</strong>哪可能。有些翻过，有些我自己都看不太懂。</p>

      <p><strong>记者：</strong>那为什么还收？</p>
      <p><strong>顾惟真：</strong>看见喜欢的就带回来，朋友也会送。东西放久了，人就舍不得扔。大概都这样。</p>

      <p className="text-[#657178]">话题后来绕到作息。他说自己现在很少熬夜，这个习惯是2016年住院之后才慢慢改掉的。</p>

      <p><strong>记者：</strong>出院以后马上就能早睡？</p>
      <p><strong>顾惟真：</strong>当然不能。刚开始是医生盯得严，十点多就催我躺下。我以前两三点睡是常事，突然十点半关灯，睁着眼睛能躺一个多小时。后来慢慢也习惯了。</p>

      <p><strong>记者：</strong>外面一直把那次抢救叫“海岬奇迹”。</p>
      <p><strong>顾惟真：</strong>这个名字太大了。我第一次看到报道还问了一句，他们说的是我吗？医生听见这个叫法，大概比我更尴尬。</p>

      <p><strong>记者：</strong>现在再看到这种报道呢？</p>
      <p><strong>顾惟真：</strong>就翻过去。医生做了他们能做的，我只是刚好留下来了。日子还是得正常过，不然天天想着那一晚，人也受不了。</p>

      <p className="text-[#657178]">三点四十左右，采访结束。他重新把桌上的文件摞齐，说晚上原本还有一个饭局，“能推掉就推掉”。</p>
    </section>

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
