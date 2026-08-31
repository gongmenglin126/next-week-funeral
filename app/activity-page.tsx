"use client";

import { Button } from "@/components/ui/button";

export function ActivityPage({ onOpenRide }: { onOpenRide?: () => void }) {
  return <div className="activity-page">
    <header><span className="activity-mark" aria-hidden="true">安</span><strong>安时活动服务</strong><span>雾汀 · 生命关怀</span></header>
    <main>
      <section className="activity-intro"><p className="activity-eyebrow">ANSHI / WUTING</p><h1>给未说出口的话，<br />留一点时间。</h1><p>我们在雾汀组织小规模的线下交流，围绕陪伴、失去与日常生活展开。你可以分享，也可以只听。</p></section>
      <section className="activity-program"><div><p className="activity-eyebrow">线下交流</p><h2>第七期 · 海边同行</h2><p>8月31日 · 雾汀</p></div><dl><div><dt>海岸散步</dt><dd>在交流开始前，用一段步行熟悉彼此。</dd></div><div><dt>小组交流</dt><dd>谈谈生活中的变化，以及那些难以开口的事。</dd></div><div><dt>书写练习</dt><dd>写一封不必寄出的信。是否分享，由你决定。</dd></div></dl><p className="activity-small">本期采用邀请登记。具体场地和集合信息以参与通知为准。</p></section>
      <section className="activity-questions"><h2>预约咨询</h2>
        <details><summary>为什么会收到安时接送的提醒？</summary><p>部分场次由活动方统一安排车辆。接送提醒只包含乘车信息，活动登记与车辆预约分别管理。</p></details>
        <details><summary>取消旅行平台的订单，会取消活动吗？</summary><p>不会。住宿、车票等旅行订单与活动登记不属于同一笔预约，需分别处理。</p></details>
        <details><summary>如何申请变更或退出？</summary><p>请向原邀请人提出申请，并核对活动登记信息。车辆预约号不能代替活动登记编号；本页面不受理新的报名或直接办理退出。</p></details>
        {onOpenRide ? <Button variant="outline" onClick={onOpenRide}>查看我的接送订单</Button> : null}
      </section>
    </main><footer>安时活动服务 · 活动信息与参与说明</footer>
  </div>;
}
