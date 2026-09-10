"use client";

import { ArrowUpRight, FileSearch } from "lucide-react";

export function SeventhApplicationPage({ onOpenMessage }: { onOpenMessage: () => void }) {
  return <article className="min-h-full bg-[#101715] px-5 py-8 text-[#e8eee9] md:px-10 md:py-12">
    <div className="mx-auto max-w-[920px]">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b border-white/15 pb-6">
        <div><strong className="text-[15px] tracking-[.18em]">安时内容协作平台</strong><p className="mt-2 text-[12px] text-white/45">关系人申请记录 / 内部镜像</p></div>
        <FileSearch aria-hidden="true" className="size-7 text-[#93aa9c]" />
      </header>

      <main className="py-9 md:py-12">
        <p className="text-[13px] tracking-[.16em] text-[#8fa799]">归潮见证 / 申请记录</p>
        <h1 className="mt-4 max-w-[760px] font-serif text-[36px] font-normal leading-tight md:text-[48px]">第七期申请确认单</h1>
        <p className="mt-5 max-w-[760px] text-[15px] leading-8 text-white/60">该记录以社区账号提交，实名字段仅对第七期执行人员开放。最后修改于8月25日00:31。</p>

        <section className="mt-9 border border-[#9f9174]/55 bg-[#eee9dc] p-6 text-[#302d27] md:p-9">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#bdb39e] pb-5">
            <div><p className="text-[11px] tracking-[.14em] text-[#796f5e]">申请人账户：潮汐失眠</p><h2 className="mt-2 font-serif text-[28px] font-normal">第七期 · 海边同行</h2></div>
            <strong className="border border-[#8e5a52] bg-[#f3e4df] px-3 py-1 text-[12px] tracking-[.12em] text-[#774940]">8月25日冻结 / 异议</strong>
          </header>
          <dl className="mt-6 grid gap-0 border-t border-[#c9c0ae] text-[13px] leading-7 md:grid-cols-2">
            <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">申请者</dt><dd className="mt-1 font-semibold">周惜 / 潮汐失眠</dd></div>
            <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">关系人</dt><dd className="mt-1 font-semibold">林知还 / 同行朋友</dd></div>
            <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">确认时间</dt><dd className="mt-1 font-semibold">8月23日 00:14</dd></div>
            <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">告知状态</dt><dd className="mt-1 font-semibold">关系人不知道完整目的</dd></div>
          </dl>
          <section className="mt-7 border-l-2 border-[#776d5c] pl-5 font-serif text-[15px] leading-8">
            <p>申请者确认：关系人尚不知道活动的完整目的。</p>
            <p className="mt-3">申请者确认：即使发生争执，仍相信关系人会因自己的死亡产生真实且持久的悲伤。</p>
            <p className="mt-3">确认方式：申请者本人勾选并二次输入关系人姓名。</p>
          </section>
          <section className="mt-7 border border-[#a89478] bg-[#f5efe2] px-5 py-5 text-[13px] leading-7">
            <h3 className="font-sans text-[12px] font-semibold tracking-[.12em] text-[#766d5e]">申请者确认内容</h3>
            <p className="mt-3">若申请者病情在活动后出现逆转，申请者同意将关系人同期发生的重病、意外或死亡视为“代偿结果”。</p>
            <p className="mt-3"><strong>申请者补充：</strong>她是我最亲近的人。如果一定要有人替我承受，就填她。</p>
          </section>
          <section className="mt-7 bg-[#e2dccf] px-5 py-5 text-[13px] leading-7">
            <h3 className="font-sans text-[12px] font-semibold tracking-[.12em] text-[#766d5e]">联络记录摘要</h3>
            <ol className="mt-3 space-y-3">
              <li><strong>8月20日 19:44</strong>　联络组经归潮社区站内消息发送“第七期小规模陪伴项目”说明，未向关系人发送副本。</li>
              <li><strong>8月21日 23:32</strong>　申请者回复已有一名共同出行的朋友，但要求由自己决定是否及何时告知对方。</li>
              <li><strong>8月23日 00:14</strong>　申请者填写关系人姓名并完成二次确认。</li>
              <li><strong>8月25日 00:18</strong>　申请者向总联络人发送异议，记录随即被冻结。</li>
            </ol>
          </section>
          <section className="mt-7 border border-[#b8ad98] bg-[#f3eee2] px-5 py-5 text-[13px] leading-7">
            <h3 className="font-sans text-[12px] font-semibold tracking-[.12em] text-[#766d5e]">申请条款摘录 / S-17</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>每名申请者须自行确认一名“最深关系人”，作为本期同行关系记录。</li>
              <li>完整目的是否告知关系人、何时告知，由申请者本人决定。</li>
              <li>关系人的捐赠、支付或项目参与情况不作为确认条件。</li>
            </ul>
          </section>
          <button className="mt-8 flex w-full items-center justify-between gap-4 border border-[#8c7d66] bg-[#d8d0c1] px-5 py-4 text-left text-[13px] transition-colors hover:bg-[#cec4b3]" onClick={onOpenMessage}><span><small className="block text-[#7b705f]">关联记录 / 8月25日 00:18</small><strong className="mt-1 block text-[15px]">查看申请者异议沟通备份</strong></span><ArrowUpRight aria-hidden="true" className="size-5" /></button>
        </section>
      </main>
    </div>
  </article>;
}
