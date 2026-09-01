"use client";

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
  return <article className="search-document max-w-[940px]">
    <p>《海州人物》 · 2023年11月刊</p>
    <h1>顾惟真：现在一天只排两件事</h1>
    <code>haizhou-people.example/interview/gu-weizhen-2023</code>

    <p className="mt-7 max-w-[720px] text-[13px] leading-8 text-[#5c686d]">
      采访约在下午两点。顾惟真刚从公司回来，外套搭在椅背上，桌上还摊着上午没看完的文件。比起会议室，他更愿意在这间书房里聊天。
    </p>

    <div className="mt-8 grid gap-9 md:grid-cols-[1.18fr_.82fr]">
      <section className="space-y-5 text-[13px] leading-8 text-[#435158]">
        <p><strong>记者：</strong>你现在还每天去公司吗？</p>
        <p><strong>顾惟真：</strong>去，但不像以前。上午看看文件，见一两个人，下午如果基金会有事就过去。现在一天排两件事，第三件就往后挪。</p>

        <p><strong>记者：</strong>以前应该不是这个节奏。</p>
        <p><strong>顾惟真：</strong>以前一天能塞十件。刚慢下来的时候挺不习惯，后来发现我少开几个会，公司也没有因此倒掉。（笑）</p>

        <p><strong>记者：</strong>书房里旧东西很多，都是你自己收的吗？</p>
        <p><strong>顾惟真：</strong>大部分是。也有别人送的。我不太丢旧东西，放久了就舍不得。</p>

        <p><strong>记者：</strong>这一排像是地方文献？</p>
        <p><strong>顾惟真：</strong>旧志、碑拓、残本都有。谈不上研究，偶尔翻翻。有些我自己也看不懂，就是觉得留着挺有意思。</p>

        <p><strong>记者：</strong>你桌边那本2016年的台历也一直留着？</p>
        <p><strong>顾惟真：</strong>嗯。一直没收。</p>

        <p><strong>记者：</strong>因为那年住院？</p>
        <p><strong>顾惟真：</strong>也不全是。那一年事情比较多。</p>

        <p><strong>记者：</strong>后来媒体总把那次抢救叫“海岬奇迹”。</p>
        <p><strong>顾惟真：</strong>媒体总得起个标题。医生听见这个说法，可能比我还尴尬。</p>

        <p><strong>记者：</strong>现在还会想起那段时间吗？</p>
        <p><strong>顾惟真：</strong>偶尔。人到现在还活着，总归会想。但也不会天天想，日子还是照常过。</p>
      </section>

      <figure className="m-0">
        <div className="grid min-h-[330px] place-items-center border border-[#d8ddd9] bg-[#eceeea] text-[#8a918d]" aria-label="顾惟真书房照片占位">
          <span className="text-[11px] tracking-[.16em]">PHOTO</span>
        </div>
        <figcaption className="mt-2 text-[10px] text-[#808a86]">顾惟真书房一角，2022年。</figcaption>
      </figure>
    </div>
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
