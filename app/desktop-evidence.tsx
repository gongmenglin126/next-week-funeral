"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Download, FileSearch, FolderClosed, Image as ImageIcon, LockKeyhole, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DELETED_PHOTO, visiblePhotos, type TravelPhoto } from "@/lib/photo-library";
import { isPrivateAlbumAnswer, PRIVATE_PHOTOS, type PrivatePhoto } from "@/lib/private-album";
import type { WindowPoint } from "@/lib/window-position";
import { useNoteDrag } from "./use-note-drag";

export type DesktopPanelKind = "files" | "photos" | "trash";

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
  const [photoSection, setPhotoSection] = useState<"library" | "private">("library");
  const photos = visiblePhotos(restoredPhoto);
  const index = photos.findIndex((photo) => photo.id === selected);
  const current = kind === "trash" && selected === DELETED_PHOTO.id ? DELETED_PHOTO : photos[index];
  const title = kind === "photos" ? "照片" : kind === "trash" ? "回收站" : "雾汀旅行";
  const movePhoto = (delta: number) => setSelected(photos[(index + delta + photos.length) % photos.length].id);
  const switchPanel = (nextKind: DesktopPanelKind) => {
    setSelected(null);
    setPhotoSection("library");
    onPanelChange(nextKind);
  };
  const { panel, style, titlebar } = useNoteDrag(position, onPositionChange, `${title}窗口标题栏，可拖动或按方向键移动`);

  return <section ref={panel} style={style} className="desktop-panel evidence-window" aria-label={title}>
    <header {...titlebar}><div className="window-controls"><button onClick={onClose} aria-label={`关闭${title}`}><X /></button></div><strong>{title}</strong><span /></header>
    <div className="desktop-panel-body">
      <aside aria-label="文件位置">
        <span>位置</span>
        <button className={`panel-nav ${kind === "files" ? "active" : ""}`} onClick={() => switchPanel("files")} aria-current={kind === "files" ? "page" : undefined}><FolderClosed />雾汀旅行</button>
        <button className="panel-nav" onClick={() => onDownloads()}><Download />下载</button>
        <button className={`panel-nav ${kind === "photos" ? "active" : ""}`} onClick={() => switchPanel("photos")} aria-current={kind === "photos" ? "page" : undefined}><ImageIcon />照片</button>
        <button className={`panel-nav ${kind === "trash" ? "active" : ""}`} onClick={() => switchPanel("trash")} aria-current={kind === "trash" ? "page" : undefined}><Trash2 />回收站</button>
      </aside>
      <section className="desktop-panel-content">
        <div><h2>{kind === "photos" && photoSection === "private" ? "隐私相册" : title}</h2><p>{kind === "photos" ? photoSection === "private" ? "已锁定的个人相册" : `${photos.length} 张照片 · 1 个隐私相册` : kind === "trash" ? `${restoredPhoto ? 0 : 1} 个项目` : "旅行资料"}</p></div>
        {kind === "files" ? <p className="evidence-empty">文件夹为空。</p> : kind === "trash" ? restoredPhoto ? <p className="evidence-empty" role="status">回收站为空。已恢复的裁剪副本保存在照片中。</p> : <>
          {current ? <PhotoViewer key={current.id} photo={current} onClose={() => setSelected(null)} /> : <button className="deleted-photo-row" onClick={() => setSelected(DELETED_PHOTO.id)}><FileSearch /><span><strong>{DELETED_PHOTO.id}</strong><small>8月25日 04:38 删除 · 原位置：旅行照片</small></span><ArrowRight /></button>}
          <div className="restore-photo"><Button variant="outline" onClick={() => { onRestorePhoto(); setSelected(null); }}>恢复到照片</Button><small>恢复的是这份裁剪副本。</small></div>
        </> : photoSection === "private" ? <PrivateAlbumContent unlocked={privateAlbumUnlocked} onUnlock={onUnlockPrivateAlbum} onBack={() => setPhotoSection("library")} /> : current ? <PhotoViewer key={current.id} photo={current} onClose={() => setSelected(null)} onPrevious={() => movePhoto(-1)} onNext={() => movePhoto(1)} /> : <div className="photo-grid">
          <button className="private-album-tile" onClick={() => setPhotoSection("private")}><div className="private-album-cover"><LockKeyhole aria-hidden="true" /></div><strong>隐私相册</strong><small>{privateAlbumUnlocked ? "4 张照片" : "已锁定"}</small></button>
          {photos.map((photo) => <button key={photo.id} onClick={() => setSelected(photo.id)}><div className={`evidence-thumbnail ${photo.cropped ? "is-cropped" : ""}`}><img src={photo.src} alt={photo.alt} /></div><strong>{photo.id}</strong><small>{photo.time} · {photo.location}</small></button>)}
        </div>}
      </section>
    </div>
  </section>;
}

function MarkedPhoto({ photo }: { photo: PrivatePhoto }) {
  return <div className={`private-photo-frame ${photo.marked ? "is-marked" : ""} ${photo.markPosition ? `mark-${photo.markPosition}` : ""}`}>
    <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
    {photo.marked ? <span className="private-photo-scribble" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</span> : null}
  </div>;
}

function PrivateAlbumContent({ unlocked, onUnlock, onBack }: { unlocked: boolean; onUnlock: () => void; onBack: () => void }) {
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

  if (!unlocked) return <><Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft />所有照片</Button><form className="private-album-lock" onSubmit={submit}>
    <LockKeyhole aria-hidden="true" />
    <p>此相簿需要回答安全问题</p>
    <label htmlFor="private-album-answer">我的少女心事</label>
    <p>请输入三个字</p>
    <Input id="private-album-answer" value={answer} maxLength={3} onChange={(event) => setAnswer(event.target.value)} placeholder="三个字" autoComplete="off" aria-invalid={Boolean(error)} />
    {error ? <small role="alert">{error}</small> : null}
    <Button type="submit">解锁相簿</Button>
  </form></>;

  if (selected) return <section className="private-photo-viewer">
    <Button variant="ghost" size="sm" onClick={() => setSelected(null)}><ArrowLeft />返回列表</Button>
    <MarkedPhoto photo={selected} />
    <dl><div><dt>文件名</dt><dd>{selected.id}</dd></div><div><dt>拍摄时间</dt><dd>{selected.time}</dd></div><div><dt>地点</dt><dd>{selected.location}</dd></div><div><dt>备注</dt><dd>{selected.note}</dd></div></dl>
  </section>;

  return <section className="private-album-grid" aria-label="已解锁的隐私相册">
    <Button className="private-album-back" variant="ghost" size="sm" onClick={onBack}><ArrowLeft />所有照片</Button>
    {PRIVATE_PHOTOS.map((photo) => <button key={photo.id} onClick={() => setSelected(photo)}><MarkedPhoto photo={photo} /><strong>{photo.id}</strong><small>{photo.time}</small></button>)}
    <p>最早两张拍摄于旅行前。8月21日深夜，相册里突然出现了两张被反复涂改的新照片。</p>
  </section>;
}
