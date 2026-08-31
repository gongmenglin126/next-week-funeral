export const TRAVEL_PHOTOS = [
  { id: "IMG_4819.jpg", src: "./game/seaside-dinner.webp", width: 1448, height: 1086, time: "8月24日 17:42", location: "栖潮餐厅", alt: "雨窗旁摆着两人份的晚餐", cropped: false },
  { id: "IMG_4820.jpg", src: "./game/wuting-sea-wallpaper.webp", width: 1672, height: 941, time: "8月24日 17:43", location: "雾汀老城", alt: "雨天的雾汀海岸，与电脑桌面相同的照片", cropped: false },
] as const;

export const DELETED_PHOTO = {
  id: "IMG_4821_crop.jpg", src: "./game/inn-corridor-original.webp", width: 1448, height: 1086,
  time: "8月24日 18:06", location: "南岸民宿", alt: "左侧已被裁去的民宿走廊照片", cropped: true,
} as const;

export type TravelPhoto = (typeof TRAVEL_PHOTOS)[number] | typeof DELETED_PHOTO;

export function visiblePhotos(restored: boolean): TravelPhoto[] {
  return restored ? [...TRAVEL_PHOTOS, DELETED_PHOTO] : [...TRAVEL_PHOTOS];
}
