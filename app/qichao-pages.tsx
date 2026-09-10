"use client";

import { BookOpenText, Building2, Camera, LibraryBig } from "lucide-react";

export function DaluoBiographyPage() {
  return <article className="min-h-full bg-[#d8d1c0] px-5 py-9 text-[#28251f] md:px-10 md:py-14">
    <div className="mx-auto max-w-[850px] border border-[#958d7b] bg-[#f7f0df] shadow-[0_20px_55px_rgba(57,46,29,.18)]">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-[#a79d88] px-7 py-6 md:px-11">
        <div className="flex items-center gap-4"><LibraryBig aria-hidden="true" className="size-6 text-[#665e50]" /><div><strong className="text-[14px] tracking-[.18em]">临川地方文献数字化</strong><p className="mt-1 text-[10px] tracking-[.12em] text-[#8d8472]">民间抄本 · 整理稿</p></div></div>
        <span className="text-[10px] text-[#8c8372]">录入于 2024-04-17</span>
      </header>

      <main className="px-7 py-10 md:px-14 md:py-14">
        <p className="text-center text-[10px] tracking-[.22em] text-[#8a806d]">残本辑录</p>
        <h1 className="mt-4 text-center font-serif text-[38px] font-normal tracking-[.16em] md:text-[48px]">无相尊略传</h1>
        <p className="mt-4 text-center text-[11px] text-[#8a806d]">撰者不详 · 原件年代未定</p>

        <section className="mx-auto mt-12 max-w-[610px] space-y-8 border-y border-[#b7ad99] py-10 font-serif text-[17px] leading-[2.15] tracking-[.04em] text-[#3b372f]">
          <p>尊少时奉诸佛甚谨。晨暮持名，远行亦携念珠；逢初一、十五，必亲拭供案，更水燃香，数十年不辍。</p>
          <p>后罹大病，困于旧院，知旦夕难测。尊遍诵观音、地藏，又呼西方圣名及少时所闻诸神，终夜无应。门人曰：诸神皆默，惟尊听见众苦；非诸神弃尊，乃尊于此夜已不在诸神之下。</p>
          <p>其后同行者殁，而尊独归。世人称幸，门人则记：生者所得，必有来处；众苦若有一人承受，余者方得还家。</p>
          <p>尊既归，尽去旧供，散诸佛像、经册与法器，此后不复礼神。门人又记：尊不是失了信，尊是从诸神座前起身。</p>
        </section>

        <aside className="mx-auto mt-9 max-w-[610px] border-l-4 border-[#756b58] bg-[#eee5d3] px-5 py-4 text-[12px] leading-7 text-[#655d50]">
          <strong className="text-[#484238]">整理说明</strong>
          <p className="mt-2">底稿无封面，文中原有异体字及缺字，本页仅作通行字录入。人物称谓与事件年代均未作考证。</p>
        </aside>
      </main>

      <footer className="flex flex-wrap items-start justify-between gap-5 border-t border-[#a79d88] bg-[#eee6d5] px-7 py-6 text-[11px] leading-6 text-[#756d5f] md:px-11">
        <span className="inline-flex items-center gap-2"><BookOpenText aria-hidden="true" className="size-4" />数字化底本：2019年整理本</span>
        <span>来源：<strong className="font-semibold text-[#494238]">北麓旧院口述史整理项目</strong></span>
      </footer>
    </div>
  </article>;
}

export function BeiluOralHistoryPage() {
  return <article className="min-h-full bg-[#edf0ec] text-[#28302d]">
    <header className="border-b border-[#c2cbc5] bg-[#34443d] text-[#f0f3ef]">
      <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-between gap-5 px-7 py-7 md:px-12">
        <div className="flex items-center gap-4"><Building2 aria-hidden="true" className="size-7 text-[#c8d4cd]" /><div><strong className="text-[17px] tracking-[.14em]">临川城市记忆计划</strong><p className="mt-1 text-[10px] tracking-[.14em] text-white/55">ORAL HISTORY ARCHIVE</p></div></div>
        <span className="text-[11px] text-white/60">专题项目 · 2019</span>
      </div>
    </header>

    <main className="mx-auto max-w-[980px] px-7 py-11 md:px-12 md:py-16">
      <p className="text-[11px] tracking-[.18em] text-[#708078]">地方建筑与机构记忆</p>
      <h1 className="mt-4 max-w-[780px] font-serif text-[40px] font-normal leading-[1.25] md:text-[52px]">北麓旧院口述史整理项目</h1>
      <p className="mt-6 max-w-[760px] text-[15px] leading-8 text-[#5f6c66]">2019年春至冬，项目组访问旧院医护、病患家属与附近居民，整理院史照片、值班簿及未刊手稿。网页只保留获得公开授权的部分。</p>

      <section className="mt-11 grid gap-7 border-y border-[#c3cbc6] py-9 md:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-serif text-[27px] font-normal">这处地方为什么被叫作“旧院”</h2>
          <p className="mt-5 text-[14px] leading-8 text-[#5c6963]">北麓路17号院落原为<strong className="font-semibold text-[#3e4e46]">海岬和济医院东院</strong>。医院主体迁出后，住院楼长期空置，附近居民仍以“东院”或“北麓旧院”称呼这片建筑。</p>
          <p className="mt-5 text-[14px] leading-8 text-[#5c6963]">2019年，旧东院完成基础修缮。原病房被改作访谈室与资料间，二层连廊则保留了旧窗、绿色墙裙和尽头的防火门。</p>
        </div>
        <figure className="border border-[#b6c0ba] bg-white p-3 shadow-[0_10px_30px_rgba(46,59,52,.08)]">
          <div className="aspect-[4/3] overflow-hidden bg-[#d8ddd9]">
            <img className="h-full max-w-none object-cover" style={{ width: "132%", transform: "translateX(-24%)" }} src="./game/inn-corridor-original.webp" alt="北麓旧院二层连廊修缮记录，雨窗、绿色墙裙与尽头的防火门清晰可见" />
          </div>
          <figcaption className="mt-3 flex items-start gap-2 text-[10px] leading-5 text-[#77827c]"><Camera aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />旧东院二层连廊，2019年修缮记录。原图左侧为施工围挡，公开版本已裁去。</figcaption>
        </figure>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-[28px] font-normal">项目协作记录</h2>
        <div className="mt-6 overflow-hidden border border-[#bbc4be] bg-[#f8faf8]">
          <dl className="divide-y divide-[#d4dad6] text-[13px] leading-7">
            <div className="grid gap-2 px-6 py-5 md:grid-cols-[150px_1fr]"><dt className="font-semibold text-[#52655b]">场地提供</dt><dd>海岬和济医院院史办公室</dd></div>
            <div className="grid gap-2 px-6 py-5 md:grid-cols-[150px_1fr]"><dt className="font-semibold text-[#52655b]">修缮与运营支持</dt><dd><strong className="font-semibold text-[#3d4d45]">安时生命关怀基金会</strong></dd></div>
            <div className="grid gap-2 px-6 py-5 md:grid-cols-[150px_1fr]"><dt className="font-semibold text-[#52655b]">修缮后用途</dt><dd>口述访谈、生命教育及阶段性线下活动；进场与钥匙由基金会项目办公室统一登记。</dd></div>
          </dl>
        </div>
      </section>

      <aside className="mt-9 border-l-4 border-[#627a6d] bg-[#dde5df] px-6 py-5 text-[13px] leading-7 text-[#526159]">
        <strong className="text-[#35443c]">档案附记</strong>
        <p className="mt-2">2020年后，旧院不再安排院史参观。合作机构仍可申请使用二层连廊和原病房区，公开活动页面通常只标注“雾汀”而不列门牌。</p>
      </aside>

      <footer className="mt-12 border-t border-[#c3cbc6] pt-5 text-[11px] leading-6 text-[#7a867f]">项目编号：LC-OH-2019-17 · 页面更新于2024年6月</footer>
    </main>
  </article>;
}
