"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Download, FileSearch, FolderClosed, Image as ImageIcon, LockKeyhole, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DELETED_PHOTO, visiblePhotos, type TravelPhoto } from "@/lib/photo-library";
import { isPrivateAlbumAnswer, PRIVATE_PHOTOS, type PrivatePhoto } from "@/lib/private-album";
import type { WindowPoint } from "@/lib/window-position";
import { useNoteDrag } from "./use-note-drag";

export type DesktopPanelKind = "files" | "photos" | "private" | "trash";

export function PhotoViewer({ photo, onClose, onPrevious, onNext }: {
  photo: TravelPhoto; onClose: () => void; onPrevious?: () => void; onNext?: () => void;
}) {
  const [zoom, setZoom] = useState(100);
  // The deleted copy removes the left-side activity sign.
  const frameRatio = photo.width / photo.height / (photo.cropped ? 1.28 : 1);
  return <section className="evidence-viewer" aria-label={`照片预览：${photo.id}`}>
    <div className="evidence-tools">
      <Button variant="ghost" size="sm" onClick={onClose}><ArrowLeft />返回列表</Button>
      <div>
        {onPrevious && <Button variant="ghost" size="icon-sm" onClick={onPrevious} aria-label="上一张照片"><ArrowLeft /></Button>}
        {onNext && <Button variant="ghost" size="icon-sm" onClick={onNext} aria-label="下一张照片"><ArrowRight /></Button>}
        <Button variant="ghost" size="icon-sm" disabled={zoom <= 50} onClick={() => setZoom((value) => Math.max(50, value - 25))} aria-label="缩小照片"><ZoomOut /></Button>
        <span aria-live="polite">{zoom === 100 ? "适合窗口" : `${zoom}%`}</span>
        <Button variant="ghost" size="icon-sm" disabled={zoom >= 200} onClick={() => setZoom((value) => Math.min(200, value + 25))} aria-label="放大照片"><ZoomIn /></Button>
        {zoom !== 100 && <Button variant="ghost" size="sm" onClick={() => setZoom(100)}>适合窗口</Button>}
      </div>
    </div>
    <div className="evidence-canvas" tabIndex={0} aria-label="照片查看区域，可滚动查看放大后的照片">
      <div className={`evidence-image ${photo.cropped ? "is-cropped" : ""}`} style={{ width: `min(${zoom}%, calc((min(47vh, 440px) - 24px) * ${frameRatio * zoom / 100}))` }}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
      </div>
    </div>
    <dl className="evidence-metadata"><div><dt>文件名</dt><dd>{photo.id}</dd></div><div><dt>拍摄时间</dt><dd>{photo.time}</dd></div><div><dt>地点</dt><dd>{photo.location}</dd></div>{photo.cropped && <div><dt>版本</dt><dd>裁剪副本</dd></div>}</dl>
  </section>;
}

export function DesktopPanel({ kind, restoredPhoto, privateAlbumUnlocked, onRestorePhoto, onUnlockPrivateAlbum, onClose, onDownloads, onPanelChange, position, onPositionChange }: {
  kind: DesktopPanelKind; restoredPhoto: boolean; onRestorePhoto: () => void;
  privateAlbumUnlocked: boolean; onUnlockPrivateAlbum: () => void;
  onClose: () => void; onDownloads: (name?: string) => void; onPanelChange: (kind: DesktopPanelKind) => void;
  position?: WindowPoint | null; onPositionChange?: (point: WindowPoint) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const photos = visiblePhotos(restoredPhoto);
  const index = photos.findIndex((photo) => photo.id === selected);
  const current = kind === "trash" && selected === DELETED_PHOTO.id ? DELETED_PHOTO : photos[index];
  const title = kind === "photos" ? "旅行照片" : kind === "private" ? "隐藏相簿" : kind === "trash" ? "回收站" : "雾汀旅行";
  const movePhoto = (delta: number) => setSelected(photos[(index + delta + photos.length) % photos.length].id);
  const { panel, style, titlebar } = useNoteDrag(position, onPositionChange, `${title}窗口标题栏，可拖动或按方向键移动`);

  return <section ref={panel} style={style} className="desktop-panel evidence-window" aria-label={title}>
    <header {...titlebar}><div className="window-controls"><button onClick={onClose} aria-label={`关闭${title}`}><X /></button></div><strong>{title}</strong><span /></header>
    <div className="desktop-panel-body">
      <aside aria-label="文件位置">
        <span>位置</span>
        <button className={`panel-nav ${kind === "files" ? "active" : ""}`} onClick={() => onPanelChange("files")} aria-current={kind === "files" ? "page" : undefined}><FolderClosed />雾汀旅行</button>
        <button className="panel-nav" onClick={() => onDownloads()}><Download />下载</button>
        <button className={`panel-nav ${kind === "photos" ? "active" : ""}`} onClick={() => onPanelChange("photos")} aria-current={kind === "photos" ? "page" : undefined}><ImageIcon />旅行照片</button>
        <button className={`panel-nav ${kind === "private" ? "active" : ""}`} onClick={() => onPanelChange("private")} aria-current={kind === "private" ? "page" : undefined}><LockKeyhole />隐藏相簿</button>
        <button className={`panel-nav ${kind === "trash" ? "active" : ""}`} onClick={() => onPanelChange("trash")} aria-current={kind === "trash" ? "page" : undefined}><Trash2 />回收站</button>
      </aside>
      <section className="desktop-panel-content">
        <div><h2>{title}</h2><p>{kind === "photos" ? `${photos.length} 张照片 · 按拍摄时间排列` : kind === "private" ? "127 张照片 · 最近编辑于8月25日" : kind === "trash" ? `${restoredPhoto ? 0 : 1} 个项目` : "订单和本机票据"}</p></div>
        {kind === "private" ? <PrivateAlbumContent unlocked={privateAlbumUnlocked} onUnlock={onUnlockPrivateAlbum} /> : kind === "files" ? <div className="file-table">
          <button onClick={() => onDownloads("灯塔接驳电子票.pdf")}><FileSearch /><strong>灯塔接驳电子票.pdf</strong><small>PDF</small><time>8月18日 23:47</time></button>
        </div> : kind === "trash" ? restoredPhoto ? <p className="evidence-empty" role="status">回收站为空。已恢复的裁剪副本保存在旅行照片中。</p> : <>
          {current ? <PhotoViewer key={current.id} photo={current} onClose={() => setSelected(null)} /> : <button className="deleted-photo-row" onClick={() => setSelected(DELETED_PHOTO.id)}><FileSearch /><span><strong>{DELETED_PHOTO.id}</strong><small>8月25日 04:38 删除 · 原位置：旅行照片</small></span><ArrowRight /></button>}
          <div className="restore-photo"><Button variant="outline" onClick={() => { onRestorePhoto(); setSelected(null); }}>恢复到旅行照片</Button><small>恢复的是这份裁剪副本。</small></div>
        </> : current ? <PhotoViewer key={current.id} photo={current} onClose={() => setSelected(null)} onPrevious={() => movePhoto(-1)} onNext={() => movePhoto(1)} /> : <div className="photo-grid">
          {photos.map((photo) => <button key={photo.id} onClick={() => setSelected(photo.id)}><div className={`evidence-thumbnail ${photo.cropped ? "is-cropped" : ""}`}><img src={photo.src} alt={photo.alt} /></div><strong>{photo.id}</strong><small>{photo.time} · {photo.location}</small></button>)}
        </div>}
      </section>
    </div>
  </section>;
}

function MarkedPhoto({ photo }: { photo: PrivatePhoto }) {
  return <div className={`private-photo-frame ${photo.marked ? "is-marked" : ""} ${photo.markPosition ? `mark-${photo.markPosition}` : ""}`}>
    <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
    {photo.marked ? <span aria-hidden="true" /> : null}
  </div>;
}

function PrivateAlbumContent({ unlocked, onUnlock }: { unlocked: boolean; onUnlock: () => void }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<PrivatePhoto | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isPrivateAlbumAnswer(answer)) {
      setError("答案不对");
      return;
    }
    setError("");
    onUnlock();
  }

  if (!unlocked) return <form className="private-album-lock" onSubmit={submit}>
    <LockKeyhole aria-hidden="true" />
    <p>此相簿需要回答安全问题</p>
    <label htmlFor="private-album-answer">周惜的少女心事</label>
    <Input id="private-album-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="输入一个人的姓名" autoComplete="off" aria-invalid={Boolean(error)} />
    {error ? <small role="alert">{error}</small> : null}
    <Button type="submit">解锁相簿</Button>
  </form>;

  if (selected) return <section className="private-photo-viewer">
    <Button variant="ghost" size="sm" onClick={() => setSelected(null)}><ArrowLeft />返回列表</Button>
    <MarkedPhoto photo={selected} />
    <dl><div><dt>文件名</dt><dd>{selected.id}</dd></div><div><dt>拍摄时间</dt><dd>{selected.time}</dd></div><div><dt>地点</dt><dd>{selected.location}</dd></div><div><dt>备注</dt><dd>{selected.note}</dd></div></dl>
  </section>;

  return <section className="private-album-grid" aria-label="已解锁的隐藏相簿">
    {PRIVATE_PHOTOS.map((photo) => <button key={photo.id} onClick={() => setSelected(photo)}><MarkedPhoto photo={photo} /><strong>{photo.id}</strong><small>{photo.time}</small></button>)}
    <p>前两张是原图；后两张是8月25日凌晨保存的编辑副本。</p>
  </section>;
}
