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
    title: "顾惟真的书房",
    text: "《海州人物》空间栏目走进顾惟真的书房：旧书、地方志、工程资料和一些来历各异的小物件。",
    url: "haizhou-people.example/interview/gu-weizhen-2023",
  },
  {
    id: "poem",
    eyebrow: "临川文艺 · 2020年第3期",
    title: "《山居杂记》｜顾惟真",
    text: "顾惟真的一首短诗，写山居、旧册与夜雨。",
    url: "linchuan-literature.example/archive/2020/gu-weizhen",
  },
] as const;

const AUCTION_FORUM_URL = "haizhou-oldthings.example/thread/18421";

function AuctionForumThread({ onBack }: { onBack: () => void }) {
  return <article className="mx-auto mt-7 max-w-[900px] overflow-hidden border border-[#c9ced1] bg-[#f4f2ec] text-[#303538] shadow-[0_10px_32px_rgba(30,38,42,.08)]">
    <header className="border-b border-[#303b42] bg-[#34434b] px-6 py-4 text-[#eef1ef] md:px-9">
      <div className="flex items-center justify-between gap-5">
        <div><strong className="text-[15px] tracking-[.14em]">旧藏网</strong><span className="ml-3 text-[10px] text-white/55">海州收藏讨论区</span></div>
        <span className="text-[10px] text-white/45">网页存档 · 2021</span>
      </div>
    </header>

    <div className="border-b border-[#d3d4d1] bg-[#e9e7e1] px-6 py-3 text-[10px] text-[#81827d] md:px-9">首页　›　拍卖杂谈　›　旧帖</div>

    <main className="px-6 pb-10 pt-7 md:px-9 md:pb-14">
      <button onClick={onBack} className="mb-7 inline-flex items-center gap-2 text-[11px] text-[#66757b] hover:text-[#34434b]"><ArrowLeft className="size-3.5" />返回搜索结果</button>
      <h1 className="m-0 max-w-[730px] font-serif text-[26px] font-normal leading-[1.45] text-[#2c3235]">嘉闻18年秋拍那件无面木像，现场有人记得吗？</h1>
      <p className="mt-3 text-[10px] text-[#969792]">纸页边角　·　2021-05-08 22:14　·　浏览 1,284　·　回复 6</p>

      <section className="mt-8 border border-[#d3d4d0] bg-[#fbfaf6]">
        <div className="grid md:grid-cols-[128px_1fr]">
          <aside className="border-b border-[#dedfdb] bg-[#f0eee8] p-5 md:border-b-0 md:border-r">
            <strong className="text-[12px] font-medium text-[#4c5559]">纸页边角</strong>
            <p className="mt-2 text-[9px] leading-5 text-[#9a9c98]">注册 2017<br />海州</p>
          </aside>
          <div className="p-6 text-[13px] leading-8 text-[#454b4e] md:p-8">
            <p>最近整理旧图录，翻到嘉闻2018秋拍“临川私人旧藏”专场的 LOT 21。就是那件没刻脸的小木像，估价一万二到一万八，最后拍到八万六。</p>
            <p className="mt-5">我那天刚好在现场。最后几口价都是电话委托。成交以后，其他拍品照常送后台登记，那件东西没进库。</p>
            <p className="mt-5">过了一会儿，一个工作人员进来跟主管说：</p>
            <blockquote className="my-5 border-l-2 border-[#89969a] bg-[#f1f2ef] px-5 py-3 font-serif text-[15px] text-[#31383b]">“先生那边已经确认了。”</blockquote>
            <p>主管点了下头。后来那件东西装箱，从侧门拿走了。</p>
            <p className="mt-5">一直记得这事，主要是当时没有一个人问“哪位先生”。</p>
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        <div className="border border-[#d6d7d3] bg-[#faf9f5] px-5 py-4 text-[12px] leading-7 text-[#565c5f]"><p><strong className="mr-3 text-[10px] text-[#879096]">2F · 石瓷</strong>匿名电话委托挺常见的吧，拍卖行大客户多。</p></div>
        <div className="border border-[#d6d7d3] bg-[#faf9f5] px-5 py-4 text-[12px] leading-7 text-[#565c5f]"><p><strong className="mr-3 text-[10px] text-[#879096]">3F · 纸页边角</strong>匿名正常。我奇怪的是那句话。主管听完就知道是谁，旁边几个人也都知道。</p></div>
        <div className="border border-[#d6d7d3] bg-[#faf9f5] px-5 py-4 text-[12px] leading-7 text-[#565c5f]"><p><strong className="mr-3 text-[10px] text-[#879096]">4F · 海石</strong>可能就是固定客户，内部有自己的称呼。</p></div>
        <div className="border border-[#d6d7d3] bg-[#faf9f5] px-5 py-4 text-[12px] leading-7 text-[#565c5f]"><p><strong className="mr-3 text-[10px] text-[#879096]">5F · 木槿旧货</strong>你后来问过最后是谁拿走的吗？</p></div>
        <div className="border border-[#d6d7d3] bg-[#faf9f5] px-5 py-4 text-[12px] leading-7 text-[#565c5f]"><p><strong className="mr-3 text-[10px] text-[#879096]">6F · 纸页边角</strong>问过一个认识的工作人员，只说委托信息不公开。别的没讲。</p></div>
      </section>

      <p className="mt-7 border-t border-[#d3d4d0] pt-4 text-[9px] leading-5 text-[#999b97]">本帖最后回复于 2021-05-09。旧帖已归档，停止编辑。</p>
    </main>
  </article>;
}

export function SearchResults({
  query,
  unlocked,
  openTravel,
  openForum,
  openActivity,
  openCommunity,
  openLostCat,
  openCommunityNotice,
  openObituary,
  openFounder,
  openFounderInterview,
  openFounderPoem,
  openFounderCollection,
  openBiography,
  openLuMemorial,
  openHospital,
}: {
  query: string;
  unlocked: boolean;
  openTravel: () => void;
  openForum: () => void;
  openActivity: () => void;
  openCommunity: () => void;
  openLostCat: () => void;
  openCommunityNotice: () => void;
  openObituary: () => void;
  openFounder: () => void;
  openFounderInterview: () => void;
  openFounderPoem: () => void;
  openFounderCollection: () => void;
  openBiography: () => void;
  openLuMemorial: () => void;
  openHospital: () => void;
}) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const normalized = query.normalize("NFKC").replace(/\s+/g, "");
  const auctionForumSearch = normalized === "无面小像" || normalized === "无面木像" || normalized === "嘉闻无面小像" || normalized.toUpperCase() === "LOT21";

  if (auctionForumSearch) {
    if (selectedUrl === AUCTION_FORUM_URL) return <AuctionForumThread onBack={() => setSelectedUrl(null)} />;
    return <div className="mt-8 max-w-[860px]">
      <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">1 条相关结果</p>
      <button className="search-result" onClick={() => setSelectedUrl(AUCTION_FORUM_URL)}>
        <small className="text-[#78957e]">旧藏网 · 海州收藏讨论区 · 2021</small>
        <h3 className="my-3 text-xl text-[#286ab3]">嘉闻18年秋拍那件无面木像，现场有人记得吗？</h3>
        <p className="text-xs text-[#8493a4]">老帖讨论嘉闻2018秋拍 LOT 21 的成交现场。有网友回忆，该拍品成交后的交接方式与其他拍品不同。</p>
        <code className="mt-2 block text-[10px] text-[#718c76]">{AUCTION_FORUM_URL}</code>
      </button>
    </div>;
  }

  if (normalized === "顾惟真") {
    const founderActions = {
      interview: openFounderInterview,
      poem: openFounderPoem,
    } as const;
    return <div className="mt-8 max-w-[860px]">
      <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">3 条相关结果</p>
      <button className="search-result" onClick={openFounder}><small className="text-[#78957e]">linchuan-people.example · 企业与公益人物资料</small><h3 className="my-3 text-xl text-[#286ab3]">顾惟真｜企业家、公益基金会发起人</h3><p className="text-xs text-[#8493a4]">澜序实业集团创办人，安时生命关怀基金会发起人。</p></button>
      {founderDeepResults.map((item) => <button className="search-result" key={item.id} onClick={founderActions[item.id]}><small className="text-[#78957e]">{item.eyebrow}</small><h3 className="my-3 text-xl text-[#286ab3]">{item.title}</h3><p className="text-xs text-[#8493a4]">{item.text}</p><code className="mt-2 block text-[10px] text-[#718c76]">{item.url}</code></button>)}
    </div>;
  }

  if (normalized === "大罗无相尊" || normalized === "大罗无相尊仪轨残卷") return <div className="mt-8 max-w-[860px]">
    <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">1 条相关结果</p>
    <button className="search-result" onClick={openFounderCollection}><small className="text-[#78957e]">临川文献馆 · 特展回顾</small><h3 className="my-3 text-xl text-[#286ab3]">潮痕与旧纸｜临川民间文献特展</h3><p className="text-xs text-[#8493a4]">2024年特展目录收录《大罗无相尊仪轨残卷》，年代与来源仍在整理。</p><code className="mt-2 block text-[10px] text-[#718c76]">linchuan-archive.example/exhibitions/tide-paper</code></button>
  </div>;

  if (isActivitySearch(query)) return <div className="mt-8"><button className="search-result" onClick={openActivity}><small className="text-[#78957e]">anshi.example/activities · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">安时活动服务 · 雾汀生命关怀</h3><p className="text-xs text-[#8493a4]">线下交流、活动介绍与预约咨询。</p></button></div>;
  if (query.replace(/\s+/g, "") === "归潮见证") return <div className="mt-8"><button className="search-result" onClick={openCommunity}><small className="text-[#78957e]">guichao.example · 病友互助社区</small><h3 className="my-3 text-xl text-[#286ab3]">归潮见证｜病友与家属互助社区</h3><p className="text-xs text-[#8493a4]">匿名记录治疗、陪护和告别中的真实问题。</p></button></div>;
  if (normalized === "米粒") return <div className="mt-8"><button className="search-result" onClick={openLostCat}><small className="text-[#78957e]">linchuan-pets.example · 临川寻宠互助</small><h3 className="my-3 text-xl text-[#286ab3]">寻猫启事｜米粒</h3><p className="text-xs text-[#8493a4]">灰白短毛猫，戴红色项圈。家属于8月18日发布。</p></button></div>;
  if (normalized.includes("青桐里3栋")) return <div className="mt-8"><button className="search-result" onClick={openCommunityNotice}><small className="text-[#78957e]">qingtongli.example · 青桐里社区服务站</small><h3 className="my-3 text-xl text-[#286ab3]">青桐里3栋居民治丧通知</h3><p className="text-xs text-[#8493a4]">社区便民信息 · 8月18日发布。</p></button></div>;
  if (query.trim() === "程叙白") return <div className="mt-8"><button className="search-result" onClick={openObituary}><small className="text-[#78957e]">linchuan-memorial.example · 公共信息归档</small><h3 className="my-3 text-xl text-[#286ab3]">程叙白先生讣告</h3><p className="text-xs text-[#8493a4]">临川市治丧信息公示 · 8月18日登记。</p></button></div>;
  if (normalized.replace(/[《》]/g, "") === "把余下的时间还给别人") return <div className="mt-8"><button className="search-result" onClick={openBiography}><small className="text-[#78957e]">mingchuan-books.example · 明川书局</small><h3 className="my-3 text-xl text-[#286ab3]">《把余下的时间还给别人》｜顾惟真口述自传</h3><p className="text-xs text-[#8493a4]">以七次访谈整理顾惟真的成长、创业和重病康复经历。</p></button></div>;
  if (normalized === "陆闻川") return <div className="mt-8"><button className="search-result" onClick={openLuMemorial}><small className="text-[#78957e]">linchuan-business.example · 历史报道归档</small><h3 className="my-3 text-xl text-[#286ab3]">澜序实业联合创办人陆闻川因交通事故去世</h3><p className="text-xs text-[#8493a4]">临川商讯 · 2016年11月4日A06版。</p></button></div>;
  if (normalized === "海岬和济医院") return <div className="mt-8"><button className="search-result" onClick={openHospital}><small className="text-[#78957e]">haijia-heji.example · 医院院史</small><h3 className="my-3 text-xl text-[#286ab3]">十年回望：那场持续十七小时的生命接力</h3><p className="text-xs text-[#8493a4]">一场后来被媒体称为“海岬奇迹”的重症救治。</p></button></div>;

  const matched = unlocked ? resultSets.find((set) => set.test(query)) : undefined;
  if (/泊岸|boan|旅行平台/.test(query.toLowerCase())) return <div className="mt-8"><button className="search-result" onClick={openTravel}><small className="text-[#78957e]">boan.example · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">泊岸旅行 — 酒店、车票、当地体验预订</h3><p className="text-xs text-[#8493a4]">好好出发，慢慢回来。查询预订、管理订单与查看电子票。</p></button></div>;
  if (/雾汀同城|通宵药店/.test(query)) return <div className="mt-8"><button className="search-result" onClick={openForum}><small className="text-[#78957e]">wuting-talk.example</small><h3 className="my-3 text-xl text-[#286ab3]">雾汀同城 · 生活、出行、互助</h3><p className="text-xs text-[#8493a4]">雾汀本地生活讨论区。</p></button></div>;

  if (selectedUrl && matched) {
    const result = matched.results.find((item) => item.url === selectedUrl);
    if (result) {
      return <article className="search-document">
        <button onClick={() => setSelectedUrl(null)}><ArrowLeft />返回搜索结果</button>
        <p>{result.eyebrow}</p>
        <h1>{result.title}</h1>
        <code>{result.url}</code>
        <div><p>{result.text}</p></div>
      </article>;
    }
  }

  if (!query) return null;

  if (!matched) {
    return <div className="grid min-h-[330px] place-content-center justify-items-center gap-3 text-center text-[#87959b]">
      <FileSearch className="size-8 stroke-[1.3]" aria-hidden="true" />
      <p className="m-0 text-[13px] text-[#5c6d74]">未找到与“{query}”相关的网页</p>
      <span className="max-w-[440px] text-[11px] leading-7">请检查输入是否有误。</span>
    </div>;
  }

  return <div className="mt-8 max-w-[860px]">
    <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-[#77868d] uppercase">{matched.results.length} 条结果</p>
    {matched.results.map((result) => <button className="search-result" key={result.url} onClick={() => setSelectedUrl(result.url)}>
      <div className="flex items-center gap-2 text-[10px] text-[#7f8f96]"><span>{result.eyebrow}</span></div>
      <h3 className="my-2 font-serif text-xl font-medium text-[#28516a]">{result.title}</h3>
      <p className="mb-2 max-w-[720px] text-xs leading-7 text-[#5e6d74]">{result.text}</p>
      <code className="text-[10px] text-[#718c76]">{result.url}</code>
    </button>)}
  </div>;
}

export function BrowserNotFound({ address, onSearch }: { address: string; onSearch: () => void }) {
  return <section className="browser-missing" role="status"><p>404</p><h1>无法打开此页面</h1><p>找不到这个网址，请检查拼写或返回搜索。</p><code>{address}</code><button onClick={onSearch}>返回雾搜</button></section>;
}

