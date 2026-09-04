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
  markPosition?: "bookshop" | "bus-stop";
};

export const PRIVATE_PHOTOS: readonly PrivatePhoto[] = [
  {
    id: "IMG_2148.jpg",
    src: "./game/lin-private-cafe.webp",
    width: 1448,
    height: 1086,
    time: "7月12日 16:12",
    location: "临川南街咖啡店",
    note: "她怕冷，却还是把靠窗的位置让给我。",
    alt: "林知还坐在雨天的海边咖啡店窗前，望向镜头微笑",
    marked: false,
  },
  {
    id: "IMG_2191.jpg",
    src: "./game/lin-private-promenade.webp",
    width: 1448,
    height: 1086,
    time: "8月6日 18:27",
    location: "临川江堤",
    note: "回头。",
    alt: "林知还走在雨后的沿海步道上，回头看向镜头",
    marked: false,
  },
  {
    id: "IMG_2387_edit.jpg",
    src: "./game/lin-private-bookshop.webp",
    width: 1448,
    height: 1086,
    time: "8月21日 23:49",
    location: "在相簿中编辑",
    note: "为什么偏偏是你。",
    alt: "书店咖啡馆里，林知还的脸被密集的红色记号反复划去",
    marked: true,
    markPosition: "bookshop",
  },
  {
    id: "IMG_2401_edit.jpg",
    src: "./game/lin-private-bus-stop.webp",
    width: 1448,
    height: 1086,
    time: "8月22日 00:06",
    location: "在相簿中编辑",
    note: "最亲近的人，才算数。",
    alt: "雨后的公交站里，林知还的脸被密集的红色记号反复划去",
    marked: true,
    markPosition: "bus-stop",
  },
] as const;

export function isPrivateAlbumAnswer(value: string) {
  return value.normalize("NFKC").replace(/[\s·•]/g, "") === "林知还";
}
