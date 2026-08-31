"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { clampNotePosition, type WindowPoint } from "@/lib/window-position";

export function useNoteDrag(position?: WindowPoint | null, onPositionChange?: (point: WindowPoint) => void) {
  const panel = useRef<HTMLElement>(null);
  const drag = useRef<{ pointerId: number; pointer: WindowPoint; origin: WindowPoint } | null>(null);
  const [localPosition, setLocalPosition] = useState<WindowPoint | null>(null);
  const [dragging, setDragging] = useState(false);
  const currentPosition = position === undefined ? localPosition : position;
  const updatePosition = onPositionChange ?? setLocalPosition;
  const hasMoved = currentPosition !== null;

  function geometry() {
    const node = panel.current;
    if (!node?.parentElement) return null;
    const rect = node.getBoundingClientRect();
    const desktop = node.parentElement.getBoundingClientRect();
    return { rect, desktop, point: { x: rect.left - desktop.left, y: rect.top - desktop.top } };
  }

  function moveTo(point: WindowPoint) {
    const box = geometry();
    if (box) updatePosition(clampNotePosition(point, box.rect, box.desktop));
  }

  useEffect(() => {
    if (!hasMoved) return;
    const fit = () => {
      const node = panel.current;
      if (!node?.parentElement) return;
      const rect = node.getBoundingClientRect();
      const desktop = node.parentElement.getBoundingClientRect();
      const point = { x: rect.left - desktop.left, y: rect.top - desktop.top };
      const fitted = clampNotePosition(point, rect, desktop);
      if (point.x !== fitted.x || point.y !== fitted.y) updatePosition(fitted);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [hasMoved, updatePosition]);

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0 || !event.isPrimary || (event.target as Element).closest("button")) return;
    const box = geometry();
    if (!box) return;
    event.preventDefault();
    drag.current = { pointerId: event.pointerId, pointer: { x: event.clientX, y: event.clientY }, origin: box.point };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus();
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;
    moveTo({ x: active.origin.x + event.clientX - active.pointer.x, y: active.origin.y + event.clientY - active.pointer.y });
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    const directions: Record<string, WindowPoint> = { ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 } };
    const direction = directions[event.key];
    const box = geometry();
    if (!direction || !box) return;
    event.preventDefault();
    const step = event.shiftKey ? 40 : 10;
    moveTo({ x: box.point.x + direction.x * step, y: box.point.y + direction.y * step });
  }

  return {
    panel,
    style: currentPosition ? { left: currentPosition.x, top: currentPosition.y, transform: "none" } : undefined,
    titlebar: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onLostPointerCapture: endDrag, onKeyDown, tabIndex: 0, "data-dragging": dragging, "aria-label": "记事本标题栏，可拖动或按方向键移动" },
  };
}
