import type { PointerEvent as ReactPointerEvent } from "react";
import { ElementView } from "@/components/studio/ElementView";
import type { Box, Content, CVElement, Handle, Page } from "@/cv/types";
import { PAGE_H, PAGE_W } from "@/cv/types";

type Props = {
  page: Page;
  interactive: boolean;
  selectedIds: string[];
  editingId: string | null;
  showGrid: boolean;
  showMargins: boolean;
  guides: { x: number[]; y: number[] };
  marquee: Box | null;
  onSheetPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onElementPointerDown?: (event: ReactPointerEvent, el: CVElement) => void;
  onDoubleClick?: (id: string) => void;
  onChange?: (id: string, content: Partial<Content>) => void;
  onResize?: (id: string, handle: Handle, event: ReactPointerEvent) => void;
  onRotate?: (id: string, event: ReactPointerEvent) => void;
  onUpload?: (id: string, file: File) => void;
};

export function PageSheet({
  page,
  interactive,
  selectedIds,
  editingId,
  showGrid,
  showMargins,
  guides,
  marquee,
  onSheetPointerDown,
  onElementPointerDown,
  onDoubleClick,
  onChange,
  onResize,
  onRotate,
  onUpload,
}: Props) {
  // Feuille A4 forcée en blanc pur (#FFFFFF) avec une ombre nette (shadow-2xl)
  const sheetBg = "#ffffff";

  return (
    <div
      className="bg-white shadow-2xl ring-1 ring-slate-900/10 relative overflow-hidden"
      data-sheet={interactive ? page.id : undefined}
      style={{ width: PAGE_W, height: PAGE_H, backgroundColor: sheetBg }}
      onPointerDown={interactive ? onSheetPointerDown : undefined}
    >
      {showGrid && interactive && (
        <div
          data-canvas="bg"
          className="no-export pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.55,
          }}
        />
      )}
      {showMargins && interactive && <div data-canvas="bg" className="no-export pointer-events-none absolute inset-9 border border-dashed border-line" />}
      {page.elements
        .filter((el) => !el.hidden)
        .map((el) => (
          <ElementView
            key={el.id}
            el={el}
            selected={interactive && selectedIds.includes(el.id)}
            editing={interactive && editingId === el.id}
            chrome={interactive}
            onPointerDown={interactive ? (event) => onElementPointerDown?.(event, el) : undefined}
            onDoubleClick={interactive ? () => onDoubleClick?.(el.id) : undefined}
            onChange={interactive ? (content) => onChange?.(el.id, content) : undefined}
            onResize={interactive ? (handle, event) => onResize?.(el.id, handle, event) : undefined}
            onRotate={interactive ? (event) => onRotate?.(el.id, event) : undefined}
            onUpload={interactive ? (file) => onUpload?.(el.id, file) : undefined}
          />
        ))}
      {guides.x.map((x) => (
        <div key={`x-${x}`} data-canvas="bg" className="no-export pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-signal" style={{ left: x }} />
      ))}
      {guides.y.map((y) => (
        <div key={`y-${y}`} data-canvas="bg" className="no-export pointer-events-none absolute right-0 left-0 z-40 h-px bg-signal" style={{ top: y }} />
      ))}
      {marquee && (
        <div
          className="no-export pointer-events-none absolute z-40 border border-dashed border-signal bg-signal/10"
          style={{ left: marquee.x, top: marquee.y, width: marquee.w, height: marquee.h }}
        />
      )}
    </div>
  );
}
