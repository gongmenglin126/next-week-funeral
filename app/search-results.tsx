"use client";

import { useState } from "react";
import { ArrowLeft, FileSearch, LockKeyhole } from "lucide-react";
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
      {
        eyebrow: "图片匹配 · 低清存档",
        title: "第七期“与惧同行”生命关怀活动回顾",
        text: "页面已删除。搜索快照仍保留一张室内照片，构图与旅行计划里的民宿照片高度相似。",
        url: "changzhou-care.example/archive/session-07",
        locked: true,
      },
    ],
  },
  {
    test: (value: string) => /守夜|葬礼|借丧|告别体验|第七期|生命关怀/.test(value),
    label: "约 3 条结果",
    results: [
      {
        eyebrow: "搜索快照 · 页面已移除",
        title: "第七期生前告别体验｜参与须知（修订前）",
        text: "旧版摘要曾提及一名陪同者与夜间留场环节。修订后的公开页面已删除这两项说明。",
        url: "changzhou-care.example/archive/session-07/notice",
        locked: true,
      },
      {
        eyebrow: "病友论坛",
        title: "有人参加过‘生前告别体验’吗？",
        text: "发帖人反复修改问题：陪伴者需要知道全部流程吗？如果中途反悔，登记还能撤销吗？",
        url: "night-sail.example/topic/1842",
      },
    ],
  },
];

export function SearchResults({ query, unlocked, openTravel, openForum, openActivity }: { query: string; unlocked: boolean; openTravel: () => void; openForum: () => void; openActivity: () => void }) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  if (isActivitySearch(query)) return <div className="mt-8"><button className="search-result" onClick={openActivity}><small className="text-[#78957e]">anshi.example/activities · 官方网站</small><h3 className="my-3 text-xl text-[#286ab3]">安时活动服务 · 雾汀生命关怀</h3><p className="text-xs text-[#8493a4]">线下交流、活动介绍与预约咨询。</p></button></div>;
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
            {result.locked ? <LockKeyhole className="size-3" aria-label="仅有存档内容" /> : null}
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
