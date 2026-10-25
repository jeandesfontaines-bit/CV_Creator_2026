import type { Box, Handle } from "@/cv/types";
import { GRID, MARGIN, PAGE_H, PAGE_W } from "@/cv/types";

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function intersects(a: Box, b: Box) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function clientToSheet(clientX: number, clientY: number, sheet: HTMLElement) {
  const r = sheet.getBoundingClientRect();
  return {
    x: ((clientX - r.left) / r.width) * PAGE_W,
    y: ((clientY - r.top) / r.height) * PAGE_H,
  };
}

export function snapMove(
  box: Box,
  dx: number,
  dy: number,
  others: Box[],
  opts: { grid: boolean; guides: boolean },
): { dx: number; dy: number; vx: number[]; hy: number[] } {
  let x = box.x + dx;
  let y = box.y + dy;
  const vx: number[] = [];
  const hy: number[] = [];
  const threshold = 5;

  if (opts.guides) {
    const vLines = [0, MARGIN, PAGE_W / 2, PAGE_W - MARGIN, PAGE_W];
    const hLines = [0, MARGIN, PAGE_H / 2, PAGE_H - MARGIN, PAGE_H];
    for (const o of others) {
      vLines.push(o.x, o.x + o.w / 2, o.x + o.w);
      hLines.push(o.y, o.y + o.h / 2, o.y + o.h);
    }
    let bestX: { dist: number; next: number; line: number } | null = null;
    for (const line of vLines) {
      for (const anchor of [0, box.w / 2, box.w]) {
        const dist = Math.abs(x + anchor - line);
        if (dist <= threshold && (!bestX || dist < bestX.dist)) bestX = { dist, next: line - anchor, line };
      }
    }
    let bestY: { dist: number; next: number; line: number } | null = null;
    for (const line of hLines) {
      for (const anchor of [0, box.h / 2, box.h]) {
        const dist = Math.abs(y + anchor - line);
        if (dist <= threshold && (!bestY || dist < bestY.dist)) bestY = { dist, next: line - anchor, line };
      }
    }
    if (bestX) {
      x = bestX.next;
      dx = x - box.x;
      vx.push(bestX.line);
    }
    if (bestY) {
      y = bestY.next;
      dy = y - box.y;
      hy.push(bestY.line);
    }
  }

  if (opts.grid && vx.length === 0) {
    x = Math.round(x / GRID) * GRID;
    dx = x - box.x;
  }
  if (opts.grid && hy.length === 0) {
    y = Math.round(y / GRID) * GRID;
    dy = y - box.y;
  }
  return { dx, dy, vx, hy };
}

export function resizeBox(orig: Box, handle: Handle, pageDx: number, pageDy: number, rotation: number, lockRatio: boolean): Box {
  const rad = (-rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const lx = pageDx * cos - pageDy * sin;
  const ly = pageDx * sin + pageDy * cos;
  let sx = 0;
  let sy = 0;
  if (handle.includes("e")) sx = 1;
  if (handle.includes("w")) sx = -1;
  if (handle.includes("s")) sy = 1;
  if (handle.includes("n")) sy = -1;
  const dw = sx * lx;
  const dh = sy * ly;
  let w = Math.max(20, orig.w + dw);
  let h = Math.max(12, orig.h + dh);
  if (lockRatio && sx !== 0 && sy !== 0) {
    const ratio = orig.w / Math.max(1, orig.h);
    if (Math.abs(dw) >= Math.abs(dh)) h = Math.max(12, w / ratio);
    else w = Math.max(20, h * ratio);
  }
  const cx = orig.x + orig.w / 2;
  const cy = orig.y + orig.h / 2;
  const ncx = cx + (sx * (w - orig.w)) / 2;
  const ncy = cy + (sy * (h - orig.h)) / 2;
  return {
    x: Math.round(ncx - w / 2),
    y: Math.round(ncy - h / 2),
    w: Math.round(w),
    h: Math.round(h),
  };
}

export function normRotation(deg: number) {
  let d = Math.round(deg);
  d %= 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}
