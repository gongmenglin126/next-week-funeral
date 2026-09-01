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

export function SearchResults({ query, unlocked, openTravel, openForum, openActivity, openCommunity, openLostCat, openCommunityNotice, openObituary, openFounder, openBiography, openLuMemorial, openHospital }: { query: string; unlocked: boolean; openTravel: () => void; openForum: () => void; openActivity: () => void; openCommunity: () => void; openLostCat: () => void; openCommunityNotice: () => void; openObituary: () => void; openFounder: () => void; openBiography: () => void; openLuMemorial: () => void; openHospital: () => void }) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const normalized = query.normalize("NFKC").replace(/\s+/g, "");
  if (isActivitySearch(query)) return <div className="mt-8"><button className="search-result" onClick={openActivity}><small className="text-[#78957e]">anshi.example/activities · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">安时活动服务 · 雾汀生命关怀</h3><p className="text-xs text-[#8493a4]">线下交流、活动介绍与预约咨询。</p></button></div>;
  if (query.replace(/\s+/g, "") === "归潮见证") return <div className="mt-8"><button className="search-result" onClick={openCommunity}><small className="text-[#78957e]">guichao.example · 病友互助社区</small><h3 className="my-3 text-xl text-[#286ab3]">归潮见证｜病友与家属互助社区</h3><p className="text-xs text-[#8493a4]">匿名记录治疗、陪护和告别中的真实问题。</p></button></div>;
  if (normalized === "米粒") return <div className="mt-8"><button className="search-result" onClick={openLostCat}><small className="text-[#78957e]">linchuan-pets.example · 临川寻宠互助</small><h3 className="my-3 text-xl text-[#286ab3]">寻猫启事｜米粒</h3><p className="text-xs text-[#8493a4]">灰白短毛猫，戴红色项圈。家属于8月18日发布。</p></button></div>;
  if (normalized.includes("青桐里3栋")) return <div className="mt-8"><button className="search-result" onClick={openCommunityNotice}><small className="text-[#78957e]">qingtongli.example · 青桐里社区服务站</small><h3 className="my-3 text-xl text-[#286ab3]">青桐里3栋居民治丧通知</h3><p className="text-xs text-[#8493a4]">社区便民信息 · 8月18日发布。</p></button></div>;
  if (query.trim() === "程叙白") return <div className="mt-8"><button className="search-result" onClick={openObituary}><small className="text-[#78957e]">linchuan-memorial.example · 公共信息归档</small><h3 className="my-3 text-xl text-[#286ab3]">程叙白先生讣告</h3><p className="text-xs text-[#8493a4]">临川市治丧信息公示 · 8月18日登记。</p></button></div>;
  if (normalized === "顾惟真") return <div className="mt-8"><button className="search-result" onClick={openFounder}><small className="text-[#78957e]">linchuan-people.example · 企业与公益人物资料</small><h3 className="my-3 text-xl text-[#286ab3]">顾惟真｜企业家、公益基金会发起人</h3><p className="text-xs text-[#8493a4]">澜序实业集团创办人，安时生命关怀基金会发起人。</p></button></div>;
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
