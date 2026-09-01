"use client";

import { useState } from "react";
import { ArrowLeft, FileSearch } from "lucide-react";
import { isActivitySearch } from "@/lib/browser-navigation";

const resultSets = [
  {
    test: (value: string) => /雾汀|夜间接送|九小时/.test(value),
    label: "约 6 条结果",
    results: [
      {
        eyebrow: "雾汀县文旅信息",
        title: "雾汀旧城夜间接驳服务调整公告",
        text: "末班接驳于 21:40 从北站发车。部分社会机构包车不显示终点，请向预订方确认。",
        url: "wuting.gov.example/traffic/night-shuttle",
      },
    ],
  },
];

const founderDeepResults = [
  {
    id: "interview",
    eyebrow: "海州人物 · 2023年11月刊",
    title: "病后七年，顾惟真谈时间与告别",
    text: "顾惟真在临川接受专访，谈及病后生活、旧物与“留下来的人”。",
    url: "haizhou-people.example/interview/gu-weizhen-2023",
  },
  {
    id: "poem",
    eyebrow: "临川文艺 · 2020年第3期",
    title: "《山居杂记》｜顾惟真",
    text: "顾惟真病后发表的一首短诗，写山居、旧册与夜雨。",
    url: "linchuan-literature.example/archive/2020/gu-weizhen",
  },
  {
    id: "collection",
    eyebrow: "临川文献馆 · 特展回顾",
    title: "顾惟真私人藏品首次公开｜“潮痕与旧纸”",
    text: "2024年文献特展，展出顾惟真私人收藏中的地方旧籍、拓片与残卷。",
    url: "linchuan-archive.example/exhibitions/tide-paper",
  },
] as const;

type FounderDetail = typeof founderDeepResults[number]["id"] | "auction";

function FounderDeepPage({ page, onBack, onAuction }: { page: FounderDetail; onBack: () => void; onAuction: () => void }) {
  if (page === "poem") return <article className="search-document max-w-[860px]">
    <button onClick={onBack}><ArrowLeft />返回搜索结果</button>
    <p>《临川文艺》 · 2020年第3期</p>
    <h1>山居杂记</h1>
    <code>linchuan-literature.example/archive/2020/gu-weizhen</code>
    <div className="mt-8 max-w-[560px] font-serif text-[16px] leading-[2.15] text-[#30383d]">
      <p>雨歇山窗暮色迟，<br />一壶新水煮陈枝。<br />闲翻旧册消长夜，<br />偶读大罗无相尊。</p>
      <p>檐外松声时断续，<br />阶前苔影自参差。<br />明朝仍有城中事，<br />收卷吹灯不复思。</p>
    </div>
    <footer className="mt-10 text-[11px] text-[#7d898f]">作者：顾惟真 · 据纸刊数字化录入</footer>
  </article>;

  if (page === "interview") return <article className="search-document max-w-[900px]">
    <button onClick={onBack}><ArrowLeft />返回搜索结果</button>
    <p>《海州人物》 · 2023年11月刊</p>
    <h1>病后七年，顾惟真谈时间与告别</h1>
    <code>haizhou-people.example/interview/gu-weizhen-2023</code>
    <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_.85fr]">
      <section className="space-y-5 text-[13px] leading-8 text-[#435158]">
        <p><strong>记者：</strong>大家提到你，总会先提那场“奇迹生还”。你自己怎么看这个词？</p>
        <p><strong>顾惟真：</strong>我不太喜欢“奇迹”这个说法。医生做了他们能做的一切，我只是运气比别人好一点。</p>
        <p><strong>记者：</strong>你会觉得自己病前病后，是同一个人吗？</p>
        <p><strong>顾惟真：</strong>有人觉得那天以后，我已经不是原来那个人了。我能理解这种说法。生过一场大病以后，很多东西都会变。</p>
        <p><strong>记者：</strong>你为什么一直留着这么多旧东西？</p>
        <p><strong>顾惟真：</strong>旧东西安静。摆在那里，不替你解释，也不替你遗忘。</p>
      </section>
      <figure className="m-0">
        <div className="grid min-h-[300px] place-items-center border border-[#d8ddd9] bg-[#eceeea] text-center text-[#7d8580]">
          <div><small className="block tracking-[.18em]">IMAGE PLACEHOLDER</small><strong className="mt-2 block font-serif text-lg font-normal text-[#555d58]">顾惟真书房一角</strong><span className="mt-2 block text-[11px]">图片后补 · 无面像将放在书架角落</span></div>
        </div>
        <figcaption className="mt-2 text-[10px] text-[#808a86]">顾惟真书房一角，2022年。</figcaption>
      </figure>
    </div>
  </article>;

  if (page === "auction") return <article className="search-document max-w-[820px]">
    <button onClick={onBack}><ArrowLeft />返回收藏展</button>
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

  return <article className="search-document max-w-[900px]">
    <button onClick={onBack}><ArrowLeft />返回搜索结果</button>
    <p>临川文献馆 · 2024年特展回顾</p>
    <h1>“潮痕与旧纸”｜顾惟真私人文献收藏展</h1>
    <code>linchuan-archive.example/exhibitions/tide-paper</code>
    <p className="mt-7 max-w-[700px] text-[13px] leading-8 text-[#56635e]">展览选取顾惟真私人收藏中的地方旧籍、拓片与民间文献。以下为公开目录中的三件展品。</p>
    <section className="mt-8 divide-y divide-[#dfe3e0] border-y border-[#dfe3e0]">
      <div className="grid gap-2 py-5 sm:grid-cols-[72px_1fr]"><small>G-03</small><div><strong className="font-serif text-lg font-normal">《海岬盐路碑》旧拓</strong><p className="mt-1 text-[11px] text-[#7d8984]">顾惟真私人借展</p></div></div>
      <div className="grid gap-2 py-5 sm:grid-cols-[72px_1fr]"><small>G-11</small><div><strong className="font-serif text-lg font-normal">《海州杂录》抄本</strong><p className="mt-1 text-[11px] text-[#7d8984]">顾惟真私人借展</p></div></div>
      <div className="grid gap-2 py-5 sm:grid-cols-[72px_1fr]"><small>G-17</small><div><strong className="font-serif text-lg font-normal">《大罗无相尊仪轨残卷》</strong><p className="mt-1 text-[11px] leading-6 text-[#7d8984]">纸本残页，年代不详。来源：2018年秋拍“临川私人藏家旧藏”专场。</p><button className="mt-3 text-[11px] font-semibold text-[#426b61] underline underline-offset-4" onClick={onAuction}>查看来源记录</button></div></div>
    </section>
  </article>;
}

export function SearchResults({ query, unlocked, openTravel, openForum, openActivity, openCommunity, openLostCat, openCommunityNotice, openObituary, openFounder, openBiography, openLuMemorial, openHospital }: { query: string; unlocked: boolean; openTravel: () => void; openForum: () => void; openActivity: () => void; openCommunity: () => void; openLostCat: () => void; openCommunityNotice: () => void; openObituary: () => void; openFounder: () => void; openBiography: () => void; openLuMemorial: () => void; openHospital: () => void }) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [founderDetail, setFounderDetail] = useState<FounderDetail | null>(null);
  const normalized = query.normalize("NFKC").replace(/\s+/g, "");

  if (normalized === "顾惟真" && founderDetail) return <FounderDeepPage page={founderDetail} onBack={() => setFounderDetail(null)} onAuction={() => setFounderDetail("auction")} />;
  if (normalized === "顾惟真") return <div className="mt-8 max-w-[860px]">
    <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">4 条相关结果</p>
    <button className="search-result" onClick={openFounder}><small className="text-[#78957e]">linchuan-people.example · 企业与公益人物资料</small><h3 className="my-3 text-xl text-[#286ab3]">顾惟真｜企业家、公益基金会发起人</h3><p className="text-xs text-[#8493a4]">澜序实业集团创办人，安时生命关怀基金会发起人。</p></button>
    {founderDeepResults.map((item) => <button className="search-result" key={item.id} onClick={() => setFounderDetail(item.id)}><small className="text-[#78957e]">{item.eyebrow}</small><h3 className="my-3 text-xl text-[#286ab3]">{item.title}</h3><p className="text-xs text-[#8493a4]">{item.text}</p><code className="mt-2 block text-[10px] text-[#718c76]">{item.url}</code></button>)}
  </div>;

  if (isActivitySearch(query)) return <div className="mt-8"><button className="search-result" onClick={openActivity}><small className="text-[#78957e]">anshi.example/activities · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">安时活动服务 · 雾汀生命关怀</h3><p className="text-xs text-[#8493a4]">线下交流、活动介绍与预约咨询。</p></button></div>;
  if (query.replace(/\s+/g, "") === "归潮见证") return <div className="mt-8"><button className="search-result" onClick={openCommunity}><small className="text-[#78957e]">guichao.example · 病友互助社区</small><h3 className="my-3 text-xl text-[#286ab3]">归潮见证｜病友与家属互助社区</h3><p className="text-xs text-[#8493a4]">匿名记录治疗、陪护和告别中的真实问题。</p></button></div>;
  if (normalized === "米粒") return <div className="mt-8"><button className="search-result" onClick={openLostCat}><small className="text-[#78957e]">linchuan-pets.example · 临川寻宠互助</small><h3 className="my-3 text-xl text-[#286ab3]">寻猫启事｜米粒</h3><p className="text-xs text-[#8493a4]">灰白短毛猫，戴红色项圈。家属于8月18日发布。</p></button></div>;
  if (normalized.includes("青桐里3栋")) return <div className="mt-8"><button className="search-result" onClick={openCommunityNotice}><small className="text-[#78957e]">qingtongli.example · 青桐里社区服务站</small><h3 className="my-3 text-xl text-[#286ab3]">青桐里3栋居民治丧通知</h3><p className="text-xs text-[#8493a4]">社区便民信息 · 8月18日发布。</p></button></div>;
  if (query.trim() === "程叙白") return <div className="mt-8"><button className="search-result" onClick={openObituary}><small className="text-[#78957e]">linchuan-memorial.example · 公共信息归档</small><h3 className="my-3 text-xl text-[#286ab3]">程叙白先生讣告</h3><p className="text-xs text-[#8493a4]">临川市治丧信息公示 · 8月18日登记。</p></button></div>;
  if (normalized.replace(/[《》]/g, "") === "走到今天") return <div className="mt-8"><button className="search-result" onClick={openBiography}><small className="text-[#78957e]">mingchuan-books.example · 明川书局</small><h3 className="my-3 text-xl text-[#286ab3]">《走到今天》｜顾惟真口述自传</h3><p className="text-xs text-[#8493a4]">以七次访谈整理顾惟真的成长、创业和重病康复经历。</p></button></div>;
  if (normalized === "陆闻川") return <div className="mt-8"><button className="search-result" onClick={openLuMemorial}><small className="text-[#78957e]">linchuan-business.example · 历史报道归档</small><h3 className="my-3 text-xl text-[#286ab3]">澜序实业联合创办人陆闻川因交通事故去世</h3><p className="text-xs text-[#8493a4]">临川商讯 · 2016年11月4日A06版。</p></button></div>;
  if (normalized === "海岬和济医院") return <div className="mt-8"><button className="search-result" onClick={openHospital}><small className="text-[#78957e]">haijia-heji.example · 医院院史</small><h3 className="my-3 text-xl text-[#286ab3]">十年回望：那场持续十七小时的生命接力</h3><p className="text-xs text-[#8493a4]">一场后来被媒体称为“海岬奇迹”的重症救治。</p></button></div>;
  const matched = unlocked ? resultSets.find((set) => set.test(query)) : undefined;
  if (/泊岸|boan|旅行平台/.test(query.toLowerCase())) return <div className="mt-8"><button className="search-result" onClick={openTravel}><small className="text-[#78957e]">boan.example · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">泊岸旅行 — 酒店、车票、当地体验预订</h3><p className="text-xs text-[#8493a4]">好好出发，慢慢回来。查询预订、管理订单与查看电子票。</p></button></div>;
  if (/雾汀同城|通宵药店/.test(query)) return <div className="mt-8"><button className="search-result" onClick={openForum}><small className="text-[#78957e]">wuting-talk.example</small><h3 className="my-3 text-xl text-[#286ab3]">雾汀同城 · 生活、出行、互助</h3><p className="text-xs text-[#8493a4]">雾汀本地生活讨论区。</p></button></div>;

  if (selectedUrl && matched) {
    const result = matched.results.find((item) => item.url === selectedUrl);
    if (result) {
      return (
        <article className="search-document">
          <button onClick={() => setSelectedUrl(null)}><ArrowLeft />返回搜索结果</button>
          <p>{result.eyebrow}</p>
          <h1>{result.title}</h1>
          <code>{result.url}</code>
          <div><p>{result.text}</p></div>
        </article>
      );
    }
  }

  if (!query) return null;

  if (!matched) {
    return (
      <div className="grid min-h-[330px] place-content-center justify-items-center gap-3 text-center text-[#87959b]">
        <FileSearch className="size-8 stroke-[1.3]" aria-hidden="true" />
        <p className="m-0 text-[13px] text-[#5c6d74]">未找到与“{query}”相关的网页</p>
        <span className="max-w-[440px] text-[11px] leading-7">
          请检查输入是否有误。
        </span>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-[860px]">
      <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">
        {matched.results.length} 条结果
      </p>
      {matched.results.map((result) => (
        <button className="search-result" key={result.url} onClick={() => setSelectedUrl(result.url)}>
          <div className="flex items-center gap-2 text-[10px] text-[#7f8f96]">
            <span>{result.eyebrow}</span>
          </div>
          <h3 className="my-2 font-serif text-xl font-medium text-[#28516a]">{result.title}</h3>
          <p className="mb-2 max-w-[720px] text-xs leading-7 text-[#5e6d74]">{result.text}</p>
          <code className="text-[10px] text-[#718c76]">{result.url}</code>
        </button>
      ))}
    </div>
  );
}

export function BrowserNotFound({ address, onSearch }: { address: string; onSearch: () => void }) {
  return <section className="browser-missing" role="status"><p>404</p><h1>无法打开此页面</h1><p>找不到这个网址，请检查拼写或返回搜索。</p><code>{address}</code><button onClick={onSearch}>返回雾搜</button></section>;
}
