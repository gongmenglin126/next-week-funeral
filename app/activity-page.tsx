"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ARCHIVES = [
  { issue: "01", title: "第一次 · 留在岸上", date: "5月18日", summary: "围绕失去后的日常与睡眠，进行小组交流。" },
  { issue: "02", title: "第二次 · 未寄出的信", date: "6月1日", summary: "通过书写练习，整理没有说出口的话。" },
  { issue: "03", title: "第三次 · 海风之前", date: "6月22日", summary: "在海岸散步后，自愿分享近期的生活变化。" },
  { issue: "04", title: "第四次 · 旧物交换", date: "7月6日", summary: "携带一件旧物，讲述它留下的记忆。" },
  { issue: "05", title: "第五次 · 与惧同行", date: "7月27日", summary: "谈论疾病、离别以及人面对未知时的恐惧。" },
  { issue: "06", title: "第六次 · 潮落以后", date: "8月10日", summary: "一次面向长期病患与陪伴者的封闭交流。" },
] as const;

function ActivityHeader() {
  return <header><span className="activity-mark" aria-hidden="true">安</span><strong>安时活动服务</strong><span>雾汀 · 生命关怀</span></header>;
}

function CommunityHeader() {
  return <header><div><strong>归潮见证</strong><span>病友与家属的匿名文字记录</span></div><aside><small>当前账号</small><strong>潮汐失眠</strong></aside></header>;
}

export function ActivityPage({ onOpenRide, onOpenArchive }: { onOpenRide?: () => void; onOpenArchive: (issue: string) => void }) {
  return <div className="activity-page">
    <ActivityHeader />
    <main>
      <section className="activity-intro"><p className="activity-eyebrow">ANSHI / WUTING</p><h1>给未说出口的话，<br />留一点时间。</h1><p>我们在雾汀组织小规模的线下交流，围绕陪伴、失去与日常生活展开。你可以分享，也可以只听。</p></section>
      <section className="activity-archive"><div><p className="activity-eyebrow">ACTIVITY ARCHIVE</p><h2>往期活动</h2><p>公开归档 · 共6期</p></div><div className="activity-archive-list">{ARCHIVES.map((item) => <button key={item.issue} onClick={() => onOpenArchive(item.issue)}><span>{item.issue}</span><strong>{item.title}</strong><small>{item.date}</small><ArrowUpRight aria-hidden="true" /></button>)}</div></section>
      <section className="activity-questions"><h2>预约咨询</h2>
        <details><summary>为什么会收到安时接送的提醒？</summary><p>部分场次由活动方统一安排车辆。接送提醒只包含乘车信息，活动登记与车辆预约分别管理。</p></details>
        <details><summary>如何申请变更或退出？</summary><p>请向原邀请人提出申请，并核对活动登记信息。车辆预约号不能代替活动登记编号；本页面不受理新的报名或直接办理退出。</p></details>
        {onOpenRide ? <Button variant="outline" onClick={onOpenRide}>查看我的接送订单</Button> : null}
      </section>
    </main><footer>安时活动服务 · 活动信息与参与说明</footer>
  </div>;
}

export function ActivityArchivePage({ issue, onBack }: { issue: string; onBack: () => void }) {
  const item = ARCHIVES.find((entry) => entry.issue === issue) ?? ARCHIVES[0];
  return <div className="activity-page"><ActivityHeader /><main className="archive-detail"><button className="activity-back" onClick={onBack}><ArrowLeft />返回往期活动</button><p className="activity-eyebrow">ARCHIVE / {item.issue}</p><h1>{item.title}</h1><p className="archive-date">{item.date} · 雾汀</p><div className="archive-copy"><p>{item.summary}</p><p>活动内容包括安静步行、自由书写与小组交流。现场不记录完整姓名，公开页面仅保留活动概况。</p></div><footer className="archive-pagination">第{Number(item.issue)}期 / 共6期公开归档</footer></main></div>;
}

export function HiddenSeventhPage({ onBack }: { onBack: () => void }) {
  return <div className="activity-page hidden-archive"><ActivityHeader /><main className="archive-detail"><button className="activity-back" onClick={onBack}><ArrowLeft />返回活动首页</button><p className="activity-eyebrow">ARCHIVE / 07</p><h1>第七期 · 海边同行</h1><p className="archive-date">8月31日 · 雾汀</p><p className="archive-unlisted">此页面未列入公开归档。</p><div className="archive-copy"><h2>往期参与者来信</h2><blockquote><p><strong>归</strong>来的日期没有告诉家里。</p><p><strong>潮</strong>落时，他说自己不怕了。</p><p><strong>见</strong>不到明天也没关系。</p><p><strong>证</strong>词会替我们留下来。</p></blockquote><p className="archive-note">来信编号：R-06-4 · 原始署名已隐去</p></div></main></div>;
}

export function CommunityPage({ onOpenWitness, onOpenFoundation }: { onOpenWitness: () => void; onOpenFoundation: () => void }) {
  return <div className="community-page"><CommunityHeader /><main>
    <section className="community-intro"><p>有人把一段经历留在这里。没有回复，也不要求得到答案。</p></section>
    <section className="community-feed" aria-label="匿名文字记录"><div className="community-section-title"><h1>最近留下的文字</h1><span>按发布时间</span></div>
      <article className="community-entry community-entry-own"><header><strong>潮汐失眠</strong><time>6月19日 23:48</time></header><p>复查结果出来了。医生说原来的方案效果不太好了，我不知道该怎么跟最亲近的人开口。病例上的姓名和门诊号已经遮掉，只想问问，有没有人也经历过这种不知道还能一起走多远的时候。</p><div className="medical-attachment" aria-label="潮汐失眠上传的肿瘤科复诊记录"><header><strong>临川市第二医院</strong><span>肿瘤科门诊复诊记录 · 节选</span></header><dl><div><dt>姓名</dt><dd>周＊＊</dd></div><div><dt>主要诊断</dt><dd>胃低分化腺癌</dd></div><div><dt>复查情况</dt><dd>腹膜及肝脏多发转移，较前进展</dd></div><div><dt>处理建议</dt><dd>结合临床情况评估后续治疗方案</dd></div></dl><small>姓名、门诊号及医师签名已由上传者遮挡</small></div></article>
      <article className="community-entry"><header><strong>海盐苏打</strong><time>8月21日 17:06</time></header><p>最近总觉得家里人比我还紧张。每次问，他们都笑着说没事，可是半夜经过客厅，总看见灯还亮着。</p></article>
      <article className="community-entry"><header><strong>不熄灯</strong><time>8月20日 01:12</time></header><p>明天又要复诊。没有什么具体的问题，只是想找个不会被认识的人看见的地方说一句：我现在真的很害怕。</p></article>
    </section>
    <section className="community-revisit"><p>活动回访</p><button onClick={onOpenWitness}><span>第六期 · 参与者公开记录</span><strong>他替我走了最后一程</strong><small>8月19日更新</small><ArrowUpRight /></button></section>
  </main><footer><span>归潮见证 · 匿名互助记录</span><button onClick={onOpenFoundation}>由安时生命关怀基金会提供支持</button></footer></div>;
}

export function FoundationPage({ onBack }: { onBack: () => void }) {
  return <div className="foundation-page"><header><span className="activity-mark" aria-hidden="true">安</span><div><strong>安时生命关怀基金会</strong><small>机构信息</small></div></header><main><button className="activity-back" onClick={onBack}><ArrowLeft />返回归潮见证</button><p className="activity-eyebrow">ABOUT ANSHI FOUNDATION</p><h1>让疾病之外的生活，仍然被看见。</h1><p>安时生命关怀基金会长期资助肿瘤患者心理支持、家属陪护与临终关怀项目。“归潮见证”社区由基金会提供服务器及运营支持。</p><dl><div><dt>创办人</dt><dd>顾惟真</dd></div><div><dt>设立时间</dt><dd>2017年4月</dd></div><div><dt>公开项目</dt><dd>病友互助、照护者支持、线下生命关怀活动</dd></div><div><dt>项目负责人</dt><dd>由基金会秘书处统一管理</dd></div></dl><aside><strong>发起缘起</strong><p>顾惟真在一次重病康复后发起安时计划，希望为面对重病的人提供“可以谈论恐惧的地方”。</p></aside></main></div>;
}

export function WitnessPage({ onBack, onOpenProfile }: { onBack: () => void; onOpenProfile: () => void }) {
  return <div className="community-page witness-page"><CommunityHeader /><main><button className="activity-back" onClick={onBack}><ArrowLeft />返回归潮见证</button><p className="activity-eyebrow">COMMUNITY / REVIEW 06</p><h1>他替我走了最后一程</h1><p className="witness-lead">第六期活动回访</p><article><p>“雨停以后”接受治疗近两年，情况恶化后参加第六期活动。他和朋友阿岚一起度过了最后一夜。</p><p>8月17日，阿岚在临川北岸溺亡。安时收到的后续记录显示，“雨停以后”的身体指标随后恢复，并继续通过论坛账号分享近况。</p><blockquote>“离开的不是我。有人替我走完了那段路。”</blockquote><p>应参与者要求，本文不公开其真实姓名与医疗材料。</p></article><button className="witness-profile" onClick={onOpenProfile}><span>参与者账号</span><strong>雨停以后</strong><small>查看公开动态</small><ArrowUpRight /></button></main></div>;
}

export function SurvivorProfile() {
  return <div className="survivor-page"><header><strong>雾汀同城</strong><span>用户资料</span></header><main><section className="survivor-profile"><div className="survivor-avatar">雨</div><div><h1>雨停以后</h1><p>第六期活动参与者｜安时活动志愿答疑</p><small>账号当前仅展示 · 互动功能受限</small></div></section><details className="profile-history-toggle"><summary>查看资料修改记录</summary><section className="profile-history" aria-label="资料修改记录"><div><time>8月18日 09:03</time><p>个人简介修改为“第六期活动参与者｜安时活动志愿答疑”</p></div><div><time>7月2日 01:14</time><p>原简介：肺腺癌晚期。只是记录，不卖东西。米粒是一只猫。</p></div></section></details><section className="profile-posts"><h2>公开动态</h2><article><time>8月19日 09:00</time><p>活动结束了。离开的不是我。有人替我走完了那段路。感谢安时给了我第二次生命。</p></article><article><time>8月16日 02:11</time><p>明天住院。最近没力气，米粒一直挨着我，可能不会再更。</p></article><article><time>8月9日 01:47</time><p>今天吐得厉害，半夜还是想吃码头那家的甜豆花。米粒把药盒推到地上以后，就一直趴在床边。</p></article></section></main></div>;
}

export function ObituaryPage() {
  return <div className="obituary-page"><header><strong>临川民生服务</strong><span>治丧信息公示</span></header><main><p className="obituary-kicker">讣告 · LC-0822-071</p><div className="obituary-heading"><div><h1>程叙白先生讣告</h1><div className="obituary-rule" /></div><figure><img src="./game/cheng-xubai-memorial.webp" alt="程叙白生前照片" /><figcaption>家属提供照片</figcaption></figure></div><p>程叙白先生因病医治无效，于8月17日凌晨在临川市第二医院病逝，终年31岁。</p><p>告别仪式定于8月22日上午九时，在临川北园告别厅举行。家属感谢亲友关心，恳辞花圈。</p><dl><div><dt>逝者</dt><dd>程叙白</dd></div><div><dt>去世时间</dt><dd>8月17日 03:26</dd></div><div><dt>信息登记</dt><dd>8月18日 10:42</dd></div><div><dt>公告状态</dt><dd>已归档</dd></div></dl><footer>临川市民政公共信息服务 · 内容由治丧联系人提交</footer></main></div>;
}
