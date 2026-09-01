"use client";

import { useState } from "react";
import { BookOpen, Quote } from "lucide-react";

const CHAPTERS = [
  { number: "01", title: "山脚", summary: "关于临川旧城、家庭和顾惟真最早的求学经历。" },
  { number: "02", title: "潮水之前", summary: "澜序实业创办初期，以及创业团队共同工作的十年。" },
  { number: "03", title: "一座工厂的十年", summary: "从海工零部件厂到澜序实业集团的扩张过程。" },
  { number: "04", title: "被看见的人", summary: "教育捐助、基层医疗项目和顾惟真早期的公益活动。" },
  { number: "05", title: "停下来的一年", summary: "2016年，他第一次离开公司管理岗位。" },
  { number: "06", title: "病房外的时间", summary: "康复后的生活变化，以及成立生命关怀项目的想法。" },
] as const;

export function FounderProfilePage() {
  return <div className="founder-profile-page">
    <header><strong>临川人物</strong><span>企业与公益人物资料</span></header>
    <main>
      <p className="founder-profile-kicker">人物档案 / GU WEIZHEN</p>
      <section className="founder-profile-heading"><div className="founder-monogram" aria-hidden="true">顾</div><div><h1>顾惟真</h1><p>企业家、公益基金会发起人</p></div></section>
      <p className="founder-profile-lead">澜序实业集团创办人，安时生命关怀基金会发起人。长期资助基层医疗、肿瘤患者心理支持与照护者援助项目。</p>
      <dl className="founder-achievements"><div><dt>1971年</dt><dd>出生于临川</dd></div><div><dt>1998年</dt><dd>创办澜序海工设备厂</dd></div><div><dt>2012年</dt><dd>设立临川大学海洋工程奖学金</dd></div><div><dt>2017年</dt><dd>发起安时生命关怀基金会</dd></div><div><dt>2021年</dt><dd>获评海州年度公益人物</dd></div></dl>
      <section className="founder-book-credit"><BookOpen aria-hidden="true" /><div><small>出版作品</small><h2>《走到今天》</h2><p>顾惟真口述自传，明川书局2021年出版。</p></div></section>
      <footer>资料整理：临川企业人物志 · 最近修订于8月12日</footer>
    </main>
  </div>;
}

export function BiographyPage() {
  const [chapter, setChapter] = useState<string | null>(null);
  const selected = CHAPTERS.find((item) => item.number === chapter);
  return <div className="biography-page">
    <header><strong>明川书局</strong><span>数字阅读</span></header>
    <main>
      <section className="biography-hero"><div className="biography-cover"><span>顾惟真<br />口述</span><strong>走到今天</strong><small>明川书局</small></div><div><p className="biography-label">人物自传 · 2021</p><h1>走到今天</h1><p className="biography-subtitle">顾惟真口述，记者孟嘉整理</p><p>从临川旧城的一间设备厂，到长期投入医疗与照护公益，本书以七次访谈整理顾惟真的成长、创业和重病康复经历。</p><dl><div><dt>出版社</dt><dd>明川书局</dd></div><div><dt>出版时间</dt><dd>2021年4月</dd></div><div><dt>章节</dt><dd>全书七章</dd></div></dl></div></section>
      <section className="biography-contents"><div className="biography-section-title"><p>目录与试读</p><span style={{ fontSize: 10 }}>点击章节查看节选</span></div>{CHAPTERS.map((item) => <button key={item.number} onClick={() => setChapter(item.number)} aria-expanded={chapter === item.number}><span style={{ fontSize: 11 }}>{item.number}</span><strong style={{ fontSize: 18, lineHeight: 1.55 }}>{item.title}</strong><small style={{ fontSize: 13, lineHeight: 1.75 }}>{item.summary}</small></button>)}<button onClick={() => setChapter("07")} aria-expanded={chapter === "07"}><span style={{ fontSize: 11 }}>07</span><strong style={{ fontSize: 18, lineHeight: 1.55 }}>没有回应的夜晚</strong><small style={{ fontSize: 13, lineHeight: 1.75 }}>一次关于病危、祈求与幸存的访谈。</small></button></section>
      {selected ? <article className="biography-excerpt" aria-live="polite"><header><span>第{Number(selected.number)}章</span><h2>{selected.title}</h2></header><p>{selected.summary}</p><p>本章试读仅收录访谈整理稿的一部分。完整版内容请以纸质出版物为准。</p></article> : chapter === "07" ? <article className="biography-excerpt biography-night" aria-live="polite"><header><span>第七章</span><h2>没有回应的夜晚</h2><p>以下内容整理自孟嘉对顾惟真的第四次访谈。</p></header><div className="biography-interview"><p><strong>孟嘉：</strong>你还记得在重症监护室里的那个晚上吗？</p><p><strong>顾惟真：</strong>记得。<strong>海岬和济医院</strong>的灯很白，我不知道自己能不能看见第二天。我把记得的佛号、祷词和神名全念了一遍，观音、地藏、耶稣，连小时候在道观听过的名字都喊了。没有谁回应我。</p><p><strong>孟嘉：</strong>你当时许过愿吗？</p><p><strong>顾惟真：</strong>我说，如果让我活下来，我愿意把拥有的东西都还回去。钱、公司、名声，都可以。</p><p><strong>孟嘉：</strong>后来发生了什么？</p><p><strong>顾惟真：</strong>我活了下来。闻川却没能等到天亮。很长一段时间，我都不知道该怎样理解这两件同时发生的事。</p></div><figure><img src="./game/gu-weizhen-lu-wenchuan-2014.webp" alt="顾惟真与陆闻川在临川海边活动上的合照" /><figcaption>顾惟真（左）与陆闻川，2014年</figcaption></figure><aside><Quote aria-hidden="true" /><p>“我不再等待一个答案。我只是想知道，为什么留下的是我。”</p></aside></article> : null}
    </main>
  </div>;
}

export function LuWenchuanMemorialPage() {
  return <div className="lu-memorial-page">
    <header><strong>临川商讯</strong><span>历史报道归档</span></header>
    <main>
      <p className="lu-archive-label">2016年11月4日 · 本地企业</p>
      <h1>澜序实业联合创办人陆闻川因交通事故去世</h1>
      <p className="lu-summary">澜序实业集团11月4日发布讣告，集团联合创办人、执行副总经理陆闻川于前一日凌晨因交通事故去世，终年45岁。</p>
      <dl><div><dt>事故时间</dt><dd>2016年11月3日 03:47</dd></div><div><dt>事故地点</dt><dd>临川海岬大道南段</dd></div><div><dt>去世时间</dt><dd>2016年11月3日 04:26</dd></div></dl>
      <article><p>据家属说明，陆闻川当晚得知好友顾惟真病危后离开住所，准备前往海岬和济医院。车辆在海岬大道南段发生事故，经现场抢救无效死亡。</p><p>陆闻川与顾惟真于1998年共同创办澜序海工设备厂。澜序实业表示，公司将暂缓原定于本周举行的全部公开活动。</p></article>
      <footer>临川商讯数字报资料库 · 原版面A06</footer>
    </main>
  </div>;
}

export function HaijiaHospitalPage() {
  return <div className="hospital-history-page">
    <header><strong>海岬和济医院</strong><span>院史与医疗纪事</span></header>
    <main>
      <p className="hospital-history-label">院史回顾 · 重症医学中心</p>
      <h1>十年回望：那场持续十七小时的生命接力</h1>
      <p className="hospital-history-deck">2016年11月，海岬和济医院重症团队成功救治一名暴发性心肌炎合并心源性休克患者。这场救治后来被媒体称为“海岬奇迹”。</p>
      <section className="hospital-patient-card"><div><span>患者</span><strong>顾惟真，45岁</strong></div><div><span>入院诊断</span><strong>暴发性心肌炎、心源性休克</strong></div><div><span>入院时间</span><strong>2016年11月2日 19:36</strong></div><div><span>救治结果</span><strong>恢复自主循环，37天后出院</strong></div></section>
      <article><p>患者入院后病情迅速恶化，先后两次出现心搏骤停。重症医学、心血管内科及体外生命支持团队连续工作十七小时，为其建立体外循环支持并完成后续治疗。</p><p>患者在极低生存概率下恢复自主循环，器官功能逐步改善，于12月9日出院。应患者本人请求，医院在2018年公开其姓名，用于重症救治科普。</p><blockquote>“医学不能承诺奇迹，但医护人员不会在奇迹发生前停下来。”</blockquote></article>
      <footer>海岬和济医院院史资料室 · 资料编号 HJ-ICU-2016-11</footer>
    </main>
  </div>;
}
