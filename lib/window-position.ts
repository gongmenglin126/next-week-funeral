export type WindowPoint = { x: number; y: number };
export type WindowSize = { width: number; height: number };

export function clampNotePosition(point: WindowPoint, panel: WindowSize, desktop: WindowSize): WindowPoint {
  return {
    x: Math.min(Math.max(8, point.x), Math.max(8, desktop.width - panel.width - 8)),
    y: Math.min(Math.max(34, point.y), Math.max(34, desktop.height - panel.height - 64)),
  };
}
