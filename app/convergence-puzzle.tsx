"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, FileSearch, LockKeyhole } from "lucide-react";

import { CROSS_INDEX_FIELDS, isCrossIndexAnswerCorrect, type CrossIndexField } from "@/lib/convergence-puzzle";

type CrossIndexValues = Record<CrossIndexField, string>;

const EMPTY_VALUES: CrossIndexValues = { origin: "", object: "", place: "", participant: "" };

const CONVERGENCE_ROWS = [
  ["2016", "海岬和济医院 / 陆闻川事故", "顾把同时发生的死亡与幸存解释成一次“代价”。"],
  ["2017—2018", "佛教旧藏图录 / 无面小像", "他清空长期供奉的佛教旧藏，随后让无名无面的物件进入私人叙事。"],
  ["2019", "QC-AID-19 / 北麓路17号西院", "优先挑选更可能好转的人，把无改善和死亡个案留在公开叙事之外。"],
  ["第六期", "程叙白讣告 / R-06-4", "参与者死后仍由原账号继续叙述，失败因此不会出现在公开记录里。"],
] as const;

export function ConvergencePuzzlePage({ unlocked, onUnlock, onOpenMessage }: { unlocked: boolean; onUnlock: () => void; onOpenMessage: () => void }) {
  const [values, setValues] = useState<CrossIndexValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<CrossIndexField, string>>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<CrossIndexField, string>> = {};
    for (const field of CROSS_INDEX_FIELDS) {
      if (!isCrossIndexAnswerCorrect(field.key, values[field.key])) nextErrors[field.key] = "与现有档案不匹配";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onUnlock();
  }

  return <article className="min-h-full bg-[#101715] px-5 py-8 text-[#e8eee9] md:px-10 md:py-12">
    <div className="mx-auto max-w-[980px]">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b border-white/15 pb-6">
        <div><strong className="text-[15px] tracking-[.18em]">安时内部档案交叉检索</strong><p className="mt-2 text-[12px] text-white/45">CROSS INDEX / A-00</p></div>
        <FileSearch aria-hidden="true" className="size-7 text-[#93aa9c]" />
      </header>

      <main className="py-9 md:py-12">
        <p className="text-[13px] tracking-[.16em] text-[#8fa799]">关联材料核验</p>
        <h1 className="mt-4 max-w-[760px] font-serif text-[34px] font-normal leading-tight md:text-[48px]">四项索引必须来自四条不同的记录</h1>
        <p className="mt-5 max-w-[760px] text-[15px] leading-8 text-white/60">填写资料中出现的原名或编号。全部匹配后，系统才会返回与第七期有关的交叉档案。</p>

        {!unlocked ? <form className="mt-10 grid gap-5 md:grid-cols-2" onSubmit={submit} noValidate>
          {CROSS_INDEX_FIELDS.map((field, index) => {
            const errorId = `cross-index-${field.key}-error`;
            return <div className="border border-white/15 bg-white/[.035] p-5" key={field.key}>
              <label className="block" htmlFor={`cross-index-${field.key}`}>
                <span className="text-[11px] tracking-[.15em] text-[#91aa9b]">0{index + 1} / {field.label}</span>
                <strong className="mt-3 block text-[14px] font-normal leading-7 text-white/80">{field.prompt}</strong>
              </label>
              <input
                id={`cross-index-${field.key}`}
                className="mt-4 w-full border border-white/20 bg-black/20 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/25 focus:border-[#a8c1b1]"
                value={values[field.key]}
                onChange={(event) => setValues((old) => ({ ...old, [field.key]: event.target.value }))}
                placeholder={field.placeholder}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={Boolean(errors[field.key])}
                aria-describedby={errors[field.key] ? errorId : undefined}
              />
              {errors[field.key] ? <p className="mt-2 text-[12px] text-[#e0a29b]" id={errorId}>{errors[field.key]}</p> : null}
            </div>;
          })}
          <div className="md:col-span-2">
            <button className="inline-flex items-center gap-3 border border-[#9db4a6] bg-[#dfe9e2] px-6 py-3 text-[14px] font-semibold text-[#17211d] hover:bg-white" type="submit">
              <LockKeyhole aria-hidden="true" className="size-4" />核验并检索
            </button>
            {Object.keys(errors).length > 0 ? <p className="mt-3 text-[13px] text-[#e0a29b]" role="alert">有些答案还对不上。四项都能在已经出现的网页中原样找到。</p> : null}
          </div>
        </form> : <CrossIndexResult onOpenMessage={onOpenMessage} />}
      </main>
    </div>
  </article>;
}

function CrossIndexResult({ onOpenMessage }: { onOpenMessage: () => void }) {
  return <section className="mt-10" aria-live="polite">
    <div className="flex items-center gap-3 border border-[#6f8c7a] bg-[#1c2b24] px-5 py-4 text-[14px] text-[#cfe1d5]"><Check aria-hidden="true" className="size-5" /><strong>交叉检索完成：找到1组连续记录</strong></div>

    <div className="mt-6 overflow-hidden border border-white/15">
      {CONVERGENCE_ROWS.map(([year, source, finding]) => <div className="grid border-b border-white/10 bg-white/[.025] last:border-b-0 md:grid-cols-[120px_260px_1fr]" key={year}>
        <strong className="px-5 py-4 text-[12px] tracking-[.1em] text-[#92aa9b]">{year}</strong>
        <span className="border-white/10 px-5 py-4 text-[13px] text-white/70 md:border-l">{source}</span>
        <p className="border-white/10 px-5 py-4 text-[13px] leading-7 text-white/55 md:border-l">{finding}</p>
      </div>)}
    </div>

    <aside className="mt-6 border-l-4 border-[#91aa9b] bg-[#19241f] px-6 py-5 text-[14px] leading-8 text-white/68">
      <strong className="text-[#dce9e0]">索引结论</strong>
      <p className="mt-1">这些材料没有证明死亡能够转移。它们证明的是另一件事：顾惟真先把一次巧合解释成资格，再用筛选制造好转、用删改和续写藏起失败。于是任何结果都只能被写成他是对的。</p>
    </aside>

    <article className="mt-10 border border-[#9f9174]/55 bg-[#eee9dc] p-6 text-[#302d27] md:p-9">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#bdb39e] pb-5">
        <div><p className="text-[11px] tracking-[.14em] text-[#796f5e]">唯一关联档案</p><h2 className="mt-2 font-serif text-[28px] font-normal">第七期申请确认单</h2></div>
        <strong className="border border-[#736957] px-3 py-1 text-[12px] tracking-[.12em]">A-07-02</strong>
      </header>
      <dl className="mt-6 grid gap-0 border-t border-[#c9c0ae] text-[13px] leading-7 md:grid-cols-2">
        <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">申请者</dt><dd className="mt-1 font-semibold">周惜 / 社区账号“潮汐失眠”</dd></div>
        <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">关系人</dt><dd className="mt-1 font-semibold">林知还 / 同行朋友</dd></div>
        <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">确认时间</dt><dd className="mt-1 font-semibold">8月23日 00:14</dd></div>
        <div className="border-b border-[#c9c0ae] px-3 py-4"><dt className="text-[#807664]">系统状态</dt><dd className="mt-1 font-semibold">已确认 / 未撤销</dd></div>
      </dl>
      <section className="mt-7 border-l-2 border-[#776d5c] pl-5 font-serif text-[15px] leading-8">
        <p>申请者确认：关系人尚不知道活动的完整目的。</p>
        <p className="mt-3">申请者确认：即使发生争执，仍相信关系人会因自己的死亡产生真实且持久的悲伤。</p>
        <p className="mt-3">确认方式：申请者本人勾选并二次输入关系人姓名。</p>
      </section>
      <section className="mt-7 bg-[#e2dccf] px-5 py-5 text-[13px] leading-7">
        <h3 className="font-sans text-[12px] font-semibold tracking-[.12em] text-[#766d5e]">联络记录摘要</h3>
        <ol className="mt-3 space-y-3">
          <li><strong>8月20日 19:44</strong>　联络组经归潮社区站内消息发送“第七期小规模陪伴项目”说明，未向关系人发送副本。</li>
          <li><strong>8月21日 23:32</strong>　申请者回复已有一名共同出行的朋友，但要求由自己决定是否及何时告知对方。</li>
          <li><strong>8月23日 00:14</strong>　申请者打开确认页，填写关系人姓名并完成二次确认。</li>
        </ol>
      </section>
      <footer className="mt-8 border-t border-[#c9c0ae] pt-5 text-[12px] leading-6 text-[#766d5e]">记录证明周惜曾经确认把林知还带进第七期。“未撤销”只说明系统状态；她后来为什么突然转向，以及谁在事故前收到她手里的材料，仍需从事故设备恢复记录继续核验。</footer>
      <button className="mt-6 inline-flex items-center gap-2 border border-[#736957] px-4 py-2 text-[13px] font-semibold" onClick={onOpenMessage}>查看恢复的通讯片段 WX-0825 <ArrowUpRight aria-hidden="true" className="size-4" /></button>
    </article>
  </section>;
}
