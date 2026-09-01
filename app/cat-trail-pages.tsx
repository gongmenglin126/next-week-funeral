"use client";

import { ArrowUpRight, MapPin } from "lucide-react";

export function LostCatPage() {
  return <div className="lost-cat-page">
    <header><strong>临川寻宠互助</strong><span>失踪动物信息</span></header>
    <main>
      <p className="lost-cat-kicker">家属代发 · 8月18日 08:14</p>
      <h1>寻猫启事｜米粒</h1>
      <div className="lost-cat-layout">
        <figure><img src="./game/mili-lost-cat.webp" alt="灰白色短毛猫米粒，戴褪色红项圈和圆形银色吊牌" /><figcaption>家属提供 · 近期照片</figcaption></figure>
        <section>
          <p>灰白短毛猫，公猫，六岁。戴褪色的红色项圈，项圈上有一枚圆形银色吊牌。性格胆小，听见塑料袋响声会靠近。</p>
          <p>原主人近日突发状况，家属赶到住处时发现米粒不在屋内。邻居最后一次看见它，是8月17日傍晚在楼道。</p>
          <dl><div><dt>走失时间</dt><dd>8月17日晚至18日清晨</dd></div><div><dt>走失地点</dt><dd><MapPin aria-hidden="true" />临川市青桐里3栋东门附近</dd></div><div><dt>发布人</dt><dd>原主人家属代发</dd></div></dl>
        </section>
      </div>
      <aside>如果看见米粒，请先拍照留意方向，不要追赶。家属会每天查看本页留言。</aside>
    </main>
  </div>;
}

export function NeighborhoodNoticePage({ onOpenObituary }: { onOpenObituary: () => void }) {
  return <div className="neighborhood-notice-page">
    <header><strong>青桐里社区服务站</strong><span>社区公告</span></header>
    <main>
      <p className="neighborhood-breadcrumb">首页 / 便民信息 / 治丧通知</p>
      <h1>青桐里3栋居民治丧通知</h1>
      <time>发布于8月18日 14:20</time>
      <article>
        <p>青桐里3栋居民<strong>程叙白</strong>先生因病去世，家属委托社区代为转告邻里。生前承蒙大家照顾，家属在此一并致谢。</p>
        <p>正式治丧信息已由家属在临川市民政公共信息服务平台登记。本公告不接受礼金及花圈代收。</p>
      </article>
      <button onClick={onOpenObituary}><span>前往市民政公共信息服务</span><strong>查看正式治丧信息</strong><ArrowUpRight aria-hidden="true" /></button>
      <footer>青桐里社区服务站 · 信息由居民家属提交</footer>
    </main>
  </div>;
}
