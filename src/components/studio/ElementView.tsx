import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { Link, Mail, MapPin, Phone } from "lucide-react";
import type { ContactIcon, Content, CVElement, Handle } from "@/cv/types";
import { FONT_STACK, withAlpha } from "@/cv/types";

const ICONS = { mail: Mail, phone: Phone, pin: MapPin, link: Link } as const;

type Props = {
  el: CVElement;
  selected: boolean;
  editing: boolean;
  chrome: boolean;
  onPointerDown?: (event: ReactPointerEvent) => void;
  onDoubleClick?: () => void;
  onChange?: (content: Partial<Content>) => void;
  onResize?: (handle: Handle, event: ReactPointerEvent) => void;
  onRotate?: (event: ReactPointerEvent) => void;
  onUpload?: (file: File) => void;
};

const HANDLES: { id: Handle; className: string }[] = [
  { id: "nw", className: "-top-1.5 -left-1.5 cursor-nwse-resize" },
  { id: "n", className: "-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize" },
  { id: "ne", className: "-top-1.5 -right-1.5 cursor-nesw-resize" },
  { id: "e", className: "top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize" },
  { id: "se", className: "-right-1.5 -bottom-1.5 cursor-nwse-resize" },
  { id: "sw", className: "-bottom-1.5 -left-1.5 cursor-nesw-resize" },
  { id: "s", className: "-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize" },
  { id: "w", className: "top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize" },
];

function stack(family: string) {
  return FONT_STACK[family] ?? family;
}

function LiveText({
  text,
  editing,
  className,
  style,
  onCommit,
}: {
  text: string;
  editing: boolean;
  className?: string;
  style?: CSSProperties;
  onCommit: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useLayoutEffect(() => {
    if (!editing) {
      seeded.current = false;
      return;
    }
    const node = ref.current;
    if (!node || seeded.current) return;
    node.textContent = text;
    seeded.current = true;
    node.focus();
  }, [editing, text]);

  if (!editing) {
    return (
      <div className={className} style={style}>
        {text}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      role="textbox"
      onPointerDown={(event) => event.stopPropagation()}
      onBlur={(event) => onCommit(event.currentTarget.innerText.replace(/\u00a0/g, " ").replace(/\n$/, ""))}
    />
  );
}

export function ElementView({
  el,
  selected,
  editing,
  chrome,
  onPointerDown,
  onDoubleClick,
  onChange,
  onResize,
  onRotate,
  onUpload,
}: Props) {
  const s = el.style;
  const color = s.color;
  const family = stack(s.fontFamily);
  const typeStyle: CSSProperties = {
    fontFamily: family,
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    fontStyle: s.italic ? "italic" : "normal",
    color,
    textAlign: s.textAlign,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    padding: s.padding,
  };

  const commit = (content: Partial<Content>) => onChange?.(content);

  let body = null;
  if (el.type === "heading" || el.type === "text") {
    body = (
      <LiveText
        text={el.content.text ?? ""}
        editing={editing}
        className="h-full w-full whitespace-pre-wrap break-words outline-none"
        style={typeStyle}
        onCommit={(text) => commit({ text })}
      />
    );
  } else if (el.type === "experience") {
    const c = el.content;
    body = (
      <div className="h-full w-full" style={typeStyle}>
        <div className="flex items-baseline justify-between gap-3">
          <LiveText
            text={c.role ?? ""}
            editing={editing}
            className="min-w-0 flex-1 font-semibold outline-none"
            style={{ fontWeight: Math.max(s.fontWeight, 650) }}
            onCommit={(role) => commit({ role })}
          />
          <LiveText
            text={c.date ?? ""}
            editing={editing}
            className="shrink-0 outline-none"
            style={{ opacity: 0.62, fontWeight: 500 }}
            onCommit={(date) => commit({ date })}
          />
        </div>
        <LiveText
          text={c.company ?? ""}
          editing={editing}
          className="outline-none"
          style={{ opacity: 0.72, fontWeight: 600 }}
          onCommit={(company) => commit({ company })}
        />
        <LiveText
          text={c.desc ?? ""}
          editing={editing}
          className="mt-1 whitespace-pre-wrap break-words outline-none"
          style={{ opacity: 0.9 }}
          onCommit={(desc) => commit({ desc })}
        />
      </div>
    );
  } else if (el.type === "education") {
    const c = el.content;
    body = (
      <div className="h-full w-full" style={typeStyle}>
        <div className="flex items-baseline justify-between gap-3">
          <LiveText
            text={c.degree ?? ""}
            editing={editing}
            className="min-w-0 flex-1 outline-none"
            style={{ fontWeight: Math.max(s.fontWeight, 650) }}
            onCommit={(degree) => commit({ degree })}
          />
          <LiveText
            text={c.date ?? ""}
            editing={editing}
            className="shrink-0 outline-none"
            style={{ opacity: 0.62 }}
            onCommit={(date) => commit({ date })}
          />
        </div>
        <LiveText
          text={c.school ?? ""}
          editing={editing}
          className="outline-none"
          style={{ opacity: 0.72 }}
          onCommit={(school) => commit({ school })}
        />
      </div>
    );
  } else if (el.type === "skills") {
    const justify = s.textAlign === "center" ? "center" : s.textAlign === "right" ? "flex-end" : "flex-start";
    body = (
      <div className="flex h-full w-full flex-wrap content-start gap-1.5" style={{ ...typeStyle, justifyContent: justify }}>
        {(el.content.items ?? []).map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center rounded-full border px-2.5 py-1 leading-none"
            style={{ borderColor: withAlpha(color, 0.35), background: withAlpha(color, 0.06) }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  } else if (el.type === "meters") {
    const wide = el.w >= 480;
    body = (
      <div className={wide ? "grid h-full grid-cols-3 gap-x-6 gap-y-2" : "flex h-full flex-col justify-center gap-2"} style={typeStyle}>
        {(el.content.meters ?? []).map((meter, index) => (
          <div key={`${meter.label}-${index}`} className="min-w-0">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="truncate">{meter.label}</span>
              <span style={{ opacity: 0.55 }}>{meter.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: withAlpha(color, 0.16) }}>
              <div className="h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, meter.value))}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (el.type === "contact") {
    const Icon = ICONS[(el.content.icon as ContactIcon) || "mail"] ?? Mail;
    const justify = s.textAlign === "center" ? "center" : s.textAlign === "right" ? "flex-end" : "flex-start";
    body = (
      <div className="flex h-full w-full items-center gap-2" style={{ ...typeStyle, justifyContent: justify }}>
        <Icon size={Math.max(12, s.fontSize)} strokeWidth={1.75} className="shrink-0" aria-hidden />
        <LiveText
          text={el.content.text ?? ""}
          editing={editing}
          className="min-w-0 outline-none"
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          onCommit={(text) => commit({ text })}
        />
      </div>
    );
  } else if (el.type === "photo") {
    body = (
      <div className="relative h-full w-full">
        {el.content.src ? (
          <img src={el.content.src} alt="" className="h-full w-full object-cover" draggable={false} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-mute">
            <span className="text-xs font-medium">Photo</span>
          </div>
        )}
        {chrome && selected && (
          <label className="no-export absolute inset-x-2 bottom-2 flex h-8 cursor-pointer items-center justify-center rounded-ui bg-ink text-xs font-semibold text-cream">
            Importer
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onPointerDown={(event) => event.stopPropagation()}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onUpload?.(file);
                event.target.value = "";
              }}
            />
          </label>
        )}
      </div>
    );
  }

  const radius = el.type === "ellipse" ? 9999 : s.borderRadius;

  return (
    <div
      data-element={el.id}
      className={el.locked ? "absolute" : "absolute touch-none"}
      style={{
        left: el.x,
        top: el.y,
        width: el.w,
        height: el.h,
        zIndex: el.z,
        transform: `rotate(${el.rotation}deg)`,
        transformOrigin: "center center",
        opacity: s.opacity,
      }}
      onPointerDown={onPointerDown}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onDoubleClick?.();
      }}
    >
      <div
        className="h-full w-full overflow-hidden"
        style={{
          background: s.backgroundColor,
          borderRadius: radius,
          border: s.borderWidth ? `${s.borderWidth}px solid ${s.borderColor}` : undefined,
          boxSizing: "border-box",
        }}
      >
        {body}
      </div>
      {chrome && selected && !el.locked && (
        <>
          <div className="pointer-events-none absolute inset-0 border border-ink" />
          {HANDLES.map((handle) => (
            <div
              key={handle.id}
              role="button"
              aria-label={`Redimensionner ${handle.id}`}
              className={`no-export absolute z-10 size-3 rounded-sm border border-ink bg-cream ${handle.className}`}
              onPointerDown={(event) => {
                event.stopPropagation();
                onResize?.(handle.id, event);
              }}
            />
          ))}
          <div className="no-export absolute -top-7 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="h-4 w-px bg-ink" />
            <div
              role="button"
              aria-label="Pivoter"
              className="size-3 rounded-full border border-ink bg-cream"
              onPointerDown={(event) => {
                event.stopPropagation();
                onRotate?.(event);
              }}
            />
          </div>
        </>
      )}
      {chrome && selected && el.locked && <div className="pointer-events-none absolute inset-0 border border-dashed border-mute" />}
    </div>
  );
}
