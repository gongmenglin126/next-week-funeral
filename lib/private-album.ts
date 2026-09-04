export type PrivatePhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  time: string;
  location: string;
  note: string;
  alt: string;
  marked: boolean;
  markPosition?: "cafe" | "promenade";
};

export const PRIVATE_PHOTOS: readonly PrivatePhoto[] = [
  {
    id: "IMG_2148.jpg",
    src: "./game/lin-private-cafe.webp",
    width: 1448,
    height: 1086,
    time: "8月23日 16:12",
    location: "雾汀旧港咖啡店",
    note: "她怕冷，却还是把靠窗的位置让给我。",
    alt: "林知还坐在雨天的海边咖啡店窗前，望向镜头微笑",
    marked: false,
  },
  {
    id: "IMG_2191.jpg",
    src: "./game/lin-private-promenade.webp",
    width: 1448,
    height: 1086,
    time: "8月24日 18:27",
    location: "雾汀沿海步道",
    note: "回头。",
    alt: "林知还走在雨后的沿海步道上，回头看向镜头",
    marked: false,
  },
  {
    id: "IMG_2148_edit.jpg",
    src: "./game/lin-private-cafe.webp",
    width: 1448,
    height: 1086,
    time: "8月25日 00:41",
    location: "编辑副本",
    note: "别再这样看我。",
    alt: "同一张咖啡店照片，林知还的脸被红色记号划去",
    marked: true,
    markPosition: "cafe",
  },
  {
    id: "IMG_2191_edit.jpg",
    src: "./game/lin-private-promenade.webp",
    width: 1448,
    height: 1086,
    time: "8月25日 00:43",
    location: "编辑副本",
    note: "你明明说不会走，却从来没有选过我。",
    alt: "同一张沿海步道照片，林知还的脸被红色记号划去",
    marked: true,
    markPosition: "promenade",
  },
] as const;

export function isPrivateAlbumAnswer(value: string) {
  return value.normalize("NFKC").replace(/[\s·•]/g, "") === "林知还";
}
