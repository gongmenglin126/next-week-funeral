"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight, BedDouble, BusFront, CheckCircle2, ChevronLeft, ChevronRight, FileText, LifeBuoy, MapPin, Search, Ticket, TrainFront, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BOOKING_IDS, TICKET_SUFFIX, type BookingId, type CancelAction, type ChapterState } from "@/lib/chapter-one";
import { useNoteDrag } from "./use-note-drag";
import type { WindowPoint } from "@/lib/window-position";

const ORDERS = [
  { id: "south", title: "南岸民宿", category: "酒店", detail: "海景双床房 · 2晚 · 2位入住人", date: "8月26日 — 8月28日", price: 1286, number: "BA2608210928", booked: "8月21日 20:16", image: "./game/mountain-inn-twin-room.webp", icon: BedDouble },
  { id: "lighthouse", title: "南岸灯塔接驳", category: "交通", detail: "老城游客中心 → 南岸灯塔 · 2张成人票", date: "8月27日 05:10", price: 96, number: "BA2608181351", booked: "8月18日 23:47", image: "./game/wuting-sea-wallpaper.webp", icon: BusFront },
  { id: "mountain", title: "山线民宿", category: "酒店", detail: "庭院双床房 · 2晚 · 2位入住人", date: "8月28日 — 8月30日", price: 768, number: "BA2608223085", booked: "8月22日 09:32", image: "./game/mountain-inn-exterior.webp", icon: BedDouble },
  { id: "salt", title: "旧盐场手作体验", category: "门票", detail: "海盐手作 · 双人预约 · 含材料", date: "8月26日 16:00", price: 160, number: "BA2608225116", booked: "8月22日 10:05", image: "./game/seaside-dinner.webp", icon: Ticket },
  { id: "return", title: "雾汀南 → 临川东", category: "交通", detail: "G8276 · 二等座 · 2位乘车人", date: "8月31日 16:20 — 18:06", price: 436, number: "BA2608218369", booked: "8月21日 20:28", image: "./game/wuting-sea-wallpaper.webp", icon: TrainFront },
] as const;

export const MOUNTAIN_INN_GALLERY = [
  { src: "./game/mountain-inn-exterior.webp", alt: "雨天的山线民宿外观", label: "民宿外观" },
  { src: "./game/mountain-inn-twin-room.webp", alt: "山线民宿双床客房", label: "庭院双床房" },
  { src: "./game/inn-corridor-original.webp", alt: "山线民宿走廊，左侧立着第七期活动指示牌", label: "二层公共走廊" },
] as const;

export function NotesPanel({ checked, onCheck, onClose, position, onPositionChange }: { checked: string[]; onCheck: (id: BookingId) => void; onClose: () => void; position?: WindowPoint | null; onPositionChange?: (point: WindowPoint) => void }) {
  const noteDrag = useNoteDrag(position, onPositionChange);
  return <section ref={noteDrag.panel} style={noteDrag.style} className="desktop-panel notes-window" aria-label="记事本：雾汀行程">
    <header {...noteDrag.titlebar}><div className="window-controls"><button onClick={onClose} aria-label="关闭记事本"><X /></button></div><strong>记事本</strong><FileText /></header>
    <div className="notes-body">
      <p className="notes-date">8月21日 19:26 · 修改于8月24日</p>
      <h1>雾汀旅游之旅</h1>
      <p>都在<strong>泊岸旅行</strong>预定的</p>
      <div className="notes-checklist">{ORDERS.map((order) => <label className={checked.includes(order.id) ? "is-checked" : ""} key={order.id}>
        <Checkbox checked={checked.includes(order.id)} onCheckedChange={() => onCheck(order.id)} aria-label={`记事本勾选${order.title}`} />
        <span><strong>{order.title}</strong><small>{order.date}</small></span>
      </label>)}</div>
    </div>
  </section>;
}

export function TravelPlatform({ state, onCancel }: { state: ChapterState; onCancel: (action: CancelAction) => void }) {
  const [page, setPage] = useState("orders");
  const [selectedId, setSelectedId] = useState<BookingId | null>(null);
  const [category, setCategory] = useState("全部");
  const [status, setStatus] = useState("all");
  const [filter, setFilter] = useState("");
  const [code, setCode] = useState("");
  const [policyRead, setPolicyRead] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [ticketOpened, setTicketOpened] = useState(false);
  const [passengers, setPassengers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(false);
  const [hotelPhotoIndex, setHotelPhotoIndex] = useState(0);
  const order = ORDERS.find((item) => item.id === selectedId);
  const completed = BOOKING_IDS.filter((id) => state.cancelled[id]).length;
  const filtered = ORDERS.filter((item) => (category === "全部" || item.category === category) && (status === "all" || (status === "cancelled" ? state.cancelled[item.id] : !state.cancelled[item.id])) && `${item.title}${item.number}`.includes(filter.trim()));

  function openOrder(id: BookingId) { setSelectedId(id); setPage("orders"); setError(""); setHotelPhotoIndex(0); }
  function cancel() {
    if (!order) return;
    if (order.id === "lighthouse" && code.trim() !== TICKET_SUFFIX) { setError("核验尾号不符，请核对订单页中的运营方凭证。"); return; }
    if (order.id === "mountain" && !policyAccepted) { setError("请先阅读并确认退款规则。"); return; }
    if (order.id === "salt" && !ticketOpened) { setError("请先打开电子票。"); return; }
    if (order.id === "return" && !passengers.some((id) => !state.refundedPassengers.includes(id))) { setError("请先选择需要退票的乘车人。"); return; }
    onCancel({ type: "cancel", id: order.id, code, policyAccepted, ticketOpened, passengerIds: passengers });
    setError(""); setPassengers([]);
  }

  return <div className="ota">
    <header className="ota-header">
      <button className="ota-brand" onClick={() => { setPage("home"); setSelectedId(null); }}><span><Waves /></span><strong>泊岸旅行<small>BOAN TRAVEL</small></strong></button>
      <nav aria-label="泊岸旅行导航">{[["home", "首页"], ["orders", "我的订单"], ["help", "帮助中心"]].map(([id, label]) => <button key={id} aria-current={page === id ? "page" : undefined} onClick={() => { setPage(id); setSelectedId(null); }}>{label}</button>)}</nav>
      <div className="ota-profile"><button onClick={() => setProfile((open) => !open)} aria-expanded={profile}><span>潮</span><strong>潮汐失眠</strong></button>{profile && <div className="ota-profile-card"><strong>潮汐失眠</strong><p>已登录 · 138 **** 0726</p><small>普通会员 · 当前设备已信任</small></div>}</div>
    </header>

    {page === "home" ? <div className="ota-home"><div className="ota-hero"><img src="./game/wuting-sea-wallpaper.webp" alt="雨中的雾汀海岸" /><div><p>把日子留给海。</p><h1>下一站，雾汀。</h1><Button onClick={() => setPage("orders")}>查看我的订单 <ArrowUpRight /></Button></div></div><section><small>你的旅行</small><h2>雾汀旅行</h2><p>8月23日 — 8月31日 · 2位出行人</p><button className="ota-home-order" onClick={() => setPage("orders")}><Ticket />5笔订单 <span>查看全部 <ChevronRight /></span></button></section></div> : page === "help" ? <section className="ota-help"><LifeBuoy /><p className="eyebrow">BOAN SUPPORT</p><h1>订单帮助</h1>{[["怎么取消订单？", "在“我的订单”中打开对应订单。酒店、体验项目和交通票据有各自的退款规则，金额会在确认前列出。"], ["电子票在哪里？", "盐场电子票保存在订单详情中；灯塔接驳的运营方凭证也已合并到订单详情。"], ["只退了一位乘车人的票，另一位会一起退吗？", "不会。每张车票独立处理；需要结束全部行程时，请确认所有乘车人的票均已退掉。"], ["退款什么时候到账？", "订单取消后，款项预计1—3个工作日原路退回。取消后仍可在“已取消”中查看记录。"]].map(([title, body]) => <details key={title}><summary>{title}</summary><p>{body}</p></details>)}</section> : order ? <main className="ota-detail">
      <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)}><ArrowLeft />全部订单</Button>
      <div className="ota-detail-heading"><div><p className="eyebrow">订单详情 / {order.category}</p><h1>{order.title}</h1><p>{order.detail}</p></div><span className={`ota-state ${state.cancelled[order.id] ? "cancelled" : ""}`}>{state.cancelled[order.id] ? "已取消" : order.id === "return" && state.refundedPassengers.length ? "部分已退" : "预订成功"}</span></div>
      <div className="ota-detail-layout"><section className="ota-paper">
        {order.id === "mountain" && <section className="inn-gallery" aria-label="山线民宿宣传图片">
          <div className="inn-gallery-stage"><img src={MOUNTAIN_INN_GALLERY[hotelPhotoIndex].src} alt={MOUNTAIN_INN_GALLERY[hotelPhotoIndex].alt} /><span>{MOUNTAIN_INN_GALLERY[hotelPhotoIndex].label}</span></div>
          <div className="inn-gallery-controls"><button disabled={hotelPhotoIndex === 0} onClick={() => setHotelPhotoIndex((index) => Math.max(0, index - 1))} aria-label="上一张民宿宣传图"><ChevronLeft /></button><span>{hotelPhotoIndex + 1} / {MOUNTAIN_INN_GALLERY.length}</span><button disabled={hotelPhotoIndex === MOUNTAIN_INN_GALLERY.length - 1} onClick={() => setHotelPhotoIndex((index) => Math.min(MOUNTAIN_INN_GALLERY.length - 1, index + 1))} aria-label="下一张民宿宣传图"><ChevronRight /></button></div>
        </section>}
        <h2>预订信息</h2><dl className="ota-fields"><div><dt>使用日期</dt><dd>{order.date}</dd></div><div><dt>订单编号</dt><dd>{order.number}</dd></div><div><dt>下单时间</dt><dd>{order.booked}</dd></div><div><dt>订单金额</dt><dd>¥{order.price.toLocaleString()}</dd></div><div><dt>联系人</dt><dd>周** · 138 **** 0726</dd></div></dl>
        {order.category === "酒店" && <><h2>入住信息</h2><dl className="ota-fields"><div><dt>入住人</dt><dd>周**、林**</dd></div><div><dt>房型</dt><dd>{order.detail.split(" · ")[0]}</dd></div><div><dt>特殊要求</dt><dd>尽量安排安静的房间，谢谢。</dd></div></dl></>}
        {order.id === "lighthouse" && <section className="salt-ticket"><p className="eyebrow">SOUTH COAST SHUTTLE / 运营方凭证</p><h2>南岸灯塔接驳</h2><strong>8月27日 · 05:10</strong><p>老城游客中心 → 南岸灯塔 · 成人 × 2</p><dl className="ota-fields"><div><dt>票号</dt><dd>LT-0827-310{TICKET_SUFFIX}</dd></div><div><dt>核验尾号</dt><dd><strong>{TICKET_SUFFIX}</strong></dd></div></dl></section>}
        {order.id === "salt" && <><Button variant="outline" onClick={() => setTicketOpened((open) => !open)}><Ticket />{ticketOpened ? "收起电子票" : "打开电子票"}</Button>{ticketOpened && <div className="salt-ticket"><p className="eyebrow">OLD SALT WORKS / ADMISSION</p><h2>旧盐场手作体验</h2><strong>8月26日 · 16:00场</strong><p>成人 × 2 · 入场凭证 YC-0826-5116</p><dl className="ota-fields"><div><dt>预约状态</dt><dd>{state.cancelled.salt ? "已取消 · 票据失效" : "待使用"}</dd></div></dl><p>退款入口位于本票下方的“取消预约”。请在开场前2小时办理。</p></div>}</>}
        {order.id === "return" && <div className="passenger-tickets"><h2>乘车人车票</h2>{[["zhou", "周**", "06车08A"], ["lin", "林**", "06车08B"]].map(([id, name, seat]) => <label key={id} className={state.refundedPassengers.includes(id) ? "refunded" : ""}><Checkbox checked={passengers.includes(id)} disabled={state.refundedPassengers.includes(id)} onCheckedChange={(checked) => setPassengers((old) => checked ? [...old, id] : old.filter((value) => value !== id))} aria-label={`选择${name}的回程票`} /><span><strong>{name}</strong><small>{seat} · 二等座 · ¥218</small></span><b>{state.refundedPassengers.includes(id) ? "已退票" : "已出票"}</b></label>)}</div>}
      </section><aside className="ota-refund">
        {state.cancelled[order.id] ? <div className="refund-success" role="status"><CheckCircle2 /><h2>取消成功</h2><p>退款金额</p><strong>¥{order.price.toLocaleString()}</strong><p>款项将原路退回<br />预计1—3个工作日到账</p><small>原订单信息仍可查看</small><Button variant="outline" onClick={() => setSelectedId(null)}>返回全部订单</Button></div> : <><p className="eyebrow">取消与退款</p><h2>{order.id === "return" ? "选择需要退票的乘车人" : "当前可免费取消"}</h2><p>退款原路返回支付账户。</p>
          {order.id === "mountain" ? <><details onToggle={(event) => { if (event.currentTarget.open) setPolicyRead(true); }} className="refund-policy"><summary>查看退款规则</summary><p>8月26日12:00前：免费取消，全额退还¥768。之后取消：扣除首晚房费¥384。</p><p>本次操作将取消整笔双人住宿订单，不保留房间。</p></details>{policyRead && <label className="refund-agree"><Checkbox checked={policyAccepted} onCheckedChange={(value) => setPolicyAccepted(value === true)} />我已阅读退款规则</label>}</> : <p className="refund-rule">{order.id === "salt" ? "开场前2小时可免费取消。请从电子票确认预约信息。" : order.id === "return" ? "发车前48小时以上免收手续费，每张票单独退回。" : "8月26日12:00前，可免费取消整笔订单。"}</p>}
          {order.id === "lighthouse" && <label className="ticket-input">运营方凭证核验尾号<Input value={code} maxLength={4} inputMode="numeric" placeholder="4位数字" onChange={(event) => setCode(event.target.value)} aria-describedby={error ? "cancel-error" : undefined} /><small>请核对订单详情左侧的凭证</small></label>}
          {order.id === "return" && state.refundedPassengers.length > 0 && <p className="partial-refund" role="status">已退{state.refundedPassengers.length}张，仍有{2 - state.refundedPassengers.length}张有效车票。</p>}
          <div className="refund-amount"><span>本次可退</span><strong>¥{order.id === "return" ? passengers.filter((id) => !state.refundedPassengers.includes(id)).length * 218 : order.price.toLocaleString()}</strong></div>
          {error && <p id="cancel-error" className="refund-error" role="alert">{error}</p>}
          {(order.id !== "salt" || ticketOpened) && <Button className="ota-cancel" onClick={cancel}>{order.id === "return" ? "确认退掉选中车票" : order.id === "salt" ? "取消预约" : "确认取消并退款"}</Button>}
          {order.id === "salt" && !ticketOpened && <small>打开左侧电子票后，可在此取消预约。</small>}
          <small>取消成功后无法恢复原订单。</small>
        </>}
      </aside></div>
    </main> : <main className="ota-orders">
      <div className="ota-orders-heading"><div><p className="eyebrow">MY JOURNEY</p><h1>我的订单</h1><p>每一段出发，都有记录。</p></div><div className="ota-trip-summary"><MapPin /><div><strong>雾汀 · 旅行安排</strong><small>8月23日 — 8月31日</small></div></div></div>
      <div className="ota-workspace"><aside className="ota-sidebar"><p>订单管理</p>{["全部", "酒店", "交通", "门票"].map((value) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value === "全部" ? "全部订单" : value}<span>{value === "全部" ? 5 : ORDERS.filter((item) => item.category === value).length}</span></button>)}<div className="ota-help-card"><LifeBuoy /><strong>需要帮助？</strong><p>退款政策、票据与<br />订单常见问题</p><button onClick={() => setPage("help")}>订单帮助 <ArrowUpRight /></button></div></aside>
      <section className="ota-order-list"><div className="ota-list-toolbar"><div className="ota-status-tabs">{[["all", "全部", 5], ["pending", "待出行", 5 - completed], ["cancelled", "已取消", completed]].map(([value, label, count]) => <button key={value} aria-pressed={status === value} onClick={() => setStatus(String(value))}>{label}<span>{count}</span></button>)}</div><label className="ota-order-search"><Search /><Input aria-label="搜索订单名称或订单号" placeholder="搜索订单" value={filter} onChange={(event) => setFilter(event.target.value)} /></label></div>
      {filtered.length ? filtered.map((item) => <article className="ota-order-card" key={item.id}><header><span>{item.category}订单 <i />{item.number}</span><span className={`ota-state ${state.cancelled[item.id] ? "cancelled" : ""}`}>{state.cancelled[item.id] ? "已取消" : item.id === "return" && state.refundedPassengers.length ? "部分已退" : "预订成功"}</span></header><div className="ota-order-main"><button className={`ota-order-photo ${item.category === "酒店" ? "" : "order-icon"}`} onClick={() => openOrder(item.id)} aria-label={`查看${item.title}订单`}>{item.category === "酒店" ? <img src={item.image} alt={`${item.title}宣传图`} /> : <item.icon aria-hidden="true" />}</button><div className="ota-order-copy"><span><item.icon />{item.category}</span><button onClick={() => openOrder(item.id)}><h2>{item.title}</h2></button><p>{item.detail}</p><small>{item.date}</small></div><div className="ota-order-price"><strong><small>¥</small>{item.price.toLocaleString()}</strong><span>订单总额</span><Button variant="outline" size="sm" onClick={() => openOrder(item.id)}>查看订单 <ChevronRight /></Button></div></div></article>) : <div className="ota-empty"><Search /><p>没有符合条件的订单</p><Button variant="ghost" onClick={() => { setFilter(""); setCategory("全部"); setStatus("all"); }}>清除筛选</Button></div>}
      <p className="ota-list-end">已显示全部订单 · {completed}笔已取消</p></section></div>
    </main>}
    <footer className="ota-footer"><Waves /><span>泊岸旅行</span><small>好好出发，慢慢回来。</small><span>订单信息仅对当前账号可见</span></footer>
  </div>;
}

export function SecretRide({ onOpenActivity }: { onOpenActivity: () => void }) {
  const [cancelAttempted, setCancelAttempted] = useState(false);
  const [contact, setContact] = useState(false);
  return <div className="ride-page"><header><span className="ride-mark">安</span><strong>安时接送</strong><small>预约出行服务</small></header><main><p className="eyebrow">预约订单 · 待出行</p><h1>夜间接送</h1><p className="ride-number">WT-0831-2140</p><div className="ride-date"><strong>8月31日</strong><span>周一</span><b>21:40</b></div><div className="ride-route"><div><i /><span><small>上车地点</small><strong>雾汀北站 · 北广场</strong></span></div><div><i /><span><small>下车地点</small><strong>由预订机构统一安排</strong></span></div></div><dl className="ota-fields"><div><dt>乘车人数</dt><dd>2人</dd></div><div><dt>联系人</dt><dd>周** · 138 **** 0726</dd></div><div><dt>费用状态</dt><dd>机构结算 · 无需现场支付</dd></div><div><dt>预订来源</dt><dd><button className="ride-source-link" onClick={onOpenActivity}>安时活动服务 <ArrowUpRight aria-hidden="true" /></button></dd></div></dl><p className="ride-note">乘车人信息由预订机构提交。具体下车地点将在出发前由工作人员通知。</p><div className="ride-actions"><Button onClick={() => setCancelAttempted(true)}>申请取消</Button><Button variant="outline" onClick={() => setContact(!contact)}>联系预订方</Button></div>{cancelAttempted && <div className="ride-response" role="status"><strong>暂不支持乘车人自行取消</strong><p>本订单为机构预约。请联系预订方办理；取消其他平台的订单不会撤销本次预约。</p></div>}{contact && <div className="ride-response"><strong>安时活动服务</strong><p>请在活动页面查看预约咨询与参与说明。</p><Button variant="outline" onClick={onOpenActivity}>打开活动页面</Button><small>接送系统仅负责车辆安排，无法代办活动变更。</small></div>}</main><footer>安时接送 · 订单服务</footer></div>;
}
