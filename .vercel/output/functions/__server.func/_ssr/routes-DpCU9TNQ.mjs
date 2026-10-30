import { o as __toESM } from "../_runtime.mjs";
import { W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { $ as Copy, A as LockOpen, B as Grid3x3, C as Palette, D as Mail, E as MapPin, F as Languages, G as FolderGit2, H as Globe, I as Italic, J as FileText, K as FileUp, L as Info, M as Link, N as LayoutTemplate, O as Magnet, P as Layers, Q as Download, R as Image$1, S as PenLine, T as Maximize2, U as Gauge, V as GraduationCap, W as FolderOpen, X as Eye, Y as FileCheck, Z as EyeOff, _ as RefreshCw, a as Undo2, at as ChevronDown, b as Plus, c as Trash2, ct as Briefcase, d as Sparkles, dt as ArrowRight, et as Cloud, f as Smartphone, ft as ArrowLeft, g as RotateCcw, gt as AlignCenter, h as SendToBack, ht as AlignRight, i as Upload, it as ChevronUp, j as LoaderCircle, k as Lock, l as Tags, lt as Bold, m as ShieldCheck, mt as AlignLeft, n as WandSparkles, nt as CircleCheck, o as Type, ot as Check, p as SlidersHorizontal, pt as ArrowDownToLine, q as FileType, r as User, rt as CircleAlert, s as TriangleAlert, st as BringToFront, t as X, tt as Circle, u as Square, ut as Award, v as Redo2, w as Minus, x as Phone, y as Printer, z as Heading } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { n as toPng } from "../_libs/html-to-image.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-DpCU9TNQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var PAGE_H = 1123;
var INK = "#141311";
var CREAM = "#f6f3ec";
var MUTE = "#5e5952";
var SIGNAL = "#d6372a";
var SHEET = "#ffffff";
var HAIR = "#e4e0d8";
var FONTS = [
	"Source Sans 3",
	"Fraunces",
	"Newsreader",
	"Syne",
	"Space Grotesk",
	"Outfit",
	"JetBrains Mono"
];
var FONT_STACK = {
	"Source Sans 3": "\"Source Sans 3\", ui-sans-serif, sans-serif",
	Fraunces: "Fraunces, Georgia, \"Times New Roman\", serif",
	Newsreader: "Newsreader, Georgia, serif",
	Syne: "Syne, \"Source Sans 3\", ui-sans-serif, sans-serif",
	"Space Grotesk": "\"Space Grotesk\", ui-sans-serif, sans-serif",
	Outfit: "Outfit, ui-sans-serif, sans-serif",
	"JetBrains Mono": "\"JetBrains Mono\", ui-monospace, monospace"
};
var TYPE_LABEL = {
	heading: "Titre",
	text: "Texte",
	experience: "Expérience",
	education: "Formation",
	skills: "Compétences",
	meters: "Niveaux",
	photo: "Photo",
	rect: "Rectangle",
	ellipse: "Ellipse",
	rule: "Trait",
	contact: "Contact"
};
function baseStyle(over = {}) {
	return {
		fontFamily: "Source Sans 3",
		fontSize: 13,
		fontWeight: 400,
		italic: false,
		color: INK,
		textAlign: "left",
		lineHeight: 1.45,
		letterSpacing: 0,
		backgroundColor: "transparent",
		borderRadius: 0,
		borderWidth: 0,
		borderColor: INK,
		opacity: 1,
		padding: 0,
		...over
	};
}
function snippet(el) {
	const c = el.content;
	if (el.type === "heading" || el.type === "text" || el.type === "contact") return c.text || TYPE_LABEL[el.type];
	if (el.type === "experience") return c.role || "Expérience";
	if (el.type === "education") return c.degree || "Formation";
	if (el.type === "skills") return c.items?.[0] || "Compétences";
	if (el.type === "meters") return c.meters?.[0]?.label || "Niveaux";
	return TYPE_LABEL[el.type];
}
function withAlpha(hex, alpha) {
	const h = hex.replace("#", "");
	if (h.length !== 6) return hex;
	const r = Number.parseInt(h.slice(0, 2), 16);
	const g = Number.parseInt(h.slice(2, 4), 16);
	const b = Number.parseInt(h.slice(4, 6), 16);
	if ([
		r,
		g,
		b
	].some((n) => Number.isNaN(n))) return hex;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$14 = "/app/applet/src/components/studio/ElementView.tsx";
var ICONS = {
	mail: Mail,
	phone: Phone,
	pin: MapPin,
	link: Link
};
var HANDLES = [
	{
		id: "nw",
		className: "-top-1.5 -left-1.5 cursor-nwse-resize"
	},
	{
		id: "n",
		className: "-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize"
	},
	{
		id: "ne",
		className: "-top-1.5 -right-1.5 cursor-nesw-resize"
	},
	{
		id: "e",
		className: "top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize"
	},
	{
		id: "se",
		className: "-right-1.5 -bottom-1.5 cursor-nwse-resize"
	},
	{
		id: "sw",
		className: "-bottom-1.5 -left-1.5 cursor-nesw-resize"
	},
	{
		id: "s",
		className: "-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize"
	},
	{
		id: "w",
		className: "top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize"
	}
];
function stack(family) {
	return FONT_STACK[family] ?? family;
}
function LiveText({ text, editing, className, style, onCommit }) {
	const ref = (0, import_react.useRef)(null);
	const seeded = (0, import_react.useRef)(false);
	(0, import_react.useLayoutEffect)(() => {
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
	if (!editing) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className,
		style,
		children: text
	}, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 67,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className,
		style,
		contentEditable: true,
		suppressContentEditableWarning: true,
		spellCheck: true,
		role: "textbox",
		onPointerDown: (event) => event.stopPropagation(),
		onBlur: (event) => onCommit(event.currentTarget.innerText.replace(/\u00a0/g, " ").replace(/\n$/, ""))
	}, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 74,
		columnNumber: 5
	}, this);
}
function ElementView({ el, selected, editing, chrome, onPointerDown, onDoubleClick, onChange, onResize, onUpload }) {
	const s = el.style;
	const color = s.color;
	const typeStyle = {
		fontFamily: stack(s.fontFamily),
		fontSize: s.fontSize,
		fontWeight: s.fontWeight,
		fontStyle: s.italic ? "italic" : "normal",
		color,
		textAlign: s.textAlign,
		lineHeight: s.lineHeight,
		letterSpacing: s.letterSpacing,
		padding: s.padding
	};
	const commit = (content) => onChange?.(content);
	let body = null;
	if (el.type === "heading" || el.type === "text") body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
		text: el.content.text ?? "",
		editing,
		className: "h-full w-full whitespace-pre-wrap break-words outline-none",
		style: typeStyle,
		onCommit: (text) => commit({ text })
	}, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 119,
		columnNumber: 7
	}, this);
	else if (el.type === "experience") {
		const c = el.content;
		body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-full w-full",
			style: typeStyle,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
						text: c.role ?? "",
						editing,
						className: "min-w-0 flex-1 font-semibold outline-none",
						style: { fontWeight: Math.max(s.fontWeight, 650) },
						onCommit: (role) => commit({ role })
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 132,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
						text: c.date ?? "",
						editing,
						className: "shrink-0 outline-none",
						style: {
							opacity: .62,
							fontWeight: 500
						},
						onCommit: (date) => commit({ date })
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 139,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 131,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
					text: c.company ?? "",
					editing,
					className: "outline-none",
					style: {
						opacity: .72,
						fontWeight: 600
					},
					onCommit: (company) => commit({ company })
				}, void 0, false, {
					fileName: _jsxFileName$14,
					lineNumber: 147,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
					text: c.desc ?? "",
					editing,
					className: "mt-1 whitespace-pre-wrap break-words outline-none",
					style: { opacity: .9 },
					onCommit: (desc) => commit({ desc })
				}, void 0, false, {
					fileName: _jsxFileName$14,
					lineNumber: 154,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$14,
			lineNumber: 130,
			columnNumber: 7
		}, this);
	} else if (el.type === "education") {
		const c = el.content;
		body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-full w-full",
			style: typeStyle,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
					text: c.degree ?? "",
					editing,
					className: "min-w-0 flex-1 outline-none",
					style: { fontWeight: Math.max(s.fontWeight, 650) },
					onCommit: (degree) => commit({ degree })
				}, void 0, false, {
					fileName: _jsxFileName$14,
					lineNumber: 168,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
					text: c.date ?? "",
					editing,
					className: "shrink-0 outline-none",
					style: { opacity: .62 },
					onCommit: (date) => commit({ date })
				}, void 0, false, {
					fileName: _jsxFileName$14,
					lineNumber: 175,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 167,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
				text: c.school ?? "",
				editing,
				className: "outline-none",
				style: { opacity: .72 },
				onCommit: (school) => commit({ school })
			}, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 183,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$14,
			lineNumber: 166,
			columnNumber: 7
		}, this);
	} else if (el.type === "skills") {
		const justify = s.textAlign === "center" ? "center" : s.textAlign === "right" ? "flex-end" : "flex-start";
		body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-full w-full flex-wrap content-start gap-1.5",
			style: {
				...typeStyle,
				justifyContent: justify
			},
			children: (el.content.items ?? []).map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "inline-flex items-center rounded-full border px-2.5 py-1 leading-none",
				style: {
					borderColor: withAlpha(color, .35),
					background: withAlpha(color, .06)
				},
				children: item
			}, `${item}-${index}`, false, {
				fileName: _jsxFileName$14,
				lineNumber: 197,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 195,
			columnNumber: 7
		}, this);
	} else if (el.type === "meters") {
		const wide = el.w >= 480;
		body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: wide ? "grid h-full grid-cols-3 gap-x-6 gap-y-2" : "flex h-full flex-col justify-center gap-2",
			style: typeStyle,
			children: (el.content.meters ?? []).map((meter, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-1 flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "truncate",
						children: meter.label
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 214,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						style: { opacity: .55 },
						children: meter.value
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 215,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 213,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-1.5 overflow-hidden rounded-full",
					style: { background: withAlpha(color, .16) },
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-full rounded-full",
						style: {
							width: `${Math.max(0, Math.min(100, meter.value))}%`,
							background: color
						}
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 218,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$14,
					lineNumber: 217,
					columnNumber: 13
				}, this)]
			}, `${meter.label}-${index}`, true, {
				fileName: _jsxFileName$14,
				lineNumber: 212,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 210,
			columnNumber: 7
		}, this);
	} else if (el.type === "contact") {
		const Icon = ICONS[el.content.icon || "mail"] ?? Mail;
		const justify = s.textAlign === "center" ? "center" : s.textAlign === "right" ? "flex-end" : "flex-start";
		body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-full w-full items-center gap-2",
			style: {
				...typeStyle,
				justifyContent: justify
			},
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
				size: Math.max(12, s.fontSize),
				strokeWidth: 1.75,
				className: "shrink-0",
				"aria-hidden": true
			}, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 229,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
				text: el.content.text ?? "",
				editing,
				className: "min-w-0 outline-none",
				style: {
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis"
				},
				onCommit: (text) => commit({ text })
			}, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 230,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$14,
			lineNumber: 228,
			columnNumber: 7
		}, this);
	} else if (el.type === "photo") body = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative h-full w-full",
		children: [el.content.src ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			src: el.content.src,
			alt: "",
			className: "h-full w-full object-cover",
			draggable: false
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 243,
			columnNumber: 11
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-full w-full flex-col items-center justify-center gap-1 text-mute",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-medium",
				children: "Photo"
			}, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 246,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 245,
			columnNumber: 11
		}, this), chrome && selected && /* @__PURE__ */ (void 0)("label", {
			className: "no-export absolute inset-x-2 bottom-2 flex h-7 cursor-pointer items-center justify-center rounded-md bg-slate-900/90 text-[11px] font-medium text-white",
			children: ["Importer", /* @__PURE__ */ (void 0)("input", {
				type: "file",
				accept: "image/*",
				className: "hidden",
				onPointerDown: (event) => event.stopPropagation(),
				onChange: (event) => {
					const file = event.target.files?.[0];
					if (file) onUpload?.(file);
					event.target.value = "";
				}
			}, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 252,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$14,
			lineNumber: 250,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$14,
		lineNumber: 241,
		columnNumber: 7
	}, this);
	const radius = el.type === "ellipse" ? 9999 : s.borderRadius;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		"data-element": el.id,
		className: cn(el.locked ? "absolute" : "absolute touch-none", chrome && !selected && !el.locked && "hover:ring-1 hover:ring-blue-500/35 rounded-2xs transition-shadow"),
		style: {
			left: el.x,
			top: el.y,
			width: el.w,
			height: el.h,
			zIndex: el.z,
			transform: `rotate(${el.rotation}deg)`,
			transformOrigin: "center center",
			opacity: s.opacity
		},
		onPointerDown,
		onDoubleClick: (event) => {
			event.stopPropagation();
			onDoubleClick?.();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: cn("h-full w-full", [
					"photo",
					"rect",
					"ellipse",
					"rule"
				].includes(el.type) ? "overflow-hidden" : "overflow-visible"),
				style: {
					background: s.backgroundColor,
					borderRadius: radius,
					border: s.borderWidth ? `${s.borderWidth}px solid ${s.borderColor}` : void 0,
					boxSizing: "border-box"
				},
				children: body
			}, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 294,
				columnNumber: 7
			}, this),
			chrome && selected && !el.locked && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", { className: "pointer-events-none absolute inset-0 ring-1.5 ring-signal rounded-2xs" }, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 312,
				columnNumber: 11
			}, this), HANDLES.map((handle) => /* @__PURE__ */ (void 0)("div", {
				role: "button",
				"aria-label": `Redimensionner ${handle.id}`,
				className: `no-export absolute z-10 size-2.5 rounded-full border-1.5 border-signal bg-white shadow-2xs ${handle.className}`,
				onPointerDown: (event) => {
					event.stopPropagation();
					onResize?.(handle.id, event);
				}
			}, handle.id, false, {
				fileName: _jsxFileName$14,
				lineNumber: 314,
				columnNumber: 13
			}, this))] }, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 311,
				columnNumber: 9
			}, this),
			chrome && selected && el.locked && /* @__PURE__ */ (void 0)("div", { className: "pointer-events-none absolute inset-0 border border-dashed border-amber-500" }, void 0, false, {
				fileName: _jsxFileName$14,
				lineNumber: 328,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$14,
		lineNumber: 272,
		columnNumber: 5
	}, this);
}
var _jsxFileName$13 = "/app/applet/src/components/studio/PageSheet.tsx";
function PageSheet({ page, interactive, exportSheetId, selectedIds, editingId, showGrid, showMargins, guides, marquee, onSheetPointerDown, onElementPointerDown, onDoubleClick, onChange, onResize, onRotate, onUpload }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-white shadow-2xl ring-1 ring-slate-900/10 relative overflow-hidden",
		"data-sheet": exportSheetId ? void 0 : page.id,
		"data-export-sheet": exportSheetId,
		style: {
			width: 794,
			height: PAGE_H,
			backgroundColor: "#ffffff"
		},
		onPointerDown: interactive ? onSheetPointerDown : void 0,
		children: [
			showGrid && interactive && /* @__PURE__ */ (void 0)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute inset-0",
				style: {
					backgroundImage: "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
					backgroundSize: "32px 32px",
					opacity: .55
				}
			}, void 0, false, {
				fileName: _jsxFileName$13,
				lineNumber: 55,
				columnNumber: 9
			}, this),
			showMargins && interactive && /* @__PURE__ */ (void 0)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute inset-9 border border-dashed border-line"
			}, void 0, false, {
				fileName: _jsxFileName$13,
				lineNumber: 66,
				columnNumber: 38
			}, this),
			page.elements.filter((el) => !el.hidden).map((el) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ElementView, {
				el,
				selected: interactive && selectedIds.includes(el.id),
				editing: interactive && editingId === el.id,
				chrome: interactive,
				onPointerDown: interactive ? (event) => onElementPointerDown?.(event, el) : void 0,
				onDoubleClick: interactive ? () => onDoubleClick?.(el.id) : void 0,
				onChange: interactive ? (content) => onChange?.(el.id, content) : void 0,
				onResize: interactive ? (handle, event) => onResize?.(el.id, handle, event) : void 0,
				onRotate: interactive ? (event) => onRotate?.(el.id, event) : void 0,
				onUpload: interactive ? (file) => onUpload?.(el.id, file) : void 0
			}, el.id, false, {
				fileName: _jsxFileName$13,
				lineNumber: 70,
				columnNumber: 11
			}, this)),
			guides.x.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-signal",
				style: { left: x }
			}, `x-${x}`, false, {
				fileName: _jsxFileName$13,
				lineNumber: 85,
				columnNumber: 9
			}, this)),
			guides.y.map((y) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute right-0 left-0 z-40 h-px bg-signal",
				style: { top: y }
			}, `y-${y}`, false, {
				fileName: _jsxFileName$13,
				lineNumber: 88,
				columnNumber: 9
			}, this)),
			marquee && /* @__PURE__ */ (void 0)("div", {
				className: "no-export pointer-events-none absolute z-40 border border-dashed border-signal bg-signal/10",
				style: {
					left: marquee.x,
					top: marquee.y,
					width: marquee.w,
					height: marquee.h
				}
			}, void 0, false, {
				fileName: _jsxFileName$13,
				lineNumber: 91,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$13,
		lineNumber: 47,
		columnNumber: 5
	}, this);
}
/**
* Reads and optimizes an image file for CV use.
* Automatically resizes large camera photos (e.g. 10MB+) to crisp avatar dimensions (max 520px)
* and applies progressive compression so the base64 string stays under ~60-80 KB,
* preventing any localStorage saturation.
*/
function readImage(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, 520 / Math.max(img.width, img.height));
			const w = Math.max(1, Math.round(img.width * scale));
			const h = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("Impossible de créer le contexte canvas"));
				return;
			}
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = "high";
			ctx.drawImage(img, 0, 0, w, h);
			URL.revokeObjectURL(url);
			try {
				const webpData = canvas.toDataURL("image/webp", .8);
				if (webpData.startsWith("data:image/webp") && webpData.length < 15e4) {
					resolve(webpData);
					return;
				}
			} catch {}
			resolve(canvas.toDataURL("image/jpeg", .78));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Fichier image illisible"));
		};
		img.src = url;
	});
}
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function intersects(a, b) {
	return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function clientToSheet(clientX, clientY, sheet) {
	const r = sheet.getBoundingClientRect();
	return {
		x: (clientX - r.left) / r.width * 794,
		y: (clientY - r.top) / r.height * PAGE_H
	};
}
function snapMove(box, dx, dy, others, opts) {
	let x = box.x + dx;
	let y = box.y + dy;
	const vx = [];
	const hy = [];
	const threshold = 5;
	if (opts.guides) {
		const vLines = [
			0,
			36,
			397,
			758,
			794
		];
		const hLines = [
			0,
			36,
			PAGE_H / 2,
			PAGE_H - 36,
			PAGE_H
		];
		for (const o of others) {
			vLines.push(o.x, o.x + o.w / 2, o.x + o.w);
			hLines.push(o.y, o.y + o.h / 2, o.y + o.h);
		}
		let bestX = null;
		for (const line of vLines) for (const anchor of [
			0,
			box.w / 2,
			box.w
		]) {
			const dist = Math.abs(x + anchor - line);
			if (dist <= threshold && (!bestX || dist < bestX.dist)) bestX = {
				dist,
				next: line - anchor,
				line
			};
		}
		let bestY = null;
		for (const line of hLines) for (const anchor of [
			0,
			box.h / 2,
			box.h
		]) {
			const dist = Math.abs(y + anchor - line);
			if (dist <= threshold && (!bestY || dist < bestY.dist)) bestY = {
				dist,
				next: line - anchor,
				line
			};
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
		x = Math.round(x / 8) * 8;
		dx = x - box.x;
	}
	if (opts.grid && hy.length === 0) {
		y = Math.round(y / 8) * 8;
		dy = y - box.y;
	}
	return {
		dx,
		dy,
		vx,
		hy
	};
}
function resizeBox(orig, handle, pageDx, pageDy, rotation, lockRatio) {
	const rad = -rotation * Math.PI / 180;
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
	const ncx = cx + sx * (w - orig.w) / 2;
	const ncy = cy + sy * (h - orig.h) / 2;
	return {
		x: Math.round(ncx - w / 2),
		y: Math.round(ncy - h / 2),
		w: Math.round(w),
		h: Math.round(h)
	};
}
function normRotation(deg) {
	let d = Math.round(deg);
	d %= 360;
	if (d > 180) d -= 360;
	if (d < -180) d += 360;
	return d;
}
var SAMPLE = {
	name: "Alexandra Dubois",
	role: "Product Designer Senior",
	email: "alexandra.dubois@email.com",
	phone: "+33 6 12 34 56 78",
	location: "Paris, France",
	link: "linkedin.com/in/alexandra",
	summary: "Designer produit avec 8 ans d'expérience. Design systems, recherche et prototypes haute fidélité — je cherche le point où une interface devient évidente.",
	experiences: [
		{
			role: "Lead Product Designer",
			company: "Mira Studio — Paris",
			date: "2021 — Aujourd'hui",
			desc: "Équipe de 6 designers. Refonte de la plateforme SaaS, +34 % de rétention. Design system utilisé par une quarantaine de produits."
		},
		{
			role: "Senior UI/UX Designer",
			company: "Atelier Noir — Lyon",
			date: "2018 — 2021",
			desc: "Applications pour des maisons de luxe et des institutions. Direction artistique sur douze projets, prix Design Lumen 2020."
		},
		{
			role: "UI Designer",
			company: "Indépendante",
			date: "2015 — 2018",
			desc: "Startups early-stage, de la fintech à l'éducation. Une trentaine de produits accompagnés jusqu'au lancement."
		}
	],
	educations: [{
		degree: "Master Design d'interaction",
		school: "ENSAD Paris",
		date: "2013 — 2015"
	}, {
		degree: "Bachelor Arts appliqués",
		school: "École Boulle",
		date: "2010 — 2013"
	}],
	skills: [
		"Figma",
		"Design system",
		"Recherche",
		"Prototypage",
		"Direction artistique",
		"HTML / CSS"
	],
	languages: [
		{
			label: "Français",
			value: 100
		},
		{
			label: "Anglais",
			value: 90
		},
		{
			label: "Espagnol",
			value: 60
		}
	]
};
function computeElementAutoHeight(el, minH) {
	const fs = el.style.fontSize || 13;
	const lh = el.style.lineHeight || 1.4;
	const pad = (el.style.padding || 0) * 2;
	const availW = Math.max(140, el.w - pad);
	const charW = fs * .51;
	const charsPerLine = Math.max(18, Math.floor(availW / charW));
	const linePx = fs * lh;
	if (el.type === "experience") {
		const roleText = `${el.content.role ?? ""} ${el.content.date ?? ""}`.trim();
		const roleLines = Math.max(1, Math.ceil((roleText.length + 3) / charsPerLine));
		const companyLines = Math.max(1, Math.ceil(((el.content.company ?? "").length || 1) / charsPerLine));
		const desc = el.content.desc ?? "";
		const descLines = desc ? desc.split("\n").reduce((sum, line) => sum + Math.max(1, Math.ceil(Math.max(1, line.trim().length) / charsPerLine)), 0) : 1;
		const needed = Math.ceil((roleLines + companyLines + descLines) * linePx + pad + 12);
		const baseMin = minH ?? (el.w < 400 ? 136 : 104);
		return Math.max(baseMin, needed);
	}
	if (el.type === "education") {
		const degText = `${el.content.degree ?? ""} ${el.content.date ?? ""}`.trim();
		const degLines = Math.max(1, Math.ceil((degText.length + 3) / charsPerLine));
		const schoolLines = Math.max(1, Math.ceil(((el.content.school ?? "").length || 1) / charsPerLine));
		const needed = Math.ceil((degLines + schoolLines) * linePx + pad + 8);
		return Math.max(minH ?? 44, needed);
	}
	if (el.type === "text" || el.type === "heading") {
		const text = el.content.text ?? "";
		const lines = text ? text.split("\n").reduce((sum, line) => sum + Math.max(1, Math.ceil(Math.max(1, line.trim().length) / charsPerLine)), 0) : 1;
		const needed = Math.ceil(lines * linePx + pad + 8);
		const defaultMin = el.type === "heading" ? 20 : el.bind?.kind === "summary" ? 48 : 22;
		return Math.max(minH ?? defaultMin, needed);
	}
	if (el.type === "skills") {
		const items = el.content.items ?? [];
		let rowW = 0;
		let rows = 1;
		for (const item of items) {
			const pillW = Math.min(availW, item.length * fs * .56 + 26);
			if (rowW > 0 && rowW + pillW + 6 > availW) {
				rows += 1;
				rowW = pillW;
			} else rowW += (rowW > 0 ? 6 : 0) + pillW;
		}
		return Math.max(minH ?? 52, rows * 28 + pad + 8);
	}
	if (el.type === "meters") {
		const meters = el.content.meters ?? [];
		const wide = el.w >= 480;
		const rows = Math.max(1, wide ? Math.ceil(meters.length / 3) : meters.length);
		return Math.max(minH ?? 60, rows * 34 + pad + 8);
	}
	return el.h;
}
var TEMPLATE_ID_RE$2 = /^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-\d+$|^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-/;
function isFreeStudioEl(el) {
	if (el.type === "photo" && Boolean(el.content.src)) return true;
	if (!el.bind && !TEMPLATE_ID_RE$2.test(el.id)) return true;
	return false;
}
function resizeElementWithFlow(page, elId, nextH) {
	const target = page.elements.find((e) => e.id === elId);
	if (!target) return page;
	const dh = nextH - target.h;
	if (Math.abs(dh) < 2) return page;
	const isBelowInColumn = (other) => {
		if (other.id === target.id) return false;
		if (isFreeStudioEl(other)) return false;
		if ((other.type === "rect" || other.type === "rule" || other.type === "ellipse") && (other.h > 200 || other.y < 180)) return false;
		if (other.y >= 1e3 && (other.type === "rect" || other.type === "text" && !other.bind && (other.style.color === "#b7b1a6" || other.style.color === "#f6f3ec"))) return false;
		if (Math.min(target.x + target.w, other.x + other.w) - Math.max(target.x, other.x) <= 32) return false;
		return other.y > target.y + 8;
	};
	return {
		...page,
		elements: page.elements.map((el) => {
			if (el.id === target.id) return {
				...el,
				h: nextH
			};
			if (isBelowInColumn(el)) return {
				...el,
				y: Math.max(24, el.y + dh)
			};
			return el;
		})
	};
}
function syncProfile(profile, bind, content) {
	if (!bind) return profile;
	const next = {
		...profile,
		experiences: profile.experiences.map((e) => ({ ...e })),
		educations: profile.educations.map((e) => ({ ...e })),
		skills: [...profile.skills],
		languages: profile.languages.map((e) => ({ ...e }))
	};
	if (bind.kind === "name" && content.text != null) next.name = content.text;
	if (bind.kind === "role" && content.text != null) next.role = content.text.replace(/^—\s+/, "");
	if (bind.kind === "summary" && content.text != null) next.summary = content.text;
	if (bind.kind === "contact" && content.text != null) next[bind.field] = content.text;
	if (bind.kind === "experience") {
		const cur = next.experiences[bind.index];
		if (cur) next.experiences[bind.index] = {
			role: content.role ?? cur.role,
			company: content.company ?? cur.company,
			date: content.date ?? cur.date,
			desc: content.desc ?? cur.desc
		};
	}
	if (bind.kind === "education") {
		const cur = next.educations[bind.index];
		if (cur) next.educations[bind.index] = {
			degree: content.degree ?? cur.degree,
			school: content.school ?? cur.school,
			date: content.date ?? cur.date
		};
	}
	if (bind.kind === "skills" && content.items) next.skills = [...content.items];
	if (bind.kind === "languages" && content.meters) next.languages = content.meters.map((m) => ({ ...m }));
	return next;
}
function applyIdentity(doc, field, value) {
	const profile = {
		...doc.profile,
		[field]: value
	};
	const pages = doc.pages.map((page) => {
		let resizedIds = [];
		const elements = page.elements.map((el) => {
			const bind = el.bind;
			if (!bind) return el;
			if (bind.kind === "name" && field === "name") return {
				...el,
				content: {
					...el.content,
					text: value
				}
			};
			if (bind.kind === "summary" && field === "summary") {
				const updated = {
					...el,
					content: {
						...el.content,
						text: value
					}
				};
				const nextH = computeElementAutoHeight(updated, 54);
				if (Math.abs(nextH - el.h) >= 2) resizedIds.push({
					id: el.id,
					nextH
				});
				return updated;
			}
			if (bind.kind === "role" && field === "role") {
				const current = el.content.text ?? "";
				const hasDash = current.startsWith("—  ");
				const rawCurrent = hasDash ? current.slice(3) : current;
				const formatted = rawCurrent === rawCurrent.toUpperCase() && rawCurrent !== rawCurrent.toLowerCase() ? value.toUpperCase() : value;
				return {
					...el,
					content: {
						...el.content,
						text: hasDash ? `—  ${formatted}` : formatted
					}
				};
			}
			if (bind.kind === "contact" && bind.field === field) return {
				...el,
				content: {
					...el.content,
					text: value
				}
			};
			return el;
		});
		let nextPage = {
			...page,
			elements
		};
		for (const item of resizedIds) nextPage = resizeElementWithFlow(nextPage, item.id, item.nextH);
		return nextPage;
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyExperienceUpdate(doc, index, patch) {
	const cur = doc.profile.experiences[index];
	if (!cur) return doc;
	const updatedExp = {
		...cur,
		...patch
	};
	const experiences = doc.profile.experiences.map((exp, i) => i === index ? updatedExp : exp);
	const profile = {
		...doc.profile,
		experiences
	};
	const pages = doc.pages.map((page) => {
		const toResize = [];
		const elements = page.elements.map((el) => {
			if (el.bind?.kind === "experience" && el.bind.index === index) {
				const updatedEl = {
					...el,
					content: {
						...el.content,
						role: updatedExp.role,
						company: updatedExp.company,
						date: updatedExp.date,
						desc: updatedExp.desc
					}
				};
				const nextH = computeElementAutoHeight(updatedEl);
				if (Math.abs(nextH - el.h) >= 2) toResize.push({
					id: el.id,
					nextH
				});
				return updatedEl;
			}
			return el;
		});
		let nextPage = {
			...page,
			elements
		};
		for (const r of toResize) nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
		return nextPage;
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyExperienceAdd(doc, activePageId, entry) {
	const newExp = entry ?? {
		role: "Nouveau poste",
		company: "Entreprise — Ville",
		date: "2024 — Présent",
		desc: "Principales réalisations et résultats obtenus."
	};
	const newIndex = doc.profile.experiences.length;
	const profile = {
		...doc.profile,
		experiences: [...doc.profile.experiences, newExp]
	};
	let hostPageId = doc.pages.some((p) => p.id === activePageId) ? activePageId : doc.pages[0].id;
	let bestExpIdx = -1;
	for (const p of doc.pages) for (const el of p.elements) if (el.bind?.kind === "experience" && el.bind.index > bestExpIdx) {
		bestExpIdx = el.bind.index;
		hostPageId = p.id;
	}
	const pages = doc.pages.map((page) => {
		if (page.id !== hostPageId) return page;
		const expElements = page.elements.filter((el) => el.type === "experience");
		const lastExp = expElements.length ? expElements.reduce((a, b) => a.y + a.h >= b.y + b.h ? a : b) : null;
		const x = lastExp ? lastExp.x : 40;
		const w = lastExp ? lastExp.w : 714;
		const style = lastExp ? { ...lastExp.style } : baseStyle({
			fontSize: 13,
			color: INK,
			lineHeight: 1.4
		});
		const gap = 12;
		const y = lastExp ? lastExp.y + lastExp.h + gap : Math.min(PAGE_H - 120, page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48) + 16);
		const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
		const draftEl = {
			id: uid(),
			type: "experience",
			x,
			y,
			w,
			h: lastExp ? Math.min(120, Math.max(96, lastExp.h)) : 104,
			rotation: 0,
			z: maxZ,
			locked: false,
			hidden: false,
			bind: {
				kind: "experience",
				index: newIndex
			},
			content: { ...newExp },
			style
		};
		const h = computeElementAutoHeight(draftEl);
		const newEl = {
			...draftEl,
			h
		};
		const shiftedElements = lastExp ? page.elements.map((el) => {
			if (isFreeStudioEl(el)) return el;
			if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return el;
			if (el.y >= 990 && (el.type === "rect" || !el.bind && el.w >= 450)) return el;
			if (Math.min(x + w, el.x + el.w) - Math.max(x, el.x) > 32 && el.y > lastExp.y + 8) return {
				...el,
				y: el.y + h + gap
			};
			return el;
		}) : page.elements;
		return {
			...page,
			elements: [...shiftedElements, newEl]
		};
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyExperienceRemove(doc, index) {
	if (index < 0 || index >= doc.profile.experiences.length) return doc;
	const profile = {
		...doc.profile,
		experiences: doc.profile.experiences.filter((_, i) => i !== index)
	};
	const pages = doc.pages.map((page) => {
		const removed = page.elements.find((el) => el.bind?.kind === "experience" && el.bind.index === index);
		const remaining = page.elements.filter((el) => !(el.bind?.kind === "experience" && el.bind.index === index)).map((el) => {
			let nextEl = el;
			if (el.bind?.kind === "experience" && el.bind.index > index) nextEl = {
				...nextEl,
				bind: {
					kind: "experience",
					index: el.bind.index - 1
				}
			};
			if (removed && !isFreeStudioEl(el)) {
				if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return nextEl;
				if (el.y >= 990 && (el.type === "rect" || !el.bind && el.w >= 450)) return nextEl;
				if (Math.min(removed.x + removed.w, el.x + el.w) - Math.max(removed.x, el.x) > 32 && el.y > removed.y + 8) return {
					...nextEl,
					y: Math.max(24, nextEl.y - (removed.h + 12))
				};
			}
			return nextEl;
		});
		return {
			...page,
			elements: remaining
		};
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyEducationUpdate(doc, index, patch) {
	const cur = doc.profile.educations[index];
	if (!cur) return doc;
	const updatedEdu = {
		...cur,
		...patch
	};
	const educations = doc.profile.educations.map((edu, i) => i === index ? updatedEdu : edu);
	const profile = {
		...doc.profile,
		educations
	};
	const pages = doc.pages.map((page) => {
		const toResize = [];
		const elements = page.elements.map((el) => {
			if (el.bind?.kind === "education" && el.bind.index === index) {
				const updatedEl = {
					...el,
					content: {
						...el.content,
						degree: updatedEdu.degree,
						school: updatedEdu.school,
						date: updatedEdu.date
					}
				};
				const nextH = computeElementAutoHeight(updatedEl, 44);
				if (Math.abs(nextH - el.h) >= 2) toResize.push({
					id: el.id,
					nextH
				});
				return updatedEl;
			}
			return el;
		});
		let nextPage = {
			...page,
			elements
		};
		for (const r of toResize) nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
		return nextPage;
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyEducationAdd(doc, activePageId, entry) {
	const newEdu = entry ?? {
		degree: "Diplôme",
		school: "École / Université",
		date: "2020 — 2023"
	};
	const newIndex = doc.profile.educations.length;
	const profile = {
		...doc.profile,
		educations: [...doc.profile.educations, newEdu]
	};
	let hostPageId = doc.pages.some((p) => p.id === activePageId) ? activePageId : doc.pages[0].id;
	let bestEduIdx = -1;
	for (const p of doc.pages) for (const el of p.elements) if (el.bind?.kind === "education" && el.bind.index > bestEduIdx) {
		bestEduIdx = el.bind.index;
		hostPageId = p.id;
	}
	const pages = doc.pages.map((page) => {
		if (page.id !== hostPageId) return page;
		const eduElements = page.elements.filter((el) => el.type === "education");
		const lastEdu = eduElements.length ? eduElements.reduce((a, b) => a.y + a.h >= b.y + b.h ? a : b) : null;
		const x = lastEdu ? lastEdu.x : 40;
		const w = lastEdu ? lastEdu.w : 714;
		const h = 44;
		const gap = 8;
		const y = lastEdu ? lastEdu.y + lastEdu.h + gap : Math.min(PAGE_H - 80, page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48) + 16);
		const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
		const style = lastEdu ? { ...lastEdu.style } : baseStyle({
			fontSize: 13,
			color: INK
		});
		const newEl = {
			id: uid(),
			type: "education",
			x,
			y,
			w,
			h,
			rotation: 0,
			z: maxZ,
			locked: false,
			hidden: false,
			bind: {
				kind: "education",
				index: newIndex
			},
			content: { ...newEdu },
			style
		};
		const shiftedElements = lastEdu ? page.elements.map((el) => {
			if (isFreeStudioEl(el)) return el;
			if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return el;
			if (el.y >= 990 && (el.type === "rect" || !el.bind && el.w >= 450)) return el;
			if (Math.min(x + w, el.x + el.w) - Math.max(x, el.x) > 32 && el.y > lastEdu.y + 8) return {
				...el,
				y: el.y + h + gap
			};
			return el;
		}) : page.elements;
		return {
			...page,
			elements: [...shiftedElements, newEl]
		};
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyEducationRemove(doc, index) {
	if (index < 0 || index >= doc.profile.educations.length) return doc;
	const profile = {
		...doc.profile,
		educations: doc.profile.educations.filter((_, i) => i !== index)
	};
	const pages = doc.pages.map((page) => {
		const removed = page.elements.find((el) => el.bind?.kind === "education" && el.bind.index === index);
		const remaining = page.elements.filter((el) => !(el.bind?.kind === "education" && el.bind.index === index)).map((el) => {
			let nextEl = el;
			if (el.bind?.kind === "education" && el.bind.index > index) nextEl = {
				...nextEl,
				bind: {
					kind: "education",
					index: el.bind.index - 1
				}
			};
			if (removed && !isFreeStudioEl(el)) {
				if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return nextEl;
				if (el.y >= 990 && (el.type === "rect" || !el.bind && el.w >= 450)) return nextEl;
				if (Math.min(removed.x + removed.w, el.x + el.w) - Math.max(removed.x, el.x) > 32 && el.y > removed.y + 8) return {
					...nextEl,
					y: Math.max(24, nextEl.y - (removed.h + 8))
				};
			}
			return nextEl;
		});
		return {
			...page,
			elements: remaining
		};
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applySkillsUpdate(doc, skills) {
	const profile = {
		...doc.profile,
		skills: [...skills]
	};
	const pages = doc.pages.map((page) => {
		const toResize = [];
		const elements = page.elements.map((el) => {
			if (el.bind?.kind === "skills") {
				const updatedEl = {
					...el,
					content: {
						...el.content,
						items: [...skills]
					}
				};
				const nextH = computeElementAutoHeight(updatedEl, 52);
				if (Math.abs(nextH - el.h) >= 2) toResize.push({
					id: el.id,
					nextH
				});
				return updatedEl;
			}
			return el;
		});
		let nextPage = {
			...page,
			elements
		};
		for (const r of toResize) nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
		return nextPage;
	});
	return {
		...doc,
		profile,
		pages
	};
}
function applyLanguagesUpdate(doc, languages) {
	const profile = {
		...doc.profile,
		languages: languages.map((l) => ({ ...l }))
	};
	const pages = doc.pages.map((page) => {
		const toResize = [];
		const elements = page.elements.map((el) => {
			if (el.bind?.kind === "languages") {
				const updatedEl = {
					...el,
					content: {
						...el.content,
						meters: languages.map((l) => ({ ...l }))
					}
				};
				const nextH = computeElementAutoHeight(updatedEl, 60);
				if (Math.abs(nextH - el.h) >= 2) toResize.push({
					id: el.id,
					nextH
				});
				return updatedEl;
			}
			return el;
		});
		let nextPage = {
			...page,
			elements
		};
		for (const r of toResize) nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
		return nextPage;
	});
	return {
		...doc,
		profile,
		pages
	};
}
function syncBoundElementsFromProfile(doc, preserveCustomGeometry = false) {
	const p = doc.profile;
	const pages = doc.pages.map((page) => {
		const toResize = [];
		const elements = page.elements.map((el) => {
			const bind = el.bind;
			if (!bind) return el;
			if (bind.kind === "name") return {
				...el,
				content: {
					...el.content,
					text: p.name
				}
			};
			if (bind.kind === "summary") {
				const textChanged = el.content.text !== p.summary;
				const updated = {
					...el,
					content: {
						...el.content,
						text: p.summary
					}
				};
				if (!preserveCustomGeometry || textChanged) {
					const nextH = computeElementAutoHeight(updated, 54);
					if (Math.abs(nextH - el.h) >= 2) toResize.push({
						id: el.id,
						nextH
					});
				}
				return updated;
			}
			if (bind.kind === "role") {
				const current = el.content.text ?? "";
				const hasDash = current.startsWith("—  ");
				const rawCurrent = hasDash ? current.slice(3) : current;
				const formatted = rawCurrent === rawCurrent.toUpperCase() && rawCurrent !== rawCurrent.toLowerCase() ? p.role.toUpperCase() : p.role;
				return {
					...el,
					content: {
						...el.content,
						text: hasDash ? `—  ${formatted}` : formatted
					}
				};
			}
			if (bind.kind === "contact") return {
				...el,
				content: {
					...el.content,
					text: p[bind.field]
				}
			};
			if (bind.kind === "experience") {
				const exp = p.experiences[bind.index];
				if (!exp) return el;
				const expChanged = el.content.role !== exp.role || el.content.company !== exp.company || el.content.date !== exp.date || el.content.desc !== exp.desc;
				const updated = {
					...el,
					content: {
						...el.content,
						role: exp.role,
						company: exp.company,
						date: exp.date,
						desc: exp.desc
					}
				};
				if (!preserveCustomGeometry || expChanged) {
					const nextH = computeElementAutoHeight(updated);
					if (Math.abs(nextH - el.h) >= 2) toResize.push({
						id: el.id,
						nextH
					});
				}
				return updated;
			}
			if (bind.kind === "education") {
				const edu = p.educations[bind.index];
				if (!edu) return el;
				const eduChanged = el.content.degree !== edu.degree || el.content.school !== edu.school || el.content.date !== edu.date;
				const updated = {
					...el,
					content: {
						...el.content,
						degree: edu.degree,
						school: edu.school,
						date: edu.date
					}
				};
				if (!preserveCustomGeometry || eduChanged) {
					const nextH = computeElementAutoHeight(updated, 44);
					if (Math.abs(nextH - el.h) >= 2) toResize.push({
						id: el.id,
						nextH
					});
				}
				return updated;
			}
			if (bind.kind === "skills") return {
				...el,
				content: {
					...el.content,
					items: [...p.skills]
				}
			};
			if (bind.kind === "languages") return {
				...el,
				content: {
					...el.content,
					meters: p.languages.map((m) => ({ ...m }))
				}
			};
			return el;
		});
		let nextPage = {
			...page,
			elements
		};
		for (const r of toResize) nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
		return nextPage;
	});
	return {
		...doc,
		pages
	};
}
var SECTION = /^(exp[eé]riences?|parcours professionnel|parcours|formation|études|etudes|education|comp[eé]tences|skills|langues?|languages|profil|à propos|a propos|résumé|resume|summary|contact)\b/i;
function isSection(line) {
	return SECTION.test(line.trim());
}
function sectionBlocks(lines, test) {
	const start = lines.findIndex((l) => test.test(l.trim()));
	if (start === -1) return [];
	const out = [];
	for (let i = start + 1; i < lines.length; i++) {
		if (isSection(lines[i]) && lines[i].trim()) break;
		out.push(lines[i]);
	}
	const blocks = [];
	let cur = [];
	for (const line of out) if (!line.trim()) {
		if (cur.length) blocks.push(cur);
		cur = [];
	} else cur.push(line.trim());
	if (cur.length) blocks.push(cur);
	return blocks;
}
function readExperience(block) {
	if (!block.length) return null;
	const dateRe = /(\d{4}\s*[–—-]\s*(?:\d{4}|aujourd['’]hui|présent|present|actuel|en cours))/i;
	let date = "";
	const rest = [];
	for (const line of block) {
		const found = line.match(dateRe);
		if (found && !date) {
			date = found[1].replace(/\s+/g, " ");
			const leftover = line.replace(found[1], "").replace(/^[\s·•,|–—-]+|[\s·•,|–—-]+$/g, "");
			if (leftover) rest.push(leftover);
		} else rest.push(line);
	}
	const role = rest[0] || "Poste";
	const company = rest[1] || "";
	const desc = rest.slice(company ? 2 : 1).join(" ");
	return {
		role,
		company,
		date,
		desc
	};
}
function readEducation(block) {
	if (!block.length) return null;
	const dateRe = /(\d{4}\s*[–—-]\s*\d{4})/;
	let date = "";
	const rest = [];
	for (const line of block) {
		const found = line.match(dateRe);
		if (found && !date) {
			date = found[1];
			const leftover = line.replace(found[1], "").replace(/^[\s·•,|–—-]+|[\s·•,|–—-]+$/g, "");
			if (leftover) rest.push(leftover);
		} else rest.push(line);
	}
	return {
		degree: rest[0] || "Diplôme",
		school: rest[1] || "",
		date
	};
}
function languageValue(raw) {
	const num = raw.match(/(\d{1,3})\s*%?/);
	if (num) return Math.max(0, Math.min(100, Number(num[1])));
	const t = raw.toLowerCase();
	if (/natif|bilingue|maternel/.test(t)) return 100;
	if (/courant|professionnel|c1|c2/.test(t)) return 88;
	if (/intermédiaire|avance|b2|b1/.test(t)) return 65;
	if (/notion|débutant|scolaire|a1|a2/.test(t)) return 35;
	return 70;
}
function parseProfile(raw, base) {
	const text = raw.replace(/\t/g, " ").replace(/\r/g, "");
	if (!text.trim()) return base;
	const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? base.email;
	const phone = text.match(/(?:\+\d{1,3}[\s.]?)?(?:\(?\d{1,4}\)?[\s.]?){2,}\d{2,4}/)?.[0]?.trim() ?? base.phone;
	const link = (text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,)]+/i)?.[0] ?? base.link).replace(/^https?:\/\//, "");
	const lines = text.split("\n");
	const trimmed = lines.map((l) => l.trim()).filter(Boolean);
	const firstSection = trimmed.findIndex(isSection);
	const preamble = (firstSection === -1 ? trimmed : trimmed.slice(0, firstSection)).filter((l) => {
		if (l.includes("@")) return false;
		if (/linkedin/i.test(l)) return false;
		if (phone && l.includes(phone)) return false;
		return true;
	});
	const name = preamble[0] && preamble[0].length < 60 ? preamble[0] : base.name;
	const role = preamble[1] && preamble[1].length < 90 ? preamble[1] : base.role;
	const summary = preamble.slice(2).join(" ") || base.summary;
	const locLine = preamble.find((l, i) => i > 1 && l.length < 42 && /,/.test(l));
	const experiences = sectionBlocks(lines, /^(exp[eé]riences?|parcours)/i).map(readExperience).filter((e) => !!e && !!(e.role || e.desc));
	const educations = sectionBlocks(lines, /^(formation|études|etudes|education)/i).map(readEducation).filter((e) => !!e);
	const skills = sectionBlocks(lines, /^(comp[eé]tences|skills)/i).flat().flatMap((l) => l.split(/[,•|·]/)).map((s) => s.trim()).filter((s) => s.length > 1 && s.length < 40);
	const languages = sectionBlocks(lines, /^langues?|^languages/i).flat().flatMap((l) => l.split(/[,•|]/)).map((l) => l.trim()).filter(Boolean).map((l) => {
		const [label, ...rest] = l.split(/[:–—-]/);
		return {
			label: (label || l).trim(),
			value: languageValue(rest.join(" ") || l)
		};
	}).filter((l) => l.label.length < 32);
	return {
		name,
		role,
		email,
		phone,
		location: locLine || base.location,
		link,
		summary,
		experiences: experiences.length ? experiences : base.experiences,
		educations: educations.length ? educations : base.educations,
		skills: skills.length ? skills : base.skills,
		languages: languages.length ? languages : base.languages
	};
}
var DARK_MUTE = "#b7b1a6";
function builder(prefix) {
	let n = 0;
	return (draft) => {
		n += 1;
		return {
			id: `${prefix}-${n}`,
			type: draft.type,
			x: draft.x,
			y: draft.y,
			w: draft.w,
			h: draft.h,
			rotation: 0,
			z: draft.z,
			locked: false,
			hidden: false,
			bind: draft.bind,
			content: draft.content ?? {},
			style: baseStyle(draft.style)
		};
	};
}
function label(text, x, y, z, extra) {
	return {
		type: "heading",
		x,
		y,
		w: 240,
		h: 16,
		z,
		content: { text },
		style: {
			fontSize: 11,
			fontWeight: 700,
			letterSpacing: 1.8,
			color: INK,
			...extra
		}
	};
}
function experiences(p, x, y, w, h, gap, z, style) {
	return p.experiences.map((exp, i) => ({
		type: "experience",
		x,
		y: y + i * (h + gap),
		w,
		h,
		z: z + i,
		bind: {
			kind: "experience",
			index: i
		},
		content: { ...exp },
		style: {
			fontSize: 13,
			color: INK,
			lineHeight: 1.4,
			...style
		}
	}));
}
function educations(p, x, y, w, z, style) {
	return p.educations.map((edu, i) => ({
		type: "education",
		x,
		y: y + i * 50,
		w,
		h: 44,
		z: z + i,
		bind: {
			kind: "education",
			index: i
		},
		content: { ...edu },
		style: {
			fontSize: 13,
			color: INK,
			...style
		}
	}));
}
function modern(p, el) {
	return [
		el({
			type: "rect",
			x: 0,
			y: 0,
			w: 794,
			h: 162,
			z: 1,
			style: { backgroundColor: INK }
		}),
		el({
			type: "heading",
			x: 40,
			y: 38,
			w: 420,
			h: 52,
			z: 3,
			bind: { kind: "name" },
			content: { text: p.name },
			style: {
				fontFamily: "Fraunces",
				fontSize: 40,
				fontWeight: 600,
				color: CREAM,
				lineHeight: 1.05
			}
		}),
		el({
			type: "text",
			x: 40,
			y: 98,
			w: 420,
			h: 22,
			z: 4,
			bind: { kind: "role" },
			content: { text: p.role.toUpperCase() },
			style: {
				fontSize: 11,
				fontWeight: 600,
				color: DARK_MUTE,
				letterSpacing: 2.2
			}
		}),
		el({
			type: "contact",
			x: 470,
			y: 34,
			w: 284,
			h: 22,
			z: 5,
			bind: {
				kind: "contact",
				field: "email"
			},
			content: {
				icon: "mail",
				text: p.email
			},
			style: {
				fontSize: 12,
				color: CREAM
			}
		}),
		el({
			type: "contact",
			x: 470,
			y: 60,
			w: 284,
			h: 22,
			z: 6,
			bind: {
				kind: "contact",
				field: "phone"
			},
			content: {
				icon: "phone",
				text: p.phone
			},
			style: {
				fontSize: 12,
				color: CREAM
			}
		}),
		el({
			type: "contact",
			x: 470,
			y: 86,
			w: 284,
			h: 22,
			z: 7,
			bind: {
				kind: "contact",
				field: "location"
			},
			content: {
				icon: "pin",
				text: p.location
			},
			style: {
				fontSize: 12,
				color: CREAM
			}
		}),
		el({
			type: "contact",
			x: 470,
			y: 112,
			w: 284,
			h: 22,
			z: 8,
			bind: {
				kind: "contact",
				field: "link"
			},
			content: {
				icon: "link",
				text: p.link
			},
			style: {
				fontSize: 12,
				color: CREAM
			}
		}),
		el(label("PROFIL", 40, 188, 10)),
		el({
			type: "text",
			x: 40,
			y: 212,
			w: 714,
			h: 54,
			z: 11,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontSize: 13.5,
				lineHeight: 1.5,
				color: "#3a3632"
			}
		}),
		el({
			type: "rule",
			x: 40,
			y: 260,
			w: 714,
			h: 1,
			z: 12,
			style: { backgroundColor: HAIR }
		}),
		el(label("EXPÉRIENCE", 40, 280, 13)),
		...experiences(p, 40, 306, 714, 104, 12, 14).map(el),
		el(label("FORMATION", 40, 670, 20)),
		...educations(p, 40, 694, 714, 21).map(el),
		el(label("COMPÉTENCES", 40, 804, 30)),
		el({
			type: "skills",
			x: 40,
			y: 828,
			w: 714,
			h: 52,
			z: 31,
			bind: { kind: "skills" },
			content: { items: [...p.skills] },
			style: {
				fontSize: 12,
				color: INK
			}
		}),
		el(label("LANGUES", 40, 896, 32)),
		el({
			type: "meters",
			x: 40,
			y: 920,
			w: 714,
			h: 88,
			z: 33,
			bind: { kind: "languages" },
			content: { meters: p.languages.map((m) => ({ ...m })) },
			style: {
				fontSize: 12,
				color: INK
			}
		})
	];
}
function minimal(p, el) {
	return [
		el({
			type: "heading",
			x: 60,
			y: 56,
			w: 674,
			h: 52,
			z: 1,
			bind: { kind: "name" },
			content: { text: p.name },
			style: {
				fontFamily: "Fraunces",
				fontSize: 40,
				fontWeight: 500,
				textAlign: "center",
				lineHeight: 1.05
			}
		}),
		el({
			type: "text",
			x: 80,
			y: 116,
			w: 634,
			h: 20,
			z: 2,
			bind: { kind: "role" },
			content: { text: p.role.toUpperCase() },
			style: {
				fontSize: 12,
				fontWeight: 600,
				textAlign: "center",
				letterSpacing: 2.4,
				color: MUTE
			}
		}),
		el({
			type: "rule",
			x: 347,
			y: 152,
			w: 100,
			h: 1,
			z: 3,
			style: { backgroundColor: INK }
		}),
		el({
			type: "contact",
			x: 197,
			y: 172,
			w: 400,
			h: 20,
			z: 4,
			bind: {
				kind: "contact",
				field: "email"
			},
			content: {
				icon: "mail",
				text: p.email
			},
			style: {
				fontSize: 12,
				textAlign: "center",
				color: MUTE
			}
		}),
		el({
			type: "contact",
			x: 197,
			y: 194,
			w: 400,
			h: 20,
			z: 5,
			bind: {
				kind: "contact",
				field: "phone"
			},
			content: {
				icon: "phone",
				text: p.phone
			},
			style: {
				fontSize: 12,
				textAlign: "center",
				color: MUTE
			}
		}),
		el({
			type: "contact",
			x: 197,
			y: 216,
			w: 400,
			h: 20,
			z: 6,
			bind: {
				kind: "contact",
				field: "location"
			},
			content: {
				icon: "pin",
				text: p.location
			},
			style: {
				fontSize: 12,
				textAlign: "center",
				color: MUTE
			}
		}),
		el({
			type: "text",
			x: 100,
			y: 256,
			w: 594,
			h: 78,
			z: 7,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontFamily: "Newsreader",
				fontSize: 15,
				fontWeight: 400,
				italic: true,
				textAlign: "center",
				lineHeight: 1.55,
				color: "#2c2926"
			}
		}),
		el({
			...label("EXPÉRIENCE", 0, 352, 8),
			x: 0,
			w: 794,
			style: {
				fontSize: 11,
				fontWeight: 700,
				letterSpacing: 2.2,
				textAlign: "center"
			}
		}),
		...experiences(p, 110, 384, 574, 112, 14, 9).map(el),
		el({
			...label("FORMATION", 0, 770, 16),
			x: 0,
			w: 794,
			style: {
				fontSize: 11,
				fontWeight: 700,
				letterSpacing: 2.2,
				textAlign: "center"
			}
		}),
		...educations(p, 110, 798, 574, 17).map(el),
		el({
			type: "skills",
			x: 110,
			y: 910,
			w: 574,
			h: 56,
			z: 20,
			bind: { kind: "skills" },
			content: { items: [...p.skills] },
			style: {
				fontSize: 12,
				textAlign: "center",
				color: INK
			}
		}),
		el({
			type: "meters",
			x: 160,
			y: 980,
			w: 474,
			h: 88,
			z: 21,
			bind: { kind: "languages" },
			content: { meters: p.languages.map((m) => ({ ...m })) },
			style: {
				fontSize: 12,
				color: INK
			}
		})
	];
}
function executive(p, el) {
	const side = { color: CREAM };
	return [
		el({
			type: "rect",
			x: 0,
			y: 0,
			w: 252,
			h: 1123,
			z: 1,
			style: { backgroundColor: INK }
		}),
		el({
			type: "photo",
			x: 78,
			y: 40,
			w: 96,
			h: 96,
			z: 2,
			content: { src: "" },
			style: {
				backgroundColor: "#2a2724",
				borderRadius: 48
			}
		}),
		el({
			type: "heading",
			x: 24,
			y: 156,
			w: 204,
			h: 58,
			z: 3,
			bind: { kind: "name" },
			content: { text: p.name },
			style: {
				fontFamily: "Fraunces",
				fontSize: 22,
				fontWeight: 600,
				color: CREAM,
				lineHeight: 1.12
			}
		}),
		el({
			type: "text",
			x: 24,
			y: 220,
			w: 204,
			h: 36,
			z: 4,
			bind: { kind: "role" },
			content: { text: p.role.toUpperCase() },
			style: {
				fontSize: 11,
				fontWeight: 600,
				color: DARK_MUTE,
				letterSpacing: 1.1,
				lineHeight: 1.35
			}
		}),
		el({
			type: "rule",
			x: 24,
			y: 268,
			w: 204,
			h: 1,
			z: 5,
			style: { backgroundColor: "#3a3834" }
		}),
		el(label("CONTACT", 24, 286, 6, {
			color: "#8d877c",
			fontSize: 10,
			letterSpacing: 1.6
		})),
		el({
			type: "contact",
			x: 24,
			y: 310,
			w: 204,
			h: 22,
			z: 7,
			bind: {
				kind: "contact",
				field: "email"
			},
			content: {
				icon: "mail",
				text: p.email
			},
			style: {
				...side,
				fontSize: 11
			}
		}),
		el({
			type: "contact",
			x: 24,
			y: 336,
			w: 204,
			h: 22,
			z: 8,
			bind: {
				kind: "contact",
				field: "phone"
			},
			content: {
				icon: "phone",
				text: p.phone
			},
			style: {
				...side,
				fontSize: 11
			}
		}),
		el({
			type: "contact",
			x: 24,
			y: 362,
			w: 204,
			h: 22,
			z: 9,
			bind: {
				kind: "contact",
				field: "location"
			},
			content: {
				icon: "pin",
				text: p.location
			},
			style: {
				...side,
				fontSize: 11
			}
		}),
		el({
			type: "contact",
			x: 24,
			y: 388,
			w: 204,
			h: 22,
			z: 10,
			bind: {
				kind: "contact",
				field: "link"
			},
			content: {
				icon: "link",
				text: p.link
			},
			style: {
				...side,
				fontSize: 11
			}
		}),
		el(label("COMPÉTENCES", 24, 432, 11, {
			color: "#8d877c",
			fontSize: 10,
			letterSpacing: 1.6
		})),
		el({
			type: "skills",
			x: 24,
			y: 456,
			w: 204,
			h: 188,
			z: 12,
			bind: { kind: "skills" },
			content: { items: [...p.skills] },
			style: {
				...side,
				fontSize: 11
			}
		}),
		el(label("LANGUES", 24, 664, 13, {
			color: "#8d877c",
			fontSize: 10,
			letterSpacing: 1.6
		})),
		el({
			type: "meters",
			x: 24,
			y: 688,
			w: 204,
			h: 150,
			z: 14,
			bind: { kind: "languages" },
			content: { meters: p.languages.map((m) => ({ ...m })) },
			style: {
				...side,
				fontSize: 12
			}
		}),
		el(label("PROFIL", 284, 44, 15)),
		el({
			type: "text",
			x: 284,
			y: 70,
			w: 470,
			h: 78,
			z: 16,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontSize: 14,
				lineHeight: 1.5,
				color: "#3a3632"
			}
		}),
		el(label("EXPÉRIENCE", 284, 164, 17)),
		...experiences(p, 284, 190, 470, 120, 16, 18).map(el),
		el(label("FORMATION", 284, 610, 24)),
		...educations(p, 284, 636, 470, 25).map(el)
	];
}
function creative(p, el) {
	return [
		el({
			type: "ellipse",
			x: 540,
			y: -80,
			w: 340,
			h: 340,
			z: 1,
			style: { backgroundColor: SIGNAL }
		}),
		el({
			type: "rect",
			x: 0,
			y: 992,
			w: 794,
			h: 131,
			z: 2,
			style: { backgroundColor: INK }
		}),
		el({
			type: "heading",
			x: 36,
			y: 40,
			w: 490,
			h: 120,
			z: 4,
			bind: { kind: "name" },
			content: { text: p.name },
			style: {
				fontFamily: "Syne",
				fontSize: 52,
				fontWeight: 800,
				lineHeight: .92,
				color: INK
			}
		}),
		el({
			type: "text",
			x: 36,
			y: 172,
			w: 300,
			h: 36,
			z: 5,
			bind: { kind: "role" },
			content: { text: p.role },
			style: {
				fontFamily: "Syne",
				fontSize: 14,
				fontWeight: 700,
				color: CREAM,
				backgroundColor: INK,
				borderRadius: 999,
				padding: 8
			}
		}),
		el({
			type: "text",
			x: 36,
			y: 224,
			w: 460,
			h: 72,
			z: 6,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontFamily: "Syne",
				fontSize: 14,
				fontWeight: 500,
				lineHeight: 1.4
			}
		}),
		el({
			type: "rule",
			x: 36,
			y: 312,
			w: 64,
			h: 4,
			z: 7,
			style: { backgroundColor: INK }
		}),
		el({
			type: "heading",
			x: 36,
			y: 332,
			w: 280,
			h: 28,
			z: 8,
			content: { text: "Expériences" },
			style: {
				fontFamily: "Syne",
				fontSize: 18,
				fontWeight: 700
			}
		}),
		...experiences(p, 36, 368, 460, 108, 10, 9, { fontFamily: "Source Sans 3" }).map(el),
		el(label("FORMATION", 36, 742, 16)),
		...educations(p, 36, 766, 460, 17).map(el),
		el({
			type: "rect",
			x: 524,
			y: 268,
			w: 234,
			h: 690,
			z: 3,
			style: {
				backgroundColor: "#f3efe6",
				borderRadius: 18
			}
		}),
		el(label("CONTACT", 546, 292, 20)),
		el({
			type: "contact",
			x: 546,
			y: 318,
			w: 192,
			h: 36,
			z: 21,
			bind: {
				kind: "contact",
				field: "email"
			},
			content: {
				icon: "mail",
				text: p.email
			},
			style: { fontSize: 12 }
		}),
		el({
			type: "contact",
			x: 546,
			y: 358,
			w: 192,
			h: 28,
			z: 22,
			bind: {
				kind: "contact",
				field: "phone"
			},
			content: {
				icon: "phone",
				text: p.phone
			},
			style: { fontSize: 12 }
		}),
		el({
			type: "contact",
			x: 546,
			y: 390,
			w: 192,
			h: 28,
			z: 23,
			bind: {
				kind: "contact",
				field: "location"
			},
			content: {
				icon: "pin",
				text: p.location
			},
			style: { fontSize: 12 }
		}),
		el({
			type: "contact",
			x: 546,
			y: 422,
			w: 192,
			h: 36,
			z: 24,
			bind: {
				kind: "contact",
				field: "link"
			},
			content: {
				icon: "link",
				text: p.link
			},
			style: { fontSize: 12 }
		}),
		el(label("COMPÉTENCES", 546, 478, 25)),
		el({
			type: "skills",
			x: 546,
			y: 504,
			w: 192,
			h: 210,
			z: 26,
			bind: { kind: "skills" },
			content: { items: [...p.skills] },
			style: {
				fontSize: 12,
				color: INK
			}
		}),
		el(label("LANGUES", 546, 730, 27)),
		el({
			type: "meters",
			x: 546,
			y: 756,
			w: 192,
			h: 150,
			z: 28,
			bind: { kind: "languages" },
			content: { meters: p.languages.map((m) => ({ ...m })) },
			style: {
				fontSize: 12,
				color: INK
			}
		}),
		el({
			type: "text",
			x: 36,
			y: 1036,
			w: 500,
			h: 28,
			z: 30,
			content: { text: "Ouverte aux projets — " + p.location },
			style: {
				fontFamily: "Syne",
				fontSize: 14,
				fontWeight: 700,
				color: CREAM
			}
		})
	];
}
function swiss(p, el) {
	return [
		el({
			type: "rect",
			x: 0,
			y: 0,
			w: 14,
			h: 1123,
			z: 1,
			style: { backgroundColor: SIGNAL }
		}),
		el({
			type: "heading",
			x: 44,
			y: 36,
			w: 710,
			h: 28,
			z: 2,
			bind: { kind: "name" },
			content: { text: p.name.toUpperCase() },
			style: {
				fontFamily: "Syne",
				fontSize: 20,
				fontWeight: 800,
				letterSpacing: 2.4
			}
		}),
		el({
			type: "text",
			x: 44,
			y: 68,
			w: 400,
			h: 18,
			z: 3,
			bind: { kind: "role" },
			content: { text: p.role },
			style: {
				fontFamily: "JetBrains Mono",
				fontSize: 11,
				color: MUTE
			}
		}),
		el({
			type: "rule",
			x: 36,
			y: 100,
			w: 722,
			h: 1,
			z: 4,
			style: { backgroundColor: HAIR }
		}),
		el({
			type: "rule",
			x: 397,
			y: 100,
			w: 1,
			h: 980,
			z: 4,
			style: { backgroundColor: HAIR }
		}),
		el({
			type: "text",
			x: 40,
			y: 124,
			w: 330,
			h: 110,
			z: 5,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontSize: 13,
				lineHeight: 1.5,
				color: "#2c2926"
			}
		}),
		el(label("CONTACT", 40, 252, 6)),
		el({
			type: "contact",
			x: 40,
			y: 276,
			w: 330,
			h: 22,
			z: 7,
			bind: {
				kind: "contact",
				field: "email"
			},
			content: {
				icon: "mail",
				text: p.email
			},
			style: { fontSize: 12 }
		}),
		el({
			type: "contact",
			x: 40,
			y: 302,
			w: 330,
			h: 22,
			z: 8,
			bind: {
				kind: "contact",
				field: "phone"
			},
			content: {
				icon: "phone",
				text: p.phone
			},
			style: { fontSize: 12 }
		}),
		el({
			type: "contact",
			x: 40,
			y: 328,
			w: 330,
			h: 22,
			z: 9,
			bind: {
				kind: "contact",
				field: "location"
			},
			content: {
				icon: "pin",
				text: p.location
			},
			style: { fontSize: 12 }
		}),
		el({
			type: "contact",
			x: 40,
			y: 354,
			w: 330,
			h: 22,
			z: 10,
			bind: {
				kind: "contact",
				field: "link"
			},
			content: {
				icon: "link",
				text: p.link
			},
			style: { fontSize: 12 }
		}),
		el(label("FORMATION", 40, 400, 11)),
		...educations(p, 40, 424, 330, 12).map(el),
		el(label("COMPÉTENCES", 40, 540, 16)),
		el({
			type: "skills",
			x: 40,
			y: 564,
			w: 330,
			h: 150,
			z: 17,
			bind: { kind: "skills" },
			content: { items: [...p.skills] },
			style: {
				fontSize: 12,
				color: INK
			}
		}),
		el(label("LANGUES", 40, 732, 18)),
		el({
			type: "meters",
			x: 40,
			y: 756,
			w: 330,
			h: 140,
			z: 19,
			bind: { kind: "languages" },
			content: { meters: p.languages.map((m) => ({ ...m })) },
			style: {
				fontSize: 12,
				color: INK
			}
		}),
		el(label("EXPÉRIENCE", 424, 124, 20)),
		...experiences(p, 424, 152, 330, 150, 18, 21).map(el)
	];
}
function editorial(p, el) {
	return [
		el({
			type: "heading",
			x: 40,
			y: 36,
			w: 714,
			h: 92,
			z: 1,
			bind: { kind: "name" },
			content: { text: p.name },
			style: {
				fontFamily: "Fraunces",
				fontSize: 60,
				fontWeight: 500,
				lineHeight: .9,
				letterSpacing: -1.2
			}
		}),
		el({
			type: "text",
			x: 40,
			y: 140,
			w: 714,
			h: 20,
			z: 2,
			bind: { kind: "role" },
			content: { text: "—  " + p.role.toUpperCase() },
			style: {
				fontSize: 12,
				fontWeight: 700,
				letterSpacing: 2.6
			}
		}),
		el({
			type: "rule",
			x: 40,
			y: 176,
			w: 714,
			h: 1,
			z: 3,
			style: { backgroundColor: INK }
		}),
		el({
			type: "text",
			x: 40,
			y: 196,
			w: 380,
			h: 130,
			z: 4,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontFamily: "Newsreader",
				fontSize: 16,
				italic: true,
				lineHeight: 1.55
			}
		}),
		el({
			type: "contact",
			x: 460,
			y: 200,
			w: 294,
			h: 22,
			z: 5,
			bind: {
				kind: "contact",
				field: "email"
			},
			content: {
				icon: "mail",
				text: p.email
			},
			style: { fontSize: 13 }
		}),
		el({
			type: "contact",
			x: 460,
			y: 228,
			w: 294,
			h: 22,
			z: 6,
			bind: {
				kind: "contact",
				field: "phone"
			},
			content: {
				icon: "phone",
				text: p.phone
			},
			style: { fontSize: 13 }
		}),
		el({
			type: "contact",
			x: 460,
			y: 256,
			w: 294,
			h: 22,
			z: 7,
			bind: {
				kind: "contact",
				field: "location"
			},
			content: {
				icon: "pin",
				text: p.location
			},
			style: { fontSize: 13 }
		}),
		el({
			type: "contact",
			x: 460,
			y: 284,
			w: 294,
			h: 22,
			z: 8,
			bind: {
				kind: "contact",
				field: "link"
			},
			content: {
				icon: "link",
				text: p.link
			},
			style: { fontSize: 13 }
		}),
		el(label("EXPÉRIENCE", 40, 348, 9)),
		...experiences(p, 40, 376, 714, 120, 12, 10, {
			fontFamily: "Newsreader",
			fontSize: 14
		}).map(el),
		el(label("FORMATION", 40, 792, 16)),
		...educations(p, 40, 816, 340, 17, { fontFamily: "Newsreader" }).map(el),
		el(label("COMPÉTENCES", 420, 792, 20)),
		el({
			type: "skills",
			x: 420,
			y: 816,
			w: 334,
			h: 90,
			z: 21,
			bind: { kind: "skills" },
			content: { items: [...p.skills] },
			style: {
				fontSize: 12,
				color: INK
			}
		}),
		el({
			type: "meters",
			x: 420,
			y: 916,
			w: 334,
			h: 110,
			z: 22,
			bind: { kind: "languages" },
			content: { meters: p.languages.map((m) => ({ ...m })) },
			style: {
				fontSize: 12,
				color: INK
			}
		})
	];
}
var BUILDERS = {
	modern,
	minimal,
	executive,
	creative,
	swiss,
	editorial
};
var TEMPLATES = [
	{
		id: "modern",
		name: "Modern",
		note: "Bandeau encre"
	},
	{
		id: "minimal",
		name: "Minimal",
		note: "Centré, serif"
	},
	{
		id: "executive",
		name: "Executive",
		note: "Colonne sombre"
	},
	{
		id: "creative",
		name: "Créatif",
		note: "Formes libres"
	},
	{
		id: "swiss",
		name: "Swiss",
		note: "Grille et rouge"
	},
	{
		id: "editorial",
		name: "Éditorial",
		note: "Magazine"
	}
];
function buildTemplate(id, profile, prefix) {
	return BUILDERS[id](profile, builder(prefix));
}
var JOB_PRESETS = [
	{
		id: "developer",
		label: "Développeur Fullstack",
		category: "Tech & Dev",
		badge: "Tech Lead / Cloud",
		profile: {
			name: "Thomas Bernard",
			role: "Lead Développeur Fullstack",
			email: "thomas.bernard@dev.io",
			phone: "+33 6 98 76 54 32",
			location: "Nantes / Télétravail",
			link: "github.com/thomas-dev",
			summary: "Ingénieur logiciel senior passionné par les architectures réactives, la haute disponibilité et le clean code. 7 ans d'expérience sur l'écosystème React, TypeScript, Node.js et Cloud AWS. Habitué aux environnements CI/CD à fort trafic.",
			experiences: [
				{
					role: "Tech Lead Fullstack",
					company: "Scalr Tech — Nantes",
					date: "2021 — Aujourd'hui",
					desc: "• Architecture et déploiement d'une plateforme microservices traitant 1,5M+ requêtes/jour.\n• Migration de l'application monolithique vers Next.js et Docker, réduisant les temps de chargement de 42%.\n• Encadrement et mentorat d'une équipe de 8 ingénieurs frontend et backend."
				},
				{
					role: "Développeur Senior Frontend & API",
					company: "FinPay — Paris",
					date: "2018 — 2021",
					desc: "• Conception du dashboard bancaire en React/TypeScript avec 99,9% de conformité aux Core Web Vitals.\n• Optimisation de la consommation API GraphQL divisant le temps de latence p99 par 3.\n• Mise en place des suites de tests automatisés (Jest, Playwright) atteignant 88% de couverture."
				},
				{
					role: "Développeur Web & Mobile",
					company: "Atelier Numérique — Rennes",
					date: "2016 — 2018",
					desc: "• Développement de 14 applications web et hybrides pour des clients grands comptes du secteur retail.\n• Intégration de passerelles de paiement Stripe et gestion d'authentification OAuth 2.0 sécurisée."
				}
			],
			educations: [{
				degree: "Diplôme d'Ingénieur Informatique (Bac+5)",
				school: "INSA Rennes",
				date: "2013 — 2016"
			}, {
				degree: "DUT Informatique",
				school: "IUT de Nantes",
				date: "2011 — 2013"
			}],
			skills: [
				"React & Next.js",
				"TypeScript",
				"Node.js & NestJS",
				"PostgreSQL",
				"Docker & Kubernetes",
				"AWS & Cloud",
				"GraphQL & REST",
				"CI/CD & DevOps"
			],
			languages: [
				{
					label: "Français (Langue maternelle)",
					value: 100
				},
				{
					label: "Anglais (Bilingue technique C1)",
					value: 95
				},
				{
					label: "Espagnol (Intermédiaire B1)",
					value: 65
				}
			]
		}
	},
	{
		id: "sales",
		label: "Commercial B2B / Sales",
		category: "Vente & Conseil",
		badge: "Grands Comptes / ARR",
		profile: {
			name: "Maxime Robert",
			role: "Senior Account Executive B2B",
			email: "maxime.robert@sales-exec.fr",
			phone: "+33 6 22 33 44 55",
			location: "Lyon, France",
			link: "linkedin.com/in/maxime-robert-sales",
			summary: "Commercial grand compte avec 7 ans d'expérience dans la vente de solutions logicielles complexes en cycle long. Dépassement moyen de quota de 128% sur 3 années consécutives. Expert en négociation C-Level et closing de contrats stratégiques.",
			experiences: [{
				role: "Senior Account Executive",
				company: "CloudSecure — Lyon",
				date: "2021 — Aujourd'hui",
				desc: "• Signature de 22 contrats grands comptes CAC 40 / SBF 120 générant 1,8M€ de nouvel ARR.\n• Dépassement annuel d'objectif à 132% en moyenne grâce à une qualification rigoureuse MEDDIC.\n• Pilotage d'appels d'offres stratégiques en coordination avec les équipes avant-vente et juridiques."
			}, {
				role: "Business Developer Grands Comptes",
				company: "Nexity Solutions — Paris",
				date: "2018 — 2021",
				desc: "• Prospection outbound multicanale (Cold outreach, Social selling) générant 75 opportunités qualifiées/trimestre.\n• Négociation et renouvellement d'un portefeuille de 40 comptes clients clés représentant 900k€ de CA.\n• Animation d'ateliers de co-conception de solutions pour accélérer la prise de décision client."
			}],
			educations: [{
				degree: "Master 2 Management Commercial & Négociation",
				school: "EM Lyon Business School",
				date: "2015 — 2017"
			}, {
				degree: "Licence Économie & Gestion",
				school: "Université Lyon 3",
				date: "2012 — 2015"
			}],
			skills: [
				"Négociation C-Level",
				"Méthodologie MEDDIC",
				"Salesforce & Hubspot",
				"Prospection Outbound",
				"Closing Grands Comptes",
				"Account-Based Marketing"
			],
			languages: [{
				label: "Français (Natif)",
				value: 100
			}, {
				label: "Anglais (Courant affaires C1)",
				value: 90
			}]
		}
	},
	{
		id: "marketing",
		label: "Chef de Projet Marketing & Growth",
		category: "Marketing & Comm",
		badge: "Acquisition & Data",
		profile: {
			name: "Camille Laurent",
			role: "Growth Marketing Manager",
			email: "camille.laurent@growth-consulting.fr",
			phone: "+33 6 45 12 78 90",
			location: "Bordeaux, France",
			link: "linkedin.com/in/camille-growth",
			summary: "Experte en stratégie d'acquisition, rétention et marketing omnicanal. Culture rigoureusement ROIste et data-driven avec historique de croissance x3 sur 2 scale-ups B2B. Maîtrise des leviers SEO, SEA, CRM automation et analytics.",
			experiences: [{
				role: "Head of Growth & Acquisition",
				company: "SaaS Booster — Bordeaux",
				date: "2022 — Aujourd'hui",
				desc: "• Gestion d'un budget marketing de 75k€/mois avec réduction du CAC de 35% en 18 mois.\n• Génération de plus de 500 Leads MQLs qualifiés par mois via des tunnels de conversion optimisés.\n• Déploiement de campagnes publicitaires automatisées (Google Ads, Meta, LinkedIn Ads) affichant un ROAS de 4,2."
			}, {
				role: "Growth Marketer & Inbound Specialist",
				company: "Agence Pulse — Paris",
				date: "2019 — 2022",
				desc: "• Mise en place d'une stratégie SEO de fond propulsant le trafic organique de 15k à 120k visites/mois.\n• Scénarisation de workflows de lead nurturing sur HubSpot augmentant le taux de conversion démo de 22%.\n• Conduite de 40+ tests A/B sur les landing pages pour maximiser la rétention."
			}],
			educations: [{
				degree: "Master Marketing Digital & E-Business",
				school: "KEDGE Business School",
				date: "2017 — 2019"
			}, {
				degree: "Bachelor Communication Globale",
				school: "EFAP Paris",
				date: "2014 — 2017"
			}],
			skills: [
				"Google Ads & Meta Ads",
				"SEO & Copywriting",
				"HubSpot & Klaviyo",
				"Google Analytics 4",
				"A/B Testing",
				"Marketing Automation",
				"Data Studio"
			],
			languages: [
				{
					label: "Français (Langue maternelle)",
					value: 100
				},
				{
					label: "Anglais (Bilingue C2)",
					value: 95
				},
				{
					label: "Espagnol (Opérationnel B2)",
					value: 75
				}
			]
		}
	},
	{
		id: "hr",
		label: "Assistant(e) RH & Talent Acquisition",
		category: "Ressources Humaines",
		badge: "Recrutement & Marque",
		profile: {
			name: "Élodie Mercier",
			role: "Responsable Ressources Humaines",
			email: "elodie.mercier@rh-conseil.fr",
			phone: "+33 6 11 22 33 44",
			location: "Toulouse, France",
			link: "linkedin.com/in/elodie-mercier-rh",
			summary: "Professionnelle des RH avec 6 ans d'expérience dans l'accompagnement des équipes et le recrutement de profils pénuriques. Spécialisée en marque employeur, onboarding, gestion des talents et relations sociales.",
			experiences: [{
				role: "Talent Acquisition & HRBP",
				company: "AeroTech Solutions — Toulouse",
				date: "2021 — Aujourd'hui",
				desc: "• Pilotage de 45 recrutements stratégiques par an (ingénieurs, managers, fonctions support).\n• Réduction du délai moyen de recrutement de 58 à 36 jours grâce à la refonte du vivier candidat.\n• Déploiement d'un programme d'onboarding complet réduisant le turnover de la première année de 28%."
			}, {
				role: "Chargée de Missions RH",
				company: "Groupe Santé Plus — Montpellier",
				date: "2018 — 2021",
				desc: "• Gestion administrative et contractuelle de 230 collaborateurs (DPAE, contrats, avenants, paie).\n• Élaboration et suivi du plan de développement des compétences (budget 180k€/an).\n• Co-animation des réunions CSE et veille juridique en droit du travail."
			}],
			educations: [{
				degree: "Master 2 Gestion des Ressources Humaines & Droit Social",
				school: "IAE Toulouse",
				date: "2016 — 2018"
			}, {
				degree: "Licence Administration Économique & Sociale",
				school: "Université de Montpellier",
				date: "2013 — 2016"
			}],
			skills: [
				"Sourcing & Entretiens",
				"Droit Social & CSE",
				"SIRH & Outils ATS",
				"Marque Employeur",
				"Gestion des Carrières",
				"Plan de Formation"
			],
			languages: [{
				label: "Français (Langue maternelle)",
				value: 100
			}, {
				label: "Anglais (Professionnel B2)",
				value: 80
			}]
		}
	},
	{
		id: "designer",
		label: "Product Designer Senior",
		category: "Design & UX/UI",
		badge: "Design System & UX",
		profile: {
			name: "Alexandra Dubois",
			role: "Lead Product Designer",
			email: "alexandra.dubois@design.fr",
			phone: "+33 6 12 34 56 78",
			location: "Paris, France",
			link: "linkedin.com/in/alexandra-design",
			summary: "Designer produit avec 8 ans d'expérience dans la création d'interfaces intuitives et de design systems pérennes. Recherche utilisateur approfondie, prototypage haute fidélité et collaboration étroite avec les ingénieurs.",
			experiences: [{
				role: "Lead Product Designer",
				company: "Mira Studio — Paris",
				date: "2021 — Aujourd'hui",
				desc: "• Direction d'une équipe de 6 designers et refonte de la suite SaaS (+34% de rétention mensuelle).\n• Création et gouvernance du Design System multi-marques adopté par 40+ développeurs.\n• Animation d'ateliers de co-conception UX et restitution de tests d'utilisabilité auprès du Comex."
			}, {
				role: "Senior UX/UI Designer",
				company: "Atelier Noir — Lyon",
				date: "2018 — 2021",
				desc: "• Conduite de 14 missions de refonte complète d'applications web et mobiles d'envergure.\n• Augmentation du score SUS (System Usability Scale) moyen de 62 à 84 sur les parcours clés.\n• Prototypage interactif sous Figma et spécifications fonctionnelles détaillées."
			}],
			educations: [{
				degree: "Master Design d'Interaction & UX",
				school: "ENSAD Paris",
				date: "2013 — 2015"
			}, {
				degree: "Bachelor Arts Appliqués",
				school: "École Boulle",
				date: "2010 — 2013"
			}],
			skills: [
				"Figma & Tokens",
				"Design System",
				"Recherche Utilisateur",
				"Prototypage HD",
				"Architecture de l'info",
				"Design Sprint",
				"HTML/CSS"
			],
			languages: [{
				label: "Français (Natif)",
				value: 100
			}, {
				label: "Anglais (Bilingue C1)",
				value: 92
			}]
		}
	},
	{
		id: "nurse",
		label: "Infirmier / Cadre de Santé",
		category: "Santé & Médical",
		badge: "Coordination & Soins",
		profile: {
			name: "Julien Moreau",
			role: "Infirmier Diplômé d'État & Coordinateur",
			email: "julien.moreau.ide@sante.fr",
			phone: "+33 6 77 88 99 00",
			location: "Lille, France",
			link: "linkedin.com/in/julien-moreau-sante",
			summary: "Infirmier expérimenté avec 8 ans d'exercice en milieu hospitalier et services d'urgences. Spécialisé dans la coordination des parcours de soins, la gestion des situations de crise et l'application stricte des protocoles HAS.",
			experiences: [{
				role: "Infirmier Coordinateur de Soins (IDEC)",
				company: "Centre Hospitalier Régional — Lille",
				date: "2020 — Aujourd'hui",
				desc: "• Coordination quotidienne d'une équipe pluridisciplinaire de 16 soignants et aides-soignants.\n• Optimisation du circuit du médicament et mise en conformité des protocoles de traçabilité HAS (0 non-conformité).\n• Accueil et accompagnement personnalisé de 35 patients par jour en unité de soins intensifs."
			}, {
				role: "Infirmier en Service d'Urgences",
				company: "Hôpital Saint-Vincent — Valenciennes",
				date: "2016 — 2020",
				desc: "• Prise en charge des urgences vitales, tri selon la grille de Glasgow et gestes de réanimation.\n• Collaboration étroite avec les médecins urgentistes et encadrement des étudiants infirmiers stagiaires.\n• Gestion du stress et communication bienveillante auprès des familles en situation d'angoisse."
			}],
			educations: [{
				degree: "Diplôme d'État d'Infirmier (IDE)",
				school: "IFSI CHU Lille",
				date: "2013 — 2016"
			}, {
				degree: "Certification AFGSU Niveau 2 (Gestes d'Urgences)",
				school: "CESU 59",
				date: "2022"
			}],
			skills: [
				"Soins d'Urgences & Réanimation",
				"Coordination Pluridisciplinaire",
				"Protocoles HAS & Hygiène",
				"Gestion des Risques",
				"Écoute & Relation d'Aide"
			],
			languages: [{
				label: "Français (Langue maternelle)",
				value: 100
			}, {
				label: "Anglais médical (Opérationnel)",
				value: 75
			}]
		}
	},
	{
		id: "data",
		label: "Data Engineer / Analyst",
		category: "Data & IA",
		badge: "BigQuery / Pipelines",
		profile: {
			name: "Antoine Lefebvre",
			role: "Senior Data Analyst & Analytics Engineer",
			email: "antoine.lefebvre@data-analytics.fr",
			phone: "+33 6 55 66 77 88",
			location: "Strasbourg / Remote",
			link: "github.com/antoine-data",
			summary: "Spécialiste de la valorisation de données avec 6 ans d'expérience dans la construction de pipelines de données fiables et de tableaux de bord décisionnels pour la direction générale. Expert SQL, dbt, Python et BigQuery.",
			experiences: [{
				role: "Lead Analytics Engineer",
				company: "DataMetrics Group — Strasbourg",
				date: "2021 — Aujourd'hui",
				desc: "• Modélisation et industrialisation du data warehouse sous Snowflake et dbt (+120 tables nettoyées).\n• Création de tableaux de bord C-Level sous Tableau réduisant le temps de reporting financier de 4 jours à 20 minutes.\n• Mise en place de règles de data governance et data quality assurant 99,5% de précision des métriques."
			}, {
				role: "Data Analyst Business Intelligence",
				company: "Retail Analytics — Mulhouse",
				date: "2018 — 2021",
				desc: "• Analyse comportementale client sur une base de 2M d'utilisateurs et segmentation RFM.\n• Détection de gisements de croissance ayant permis d'augmenter le panier moyen de 14%.\n• Automatisation des flux d'extraction ETL avec Python et Airflow."
			}],
			educations: [{
				degree: "Master 2 Économétrie & Big Data",
				school: "Université de Strasbourg",
				date: "2016 — 2018"
			}, {
				degree: "Licence Mathématiques Appliquées & Informatique",
				school: "Université de Lorraine",
				date: "2013 — 2016"
			}],
			skills: [
				"SQL Avancé & dbt",
				"Python (Pandas, Polars)",
				"Snowflake & BigQuery",
				"Power BI & Tableau",
				"ETL & Airflow",
				"Data Modeling"
			],
			languages: [{
				label: "Français (Natif)",
				value: 100
			}, {
				label: "Anglais (Technique professionnel C1)",
				value: 90
			}]
		}
	},
	{
		id: "finance",
		label: "Contrôleur de Gestion / Finance",
		category: "Finance & Audit",
		badge: "Budgets / 15M€",
		profile: {
			name: "Sophie Bertrand",
			role: "Responsable Contrôle de Gestion",
			email: "sophie.bertrand@finance-corp.fr",
			phone: "+33 6 33 44 55 66",
			location: "Marseille, France",
			link: "linkedin.com/in/sophie-bertrand-finance",
			summary: "Contrôleuse de gestion avec 8 ans d'expérience en environnement international. Pilotage du cycle budgétaire, modélisation financière, clôtures mensuelles et optimisation de la rentabilité opérationnelle (EBITDA).",
			experiences: [{
				role: "Responsable Contrôle de Gestion Opérationnel",
				company: "Méditerranée Industrie — Marseille",
				date: "2020 — Aujourd'hui",
				desc: "• Pilotage du budget annuel de 18M€ et coordination des clôtures mensuelles sous 4 jours ouvrés.\n• Identification de leviers d'économies d'achats ayant généré une réduction des coûts fixes de 7,5% (650k€/an).\n• Présentation mensuelle des écarts budgétaires et KPIs au Conseil d'Administration."
			}, {
				role: "Contrôleuse de Gestion Junior & Audit",
				company: "Cabinet KPMG — Aix-en-Provence",
				date: "2016 — 2020",
				desc: "• Missions d'audit financier et de contrôle interne auprès de 25 PME et ETI régionales.\n• Construction de modèles financiers prévisionnels et business plans sur 3 ans sous Excel avancé."
			}],
			educations: [{
				degree: "Master 2 Finance d'Entreprise & Contrôle de Gestion",
				school: "IAE Aix-Marseille",
				date: "2014 — 2016"
			}, {
				degree: "Licence Sciences Économiques",
				school: "Université d'Aix",
				date: "2011 — 2014"
			}],
			skills: [
				"Contrôle Budgétaire & P&L",
				"Clôtures Mensuelles & Fast Close",
				"Excel Avancé & Modélisation",
				"SAP & ERP Finance",
				"Analyse des Écarts",
				"Cash Flow"
			],
			languages: [{
				label: "Français (Natif)",
				value: 100
			}, {
				label: "Anglais (Courant financier C1)",
				value: 88
			}]
		}
	}
];
var BOOST_PRESETS = [
	{
		category: "Impact & Résultats chiffrés",
		tone: "impact",
		options: [
			"Pilotage stratégique des activités opérationnelles avec dépassement moyen des objectifs annuels de +24%.",
			"Développement du chiffre d'affaires et closing de 18 comptes stratégiques générant +42% de croissance.",
			"Optimisation globale des processus métiers ayant permis de réduire les coûts opérationnels de 18%.",
			"Conception et déploiement d'une solution à fort impact réduisant les délais d'exécution de 35%."
		]
	},
	{
		category: "Leadership & Management",
		tone: "leadership",
		options: [
			"Management bienveillant et coordination d'une équipe pluridisciplinaire de 8 collaborateurs en environnement agile.",
			"Animation des rituels stratégiques, définition de la roadmap trimestrielle et alignement des parties prenantes.",
			"Accompagnement du changement et formation continue des équipes favorisant la cohésion et la performance collective."
		]
	},
	{
		category: "Excellence Opérationnelle",
		tone: "quality",
		options: [
			"Mise en place d'une méthodologie rigoureuse garantissant 99,8% de conformité et zéro non-qualité sur les livrables.",
			"Refonte complète des flux de travail et automatisation des tâches chronophages libérant 15h de productivité/semaine.",
			"Gestion rigoureuse du budget et négociation partenariale avec sécurisation des marges opérationnelles."
		]
	}
];
function getRandomBoost() {
	const all = BOOST_PRESETS.flatMap((p) => p.options);
	return all[Math.floor(Math.random() * all.length)];
}
var COLOR_PALETTES = [
	{
		id: "graphite",
		name: "Graphite / Encre",
		desc: "Classique indémodable, sérieux & intemporel",
		primary: "#141311",
		accent: "#5e5952",
		rule: "#d5cfc4",
		textLight: "#fffdf8",
		softBg: "#f6f3ec"
	},
	{
		id: "marine",
		name: "Bleu Corporate",
		desc: "Sérieux, conseil, finance & grands comptes",
		primary: "#0f2b5c",
		accent: "#2563eb",
		rule: "#bfdbfe",
		textLight: "#ffffff",
		softBg: "#eff6ff"
	},
	{
		id: "emerald",
		name: "Vert Forêt",
		desc: "Moderne, santé, RSE & écologie",
		primary: "#064e3b",
		accent: "#059669",
		rule: "#a7f3d0",
		textLight: "#ffffff",
		softBg: "#f0fdf4"
	},
	{
		id: "burgundy",
		name: "Bordeaux / Prune",
		desc: "Luxe, élégance, droit & raffinement",
		primary: "#701a3b",
		accent: "#be185d",
		rule: "#fbcfe8",
		textLight: "#ffffff",
		softBg: "#fdf2f8"
	},
	{
		id: "terracotta",
		name: "Terracotta / Ocre",
		desc: "Chaleureux, design, créatif & communication",
		primary: "#7c2d12",
		accent: "#ea580c",
		rule: "#fed7aa",
		textLight: "#ffffff",
		softBg: "#fff7ed"
	},
	{
		id: "indigo",
		name: "Violet Moderne",
		desc: "Tech, SaaS, startup & produit digital",
		primary: "#312e81",
		accent: "#6366f1",
		rule: "#c7d2fe",
		textLight: "#ffffff",
		softBg: "#eef2ff"
	}
];
/**
* Harmonizes elements of a page with the selected color palette
* without modifying their positions, dimensions or bindings.
*/
function applyPaletteToElements(elements, palette) {
	return elements.map((el) => {
		if (el.type === "rect" && el.style.backgroundColor && el.style.backgroundColor !== "transparent") {
			if (el.y < 200 || el.h > 600 || el.w > 700) return {
				...el,
				style: {
					...el.style,
					backgroundColor: palette.primary,
					borderColor: palette.primary
				}
			};
			return {
				...el,
				style: {
					...el.style,
					backgroundColor: palette.softBg,
					borderColor: palette.rule
				}
			};
		}
		if (el.type === "ellipse") return {
			...el,
			style: {
				...el.style,
				backgroundColor: palette.accent
			}
		};
		if (el.type === "rule") return {
			...el,
			style: {
				...el.style,
				backgroundColor: palette.rule
			}
		};
		if (el.y < 160 && el.w > 400 && el.style.color && (el.style.color === "#ffffff" || el.style.color === "#f6f3ec" || el.style.color === "#fffdf8")) return el;
		if (el.style.backgroundColor && el.style.backgroundColor !== "transparent" && el.style.borderRadius > 20) return {
			...el,
			style: {
				...el.style,
				backgroundColor: palette.primary,
				color: palette.textLight
			}
		};
		return el;
	});
}
var SECTION_PACKS = [
	{
		id: "pack-experience",
		name: "Expérience avec réalisations chiffrées",
		desc: "Poste, entreprise, dates et 3 réalisations d'impact avec métriques",
		icon: "💼",
		createElements: (startY, maxZ) => {
			const y = Math.min(PAGE_H - 140, startY);
			return {
				elements: [{
					id: uid(),
					type: "experience",
					x: 40,
					y,
					w: 714,
					h: 116,
					rotation: 0,
					z: maxZ + 1,
					locked: false,
					hidden: false,
					content: {
						role: "Chef de Projet Senior / Lead",
						company: "Entreprise Innovante — Paris / Hybride",
						date: "2022 — Présent",
						desc: "• Pilotage stratégique et livraison de 12 projets majeurs avec respect strict des délais et budgets (+28% de satisfaction client).\n• Coordination d'une équipe transverse de 7 collaborateurs et optimisation des processus opérationnels (-30% de temps de cycle).\n• Présentation des bilans d'avancement et KPIs d'impact directement auprès de la direction générale."
					},
					style: baseStyle({
						fontFamily: "Source Sans 3",
						fontSize: 13,
						lineHeight: 1.45,
						color: INK
					})
				}],
				nextY: y + 128
			};
		}
	},
	{
		id: "pack-education",
		name: "Formation & Diplôme certifié",
		desc: "Diplôme, école de renom, dates et mention d'excellence",
		icon: "🎓",
		createElements: (startY, maxZ) => {
			const y = Math.min(PAGE_H - 80, startY);
			return {
				elements: [{
					id: uid(),
					type: "education",
					x: 40,
					y,
					w: 714,
					h: 52,
					rotation: 0,
					z: maxZ + 1,
					locked: false,
					hidden: false,
					content: {
						degree: "Master 2 Management & Stratégie d'Entreprise (Mention Très Bien)",
						school: "Université Paris-Dauphine / Grande École",
						date: "2018 — 2020"
					},
					style: baseStyle({
						fontFamily: "Source Sans 3",
						fontSize: 13,
						color: INK
					})
				}],
				nextY: y + 64
			};
		}
	},
	{
		id: "pack-skills",
		name: "Compétences clés en Tags stylisés",
		desc: "Bloc de compétences techniques et managériales prêtes à l'emploi",
		icon: "🏷️",
		createElements: (startY, maxZ) => {
			const y = Math.min(PAGE_H - 90, startY);
			return {
				elements: [{
					id: uid(),
					type: "heading",
					x: 40,
					y,
					w: 240,
					h: 18,
					rotation: 0,
					z: maxZ + 1,
					locked: false,
					hidden: false,
					content: { text: "COMPÉTENCES CLÉS" },
					style: baseStyle({
						fontSize: 11,
						fontWeight: 700,
						letterSpacing: 1.8,
						color: INK
					})
				}, {
					id: uid(),
					type: "skills",
					x: 40,
					y: y + 24,
					w: 714,
					h: 52,
					rotation: 0,
					z: maxZ + 2,
					locked: false,
					hidden: false,
					content: { items: [
						"Gestion de projet Agile",
						"Leadership d'équipe",
						"Négociation & Closing",
						"Data & Reporting KPIs",
						"Communication transverse",
						"Stratégie de croissance"
					] },
					style: baseStyle({
						fontSize: 12,
						color: INK
					})
				}],
				nextY: y + 88
			};
		}
	},
	{
		id: "pack-languages",
		name: "Langues avec niveaux visuels",
		desc: "Barres de progression élégantes pour les langues maîtrisées",
		icon: "🌐",
		createElements: (startY, maxZ) => {
			const y = Math.min(PAGE_H - 100, startY);
			return {
				elements: [{
					id: uid(),
					type: "heading",
					x: 40,
					y,
					w: 240,
					h: 18,
					rotation: 0,
					z: maxZ + 1,
					locked: false,
					hidden: false,
					content: { text: "LANGUES" },
					style: baseStyle({
						fontSize: 11,
						fontWeight: 700,
						letterSpacing: 1.8,
						color: INK
					})
				}, {
					id: uid(),
					type: "meters",
					x: 40,
					y: y + 24,
					w: 714,
					h: 60,
					rotation: 0,
					z: maxZ + 2,
					locked: false,
					hidden: false,
					content: { meters: [
						{
							label: "Français (Langue maternelle)",
							value: 100
						},
						{
							label: "Anglais (Professionnel courant C1)",
							value: 90
						},
						{
							label: "Espagnol (Opérationnel B2)",
							value: 70
						}
					] },
					style: baseStyle({
						fontSize: 12,
						color: INK
					})
				}],
				nextY: y + 96
			};
		}
	},
	{
		id: "pack-interests",
		name: "Loisirs & Centres d'intérêt",
		desc: "Badges valorisants (sport, culture, engagement associatif)",
		icon: "🏃",
		createElements: (startY, maxZ) => {
			const y = Math.min(PAGE_H - 80, startY);
			return {
				elements: [{
					id: uid(),
					type: "heading",
					x: 40,
					y,
					w: 240,
					h: 18,
					rotation: 0,
					z: maxZ + 1,
					locked: false,
					hidden: false,
					content: { text: "CENTRES D'INTÉRÊT" },
					style: baseStyle({
						fontSize: 11,
						fontWeight: 700,
						letterSpacing: 1.8,
						color: INK
					})
				}, {
					id: uid(),
					type: "skills",
					x: 40,
					y: y + 24,
					w: 714,
					h: 46,
					rotation: 0,
					z: maxZ + 2,
					locked: false,
					hidden: false,
					content: { items: [
						"🏃 Marathon & Semi-marathon",
						"📚 Économie & Essais contemporains",
						"🌍 Photographie de voyage & Randonnée",
						"🤝 Bénévolat associatif"
					] },
					style: baseStyle({
						fontSize: 12,
						color: INK
					})
				}],
				nextY: y + 80
			};
		}
	},
	{
		id: "pack-contact",
		name: "En-tête de Contact Pro complet",
		desc: "Rangée d'icônes Email, Tél, Ville et Réseau professionnel",
		icon: "✉️",
		createElements: (startY, maxZ) => {
			const y = Math.min(PAGE_H - 50, startY);
			return {
				elements: [
					{
						id: uid(),
						type: "contact",
						x: 40,
						y,
						w: 230,
						h: 22,
						rotation: 0,
						z: maxZ + 1,
						locked: false,
						hidden: false,
						content: {
							icon: "mail",
							text: "prenom.nom@email.com"
						},
						style: baseStyle({
							fontSize: 12,
							color: MUTE
						})
					},
					{
						id: uid(),
						type: "contact",
						x: 280,
						y,
						w: 180,
						h: 22,
						rotation: 0,
						z: maxZ + 2,
						locked: false,
						hidden: false,
						content: {
							icon: "phone",
							text: "+33 6 12 34 56 78"
						},
						style: baseStyle({
							fontSize: 12,
							color: MUTE
						})
					},
					{
						id: uid(),
						type: "contact",
						x: 470,
						y,
						w: 160,
						h: 22,
						rotation: 0,
						z: maxZ + 3,
						locked: false,
						hidden: false,
						content: {
							icon: "pin",
							text: "Paris, France"
						},
						style: baseStyle({
							fontSize: 12,
							color: MUTE
						})
					}
				],
				nextY: y + 36
			};
		}
	}
];
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var saveCvToCloud = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9ce4b5cdf1169012aebe5261cd25a2680c23e31e0a7819014de423ffb090e2fb"));
var loadCvFromCloud = createServerFn({ method: "GET" }).validator((code) => code.trim().toUpperCase()).handler(createSsrRpc("e2909fc9b201cd137388fa5be30d8241b76d3654eb2671a025960c57c9768952"));
/**
* Directly generates and downloads a clean A4 PDF file without opening the browser print dialog.
* Supports multi-page documents in both Guided and Studio modes.
*/
async function downloadDirectPDF(doc, _activePageId, onProgress) {
	onProgress?.("Génération du PDF en cours...");
	const pdf = new import_jspdf_node_min.default({
		orientation: "portrait",
		unit: "mm",
		format: "a4",
		compress: true
	});
	const fileName = `CV_${(doc.profile.name || "CV").trim().replace(/\s+/g, "_").replace(/[^\w-]/g, "") || "Document"}.pdf`;
	const pages = doc.pages;
	let renderedCount = 0;
	for (let i = 0; i < pages.length; i++) {
		const page = pages[i];
		onProgress?.(`Rendu de la page ${i + 1}/${pages.length}...`);
		const sheetEl = document.querySelector(`[data-export-sheet="${page.id}"]`) ?? document.querySelector(`[data-sheet="${page.id}"]`);
		if (!sheetEl) continue;
		const dataUrl = await toPng(sheetEl, {
			pixelRatio: 2,
			width: 794,
			height: PAGE_H,
			skipFonts: true,
			cacheBust: true,
			filter: (node) => {
				if (node instanceof HTMLElement && node.classList.contains("no-export")) return false;
				return true;
			}
		});
		if (renderedCount > 0) pdf.addPage("a4", "portrait");
		pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, void 0, "FAST");
		renderedCount += 1;
	}
	if (renderedCount === 0) throw new Error("Aucune feuille A4 trouvée pour l'export PDF");
	pdf.save(fileName);
}
function squash(value) {
	return value.normalize("NFKC").replace(/\u00a0/g, " ").replace(/[ \t]+/g, " ").trim();
}
function fold(value) {
	return squash(value).toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/ß/g, "ss").replace(/['’]/g, "'").replace(/\./g, "").replace(/[^a-z0-9+&#'/\s-]/g, " ").replace(/\s+/g, " ").trim();
}
function wordCount(value) {
	const t = squash(value);
	return t ? t.split(/\s+/).length : 0;
}
function isAllCaps(value) {
	const letters = value.replace(/[^\p{L}]/gu, "");
	return letters.length >= 2 && letters === letters.toUpperCase() && letters !== letters.toLowerCase();
}
function includesPhrase(folded, phrase) {
	if (!phrase) return false;
	const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u").test(folded);
}
function isBullet(text) {
	return /^\s*(?:[-–—•·▪▸►*]|\d{1,2}[.)])\s+\S/.test(text);
}
function plainLine(text, extra) {
	return {
		text,
		page: 1,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		fontSize: extra?.headingHint ? 16 : 12,
		bold: false,
		italic: false,
		headingHint: false,
		listItem: false,
		pageWidth: 0,
		...extra
	};
}
function textToLines(text) {
	return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").map((raw) => plainLine(raw.trim(), { listItem: isBullet(raw) }));
}
function observed(text, line, page, confidence, basis, rule) {
	return {
		text: squash(text),
		line: squash(line),
		page,
		confidence,
		basis,
		rule
	};
}
function deduction(value, from, confidence, rule) {
	return {
		value,
		from: squash(from),
		confidence,
		rule
	};
}
function pageOf(line) {
	return line?.page ?? null;
}
var MONTHS = [
	["janvier", 1],
	["janv", 1],
	["january", 1],
	["januar", 1],
	["enero", 1],
	["gennaio", 1],
	["janeiro", 1],
	["jan", 1],
	["février", 2],
	["fevrier", 2],
	["févr", 2],
	["fevr", 2],
	["february", 2],
	["februar", 2],
	["febrero", 2],
	["febbraio", 2],
	["fevereiro", 2],
	["feb", 2],
	["fév", 2],
	["fev", 2],
	["mars", 3],
	["march", 3],
	["marzo", 3],
	["marz", 3],
	["märz", 3],
	["março", 3],
	["marco", 3],
	["mar", 3],
	["avril", 4],
	["april", 4],
	["abril", 4],
	["aprile", 4],
	["apr", 4],
	["avr", 4],
	["mai", 5],
	["may", 5],
	["mayo", 5],
	["maggio", 5],
	["maio", 5],
	["juin", 6],
	["june", 6],
	["junio", 6],
	["giugno", 6],
	["junho", 6],
	["juni", 6],
	["jun", 6],
	["juillet", 7],
	["july", 7],
	["julio", 7],
	["luglio", 7],
	["julho", 7],
	["juli", 7],
	["juil", 7],
	["jul", 7],
	["août", 8],
	["aout", 8],
	["august", 8],
	["agosto", 8],
	["aug", 8],
	["septembre", 9],
	["september", 9],
	["septiembre", 9],
	["setiembre", 9],
	["settembre", 9],
	["setembro", 9],
	["sept", 9],
	["sep", 9],
	["octobre", 10],
	["october", 10],
	["octubre", 10],
	["ottobre", 10],
	["outubro", 10],
	["oktober", 10],
	["oct", 10],
	["novembre", 11],
	["november", 11],
	["noviembre", 11],
	["novembre", 11],
	["novembro", 11],
	["nov", 11],
	["décembre", 12],
	["decembre", 12],
	["december", 12],
	["diciembre", 12],
	["dicembre", 12],
	["dezembro", 12],
	["dezember", 12],
	["déc", 12],
	["dec", 12],
	["dez", 12]
].map(([name, month]) => ({
	name,
	month
})).sort((a, b) => b.name.length - a.name.length);
var MONTH_ALT = MONTHS.map((m) => m.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
var MONTH_RE = new RegExp(`^(${MONTH_ALT})\\.?$`, "iu");
var PRESENT = "(?:aujourd['’]hui|présent|present|actuel(?:le)?|en cours|ce jour|à ce jour|a ce jour|maintenant|now|current(?:ly)?|ongoing|today|heute|aktuell|gegenwart|actualidad|actualmente|attuale|heden|atual(?:mente)?)";
new RegExp(`^(?:${PRESENT})$`, "iu");
var YEAR = "(?:19|20)\\d{2}";
function monthIndex(token) {
	const m = MONTH_RE.exec(token.trim());
	if (!m) return null;
	return MONTHS.find((item) => item.name.toLowerCase() === m[1].toLowerCase())?.month ?? null;
}
function isBoundary(text, index) {
	if (index <= 0) return true;
	return !/[\p{L}\p{N}]/u.test(text[index - 1] ?? "");
}
function parsePoint(text, index) {
	const slice = text.slice(index);
	const monthYear = new RegExp(`^(?:(?:0?[1-9]|[12]\\d|3[01])(?:er)?\\s+)?(${MONTH_ALT})\\.?\\s+(${YEAR})`, "iu").exec(slice);
	if (monthYear) return {
		year: Number(monthYear[2]),
		month: monthIndex(monthYear[1]),
		raw: monthYear[0],
		next: index + monthYear[0].length
	};
	const numeric = /^(0?[1-9]|1[0-2])[/.-]((?:19|20)\d{2})(?!\d)/u.exec(slice);
	if (numeric) return {
		year: Number(numeric[2]),
		month: Number(numeric[1]),
		raw: numeric[0],
		next: index + numeric[0].length
	};
	const iso = /^((?:19|20)\d{2})[/.-](0?[1-9]|1[0-2])(?!\d)/u.exec(slice);
	if (iso) return {
		year: Number(iso[1]),
		month: Number(iso[2]),
		raw: iso[0],
		next: index + iso[0].length
	};
	const year = new RegExp(`^(${YEAR})(?!\\d)`, "u").exec(slice);
	if (year) return {
		year: Number(year[1]),
		month: null,
		raw: year[0],
		next: index + year[0].length
	};
	return null;
}
var SINCE_RE = /^(?:depuis|since|ab|desde|dal)\s+/iu;
var SEP_RE = /^\s*(?:[-–—−/]|(?:au|à|a|to|until|jusqu['’]?(?:à|a|au|en)?|bis|hasta|tot))\s*/iu;
function findDateRanges(text) {
	const found = [];
	let i = 0;
	while (i < text.length) {
		if (!isBoundary(text, i)) {
			i += 1;
			continue;
		}
		const since = SINCE_RE.exec(text.slice(i));
		const cursor = since ? i + since[0].length : i;
		const start = parsePoint(text, cursor);
		if (!start || since && !isBoundary(text, cursor)) {
			i += 1;
			continue;
		}
		const sep = SEP_RE.exec(text.slice(start.next));
		if (sep) {
			const after = start.next + sep[0].length;
			const present = new RegExp(`^(?:${PRESENT})`, "iu").exec(text.slice(after));
			if (present && isBoundary(text, after)) {
				const next = after + present[0].length;
				found.push({
					raw: text.slice(i, next),
					index: i,
					start: {
						year: start.year,
						month: start.month
					},
					end: null,
					openEnded: true,
					isRange: true
				});
				i = next;
				continue;
			}
			const end = parsePoint(text, after);
			if (end) {
				found.push({
					raw: text.slice(i, end.next),
					index: i,
					start: {
						year: start.year,
						month: start.month
					},
					end: {
						year: end.year,
						month: end.month
					},
					openEnded: false,
					isRange: true
				});
				i = end.next;
				continue;
			}
		}
		if (since) {
			found.push({
				raw: text.slice(i, start.next),
				index: i,
				start: {
					year: start.year,
					month: start.month
				},
				end: null,
				openEnded: true,
				isRange: true
			});
			i = start.next;
			continue;
		}
		found.push({
			raw: start.raw,
			index: start.raw === text.slice(cursor, start.next) ? cursor : i,
			start: {
				year: start.year,
				month: start.month
			},
			end: null,
			openEnded: false,
			isRange: false
		});
		i = start.next;
	}
	return found;
}
function isEntryAnchor(line) {
	const text = squash(line);
	if (!text || text.length > 180) return false;
	return findDateRanges(text).some((item) => item.isRange || item.openEnded);
}
function wordish(value) {
	return value ? value.split(/\s+/).filter(Boolean).length : 0;
}
function anchorOnLine(line) {
	if (!isEntryAnchor(line)) return null;
	const ranges = findDateRanges(line);
	return ranges.find((item) => item.isRange || item.openEnded) ?? ranges[0] ?? null;
}
function toParsed(raw) {
	return {
		start: raw.start,
		end: raw.end,
		openEnded: raw.openEnded
	};
}
function dateRule(raw) {
	if (raw.openEnded) return {
		confidence: "high",
		rule: `Fin ouverte : le document écrit « ${raw.raw.trim()} ». Aucune date du jour n'est substituée.`
	};
	return {
		confidence: "high",
		rule: raw.start?.month != null || raw.end?.month != null ? `Découpage calendaire de « ${raw.raw.trim()} » (mois reconnus dans le texte).` : `Découpage de « ${raw.raw.trim()} » en années. Le mois n'est pas écrit.`
	};
}
function lineIsMostlyDate(line) {
	const anchor = anchorOnLine(line);
	if (!anchor) return false;
	return wordish(squash(line).replace(anchor.raw, "").replace(/[|·•,–—-]/g, " ").trim()) <= 2;
}
function byPosition(a, b) {
	return a.y - b.y || a.x - b.x;
}
function median$1(values) {
	if (!values.length) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	return sorted[Math.floor(sorted.length / 2)] ?? 0;
}
function findGutter(lines, pageWidth) {
	if (lines.length < 6 || pageWidth <= 0) return null;
	const bins = 80;
	const width = pageWidth / bins;
	const coverage = new Array(bins).fill(0);
	for (const line of lines) {
		if (line.width > pageWidth * .62) continue;
		const start = Math.max(0, Math.min(79, Math.floor(line.x / width)));
		const end = Math.max(start, Math.min(79, Math.floor((line.x + Math.max(line.width, 1)) / width)));
		for (let index = start; index <= end; index += 1) coverage[index] += 1;
	}
	let best = null;
	for (let index = 10; index < 70; index += 1) {
		if (coverage[index] > 0) continue;
		let left = index;
		let right = index;
		while (left > 8 && coverage[left - 1] === 0) left -= 1;
		while (right < 71 && coverage[right + 1] === 0) right += 1;
		const leftMass = coverage.slice(0, left).reduce((sum, value) => sum + value, 0);
		const rightMass = coverage.slice(right + 1).reduce((sum, value) => sum + value, 0);
		const gap = (right - left + 1) * width;
		if (leftMass < 3 || rightMass < 3 || gap < pageWidth * .015) continue;
		const score = gap * Math.min(leftMass, rightMass);
		if (!best || score > best.score) best = {
			at: (left + right) / 2 * width,
			score
		};
	}
	return best?.at ?? null;
}
function dateRatio(lines) {
	if (!lines.length) return 0;
	return lines.filter((line) => isEntryAnchor(line.text)).length / lines.length;
}
function orderPage(lines, notes) {
	const pageWidth = lines.find((line) => line.pageWidth > 0)?.pageWidth ?? 0;
	const sorted = [...lines].sort(byPosition);
	if (!pageWidth) return sorted;
	const gutter = findGutter(sorted, pageWidth);
	if (gutter == null) return sorted;
	const spans = sorted.filter((line) => line.width > pageWidth * .62 || line.x < gutter - 4 && line.x + line.width > gutter + pageWidth * .08);
	const spanIds = new Set(spans);
	const side = sorted.filter((line) => !spanIds.has(line));
	const left = side.filter((line) => line.x + line.width / 2 < gutter);
	const right = side.filter((line) => line.x + line.width / 2 >= gutter);
	if (left.length < 2 || right.length < 2) return sorted;
	const leftNarrow = median$1(left.map((line) => line.width)) < pageWidth * .32;
	const rightNarrow = median$1(right.map((line) => line.width)) < pageWidth * .32;
	const leftDates = leftNarrow && dateRatio(left) >= .45 && dateRatio(right) < .4;
	const rightDates = rightNarrow && dateRatio(right) >= .45 && dateRatio(left) < .4;
	let flow;
	if (leftDates || rightDates) {
		notes.push("Colonne étroite composée surtout de dates : elle est intercalée verticalement avec le texte d'en face, pas lue comme un bloc séparé.");
		flow = [...left, ...right].sort(byPosition);
	} else {
		const leftWidth = median$1(left.map((line) => line.width));
		const rightWidth = median$1(right.map((line) => line.width));
		const rail = leftWidth <= rightWidth ? left : right;
		const main = leftWidth <= rightWidth ? right : left;
		notes.push("Deux colonnes : la colonne la plus étroite est lue en entier, puis la colonne principale.");
		const minY = Math.min(...side.map((line) => line.y));
		const maxY = Math.max(...side.map((line) => line.y));
		const top = spans.filter((line) => line.y < minY - 2).sort(byPosition);
		const bottom = spans.filter((line) => line.y > maxY + 8).sort(byPosition);
		const middle = spans.filter((line) => !top.includes(line) && !bottom.includes(line));
		const mainFlow = [...main, ...middle].sort(byPosition);
		return [
			...top,
			...[...rail].sort(byPosition),
			...mainFlow,
			...bottom
		];
	}
	if (!spans.length) return flow;
	const minY = Math.min(...side.map((line) => line.y));
	const maxY = Math.max(...side.map((line) => line.y));
	const top = spans.filter((line) => line.y < minY - 2).sort(byPosition);
	const bottom = spans.filter((line) => line.y > maxY + 8).sort(byPosition);
	const middle = spans.filter((line) => !top.includes(line) && !bottom.includes(line));
	return [
		...top,
		...[...flow, ...middle].sort(byPosition),
		...bottom
	];
}
function readingOrder(lines) {
	if (!lines.some((line) => line.pageWidth > 0 && (line.width > 0 || line.x > 0 || line.y > 0))) return {
		lines,
		notes: []
	};
	const notes = [];
	const pages = /* @__PURE__ */ new Map();
	for (const line of lines) {
		const bucket = pages.get(line.page) ?? [];
		bucket.push(line);
		pages.set(line.page, bucket);
	}
	const ordered = [];
	for (const page of [...pages.keys()].sort((a, b) => a - b)) ordered.push(...orderPage(pages.get(page) ?? [], notes));
	return {
		lines: ordered,
		notes: [...new Set(notes)]
	};
}
var HEADING_GROUPS = [
	{
		kind: "experience",
		phrases: [
			"expérience professionnelle",
			"expériences professionnelles",
			"experience professionnelle",
			"experiences professionnelles",
			"parcours professionnel",
			"parcours professionnels",
			"historique professionnel",
			"emplois",
			"expérience",
			"expériences",
			"experience",
			"experiences",
			"parcours",
			"parcours et réalisations",
			"parcours & réalisations",
			"parcours et realisations",
			"parcours & realisations",
			"experiences et realisations",
			"experiences et réalisations",
			"experiences & realisations",
			"experiences & réalisations",
			"work experience",
			"professional experience",
			"employment history",
			"work history",
			"career history",
			"employment",
			"berufserfahrung",
			"beruflicher werdegang",
			"werdegang",
			"experiencia profesional",
			"experiencia laboral",
			"experiencia",
			"esperienza professionale",
			"esperienza lavorativa",
			"expérience de travail"
		]
	},
	{
		kind: "education",
		phrases: [
			"formation académique",
			"formation academique",
			"formations",
			"formation",
			"études",
			"etudes",
			"scolarité",
			"scolarite",
			"diplômes",
			"education",
			"academic background",
			"ausbildung",
			"formación académica",
			"formacion academica",
			"formación",
			"formacion",
			"istruzione",
			"formazione",
			"studi"
		]
	},
	{
		kind: "skills",
		phrases: [
			"compétences techniques",
			"competences techniques",
			"compétences professionnelles",
			"competences professionnelles",
			"compétences",
			"competences",
			"savoir-faire",
			"savoir faire",
			"aptitudes",
			"technical skills",
			"core skills",
			"skills",
			"kenntnisse",
			"fähigkeiten",
			"fahigkeiten",
			"habilidades",
			"competenze",
			"expertise",
			"logiciels",
			"outils",
			"software",
			"tools"
		]
	},
	{
		kind: "languages",
		phrases: [
			"langues étrangères",
			"langues etrangeres",
			"langues vivantes",
			"langues",
			"langue",
			"languages",
			"language skills",
			"sprachen",
			"sprachkenntnisse",
			"idiomas",
			"lingue"
		]
	},
	{
		kind: "certifications",
		phrases: [
			"certifications",
			"certification",
			"certificats",
			"certificat",
			"certificates",
			"licenses",
			"licences",
			"habilitations",
			"zertifizierungen",
			"zertifikate",
			"certificaciones",
			"certificazioni"
		]
	},
	{
		kind: "profile",
		phrases: [
			"à propos",
			"a propos",
			"profil professionnel",
			"professional summary",
			"professional profile",
			"profil",
			"profile",
			"summary",
			"about me",
			"about",
			"objectif professionnel",
			"objectif",
			"objectifs",
			"présentation",
			"presentation",
			"zusammenfassung",
			"über mich",
			"uber mich",
			"perfil",
			"profilo"
		]
	},
	{
		kind: "interests",
		phrases: [
			"centres d'intérêt",
			"centres d'intérêts",
			"centre d'intérêt",
			"centres d interet",
			"loisirs",
			"intérêts",
			"interets",
			"hobbies",
			"interests",
			"interessen",
			"intereses",
			"interessi"
		]
	},
	{
		kind: "projects",
		phrases: [
			"projets personnels",
			"projets",
			"projet",
			"personal projects",
			"projects",
			"projekte",
			"proyectos",
			"progetti"
		]
	},
	{
		kind: "volunteering",
		phrases: [
			"bénévolat",
			"benevolat",
			"volontariat",
			"engagement associatif",
			"volontaire",
			"volunteering",
			"volunteer experience",
			"volunteer",
			"ehrenamt"
		]
	},
	{
		kind: "publications",
		phrases: [
			"publications",
			"publication",
			"publications scientifiques"
		]
	},
	{
		kind: "awards",
		phrases: [
			"distinctions",
			"prix et distinctions",
			"awards",
			"honors",
			"honours",
			"auszeichnungen"
		]
	},
	{
		kind: "references",
		phrases: [
			"références",
			"references",
			"referees",
			"referenzen"
		]
	},
	{
		kind: "contact",
		phrases: [
			"coordonnées",
			"coordonnees",
			"contact",
			"contacts",
			"kontaktdaten",
			"contacto"
		]
	}
];
var QUALIFIERS = /* @__PURE__ */ new Set([
	"professionnelle",
	"professionnelles",
	"professional",
	"professionals",
	"work",
	"history",
	"technique",
	"techniques",
	"technical",
	"personnelle",
	"personnelles",
	"transverse",
	"transverses",
	"cle",
	"cles",
	"vivante",
	"vivantes",
	"etrangere",
	"etrangeres",
	"informatique",
	"informatiques",
	"autre",
	"autres",
	"additionnelle",
	"additionnelles",
	"academique",
	"academiques",
	"continue",
	"initiales",
	"summary"
]);
var CONNECTORS = /* @__PURE__ */ new Set([
	"et",
	"and",
	"und",
	"y",
	"de",
	"du",
	"des",
	"of",
	"the",
	"e",
	"&"
]);
var headingIndex = null;
function headings() {
	if (headingIndex) return headingIndex;
	headingIndex = HEADING_GROUPS.flatMap((group) => group.phrases.map((phrase) => ({
		phrase: fold(phrase),
		kind: group.kind
	}))).sort((a, b) => b.phrase.length - a.phrase.length);
	return headingIndex;
}
function matchHeading(foldedLine) {
	const line = foldedLine.replace(/[:：.\-–—]+$/g, "").trim();
	if (!line || line.split(" ").length > 8) return null;
	for (const item of headings()) {
		if (line === item.phrase) return item.kind;
		if (line.startsWith(`${item.phrase} `)) {
			const rest = line.slice(item.phrase.length + 1).split(" ").filter(Boolean);
			if (rest.length > 0 && rest.length <= 4 && rest.every((word) => QUALIFIERS.has(word) || CONNECTORS.has(word))) return item.kind;
		}
	}
	return null;
}
var JOB_PHRASES = [
	"account executive",
	"account manager",
	"sales executive",
	"business developer",
	"key account manager",
	"responsable des operations",
	"responsable des relations clients",
	"co-fondateur",
	"directeur general",
	"developpeur",
	"developpeuse",
	"developer",
	"ingenieur",
	"ingenieure",
	"engineer",
	"softwareentwickler",
	"softwareentwicklerin",
	"entwickler",
	"entwicklerin",
	"consultant",
	"consultante",
	"consulente",
	"berater",
	"beraterin",
	"chef de projet",
	"cheffe de projet",
	"directeur",
	"directrice",
	"director",
	"responsable",
	"manager",
	"analyste",
	"analyst",
	"charge de",
	"chargee de",
	"technicien",
	"technicienne",
	"technician",
	"assistant",
	"assistante",
	"designer",
	"architecte",
	"architect",
	"administrateur",
	"administratrice",
	"data scientist",
	"data analyst",
	"product owner",
	"product manager",
	"product designer",
	"scrum master",
	"devops",
	"full stack",
	"fullstack",
	"front-end",
	"frontend",
	"back-end",
	"backend",
	"stagiaire",
	"intern",
	"alternant",
	"alternante",
	"apprenti",
	"doctorant",
	"professeur",
	"professor",
	"enseignant",
	"teacher",
	"chercheur",
	"researcher",
	"comptable",
	"accountant",
	"auditeur",
	"auditor",
	"juriste",
	"avocat",
	"lawyer",
	"infirmier",
	"infirmiere",
	"nurse",
	"medecin",
	"commercial",
	"commerciale",
	"sales",
	"recruteur",
	"recruiter",
	"graphiste",
	"redacteur",
	"redactrice",
	"writer",
	"editor",
	"formateur",
	"formatrice",
	"coordinateur",
	"coordinatrice",
	"coordinator",
	"fondateur",
	"fondatrice",
	"founder",
	"president",
	"presidente",
	"gerant",
	"gerante",
	"specialiste",
	"specialist",
	"expert",
	"experte",
	"lead",
	"head of",
	"officer",
	"testeur",
	"testeuse",
	"projektleiter",
	"projektleiterin",
	"desarrollador",
	"desarrolladora",
	"ingeniero",
	"ingeniera",
	"sviluppatore",
	"sviluppatrice",
	"ux designer",
	"ui designer",
	"ux",
	"qa"
];
var ORG_WORDS = [
	"cabinet",
	"studio",
	"agence",
	"laboratoire",
	"hopital",
	"hospital",
	"mairie",
	"ministere",
	"association",
	"fondation",
	"holding",
	"groupe",
	"group",
	"societe",
	"company",
	"banque",
	"bank",
	"clinique",
	"clinic",
	"labs",
	"lab",
	"partners",
	"associes",
	"eeat",
	"urban stay",
	"allstay",
	"staylike",
	"miki travel",
	"holiday agent nice"
];
var LEGAL = [
	"sasu",
	"sarl",
	"eurl",
	"sas",
	"sci",
	"llc",
	"ltd",
	"gmbh",
	"plc",
	"corp",
	"inc",
	"spa",
	"srl",
	"bv",
	"nv",
	"oy",
	"ab",
	"lp",
	"llp",
	"sa",
	"ag",
	"sl"
];
var DEGREE_PHRASES = [
	"doctorat",
	"phd",
	"master",
	"msc",
	"mba",
	"licence",
	"bachelor",
	"bsc",
	"bfa",
	"bts",
	"dut",
	"baccalaureat",
	"bac pro",
	"baccalauréat professionnel",
	"baccalaureat professionnel",
	"bep",
	"cap",
	"brevet federal",
	"brevet fédéral",
	"brevet",
	"cfc",
	"afp",
	"ingenieur",
	"ingenieure",
	"diplome",
	"diploma",
	"maitrise",
	"magistere",
	"bachelor of",
	"master of",
	"high school",
	"a level",
	"meng",
	"beng",
	"llb",
	"llm"
];
var SCHOOL_WORDS = [
	"universite",
	"university",
	"universitat",
	"universidad",
	"universita",
	"ecole",
	"school",
	"hochschule",
	"fachhochschule",
	"institute",
	"institut",
	"iut",
	"iae",
	"polytechnique",
	"lycee",
	"gymnasium",
	"conservatoire",
	"faculty",
	"faculte",
	"akademie",
	"academy",
	"academie",
	"college"
];
var CITIES = [
	"paris",
	"lyon",
	"marseille",
	"toulouse",
	"lille",
	"bordeaux",
	"nantes",
	"strasbourg",
	"rennes",
	"montpellier",
	"grenoble",
	"rouen",
	"dijon",
	"angers",
	"reims",
	"bruxelles",
	"brussels",
	"geneve",
	"geneva",
	"lausanne",
	"zurich",
	"montreal",
	"quebec",
	"londres",
	"london",
	"berlin",
	"munich",
	"munchen",
	"hamburg",
	"frankfurt",
	"cologne",
	"koln",
	"amsterdam",
	"madrid",
	"barcelone",
	"barcelona",
	"lisbonne",
	"lisbon",
	"rome",
	"roma",
	"milan",
	"milano",
	"dublin",
	"vienne",
	"vienna",
	"wien",
	"prague",
	"varsovie",
	"stockholm",
	"oslo",
	"copenhague",
	"helsinki",
	"luxembourg",
	"new york",
	"san francisco",
	"boston",
	"seattle",
	"chicago",
	"los angeles",
	"toronto",
	"vancouver",
	"sydney",
	"melbourne",
	"singapore",
	"hong kong",
	"dubai",
	"tokyo",
	"seoul",
	"edinburgh",
	"manchester",
	"lyon",
	"nantes",
	"bordeaux"
];
var COUNTRIES = [
	"france",
	"belgique",
	"belgium",
	"suisse",
	"switzerland",
	"canada",
	"luxembourg",
	"allemagne",
	"germany",
	"espagne",
	"spain",
	"italie",
	"italy",
	"portugal",
	"royaume-uni",
	"united kingdom",
	"united states",
	"usa",
	"pays-bas",
	"netherlands",
	"autriche",
	"austria",
	"irlande",
	"ireland",
	"maroc",
	"tunisie",
	"senegal",
	"bresil",
	"brazil",
	"mexique",
	"mexico",
	"inde",
	"india",
	"chine",
	"china",
	"japon",
	"japan",
	"australie",
	"australia",
	"pologne",
	"poland",
	"suede",
	"sweden",
	"norvege",
	"norway",
	"danemark",
	"denmark",
	"finlande",
	"finland",
	"grece",
	"greece"
];
var REMOTE_WORDS = [
	"teletravail",
	"remote",
	"hybride",
	"hybrid",
	"distanciel",
	"presentiel",
	"home office",
	"homeoffice",
	"full remote",
	"on site",
	"onsite"
];
var TECH = [
	"javascript",
	"typescript",
	"python",
	"java",
	"php",
	"ruby",
	"swift",
	"kotlin",
	"scala",
	"golang",
	"rust",
	"sql",
	"nosql",
	"html",
	"css",
	"react",
	"vue",
	"angular",
	"django",
	"flask",
	"spring",
	"laravel",
	"nodejs",
	"node",
	"docker",
	"kubernetes",
	"aws",
	"azure",
	"gcp",
	"git",
	"linux",
	"postgresql",
	"postgres",
	"mysql",
	"mongodb",
	"redis",
	"graphql",
	"figma",
	"sketch",
	"photoshop",
	"illustrator",
	"jira",
	"excel",
	"sap",
	"salesforce",
	"tableau",
	"power bi",
	"spark",
	"hadoop",
	"tensorflow",
	"pytorch",
	"pandas",
	"numpy",
	"terraform",
	"ansible",
	"jenkins",
	"gitlab",
	"github",
	"snowflake",
	"bigquery",
	"matlab",
	"autocad",
	"revit",
	"seo",
	"hubspot",
	"scrum",
	"kanban",
	"agile",
	"c++",
	"c#"
];
var SOFT = [
	"communication",
	"leadership",
	"travail d'equipe",
	"esprit d'equipe",
	"rigueur",
	"autonomie",
	"adaptabilite",
	"organisation",
	"pedagogie",
	"esprit de synthese",
	"negociation",
	"creativite",
	"curiosite",
	"initiative",
	"teamwork",
	"problem solving",
	"resolution de problemes",
	"time management",
	"empathie",
	"facilitation",
	"collaboration",
	"prise de parole",
	"ecoute",
	"gestion du stress",
	"force de proposition"
];
var LANGUAGES = [
	{
		canon: "Français",
		names: [
			"français",
			"francais",
			"french",
			"französisch",
			"franzosisch"
		],
		codes: ["fr"]
	},
	{
		canon: "Anglais",
		names: [
			"anglais",
			"english",
			"englisch"
		],
		codes: ["en"]
	},
	{
		canon: "Allemand",
		names: [
			"allemand",
			"german",
			"deutsch"
		],
		codes: ["de"]
	},
	{
		canon: "Espagnol",
		names: [
			"espagnol",
			"spanish",
			"español",
			"espanol",
			"spanisch"
		],
		codes: ["es"]
	},
	{
		canon: "Italien",
		names: [
			"italien",
			"italian",
			"italiano",
			"italienisch"
		],
		codes: ["it"]
	},
	{
		canon: "Portugais",
		names: [
			"portugais",
			"portuguese",
			"português",
			"portugues",
			"portugiesisch"
		],
		codes: ["pt"]
	},
	{
		canon: "Néerlandais",
		names: [
			"néerlandais",
			"neerlandais",
			"dutch",
			"niederländisch",
			"nederlands"
		],
		codes: ["nl"]
	},
	{
		canon: "Arabe",
		names: [
			"arabe",
			"arabic",
			"arabisch"
		],
		codes: ["ar"]
	},
	{
		canon: "Chinois",
		names: [
			"chinois",
			"chinese",
			"mandarin",
			"chinesisch"
		],
		codes: ["zh"]
	},
	{
		canon: "Japonais",
		names: [
			"japonais",
			"japanese",
			"japanisch"
		],
		codes: ["ja"]
	},
	{
		canon: "Russe",
		names: [
			"russe",
			"russian",
			"russisch"
		],
		codes: ["ru"]
	},
	{
		canon: "Polonais",
		names: [
			"polonais",
			"polish",
			"polnisch"
		],
		codes: ["pl"]
	},
	{
		canon: "Turc",
		names: [
			"turc",
			"turkish",
			"türkisch",
			"turkisch"
		],
		codes: ["tr"]
	},
	{
		canon: "Suédois",
		names: [
			"suédois",
			"suedois",
			"swedish",
			"schwedisch"
		],
		codes: ["sv"]
	},
	{
		canon: "Norvégien",
		names: [
			"norvégien",
			"norvegien",
			"norwegian"
		],
		codes: ["no"]
	},
	{
		canon: "Danois",
		names: [
			"danois",
			"danish",
			"dänisch",
			"danisch"
		],
		codes: ["da"]
	},
	{
		canon: "Finnois",
		names: ["finnois", "finnish"],
		codes: ["fi"]
	},
	{
		canon: "Grec",
		names: [
			"grec",
			"greek",
			"griechisch"
		],
		codes: ["el"]
	},
	{
		canon: "Hébreu",
		names: [
			"hébreu",
			"hebreu",
			"hebrew"
		],
		codes: ["he"]
	},
	{
		canon: "Hindi",
		names: ["hindi"],
		codes: ["hi"]
	},
	{
		canon: "Coréen",
		names: [
			"coréen",
			"coreen",
			"korean"
		],
		codes: ["ko"]
	},
	{
		canon: "Roumain",
		names: ["roumain", "romanian"],
		codes: ["ro"]
	},
	{
		canon: "Hongrois",
		names: ["hongrois", "hungarian"],
		codes: ["hu"]
	},
	{
		canon: "Tchèque",
		names: [
			"tchèque",
			"tcheque",
			"czech"
		],
		codes: ["cs"]
	},
	{
		canon: "Ukrainien",
		names: ["ukrainien", "ukrainian"],
		codes: ["uk"]
	},
	{
		canon: "Catalan",
		names: ["catalan"],
		codes: ["ca"]
	},
	{
		canon: "Basque",
		names: ["basque", "euskara"]
	},
	{
		canon: "Breton",
		names: ["breton"]
	},
	{
		canon: "Latin",
		names: ["latin"]
	}
];
function scorePhrases(text, phrases, hit) {
	const folded = fold(text);
	let hits = 0;
	for (const phrase of phrases) if (includesPhrase(folded, fold(phrase))) hits += 1;
	if (!hits) return 0;
	return hit + Math.min(hits - 1, 2) * .35;
}
function jobScore(text) {
	return scorePhrases(text, JOB_PHRASES, 1.2);
}
function hasLegalForm(text) {
	const folded = fold(text);
	return LEGAL.some((form) => includesPhrase(folded, form));
}
function orgScore(text) {
	const folded = fold(text);
	let score = 0;
	if (hasLegalForm(text)) score += 2.4;
	for (const word of ORG_WORDS) if (includesPhrase(folded, word)) score += 1.3;
	if (degreeScore(text) >= 2) score -= 1.2;
	return Math.max(0, score);
}
function degreeScore(text) {
	return scorePhrases(text, DEGREE_PHRASES, 2);
}
function schoolScore(text) {
	return scorePhrases(text, SCHOOL_WORDS, 2.2);
}
function scoreLocation(text) {
	const folded = fold(text);
	if (!folded || folded.length > 48) return 0;
	if (schoolScore(text) >= 2 || degreeScore(text) >= 2) return 0;
	if (hasLegalForm(text)) return 0;
	let score = 0;
	if (REMOTE_WORDS.some((word) => includesPhrase(folded, fold(word)))) score += 2;
	if (COUNTRIES.some((word) => includesPhrase(folded, word))) score += 2;
	if (CITIES.some((word) => includesPhrase(folded, word))) score += 1.8;
	if (/\b\d{4,5}\b/.test(text) && /\p{L}/u.test(text)) score += 1.2;
	if (jobScore(text) >= 1.1) return 0;
	return score;
}
function classifySkill(text) {
	const folded = fold(text);
	const tech = TECH.some((word) => includesPhrase(folded, fold(word)));
	const soft = SOFT.some((word) => includesPhrase(folded, fold(word)));
	if (tech && !soft) return "technique";
	if (soft && !tech) return "comportementale";
	return null;
}
function matchLanguageName(text) {
	const folded = fold(text);
	let best = null;
	for (const language of LANGUAGES) for (const name of language.names) {
		const phrase = fold(name);
		if (includesPhrase(folded, phrase) && (!best || phrase.length > fold(best.phrase).length)) best = {
			canon: language.canon,
			phrase: name
		};
	}
	if (best) return best;
	if (folded.length <= 3) {
		for (const language of LANGUAGES) if (language.codes?.includes(folded)) return {
			canon: language.canon,
			phrase: folded
		};
	}
	return null;
}
function canonLevel(raw) {
	const folded = fold(raw);
	const cecr = /(?:^|[^a-z0-9])([abc][12])(?![a-z0-9])/u.exec(folded);
	if (cecr) {
		const value = cecr[1].toUpperCase();
		return deduction({
			scheme: "cecrl",
			value
		}, raw, "high", `Le niveau ${value} est écrit dans le document. Le libellé original est conservé à côté.`);
	}
	for (const label of [
		{
			value: "natif",
			phrases: [
				"langue maternelle",
				"mother tongue",
				"muttersprache",
				"natif",
				"native",
				"maternelle",
				"bilingue",
				"bilingual"
			],
			rule: "Le document indique une langue maternelle, native ou bilingue. Aucun grade CECRL n'est ajouté."
		},
		{
			value: "courant",
			phrases: [
				"courant",
				"couramment",
				"fluent",
				"fluently",
				"fliessend",
				"avance",
				"advanced",
				"proficient",
				"c1"
			],
			rule: "Étiquette interne « courant » à partir du mot écrit. Ce n'est pas un niveau CECRL s'il n'est pas noté."
		},
		{
			value: "professionnel",
			phrases: [
				"professional working",
				"full professional",
				"professionnel",
				"professional"
			],
			rule: "Le document parle d'un niveau professionnel. Aucune équivalence CECRL n'est calculée."
		},
		{
			value: "intermédiaire",
			phrases: [
				"intermediaire",
				"intermediate",
				"conversationnel",
				"mittelstufe",
				"limited working"
			],
			rule: "Étiquette interne « intermédiaire » à partir du mot écrit, sans grade CECRL inventé."
		},
		{
			value: "débutant",
			phrases: [
				"notions",
				"notion",
				"debutant",
				"beginner",
				"elementary",
				"basic",
				"scolaire",
				"grundkenntnisse",
				"basique"
			],
			rule: "Étiquette interne « débutant » à partir du mot écrit (notions, elementary, scolaire…)."
		}
	]) if (label.phrases.some((phrase) => includesPhrase(folded, fold(phrase)) || folded.includes(fold(phrase)))) return deduction({
		scheme: "label",
		value: label.value
	}, raw, "medium", label.rule);
	return null;
}
var DOC_WORDS = [
	{
		label: "français",
		words: [
			"avec",
			"dans",
			"pour",
			"une",
			"des",
			"les",
			"sur",
			"par",
			"est",
			"cette",
			"nous",
			"chez",
			"aux"
		]
	},
	{
		label: "anglais",
		words: [
			"the",
			"and",
			"with",
			"for",
			"from",
			"that",
			"this",
			"have",
			"was",
			"were",
			"previously",
			"of",
			"on",
			"in",
			"to",
			"by"
		]
	},
	{
		label: "allemand",
		words: [
			"und",
			"der",
			"die",
			"das",
			"mit",
			"fur",
			"ein",
			"eine",
			"von",
			"ist",
			"im"
		]
	},
	{
		label: "espagnol",
		words: [
			"el",
			"los",
			"las",
			"con",
			"para",
			"una",
			"del",
			"por",
			"como"
		]
	},
	{
		label: "italien",
		words: [
			"il",
			"con",
			"per",
			"della",
			"una",
			"che",
			"nel",
			"sono"
		]
	}
];
function detectDocumentLanguage(text) {
	const originalTokens = squash(text).split(/\s+/).filter(Boolean);
	const tokens = new Set(originalTokens.map((token) => fold(token)));
	const scored = DOC_WORDS.map((entry) => ({
		label: entry.label,
		hits: entry.words.filter((word) => tokens.has(fold(word)))
	})).sort((a, b) => b.hits.length - a.hits.length);
	const top = scored[0];
	const second = scored[1];
	if (!top || top.hits.length < 3 || top.hits.length < (second?.hits.length ?? 0) + 2) return null;
	const example = top.hits[0] ?? "";
	const surface = originalTokens.find((token) => fold(token) === fold(example)) ?? example;
	return deduction(top.label, surface, "low", `Indice sur la langue du document, pas une langue déclarée par la personne. Mots-outils ${top.label} relevés : ${top.hits.length}. Exemple présent : « ${surface} ».`);
}
var ACTION = /^(mise|mises|developpement|creation|gestion|pilotage|conception|implementation|participation|encadrement|maintenance|automatisation|built|led|developed|designed|managed|implemented|responsible|entwicklung|konzeption|migration|refonte|support|suivi|animation|coordination|analyse|redaction|organisation|optimisation|deploiement|contribution|realisation|accompagnement|entretien|interviewed)/i;
function headerLike(text) {
	const value = squash(text);
	if (!value || isBullet(value) || isEntryAnchor(value)) return false;
	if (value.length > 100 || wordCount(value) > 12) return false;
	if (/[.!?]/.test(value) && wordCount(value) >= 6) return false;
	if (ACTION.test(value.toLowerCase()) && wordCount(value) >= 4) return false;
	return true;
}
function splitByGaps(lines) {
	const blocks = [];
	let current = [];
	const flush = () => {
		if (current.some((line) => line.text.trim())) blocks.push(current);
		current = [];
	};
	for (const line of lines) {
		if (!line.text.trim()) {
			flush();
			continue;
		}
		const prev = current[current.length - 1];
		if (prev && line.y > 0 && prev.y > 0 && line.height > 0 && line.y > prev.y + prev.height + line.height * 1.15) flush();
		current.push(line);
	}
	flush();
	return blocks;
}
function splitEntries(lines) {
	const anchors = [];
	lines.forEach((line, index) => {
		if (line.text.trim() && isEntryAnchor(line.text)) anchors.push(index);
	});
	if (!anchors.length) return splitByGaps(lines);
	let above = 0;
	let below = 0;
	for (const anchor of anchors) {
		const prev = lines[anchor - 1];
		const next = lines[anchor + 1];
		if (prev && headerLike(prev.text)) above += 1;
		if (next && headerLike(next.text)) below += 1;
	}
	if (below > above) {
		const entries = anchors.map((anchor, index) => lines.slice(anchor, anchors[index + 1] ?? lines.length));
		const first = anchors[0] ?? 0;
		if (first > 0) {
			const pre = lines.slice(0, first).filter((line) => line.text.trim());
			if (pre.length && entries[0] && pre.every((line) => headerLike(line.text))) entries[0] = [...pre, ...entries[0]];
			else if (pre.length) entries.unshift(pre);
		}
		return entries.filter((entry) => entry.some((line) => line.text.trim()));
	}
	const starts = anchors.map((anchor, index) => {
		const floor = index === 0 ? 0 : (anchors[index - 1] ?? 0) + 1;
		let start = anchor;
		for (let cursor = anchor - 1; cursor >= floor && anchor - cursor <= 5; cursor -= 1) {
			const text = lines[cursor]?.text.trim() ?? "";
			if (!text || !headerLike(text)) break;
			start = cursor;
		}
		return start;
	});
	const entries = starts.map((start, index) => lines.slice(start, starts[index + 1] ?? lines.length));
	const firstStart = starts[0] ?? 0;
	if (firstStart > 0) {
		const pre = lines.slice(0, firstStart).filter((line) => line.text.trim());
		if (pre.length) entries.unshift(pre);
	}
	return entries.filter((entry) => entry.some((line) => line.text.trim()));
}
function splitComma(text) {
	const parts = text.split(/\s*,\s*/).map((part) => squash(part)).filter(Boolean);
	if (parts.length <= 1 || parts.length > 4) return text ? [text] : [];
	if (parts.some((part) => part.length > 48 || wordCount(part) > 6)) return [text];
	return parts;
}
function explode(line) {
	let working = squash(line.text);
	if (!working || lineIsMostlyDate(working)) return [];
	const ranges = findDateRanges(working).filter((range) => range.isRange || range.openEnded);
	for (const range of ranges) working = squash(working.replace(range.raw, " "));
	if (!working) return [];
	const chunks = working.split(/\s*(?:\||·|•)\s*|\s+[—–]\s+|\s+-\s+(?=[\p{Lu}])/u);
	const pieces = [];
	for (const chunk of chunks) for (const part of chunk.split(/\s+(?:chez|at|@)\s+/i)) for (const bit of splitComma(squash(part))) pieces.push({
		text: bit,
		line
	});
	return pieces.filter((piece) => piece.text);
}
function collectHeader(entry) {
	const header = [];
	for (const line of entry) {
		const text = line.text.trim();
		if (!text) continue;
		if (isBullet(text) || line.listItem) break;
		if (wordCount(text) > 14) break;
		if (ACTION.test(text.toLowerCase()) && wordCount(text) >= 4) break;
		if (/[.!?]/.test(text) && wordCount(text) >= 5 && !isEntryAnchor(text)) break;
		header.push(line);
	}
	return header;
}
function datedFrom(entry) {
	for (const line of entry) {
		const anchor = anchorOnLine(line.text);
		if (!anchor) continue;
		const info = dateRule(anchor);
		return {
			raw: observed(anchor.raw, line.text, pageOf(line), "high", "pattern", "Intervalle écrit sur la ligne, détaché du reste sans reformulation."),
			parsed: deduction(toParsed(anchor), anchor.raw, info.confidence, info.rule)
		};
	}
	return null;
}
function extractRealizations(lines) {
	const items = [];
	let current = "";
	for (const line of lines) {
		const text = squash(line.text);
		if (!text) continue;
		if (matchHeading(fold(text))) break;
		const bulletMatch = /^\s*(?:[-–—•·▪▸►*●○◆◇■□➔→]|\d{1,2}[.)])\s+(.+)$/u.exec(text);
		if (bulletMatch && bulletMatch[1]) {
			if (current) items.push(current);
			current = bulletMatch[1].trim();
		} else if (/^\s*[-–—•·▪▸►*●○◆◇■□➔→]\s*$/u.test(text)) continue;
		else if (line.listItem) {
			if (current) items.push(current);
			current = text.replace(/^\s*[-–—•·▪▸►*●○◆◇■□➔→]\s*/u, "").trim();
		} else if (!current) current = text;
		else if (/[.!?]$/.test(current) || /^[\p{Lu}]/u.test(text)) {
			items.push(current);
			current = text;
		} else current += " " + text;
	}
	if (current) items.push(current);
	return items.filter(Boolean);
}
function descriptionFrom(entry, header) {
	const used = new Set(header);
	const rawBody = entry.filter((line) => line.text.trim() && !used.has(line) && !lineIsMostlyDate(line.text));
	if (!rawBody.length) return null;
	const body = [];
	for (const line of rawBody) {
		const t = squash(line.text);
		if (!isEntryAnchor(t) && matchHeading(fold(t))) break;
		body.push(line);
	}
	if (!body.length) return null;
	const realizations = extractRealizations(body);
	return {
		text: body.map((line) => squash(line.text)).join("\n"),
		line: body[0],
		realizations
	};
}
function choose(pieces, mode) {
	const isEquiv = (text) => /^(?:équivalent|equivalent)\s+(?:au|à|a|du|de|to)\b/i.test(squash(text));
	const scored = pieces.map((piece) => ({
		piece,
		title: mode === "experience" ? jobScore(piece.text) : isEquiv(piece.text) ? -99 : degreeScore(piece.text),
		org: mode === "experience" ? orgScore(piece.text) : isEquiv(piece.text) ? -99 : schoolScore(piece.text),
		loc: scoreLocation(piece.text)
	}));
	const used = /* @__PURE__ */ new Set();
	let location = null;
	const bestLoc = [...scored].sort((a, b) => b.loc - a.loc)[0];
	if (bestLoc && bestLoc.loc >= 1.6) {
		location = bestLoc.piece;
		used.add(bestLoc.piece);
	}
	const pool = scored.filter((item) => !used.has(item.piece) && !isEquiv(item.piece.text));
	let title = null;
	let org = null;
	let ambiguity = null;
	if (mode === "education" && location) {
		const schoolOnLocLine = pool.find((item) => item.piece.line === location.line);
		if (schoolOnLocLine) {
			org = schoolOnLocLine.piece;
			used.add(schoolOnLocLine.piece);
		}
	}
	const remainingPool = pool.filter((item) => item.piece !== org);
	const titleBest = [...remainingPool].sort((a, b) => b.title - a.title)[0];
	const orgBest = [...remainingPool].sort((a, b) => b.org - a.org)[0];
	const titleOk = !!titleBest && titleBest.title >= (mode === "experience" ? 1.1 : 1.4);
	const orgOk = !!orgBest && (orgBest.org >= (mode === "experience" ? 1.2 : 1.4) || mode === "experience" && orgScore(orgBest.piece.text) >= 2.4);
	if (!org && titleOk && orgOk && titleBest && orgBest && titleBest.piece !== orgBest.piece) {
		title = titleBest.piece;
		org = orgBest.piece;
	} else if (!org && titleOk && orgOk && titleBest && titleBest.piece === orgBest?.piece) {
		if (Math.abs(titleBest.title - titleBest.org) < .55) ambiguity = {
			code: "entry.role.ambiguous",
			message: "Le même libellé ressemble à la fois à un poste et à une organisation. Rien n'est tranché.",
			candidates: remainingPool.map((item) => item.piece.text),
			evidence: remainingPool.map((item) => item.piece.line.text)
		};
		else if (titleBest.title > titleBest.org) title = titleBest.piece;
		else org = titleBest.piece;
	} else if (titleOk && titleBest) {
		title = titleBest.piece;
		if (mode === "education" && !org) {
			const remainingOrg = remainingPool.find((item) => item.piece !== title);
			if (remainingOrg) org = remainingOrg.piece;
		}
	} else if (!org && orgOk && orgBest) {
		org = orgBest.piece;
		if (mode === "education") {
			const remainingTitle = remainingPool.find((item) => item.piece !== org);
			if (remainingTitle) title = remainingTitle.piece;
		}
	} else if (!title && mode === "education" && remainingPool.length > 0) title = remainingPool[0].piece;
	else if (remainingPool.length && !title && !org) {
		if (mode === "education" && remainingPool.length >= 2) {
			title = remainingPool[0].piece;
			org = remainingPool[1].piece;
		} else if (mode === "education" && remainingPool.length === 1) title = remainingPool[0].piece;
		else ambiguity = {
			code: "entry.role.ambiguous",
			message: mode === "experience" ? "Poste et organisation non départagés : aucun indice net (métier, forme juridique, établissement)." : "Diplôme et établissement non départagés : aucun indice net dans les lignes d'en-tête.",
			candidates: remainingPool.map((item) => item.piece.text),
			evidence: [...new Set(remainingPool.map((item) => item.piece.line.text))]
		};
	}
	const taken = new Set([
		title,
		org,
		location
	].filter(Boolean));
	const unplaced = pieces.filter((piece) => !taken.has(piece)).map((piece) => piece.text);
	return {
		title,
		org,
		location,
		ambiguity,
		unplaced
	};
}
function observePiece(piece, rule, basis = "pattern") {
	if (!piece) return null;
	return observed(piece.text, piece.line.text, pageOf(piece.line), "medium", basis, rule);
}
function parseExperienceSection(allLines) {
	return splitEntries(allLines).map((entry) => {
		const header = collectHeader(entry);
		const choice = choose(header.flatMap((line) => explode(line)), "experience");
		if (!choice.title && !choice.org) return null;
		const degScore = choice.title ? degreeScore(choice.title.text) : 0;
		const jScore = choice.title ? jobScore(choice.title.text) : 0;
		const schScore = choice.org ? schoolScore(choice.org.text) : 0;
		if (degScore >= 1.4 && degScore > jScore || schScore >= 1.4 && degScore >= 1) return null;
		const body = descriptionFrom(entry, header);
		const ambiguities = choice.ambiguity ? [choice.ambiguity] : [];
		return {
			sectionHeading: "experience",
			title: observePiece(choice.title, "Ligne rapprochée d'un métier du lexique (développeur, responsable, designer…)."),
			organization: observePiece(choice.org, "Ligne rapprochée d'une organisation (forme juridique ou mot comme cabinet, labs, groupe)."),
			location: observePiece(choice.location, "Segment rapproché d'un lieu ou d'une mention de télétravail / remote."),
			dates: datedFrom(entry),
			description: body ? observed(body.text, body.text, pageOf(body.line), "high", "section", "Lignes de l'entrée qui ne sont ni le titre, ni l'organisation, ni la date.") : null,
			realizations: body?.realizations ?? [],
			unplaced: choice.unplaced,
			rawLines: entry.map((line) => squash(line.text)).filter(Boolean),
			track: null,
			ambiguities
		};
	}).filter((e) => e !== null);
}
function parseEducationSection(block) {
	return splitEntries(block.lines).map((entry) => {
		const header = collectHeader(entry);
		const choice = choose(header.flatMap((line) => explode(line)), "education");
		const body = descriptionFrom(entry, header);
		return {
			sectionHeading: block.heading,
			degree: observePiece(choice.title, "Ligne rapprochée d'un diplôme du lexique (master, licence, BTS, bachelor…)."),
			school: observePiece(choice.org, "Ligne rapprochée d'un établissement (université, école, school, Hochschule…)."),
			location: observePiece(choice.location, "Segment rapproché d'un lieu, distinct de l'établissement."),
			dates: datedFrom(entry),
			details: body ? observed(body.text, body.text, pageOf(body.line), "high", "section", "Précisions écrites sous le diplôme, non réécrites.") : null,
			unplaced: choice.unplaced,
			rawLines: entry.map((line) => squash(line.text)).filter(Boolean),
			ambiguities: choice.ambiguity ? [choice.ambiguity] : []
		};
	});
}
function splitLoose(lines) {
	const items = [];
	let current = [];
	const flush = () => {
		if (current.some((line) => line.text.trim())) items.push(current);
		current = [];
	};
	for (const line of lines) {
		const text = line.text.trim();
		if (!text) {
			flush();
			continue;
		}
		if ((isBullet(text) || line.listItem || /^[\p{Lu}\d]/u.test(text)) && current.length) flush();
		current.push(line);
	}
	flush();
	return items;
}
function parseCertificationSection(block) {
	return splitLoose(block.lines).map((entry) => {
		const rawLines = entry.map((line) => squash(line.text)).filter(Boolean);
		const joined = rawLines.join(" ");
		const last = [...findDateRanges(joined)].reverse().find((range) => joined.trimEnd().endsWith(range.raw.trim()));
		let name = joined;
		let dates = null;
		if (last) {
			const remainder = squash(joined.slice(0, last.index));
			if (remainder) {
				name = remainder.replace(/[\s,–—\-|:]+$/g, "").trim();
				const info = dateRule(last);
				dates = {
					raw: observed(last.raw, joined, pageOf(entry[0]), "high", "pattern", "Date écrite en fin de certification."),
					parsed: deduction(toParsed(last), last.raw, info.confidence, info.rule)
				};
			}
		}
		let issuerText = null;
		const issued = /^(.*?)(?:\s*[–—|]\s*)(?:délivré par|issued by|delivered by)\s+(.+)$/i.exec(name);
		if (issued?.[1] && issued[2]) {
			issuerText = squash(issued[2]);
			name = squash(issued[1]);
		}
		return {
			name: observed(name || joined, joined, pageOf(entry[0]), "high", "section", "Intitulé conservé depuis la section certifications."),
			issuer: issuerText ? observed(issuerText, joined, pageOf(entry[0]), "high", "label", "Émetteur introduit explicitement par « délivré par » ou « issued by ».") : null,
			dates,
			rawLines
		};
	});
}
function parseProjectSection(block) {
	return splitEntries(block.lines).map((entry) => {
		const header = collectHeader(entry);
		const first = header.find((line) => !lineIsMostlyDate(line.text));
		const body = descriptionFrom(entry, first ? [first, ...header.filter((line) => lineIsMostlyDate(line.text))] : header);
		return {
			title: first ? observed(squash(first.text), first.text, pageOf(first), "medium", "layout", "Première ligne courte du bloc projet. Ce n'est un titre que par position.") : null,
			dates: datedFrom(entry),
			description: body ? observed(body.text, body.text, pageOf(body.line), "high", "section", "Reste du bloc projet, copié tel quel.") : null,
			rawLines: entry.map((line) => squash(line.text)).filter(Boolean)
		};
	});
}
var EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
var URL_RE = /\b(?:https?:\/\/[^\s<>()]+|www\.[^\s<>()]+|(?:linkedin|github|gitlab|behance|dribbble)\.com\/[^\s<>()]+)/gi;
var PHONE_RE = /(?:(?:\+|00)\d{1,3}[\s().-]*)?(?:\(?\d{1,4}\)?[\s().-]*)?(?:\d[\s().-]*){8,}\d/g;
function allMatches(re, text) {
	return [...text.matchAll(new RegExp(re.source, re.flags))].map((match) => squash(match[0]));
}
function emailsIn(text) {
	return allMatches(EMAIL_RE, text);
}
function urlsIn(text) {
	return allMatches(URL_RE, text).map((url) => url.replace(/[),.;:]+$/g, ""));
}
function phonesIn(text) {
	const found = [];
	for (const raw of allMatches(PHONE_RE, text)) {
		const digits = raw.replace(/\D/g, "");
		if (digits.length < 10 || digits.length > 15) continue;
		if (/^(?:19|20)\d{2}(?:19|20)\d{2}$/.test(digits)) continue;
		found.push(raw);
	}
	return found;
}
function contactOnly(text) {
	return text.replace(new RegExp(EMAIL_RE.source, "gi"), " ").replace(new RegExp(URL_RE.source, "gi"), " ").replace(new RegExp(PHONE_RE.source, "g"), " ").replace(/[|·•,]/g, " ").replace(/\s+/g, " ").trim().length === 0;
}
function scoreName(line, first, maxFont) {
	const text = squash(line.text);
	const words = text.split(/\s+/).filter(Boolean);
	if (words.length < 2 || words.length > 5 || text.length > 48) return -99;
	if (words.some((word) => /\d/.test(word))) return -99;
	if (matchHeading(fold(text))) return -99;
	if (hasLegalForm(text)) return -99;
	if (scoreLocation(text) >= 1.6) return -99;
	if (/[@|]/.test(text) || emailsIn(text).length || phonesIn(text).length) return -99;
	const particle = /^(de|du|des|la|le|van|von|da|di|ben|el|al|st|saint)$/i;
	if (!words.every((word) => particle.test(word) || /^[\p{Lu}]/u.test(word))) return -99;
	let score = 2;
	if (words.length === 2 || words.length === 3) score += 1.4;
	if (isAllCaps(text)) score += .3;
	if (first) score += .6;
	if (jobScore(text) >= 1.1) score -= 3;
	if (maxFont > 0 && line.fontSize >= maxFont && line.fontSize > 13) score += 1.2;
	return score;
}
function locationOf(line) {
	const parts = line.split(/\s*(?:\||·|•)\s*/).map((part) => squash(part)).filter(Boolean);
	const places = parts.map((part) => ({
		part,
		score: emailsIn(part).length || phonesIn(part).length || urlsIn(part).length ? 0 : scoreLocation(part)
	})).filter((item) => item.score >= 1.6);
	if (!places.length) return null;
	if (places.length === parts.length) return line;
	if (places.length === 1) return places[0]?.part ?? null;
	return null;
}
var FACT_PATTERNS = [
	{
		label: "Date de naissance",
		re: /^(?:date de naissance|né(?:e)? le|birth(?:\s*date)?|geboren am)\s*[:\s]\s*(.+)$/i,
		group: 1
	},
	{
		label: "Nationalité",
		re: /^(?:nationalité|nationality|staatsangehörigkeit)\s*[:]\s*(.+)$/i,
		group: 1
	},
	{
		label: "Mobilité",
		re: /^(?:mobilité|mobility)\s*[:]\s*(.+)$/i,
		group: 1
	},
	{
		label: "Disponibilité",
		re: /^(?:disponibilité|availability)\s*[:]\s*(.+)$/i,
		group: 1
	},
	{
		label: "Permis",
		re: /^(?:permis(?: de conduire)?|driving licen[cs]e|führerschein)\s*[:]\s*(.+)$/i,
		group: 1
	},
	{
		label: "Permis",
		re: /^(permis\s+[A-Z0-9]{1,3}(?:\s*[,/]\s*[A-Z0-9]{1,3})*)$/i,
		group: 0
	}
];
var HEADLINE_LABEL = /^(?:poste recherché|intitulé du poste|desired (?:position|role))\s*[:]\s*(.+)$/i;
var NAME_LABEL = /^(?:nom(?: complet)?|name)\s*[:]\s*(.+)$/i;
function parseIdentity(blocks, ordered) {
	const header = blocks.find((block) => block.kind === "header")?.lines ?? [];
	const contactLines = blocks.filter((block) => block.kind === "contact").flatMap((block) => block.lines);
	const pool = [...header, ...contactLines];
	const seen = /* @__PURE__ */ new Set();
	const emails = [];
	const phones = [];
	const urls = [];
	const push = (bucket, kind, value, line) => {
		const key = `${kind}:${fold(value)}`;
		if (seen.has(key)) return;
		seen.add(key);
		bucket.push({
			kind,
			text: observed(value, line.text, pageOf(line), "high", "pattern", kind === "email" ? "Adresse écrite avec un @." : kind === "phone" ? "Numéro écrit dans le document (au moins 10 chiffres). Aucun format n'est réécrit." : "URL ou profil LinkedIn / GitHub écrit dans le document.")
		});
	};
	for (const line of ordered) {
		if (!line.text.trim()) continue;
		for (const email of emailsIn(line.text)) push(emails, "email", email, line);
		for (const phone of phonesIn(line.text)) push(phones, "phone", phone, line);
		for (const url of urlsIn(line.text)) push(urls, "url", url, line);
	}
	const facts = [];
	const consumed = /* @__PURE__ */ new Set();
	let labeledName = null;
	let labeledHeadline = null;
	for (const line of pool) {
		const text = squash(line.text);
		const nameMatch = NAME_LABEL.exec(text);
		if (nameMatch?.[1]) {
			labeledName = observed(nameMatch[1], text, pageOf(line), "high", "label", "Nom précédé d'un libellé explicite (Nom : ou Name :).");
			consumed.add(line);
		}
		const headlineMatch = HEADLINE_LABEL.exec(text);
		if (headlineMatch?.[1]) {
			labeledHeadline = observed(headlineMatch[1], text, pageOf(line), "high", "label", "Intitulé précédé d'un libellé explicite (Poste recherché :).");
			consumed.add(line);
		}
		for (const fact of FACT_PATTERNS) {
			const match = fact.re.exec(text);
			const value = match?.[fact.group] ?? (fact.group === 0 ? match?.[0] : void 0);
			if (value) {
				facts.push({
					label: fact.label,
					value: observed(value, text, pageOf(line), "high", "label", `Champ précédé du libellé « ${fact.label} ».`)
				});
				consumed.add(line);
			}
		}
	}
	const candidates = [];
	const nonempty = ordered.filter((line) => line.text.trim());
	const firstText = nonempty[0];
	const maxFont = Math.max(0, ...nonempty.map((line) => line.fontSize || 0));
	const namePool = labeledName ? [] : [...pool, ...nonempty.slice(0, 12)];
	const seenLines = /* @__PURE__ */ new Set();
	for (const line of namePool) {
		if (seenLines.has(line) || consumed.has(line)) continue;
		seenLines.add(line);
		const score = scoreName(line, line === firstText, maxFont);
		if (score >= 3) candidates.push({
			line,
			score
		});
	}
	candidates.sort((a, b) => b.score - a.score);
	const ambiguities = [];
	let fullName = labeledName;
	if (!fullName && candidates[0] && candidates[1] && candidates[0].score - candidates[1].score < .35) ambiguities.push({
		code: "name.ambiguous",
		message: "Plusieurs lignes peuvent être le nom. Aucune n'est retenue.",
		candidates: candidates.slice(0, 3).map((item) => item.line.text),
		evidence: candidates.slice(0, 3).map((item) => item.line.text)
	});
	else if (!fullName && candidates[0]) {
		fullName = observed(candidates[0].line.text, candidates[0].line.text, pageOf(candidates[0].line), candidates[0].line.fontSize > 13 ? "high" : "medium", "layout", "Ligne courte en capitales, en tête, qui n'est ni une section, ni un e-mail, ni un intitulé de métier du lexique.");
		consumed.add(candidates[0].line);
	}
	let headline = labeledHeadline;
	if (fullName && !headline) {
		const nameText = fullName.text;
		const after = nonempty.findIndex((line) => squash(line.text) === nameText);
		const line = (after >= 0 ? nonempty.slice(after + 1, after + 8) : []).find((item) => item.text.trim() && !contactOnly(item.text) && !consumed.has(item) && wordCount(item.text) <= 8 && !matchHeading(fold(item.text)) && (jobScore(item.text) >= 1.1 || item.bold || item.fontSize > 13));
		if (line) {
			headline = observed(line.text, line.text, pageOf(line), jobScore(line.text) >= 1.1 ? "medium" : "low", "layout", "Ligne courte sous le nom, rapprochée d'un métier ou plus grande que le corps de texte.");
			consumed.add(line);
		}
	}
	let location = null;
	for (const line of header) {
		if (consumed.has(line) || !line.text.trim() || contactOnly(line.text)) continue;
		const place = locationOf(line.text);
		if (!place) continue;
		location = observed(place, line.text, pageOf(line), "medium", "pattern", "Segment d'en-tête rapproché d'une ville, d'un pays ou d'une mention de télétravail. Ce n'est pas une adresse inventée.");
		consumed.add(line);
		break;
	}
	const introLines = header.filter((line) => !consumed.has(line) && wordCount(line.text) >= 12);
	for (const line of introLines) consumed.add(line);
	const intro = introLines.length ? observed(introLines.map((line) => squash(line.text)).join("\n"), introLines.map((line) => squash(line.text)).join("\n"), pageOf(introLines[0]), "medium", "layout", "Paragraphe d'en-tête, avant la première section. Copié, pas résumé.") : null;
	const unplacedLines = header.filter((line) => line.text.trim() && !consumed.has(line) && !contactOnly(line.text)).map((line) => squash(line.text));
	return {
		identity: {
			fullName,
			headline,
			location,
			intro,
			emails,
			phones,
			urls,
			facts,
			unplacedLines
		},
		ambiguities
	};
}
function looksLikeList(text) {
	const value = squash(text);
	return value.split(/[,;|·]/).length >= 2 && wordCount(value) <= 24;
}
function looksLikeProse(text) {
	return wordCount(text) > 14 || wordCount(text) > 8 && /[.!?]/.test(text);
}
function skillItems(text, line, prose) {
	return (prose || !looksLikeList(text) ? [squash(text)].filter(Boolean) : text.split(/\s*[,;|/]\s*|\s+·\s+/).map((part) => squash(part)).filter(Boolean)).map((part) => {
		const kind = prose ? null : classifySkill(part);
		return {
			text: observed(part, line.text, pageOf(line), "high", prose ? "section" : "pattern", prose ? "Phrase laissée entière : la découper inventerait des compétences." : "Élément écrit dans la section compétences."),
			lexicon: kind ? deduction(kind, part, "medium", kind === "technique" ? "Classement « technique » : le libellé contient un outil ou un langage du lexique. Le texte n'est pas réécrit." : "Classement « comportementale » : le libellé contient une aptitude du lexique. Le texte n'est pas réécrit.") : null,
			prose
		};
	});
}
function parseSkillSection(lines) {
	const groups = [];
	let current = {
		label: null,
		items: []
	};
	const flush = () => {
		if (current.label || current.items.length) groups.push(current);
		current = {
			label: null,
			items: []
		};
	};
	const content = lines.filter((line) => line.text.trim());
	for (let index = 0; index < content.length; index += 1) {
		const line = content[index];
		const raw = squash(line.text.replace(/^(?:[-•·▪▸►*]\s+)/, ""));
		const colon = /^([^:]{2,32}):\s*(.+)$/.exec(raw);
		if (colon?.[1] && colon[2] && looksLikeList(colon[2]) && wordCount(colon[1]) <= 5) {
			flush();
			groups.push({
				label: observed(squash(colon[1]), line.text, pageOf(line), "high", "label", "Catégorie écrite avant les deux-points."),
				items: skillItems(colon[2], line, false)
			});
			continue;
		}
		const next = content[index + 1];
		const nextRaw = next ? squash(next.text) : "";
		if (!isBullet(line.text) && !line.listItem && !looksLikeList(raw) && !looksLikeProse(raw) && wordCount(raw) <= 4 && raw.length <= 36 && next && (looksLikeList(nextRaw) || next.listItem || isBullet(next.text))) {
			flush();
			current = {
				label: observed(raw.replace(/:$/, ""), line.text, pageOf(line), "medium", "layout", "Ligne courte suivie d'une liste : lue comme sous-titre, pas comme une compétence."),
				items: []
			};
			continue;
		}
		current.items.push(...skillItems(raw, line, looksLikeProse(raw)));
	}
	flush();
	return groups;
}
function chunksOf(line) {
	const raw = squash(line.replace(/^(?:[-•·▪▸►*]\s+)/, ""));
	if (!raw) return [];
	if (looksLikeProse(raw)) return [raw];
	const parts = raw.split(/\s*,\s*|\s*;\s*/).map((part) => squash(part)).filter(Boolean);
	return parts.length ? parts : [raw];
}
function parseLanguageLine(chunk, line) {
	let namePart = chunk;
	let levelPart = null;
	const paren = /^(.+?)\s*\(([^)]+)\)\s*$/.exec(chunk);
	const separated = /^(.+?)\s*[:–—|/]\s*(.+)$/.exec(chunk) ?? /^(.+?)\s+-\s+(.+)$/.exec(chunk);
	if (paren?.[1] && paren[2] && matchLanguageName(paren[1])) {
		namePart = squash(paren[1]);
		levelPart = squash(paren[2]);
	} else if (separated?.[1] && separated[2] && matchLanguageName(separated[1])) {
		namePart = squash(separated[1]);
		levelPart = squash(separated[2]);
	}
	const language = matchLanguageName(namePart);
	return {
		name: observed(namePart, line.text, pageOf(line), language ? "high" : "low", language ? "pattern" : "section", language ? "Nom de langue isolé dans le libellé écrit." : "Libellé conservé tel quel : aucune langue du lexique n'y a été reconnue."),
		canon: language ? deduction(language.canon, namePart, "medium", `Forme canonique du lexique pour « ${namePart} ». Elle ne remplace pas le texte du CV.`) : null,
		levelRaw: levelPart ? observed(levelPart, line.text, pageOf(line), "high", "pattern", "Niveau écrit à côté du nom de langue.") : null,
		levelCanon: levelPart ? canonLevel(levelPart) : null,
		raw: chunk
	};
}
function parseLanguageSection(lines) {
	const items = [];
	for (const line of lines) {
		if (!line.text.trim()) continue;
		for (const chunk of chunksOf(line.text)) items.push(parseLanguageLine(chunk, line));
	}
	return items;
}
function parseInterestSection(lines) {
	const items = [];
	for (const line of lines) {
		const raw = squash(line.text.replace(/^(?:[-•·▪▸►*]\s+)/, ""));
		if (!raw) continue;
		const parts = looksLikeProse(raw) ? [raw] : raw.split(/\s*,\s*|\s*;\s*|\s+·\s+/).map((part) => squash(part)).filter(Boolean);
		for (const part of parts) items.push(observed(part, line.text, pageOf(line), "high", "section", "Élément écrit dans la section centres d'intérêt."));
	}
	return items;
}
function median(values) {
	if (!values.length) return 12;
	const sorted = [...values].sort((a, b) => a - b);
	return sorted[Math.floor(sorted.length / 2)] ?? 12;
}
function isNoiseLine(text, line, bodySize) {
	const folded = fold(text);
	if (!folded) return null;
	if (/^(curriculum vitae|cv)$/.test(folded)) return "Intitulé générique du document, pas une information sur la personne.";
	if (/^page \d+( \/ \d+)?$/.test(folded) || /^\d+\s*\/\s*\d+$/.test(folded)) return "Numéro de page.";
	if (/^\d{1,3}$/.test(text) && line.fontSize > 0 && line.fontSize < bodySize * .85) return "Numéro isolé, trop petit pour être une année ou un titre.";
	if (/^[-–—_*=.·]{3,}$/.test(text)) return "Filet graphique sans texte.";
	return null;
}
function detectHeading(line, bodySize, _current) {
	const text = line.text.trim();
	if (!text) return null;
	const lexical = matchHeading(fold(text));
	if (lexical) return {
		kind: lexical,
		confidence: "high"
	};
	if (line.fontSize >= bodySize * 1.1 && wordCount(text) <= 6) return {
		kind: "other",
		confidence: "low"
	};
	return null;
}
function segment(lines) {
	const bodySize = median(lines.filter((line) => wordCount(line.text) > 4).map((line) => line.fontSize || 12));
	const blocks = [];
	const noise = [];
	let current = {
		kind: "header",
		heading: null,
		lines: [],
		confidence: "high"
	};
	for (const line of lines) {
		const text = line.text.trim();
		if (!text) {
			current.lines.push(line);
			continue;
		}
		const noiseRule = isNoiseLine(text, line, bodySize);
		if (noiseRule) {
			noise.push({
				text,
				rule: noiseRule
			});
			continue;
		}
		const heading = detectHeading(line, bodySize, current.kind);
		if (heading) {
			blocks.push(current);
			current = {
				kind: heading.kind,
				heading: text,
				lines: [],
				confidence: heading.confidence
			};
			continue;
		}
		if ([
			"skills",
			"languages",
			"interests"
		].includes(current.kind) && isEntryAnchor(text)) {
			blocks.push(current);
			current = {
				kind: "experience",
				heading: null,
				lines: [line],
				confidence: "high"
			};
			continue;
		}
		current.lines.push(line);
	}
	blocks.push(current);
	return {
		blocks: blocks.filter((block) => block.kind !== "header" || block.lines.some((line) => line.text.trim())),
		noise
	};
}
function citationHolds(text, lines) {
	const parts = text.split(/\n/).map((part) => squash(part)).filter(Boolean);
	if (!parts.length) return false;
	const pool = lines.map((line) => squash(line)).filter(Boolean);
	const blob = pool.join("\n");
	return parts.every((part) => blob.includes(part) || pool.some((line) => line.includes(part)));
}
function verify(cv) {
	const lines = cv.sourceText.split("\n");
	const errors = [];
	let checked = 0;
	const visit = (value, path) => {
		if (!value || typeof value !== "object") return;
		if (Array.isArray(value)) {
			value.forEach((item, index) => visit(item, `${path}[${index}]`));
			return;
		}
		const record = value;
		if (typeof record.text === "string" && typeof record.line === "string" && typeof record.basis === "string") {
			checked += 1;
			if (!citationHolds(record.text, lines)) errors.push(`${path} : « ${record.text} » ne figure pas dans le texte relu`);
		} else if (typeof record.from === "string" && typeof record.rule === "string" && "value" in record) {
			checked += 1;
			if (!citationHolds(record.from, lines)) errors.push(`${path}.from : « ${record.from} » ne figure pas dans le texte relu`);
		}
		for (const [key, child] of Object.entries(record)) if (child && typeof child === "object") visit(child, `${path}.${key}`);
	};
	visit({
		meta: cv.meta,
		identity: cv.identity,
		profile: cv.profile,
		experiences: cv.experiences,
		education: cv.education,
		skills: cv.skills,
		languages: cv.languages,
		certifications: cv.certifications,
		projects: cv.projects,
		interests: cv.interests
	}, "cv");
	return {
		ok: errors.length === 0,
		checked,
		errors
	};
}
function parseLines(input) {
	const ordered = readingOrder(input.lines.map((line) => ({
		...line,
		text: squash(line.text)
	})));
	const { blocks, noise } = segment(ordered.lines);
	const identityResult = parseIdentity(blocks, ordered.lines);
	const profileBlocks = blocks.filter((block) => block.kind === "profile");
	const profileLines = profileBlocks.flatMap((block) => block.lines).filter((line) => line.text.trim());
	const experienceBlocks = blocks.filter((block) => block.kind === "experience");
	const experiences = experienceBlocks.length > 0 ? experienceBlocks.flatMap((block) => parseExperienceSection(block.lines)) : parseExperienceSection(ordered.lines);
	const education = blocks.filter((block) => block.kind === "education").flatMap((block) => parseEducationSection(block));
	const skills = blocks.filter((block) => block.kind === "skills").flatMap((block) => parseSkillSection(block.lines));
	const languages = blocks.filter((block) => block.kind === "languages").flatMap((block) => parseLanguageSection(block.lines));
	const certifications = blocks.filter((block) => block.kind === "certifications").flatMap((block) => parseCertificationSection(block));
	const projects = blocks.filter((block) => block.kind === "projects").flatMap((block) => parseProjectSection(block));
	const interests = blocks.filter((block) => block.kind === "interests").flatMap((block) => parseInterestSection(block.lines));
	const otherSections = blocks.filter((block) => [
		"volunteering",
		"awards",
		"publications",
		"references",
		"contact",
		"other"
	].includes(block.kind)).map((block) => ({
		kind: block.kind,
		heading: block.heading,
		lines: block.lines.map((line) => squash(line.text)).filter(Boolean)
	}));
	const ambiguities = [...identityResult.ambiguities];
	for (const entry of experiences) ambiguities.push(...entry.ambiguities);
	for (const entry of education) ambiguities.push(...entry.ambiguities);
	for (const language of languages) if (!language.canon) ambiguities.push({
		code: "language.unlisted",
		message: "Une ligne de la section langues ne correspond à aucune langue du lexique. Elle est conservée brute.",
		candidates: [language.raw],
		evidence: [language.raw]
	});
	const warnings = [];
	const sourceText = ordered.lines.map((line) => line.text).join("\n");
	if (!sourceText.trim()) warnings.push({
		code: input.format === "pdf" ? "pdf.no-text" : "file.empty",
		message: input.format === "pdf" ? "Ce PDF ne contient pas de texte sélectionnable. C'est probablement un scan. Aucun contenu n'a été deviné à partir de l'image." : "Le document ne contient pas de texte."
	});
	if (input.truncated) warnings.push({
		code: "pdf.truncated",
		message: "Seules les 15 premières pages ont été lues. La suite n'est pas extraite et n'est pas inventée."
	});
	if (!identityResult.identity.fullName && sourceText.trim()) warnings.push({
		code: "name.missing",
		message: "Aucun nom n'a passé le seuil. Le champ reste vide plutôt que d'en proposer un."
	});
	const lexical = blocks.some((block) => block.kind !== "header");
	if (sourceText.trim() && !lexical) warnings.push({
		code: "sections.none",
		message: "Aucune section reconnue. Le texte reste disponible, mais il n'a pas été rangé en expériences ou formations."
	});
	const undatedJobs = experiences.filter((entry) => !entry.dates).length;
	if (undatedJobs) warnings.push({
		code: "experience.no-dates",
		message: `${undatedJobs} expérience(s) sans intervalle de dates repérable. Les dates absentes ne sont pas complétées.`
	});
	const undatedStudies = education.filter((entry) => !entry.dates).length;
	if (undatedStudies) warnings.push({
		code: "education.no-dates",
		message: `${undatedStudies} formation(s) sans intervalle de dates repérable.`
	});
	const documentLanguage = sourceText.trim() ? detectDocumentLanguage(sourceText) : null;
	const draft = {
		meta: {
			filename: input.filename,
			format: input.format,
			pipeline: [
				"reading-order",
				"sections",
				"identity",
				"entries",
				"lexicon-tags",
				"verify"
			],
			documentLanguage
		},
		identity: identityResult.identity,
		profile: {
			heading: profileBlocks[0]?.heading ?? null,
			text: profileLines.length ? {
				text: profileLines.map((line) => line.text).join("\n"),
				line: profileLines.map((line) => line.text).join("\n"),
				page: profileLines[0]?.page ?? null,
				confidence: "high",
				basis: "section",
				rule: "Corps de la section profil, copié sans résumé."
			} : null
		},
		experiences,
		education,
		skills,
		languages,
		certifications,
		projects,
		interests,
		otherSections,
		sections: blocks.map((block) => ({
			kind: block.kind,
			heading: block.heading,
			lines: block.lines.map((line) => line.text).filter((line) => line.trim())
		})),
		ambiguities,
		warnings,
		noise,
		layoutNotes: [...input.layoutNotes ?? [], ...ordered.notes],
		sourceText
	};
	const verification = verify(draft);
	if (!verification.ok) draft.warnings = [...draft.warnings, {
		code: "verify.failed",
		message: "Le contrôle interne a trouvé une citation absente du texte relu. Ces champs ne doivent pas être utilisés tels quels."
	}];
	return {
		...draft,
		verification
	};
}
function parseText(text, filename = "texte-colle.txt") {
	return parseLines({
		filename,
		format: "text",
		lines: textToLines(text)
	});
}
function bytesOf(data) {
	return data instanceof Uint8Array ? data : new Uint8Array(data);
}
async function detectKind(name, bytes) {
	const ext = name.toLowerCase().split(".").pop() ?? "";
	if (bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70) return "pdf";
	if (bytes[0] === 208 && bytes[1] === 207 && bytes[2] === 17 && bytes[3] === 224) return "doc-legacy";
	if (bytes[0] === 80 && bytes[1] === 75) {
		if (ext === "odt") return "odt";
		if (ext === "docx") return "docx";
		const zip = await (await import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default.loadAsync(bytes);
		if ((await zip.file("mimetype")?.async("string"))?.includes("opendocument.text")) return "odt";
		if (zip.file("word/document.xml")) return "docx";
		return "unknown";
	}
	const head = new TextDecoder().decode(bytes.slice(0, 500)).trimStart().toLowerCase();
	if (head.startsWith("{\\rtf") || ext === "rtf") return "rtf";
	if (ext === "html" || ext === "htm" || head.startsWith("<!doctype html") || head.startsWith("<html")) return "html";
	if (ext === "pdf") return "pdf";
	if (bytes.slice(0, 200).includes(0)) return "unknown";
	return "text";
}
function htmlToLines(html) {
	const doc = new DOMParser().parseFromString(html, "text/html");
	const lines = [];
	const walk = (el) => {
		for (const child of Array.from(el.children)) {
			const tag = child.tagName.toLowerCase();
			if (/^h[1-3]$/.test(tag) || tag === "p" || tag === "li" || tag === "tr") {
				const text = (child.textContent ?? "").replace(/\s+/g, " ").trim();
				if (text) lines.push(plainLine(text, {
					bold: /^h[1-3]$/.test(tag) || Boolean(child.querySelector("strong, b")),
					headingHint: /^h[1-3]$/.test(tag),
					listItem: tag === "li",
					fontSize: /^h[1-3]$/.test(tag) ? 18 : 12
				}));
				continue;
			}
			walk(child);
		}
	};
	if (doc.body) walk(doc.body);
	return lines;
}
function rtfToText(input) {
	let index = 0;
	let out = "";
	const destinations = /* @__PURE__ */ new Set([
		"fonttbl",
		"colortbl",
		"stylesheet",
		"info",
		"pict",
		"datastore",
		"themedata",
		"listtable",
		"listoverridetable",
		"generator",
		"header",
		"footer",
		"headerl",
		"headerr",
		"footerl",
		"footerr"
	]);
	const parseGroup = (skip) => {
		while (index < input.length) {
			const char = input[index];
			if (char === "{") {
				index += 1;
				let nested = skip;
				if (input[index] === "\\" && input[index + 1] === "*") nested = true;
				else {
					const word = /^\\([a-zA-Z]+)/.exec(input.slice(index));
					if (word && destinations.has(word[1].toLowerCase())) nested = true;
				}
				parseGroup(nested);
				continue;
			}
			if (char === "}") {
				index += 1;
				return;
			}
			if (char === "\\") {
				if (input[index + 1] === "\\") {
					if (!skip) out += "\\";
					index += 2;
					continue;
				}
				if (input[index + 1] === "{") {
					if (!skip) out += "{";
					index += 2;
					continue;
				}
				if (input[index + 1] === "}") {
					if (!skip) out += "}";
					index += 2;
					continue;
				}
				if (input[index + 1] === "'") {
					const hex = input.slice(index + 2, index + 4);
					if (!skip && /^[0-9a-fA-F]{2}$/.test(hex)) out += new TextDecoder("windows-1252").decode(new Uint8Array([Number.parseInt(hex, 16)]));
					index += 4;
					continue;
				}
				const control = /^\\([a-zA-Z]+)(-?\d+)? ?/.exec(input.slice(index));
				if (control) {
					const word = control[1]?.toLowerCase() ?? "";
					if (!skip && (word === "par" || word === "line")) out += "\n";
					else if (!skip && word === "tab") out += "	";
					else if (!skip && word === "u" && control[2]) {
						let code = Number(control[2]);
						if (code < 0) code += 65536;
						out += String.fromCharCode(code);
					}
					index += control[0].length;
					continue;
				}
				index += 1;
				continue;
			}
			if (!skip && char !== "\r" && char !== "\n") out += char;
			index += 1;
		}
	};
	if (input.startsWith("{")) {
		index = 1;
		parseGroup(false);
	} else parseGroup(false);
	return out.replace(/\n{3,}/g, "\n\n").trim();
}
async function docxToLines(bytes) {
	const mammoth = await import("../_libs/mammoth+xmlbuilder.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	return htmlToLines((await (mammoth.default ?? mammoth).convertToHtml({ arrayBuffer: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) })).value);
}
async function odtToLines(bytes) {
	const file = (await (await import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default.loadAsync(bytes)).file("content.xml");
	if (!file) throw new Error("Ce fichier ODT n'a pas de contenu lisible.");
	const doc = new DOMParser().parseFromString(await file.async("string"), "application/xml");
	const lines = [];
	let root = null;
	for (const el of Array.from(doc.getElementsByTagName("*"))) if (el.localName === "text" && el.parentElement?.localName === "body") {
		root = el;
		break;
	}
	const walk = (el, list) => {
		for (const child of Array.from(el.children)) {
			const local = child.localName;
			if (local === "p" || local === "h") {
				const text = (child.textContent ?? "").replace(/\s+/g, " ").trim();
				if (text) lines.push(plainLine(text, {
					headingHint: local === "h",
					bold: local === "h",
					listItem: list,
					fontSize: local === "h" ? 18 : 12
				}));
			} else walk(child, list || local === "list" || local === "list-item");
		}
	};
	if (root) walk(root, false);
	return lines;
}
function glyphsToLines(glyphs, page, pageWidth) {
	const sorted = [...glyphs].sort((a, b) => a.y - b.y || a.x - b.x);
	const rows = [];
	for (const glyph of sorted) {
		const row = rows[rows.length - 1];
		const ref = row?.[0];
		if (ref && Math.abs(glyph.y - ref.y) <= Math.max(ref.fontSize, glyph.fontSize) * .45) row.push(glyph);
		else rows.push([glyph]);
	}
	const lines = [];
	for (const row of rows) {
		row.sort((a, b) => a.x - b.x);
		let chunk = [];
		const emit = () => {
			if (!chunk.length) return;
			let text = "";
			let end = chunk[0].x;
			for (const glyph of chunk) {
				const gap = glyph.x - end;
				if (!text) text = glyph.str;
				else if (text.endsWith("-") && gap < glyph.fontSize * .25) text = `${text.slice(0, -1)}${glyph.str}`;
				else text += `${gap > glyph.fontSize * .22 ? " " : ""}${glyph.str}`;
				end = Math.max(end, glyph.end);
			}
			const value = text.replace(/[ \t]{2,}/g, " ").trim();
			if (value) {
				const first = chunk[0];
				lines.push(plainLine(value, {
					page,
					x: first.x,
					y: first.y,
					width: Math.max(end - first.x, 1),
					height: first.height || first.fontSize,
					fontSize: Math.max(...chunk.map((item) => item.fontSize)),
					bold: chunk.some((item) => item.bold),
					pageWidth
				}));
			}
			chunk = [];
		};
		for (const glyph of row) {
			const prev = chunk[chunk.length - 1];
			if (prev && glyph.x - prev.end > Math.max(glyph.fontSize, prev.fontSize) * 3.2) emit();
			chunk.push(glyph);
		}
		emit();
	}
	return lines;
}
async function pdfToLines(bytes) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	if (!pdfjs.GlobalWorkerOptions.workerSrc) {
		const worker = await import("./pdf.worker.min-CAmOfDaL.mjs");
		pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
	}
	const doc = await pdfjs.getDocument({
		data: bytes,
		isEvalSupported: false,
		useSystemFonts: true
	}).promise;
	const pageCount = Math.min(doc.numPages, 15);
	const lines = [];
	for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
		const page = await doc.getPage(pageNumber);
		const viewport = page.getViewport({ scale: 1 });
		const content = await page.getTextContent();
		const styles = content.styles;
		const glyphs = [];
		for (const item of content.items) {
			if (!("str" in item) || !item.str) continue;
			const transform = item.transform;
			const fontSize = Math.hypot(transform[2] ?? 0, transform[3] ?? 0) || Math.hypot(transform[0] ?? 0, transform[1] ?? 0) || 12;
			const fontName = `${item.fontName ?? ""} ${styles[item.fontName ?? ""]?.fontFamily ?? ""}`;
			const x = transform[4] ?? 0;
			glyphs.push({
				str: item.str,
				x,
				end: x + (item.width ?? 0),
				y: viewport.height - (transform[5] ?? 0),
				fontSize,
				bold: /bold|black|semibold|heavy|demi/i.test(fontName),
				width: item.width ?? 0,
				height: item.height || fontSize
			});
		}
		lines.push(...glyphsToLines(glyphs, pageNumber, viewport.width));
	}
	return {
		lines,
		truncated: doc.numPages > 15
	};
}
async function parseFile(file) {
	if (file.size > 12582912) throw new Error("Fichier trop volumineux (maximum 12 Mo).");
	const bytes = bytesOf(await file.arrayBuffer());
	const kind = await detectKind(file.name, bytes);
	if (kind === "doc-legacy") throw new Error("Le format .doc (Word 97-2003) n'est pas lu : la conversion abîmerait le texte. Enregistrez-le en PDF ou en DOCX.");
	if (kind === "unknown") throw new Error("Format non reconnu. Déposez un PDF texte, un DOCX, un ODT, un RTF, un HTML ou un TXT.");
	if (kind === "pdf") {
		const pdf = await pdfToLines(bytes);
		return parseLines({
			filename: file.name,
			format: "pdf",
			lines: pdf.lines,
			truncated: pdf.truncated
		});
	}
	if (kind === "docx") return parseLines({
		filename: file.name,
		format: "docx",
		lines: await docxToLines(bytes)
	});
	if (kind === "odt") return parseLines({
		filename: file.name,
		format: "odt",
		lines: await odtToLines(bytes)
	});
	const decoded = new TextDecoder().decode(bytes);
	if (kind === "rtf") return parseLines({
		filename: file.name,
		format: "rtf",
		lines: textToLines(rtfToText(decoded))
	});
	if (kind === "html") return parseLines({
		filename: file.name,
		format: "html",
		lines: htmlToLines(decoded)
	});
	return parseLines({
		filename: file.name,
		format: "text",
		lines: textToLines(decoded)
	});
}
function formatDatePoint(point) {
	if (!point) return "";
	if (point.month != null) return `${String(point.month).padStart(2, "0")}/${point.year}`;
	return String(point.year);
}
function extractDatesString(dated) {
	if (!dated) return "";
	if (dated.raw?.text) return dated.raw.text.trim();
	const parsed = dated.parsed?.value;
	if (!parsed) return "";
	const start = formatDatePoint(parsed.start);
	if (parsed.openEnded) return start ? `${start} — Aujourd'hui` : "En cours";
	const end = formatDatePoint(parsed.end);
	if (start && end) return `${start} — ${end}`;
	return start || end || "";
}
function parseLevelToValue(levelText) {
	if (!levelText) return 80;
	const t = levelText.toLowerCase();
	if (/c2|natif|maternelle|fluent|bilingue/i.test(t)) return 100;
	if (/c1|courant|avancé|avance/i.test(t)) return 90;
	if (/b2|professionnel|intermédiaire sup/i.test(t)) return 75;
	if (/b1|intermédiaire|intermediaire/i.test(t)) return 60;
	if (/a2|élémentaire|notions/i.test(t)) return 40;
	if (/a1|débutant|debutant/i.test(t)) return 25;
	const num = t.match(/(\d{1,3})\s*%/);
	if (num) return Math.min(100, Math.max(0, parseInt(num[1], 10)));
	return 75;
}
function cvExtractionToProfile(extraction, base = SAMPLE) {
	const ident = extraction.identity;
	const fullName = ident.fullName?.text?.trim();
	const name = fullName && fullName.length > 2 && fullName.length < 80 ? fullName : base.name;
	const headline = ident.headline?.text?.trim() || extraction.experiences[0]?.title?.text?.trim();
	const role = headline && headline.length > 2 && headline.length < 100 ? headline : base.role;
	const email = ident.emails[0]?.text?.text?.trim() || base.email;
	const phone = ident.phones[0]?.text?.text?.trim() || base.phone;
	const location = ident.location?.text?.trim() || base.location;
	const link = ident.urls[0]?.text?.text?.trim() || base.link;
	const summary = extraction.profile.text?.text?.trim() || ident.intro?.text?.trim() || base.summary;
	const experiences = extraction.experiences.map((exp) => {
		const roleName = exp.title?.text?.trim() || "Poste";
		const company = exp.organization?.text?.trim() || "";
		const date = extractDatesString(exp.dates);
		let desc = "";
		if (exp.realizations && exp.realizations.length > 0) desc = exp.realizations.map((r) => `• ${r.trim()}`).join("\n");
		else if (exp.description?.text) desc = exp.description.text.trim();
		else if (exp.rawLines && exp.rawLines.length > 2) desc = exp.rawLines.slice(2).join(" ").trim();
		return {
			role: roleName,
			company,
			date,
			desc
		};
	}).filter((e) => e.role || e.company || e.desc);
	const educations = extraction.education.map((edu) => {
		return {
			degree: edu.degree?.text?.trim() || "Diplôme",
			school: edu.school?.text?.trim() || "",
			date: extractDatesString(edu.dates)
		};
	}).filter((e) => e.degree || e.school);
	const rawSkills = [];
	for (const group of extraction.skills) for (const item of group.items) {
		const s = item.text.text.trim();
		if (s && s.length > 1 && s.length < 50) rawSkills.push(s);
	}
	const cleanSkills = Array.from(new Set(rawSkills));
	const languages = extraction.languages.map((l) => {
		const name = l.name.text.trim();
		const level = l.levelCanon?.value ? l.levelCanon.value.value : l.levelRaw?.text || "";
		return {
			label: level ? `${name} (${level})` : name,
			value: parseLevelToValue(level)
		};
	}).filter((l) => l.label.length > 0);
	return {
		name,
		role,
		email,
		phone,
		location,
		link,
		summary,
		experiences: experiences.length > 0 ? experiences : base.experiences,
		educations: educations.length > 0 ? educations : base.educations,
		skills: cleanSkills.length > 0 ? cleanSkills : base.skills,
		languages: languages.length > 0 ? languages : base.languages
	};
}
function computeExtractionStats(profile) {
	return {
		experiencesCount: profile.experiences.length,
		educationsCount: profile.educations.length,
		skillsCount: profile.skills.length,
		languagesCount: profile.languages.length,
		hasContact: Boolean(profile.email || profile.phone || profile.location)
	};
}
/**
* Extrait le profil complet à partir d'un fichier (PDF, DOCX, ODT, RTF, HTML, TXT)
*/
async function extractFromFile(file, baseProfile = SAMPLE) {
	const extraction = await parseFile(file);
	const profile = cvExtractionToProfile(extraction, baseProfile);
	const stats = computeExtractionStats(profile);
	const warnings = (extraction.warnings || []).map((w) => w.message);
	const ambiguities = (extraction.ambiguities || []).map((a) => a.message);
	return {
		profile,
		rawExtraction: extraction,
		sourceText: extraction.sourceText,
		warnings,
		ambiguities,
		stats
	};
}
/**
* Extrait le profil complet à partir d'un texte brut ou copié-collé
*/
function extractFromText(text, baseProfile = SAMPLE) {
	const extraction = parseText(text, "texte-colle.txt");
	const profile = cvExtractionToProfile(extraction, baseProfile);
	const stats = computeExtractionStats(profile);
	return {
		profile,
		rawExtraction: extraction,
		sourceText: text,
		warnings: (extraction.warnings || []).map((w) => w.message),
		ambiguities: (extraction.ambiguities || []).map((a) => a.message),
		stats
	};
}
var TEMPLATE_ID_RE$1 = /^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-\d+$|^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-/;
var TOP_FLOW_Y = 48;
var BOTTOM_SAFE_Y = PAGE_H - 18;
var PULLBACK_SAFE_Y = PAGE_H - 24;
function isStudioFreeElement(el) {
	if (el.hidden) return false;
	if (el.type === "photo" && Boolean(el.content.src)) return true;
	if (!el.bind && !TEMPLATE_ID_RE$1.test(el.id)) return true;
	return false;
}
function isDecorativeElement(el) {
	if (el.type === "rect" || el.type === "ellipse" || el.type === "photo") return true;
	if (el.type === "rule" && (el.h > 200 || el.y < 180)) return true;
	if (el.type === "text" && !el.bind && TEMPLATE_ID_RE$1.test(el.id) && el.y >= 1e3 && (el.style.color === "#b7b1a6" || el.style.color === "#f6f3ec")) return true;
	return false;
}
function isFlowableElement(el) {
	if (el.hidden) return false;
	if (isStudioFreeElement(el)) return false;
	if (isDecorativeElement(el)) return false;
	if (el.bind) return [
		"summary",
		"experience",
		"education",
		"skills",
		"languages"
	].includes(el.bind.kind);
	if (el.type === "heading" && TEMPLATE_ID_RE$1.test(el.id) && el.y >= 40) return true;
	if (el.type === "rule" && TEMPLATE_ID_RE$1.test(el.id) && el.h <= 6 && el.y >= 180) return true;
	return false;
}
function horizontalOverlap(a, b) {
	return Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
}
function boxesOverlap(a, b, pad = 0) {
	return a.x < b.x + b.w + pad && a.x + a.w + pad > b.x && a.y < b.y + b.h + pad && a.y + a.h + pad > b.y;
}
/**
* Groups flowable elements on a page so that each section heading (and divider rule)
* stays attached to the first bound element immediately below it in the same column.
* Never splits a heading from its first content block.
*/
function buildColumnFlowGroups(flowElements) {
	if (!flowElements.length) return [];
	const sorted = [...flowElements].sort((a, b) => Math.abs(a.y - b.y) <= 4 ? a.x - b.x : a.y - b.y);
	const used = /* @__PURE__ */ new Set();
	const groups = [];
	for (let i = 0; i < sorted.length; i++) {
		const el = sorted[i];
		if (used.has(el.id)) continue;
		if (!el.bind && (el.type === "heading" || el.type === "rule")) {
			const groupEls = [el];
			used.add(el.id);
			let lastBottom = el.y + el.h;
			for (let j = i + 1; j < sorted.length; j++) {
				const candidate = sorted[j];
				if (used.has(candidate.id)) continue;
				if (horizontalOverlap(el, candidate) <= 32) continue;
				const vGap = candidate.y - lastBottom;
				if (vGap >= -12 && vGap <= 56) {
					groupEls.push(candidate);
					used.add(candidate.id);
					lastBottom = Math.max(lastBottom, candidate.y + candidate.h);
					if (candidate.bind) break;
				}
			}
			const top = Math.min(...groupEls.map((e) => e.y));
			const bottom = Math.max(...groupEls.map((e) => e.y + e.h));
			const minX = Math.min(...groupEls.map((e) => e.x));
			const maxRight = Math.max(...groupEls.map((e) => e.x + e.w));
			groups.push({
				elements: groupEls,
				x: minX,
				w: maxRight - minX,
				top,
				bottom,
				height: bottom - top
			});
		} else {
			used.add(el.id);
			groups.push({
				elements: [el],
				x: el.x,
				w: el.w,
				top: el.y,
				bottom: el.y + el.h,
				height: el.h
			});
		}
	}
	return groups.sort((a, b) => a.top - b.top);
}
/**
* Checks if a Studio free element blocks automatic pagination on a page
* (e.g. a free element overlaps or sits in the flow column where bound elements overflow).
*/
function hasFreeElementBlockingPagination(page) {
	const freeEls = page.elements.filter(isStudioFreeElement);
	if (!freeEls.length) return false;
	const flowEls = page.elements.filter(isFlowableElement);
	if (!flowEls.some((el) => el.y + el.h > BOTTOM_SAFE_Y)) return false;
	for (const free of freeEls) for (const flow of flowEls) if (horizontalOverlap(free, flow) > 24 && free.y >= flow.y - 40) return true;
	return false;
}
/**
* Ensures all bound flow elements on every page have at least their auto-computed height
* so no text is visually clipped, shifting following elements in the same column via resizeElementWithFlow.
*/
function ensureAutoHeightsOnPages(doc) {
	const pages = doc.pages.map((page) => {
		let nextPage = page;
		const boundIds = [...nextPage.elements].filter((el) => !el.hidden && el.bind && [
			"summary",
			"experience",
			"education",
			"skills",
			"languages"
		].includes(el.bind.kind)).sort((a, b) => a.y - b.y).map((el) => el.id);
		for (const id of boundIds) {
			const currentEl = nextPage.elements.find((e) => e.id === id);
			if (!currentEl) continue;
			const neededH = computeElementAutoHeight(currentEl);
			if (neededH > currentEl.h + 2) nextPage = resizeElementWithFlow(nextPage, id, neededH);
		}
		return nextPage;
	});
	return {
		...doc,
		pages
	};
}
/**
* Main A4 automatic pagination engine for bound elements in Guided mode (and explicit pagination action).
* - Preserves Studio free elements (never moves or deletes them).
* - Pulls flow groups back to previous page when content is shortened and space becomes available.
* - Pushes overflowing flow groups (above 1123px) to the next page (creating it if needed).
* - Removes trailing empty pages if they contain no Studio free elements.
*/
function paginateDocFlow(inputDoc, options) {
	const force = Boolean(options?.force);
	let workingDoc = ensureAutoHeightsOnPages(inputDoc);
	let blockedByFreeElement = false;
	const pages = workingDoc.pages.map((p) => ({
		...p,
		elements: p.elements.map((el) => ({ ...el }))
	}));
	for (let p = 0; p < pages.length - 1; p++) {
		const currPage = pages[p];
		const nextPage = pages[p + 1];
		if (!force && hasFreeElementBlockingPagination(currPage)) continue;
		const nextFlowEls = nextPage.elements.filter(isFlowableElement);
		if (!nextFlowEls.length) continue;
		const nextGroups = buildColumnFlowGroups(nextFlowEls);
		const pulledElementIds = /* @__PURE__ */ new Set();
		for (const group of nextGroups) {
			const sameColOnCurr = currPage.elements.filter((el) => {
				if (el.hidden) return false;
				if (isDecorativeElement(el)) return false;
				return horizontalOverlap(el, group) > 32;
			});
			if (nextGroups.some((earlier) => earlier.top < group.top && horizontalOverlap(earlier, group) > 32 && !earlier.elements.every((e) => pulledElementIds.has(e.id)))) continue;
			const colBottom = sameColOnCurr.length ? Math.max(...sameColOnCurr.map((e) => e.y + e.h)) : TOP_FLOW_Y;
			const gap = group.elements[0]?.type === "heading" ? 18 : 12;
			const targetTop = sameColOnCurr.length ? colBottom + gap : TOP_FLOW_Y;
			if (targetTop + group.height <= PULLBACK_SAFE_Y) {
				const dy = targetTop - group.top;
				const movedEls = group.elements.map((el) => ({
					...el,
					y: Math.round(el.y + dy)
				}));
				const freeOnCurr = currPage.elements.filter(isStudioFreeElement);
				if (!movedEls.some((mEl) => freeOnCurr.some((fEl) => boxesOverlap(mEl, fEl, 4)))) {
					currPage.elements.push(...movedEls);
					for (const mEl of movedEls) pulledElementIds.add(mEl.id);
				}
			}
		}
		if (pulledElementIds.size > 0) {
			nextPage.elements = nextPage.elements.filter((el) => !pulledElementIds.has(el.id));
			const remainingFlow = nextPage.elements.filter(isFlowableElement);
			if (remainingFlow.length > 0) {
				const remGroups = buildColumnFlowGroups(remainingFlow);
				const shiftedIds = /* @__PURE__ */ new Set();
				for (const rg of remGroups) {
					if (rg.elements.some((e) => shiftedIds.has(e.id))) continue;
					const colGroups = remGroups.filter((g) => horizontalOverlap(g, rg) > 32);
					const shiftUp = TOP_FLOW_Y - Math.min(...colGroups.map((g) => g.top));
					if (Math.abs(shiftUp) >= 2) {
						const colElIds = new Set(colGroups.flatMap((g) => g.elements.map((e) => e.id)));
						nextPage.elements = nextPage.elements.map((el) => {
							if (colElIds.has(el.id)) {
								shiftedIds.add(el.id);
								return {
									...el,
									y: Math.max(24, Math.round(el.y + shiftUp))
								};
							}
							return el;
						});
					}
				}
			}
		}
	}
	let pIdx = 0;
	const MAX_PAGES = 8;
	while (pIdx < pages.length && pages.length <= MAX_PAGES) {
		const page = pages[pIdx];
		const flowEls = page.elements.filter(isFlowableElement);
		if (!flowEls.filter((el) => el.y + el.h > BOTTOM_SAFE_Y).length) {
			pIdx += 1;
			continue;
		}
		if (!force && hasFreeElementBlockingPagination(page)) {
			blockedByFreeElement = true;
			pIdx += 1;
			continue;
		}
		const groups = buildColumnFlowGroups(flowEls);
		const groupsToMove = [];
		const movedGroupSet = /* @__PURE__ */ new Set();
		for (const g of groups) {
			if (movedGroupSet.has(g)) continue;
			const isAtVeryTop = g.top <= 64;
			if (g.bottom > BOTTOM_SAFE_Y && !isAtVeryTop) for (const candidate of groups) {
				if (movedGroupSet.has(candidate)) continue;
				if (candidate.top >= g.top && horizontalOverlap(candidate, g) > 32) {
					movedGroupSet.add(candidate);
					groupsToMove.push(candidate);
				}
			}
		}
		if (!groupsToMove.length) {
			pIdx += 1;
			continue;
		}
		if (pIdx + 1 >= pages.length) {
			const nextNum = pages.length + 1;
			const existingId = `page-${nextNum}`;
			const newPageId = pages.some((pg) => pg.id === existingId) ? `page-${uid()}` : existingId;
			pages.push({
				id: newPageId,
				name: `Page ${nextNum}`,
				background: page.background || "#ffffff",
				elements: []
			});
		}
		const nextPage = pages[pIdx + 1];
		const movingIds = new Set(groupsToMove.flatMap((g) => g.elements.map((e) => e.id)));
		page.elements = page.elements.filter((el) => !movingIds.has(el.id));
		const processedCols = /* @__PURE__ */ new Set();
		const newlyPlacedOnNext = [];
		for (const g of groupsToMove) {
			if (processedCols.has(g)) continue;
			const colMovedGroups = groupsToMove.filter((cg) => horizontalOverlap(cg, g) > 32).sort((a, b) => a.top - b.top);
			colMovedGroups.forEach((cg) => processedCols.add(cg));
			let cursorY = TOP_FLOW_Y;
			for (let i = 0; i < colMovedGroups.length; i++) {
				const cg = colMovedGroups[i];
				if (i > 0) {
					const prevCg = colMovedGroups[i - 1];
					const originalGap = Math.max(10, Math.min(32, cg.top - prevCg.bottom));
					cursorY += originalGap;
				}
				const dy = cursorY - cg.top;
				for (const el of cg.elements) newlyPlacedOnNext.push({
					...el,
					y: Math.round(el.y + dy)
				});
				cursorY += cg.height;
			}
			const existingInCol = nextPage.elements.filter((el) => isFlowableElement(el) && horizontalOverlap(el, g) > 32);
			if (existingInCol.length > 0) {
				const minExistingY = Math.min(...existingInCol.map((e) => e.y));
				if (minExistingY < cursorY + 16) {
					const pushDown = cursorY + 16 - minExistingY;
					const existingIds = new Set(existingInCol.map((e) => e.id));
					nextPage.elements = nextPage.elements.map((el) => existingIds.has(el.id) ? {
						...el,
						y: Math.round(el.y + pushDown)
					} : el);
				}
			}
		}
		nextPage.elements = [...newlyPlacedOnNext, ...nextPage.elements];
		pIdx += 1;
	}
	const finalPages = pages.filter((page, idx) => {
		if (idx === 0) return true;
		if (page.elements.some(isStudioFreeElement)) return true;
		return page.elements.some((el) => !el.hidden && !isDecorativeElement(el));
	}).map((page, idx) => {
		const isDefaultName = /^Page \d+$/i.test(page.name.trim());
		return {
			...page,
			name: isDefaultName ? `Page ${idx + 1}` : page.name
		};
	});
	return {
		doc: {
			...workingDoc,
			pages: finalPages
		},
		blockedByFreeElement
	};
}
/**
* Compacts vertical spacing on a page without reducing font sizes,
* then runs pagination so blocks that now fit on earlier pages move up.
*/
function compactPageSpacing(doc, targetPageId) {
	const pages = doc.pages.map((page) => {
		if (targetPageId && page.id !== targetPageId) return page;
		if (!page.elements.filter(isFlowableElement).length) return page;
		const fittedElements = page.elements.map((el) => {
			if (!el.hidden && el.bind && [
				"summary",
				"experience",
				"education",
				"skills",
				"languages"
			].includes(el.bind.kind)) {
				const autoH = computeElementAutoHeight(el);
				return {
					...el,
					h: autoH
				};
			}
			return el;
		});
		const groups = buildColumnFlowGroups(fittedElements.filter(isFlowableElement));
		const processed = /* @__PURE__ */ new Set();
		const yPatches = /* @__PURE__ */ new Map();
		for (const g of groups) {
			if (processed.has(g)) continue;
			const colGroups = groups.filter((cg) => horizontalOverlap(cg, g) > 32).sort((a, b) => a.top - b.top);
			colGroups.forEach((cg) => processed.add(cg));
			if (!colGroups.length) continue;
			let cursorY = colGroups[0].top;
			for (let i = 0; i < colGroups.length; i++) {
				const cg = colGroups[i];
				if (i > 0) {
					const isSectionStart = cg.elements[0]?.type === "heading" || cg.elements[0]?.type === "rule";
					cursorY += isSectionStart ? 12 : 8;
				}
				const dy = cursorY - cg.top;
				for (const el of cg.elements) yPatches.set(el.id, Math.max(24, Math.round(el.y + dy)));
				cursorY += cg.height;
			}
		}
		return {
			...page,
			elements: fittedElements.map((el) => yPatches.has(el.id) ? {
				...el,
				y: yPatches.get(el.id)
			} : el)
		};
	});
	return paginateDocFlow({
		...doc,
		pages
	}, { force: true }).doc;
}
function getElementLabel(el) {
	if (el.bind) {
		if (el.bind.kind === "experience") return `Expérience ${el.bind.index + 1}`;
		if (el.bind.kind === "education") return `Formation ${el.bind.index + 1}`;
		if (el.bind.kind === "skills") return "Compétences";
		if (el.bind.kind === "languages") return "Langues";
		if (el.bind.kind === "summary") return "Profil";
		if (el.bind.kind === "name") return "Nom";
		if (el.bind.kind === "role") return "Titre";
		if (el.bind.kind === "contact") return `Contact (${el.bind.field})`;
	}
	if (el.type === "skills") return "Compétences";
	if (el.type === "meters") return "Langues";
	if (el.type === "experience") return el.content.role ? `Expérience (${el.content.role})` : "Expérience";
	if (el.type === "education") return el.content.degree ? `Formation (${el.content.degree})` : "Formation";
	const s = snippet(el).trim();
	if (s && s.length <= 28) return s;
	if (s) return `${s.slice(0, 25)}…`;
	return TYPE_LABEL[el.type];
}
function parseHexRgb(hex) {
	if (!hex || hex === "transparent") return null;
	const clean = hex.trim().replace(/^#/, "");
	if (clean.length === 3) {
		const r = Number.parseInt(clean[0] + clean[0], 16);
		const g = Number.parseInt(clean[1] + clean[1], 16);
		const b = Number.parseInt(clean[2] + clean[2], 16);
		if ([
			r,
			g,
			b
		].some(Number.isNaN)) return null;
		return [
			r,
			g,
			b
		];
	}
	if (clean.length === 6) {
		const r = Number.parseInt(clean.slice(0, 2), 16);
		const g = Number.parseInt(clean.slice(2, 4), 16);
		const b = Number.parseInt(clean.slice(4, 6), 16);
		if ([
			r,
			g,
			b
		].some(Number.isNaN)) return null;
		return [
			r,
			g,
			b
		];
	}
	return null;
}
function relativeLuminance([r, g, b]) {
	const toLinear = (c) => {
		const v = c / 255;
		return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
	};
	return .2126 * toLinear(r) + .7152 * toLinear(g) + .0722 * toLinear(b);
}
function contrastRatio(hexA, hexB) {
	const rgbA = parseHexRgb(hexA);
	const rgbB = parseHexRgb(hexB);
	if (!rgbA || !rgbB) return null;
	const lumA = relativeLuminance(rgbA);
	const lumB = relativeLuminance(rgbB);
	const brightest = Math.max(lumA, lumB);
	const darkest = Math.min(lumA, lumB);
	return (brightest + .05) / (darkest + .05);
}
function getEffectiveBackgroundColor(el, page) {
	if (el.style.backgroundColor && el.style.backgroundColor !== "transparent") return el.style.backgroundColor;
	const cx = el.x + el.w / 2;
	const cy = el.y + el.h / 2;
	const bgShapes = page.elements.filter((other) => !other.hidden && other.id !== el.id && (other.type === "rect" || other.type === "ellipse") && other.z <= el.z && other.style.backgroundColor && other.style.backgroundColor !== "transparent" && cx >= other.x && cx <= other.x + other.w && cy >= other.y && cy <= other.y + other.h).sort((a, b) => b.z - a.z);
	if (bgShapes.length > 0) return bgShapes[0].style.backgroundColor;
	return page.background || "#ffffff";
}
function isContentElement(el) {
	if (el.hidden) return false;
	return [
		"heading",
		"text",
		"experience",
		"education",
		"skills",
		"meters",
		"contact"
	].includes(el.type);
}
function auditDocument(doc, options) {
	const issues = [];
	const editorMode = options?.editorMode ?? "guided";
	let totalStudioFreeBlocks = 0;
	doc.pages.forEach((page, pageIdx) => {
		const pageNumber = pageIdx + 1;
		const freeBlocksOnPage = page.elements.filter(isStudioFreeElement);
		totalStudioFreeBlocks += freeBlocksOnPage.length;
		const visibleContentEls = page.elements.filter(isContentElement);
		if (visibleContentEls.length === 0 && freeBlocksOnPage.length === 0) issues.push({
			id: `empty-page-${page.id}`,
			kind: "empty-page",
			severity: "critical",
			pageId: page.id,
			pageNumber,
			elementIds: [],
			bannerTitle: `La page ${pageNumber} est vide.`,
			message: `La page ${pageNumber} est vide et ne contient aucun bloc.`,
			detail: "Supprimez cette page vide ou ajoutez-y du contenu avant d'exporter votre CV.",
			actions: doc.pages.length > 1 ? ["delete-empty-page", "adjust-studio"] : ["adjust-studio"]
		});
		let pageTotalChars = 0;
		for (const el of visibleContentEls) {
			const label = getElementLabel(el);
			if (el.y + el.h > 1124) {
				const actions = ["paginate", "compact-spacing"];
				if (editorMode === "guided") actions.push("adjust-studio");
				else actions.push("adjust-studio", "switch-guided");
				issues.push({
					id: `overflow-bottom-${page.id}-${el.id}`,
					kind: "overflow-bottom",
					severity: "critical",
					pageId: page.id,
					pageNumber,
					elementIds: [el.id],
					bannerTitle: `Ton contenu dépasse la page ${pageNumber}.`,
					message: `Le bloc “${label}” dépasse la page ${pageNumber}.`,
					detail: `Bas du bloc à ${Math.round(el.y + el.h)} px (limite A4 : ${PAGE_H} px).`,
					actions
				});
			}
			if (el.x < -2 || el.x + el.w > 796) {
				const actions = ["adjust-studio"];
				if (editorMode === "pro") actions.push("switch-guided");
				issues.push({
					id: `overflow-right-${page.id}-${el.id}`,
					kind: "overflow-right",
					severity: "critical",
					pageId: page.id,
					pageNumber,
					elementIds: [el.id],
					bannerTitle: "Un bloc dépasse la page.",
					message: `Le bloc “${label}” dépasse la largeur de la page ${pageNumber}.`,
					detail: `Position horizontale (${Math.round(el.x)} px à ${Math.round(el.x + el.w)} px) hors de la feuille A4 (794 px).`,
					actions
				});
			}
			if ([
				"experience",
				"education",
				"text",
				"skills",
				"meters"
			].includes(el.type)) {
				const minNeeded = computeElementAutoHeight(el);
				if (el.h < minNeeded - 10) issues.push({
					id: `truncated-${page.id}-${el.id}`,
					kind: "truncated-text",
					severity: "critical",
					pageId: page.id,
					pageNumber,
					elementIds: [el.id],
					bannerTitle: "Un bloc dépasse la page.",
					message: `Le texte du bloc “${label}” est tronqué ou coupé sur la page ${pageNumber}.`,
					detail: `Hauteur actuelle ${Math.round(el.h)} px pour environ ${Math.round(minNeeded)} px nécessaires.`,
					actions: ["compact-spacing", "adjust-studio"]
				});
			}
			if (el.style.fontSize && el.style.fontSize < 10) issues.push({
				id: `small-font-${page.id}-${el.id}`,
				kind: "small-font",
				severity: "warning",
				pageId: page.id,
				pageNumber,
				elementIds: [el.id],
				bannerTitle: `La police du bloc “${label}” est trop petite.`,
				message: `La police du bloc “${label}” est trop petite (${el.style.fontSize} px).`,
				detail: "Une taille minimale de 10 px est recommandée pour une lecture confortable par les recruteurs.",
				actions: ["adjust-studio"]
			});
			const bgHex = getEffectiveBackgroundColor(el, page);
			const ratio = contrastRatio(el.style.color || "#141311", bgHex);
			if (ratio !== null && ratio < 2.8) issues.push({
				id: `low-contrast-${page.id}-${el.id}`,
				kind: "low-contrast",
				severity: "warning",
				pageId: page.id,
				pageNumber,
				elementIds: [el.id],
				bannerTitle: `Contraste insuffisant sur le bloc “${label}”.`,
				message: `Le contraste du bloc “${label}” est insuffisant sur la page ${pageNumber} (ratio ${ratio.toFixed(1)}:1).`,
				detail: "Assurez un contraste net entre la couleur du texte et le fond.",
				actions: ["adjust-studio"]
			});
			if (!(el.x <= 2 && el.w >= 790 && el.style.textAlign === "center") && (el.x < 14 || el.x + el.w > 780 || el.y < 14) && el.x >= -2 && el.x + el.w <= 796) issues.push({
				id: `small-margin-${page.id}-${el.id}`,
				kind: "small-margin",
				severity: "warning",
				pageId: page.id,
				pageNumber,
				elementIds: [el.id],
				bannerTitle: `Marges faibles sur la page ${pageNumber}.`,
				message: `Les marges du bloc “${label}” sont trop faibles sur la page ${pageNumber}.`,
				detail: "Laissez au moins 20 à 36 px de marge par rapport au bord de la feuille A4.",
				actions: ["adjust-studio"]
			});
			const textLen = (el.content.text?.length ?? 0) + (el.content.role?.length ?? 0) + (el.content.company?.length ?? 0) + (el.content.desc?.length ?? 0) + (el.content.degree?.length ?? 0) + (el.content.school?.length ?? 0) + (el.content.items?.join(", ").length ?? 0);
			pageTotalChars += textLen;
			if (el.type === "experience" && (el.content.desc?.length ?? 0) > 680) issues.push({
				id: `high-density-${page.id}-${el.id}`,
				kind: "high-density",
				severity: "warning",
				pageId: page.id,
				pageNumber,
				elementIds: [el.id],
				bannerTitle: `Densité élevée dans “${label}”.`,
				message: `Le bloc “${label}” contient un texte très dense (${el.content.desc?.length} caractères).`,
				detail: "Synthétisez en 3 à 5 réalisations clés pour faciliter la lecture rapide.",
				actions: ["adjust-studio"]
			});
		}
		for (let i = 0; i < visibleContentEls.length; i++) for (let j = i + 1; j < visibleContentEls.length; j++) {
			const a = visibleContentEls[i];
			const b = visibleContentEls[j];
			if (isDecorativeElement(a) || isDecorativeElement(b)) continue;
			const interX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
			const interY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
			if (interX > 10 && interY > 8) {
				const labelA = getElementLabel(a);
				const labelB = getElementLabel(b);
				const actions = ["compact-spacing", "adjust-studio"];
				if (editorMode === "pro") actions.push("switch-guided");
				issues.push({
					id: `overlap-${page.id}-${a.id}-${b.id}`,
					kind: "overlap",
					severity: "critical",
					pageId: page.id,
					pageNumber,
					elementIds: [a.id, b.id],
					bannerTitle: "Deux blocs se chevauchent.",
					message: `Deux blocs se chevauchent sur la page ${pageNumber} (“${labelA}” et “${labelB}”).`,
					detail: "Déplacez l'un des blocs dans le Studio ou réorganisez l'espacement.",
					actions
				});
			}
		}
		if (editorMode === "guided" && freeBlocksOnPage.length > 0) {
			const freeIds = freeBlocksOnPage.map((e) => e.id);
			if (options?.paginationBlocked) issues.push({
				id: `free-block-blocking-${page.id}`,
				kind: "free-block-limit",
				severity: "warning",
				pageId: page.id,
				pageNumber,
				elementIds: freeIds,
				bannerTitle: "Un bloc libre du Studio empêche la pagination automatique.",
				message: `Un bloc libre sur la page ${pageNumber} est situé dans la zone de flux. Ses coordonnées sont préservées ; utilisez l'action manuelle pour répartir sur les pages suivantes.`,
				detail: "Les blocs libres ne sont jamais déplacés ni supprimés silencieusement en Mode Guidé.",
				actions: ["paginate", "adjust-studio"]
			});
			else issues.push({
				id: `free-block-info-${page.id}`,
				kind: "free-block-limit",
				severity: "info",
				pageId: page.id,
				pageNumber,
				elementIds: freeIds,
				bannerTitle: `${freeBlocksOnPage.length} bloc(s) libre(s) du Studio conservé(s) sur la page ${pageNumber}.`,
				message: "Certains blocs ont été créés dans le Studio et restent en position libre. Ils sont conservés mais ne sont pas paginés automatiquement en Mode Guidé.",
				detail: "Cliquez pour sélectionner le bloc libre ou basculez vers le Studio libre pour l'éditer.",
				actions: ["adjust-studio"]
			});
		}
	});
	const criticalIssues = issues.filter((i) => i.severity === "critical");
	const warningIssues = issues.filter((i) => i.severity === "warning");
	const infoIssues = issues.filter((i) => i.severity === "info");
	return {
		issues,
		criticalIssues,
		warningIssues,
		infoIssues,
		primaryBannerIssue: criticalIssues[0] ?? warningIssues[0] ?? infoIssues[0] ?? null,
		hasCriticalExportIssues: criticalIssues.length > 0,
		totalStudioFreeBlocks
	};
}
/**
* Generates an ATS-oriented plain text representation of the CV following the actual visual reading order
* of all visible text/content blocks across pages (including Studio free blocks with text, excluding decorative shapes).
*/
function generatePlainTextPreview(doc) {
	const lines = [];
	const warnings = [];
	let blockCount = 0;
	doc.pages.forEach((page, pageIdx) => {
		if (pageIdx > 0) lines.push(`\n--- PAGE ${pageIdx + 1} ---`);
		const textEls = page.elements.filter((el) => {
			if (el.hidden) return false;
			if (el.type === "rect" || el.type === "ellipse" || el.type === "rule" || el.type === "photo") return false;
			return true;
		});
		const nameEl = textEls.find((e) => e.bind?.kind === "name");
		const roleEl = textEls.find((e) => e.bind?.kind === "role");
		const expHeading = textEls.find((e) => e.type === "heading" && !e.bind && /exp[eé]rience|parcours/i.test(e.content.text ?? ""));
		const firstExp = textEls.filter((e) => e.type === "experience").sort((a, b) => a.y - b.y)[0];
		if (nameEl && roleEl && roleEl.y + 8 < nameEl.y) warnings.push(`Page ${pageIdx + 1} : Le titre du poste (« ${roleEl.content.text} ») est placé visuellement au-dessus du nom du candidat.`);
		if (expHeading && firstExp && firstExp.y + 6 < expHeading.y) warnings.push(`Page ${pageIdx + 1} : Une expérience apparaît visuellement au-dessus du titre de section « ${expHeading.content.text} ».`);
		for (let i = 0; i < textEls.length; i++) for (let j = i + 1; j < textEls.length; j++) {
			const a = textEls[i];
			const b = textEls[j];
			if (boxesOverlap(a, b, -6)) warnings.push(`Page ${pageIdx + 1} : Les blocs « ${getElementLabel(a)} » et « ${getElementLabel(b)} » se chevauchent, ce qui peut altérer l'ordre de lecture ATS.`);
		}
		const isHeaderIdentity = (el) => pageIdx === 0 && el.y < 245 && Boolean(el.bind && [
			"name",
			"role",
			"contact"
		].includes(el.bind.kind));
		const headerEls = textEls.filter(isHeaderIdentity).sort((a, b) => {
			const rank = (e) => {
				if (e.bind?.kind === "name") return 0;
				if (e.bind?.kind === "role") return 1;
				return 2;
			};
			if (a.bind?.kind === "name" && b.bind?.kind === "role" && b.y + 8 < a.y) return 1;
			if (b.bind?.kind === "name" && a.bind?.kind === "role" && a.y + 8 < b.y) return -1;
			const rDiff = rank(a) - rank(b);
			if (rDiff !== 0) return rDiff;
			return Math.abs(a.y - b.y) <= 8 ? a.x - b.x : a.y - b.y;
		});
		const bodyEls = textEls.filter((el) => !isHeaderIdentity(el)).sort((a, b) => Math.abs(a.y - b.y) <= 10 ? a.x - b.x : a.y - b.y);
		const ordered = [...headerEls, ...bodyEls];
		for (const el of ordered) {
			blockCount += 1;
			if (el.type === "heading") {
				const t = (el.content.text ?? "").trim();
				if (!t) continue;
				if (el.bind?.kind === "name") lines.push(t);
				else {
					if (lines.length > 0 && lines[lines.length - 1] !== "") lines.push("");
					lines.push(t.toUpperCase());
				}
			} else if (el.type === "text" || el.type === "contact") {
				const t = (el.content.text ?? "").trim();
				if (t) lines.push(t);
			} else if (el.type === "experience") {
				const header = [
					el.content.role?.trim(),
					el.content.company?.trim(),
					el.content.date?.trim()
				].filter(Boolean).join(" — ");
				if (header) lines.push(header);
				const desc = (el.content.desc ?? "").trim();
				if (desc) {
					const descLines = desc.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l.startsWith("•") || l.startsWith("-") ? l : `• ${l}`);
					lines.push(...descLines);
				}
				lines.push("");
			} else if (el.type === "education") {
				const eduLine = [
					el.content.degree?.trim(),
					el.content.school?.trim(),
					el.content.date?.trim()
				].filter(Boolean).join(" — ");
				if (eduLine) lines.push(eduLine);
			} else if (el.type === "skills") {
				const items = (el.content.items ?? []).map((s) => s.trim()).filter(Boolean);
				if (items.length) lines.push(items.join(", "));
			} else if (el.type === "meters") {
				const meters = (el.content.meters ?? []).filter((m) => m.label?.trim()).map((m) => `${m.label.trim()} (${m.value}%)`);
				if (meters.length) lines.push(meters.join(", "));
			}
		}
	});
	const compactLines = [];
	for (const line of lines) {
		if (line === "" && (compactLines.length === 0 || compactLines[compactLines.length - 1] === "")) continue;
		compactLines.push(line);
	}
	while (compactLines.length > 0 && compactLines[compactLines.length - 1] === "") compactLines.pop();
	return {
		text: compactLines.join("\n"),
		readingOrderWarnings: [...new Set(warnings)],
		blockCount
	};
}
var KEY = "libre-cv-doc-v1";
var META_KEY = "libre-cv-meta-v1";
var noticeTimer = 0;
var persistTimer = 0;
function formatTime(d = /* @__PURE__ */ new Date()) {
	return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}
var TEMPLATE_ID_RE = /^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-\d+$|^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-/;
function getStudioUnboundElements(page) {
	return page.elements.filter((el) => {
		if (el.hidden) return false;
		if (el.type === "photo" && Boolean(el.content.src)) return true;
		if (!el.bind && !TEMPLATE_ID_RE.test(el.id)) return true;
		return false;
	});
}
function freshDoc() {
	const profile = structuredClone(SAMPLE);
	return {
		profile,
		pages: [{
			id: "page-1",
			name: "Page 1",
			background: SHEET,
			elements: buildTemplate("modern", profile, "seed")
		}]
	};
}
function flushSave(doc) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(KEY, JSON.stringify(doc));
		useStudio.setState({
			saveStatus: "saved",
			lastSavedAt: formatTime()
		});
	} catch {
		useStudio.getState().notify("Enregistrement local saturé — exporte le JSON");
	}
}
function saveMeta(patch) {
	if (typeof window === "undefined") return;
	try {
		const s = useStudio.getState();
		const meta = {
			editorMode: patch?.editorMode ?? s.editorMode,
			activeTemplate: patch?.activeTemplate ?? s.activeTemplate,
			activePageId: patch?.activePageId ?? s.activePageId,
			layoutCustomized: patch?.layoutCustomized ?? s.layoutCustomized
		};
		localStorage.setItem(META_KEY, JSON.stringify(meta));
	} catch {}
}
function readMeta() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(META_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function persist(doc) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(KEY, JSON.stringify(doc));
	} catch {}
	saveMeta();
	window.clearTimeout(persistTimer);
	useStudio.setState({
		saveStatus: "saved",
		lastSavedAt: formatTime()
	});
}
if (typeof window !== "undefined") window.addEventListener("beforeunload", () => {
	try {
		const doc = useStudio.getState().doc;
		if (doc) localStorage.setItem(KEY, JSON.stringify(doc));
		saveMeta();
	} catch {}
});
function readStorage() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (!data?.profile || typeof data.profile.name !== "string") return null;
		if (!Array.isArray(data.pages) || data.pages.length === 0) return null;
		if (!Array.isArray(data.profile.experiences) || !Array.isArray(data.profile.skills)) return null;
		return data;
	} catch {
		return null;
	}
}
function mergeElement(el, patch) {
	return {
		...el,
		...patch,
		style: patch.style ? {
			...el.style,
			...patch.style
		} : el.style,
		content: patch.content ? {
			...el.content,
			...patch.content
		} : el.content
	};
}
function mapPage(doc, pageId, fn) {
	return {
		...doc,
		pages: doc.pages.map((p) => p.id === pageId ? fn(p) : p)
	};
}
var initial = freshDoc();
var useStudio = create((set, get) => {
	function commit(recipe, live) {
		const current = get().doc;
		if (live) {
			if (!get().historyHeld) set({
				past: [...get().past, structuredClone(current)].slice(-80),
				future: [],
				historyHeld: true
			});
			const next = recipe(get().doc);
			set({ doc: next });
			persist(next);
			return;
		}
		const next = recipe(current);
		set({
			past: [...get().past, structuredClone(current)].slice(-80),
			future: [],
			historyHeld: false,
			doc: next
		});
		persist(next);
	}
	function selectedOnActive() {
		const { doc, activePageId, selectedIds } = get();
		const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];
		return {
			page,
			elements: page.elements.filter((el) => selectedIds.includes(el.id))
		};
	}
	function maybePaginateGuided(nextDoc) {
		if (get().editorMode !== "guided") return nextDoc;
		const res = paginateDocFlow(nextDoc);
		const nextActiveId = res.doc.pages.some((p) => p.id === get().activePageId) ? get().activePageId : res.doc.pages[res.doc.pages.length - 1]?.id ?? res.doc.pages[0].id;
		set({
			paginationBlocked: res.blockedByFreeElement,
			activePageId: nextActiveId
		});
		return res.doc;
	}
	return {
		doc: initial,
		past: [],
		future: [],
		historyHeld: false,
		activePageId: initial.pages[0].id,
		selectedIds: [],
		editingId: null,
		zoom: .85,
		editorMode: "pro",
		activeTemplate: "modern",
		layoutCustomized: false,
		paginationBlocked: false,
		readabilityModalOpen: false,
		plainTextModalOpen: false,
		pendingExportConfirm: false,
		confirmModal: null,
		showGrid: false,
		snap: true,
		guides: true,
		margins: false,
		notice: null,
		clipboard: [],
		saveStatus: "saved",
		lastSavedAt: null,
		syncCode: null,
		cloudStatus: "idle",
		cloudModalOpen: false,
		extractorModalOpen: false,
		mobileTouchMode: false,
		onboarding: false,
		setEditorMode: (mode) => {
			if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) document.activeElement.blur();
			set({
				editorMode: mode,
				editingId: null
			});
			saveMeta({ editorMode: mode });
		},
		setConfirmModal: (req) => set({ confirmModal: req }),
		setReadabilityModalOpen: (open, pendingExport = false) => set({
			readabilityModalOpen: open,
			pendingExportConfirm: open ? pendingExport : false
		}),
		setPlainTextModalOpen: (open) => set({ plainTextModalOpen: open }),
		paginateDocument: () => {
			commit((doc) => {
				const res = paginateDocFlow(doc, { force: true });
				set({
					paginationBlocked: false,
					activePageId: res.doc.pages.some((p) => p.id === get().activePageId) ? get().activePageId : res.doc.pages[res.doc.pages.length - 1]?.id ?? res.doc.pages[0].id
				});
				return res.doc;
			}, false);
			get().notify("✓ Contenu réparti sur les pages A4");
		},
		compactSpacing: (targetPageId) => {
			commit((doc) => {
				const compacted = compactPageSpacing(doc, targetPageId);
				set({
					paginationBlocked: false,
					activePageId: compacted.pages.some((p) => p.id === get().activePageId) ? get().activePageId : compacted.pages[compacted.pages.length - 1]?.id ?? compacted.pages[0].id
				});
				return compacted;
			}, false);
			get().notify("✓ Espacement vertical optimisé");
		},
		focusAuditIssue: (issue) => {
			set({
				activePageId: issue.pageId,
				selectedIds: issue.elementIds,
				editingId: null
			});
			saveMeta({ activePageId: issue.pageId });
			if (typeof window !== "undefined") {
				window.dispatchEvent(new CustomEvent("cv-focus-issue", { detail: issue }));
				window.setTimeout(() => {
					const targetId = issue.elementIds[0];
					const selector = targetId ? `[data-sheet="${issue.pageId}"] [data-element="${targetId}"], [data-element="${targetId}"]` : `[data-sheet="${issue.pageId}"]`;
					const node = document.querySelector(selector);
					if (node instanceof HTMLElement) node.scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "center"
					});
				}, 40);
			}
		},
		requestPdfExport: async () => {
			const { doc, editorMode, paginationBlocked } = get();
			if (auditDocument(doc, {
				editorMode,
				paginationBlocked
			}).hasCriticalExportIssues) {
				set({
					readabilityModalOpen: true,
					pendingExportConfirm: true
				});
				return;
			}
			await get().directPdfExport();
		},
		setCloudModalOpen: (open) => set({ cloudModalOpen: open }),
		setExtractorModalOpen: (open) => set({ extractorModalOpen: open }),
		setMobileTouchMode: (active) => set({ mobileTouchMode: active }),
		setOnboarding: (onboarding) => set({ onboarding }),
		hydrate: () => {
			let urlSyncCode = null;
			if (typeof window !== "undefined") try {
				const s = new URLSearchParams(window.location.search).get("sync");
				if (s && s.trim()) urlSyncCode = s.trim().toUpperCase();
			} catch {}
			const loaded = readStorage();
			const meta = readMeta();
			let storedSyncCode = null;
			if (typeof window !== "undefined") try {
				storedSyncCode = localStorage.getItem("libre-cv-sync-code");
			} catch {}
			const activeCode = urlSyncCode || storedSyncCode;
			if (activeCode) set({ syncCode: activeCode });
			if (meta) set({
				editorMode: meta.editorMode === "guided" || meta.editorMode === "pro" ? meta.editorMode : get().editorMode,
				activeTemplate: meta.activeTemplate ?? get().activeTemplate,
				layoutCustomized: Boolean(meta.layoutCustomized)
			});
			if (urlSyncCode) {
				get().loadFromCloud(urlSyncCode);
				return;
			}
			if (!loaded) return;
			const syncedDoc = syncBoundElementsFromProfile(loaded, true);
			set({
				doc: syncedDoc,
				activePageId: meta?.activePageId && syncedDoc.pages.some((p) => p.id === meta.activePageId) ? meta.activePageId : syncedDoc.pages[0].id,
				selectedIds: [],
				editingId: null,
				past: [],
				future: [],
				historyHeld: false,
				saveStatus: "saved",
				lastSavedAt: formatTime()
			});
		},
		syncToCloud: async (customTitle) => {
			const { doc, syncCode } = get();
			set({ cloudStatus: "saving" });
			get().notify("Synchronisation Cloud en cours...");
			try {
				const title = customTitle || doc.profile.name || "Mon CV";
				const res = await saveCvToCloud({ data: {
					doc,
					syncCode: syncCode ?? void 0,
					title
				} });
				if (res.success) {
					if (typeof window !== "undefined") try {
						localStorage.setItem("libre-cv-sync-code", res.syncCode);
					} catch {}
					set({
						syncCode: res.syncCode,
						cloudStatus: "synced"
					});
					get().notify(`☁️ CV synchronisé ! Code : ${res.syncCode}`);
					return res.syncCode;
				} else {
					set({ cloudStatus: "error" });
					get().notify(`Erreur Cloud : ${res.error}`);
					return null;
				}
			} catch (err) {
				set({ cloudStatus: "error" });
				const msg = err instanceof Error ? err.message : "Erreur Cloud";
				get().notify(msg);
				return null;
			}
		},
		loadFromCloud: async (code) => {
			const clean = code.trim().toUpperCase();
			if (!clean) return false;
			set({ cloudStatus: "saving" });
			get().notify(`Récupération du CV "${clean}"...`);
			try {
				const res = await loadCvFromCloud({ data: clean });
				if (res.success) {
					get().loadDocument(res.doc);
					if (typeof window !== "undefined") try {
						localStorage.setItem("libre-cv-sync-code", res.syncCode);
					} catch {}
					set({
						syncCode: res.syncCode,
						cloudStatus: "synced"
					});
					get().notify(`✓ CV "${res.title}" chargé depuis le Cloud !`);
					return true;
				} else {
					set({ cloudStatus: "error" });
					get().notify(res.error);
					return false;
				}
			} catch (err) {
				set({ cloudStatus: "error" });
				const msg = err instanceof Error ? err.message : "Impossible de charger le CV";
				get().notify(msg);
				return false;
			}
		},
		directPdfExport: async () => {
			const { doc, activePageId } = get();
			get().notify("Génération directe du PDF en cours...");
			try {
				await downloadDirectPDF(doc, activePageId, (msg) => {
					get().notify(msg);
				});
				get().notify("✓ PDF A4 téléchargé directement !");
			} catch (err) {
				console.error("Direct PDF export error:", err);
				get().notify("Export PDF direct échoué — ouverture impression");
				window.print();
			}
		},
		saveNow: () => {
			flushSave(get().doc);
			saveMeta();
			get().notify("✓ Sauvegardé en temps réel");
		},
		setZoom: (z) => set({ zoom: Math.min(2, Math.max(.25, z)) }),
		toggle: (key) => set({ [key]: !get()[key] }),
		notify: (msg) => {
			set({ notice: msg });
			window.clearTimeout(noticeTimer);
			noticeTimer = window.setTimeout(() => set({ notice: null }), 2400);
		},
		select: (ids) => set({
			selectedIds: ids,
			editingId: get().editingId && ids.includes(get().editingId) ? get().editingId : null
		}),
		setActive: (id) => {
			set({ activePageId: id });
			saveMeta({ activePageId: id });
		},
		setEditing: (id) => set({
			editingId: id,
			selectedIds: id ? [id] : get().selectedIds
		}),
		undo: () => {
			const { past, doc, future } = get();
			if (!past.length) return;
			const prev = past[past.length - 1];
			const active = prev.pages.some((p) => p.id === get().activePageId) ? get().activePageId : prev.pages[0].id;
			set({
				past: past.slice(0, -1),
				future: [structuredClone(doc), ...future].slice(0, 80),
				doc: prev,
				activePageId: active,
				selectedIds: [],
				editingId: null,
				historyHeld: false
			});
			persist(prev);
		},
		redo: () => {
			const { past, doc, future } = get();
			if (!future.length) return;
			const next = future[0];
			const active = next.pages.some((p) => p.id === get().activePageId) ? get().activePageId : next.pages[0].id;
			set({
				past: [...past, structuredClone(doc)].slice(-80),
				future: future.slice(1),
				doc: next,
				activePageId: active,
				selectedIds: [],
				editingId: null,
				historyHeld: false
			});
			persist(next);
		},
		hold: () => {
			if (get().historyHeld) return;
			set({
				past: [...get().past, structuredClone(get().doc)].slice(-80),
				future: [],
				historyHeld: true
			});
		},
		release: () => {
			if (!get().historyHeld) return;
			set({ historyHeld: false });
			persist(get().doc);
		},
		patchElements: (pageId, patches) => {
			if (!get().historyHeld) get().hold();
			const nextDoc = mapPage(get().doc, pageId, (page) => ({
				...page,
				elements: page.elements.map((el) => patches[el.id] ? mergeElement(el, patches[el.id]) : el)
			}));
			set({
				doc: nextDoc,
				layoutCustomized: true
			});
			persist(nextDoc);
		},
		patchElement: (pageId, id, patch, live = false) => {
			if ((patch.x !== void 0 || patch.y !== void 0 || patch.w !== void 0 || patch.h !== void 0 || patch.rotation !== void 0 || patch.style !== void 0) && !get().layoutCustomized) set({ layoutCustomized: true });
			commit((doc) => {
				let profile = doc.profile;
				let boundContentModified = false;
				const pages = doc.pages.map((page) => {
					if (page.id !== pageId && !page.elements.some((e) => e.id === id)) return page;
					let resized = null;
					const elements = page.elements.map((el) => {
						if (el.id !== id) return el;
						const next = mergeElement(el, patch);
						if (patch.content) {
							profile = syncProfile(profile, next.bind, next.content);
							if (next.bind) boundContentModified = true;
							if ([
								"experience",
								"education",
								"text",
								"skills",
								"meters"
							].includes(next.type)) {
								const nextH = computeElementAutoHeight(next);
								if (Math.abs(nextH - next.h) >= 2) resized = {
									id: next.id,
									nextH
								};
							}
						}
						return next;
					});
					let nextPage = {
						...page,
						elements
					};
					if (resized) nextPage = resizeElementWithFlow(nextPage, resized.id, resized.nextH);
					return nextPage;
				});
				const updatedDoc = {
					...doc,
					profile,
					pages
				};
				return boundContentModified ? maybePaginateGuided(updatedDoc) : updatedDoc;
			}, live);
		},
		patchSelectedStyle: (patch, live = false) => {
			const { page, elements } = selectedOnActive();
			if (!elements.length) return;
			const ids = new Set(elements.map((e) => e.id));
			set({ layoutCustomized: true });
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.map((el) => ids.has(el.id) ? mergeElement(el, { style: patch }) : el)
			})), live);
		},
		setIdentity: (field, value) => {
			commit((doc) => maybePaginateGuided(applyIdentity(doc, field, value)), true);
		},
		updateExperience: (index, patch, live = true) => {
			commit((doc) => maybePaginateGuided(applyExperienceUpdate(doc, index, patch)), live);
		},
		addExperience: () => {
			const pageId = get().activePageId;
			commit((doc) => maybePaginateGuided(applyExperienceAdd(doc, pageId)), false);
			get().notify("Nouvelle expérience ajoutée");
		},
		removeExperience: (index) => {
			commit((doc) => maybePaginateGuided(applyExperienceRemove(doc, index)), false);
			get().notify("Expérience supprimée");
		},
		updateEducation: (index, patch, live = true) => {
			commit((doc) => maybePaginateGuided(applyEducationUpdate(doc, index, patch)), live);
		},
		addEducation: () => {
			const pageId = get().activePageId;
			commit((doc) => maybePaginateGuided(applyEducationAdd(doc, pageId)), false);
			get().notify("Formation ajoutée");
		},
		removeEducation: (index) => {
			commit((doc) => maybePaginateGuided(applyEducationRemove(doc, index)), false);
			get().notify("Formation supprimée");
		},
		updateSkills: (skills, live = true) => {
			commit((doc) => maybePaginateGuided(applySkillsUpdate(doc, skills)), live);
		},
		updateLanguages: (languages, live = true) => {
			commit((doc) => maybePaginateGuided(applyLanguagesUpdate(doc, languages)), live);
		},
		deleteSelected: () => {
			const { page, elements } = selectedOnActive();
			const ids = new Set(get().selectedIds);
			if (!ids.size) return;
			set({ layoutCustomized: true });
			commit((doc) => {
				let nextDoc = mapPage(doc, page.id, (p) => ({
					...p,
					elements: p.elements.filter((el) => !ids.has(el.id))
				}));
				const expIndices = elements.filter((el) => el.bind?.kind === "experience").map((el) => el.bind.index).sort((a, b) => b - a);
				for (const idx of expIndices) if (!nextDoc.pages.some((p) => p.elements.some((el) => el.bind?.kind === "experience" && el.bind.index === idx))) nextDoc = applyExperienceRemove(nextDoc, idx);
				const eduIndices = elements.filter((el) => el.bind?.kind === "education").map((el) => el.bind.index).sort((a, b) => b - a);
				for (const idx of eduIndices) if (!nextDoc.pages.some((p) => p.elements.some((el) => el.bind?.kind === "education" && el.bind.index === idx))) nextDoc = applyEducationRemove(nextDoc, idx);
				return nextDoc;
			}, false);
			set({
				selectedIds: [],
				editingId: null
			});
		},
		duplicateSelected: () => {
			const { page, elements } = selectedOnActive();
			if (!elements.length) return;
			const maxZ = Math.max(0, ...page.elements.map((e) => e.z));
			const copies = elements.map((el, i) => ({
				...structuredClone(el),
				id: uid(),
				x: el.x + 16,
				y: el.y + 16,
				z: maxZ + 1 + i,
				bind: void 0
			}));
			set({ layoutCustomized: true });
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: [...p.elements, ...copies]
			})), false);
			set({
				selectedIds: copies.map((c) => c.id),
				editingId: null
			});
		},
		copy: () => {
			const { elements } = selectedOnActive();
			if (!elements.length) return;
			set({ clipboard: structuredClone(elements) });
			get().notify("Copié");
		},
		paste: () => {
			const clips = get().clipboard;
			if (!clips.length) return;
			const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
			const maxZ = Math.max(0, ...page.elements.map((e) => e.z));
			const copies = clips.map((el, i) => ({
				...structuredClone(el),
				id: uid(),
				x: el.x + 20,
				y: el.y + 20,
				z: maxZ + 1 + i,
				bind: void 0
			}));
			set({ layoutCustomized: true });
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: [...p.elements, ...copies]
			})), false);
			set({ selectedIds: copies.map((c) => c.id) });
		},
		align: (mode) => {
			const { page, elements } = selectedOnActive();
			if (elements.length < 2) return;
			const minX = Math.min(...elements.map((e) => e.x));
			const maxX = Math.max(...elements.map((e) => e.x + e.w));
			const minY = Math.min(...elements.map((e) => e.y));
			const maxY = Math.max(...elements.map((e) => e.y + e.h));
			const midX = (minX + maxX) / 2;
			const midY = (minY + maxY) / 2;
			const ids = new Set(elements.map((e) => e.id));
			set({ layoutCustomized: true });
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.map((el) => {
					if (!ids.has(el.id)) return el;
					if (mode === "left") return {
						...el,
						x: Math.round(minX)
					};
					if (mode === "right") return {
						...el,
						x: Math.round(maxX - el.w)
					};
					if (mode === "center") return {
						...el,
						x: Math.round(midX - el.w / 2)
					};
					if (mode === "top") return {
						...el,
						y: Math.round(minY)
					};
					if (mode === "bottom") return {
						...el,
						y: Math.round(maxY - el.h)
					};
					return {
						...el,
						y: Math.round(midY - el.h / 2)
					};
				})
			})), false);
		},
		distribute: (axis) => {
			const { page, elements } = selectedOnActive();
			if (elements.length < 3) return;
			const sorted = [...elements].sort((a, b) => axis === "x" ? a.x - b.x : a.y - b.y);
			const first = axis === "x" ? sorted[0].x : sorted[0].y;
			const step = ((axis === "x" ? sorted[sorted.length - 1].x : sorted[sorted.length - 1].y) - first) / (sorted.length - 1);
			const pos = new Map(sorted.map((el, i) => [el.id, Math.round(first + step * i)]));
			set({ layoutCustomized: true });
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.map((el) => {
					const n = pos.get(el.id);
					if (n == null) return el;
					return axis === "x" ? {
						...el,
						x: n
					} : {
						...el,
						y: n
					};
				})
			})), false);
		},
		order: (dir) => {
			const { page, elements } = selectedOnActive();
			if (!elements.length) return;
			const zs = page.elements.map((e) => e.z);
			const max = Math.max(...zs);
			const min = Math.min(...zs);
			const ids = new Set(elements.map((e) => e.id));
			set({ layoutCustomized: true });
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.map((el) => {
					if (!ids.has(el.id)) return el;
					if (dir === "front") return {
						...el,
						z: max + 1
					};
					if (dir === "back") return {
						...el,
						z: min - 1
					};
					if (dir === "forward") return {
						...el,
						z: el.z + 1
					};
					return {
						...el,
						z: el.z - 1
					};
				})
			})), false);
		},
		lockSelected: (locked) => {
			const { page, elements } = selectedOnActive();
			if (!elements.length) return;
			const ids = new Set(elements.map((e) => e.id));
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.map((el) => ids.has(el.id) ? {
					...el,
					locked
				} : el)
			})), false);
		},
		toggleHidden: (pageId, id) => {
			commit((doc) => mapPage(doc, pageId, (p) => ({
				...p,
				elements: p.elements.map((el) => el.id === id ? {
					...el,
					hidden: !el.hidden
				} : el)
			})), false);
		},
		toggleSectionVisibility: (sectionId) => {
			commit((doc) => {
				const matches = (el) => {
					if (!el.bind) return false;
					if (sectionId === "profile" && [
						"name",
						"role",
						"contact"
					].includes(el.bind.kind)) return true;
					if (sectionId === "summary" && el.bind.kind === "summary") return true;
					if (sectionId === "experience" && el.bind.kind === "experience") return true;
					if (sectionId === "education" && el.bind.kind === "education") return true;
					if (sectionId === "skills" && el.bind.kind === "skills") return true;
					if (sectionId === "languages" && el.bind.kind === "languages") return true;
					return false;
				};
				const targetHidden = doc.pages.some((p) => p.elements.some((el) => matches(el) && !el.hidden));
				const pages = doc.pages.map((page) => ({
					...page,
					elements: page.elements.map((el) => matches(el) ? {
						...el,
						hidden: targetHidden
					} : el)
				}));
				return {
					...doc,
					pages
				};
			}, false);
		},
		moveSection: (sectionId, direction) => {
			commit((doc) => {
				const pageId = get().activePageId;
				return maybePaginateGuided(mapPage(doc, pageId, (page) => {
					const getSectionElements = (sid) => {
						const boundEls = page.elements.filter((el) => {
							if (!el.bind) return false;
							if (sid === "profile" && [
								"name",
								"role",
								"contact"
							].includes(el.bind.kind)) return true;
							if (sid === "summary" && el.bind.kind === "summary") return true;
							if (sid === "experience" && el.bind.kind === "experience") return true;
							if (sid === "education" && el.bind.kind === "education") return true;
							if (sid === "skills" && el.bind.kind === "skills") return true;
							if (sid === "languages" && el.bind.kind === "languages") return true;
							return false;
						});
						if (!boundEls.length || sid === "profile") return boundEls;
						const firstBound = [...boundEls].sort((a, b) => a.y - b.y)[0];
						return [...page.elements.filter((el) => !el.bind && !isStudioFreeElement(el) && el.type === "heading" && Math.min(el.x + el.w, firstBound.x + firstBound.w) - Math.max(el.x, firstBound.x) > 32 && firstBound.y - el.y >= 6 && firstBound.y - el.y <= 38), ...boundEls];
					};
					const sectionOrder = [
						"profile",
						"summary",
						"experience",
						"education",
						"skills",
						"languages"
					];
					const idx = sectionOrder.indexOf(sectionId);
					if (idx === -1) return page;
					const targetIdx = direction === "up" ? idx - 1 : idx + 1;
					if (targetIdx < 0 || targetIdx >= sectionOrder.length) return page;
					const otherSectionId = sectionOrder[targetIdx];
					const elsA = getSectionElements(sectionId);
					const elsB = getSectionElements(otherSectionId);
					if (!elsA.length || !elsB.length) return page;
					const minY_A = Math.min(...elsA.map((e) => e.y));
					const minY_B = Math.min(...elsB.map((e) => e.y));
					const upper = minY_A <= minY_B ? elsA : elsB;
					const lower = minY_A <= minY_B ? elsB : elsA;
					const topU = Math.min(...upper.map((e) => e.y));
					const bottomU = Math.max(...upper.map((e) => e.y + e.h));
					bottomU - topU;
					const topL = Math.min(...lower.map((e) => e.y));
					const hL = Math.max(...lower.map((e) => e.y + e.h)) - topL;
					const gap = Math.max(12, topL - bottomU);
					const dyLower = topU - topL;
					const dyUpper = hL + gap;
					const idsUpper = new Set(upper.map((e) => e.id));
					const idsLower = new Set(lower.map((e) => e.id));
					return {
						...page,
						elements: page.elements.map((el) => {
							if (idsUpper.has(el.id)) return {
								...el,
								y: Math.round(el.y + dyUpper)
							};
							if (idsLower.has(el.id)) return {
								...el,
								y: Math.round(el.y + dyLower)
							};
							return el;
						})
					};
				}));
			}, false);
		},
		addElement: (type) => {
			const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
			const bottom = page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48);
			const y = Math.min(PAGE_H - 80, bottom + 16);
			const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
			let profile = get().doc.profile;
			let bind;
			let content = {};
			let w = 280;
			let h = 40;
			let style = baseStyle();
			if (type === "heading") {
				content = { text: "Nouveau titre" };
				style = baseStyle({
					fontFamily: "Fraunces",
					fontSize: 28,
					fontWeight: 600,
					lineHeight: 1.1
				});
				w = 420;
				h = 44;
			} else if (type === "text") {
				content = { text: "Écris ici. Double-clic, ou le panneau de droite." };
				style = baseStyle({
					fontSize: 14,
					lineHeight: 1.5
				});
				w = 360;
				h = 64;
			} else if (type === "experience") {
				const blank = {
					role: "Nouveau poste",
					company: "Entreprise — Ville",
					date: "2024 — Présent",
					desc: "Ce que tu as vraiment fait, en une ou deux phrases."
				};
				const index = profile.experiences.length;
				profile = {
					...profile,
					experiences: [...profile.experiences, blank]
				};
				bind = {
					kind: "experience",
					index
				};
				content = blank;
				w = 640;
				h = 108;
			} else if (type === "education") {
				const blank = {
					degree: "Diplôme",
					school: "École",
					date: "2020 — 2023"
				};
				const index = profile.educations.length;
				profile = {
					...profile,
					educations: [...profile.educations, blank]
				};
				bind = {
					kind: "education",
					index
				};
				content = blank;
				w = 640;
				h = 48;
			} else if (type === "skills") {
				content = { items: ["Une compétence", "Une autre"] };
				w = 480;
				h = 56;
			} else if (type === "meters") {
				content = { meters: [{
					label: "Langue",
					value: 80
				}] };
				w = 320;
				h = 48;
			} else if (type === "photo") {
				content = { src: "" };
				style = baseStyle({
					backgroundColor: "#ece8e1",
					borderRadius: 12
				});
				w = 120;
				h = 120;
			} else if (type === "rect") {
				style = baseStyle({
					backgroundColor: "#f3efe6",
					borderRadius: 12
				});
				w = 200;
				h = 120;
			} else if (type === "ellipse") {
				style = baseStyle({ backgroundColor: SIGNAL });
				w = 140;
				h = 140;
			} else if (type === "rule") {
				style = baseStyle({ backgroundColor: INK });
				w = 280;
				h = 2;
			} else if (type === "contact") {
				content = {
					icon: "mail",
					text: "contact@email.com"
				};
				w = 260;
				h = 24;
			}
			const element = {
				id: uid(),
				type,
				x: 48,
				y,
				w,
				h,
				rotation: 0,
				z: maxZ,
				locked: false,
				hidden: false,
				bind,
				content,
				style
			};
			if (!bind) set({ layoutCustomized: true });
			commit((doc) => {
				return mapPage(type === "experience" || type === "education" ? {
					...doc,
					profile
				} : doc, page.id, (p) => ({
					...p,
					elements: [...p.elements, element]
				}));
			}, false);
			set({
				selectedIds: [element.id],
				editingId: null
			});
		},
		applyTemplate: (id) => {
			const pageId = get().activePageId;
			set({
				activeTemplate: id,
				layoutCustomized: false,
				selectedIds: [],
				editingId: null
			});
			commit((doc) => {
				return syncBoundElementsFromProfile(mapPage(doc, (doc.pages.find((p) => p.id === pageId) ?? doc.pages[0]).id, (p) => ({
					...p,
					background: SHEET,
					elements: buildTemplate(id, doc.profile, `${id}-${uid()}`)
				})));
			}, false);
			saveMeta({
				activeTemplate: id,
				layoutCustomized: false
			});
			get().notify(`Modèle ${id} appliqué`);
		},
		requestApplyTemplate: (id) => {
			const { doc, activePageId, layoutCustomized, activeTemplate } = get();
			const unbound = getStudioUnboundElements(doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0]);
			if (layoutCustomized || unbound.length > 0) {
				get().setConfirmModal({
					title: id === activeTemplate ? "Réinitialiser la mise en page du modèle ?" : `Appliquer le modèle « ${id} » ?`,
					message: unbound.length > 0 ? `Cette action réappliquera la mise en page du modèle « ${id} » et retirera les ${unbound.length} élément(s) libre(s) ajouté(s) dans le Studio. Vos informations de candidat (profil, expériences, formations, compétences) seront intégralement conservées.` : `Vous avez déplacé ou ajusté des blocs dans le Studio. Appliquer le modèle « ${id} » réinitialisera la disposition des blocs tout en conservant l'intégralité de vos textes et informations de candidat.`,
					confirmLabel: id === activeTemplate ? "Réinitialiser la disposition" : `Appliquer le modèle`,
					variant: "warning",
					onConfirm: () => {
						get().setConfirmModal(null);
						get().applyTemplate(id);
					}
				});
				return;
			}
			get().applyTemplate(id);
		},
		resetLayout: () => {
			const id = get().activeTemplate;
			get().applyTemplate(id);
			get().notify("Mise en page réinitialisée (informations conservées)");
		},
		requestResetLayout: () => {
			const { activeTemplate } = get();
			get().setConfirmModal({
				title: "Réinitialiser la mise en page ?",
				message: `Les déplacements de blocs et les éléments libres ajoutés dans le Studio seront remis à zéro selon le modèle « ${activeTemplate} ». Vos textes et informations de candidat (profil, expériences, formations, compétences) seront intégralement conservés.`,
				confirmLabel: "Réinitialiser la mise en page",
				variant: "warning",
				onConfirm: () => {
					get().setConfirmModal(null);
					get().resetLayout();
				}
			});
		},
		applyJobPreset: (presetId) => {
			const preset = JOB_PRESETS.find((p) => p.id === presetId);
			if (!preset) return;
			const pageId = get().activePageId;
			const tpl = get().activeTemplate;
			set({
				layoutCustomized: false,
				selectedIds: [],
				editingId: null
			});
			commit((doc) => {
				const page = doc.pages.find((p) => p.id === pageId) ?? doc.pages[0];
				const nextProfile = structuredClone(preset.profile);
				return mapPage({
					...doc,
					profile: nextProfile
				}, page.id, (p) => ({
					...p,
					elements: buildTemplate(tpl, nextProfile, `preset-${uid()}`)
				}));
			}, false);
			saveMeta({ layoutCustomized: false });
			get().notify(`⚡ Métier "${preset.label}" chargé !`);
		},
		requestApplyJobPreset: (presetId) => {
			const preset = JOB_PRESETS.find((p) => p.id === presetId);
			if (!preset) return;
			get().setConfirmModal({
				title: `Remplacer par l'exemple « ${preset.label} » ?`,
				message: "Attention : cette action remplacera les informations actuelles du candidat (nom, expériences, formations, compétences) ainsi que la mise en page par cet exemple pré-rédigé.",
				confirmLabel: "Remplacer mes données par l'exemple",
				variant: "danger",
				onConfirm: () => {
					get().setConfirmModal(null);
					get().applyJobPreset(presetId);
				}
			});
		},
		applyPalette: (paletteId) => {
			const palette = COLOR_PALETTES.find((p) => p.id === paletteId);
			if (!palette) return;
			const pageId = get().activePageId;
			commit((doc) => {
				return mapPage(doc, pageId, (p) => ({
					...p,
					elements: applyPaletteToElements(p.elements, palette)
				}));
			}, false);
			get().notify(`Harmonie "${palette.name}" appliquée`);
		},
		applyGlobalFont: (font) => {
			const pageId = get().activePageId;
			commit((doc) => {
				return mapPage(doc, pageId, (p) => ({
					...p,
					elements: p.elements.map((el) => [
						"photo",
						"rect",
						"ellipse",
						"rule"
					].includes(el.type) ? el : mergeElement(el, { style: { fontFamily: font } }))
				}));
			}, false);
			get().notify(`Police globale "${font}" appliquée`);
		},
		addSectionPack: (packId) => {
			const pack = SECTION_PACKS.find((p) => p.id === packId);
			if (!pack) return;
			const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
			const bottom = page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48);
			const startY = Math.min(PAGE_H - 120, bottom + 20);
			const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
			const { elements: rawElements } = pack.createElements(startY, maxZ);
			set({ layoutCustomized: true });
			commit((doc) => {
				let profile = {
					...doc.profile,
					experiences: [...doc.profile.experiences],
					educations: [...doc.profile.educations]
				};
				const newElements = rawElements.map((el) => {
					if (el.type === "experience" && !el.bind) {
						const index = profile.experiences.length;
						profile.experiences.push({
							role: el.content.role ?? "Nouveau poste",
							company: el.content.company ?? "Entreprise",
							date: el.content.date ?? "Dates",
							desc: el.content.desc ?? ""
						});
						return {
							...el,
							bind: {
								kind: "experience",
								index
							}
						};
					}
					if (el.type === "education" && !el.bind) {
						const index = profile.educations.length;
						profile.educations.push({
							degree: el.content.degree ?? "Diplôme",
							school: el.content.school ?? "Établissement",
							date: el.content.date ?? "Années"
						});
						return {
							...el,
							bind: {
								kind: "education",
								index
							}
						};
					}
					return el;
				});
				return mapPage({
					...doc,
					profile
				}, page.id, (p) => ({
					...p,
					elements: [...p.elements, ...newElements]
				}));
			}, false);
			set({
				selectedIds: rawElements.map((e) => e.id),
				editingId: null
			});
			get().notify(`Pack "${pack.name}" ajouté`);
		},
		boostElementText: (id, customPhrase) => {
			const pageId = get().activePageId;
			const phrase = customPhrase || getRandomBoost();
			const el = (get().doc.pages.find((p) => p.id === pageId) ?? get().doc.pages[0]).elements.find((e) => e.id === id);
			if (!el) return;
			if (el.type === "experience") {
				const curDesc = el.content.desc ? el.content.desc.trim() : "";
				const updatedDesc = curDesc ? `${curDesc}\n• ${phrase}` : `• ${phrase}`;
				get().patchElement(pageId, id, { content: { desc: updatedDesc } });
				get().notify("✨ Réalisation chiffrée ajoutée au poste !");
			} else if (el.type === "text" || el.type === "heading") {
				get().patchElement(pageId, id, { content: { text: phrase } });
				get().notify("✨ Formulation professionnelle appliquée !");
			}
		},
		addPage: () => {
			const page = {
				id: uid(),
				name: `Page ${get().doc.pages.length + 1}`,
				background: SHEET,
				elements: []
			};
			commit((doc) => ({
				...doc,
				pages: [...doc.pages, page]
			}), false);
			set({
				activePageId: page.id,
				selectedIds: [],
				editingId: null
			});
			saveMeta({ activePageId: page.id });
		},
		duplicatePage: () => {
			const current = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
			const page = {
				id: uid(),
				name: `${current.name} copie`,
				background: current.background,
				elements: current.elements.map((el) => ({
					...structuredClone(el),
					id: uid(),
					bind: void 0
				}))
			};
			commit((doc) => ({
				...doc,
				pages: [...doc.pages, page]
			}), false);
			set({
				activePageId: page.id,
				selectedIds: []
			});
			saveMeta({ activePageId: page.id });
		},
		deletePage: (id) => {
			if (get().doc.pages.length < 2) {
				get().notify("Il reste une page");
				return;
			}
			commit((doc) => ({
				...doc,
				pages: doc.pages.filter((p) => p.id !== id)
			}), false);
			if (get().activePageId === id) {
				const firstId = get().doc.pages[0].id;
				set({
					activePageId: firstId,
					selectedIds: []
				});
				saveMeta({ activePageId: firstId });
			}
		},
		renamePage: (id, name) => {
			const doc = mapPage(get().doc, id, (p) => ({
				...p,
				name
			}));
			set({ doc });
			persist(doc);
		},
		setPageBackground: (color, live = false) => {
			const id = get().activePageId;
			commit((doc) => mapPage(doc, id, (p) => ({
				...p,
				background: color
			})), live);
		},
		newDocument: () => {
			const doc = freshDoc();
			set({
				activePageId: doc.pages[0].id,
				activeTemplate: "modern",
				layoutCustomized: false,
				selectedIds: [],
				editingId: null
			});
			commit(() => doc, false);
			saveMeta({
				activePageId: doc.pages[0].id,
				activeTemplate: "modern",
				layoutCustomized: false
			});
			get().notify("Nouveau document");
		},
		requestNewDocument: () => {
			get().setConfirmModal({
				title: "Réinitialiser tout le document ?",
				message: "Cette action est destructive : toutes vos informations (profil, expériences, formations, compétences) et votre mise en page personnalisée seront remplacées par un nouveau document par défaut.",
				confirmLabel: "Tout réinitialiser",
				variant: "danger",
				onConfirm: () => {
					get().setConfirmModal(null);
					get().newDocument();
				}
			});
		},
		loadDocument: (doc) => {
			if (!doc.pages?.length || !doc.profile) {
				get().notify("Fichier illisible");
				return;
			}
			const synced = syncBoundElementsFromProfile(doc);
			commit(() => synced, false);
			set({
				activePageId: synced.pages[0].id,
				selectedIds: [],
				editingId: null
			});
			saveMeta({ activePageId: synced.pages[0].id });
			get().notify("Projet ouvert");
		},
		importExtractedProfile: (profile, template = "modern", asNewPage = false) => {
			const activeId = get().activePageId;
			set({
				activeTemplate: template,
				layoutCustomized: false
			});
			commit((doc) => {
				const nextProfile = {
					...doc.profile,
					...profile
				};
				if (asNewPage) {
					const newPage = {
						id: `page-${uid()}`,
						name: `Page ${doc.pages.length + 1} (${profile.name.split(" ")[0] || "CV"})`,
						background: SHEET,
						elements: buildTemplate(template, nextProfile, `${template}-${uid()}`)
					};
					return syncBoundElementsFromProfile({
						...doc,
						profile: nextProfile,
						pages: [...doc.pages, newPage]
					});
				} else return syncBoundElementsFromProfile(mapPage({
					...doc,
					profile: nextProfile
				}, activeId, (p) => ({
					...p,
					elements: buildTemplate(template, nextProfile, `${template}-${uid()}`)
				})));
			}, false);
			if (asNewPage) {
				const pages = get().doc.pages;
				const lastPage = pages[pages.length - 1];
				if (lastPage) set({ activePageId: lastPage.id });
			}
			set({
				selectedIds: [],
				editingId: null
			});
			get().notify(`CV extrait : ${profile.name} (${profile.experiences.length} exp, ${profile.educations.length} form)`);
		},
		importText: (raw, template) => {
			const pageId = get().activePageId;
			set({
				activeTemplate: template,
				layoutCustomized: false
			});
			commit((doc) => {
				let profile;
				try {
					profile = extractFromText(raw, doc.profile).profile;
				} catch {
					profile = parseProfile(raw, doc.profile);
				}
				return syncBoundElementsFromProfile(mapPage({
					...doc,
					profile
				}, pageId, (p) => ({
					...p,
					elements: buildTemplate(template, profile, `${template}-${uid()}`)
				})));
			}, false);
			set({
				selectedIds: [],
				editingId: null
			});
			get().notify("CV textuel analysé et disposé");
		}
	};
});
function activePage(doc, id) {
	return doc.pages.find((p) => p.id === id) ?? doc.pages[0];
}
var _jsxFileName$12 = "/app/applet/src/components/studio/Canvas.tsx";
function sheetOf(pageId) {
	return document.querySelector(`[data-sheet="${pageId}"]`);
}
function isBackground(target, current) {
	if (target === current) return true;
	return target instanceof HTMLElement && target.dataset.canvas === "bg";
}
function Canvas({ narrow = false }) {
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const selectedIds = useStudio((s) => s.selectedIds);
	const editingId = useStudio((s) => s.editingId);
	const zoom = useStudio((s) => s.zoom);
	const showGrid = useStudio((s) => s.showGrid);
	const snap = useStudio((s) => s.snap);
	const guidesOn = useStudio((s) => s.guides);
	const margins = useStudio((s) => s.margins);
	const setZoom = useStudio((s) => s.setZoom);
	const boostElementText = useStudio((s) => s.boostElementText);
	const scrollerRef = (0, import_react.useRef)(null);
	const gesture = (0, import_react.useRef)(null);
	const space = (0, import_react.useRef)(false);
	const [spaceOn, setSpaceOn] = (0, import_react.useState)(false);
	const [guideLines, setGuideLines] = (0, import_react.useState)({
		x: [],
		y: []
	});
	const [marquee, setMarquee] = (0, import_react.useState)(null);
	const [boostMenuOpen, setBoostMenuOpen] = (0, import_react.useState)(false);
	const fitComfortableWidth = (0, import_react.useCallback)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const availW = el.clientWidth - (narrow ? 32 : 72);
		const availH = el.clientHeight - 56;
		if (availW <= 0 || availH <= 0) return;
		const widthZoom = availW / 794;
		const heightZoom = availH / PAGE_H;
		const target = narrow ? Math.min(widthZoom, heightZoom) : Math.min(widthZoom, Math.max(heightZoom * 1.24, .84));
		const clamped = Math.round(Math.min(1.05, Math.max(.42, target)) * 100) / 100;
		setZoom(clamped);
	}, [narrow, setZoom]);
	const fitWholePage = (0, import_react.useCallback)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const z = Math.min((el.clientWidth - 64) / 794, (el.clientHeight - 48) / PAGE_H);
		if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
	}, [setZoom]);
	(0, import_react.useLayoutEffect)(() => {
		fitComfortableWidth();
	}, [fitComfortableWidth]);
	(0, import_react.useEffect)(() => {
		const onFitWidth = () => fitComfortableWidth();
		const onFitPage = () => fitWholePage();
		window.addEventListener("resize", onFitWidth);
		document.addEventListener("studio-fit-width", onFitWidth);
		document.addEventListener("studio-fit-page", onFitPage);
		return () => {
			window.removeEventListener("resize", onFitWidth);
			document.removeEventListener("studio-fit-width", onFitWidth);
			document.removeEventListener("studio-fit-page", onFitPage);
		};
	}, [fitComfortableWidth, fitWholePage]);
	(0, import_react.useEffect)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const onWheel = (event) => {
			if (!event.ctrlKey && !event.metaKey) return;
			event.preventDefault();
			const factor = Math.exp(-event.deltaY * .008);
			setZoom(useStudio.getState().zoom * factor);
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [setZoom]);
	(0, import_react.useEffect)(() => {
		const down = (event) => {
			const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || [
				"INPUT",
				"TEXTAREA",
				"SELECT"
			].includes(event.target.tagName));
			if (event.code === "Space" && !typing) {
				event.preventDefault();
				space.current = true;
				setSpaceOn(true);
			}
		};
		const up = (event) => {
			if (event.code === "Space") {
				space.current = false;
				setSpaceOn(false);
			}
		};
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const move = (event) => {
			const g = gesture.current;
			if (!g) return;
			const store = useStudio.getState();
			if (g.kind === "pan") {
				const sc = scrollerRef.current;
				if (!sc) return;
				sc.scrollLeft = g.sl - (event.clientX - g.sx);
				sc.scrollTop = g.st - (event.clientY - g.sy);
				return;
			}
			const sheet = sheetOf(g.pageId);
			if (!sheet) return;
			const now = clientToSheet(event.clientX, event.clientY, sheet);
			if (g.kind === "move") {
				const dx = now.x - g.start.x;
				const dy = now.y - g.start.y;
				if (Math.hypot(dx, dy) < 1.5 && !store.historyHeld) return;
				const page = activePage(store.doc, g.pageId);
				const primary = g.orig.get(g.primary);
				if (!primary) return;
				const snapped = snapMove(primary, dx, dy, page.elements.filter((el) => !g.ids.includes(el.id) && !el.hidden).map((el) => ({
					x: el.x,
					y: el.y,
					w: el.w,
					h: el.h
				})), {
					grid: store.snap,
					guides: store.guides
				});
				const patches = {};
				for (const [id, box] of g.orig) patches[id] = {
					x: Math.round(box.x + snapped.dx),
					y: Math.round(box.y + snapped.dy)
				};
				store.patchElements(g.pageId, patches);
				setGuideLines({
					x: snapped.vx,
					y: snapped.hy
				});
			} else if (g.kind === "resize") {
				const pageDx = now.x - g.start.x;
				const pageDy = now.y - g.start.y;
				const next = resizeBox(g.orig, g.handle, pageDx, pageDy, g.rotation, event.shiftKey);
				store.patchElements(g.pageId, { [g.id]: next });
			} else if (g.kind === "rotate") {
				let deg = Math.atan2(now.y - g.center.y, now.x - g.center.x) * 180 / Math.PI + 90;
				if (event.shiftKey) deg = Math.round(deg / 15) * 15;
				store.patchElements(g.pageId, { [g.id]: { rotation: normRotation(deg) } });
			} else if (g.kind === "marquee") {
				const box = {
					x: Math.min(g.start.x, now.x),
					y: Math.min(g.start.y, now.y),
					w: Math.abs(now.x - g.start.x),
					h: Math.abs(now.y - g.start.y)
				};
				setMarquee(box);
				const hit = activePage(store.doc, g.pageId).elements.filter((el) => !el.hidden && intersects(box, el)).map((el) => el.id);
				store.select(g.additive ? [.../* @__PURE__ */ new Set([...g.base, ...hit])] : hit);
			}
		};
		const up = () => {
			if (!gesture.current) return;
			gesture.current = null;
			setGuideLines({
				x: [],
				y: []
			});
			setMarquee(null);
			useStudio.getState().release();
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		setBoostMenuOpen(false);
	}, [selectedIds]);
	const onScrollerPointerDown = (event) => {
		if (!space.current && event.button !== 1) return;
		const sc = scrollerRef.current;
		if (!sc) return;
		event.preventDefault();
		gesture.current = {
			kind: "pan",
			sx: event.clientX,
			sy: event.clientY,
			sl: sc.scrollLeft,
			st: sc.scrollTop
		};
	};
	const onSheetPointerDown = (pageId) => (event) => {
		if (event.button !== 0 || space.current) return;
		if (!isBackground(event.target, event.currentTarget)) return;
		const store = useStudio.getState();
		store.setActive(pageId);
		store.setEditing(null);
		const sheet = event.currentTarget;
		const start = clientToSheet(event.clientX, event.clientY, sheet);
		gesture.current = {
			kind: "marquee",
			pageId,
			start,
			additive: event.shiftKey,
			base: event.shiftKey ? store.selectedIds : []
		};
		if (!event.shiftKey) store.select([]);
	};
	const onElementPointerDown = (pageId) => (event, el) => {
		if (event.button !== 0 || space.current) return;
		event.stopPropagation();
		const store = useStudio.getState();
		store.setActive(pageId);
		let ids = store.selectedIds;
		if (event.shiftKey) ids = ids.includes(el.id) ? ids.filter((id) => id !== el.id) : [...ids, el.id];
		else if (!ids.includes(el.id)) ids = [el.id];
		store.select(ids);
		if (el.locked || store.editingId === el.id) return;
		const sheet = sheetOf(pageId);
		if (!sheet) return;
		const page = activePage(store.doc, pageId);
		const orig = /* @__PURE__ */ new Map();
		for (const id of ids) {
			const item = page.elements.find((entry) => entry.id === id);
			if (item) orig.set(id, {
				x: item.x,
				y: item.y,
				w: item.w,
				h: item.h
			});
		}
		gesture.current = {
			kind: "move",
			pageId,
			ids,
			primary: el.id,
			start: clientToSheet(event.clientX, event.clientY, sheet),
			orig
		};
	};
	const onResize = (pageId) => (id, handle, event) => {
		if (space.current) return;
		const store = useStudio.getState();
		const sheet = sheetOf(pageId);
		const el = activePage(store.doc, pageId).elements.find((item) => item.id === id);
		if (!sheet || !el) return;
		gesture.current = {
			kind: "resize",
			pageId,
			id,
			handle,
			start: clientToSheet(event.clientX, event.clientY, sheet),
			orig: {
				x: el.x,
				y: el.y,
				w: el.w,
				h: el.h
			},
			rotation: el.rotation
		};
	};
	const onRotate = (pageId) => (id, _event) => {
		const el = activePage(useStudio.getState().doc, pageId).elements.find((item) => item.id === id);
		if (!el) return;
		gesture.current = {
			kind: "rotate",
			pageId,
			id,
			center: {
				x: el.x + el.w / 2,
				y: el.y + el.h / 2
			}
		};
	};
	const onChange = (pageId) => (id, content) => {
		const store = useStudio.getState();
		const el = activePage(store.doc, pageId).elements.find((item) => item.id === id);
		if (!el) return;
		if (Object.entries(content).every(([key, value]) => el.content[key] === value)) return;
		store.patchElement(pageId, id, { content });
	};
	const onUpload = (pageId) => async (id, file) => {
		try {
			const src = await readImage(file);
			useStudio.getState().patchElement(pageId, id, { content: { src } });
		} catch {
			useStudio.getState().notify("Image illisible");
		}
	};
	const primarySelected = (0, import_react.useMemo)(() => {
		const page = activePage(doc, activePageId);
		if (!selectedIds.length) return null;
		return page.elements.find((el) => el.id === selectedIds[0]) || null;
	}, [
		doc,
		activePageId,
		selectedIds
	]);
	const pageIndex = (0, import_react.useMemo)(() => {
		const idx = doc.pages.findIndex((p) => p.id === activePageId);
		return idx >= 0 ? idx : 0;
	}, [doc.pages, activePageId]);
	const floatingPosition = (0, import_react.useMemo)(() => {
		if (!primarySelected) return {
			top: 12,
			left: 794 * zoom / 2
		};
		const pageOffset = pageIndex * (PAGE_H + 40);
		const elementTopZoomed = (pageOffset + primarySelected.y) * zoom;
		const elementBottomZoomed = (pageOffset + primarySelected.y + primarySelected.h) * zoom;
		const elementCenterX = (primarySelected.x + primarySelected.w / 2) * zoom;
		const top = elementTopZoomed < 56 || primarySelected.y < 64 ? elementBottomZoomed + 12 : Math.max(8, elementTopZoomed - 46);
		const minLeft = 170;
		const maxLeft = Math.max(minLeft, 794 * zoom - 170);
		return {
			top,
			left: Math.min(maxLeft, Math.max(minLeft, elementCenterX))
		};
	}, [
		primarySelected,
		pageIndex,
		zoom
	]);
	const innerHeight = doc.pages.length * PAGE_H + Math.max(0, doc.pages.length - 1) * 40;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative flex min-h-0 min-w-0 flex-1 flex-col",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref: scrollerRef,
			"data-canvas": "bg",
			className: "no-print relative min-h-0 flex-1 overflow-auto bg-[#EEF2F6]",
			style: { cursor: spaceOn ? "grab" : "default" },
			onPointerDown: (e) => {
				onScrollerPointerDown(e);
				if (e.target === e.currentTarget && !space.current && e.button === 0) {
					useStudio.getState().select([]);
					useStudio.getState().setEditing(null);
				}
			},
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "box-border min-h-full px-4 py-6 sm:px-8 sm:py-8 flex justify-center items-start",
				onPointerDown: (e) => {
					if (e.target === e.currentTarget && !space.current && e.button === 0) {
						useStudio.getState().select([]);
						useStudio.getState().setEditing(null);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative shrink-0",
					style: {
						width: 794 * zoom,
						height: innerHeight * zoom
					},
					children: [primarySelected && /* @__PURE__ */ (void 0)("div", {
						className: "no-print absolute z-40 -translate-x-1/2 flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/95 px-2 py-1 text-xs text-white shadow-xl backdrop-blur-md whitespace-nowrap",
						style: {
							top: floatingPosition.top,
							left: floatingPosition.left
						},
						onPointerDown: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "px-1.5 text-[11px] font-medium text-slate-300",
								children: TYPE_LABEL[primarySelected.type]
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 402,
								columnNumber: 17
							}, this),
							!primarySelected.locked && [
								"text",
								"heading",
								"experience"
							].includes(primarySelected.type) && /* @__PURE__ */ (void 0)("div", {
								className: "relative flex items-center border-l border-slate-700 pl-1.5",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => boostElementText(primarySelected.id),
										className: "flex h-7 items-center gap-1 rounded-l-md bg-blue-600 px-2 text-[11px] font-semibold text-white hover:bg-blue-500 transition",
										title: "Améliorer la formulation de ce bloc",
										children: [/* @__PURE__ */ (void 0)(Sparkles, {
											size: 11,
											className: "shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 414,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Reformuler" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 415,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 408,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setBoostMenuOpen(!boostMenuOpen),
										className: "flex h-7 items-center rounded-r-md border-l border-blue-400/30 bg-blue-600 px-1 text-white hover:bg-blue-500 transition",
										title: "Choisir un style de formulation",
										children: /* @__PURE__ */ (void 0)(ChevronDown, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 423,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 417,
										columnNumber: 21
									}, this),
									boostMenuOpen && /* @__PURE__ */ (void 0)("div", {
										className: "absolute top-full left-0 mt-1.5 w-60 rounded-lg border border-slate-700 bg-slate-900 p-1.5 text-xs text-white shadow-2xl z-50 space-y-1",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "px-2 py-1 text-[10px] font-semibold text-slate-400",
											children: "Suggestions de formulation"
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 428,
											columnNumber: 25
										}, this), BOOST_PRESETS.map((preset) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												const random = preset.options[Math.floor(Math.random() * preset.options.length)];
												boostElementText(primarySelected.id, random);
												setBoostMenuOpen(false);
											},
											className: "w-full rounded-md px-2 py-1.5 text-left hover:bg-slate-800 transition",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-medium text-white",
												children: preset.category
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 442,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-slate-400 truncate",
												children: preset.options[0]
											}, void 0, false, {
												fileName: _jsxFileName$12,
												lineNumber: 443,
												columnNumber: 29
											}, this)]
										}, preset.tone, true, {
											fileName: _jsxFileName$12,
											lineNumber: 432,
											columnNumber: 27
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName$12,
										lineNumber: 427,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 407,
								columnNumber: 19
							}, this),
							!primarySelected.locked && [
								"text",
								"heading",
								"experience",
								"education",
								"contact"
							].includes(primarySelected.type) && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-0.5 border-l border-slate-700 pl-1.5",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Diminuer la taille",
										onClick: () => useStudio.getState().patchSelectedStyle({ fontSize: Math.max(8, (primarySelected.style.fontSize || 12) - 1) }),
										className: "flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white",
										children: /* @__PURE__ */ (void 0)(Minus, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 463,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 453,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "min-w-6 text-center font-mono text-[11px] tabular-nums text-white",
										children: primarySelected.style.fontSize || 12
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 465,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Augmenter la taille",
										onClick: () => useStudio.getState().patchSelectedStyle({ fontSize: Math.min(120, (primarySelected.style.fontSize || 12) + 1) }),
										className: "flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white",
										children: /* @__PURE__ */ (void 0)(Plus, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 478,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 468,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Gras",
										onClick: () => useStudio.getState().patchSelectedStyle({ fontWeight: primarySelected.style.fontWeight >= 650 ? 400 : 700 }),
										className: cn("flex size-6 items-center justify-center rounded transition", primarySelected.style.fontWeight >= 650 ? "bg-white text-slate-900 font-bold" : "text-slate-300 hover:bg-slate-800 hover:text-white"),
										children: /* @__PURE__ */ (void 0)(Bold, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 495,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 480,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 452,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-0.5 border-l border-slate-700 pl-1.5",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().order("front"),
										className: "flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white",
										title: "Mettre au premier plan",
										children: /* @__PURE__ */ (void 0)(BringToFront, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 507,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 501,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().order("back"),
										className: "flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white",
										title: "Mettre à l'arrière-plan",
										children: /* @__PURE__ */ (void 0)(SendToBack, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 515,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 509,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().duplicateSelected(),
										className: "flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white",
										title: "Dupliquer (⌘D)",
										children: /* @__PURE__ */ (void 0)(Copy, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 523,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 517,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().lockSelected(!primarySelected.locked),
										className: "flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white",
										title: primarySelected.locked ? "Déverrouiller" : "Verrouiller",
										children: primarySelected.locked ? /* @__PURE__ */ (void 0)(Lock, {
											size: 12,
											className: "text-amber-400"
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 531,
											columnNumber: 47
										}, this) : /* @__PURE__ */ (void 0)(LockOpen, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 531,
											columnNumber: 95
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 525,
										columnNumber: 19
									}, this),
									!primarySelected.locked && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().deleteSelected(),
										className: "flex size-6 items-center justify-center rounded text-red-400 hover:bg-red-950/60 hover:text-red-300",
										title: "Supprimer (Suppr)",
										children: /* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 540,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 534,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 500,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 397,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						style: {
							width: 794,
							transform: `scale(${zoom})`,
							transformOrigin: "top left"
						},
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-10",
							children: doc.pages.map((page) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xs bg-white shadow-xl",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
									page,
									interactive: true,
									selectedIds: page.id === activePageId ? selectedIds : [],
									editingId: page.id === activePageId ? editingId : null,
									showGrid,
									showMargins: margins,
									guides: page.id === activePageId ? guideLines : {
										x: [],
										y: []
									},
									marquee: page.id === activePageId ? marquee : null,
									onSheetPointerDown: onSheetPointerDown(page.id),
									onElementPointerDown: onElementPointerDown(page.id),
									onDoubleClick: (id) => {
										const store = useStudio.getState();
										store.setActive(page.id);
										const el = page.elements.find((item) => item.id === id);
										if (!el || el.locked) return;
										if (el.type === "photo" || el.type === "rect" || el.type === "ellipse" || el.type === "rule") return;
										store.setEditing(id);
									},
									onChange: onChange(page.id),
									onResize: onResize(page.id),
									onRotate: onRotate(page.id),
									onUpload: onUpload(page.id)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 552,
									columnNumber: 21
								}, this)
							}, page.id, false, {
								fileName: _jsxFileName$12,
								lineNumber: 551,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 549,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 548,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$12,
					lineNumber: 394,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$12,
				lineNumber: 384,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "sr-only",
				children: [
					"Zoom ",
					Math.round(zoom * 100),
					" pour cent. Magnétisme ",
					snap ? "actif" : "inactif",
					". Repères ",
					guidesOn ? "actifs" : "inactifs",
					"."
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 582,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$12,
			lineNumber: 371,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 370,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/studio/Inspector.tsx";
var inputClass = "h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium text-slate-900 outline-none transition focus:border-signal focus:bg-white focus:ring-2 focus:ring-signal/15";
var textareaClass = "w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-medium text-slate-900 leading-relaxed outline-none transition focus:border-signal focus:bg-white focus:ring-2 focus:ring-signal/15 resize-none";
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-medium text-slate-600",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 35,
				columnNumber: 9
			}, this), hint && /* @__PURE__ */ (void 0)("span", {
				className: "text-[11px] text-slate-400",
				children: hint
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 36,
				columnNumber: 18
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 34,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children }, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 38,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 33,
		columnNumber: 5
	}, this);
}
function release$1() {
	useStudio.getState().release();
}
function Inspector() {
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const selectedIds = useStudio((s) => s.selectedIds);
	const page = activePage(doc, activePageId);
	const selected = page.elements.filter((el) => selectedIds.includes(el.id));
	const one = selected.length === 1 ? selected[0] : null;
	const profile = doc.profile;
	const live = (id, patch) => {
		useStudio.getState().patchElement(page.id, id, patch, true);
	};
	const identity = (field, value) => {
		useStudio.getState().setIdentity(field, value);
	};
	const currentGlobalFont = page.elements.find((el) => el.style?.fontFamily)?.style.fontFamily || "Source Sans 3";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: "flex h-full w-72 xl:w-80 shrink-0 flex-col border-l border-slate-200 bg-white text-slate-900 select-none z-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xs font-semibold text-slate-900 truncate",
					children: one ? `Propriétés · ${TYPE_LABEL[one.type]}` : selected.length > 1 ? `${selected.length} éléments sélectionnés` : "Document & Identité"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 72,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 71,
				columnNumber: 9
			}, this), selected.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => useStudio.getState().select([]),
				className: "flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition",
				title: "Désélectionner (Échap)",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 13 }, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 88,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 82,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-[11px] text-slate-400",
				children: "Global"
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 91,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 70,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-0 flex-1 overflow-y-auto p-4 space-y-5",
			children: [
				!selected.length && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (void 0)("h3", {
								className: "text-xs font-semibold text-slate-900",
								children: "Style global du CV"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 103,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 102,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Police typographique",
							children: /* @__PURE__ */ (void 0)("select", {
								className: inputClass,
								value: currentGlobalFont,
								onChange: (e) => useStudio.getState().applyGlobalFont(e.target.value),
								children: FONTS.map((font) => /* @__PURE__ */ (void 0)("option", {
									value: font,
									style: { fontFamily: font },
									children: font
								}, font, false, {
									fileName: _jsxFileName$11,
									lineNumber: 113,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 107,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 106,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-medium text-slate-600",
								children: "Palette de couleurs"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 121,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-6 gap-1.5",
								children: COLOR_PALETTES.map((pal) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => useStudio.getState().applyPalette(pal.id),
									title: pal.name,
									className: "group flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50/60 hover:border-slate-400 transition",
									children: /* @__PURE__ */ (void 0)("span", {
										className: "size-4 rounded-full border border-white shadow-2xs group-hover:scale-110 transition",
										style: { backgroundColor: pal.primary }
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 131,
										columnNumber: 23
									}, this)
								}, pal.id, false, {
									fileName: _jsxFileName$11,
									lineNumber: 124,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 122,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 120,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 101,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("section", {
					className: "space-y-3 border-t border-slate-100 pt-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "text-xs font-semibold text-slate-900",
								children: "Informations du candidat"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 144,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-[11px] text-slate-400",
								children: "Synchronisé"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 145,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 143,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Nom complet",
							children: /* @__PURE__ */ (void 0)("input", {
								className: inputClass,
								value: profile.name,
								onChange: (e) => identity("name", e.target.value),
								onBlur: release$1,
								placeholder: "Ex. Alexandra Dubois"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 149,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 148,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Intitulé du poste",
							children: /* @__PURE__ */ (void 0)("input", {
								className: inputClass,
								value: profile.role,
								onChange: (e) => identity("role", e.target.value),
								onBlur: release$1,
								placeholder: "Ex. Product Designer Senior"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 159,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 158,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)(Field, {
								label: "E-mail",
								children: /* @__PURE__ */ (void 0)("input", {
									className: inputClass,
									value: profile.email,
									onChange: (e) => identity("email", e.target.value),
									onBlur: release$1,
									placeholder: "nom@email.com"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 170,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 169,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Field, {
								label: "Téléphone",
								children: /* @__PURE__ */ (void 0)("input", {
									className: inputClass,
									value: profile.phone,
									onChange: (e) => identity("phone", e.target.value),
									onBlur: release$1,
									placeholder: "+33 6 00 00 00 00"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 179,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 178,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 168,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)(Field, {
								label: "Ville / Mobilité",
								children: /* @__PURE__ */ (void 0)("input", {
									className: inputClass,
									value: profile.location,
									onChange: (e) => identity("location", e.target.value),
									onBlur: release$1,
									placeholder: "Paris, France"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 191,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 190,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Field, {
								label: "Portfolio / LinkedIn",
								children: /* @__PURE__ */ (void 0)("input", {
									className: inputClass,
									value: profile.link,
									onChange: (e) => identity("link", e.target.value),
									onBlur: release$1,
									placeholder: "linkedin.com/in/..."
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 200,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 199,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 189,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Profil / Accroche",
							children: /* @__PURE__ */ (void 0)("textarea", {
								className: cn(textareaClass, "h-24"),
								value: profile.summary,
								onChange: (e) => identity("summary", e.target.value),
								onBlur: release$1,
								placeholder: "Synthèse de votre parcours et de votre valeur ajoutée…"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 211,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 210,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 142,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 99,
					columnNumber: 11
				}, this),
				selected.length > 1 && /* @__PURE__ */ (void 0)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-xs font-semibold text-slate-900",
							children: "Alignement de la sélection"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 226,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-3 gap-1.5",
							children: [
								["left", "Gauche"],
								["center", "Centre"],
								["right", "Droite"],
								["top", "Haut"],
								["middle", "Milieu"],
								["bottom", "Bas"]
							].map(([mode, label]) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-8 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition",
								onClick: () => useStudio.getState().align(mode),
								children: label
							}, mode, false, {
								fileName: _jsxFileName$11,
								lineNumber: 238,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 227,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-1.5",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-8 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition",
								onClick: () => useStudio.getState().distribute("x"),
								children: "Espacer horiz."
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 249,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-8 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition",
								onClick: () => useStudio.getState().distribute("y"),
								children: "Espacer vert."
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 256,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 248,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 225,
					columnNumber: 11
				}, this),
				selected.length > 0 && /* @__PURE__ */ (void 0)("section", {
					className: "flex items-center justify-between gap-1 rounded-lg border border-slate-200 bg-slate-50/70 p-1",
					children: [
						/* @__PURE__ */ (void 0)(IconAction, {
							label: "Premier plan",
							onClick: () => useStudio.getState().order("front"),
							children: /* @__PURE__ */ (void 0)(BringToFront, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 271,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 270,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconAction, {
							label: "Arrière-plan",
							onClick: () => useStudio.getState().order("back"),
							children: /* @__PURE__ */ (void 0)(SendToBack, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 274,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 273,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconAction, {
							label: "Dupliquer (⌘D)",
							onClick: () => useStudio.getState().duplicateSelected(),
							children: /* @__PURE__ */ (void 0)(Copy, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 277,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 276,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconAction, {
							label: selected.some((el) => !el.locked) ? "Verrouiller" : "Déverrouiller",
							onClick: () => useStudio.getState().lockSelected(selected.some((el) => !el.locked)),
							children: selected.some((el) => !el.locked) ? /* @__PURE__ */ (void 0)(Lock, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 283,
								columnNumber: 52
							}, this) : /* @__PURE__ */ (void 0)(LockOpen, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 283,
								columnNumber: 73
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 279,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconAction, {
							label: "Supprimer",
							danger: true,
							onClick: () => useStudio.getState().deleteSelected(),
							children: /* @__PURE__ */ (void 0)(Trash2, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 286,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 285,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 269,
					columnNumber: 11
				}, this),
				one && /* @__PURE__ */ (void 0)(ContentFields, {
					el: one,
					pageId: page.id
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 292,
					columnNumber: 17
				}, this),
				selected.length > 0 && /* @__PURE__ */ (void 0)(StyleFields, {
					style: one?.style ?? selected[0].style,
					mixed: selected.length > 1,
					textual: !one || ![
						"photo",
						"rect",
						"ellipse",
						"rule"
					].includes(one.type)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 296,
					columnNumber: 11
				}, this),
				one && /* @__PURE__ */ (void 0)("section", {
					className: "space-y-2.5 border-t border-slate-100 pt-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-xs font-semibold text-slate-900",
							children: "Position & Dimensions"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 307,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-mono text-[11px] text-slate-400",
							children: "px"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 308,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 306,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-4 gap-2",
						children: [
							/* @__PURE__ */ (void 0)(Field, {
								label: "X",
								children: /* @__PURE__ */ (void 0)("input", {
									className: cn(inputClass, "px-2 text-center font-mono tabular-nums"),
									type: "number",
									value: Math.round(one.x),
									onChange: (e) => live(one.id, { x: Number(e.target.value) }),
									onBlur: release$1
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 312,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 311,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Y",
								children: /* @__PURE__ */ (void 0)("input", {
									className: cn(inputClass, "px-2 text-center font-mono tabular-nums"),
									type: "number",
									value: Math.round(one.y),
									onChange: (e) => live(one.id, { y: Number(e.target.value) }),
									onBlur: release$1
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 321,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 320,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "L",
								children: /* @__PURE__ */ (void 0)("input", {
									className: cn(inputClass, "px-2 text-center font-mono tabular-nums"),
									type: "number",
									value: Math.round(one.w),
									onChange: (e) => live(one.id, { w: Math.max(20, Number(e.target.value) || 20) }),
									onBlur: release$1
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 330,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 329,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "H",
								children: /* @__PURE__ */ (void 0)("input", {
									className: cn(inputClass, "px-2 text-center font-mono tabular-nums"),
									type: "number",
									value: Math.round(one.h),
									onChange: (e) => live(one.id, { h: Math.max(12, Number(e.target.value) || 12) }),
									onBlur: release$1
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 339,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 338,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 310,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 305,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 96,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 68,
		columnNumber: 5
	}, this);
}
function IconAction({ label, onClick, children, danger }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: cn("flex h-8 flex-1 items-center justify-center rounded-md transition", danger ? "text-red-600 hover:bg-red-50" : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs"),
		children
	}, void 0, false, {
		fileName: _jsxFileName$11,
		lineNumber: 367,
		columnNumber: 5
	}, this);
}
function ContentFields({ el, pageId }) {
	const patch = (content, live = true) => {
		useStudio.getState().setEditing(null);
		useStudio.getState().patchElement(pageId, el.id, { content }, live);
	};
	const c = el.content;
	if (el.type === "heading" || el.type === "text" || el.type === "contact") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-xs font-semibold text-slate-900",
					children: "Contenu du bloc"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 395,
					columnNumber: 11
				}, this), el.type !== "contact" && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					onClick: () => useStudio.getState().boostElementText(el.id),
					className: "inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-signal hover:bg-blue-100 transition",
					title: "Améliorer la formulation",
					children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 403,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Reformuler" }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 404,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 397,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 394,
				columnNumber: 9
			}, this),
			el.type === "contact" && /* @__PURE__ */ (void 0)(Field, {
				label: "Type de coordonnée",
				children: /* @__PURE__ */ (void 0)("select", {
					className: inputClass,
					value: c.icon ?? "mail",
					onChange: (e) => patch({ icon: e.target.value }, false),
					children: [
						/* @__PURE__ */ (void 0)("option", {
							value: "mail",
							children: "E-mail"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 415,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("option", {
							value: "phone",
							children: "Téléphone"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 416,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("option", {
							value: "pin",
							children: "Localisation"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 417,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("option", {
							value: "link",
							children: "Lien web"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 418,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 410,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 409,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Texte",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
					className: cn(textareaClass, el.type === "contact" ? "h-16" : "h-24"),
					value: c.text ?? "",
					onChange: (e) => patch({ text: e.target.value }),
					onBlur: release$1
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 423,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 422,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 393,
		columnNumber: 7
	}, this);
	if (el.type === "experience") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-xs font-semibold text-slate-900",
					children: "Détails de l’expérience"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 438,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => useStudio.getState().boostElementText(el.id),
					className: "inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-signal hover:bg-blue-100 transition",
					title: "Ajouter une réalisation chiffrée",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 11 }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 445,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter un impact" }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 446,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 439,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 437,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Intitulé du poste",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: inputClass,
					value: c.role ?? "",
					onChange: (e) => patch({ role: e.target.value }),
					onBlur: release$1
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 450,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 449,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Entreprise & lieu",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: inputClass,
						value: c.company ?? "",
						onChange: (e) => patch({ company: e.target.value }),
						onBlur: release$1
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 454,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 453,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Période",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: inputClass,
						value: c.date ?? "",
						onChange: (e) => patch({ date: e.target.value }),
						onBlur: release$1
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 457,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 456,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 452,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Missions & résultats",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
					className: cn(textareaClass, "h-28"),
					value: c.desc ?? "",
					onChange: (e) => patch({ desc: e.target.value }),
					onBlur: release$1
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 461,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 460,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 436,
		columnNumber: 7
	}, this);
	if (el.type === "education") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "text-xs font-semibold text-slate-900",
				children: "Détails de la formation"
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 470,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Diplôme ou titre",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: inputClass,
					value: c.degree ?? "",
					onChange: (e) => patch({ degree: e.target.value }),
					onBlur: release$1
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 472,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 471,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Établissement",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: inputClass,
						value: c.school ?? "",
						onChange: (e) => patch({ school: e.target.value }),
						onBlur: release$1
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 476,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 475,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Années",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: inputClass,
						value: c.date ?? "",
						onChange: (e) => patch({ date: e.target.value }),
						onBlur: release$1
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 479,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 478,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 474,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 469,
		columnNumber: 7
	}, this);
	if (el.type === "skills") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "space-y-2",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
			label: "Compétences",
			hint: "1 par ligne",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
				className: cn(textareaClass, "h-28"),
				value: (c.items ?? []).join("\n"),
				onChange: (e) => patch({ items: e.target.value.split("\n") }),
				onBlur: (e) => {
					patch({ items: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) }, false);
					release$1();
				}
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 490,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 489,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$11,
		lineNumber: 488,
		columnNumber: 7
	}, this);
	if (el.type === "meters") {
		const meters = c.meters ?? [];
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "space-y-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-xs font-semibold text-slate-900",
					children: "Niveaux & Langues"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 508,
					columnNumber: 9
				}, this),
				meters.map((meter, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-[1fr_4.5rem] gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: inputClass,
						value: meter.label,
						onChange: (e) => {
							const next = meters.map((m, i) => i === index ? {
								...m,
								label: e.target.value
							} : m);
							patch({ meters: next });
						},
						onBlur: release$1
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 511,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: cn(inputClass, "font-mono tabular-nums text-center"),
						type: "number",
						min: 0,
						max: 100,
						value: meter.value,
						onChange: (e) => {
							const next = meters.map((m, i) => i === index ? {
								...m,
								value: Number(e.target.value)
							} : m);
							patch({ meters: next });
						},
						onBlur: release$1
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 520,
						columnNumber: 13
					}, this)]
				}, index, true, {
					fileName: _jsxFileName$11,
					lineNumber: 510,
					columnNumber: 11
				}, this)),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					className: "h-8 w-full rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition",
					onClick: () => patch({ meters: [...meters, {
						label: "Nouvelle langue",
						value: 75
					}] }, false),
					children: "+ Ajouter une jauge"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 534,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 507,
			columnNumber: 7
		}, this);
	}
	if (el.type === "photo") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
			className: "text-xs font-semibold text-slate-900",
			children: "Photo de profil"
		}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 548,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [c.src ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: c.src,
				alt: "Photo profil",
				className: "size-14 rounded-lg object-cover border border-slate-200"
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 551,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex size-14 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image$1, { size: 18 }, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 554,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 553,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "flex h-8 w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: c.src ? "Remplacer la photo" : "Importer une photo" }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 559,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							try {
								const src = await readImage(file);
								patch({ src }, false);
								useStudio.getState().notify("Photo intégrée");
							} catch {
								useStudio.getState().notify("Format d'image non supporté");
							}
							e.target.value = "";
						}
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 560,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 558,
					columnNumber: 13
				}, this), c.src && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					onClick: () => patch({ src: "" }, false),
					className: "flex h-7 w-full items-center justify-center gap-1 rounded-md border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-red-600 transition",
					children: [/* @__PURE__ */ (void 0)(Trash2, { size: 11 }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 584,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Supprimer la photo" }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 585,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 579,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 557,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 549,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 547,
		columnNumber: 7
	}, this);
	return null;
}
function StyleFields({ style, mixed, textual }) {
	const patch = (next, live = false) => useStudio.getState().patchSelectedStyle(next, live);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "space-y-4 border-t border-slate-100 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-xs font-semibold text-slate-900",
					children: textual ? "Typographie & Style" : "Apparence du bloc"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 611,
					columnNumber: 9
				}, this), mixed && /* @__PURE__ */ (void 0)("span", {
					className: "text-[11px] text-slate-400",
					children: "Sélection multiple"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 614,
					columnNumber: 19
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 610,
				columnNumber: 7
			}, this),
			textual && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (void 0)(Field, {
					label: "Police",
					children: /* @__PURE__ */ (void 0)("select", {
						className: inputClass,
						value: FONTS.includes(style.fontFamily) ? style.fontFamily : "Source Sans 3",
						onChange: (e) => patch({ fontFamily: e.target.value }),
						children: FONTS.map((font) => /* @__PURE__ */ (void 0)("option", {
							value: font,
							style: { fontFamily: font },
							children: font
						}, font, false, {
							fileName: _jsxFileName$11,
							lineNumber: 626,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 620,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 619,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-[1fr_auto] gap-2 items-end",
					children: [/* @__PURE__ */ (void 0)(Field, {
						label: "Corps (px)",
						children: /* @__PURE__ */ (void 0)("input", {
							className: cn(inputClass, "font-mono tabular-nums"),
							type: "number",
							min: 8,
							max: 160,
							value: style.fontSize,
							onChange: (e) => patch({ fontSize: Number(e.target.value) || 12 }, true),
							onBlur: release$1
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 635,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 634,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": "Gras",
								className: cn("flex size-9 items-center justify-center rounded-lg border transition", style.fontWeight >= 650 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"),
								onClick: () => patch({ fontWeight: style.fontWeight >= 650 ? 400 : 700 }),
								children: /* @__PURE__ */ (void 0)(Bold, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 658,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 647,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": "Italique",
								className: cn("flex size-9 items-center justify-center rounded-lg border transition", style.italic ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"),
								onClick: () => patch({ italic: !style.italic }),
								children: /* @__PURE__ */ (void 0)(Italic, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 671,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 660,
								columnNumber: 15
							}, this),
							[
								["left", AlignLeft],
								["center", AlignCenter],
								["right", AlignRight]
							].map(([align, Icon]) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": align,
								className: cn("flex size-9 items-center justify-center rounded-lg border transition", style.textAlign === align ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"),
								onClick: () => patch({ textAlign: align }),
								children: /* @__PURE__ */ (void 0)(Icon, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 692,
									columnNumber: 19
								}, this)
							}, align, false, {
								fileName: _jsxFileName$11,
								lineNumber: 680,
								columnNumber: 17
							}, this))
						]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 646,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 633,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (void 0)(Field, {
						label: "Couleur du texte",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-2 h-9",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "color",
								value: toHex(style.color),
								onChange: (e) => patch({ color: e.target.value }, true),
								onBlur: release$1,
								className: "size-5 cursor-pointer rounded border-0 bg-transparent p-0"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 701,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "font-mono text-[11px] uppercase text-slate-600",
								children: toHex(style.color)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 708,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 700,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 699,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Field, {
						label: "Interligne",
						hint: `${style.lineHeight}`,
						children: /* @__PURE__ */ (void 0)("input", {
							type: "range",
							min: .95,
							max: 2,
							step: .05,
							value: style.lineHeight,
							onChange: (e) => patch({ lineHeight: Number(e.target.value) }, true),
							onPointerUp: release$1,
							className: "mt-2.5 w-full"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 713,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 712,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 698,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 618,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-3 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Couleur de fond",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-2 h-9",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "color",
								value: toHex(style.backgroundColor),
								onChange: (e) => patch({ backgroundColor: e.target.value }, true),
								onBlur: release$1,
								className: "size-5 cursor-pointer rounded border-0 bg-transparent p-0"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 733,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-[11px] text-slate-600 truncate",
								children: style.backgroundColor === "transparent" ? "Aucun" : toHex(style.backgroundColor)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 740,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 732,
							columnNumber: 13
						}, this), style.backgroundColor !== "transparent" && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => patch({ backgroundColor: "transparent" }),
							className: "h-9 rounded-lg border border-slate-200 px-2 text-[11px] text-slate-500 hover:bg-slate-50",
							title: "Retirer le fond",
							children: "×"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 745,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 731,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 730,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Opacité",
					hint: `${Math.round(style.opacity * 100)}%`,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "range",
						min: .15,
						max: 1,
						step: .05,
						value: style.opacity,
						onChange: (e) => patch({ opacity: Number(e.target.value) }, true),
						onPointerUp: release$1,
						className: "mt-2.5 w-full"
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 758,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 757,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 729,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Arrondi des angles",
				hint: `${style.borderRadius}px`,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					type: "range",
					min: 0,
					max: 48,
					value: style.borderRadius,
					onChange: (e) => patch({ borderRadius: Number(e.target.value) }, true),
					onPointerUp: release$1,
					className: "w-full"
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 772,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 771,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 609,
		columnNumber: 5
	}, this);
}
function toHex(color) {
	return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#141311";
}
var _jsxFileName$10 = "/app/applet/src/components/studio/Sidebar.tsx";
var ADD = [
	{
		type: "heading",
		label: "Titre",
		icon: Heading
	},
	{
		type: "text",
		label: "Paragraphe",
		icon: Type
	},
	{
		type: "experience",
		label: "Expérience",
		icon: Briefcase
	},
	{
		type: "education",
		label: "Formation",
		icon: GraduationCap
	},
	{
		type: "skills",
		label: "Compétences",
		icon: Tags
	},
	{
		type: "meters",
		label: "Niveaux",
		icon: Gauge
	},
	{
		type: "photo",
		label: "Photo",
		icon: Image$1
	},
	{
		type: "contact",
		label: "Contact",
		icon: Link
	},
	{
		type: "rect",
		label: "Bloc fond",
		icon: Square
	},
	{
		type: "ellipse",
		label: "Forme ronde",
		icon: Circle
	},
	{
		type: "rule",
		label: "Ligne",
		icon: Minus
	}
];
var PACK_ICONS = {
	"pack-experience": Briefcase,
	"pack-education": GraduationCap,
	"pack-projects": FolderGit2,
	"pack-certifications": Award,
	"pack-languages": Globe
};
function TemplatePreview({ id }) {
	if (id === "modern") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full w-full flex-col bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-6 bg-slate-900 px-2 flex flex-col justify-center gap-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1.5 w-12 rounded-full bg-white" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 65,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-8 rounded-full bg-slate-400" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 66,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 64,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 p-2 space-y-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-200" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 69,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-slate-200" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 70,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-1 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-8 rounded-full bg-slate-700" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 72,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-100" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 73,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-5/6 rounded-full bg-slate-100" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 74,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 71,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 68,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 63,
		columnNumber: 7
	}, this);
	if (id === "executive") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full w-full bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-full w-1/3 bg-slate-900 p-1.5 flex flex-col items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-3.5 rounded-full bg-slate-700" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 84,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-400" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 85,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-3/4 rounded-full bg-slate-600" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 86,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 83,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col gap-1.5 p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1.5 w-2/3 rounded-full bg-slate-800" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 89,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-200" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 90,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-slate-200" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 91,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-100 mt-1" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 92,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 88,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 82,
		columnNumber: 7
	}, this);
	if (id === "creative") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative h-full w-full bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80 p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -top-2 -right-2 size-8 rounded-full bg-blue-600/90" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 100,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2 w-10 rounded-full bg-slate-900 mt-1" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 101,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-7 rounded-full bg-slate-400 mt-1" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 102,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2.5 space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-3/5 rounded-full bg-slate-200" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 104,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-1/2 rounded-full bg-slate-200" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 105,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 103,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-0 bottom-0 h-2.5 bg-slate-900" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 107,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 99,
		columnNumber: 7
	}, this);
	if (id === "swiss") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full w-full bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-full w-1.5 bg-blue-600" }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 114,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid flex-1 grid-cols-2 divide-x divide-slate-200",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-1.5 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1.5 w-4/5 rounded-full bg-slate-900" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 117,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-200" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 118,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-3/4 rounded-full bg-slate-200" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 119,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 116,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-1.5 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-2/3 rounded-full bg-slate-700" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 122,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-200" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 123,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-5/6 rounded-full bg-slate-100" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 124,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 121,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 115,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 113,
		columnNumber: 7
	}, this);
	if (id === "editorial") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full w-full flex-col justify-between bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2.5 w-4/5 rounded-xs bg-slate-900" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 134,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-full bg-slate-300 my-1.5" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 135,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2.5 rounded-xs bg-slate-100" }, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 137,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-full bg-slate-300" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 139,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-3/4 bg-slate-300" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 140,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 138,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 136,
				columnNumber: 11
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 133,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-slate-200" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 145,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-3/4 rounded-full bg-slate-200" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 146,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 144,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 132,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-1.5 bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80 p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1.5 w-1/2 rounded-full bg-slate-900" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 153,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-6 bg-slate-400" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 154,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-slate-200" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 155,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-3/5 rounded-full bg-slate-100" }, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 156,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 152,
		columnNumber: 5
	}, this);
}
function Sidebar({ onDone }) {
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const selectedIds = useStudio((s) => s.selectedIds);
	const activeTemplate = useStudio((s) => s.activeTemplate);
	const showGrid = useStudio((s) => s.showGrid);
	const snap = useStudio((s) => s.snap);
	const guides = useStudio((s) => s.guides);
	const margins = useStudio((s) => s.margins);
	const page = activePage(doc, activePageId);
	const [activeTab, setActiveTab] = (0, import_react.useState)("templates");
	const done = () => onDone?.();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: "flex h-full w-64 xl:w-72 shrink-0 flex-col border-r border-slate-200 bg-white text-slate-900 select-none z-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border-b border-slate-200 p-2.5 shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-3 rounded-lg bg-slate-100 p-0.5 text-xs font-medium",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("templates"),
						className: cn("flex items-center justify-center gap-1.5 rounded-md py-1.5 transition whitespace-nowrap", activeTab === "templates" ? "bg-white text-slate-900 font-semibold shadow-2xs" : "text-slate-600 hover:text-slate-900"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutTemplate, { size: 13 }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 191,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Modèles" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 192,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 181,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("blocks"),
						className: cn("flex items-center justify-center gap-1.5 rounded-md py-1.5 transition whitespace-nowrap", activeTab === "blocks" ? "bg-white text-slate-900 font-semibold shadow-2xs" : "text-slate-600 hover:text-slate-900"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 13 }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 204,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 205,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 194,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("layers"),
						className: cn("flex items-center justify-center gap-1.5 rounded-md py-1.5 transition whitespace-nowrap", activeTab === "layers" ? "bg-white text-slate-900 font-semibold shadow-2xs" : "text-slate-600 hover:text-slate-900"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { size: 13 }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 217,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Calques" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 218,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 207,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 180,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 179,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-0 flex-1 overflow-y-auto p-3.5 space-y-5",
			children: [
				activeTab === "templates" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("section", {
						className: "space-y-2.5",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-xs font-semibold text-slate-900",
								children: "Modèles de mise en page"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 231,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-[11px] text-slate-500",
								children: [TEMPLATES.length, " styles"]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 232,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 230,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-2.5",
							children: TEMPLATES.map((tpl) => {
								const isCurrent = activeTemplate === tpl.id;
								return /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										useStudio.getState().requestApplyTemplate(tpl.id);
										done();
									},
									className: cn("group flex flex-col overflow-hidden rounded-lg border text-left transition", isCurrent ? "border-signal bg-blue-50/30 ring-1 ring-signal" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"),
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "h-22 w-full bg-slate-100/80 p-2 transition group-hover:bg-slate-100",
										children: /* @__PURE__ */ (void 0)(TemplatePreview, { id: tpl.id }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 253,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 252,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between gap-1 px-2.5 py-2 border-t border-slate-100",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-slate-900 truncate",
												children: tpl.name
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 257,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-slate-500 truncate",
												children: tpl.note
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 258,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 256,
											columnNumber: 25
										}, this), isCurrent && /* @__PURE__ */ (void 0)("span", {
											className: "flex size-4 shrink-0 items-center justify-center rounded-full bg-signal text-white",
											children: /* @__PURE__ */ (void 0)(Check, {
												size: 10,
												strokeWidth: 3
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 262,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 261,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 255,
										columnNumber: 23
									}, this)]
								}, tpl.id, true, {
									fileName: _jsxFileName$10,
									lineNumber: 238,
									columnNumber: 21
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 234,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 229,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("section", {
						className: "space-y-2.5 border-t border-slate-100 pt-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (void 0)("h2", {
								className: "text-xs font-semibold text-slate-900",
								children: "Harmonies de couleurs"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 275,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 274,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-3 gap-2",
							children: COLOR_PALETTES.map((palette) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().applyPalette(palette.id),
								className: "group flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-2 hover:border-slate-300 hover:bg-slate-50 transition",
								title: palette.desc,
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center -space-x-1",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "size-4 rounded-full border border-white shadow-2xs",
										style: { backgroundColor: palette.primary }
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 287,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "size-4 rounded-full border border-white shadow-2xs",
										style: { backgroundColor: palette.accent }
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 291,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 286,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] font-medium text-slate-700 truncate w-full text-center",
									children: palette.name.split("/")[0].trim()
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 296,
									columnNumber: 21
								}, this)]
							}, palette.id, true, {
								fileName: _jsxFileName$10,
								lineNumber: 279,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 277,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 273,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("section", {
						className: "space-y-2.5 border-t border-slate-100 pt-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-xs font-semibold text-slate-900",
								children: "Exemples par métier"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 307,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-[11px] text-slate-500",
								children: "Pré-rédigés"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 308,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 306,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: JOB_PRESETS.map((preset) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									useStudio.getState().requestApplyJobPreset(preset.id);
									done();
								},
								className: "flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left hover:border-slate-300 hover:bg-slate-50 transition",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs font-medium text-slate-800 truncate",
										children: preset.label
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 322,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-[11px] text-slate-500 truncate",
										children: preset.badge
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 323,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 321,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] font-medium text-signal shrink-0",
									children: "Charger"
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 325,
									columnNumber: 21
								}, this)]
							}, preset.id, true, {
								fileName: _jsxFileName$10,
								lineNumber: 312,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 310,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 305,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("section", {
						className: "border-t border-slate-100 pt-4",
						children: /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => {
								useStudio.getState().setExtractorModalOpen(true);
								done();
							},
							className: "flex w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-left hover:border-slate-300 hover:bg-slate-100/80 transition",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700",
								children: /* @__PURE__ */ (void 0)(Upload, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 342,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 341,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold text-slate-900",
									children: "Importer un CV existant"
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 345,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "text-[11px] text-slate-500 truncate",
									children: "PDF, Word (.docx) ou texte"
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 346,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 344,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 333,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 332,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 227,
					columnNumber: 11
				}, this),
				activeTab === "blocks" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("section", {
					className: "space-y-2.5",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-xs font-semibold text-slate-900",
							children: "Sections complètes"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 358,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-[11px] text-slate-500",
							children: "1 clic"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 359,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 357,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: SECTION_PACKS.map((pack) => {
							return /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									useStudio.getState().addSectionPack(pack.id);
									done();
								},
								className: "group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5 text-left hover:border-slate-300 hover:bg-slate-50 transition",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700 group-hover:bg-signal group-hover:text-white transition",
										children: /* @__PURE__ */ (void 0)(PACK_ICONS[pack.id] ?? Briefcase, { size: 15 }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 375,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 374,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-xs font-semibold text-slate-900",
											children: pack.name
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 378,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-[11px] text-slate-500 truncate",
											children: pack.desc
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 379,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 377,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)(Plus, {
										size: 14,
										className: "text-slate-400 group-hover:text-slate-900 shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 381,
										columnNumber: 23
									}, this)
								]
							}, pack.id, true, {
								fileName: _jsxFileName$10,
								lineNumber: 365,
								columnNumber: 21
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 361,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 356,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("section", {
					className: "space-y-2.5 border-t border-slate-100 pt-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-xs font-semibold text-slate-900",
							children: "Éléments unitaires"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 390,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-[11px] text-slate-500",
							children: "Blocs libres"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 391,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 389,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 gap-2",
						children: ADD.map((item) => /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => {
								useStudio.getState().addElement(item.type);
								done();
							},
							className: "flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition",
							children: [/* @__PURE__ */ (void 0)(item.icon, {
								size: 14,
								className: "text-slate-500 shrink-0"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 404,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "truncate",
								children: item.label
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 405,
								columnNumber: 21
							}, this)]
						}, item.type, true, {
							fileName: _jsxFileName$10,
							lineNumber: 395,
							columnNumber: 19
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 393,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 388,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 355,
					columnNumber: 11
				}, this),
				activeTab === "layers" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("section", {
						className: "space-y-2.5",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-xs font-semibold text-slate-900",
								children: [
									"Pages du document (",
									doc.pages.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 419,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().addPage(),
								className: "inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition",
								children: [/* @__PURE__ */ (void 0)(Plus, { size: 11 }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 425,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Nouvelle page" }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 426,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 420,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 418,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: doc.pages.map((item, index) => /* @__PURE__ */ (void 0)("div", {
								className: cn("flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition", item.id === activePageId ? "border-signal bg-blue-50/40 font-semibold text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"),
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										className: "min-w-0 flex-1 truncate text-left",
										onClick: () => useStudio.getState().setActive(item.id),
										children: [
											index + 1,
											". ",
											item.name
										]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 440,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										title: "Dupliquer la page",
										className: "flex size-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700",
										onClick: () => {
											useStudio.getState().setActive(item.id);
											useStudio.getState().duplicatePage();
										},
										children: /* @__PURE__ */ (void 0)(Copy, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 456,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 447,
										columnNumber: 21
									}, this),
									doc.pages.length > 1 && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										title: "Supprimer la page",
										className: "flex size-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-600",
										onClick: () => useStudio.getState().deletePage(item.id),
										children: /* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 465,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 459,
										columnNumber: 23
									}, this)
								]
							}, item.id, true, {
								fileName: _jsxFileName$10,
								lineNumber: 431,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 429,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 417,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("section", {
						className: "space-y-2.5 border-t border-slate-100 pt-4",
						children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-xs font-semibold text-slate-900",
							children: "Aides à l’alignement"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 475,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								[
									"Grille",
									showGrid,
									"showGrid",
									Grid3x3
								],
								[
									"Magnétisme",
									snap,
									"snap",
									Magnet
								],
								[
									"Repères",
									guides,
									"guides",
									Magnet
								],
								[
									"Marges A4",
									margins,
									"margins",
									Minus
								]
							].map(([label, on, key]) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().toggle(key),
								className: cn("flex h-8 items-center justify-between rounded-lg border px-2.5 text-xs font-medium transition", on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"),
								children: [/* @__PURE__ */ (void 0)("span", { children: label }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 496,
									columnNumber: 21
								}, this), on && /* @__PURE__ */ (void 0)(Check, { size: 12 }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 497,
									columnNumber: 28
								}, this)]
							}, key, true, {
								fileName: _jsxFileName$10,
								lineNumber: 485,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 476,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 474,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("section", {
						className: "space-y-2.5 border-t border-slate-100 pt-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-xs font-semibold text-slate-900",
								children: [
									"Calques (",
									page.elements.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 506,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-[11px] text-slate-500",
								children: "Ordre Z"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 507,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 505,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [...page.elements].sort((a, b) => b.z - a.z).map((el) => {
								return /* @__PURE__ */ (void 0)("div", {
									className: cn("flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition", selectedIds.includes(el.id) ? "border-signal bg-blue-50/50 text-slate-900 font-medium" : "border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50"),
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										className: "min-w-0 flex-1 truncate text-left",
										onClick: () => {
											useStudio.getState().setActive(page.id);
											useStudio.getState().select([el.id]);
										},
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] text-slate-400 mr-1.5",
											children: TYPE_LABEL[el.type]
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 532,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", { children: snippet(el) }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 533,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 524,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": el.hidden ? "Afficher" : "Masquer",
										className: "flex size-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700",
										onClick: () => useStudio.getState().toggleHidden(page.id, el.id),
										children: el.hidden ? /* @__PURE__ */ (void 0)(EyeOff, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 541,
											columnNumber: 40
										}, this) : /* @__PURE__ */ (void 0)(Eye, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 541,
											columnNumber: 63
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 535,
										columnNumber: 25
									}, this)]
								}, el.id, true, {
									fileName: _jsxFileName$10,
									lineNumber: 515,
									columnNumber: 23
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 509,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 504,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 415,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 224,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 177,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/app/applet/src/components/studio/DocumentAlertBanner.tsx";
function DocumentAlertBanner() {
	const doc = useStudio((s) => s.doc);
	const editorMode = useStudio((s) => s.editorMode);
	const paginationBlocked = useStudio((s) => s.paginationBlocked);
	const focusAuditIssue = useStudio((s) => s.focusAuditIssue);
	const paginateDocument = useStudio((s) => s.paginateDocument);
	const compactSpacing = useStudio((s) => s.compactSpacing);
	const setEditorMode = useStudio((s) => s.setEditorMode);
	const deletePage = useStudio((s) => s.deletePage);
	const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
	const audit = (0, import_react.useMemo)(() => auditDocument(doc, {
		editorMode,
		paginationBlocked
	}), [
		doc,
		editorMode,
		paginationBlocked
	]);
	const issue = audit.primaryBannerIssue;
	if (!issue) return null;
	const isCritical = issue.severity === "critical";
	const isWarning = issue.severity === "warning";
	const containerStyle = isCritical ? "bg-red-50/95 border-red-300 text-red-950" : isWarning ? "bg-amber-50/95 border-amber-300 text-amber-950" : "bg-stone-100/95 border-stone-300 text-stone-900";
	const badgeStyle = isCritical ? "bg-red-600 text-white" : isWarning ? "bg-amber-600 text-white" : "bg-stone-800 text-white";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		"data-testid": "document-alert-banner",
		"data-issue-kind": issue.kind,
		className: `no-print border-b px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 transition-colors shrink-0 ${containerStyle}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: () => focusAuditIssue(issue),
			"data-testid": "document-alert-focus-btn",
			title: "Cliquer pour centrer et sélectionner le bloc concerné",
			className: "flex items-center gap-2.5 text-left group min-w-0 flex-1 cursor-pointer",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: `px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${badgeStyle}`,
					children: isCritical ? "Alerte" : isWarning ? "Attention" : "Info Studio"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 52,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-bold group-hover:underline",
						children: issue.bannerTitle
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 56,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs opacity-85 truncate",
						children: issue.message
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 59,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 55,
					columnNumber: 9
				}, this),
				issue.elementIds.length > 0 && /* @__PURE__ */ (void 0)("span", {
					className: "hidden md:inline-flex items-center gap-1 text-[11px] font-semibold underline opacity-75 group-hover:opacity-100 shrink-0",
					children: "Voir le bloc →"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 64,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 45,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap items-center gap-1.5 shrink-0",
			children: [
				issue.actions.includes("paginate") && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-action-paginate",
					onClick: () => paginateDocument(),
					className: "px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs cursor-pointer",
					children: "Répartir sur les pages suivantes"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 72,
					columnNumber: 11
				}, this),
				issue.actions.includes("compact-spacing") && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-action-compact",
					onClick: () => compactSpacing(issue.pageId),
					className: "px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer",
					children: "Réduire l’espacement"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 83,
					columnNumber: 11
				}, this),
				issue.actions.includes("delete-empty-page") && doc.pages.length > 1 && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-action-delete-page",
					onClick: () => deletePage(issue.pageId),
					className: "px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer",
					children: "Supprimer la page vide"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 94,
					columnNumber: 11
				}, this),
				issue.actions.includes("adjust-studio") && editorMode !== "pro" && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-action-studio",
					onClick: () => {
						setEditorMode("pro");
						focusAuditIssue(issue);
					},
					className: "px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer",
					children: "Ajuster manuellement dans le Studio"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 105,
					columnNumber: 11
				}, this),
				issue.actions.includes("adjust-studio") && editorMode === "pro" && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-action-focus-studio",
					onClick: () => focusAuditIssue(issue),
					className: "px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer",
					children: "Ajuster manuellement dans le Studio"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 119,
					columnNumber: 11
				}, this),
				issue.actions.includes("switch-guided") && editorMode === "pro" && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-action-guided",
					onClick: () => setEditorMode("guided"),
					className: "px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer",
					children: "Revenir au Mode Guidé"
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 130,
					columnNumber: 11
				}, this),
				audit.issues.length > 1 && /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"data-testid": "banner-open-readability",
					onClick: () => setReadabilityModalOpen(true, false),
					className: "px-2 py-1 rounded-md text-[11px] font-semibold underline opacity-80 hover:opacity-100 cursor-pointer",
					children: [
						"Toutes les alertes (",
						audit.issues.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 141,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 70,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 40,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/studio/SimpleEditor.tsx";
var inputStyle = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600";
var textareaStyle = "w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none";
function release() {
	useStudio.getState().release();
}
function SimpleEditor() {
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const selectedIds = useStudio((s) => s.selectedIds);
	const select = useStudio((s) => s.select);
	const setActive = useStudio((s) => s.setActive);
	useStudio((s) => s.activeTemplate);
	const layoutCustomized = useStudio((s) => s.layoutCustomized);
	const paginationBlocked = useStudio((s) => s.paginationBlocked);
	const saveStatus = useStudio((s) => s.saveStatus);
	const lastSavedAt = useStudio((s) => s.lastSavedAt);
	const setEditorMode = useStudio((s) => s.setEditorMode);
	const setOnboarding = useStudio((s) => s.setOnboarding);
	const requestPdfExport = useStudio((s) => s.requestPdfExport);
	const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
	const setPlainTextModalOpen = useStudio((s) => s.setPlainTextModalOpen);
	const setIdentity = useStudio((s) => s.setIdentity);
	const updateExperience = useStudio((s) => s.updateExperience);
	const addExperience = useStudio((s) => s.addExperience);
	const removeExperience = useStudio((s) => s.removeExperience);
	const updateEducation = useStudio((s) => s.updateEducation);
	const addEducation = useStudio((s) => s.addEducation);
	const removeEducation = useStudio((s) => s.removeEducation);
	const updateSkills = useStudio((s) => s.updateSkills);
	const updateLanguages = useStudio((s) => s.updateLanguages);
	const toggleSectionVisibility = useStudio((s) => s.toggleSectionVisibility);
	const moveSection = useStudio((s) => s.moveSection);
	const undo = useStudio((s) => s.undo);
	const redo = useStudio((s) => s.redo);
	const past = useStudio((s) => s.past);
	const future = useStudio((s) => s.future);
	useStudio((s) => s.requestApplyTemplate);
	const requestResetLayout = useStudio((s) => s.requestResetLayout);
	useStudio((s) => s.applyPalette);
	useStudio((s) => s.applyGlobalFont);
	const notify = useStudio((s) => s.notify);
	const [activeSection, setActiveSection] = (0, import_react.useState)("experience");
	const [showMobilePreview, setShowMobilePreview] = (0, import_react.useState)(false);
	const page = activePage(doc, activePageId);
	const profile = doc.profile;
	doc.pages.flatMap((p) => getStudioUnboundElements(p));
	page.elements.find((el) => el.style?.fontFamily)?.style.fontFamily;
	const audit = (0, import_react.useMemo)(() => auditDocument(doc, {
		editorMode: "guided",
		paginationBlocked
	}), [doc, paginationBlocked]);
	const actionableIssueCount = audit.criticalIssues.length + audit.warningIssues.length;
	(0, import_react.useEffect)(() => {
		const onFocusIssue = (evt) => {
			const targetId = evt.detail?.elementIds?.[0];
			if (!targetId) return;
			const found = doc.pages.flatMap((p) => p.elements).find((e) => e.id === targetId);
			if (!found?.bind) return;
			if ([
				"name",
				"role",
				"contact"
			].includes(found.bind.kind)) setActiveSection("profile");
			else if (found.bind.kind === "summary") setActiveSection("summary");
			else if (found.bind.kind === "experience") setActiveSection("experience");
			else if (found.bind.kind === "education") setActiveSection("education");
			else if (found.bind.kind === "skills") setActiveSection("skills");
			else if (found.bind.kind === "languages") setActiveSection("languages");
		};
		window.addEventListener("cv-focus-issue", onFocusIssue);
		return () => window.removeEventListener("cv-focus-issue", onFocusIssue);
	}, [doc]);
	const sectionsList = [
		{
			id: "profile",
			label: "Profil & Contact",
			icon: User
		},
		{
			id: "summary",
			label: "Résumé / Bio",
			icon: Sparkles
		},
		{
			id: "experience",
			label: "Expériences professionnelles",
			icon: Briefcase
		},
		{
			id: "education",
			label: "Formation & Diplômes",
			icon: GraduationCap
		},
		{
			id: "skills",
			label: "Compétences",
			icon: Palette
		},
		{
			id: "languages",
			label: "Langues",
			icon: Palette
		}
	];
	const isSectionVisible = (secId) => {
		const matches = (el) => {
			if (!el.bind) return false;
			if (secId === "profile" && [
				"name",
				"role",
				"contact"
			].includes(el.bind.kind)) return true;
			if (secId === "summary" && el.bind.kind === "summary") return true;
			if (secId === "experience" && el.bind.kind === "experience") return true;
			if (secId === "education" && el.bind.kind === "education") return true;
			if (secId === "skills" && el.bind.kind === "skills") return true;
			if (secId === "languages" && el.bind.kind === "languages") return true;
			return false;
		};
		const sectionEls = doc.pages.flatMap((p) => p.elements).filter(matches);
		if (!sectionEls.length) return true;
		return sectionEls.some((el) => !el.hidden);
	};
	const handleBoostSummary = () => {
		const phrase = getRandomBoost();
		const nextSummary = profile.summary ? `${profile.summary} ${phrase}` : phrase;
		setIdentity("summary", nextSummary);
		release();
		notify("✨ Résumé formulé avec succès !");
	};
	const handleBoostExp = (index) => {
		const phrase = getRandomBoost();
		const exp = profile.experiences[index];
		if (exp) {
			const curDesc = exp.desc || "";
			const nextDesc = curDesc ? `${curDesc}\n• ${phrase}` : `• ${phrase}`;
			updateExperience(index, { desc: nextDesc }, false);
			notify("✨ Réalisation chiffrée ajoutée au poste !");
		}
	};
	const handleAddAchievement = (index) => {
		const exp = profile.experiences[index];
		if (!exp) return;
		const curDesc = exp.desc || "";
		const nextDesc = curDesc ? `${curDesc}\n• Nouvelle réalisation impactante` : `• Nouvelle réalisation impactante`;
		updateExperience(index, { desc: nextDesc }, false);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-dvh w-full overflow-hidden bg-paper text-slate-900 select-none flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "no-print flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white px-3 py-2 z-30 shadow-xs sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setOnboarding(true),
								className: "flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs",
								title: "Revenir au point de départ",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 179,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Parcours" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 180,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 173,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "hidden sm:flex items-center gap-2 text-xs text-slate-600 pl-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-slate-800",
										"data-testid": "guided-page-count",
										children: doc.pages.length > 1 ? `${doc.pages.length} pages A4` : page.name
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 184,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										"aria-hidden": "true",
										className: "text-slate-300",
										children: "·"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 187,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-1 text-slate-500",
										title: lastSavedAt ? `Dernière sauvegarde automatique à ${lastSavedAt}` : "Sauvegarde automatique active",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
											size: 13,
											className: "text-emerald-600 shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 192,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: saveStatus === "saving" ? "Sauvegarde…" : "Enregistré" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 193,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 188,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 183,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 border-l border-slate-300 pl-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => undo(),
									disabled: !past.length,
									className: "flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition shadow-xs",
									title: "Annuler (Ctrl+Z)",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Undo2, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 206,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 199,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => redo(),
									disabled: !future.length,
									className: "flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition shadow-xs",
									title: "Rétablir (Ctrl+Y)",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Redo2, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 215,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 208,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 198,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 172,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						role: "tablist",
						"aria-label": "Mode d'édition",
						className: "flex items-center rounded-xl bg-slate-100 p-1 shadow-inner border border-slate-300",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							role: "tab",
							"aria-selected": true,
							className: "flex items-center gap-2 rounded-lg bg-signal px-4 py-1.5 text-xs font-bold text-signal-ink shadow-sm transition",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Saisie guidée" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 232,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 226,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							role: "tab",
							"aria-selected": false,
							onClick: () => setEditorMode("pro"),
							className: "flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Studio libre" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 241,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 234,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 221,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"data-testid": "open-plain-text-btn",
								onClick: () => setPlainTextModalOpen(true),
								className: "flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs",
								title: "Voir ce qu'un ATS lira réellement (Aperçu texte brut)",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 253,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden lg:inline",
										children: "Aperçu texte brut"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 254,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "lg:hidden",
										children: "Texte brut"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 255,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 246,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"data-testid": "open-readability-btn",
								onClick: () => setReadabilityModalOpen(true, false),
								className: cn("flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-semibold transition shadow-xs", actionableIssueCount > 0 ? "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"),
								title: "Contrôle de lisibilité et de mise en page avant export",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 270,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Contrôle" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 271,
										columnNumber: 13
									}, this),
									actionableIssueCount > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "ml-0.5 rounded-full bg-amber-600 px-1.5 py-0.2 text-[10px] font-bold text-white",
										children: actionableIssueCount
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 273,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 258,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setShowMobilePreview((visible) => !visible),
								className: "flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition md:hidden",
								children: [showMobilePreview ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenLine, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 284,
									columnNumber: 34
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 284,
									columnNumber: 58
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: showMobilePreview ? "Modifier" : "Aperçu" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 285,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 279,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"data-testid": "export-pdf-btn",
								onClick: () => requestPdfExport(),
								className: "flex items-center gap-2 rounded-lg bg-signal px-4 py-2 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 293,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Télécharger mon CV (PDF)" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 294,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 287,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 245,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 171,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DocumentAlertBanner, {}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 300,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 min-h-0 flex-col overflow-hidden md:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `${showMobilePreview ? "hidden" : "flex"} w-full min-h-0 min-w-0 flex-1 flex-col bg-slate-50/90 border-r border-slate-200 shadow-sm z-10 md:flex md:w-[280px] md:flex-none`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xs font-bold uppercase tracking-wider text-slate-600",
									children: "Sections du CV"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 309,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-medium text-slate-400",
									children: [sectionsList.length, " sections"]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 310,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 308,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-h-0 flex-1 overflow-y-auto p-3 space-y-2",
								children: sectionsList.map((sec, index) => {
									const Icon = sec.icon;
									const visible = isSectionVisible(sec.id);
									const isSelected = activeSection === sec.id;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										onClick: () => setActiveSection(sec.id),
										className: cn("group flex items-center justify-between rounded-xl border p-3 text-xs font-semibold transition cursor-pointer shadow-2xs", isSelected ? "border-blue-600 bg-white text-blue-700 shadow-xs ring-1 ring-blue-600/20" : "border-slate-200 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-300"),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2.5 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
												size: 15,
												className: isSelected ? "text-blue-600 shrink-0" : "text-slate-400 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 331,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "truncate",
												children: sec.label
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 332,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 330,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1 opacity-80 group-hover:opacity-100",
											onClick: (e) => e.stopPropagation(),
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => toggleSectionVisibility(sec.id),
													className: cn("flex size-7 items-center justify-center rounded-lg transition", visible ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900" : "text-amber-600 bg-amber-50 hover:bg-amber-100"),
													title: visible ? "Masquer la section sur le CV" : "Afficher la section sur le CV",
													children: visible ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 13 }, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 346,
														columnNumber: 34
													}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { size: 13 }, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 346,
														columnNumber: 54
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 337,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => moveSection(sec.id, "up"),
													disabled: index === 0,
													className: "flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 transition",
													title: "Monter la section",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { size: 13 }, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 357,
														columnNumber: 23
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 350,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => moveSection(sec.id, "down"),
													disabled: index === sectionsList.length - 1,
													className: "flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 transition",
													title: "Descendre la section",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { size: 13 }, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 368,
														columnNumber: 23
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 361,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 335,
											columnNumber: 19
										}, this)]
									}, sec.id, true, {
										fileName: _jsxFileName$8,
										lineNumber: 320,
										columnNumber: 17
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 313,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 border-t border-slate-200 bg-white shrink-0 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										setActiveSection("experience");
										addExperience();
									},
									className: "w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition shadow-2xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 385,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une expérience" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 386,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 377,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										setActiveSection("education");
										addEducation();
									},
									className: "w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition shadow-2xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 396,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une formation" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 397,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 388,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 376,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 305,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `${showMobilePreview ? "flex" : "hidden"} md:flex min-h-0 flex-1 flex-col bg-slate-200/60 overflow-hidden relative`,
						children: [layoutCustomized && /* @__PURE__ */ (void 0)("div", {
							className: "px-4 pt-3 z-20 shrink-0 no-print",
							children: /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-blue-200 bg-blue-50/95 px-4 py-2 text-xs text-blue-900 shadow-xs flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Info, {
										size: 15,
										className: "shrink-0 text-blue-600"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 411,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Mise en page personnalisée du Studio active. Les textes modifiés ici se mettent à jour en direct." }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 412,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 410,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => requestResetLayout(),
									className: "shrink-0 inline-flex items-center gap-1 rounded-md border border-blue-300 bg-white px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 transition",
									children: [/* @__PURE__ */ (void 0)(RotateCcw, { size: 11 }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 419,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Réinitialiser" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 420,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 414,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 409,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 408,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-h-0 flex-1 overflow-auto p-6 md:p-10 flex flex-col items-center",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "simple-preview-sheet flex flex-col items-center gap-8 transition-all origin-top scale-[0.72] sm:scale-[0.80] md:scale-[0.85] lg:scale-[0.90]",
								style: {
									width: 794,
									transformOrigin: "top center"
								},
								children: doc.pages.map((p, pageIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									"data-testid": `guided-page-${pageIdx + 1}`,
									className: "flex flex-col items-center gap-2",
									children: [doc.pages.length > 1 && /* @__PURE__ */ (void 0)("div", {
										className: "w-full flex items-center justify-between px-1 text-xs font-bold text-slate-600",
										children: [/* @__PURE__ */ (void 0)("span", { children: [
											"Page ",
											pageIdx + 1,
											" sur ",
											doc.pages.length,
											" — Format A4 (1123 px)"
										] }, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 439,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-medium text-slate-500",
											children: p.name
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 442,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 438,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "simple-preview-frame bg-white shadow-2xl rounded-sm relative",
										style: {
											width: 794,
											height: PAGE_H
										},
										onClick: (e) => {
											const elId = (e.target?.closest?.("[data-element]"))?.getAttribute("data-element");
											setActive(p.id);
											if (!elId) return;
											select([elId]);
											const clickedEl = p.elements.find((item) => item.id === elId);
											if (!clickedEl?.bind) return;
											if ([
												"name",
												"role",
												"contact"
											].includes(clickedEl.bind.kind)) setActiveSection("profile");
											else if (clickedEl.bind.kind === "summary") setActiveSection("summary");
											else if (clickedEl.bind.kind === "experience") setActiveSection("experience");
											else if (clickedEl.bind.kind === "education") setActiveSection("education");
											else if (clickedEl.bind.kind === "skills") setActiveSection("skills");
											else if (clickedEl.bind.kind === "languages") setActiveSection("languages");
										},
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
											page: p,
											interactive: false,
											selectedIds,
											editingId: null,
											showGrid: false,
											showMargins: false,
											guides: {
												x: [],
												y: []
											},
											marquee: null
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 464,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 445,
										columnNumber: 19
									}, this)]
								}, p.id, true, {
									fileName: _jsxFileName$8,
									lineNumber: 432,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 427,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 426,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 403,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `${showMobilePreview ? "hidden" : "flex"} w-full min-h-0 min-w-0 flex-1 flex-col bg-white border-l border-slate-200 shadow-sm z-10 md:flex md:w-[420px] md:flex-none`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-bold uppercase tracking-wider text-slate-700",
									children: sectionsList.find((s) => s.id === activeSection)?.label ?? "Édition"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 487,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 486,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-slate-400",
								children: "Mise à jour en direct"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 491,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 485,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-h-0 flex-1 overflow-y-auto p-6 space-y-6",
							children: [
								activeSection === "profile" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4 animate-in fade-in",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (void 0)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Profil & Contact"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 498,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-slate-500",
											children: "Ces informations apparaissent en haut de votre CV."
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 499,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 497,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (void 0)("label", {
												className: "block",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-semibold text-slate-700",
													children: "Nom & Prénom"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 504,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)("input", {
													className: cn(inputStyle, "mt-1"),
													value: profile.name,
													onChange: (e) => setIdentity("name", e.target.value),
													onBlur: release,
													placeholder: "Ex: Alexandra Dubois"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 505,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$8,
												lineNumber: 503,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("label", {
												className: "block",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-semibold text-slate-700",
													children: "Intitulé du poste recherché"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 515,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)("input", {
													className: cn(inputStyle, "mt-1"),
													value: profile.role,
													onChange: (e) => setIdentity("role", e.target.value),
													onBlur: release,
													placeholder: "Ex: Product Designer Senior"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 516,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$8,
												lineNumber: 514,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (void 0)("label", {
													className: "block",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-xs font-semibold text-slate-700",
														children: "Adresse e-mail"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 527,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("input", {
														className: cn(inputStyle, "mt-1"),
														value: profile.email,
														onChange: (e) => setIdentity("email", e.target.value),
														onBlur: release,
														placeholder: "alexandra@email.com"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 528,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 526,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)("label", {
													className: "block",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-xs font-semibold text-slate-700",
														children: "Téléphone"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 537,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("input", {
														className: cn(inputStyle, "mt-1"),
														value: profile.phone,
														onChange: (e) => setIdentity("phone", e.target.value),
														onBlur: release,
														placeholder: "+33 6 12 34 56 78"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 538,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 536,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$8,
												lineNumber: 525,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (void 0)("label", {
													className: "block",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-xs font-semibold text-slate-700",
														children: "Ville / Localisation"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 550,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("input", {
														className: cn(inputStyle, "mt-1"),
														value: profile.location,
														onChange: (e) => setIdentity("location", e.target.value),
														onBlur: release,
														placeholder: "Paris, France"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 551,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 549,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)("label", {
													className: "block",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-xs font-semibold text-slate-700",
														children: "Lien (LinkedIn / Portfolio)"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 560,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("input", {
														className: cn(inputStyle, "mt-1"),
														value: profile.link,
														onChange: (e) => setIdentity("link", e.target.value),
														onBlur: release,
														placeholder: "linkedin.com/in/nom"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 561,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 559,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$8,
												lineNumber: 548,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 502,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 496,
									columnNumber: 15
								}, this),
								activeSection === "summary" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4 animate-in fade-in",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Résumé de profil / Bio"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 577,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: handleBoostSummary,
											className: "flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-500/25 transition",
											children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 583,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "✨ Formuler comme un pro" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 584,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 578,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 576,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("textarea", {
										className: cn(textareaStyle, "h-40"),
										value: profile.summary,
										onChange: (e) => setIdentity("summary", e.target.value),
										onBlur: release,
										placeholder: "Présentation synthétique de votre parcours..."
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 587,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 575,
									columnNumber: 15
								}, this),
								activeSection === "experience" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-5 animate-in fade-in",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Expériences professionnelles"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 601,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-slate-500",
											children: "Ajoutez et détaillez vos réalisations."
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 602,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 600,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => addExperience(),
											className: "flex items-center gap-1 rounded-lg bg-signal px-3 py-1.5 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-xs",
											children: /* @__PURE__ */ (void 0)("span", { children: "+ Ajouter un poste" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 609,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 604,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 599,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-4",
										children: profile.experiences.map((exp, index) => /* @__PURE__ */ (void 0)("div", {
											"data-testid": `guided-experience-${index}`,
											className: "rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 relative group",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-xs font-bold text-slate-800",
														children: ["Poste #", index + 1]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 621,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => removeExperience(index),
														className: "flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold",
														children: [/* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 627,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("span", { children: "Supprimer" }, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 628,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 622,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 620,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid grid-cols-2 gap-2.5",
													children: [/* @__PURE__ */ (void 0)("label", {
														className: "block space-y-1",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "text-[11px] font-semibold text-slate-700",
															children: "Intitulé du poste"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 634,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("input", {
															className: inputStyle,
															value: exp.role,
															onChange: (e) => updateExperience(index, { role: e.target.value }),
															onBlur: release,
															placeholder: "Intitulé du poste"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 635,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 633,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("label", {
														className: "block space-y-1",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "text-[11px] font-semibold text-slate-700",
															children: "Entreprise — Ville"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 644,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("input", {
															className: inputStyle,
															value: exp.company,
															onChange: (e) => updateExperience(index, { company: e.target.value }),
															onBlur: release,
															placeholder: "Entreprise — Ville"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 645,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 643,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 632,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("label", {
													className: "block space-y-1",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[11px] font-semibold text-slate-700",
														children: "Période"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 656,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("input", {
														className: inputStyle,
														value: exp.date,
														onChange: (e) => updateExperience(index, { date: e.target.value }),
														onBlur: release,
														placeholder: "Ex: 2021 — Présent"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 657,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 655,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (void 0)("label", {
															htmlFor: `exp-desc-${index}`,
															className: "text-[11px] font-semibold text-slate-700",
															children: "Missions & Réalisations (puces)"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 668,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "flex items-center gap-1.5",
															children: [/* @__PURE__ */ (void 0)("button", {
																type: "button",
																onClick: () => handleAddAchievement(index),
																className: "flex items-center gap-1 rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-800 hover:bg-blue-500/25 transition",
																children: [/* @__PURE__ */ (void 0)(Plus, { size: 11 }, void 0, false, {
																	fileName: _jsxFileName$8,
																	lineNumber: 677,
																	columnNumber: 31
																}, this), /* @__PURE__ */ (void 0)("span", { children: "Ajouter une réalisation" }, void 0, false, {
																	fileName: _jsxFileName$8,
																	lineNumber: 678,
																	columnNumber: 31
																}, this)]
															}, void 0, true, {
																fileName: _jsxFileName$8,
																lineNumber: 672,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("button", {
																type: "button",
																onClick: () => handleBoostExp(index),
																className: "flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-500/25 transition",
																children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
																	fileName: _jsxFileName$8,
																	lineNumber: 685,
																	columnNumber: 31
																}, this), /* @__PURE__ */ (void 0)("span", { children: "✨ Pro" }, void 0, false, {
																	fileName: _jsxFileName$8,
																	lineNumber: 686,
																	columnNumber: 31
																}, this)]
															}, void 0, true, {
																fileName: _jsxFileName$8,
																lineNumber: 680,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$8,
															lineNumber: 671,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 667,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("textarea", {
														id: `exp-desc-${index}`,
														className: cn(textareaStyle, "h-32"),
														value: exp.desc,
														onChange: (e) => updateExperience(index, { desc: e.target.value }),
														onBlur: release,
														placeholder: "• Réalisation 1\n• Réalisation 2..."
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 690,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 666,
													columnNumber: 23
												}, this)
											]
										}, index, true, {
											fileName: _jsxFileName$8,
											lineNumber: 615,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 613,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 598,
									columnNumber: 15
								}, this),
								activeSection === "education" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-5 animate-in fade-in",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Formation & Diplômes"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 709,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-slate-500",
											children: "Ajoutez vos cursus académiques."
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 710,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 708,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => addEducation(),
											className: "flex items-center gap-1 rounded-lg bg-signal px-3 py-1.5 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-xs",
											children: /* @__PURE__ */ (void 0)("span", { children: "+ Ajouter une formation" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 717,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 712,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 707,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-4",
										children: profile.educations.map((edu, index) => /* @__PURE__ */ (void 0)("div", {
											className: "rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-xs font-bold text-slate-800",
														children: ["Formation #", index + 1]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 725,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => removeEducation(index),
														className: "flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold",
														children: [/* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 731,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("span", { children: "Supprimer" }, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 732,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 726,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 724,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("label", {
													className: "block space-y-1",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[11px] font-semibold text-slate-700",
														children: "Diplôme"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 737,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("input", {
														className: inputStyle,
														value: edu.degree,
														onChange: (e) => updateEducation(index, { degree: e.target.value }),
														onBlur: release,
														placeholder: "Diplôme (ex: Master Informatique)"
													}, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 738,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 736,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid grid-cols-2 gap-2.5",
													children: [/* @__PURE__ */ (void 0)("label", {
														className: "block space-y-1",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "text-[11px] font-semibold text-slate-700",
															children: "École / Université"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 748,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("input", {
															className: inputStyle,
															value: edu.school,
															onChange: (e) => updateEducation(index, { school: e.target.value }),
															onBlur: release,
															placeholder: "École / Université"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 749,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 747,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("label", {
														className: "block space-y-1",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "text-[11px] font-semibold text-slate-700",
															children: "Période / Année"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 758,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("input", {
															className: inputStyle,
															value: edu.date,
															onChange: (e) => updateEducation(index, { date: e.target.value }),
															onBlur: release,
															placeholder: "Ex: 2020 — 2023"
														}, void 0, false, {
															fileName: _jsxFileName$8,
															lineNumber: 759,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$8,
														lineNumber: 757,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$8,
													lineNumber: 746,
													columnNumber: 23
												}, this)
											]
										}, index, true, {
											fileName: _jsxFileName$8,
											lineNumber: 723,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 721,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 706,
									columnNumber: 15
								}, this),
								activeSection === "skills" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4 animate-in fade-in",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (void 0)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Compétences clés"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 777,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-slate-500",
											children: "Séparez vos compétences par des virgules ou des retours à la ligne."
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 778,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 776,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("textarea", {
										className: cn(textareaStyle, "h-36"),
										value: profile.skills.join(", "),
										onChange: (e) => {
											const items = e.target.value.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
											updateSkills(items, false);
										},
										onBlur: release,
										placeholder: "Figma, Design system, React, TypeScript..."
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 780,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 775,
									columnNumber: 15
								}, this),
								activeSection === "languages" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4 animate-in fade-in",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Langues & Niveaux (%)"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 799,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												updateLanguages([...profile.languages, {
													label: "Nouvelle langue",
													value: 75
												}], false);
											},
											className: "flex items-center gap-1 rounded-md bg-signal/15 px-2.5 py-1 text-xs font-bold text-signal hover:bg-signal/25 transition",
											children: [/* @__PURE__ */ (void 0)(Plus, { size: 12 }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 807,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Ajouter une langue" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 808,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 800,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 798,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-3",
										children: profile.languages.map((lang, index) => /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3",
											children: [
												/* @__PURE__ */ (void 0)("input", {
													className: cn(inputStyle, "flex-1 h-9"),
													value: lang.label,
													onChange: (e) => {
														const next = [...profile.languages];
														next[index] = {
															...lang,
															label: e.target.value
														};
														updateLanguages(next, false);
													},
													onBlur: release,
													placeholder: "Langue"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 815,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("input", {
													type: "number",
													min: "0",
													max: "100",
													className: cn(inputStyle, "w-20 h-9 text-center"),
													value: lang.value,
													onChange: (e) => {
														const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
														const next = [...profile.languages];
														next[index] = {
															...lang,
															value: val
														};
														updateLanguages(next, false);
													},
													onBlur: release
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 826,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "text-xs text-slate-500",
													children: "%"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 840,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("button", {
													type: "button",
													onClick: () => {
														const next = profile.languages.filter((_, i) => i !== index);
														updateLanguages(next, false);
													},
													className: "text-slate-400 hover:text-red-600 p-1 transition",
													title: "Supprimer",
													children: /* @__PURE__ */ (void 0)(Trash2, { size: 14 }, void 0, false, {
														fileName: _jsxFileName$8,
														lineNumber: 850,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 841,
													columnNumber: 23
												}, this)
											]
										}, index, true, {
											fileName: _jsxFileName$8,
											lineNumber: 814,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 812,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 797,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 494,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 482,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 303,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 169,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/components/studio/CloudSyncModal.tsx";
function CloudSyncModal({ isOpen, onClose }) {
	const syncCode = useStudio((s) => s.syncCode);
	const syncToCloud = useStudio((s) => s.syncToCloud);
	const loadFromCloud = useStudio((s) => s.loadFromCloud);
	const [inputCode, setInputCode] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("save");
	if (!isOpen) return null;
	const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
	const shareLink = syncCode ? `${currentUrl}/?sync=${syncCode}` : "";
	const handleSyncNow = async () => {
		setLoading(true);
		await syncToCloud();
		setLoading(false);
	};
	const handleCopy = () => {
		if (!shareLink) return;
		navigator.clipboard.writeText(shareLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleLoadCode = async () => {
		if (!inputCode.trim()) return;
		setLoading(true);
		const ok = await loadFromCloud(inputCode.trim());
		setLoading(false);
		if (ok) onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "no-print fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-xs animate-in fade-in",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md rounded-2xl border border-line bg-sheet p-5 text-ink shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-4 flex items-center justify-between border-b border-line pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cloud, { size: 18 }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 49,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 48,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-sm font-bold tracking-wide",
							children: "Synchronisation Cloud Multi-appareils"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 52,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-mute",
							children: "Sans compte ni mot de passe"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 53,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 51,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 47,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: onClose,
						className: "flex size-7 items-center justify-center rounded-md text-mute hover:bg-paper hover:text-ink transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 61,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 56,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-4 grid grid-cols-2 gap-1 rounded-xl bg-paper p-1 text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("save"),
						className: `flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${activeTab === "save" ? "bg-sheet text-ink shadow-xs" : "text-mute hover:text-ink"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 74,
							columnNumber: 13
						}, this), "Sauvegarder ce CV"]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 67,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("load"),
						className: `flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${activeTab === "load" ? "bg-sheet text-ink shadow-xs" : "text-mute hover:text-ink"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 84,
							columnNumber: 13
						}, this), "Ouvrir sur cet appareil"]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 77,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 66,
					columnNumber: 9
				}, this),
				activeTab === "save" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-950",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 font-bold text-blue-900 mb-1",
							children: [/* @__PURE__ */ (void 0)(Smartphone, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 93,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Retrouvez votre CV sur mobile ou un autre PC" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 94,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 92,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] leading-relaxed text-blue-900/80",
							children: "Générez un code unique ou un lien direct pour continuer l'édition de votre CV instantanément sur n'importe quel autre appareil."
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 96,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 91,
						columnNumber: 13
					}, this), syncCode ? /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-line bg-paper p-3 text-center",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] font-bold tracking-widest text-mute uppercase",
										children: "Votre code secret"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 104,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-1 font-mono text-2xl font-black tracking-wider text-ink",
										children: syncCode
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 105,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-[10px] text-mute",
										children: "Entrez ce code sur votre téléphone ou autre ordinateur"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 108,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 103,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-medium text-mute",
									children: "Lien de synchronisation directe :"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 114,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)("input", {
										type: "text",
										readOnly: true,
										value: shareLink,
										className: "h-9 min-w-0 flex-1 rounded-lg border border-line bg-sheet px-2.5 font-mono text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 116,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: handleCopy,
										className: "flex h-9 items-center gap-1 rounded-lg bg-ink px-3 text-xs font-semibold text-cream hover:bg-neutral-800 transition",
										children: [copied ? /* @__PURE__ */ (void 0)(Check, {
											size: 13,
											className: "text-emerald-400"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 127,
											columnNumber: 33
										}, this) : /* @__PURE__ */ (void 0)(Copy, { size: 13 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 127,
											columnNumber: 84
										}, this), /* @__PURE__ */ (void 0)("span", { children: copied ? "Copié !" : "Copier" }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 128,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 122,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 115,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 113,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								disabled: loading,
								onClick: handleSyncNow,
								className: "flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-line bg-sheet text-xs font-semibold text-ink hover:bg-paper transition",
								children: [/* @__PURE__ */ (void 0)(RefreshCw, {
									size: 13,
									className: loading ? "animate-spin" : ""
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 139,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Mettre à jour les modifications dans le Cloud" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 140,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 133,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 102,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3 text-center py-2",
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							disabled: loading,
							onClick: handleSyncNow,
							className: "flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition",
							children: [/* @__PURE__ */ (void 0)(Cloud, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 151,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: loading ? "Génération du code..." : "Activer la synchronisation Cloud" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 152,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 145,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-mute",
							children: "Génère instantanément votre clé de synchronisation multi-appareils"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 154,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 144,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 90,
					columnNumber: 11
				}, this),
				activeTab === "load" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-mute",
							children: "Vous avez commencé votre CV sur un autre appareil ? Entrez ici le code de synchronisation à 6 caractères pour le charger immédiatement."
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 164,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("label", {
								className: "text-xs font-medium text-ink",
								children: "Code de synchronisation :"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 169,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								maxLength: 8,
								value: inputCode,
								onChange: (e) => setInputCode(e.target.value.toUpperCase()),
								placeholder: "Ex: A9F2B7",
								className: "h-12 w-full rounded-xl border border-line bg-sheet px-3 text-center font-mono text-xl font-bold tracking-widest text-ink uppercase outline-none focus:border-blue-600"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 170,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 168,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							disabled: loading || !inputCode.trim(),
							onClick: handleLoadCode,
							className: "flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-bold text-cream hover:bg-neutral-800 disabled:opacity-40 transition",
							children: [/* @__PURE__ */ (void 0)(Download, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 186,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", { children: loading ? "Recherche du CV..." : "Charger le CV depuis le Cloud" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 187,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 180,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 163,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 45,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 44,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/studio/MobileTouchEditor.tsx";
function MobileTouchEditor({ onSwitchToCanvas }) {
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const setIdentity = useStudio((s) => s.setIdentity);
	const addSectionPack = useStudio((s) => s.addSectionPack);
	const applyJobPreset = useStudio((s) => s.applyJobPreset);
	const applyPalette = useStudio((s) => s.applyPalette);
	const directPdfExport = useStudio((s) => s.directPdfExport);
	const boostElementText = useStudio((s) => s.boostElementText);
	const patchElement = useStudio((s) => s.patchElement);
	const [expandedSection, setExpandedSection] = (0, import_react.useState)("identity");
	const [pdfLoading, setPdfLoading] = (0, import_react.useState)(false);
	const profile = doc.profile;
	const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];
	const handlePhotoUpload = async (file) => {
		try {
			const src = await readImage(file);
			const photoEl = page.elements.find((e) => e.type === "photo");
			if (photoEl) patchElement(page.id, photoEl.id, { content: { src } });
			else useStudio.getState().addElement("photo");
			useStudio.getState().notify("Photo optimisée & ajoutée !");
		} catch {
			useStudio.getState().notify("Impossible de traiter cette photo");
		}
	};
	const handleDirectPdf = async () => {
		setPdfLoading(true);
		await directPdfExport();
		setPdfLoading(false);
	};
	const toggleSection = (sec) => {
		setExpandedSection(expandedSection === sec ? null : sec);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full w-full flex-col bg-paper text-ink overflow-y-auto pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sticky top-0 z-30 flex items-center justify-between border-b border-line bg-cream px-4 py-3 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-display text-sm font-bold tracking-wide",
					children: "MODE ÉDITION TACTILE"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 74,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-mute",
					children: "Modifiez facilement chaque rubrique au doigt"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 75,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 73,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: onSwitchToCanvas,
					className: "flex items-center gap-1.5 rounded-full border border-ink bg-ink px-3 py-1.5 text-xs font-bold text-cream shadow-sm hover:bg-neutral-800 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 13 }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 83,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Aperçu A4" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 84,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 78,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 72,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-3.5 space-y-3 max-w-lg mx-auto w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => useStudio.getState().setExtractorModalOpen(true),
						className: "flex w-full items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 p-3 shadow-xs text-left transition active:scale-[0.99]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheck, { size: 18 }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 97,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 96,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold text-emerald-950 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Importer un CV existant" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 101,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded bg-emerald-200 px-1 py-0.2 text-[9px] font-bold text-emerald-800",
									children: "PDF / Word"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 102,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 100,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-emerald-800/80",
								children: "Extrait automatiquement vos rubriques"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 106,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 99,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 95,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-bold text-emerald-700",
							children: "Ouvrir →"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 111,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 90,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-amber-300 bg-amber-50 p-3 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 text-xs font-bold text-amber-950",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, {
									size: 14,
									className: "text-amber-700"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 118,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Remplir par métier (Zéro page blanche)" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 119,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 117,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-semibold text-amber-800",
								children: "1 clic"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 121,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 116,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							onChange: (e) => {
								if (e.target.value) {
									applyJobPreset(e.target.value);
									e.target.value = "";
								}
							},
							defaultValue: "",
							className: "h-11 w-full rounded-xl border border-amber-300 bg-white px-3 text-xs font-semibold text-ink outline-none shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								disabled: true,
								children: "Choisir un métier pré-rédigé..."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 134,
								columnNumber: 13
							}, this), JOB_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: p.id,
								children: p.label
							}, p.id, false, {
								fileName: _jsxFileName$6,
								lineNumber: 138,
								columnNumber: 15
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 124,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 115,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => toggleSection("identity"),
							className: "flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-7 items-center justify-center rounded-lg bg-paper text-ink",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 154,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 153,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Identité & Coordonnées" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 156,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 152,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "identity" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 158,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 147,
							columnNumber: 11
						}, this), expandedSection === "identity" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-line p-3.5 space-y-3 bg-sheet",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3 rounded-xl border border-line bg-paper p-2.5",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "size-14 rounded-full bg-line/60 overflow-hidden flex items-center justify-center text-mute font-bold text-xs shrink-0",
										children: page.elements.find((e) => e.type === "photo")?.content?.src ? /* @__PURE__ */ (void 0)("img", {
											src: page.elements.find((e) => e.type === "photo")?.content?.src,
											alt: "Profil",
											className: "size-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 167,
											columnNumber: 21
										}, this) : /* @__PURE__ */ (void 0)(Image$1, { size: 20 }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 173,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 165,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold",
												children: "Photo de profil"
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 177,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-mute mb-1.5",
												children: "Compression automatique sans ralentissement"
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 178,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("label", {
												className: "inline-flex h-8 cursor-pointer items-center justify-center rounded-lg bg-ink px-3 text-xs font-bold text-cream hover:bg-neutral-800",
												children: ["Choisir photo", /* @__PURE__ */ (void 0)("input", {
													type: "file",
													accept: "image/*",
													className: "hidden",
													onChange: (e) => {
														const f = e.target.files?.[0];
														if (f) handlePhotoUpload(f);
														e.target.value = "";
													}
												}, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 181,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 179,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 176,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 164,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-[11px] font-semibold text-mute",
									children: "Nom complet"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 196,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: profile.name,
									onChange: (e) => setIdentity("name", e.target.value),
									className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 197,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 195,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-[11px] font-semibold text-mute",
									children: "Intitulé de poste cible"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 206,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: profile.role,
									onChange: (e) => setIdentity("role", e.target.value),
									className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 207,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 205,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Email"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 217,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "email",
										value: profile.email,
										onChange: (e) => setIdentity("email", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 218,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 216,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Téléphone"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 226,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "tel",
										value: profile.phone,
										onChange: (e) => setIdentity("phone", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 227,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 225,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 215,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Ville / Pays"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 238,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: profile.location,
										onChange: (e) => setIdentity("location", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 239,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 237,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Lien / LinkedIn"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 247,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: profile.link,
										onChange: (e) => setIdentity("link", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 248,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 246,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 236,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 162,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 146,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => toggleSection("summary"),
							className: "flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-7 items-center justify-center rounded-lg bg-paper text-ink",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 269,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 268,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Accroche & Bio professionnelle" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 271,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 267,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "summary" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 273,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 262,
							columnNumber: 11
						}, this), expandedSection === "summary" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-line p-3.5 space-y-2 bg-sheet",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-mute",
									children: "Présentation concise de votre profil :"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 279,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										const firstExp = page.elements.find((e) => e.type === "experience");
										if (firstExp) boostElementText(firstExp.id);
									},
									className: "flex items-center gap-1 rounded-lg bg-amber-400 px-2 py-1 text-[10px] font-bold text-black",
									children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 288,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "✨ Formuler pro" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 289,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 280,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 278,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								rows: 4,
								value: profile.summary,
								onChange: (e) => setIdentity("summary", e.target.value),
								className: "w-full rounded-xl border border-line bg-paper p-3 text-xs leading-relaxed text-ink outline-none"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 292,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 277,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 261,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => toggleSection("experiences"),
							className: "flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-7 items-center justify-center rounded-lg bg-paper text-ink",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 311,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 310,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Expériences (",
									page.elements.filter((e) => e.type === "experience").length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 313,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 309,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "experiences" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 315,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 304,
							columnNumber: 11
						}, this), expandedSection === "experiences" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-line p-3.5 space-y-3 bg-sheet",
							children: [page.elements.filter((e) => e.type === "experience").map((el, idx) => /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-line bg-paper p-3 space-y-2",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-ink",
											children: ["Poste #", idx + 1]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 325,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => boostElementText(el.id),
												className: "flex items-center gap-1 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-black",
												children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 332,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", { children: "✨ Chiffrer" }, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 333,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 327,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => {
													useStudio.getState().select([el.id]);
													useStudio.getState().deleteSelected();
												},
												className: "flex size-6 items-center justify-center rounded-md text-red-600 hover:bg-red-100",
												children: /* @__PURE__ */ (void 0)(Trash2, { size: 13 }, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 343,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 335,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 326,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 324,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("input", {
										type: "text",
										placeholder: "Intitulé du poste",
										value: el.content.role ?? "",
										onChange: (e) => patchElement(page.id, el.id, { content: { role: e.target.value } }),
										className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs font-semibold text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 348,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (void 0)("input", {
											type: "text",
											placeholder: "Entreprise",
											value: el.content.company ?? "",
											onChange: (e) => patchElement(page.id, el.id, { content: { company: e.target.value } }),
											className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 357,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											placeholder: "Dates",
											value: el.content.date ?? "",
											onChange: (e) => patchElement(page.id, el.id, { content: { date: e.target.value } }),
											className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 364,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 356,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("textarea", {
										rows: 3,
										placeholder: "Missions & réalisations chiffrées",
										value: el.content.desc ?? "",
										onChange: (e) => patchElement(page.id, el.id, { content: { desc: e.target.value } }),
										className: "w-full rounded-lg border border-line bg-sheet p-2.5 text-xs leading-relaxed text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 373,
										columnNumber: 21
									}, this)
								]
							}, el.id, true, {
								fileName: _jsxFileName$6,
								lineNumber: 323,
								columnNumber: 19
							}, this)), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => addSectionPack("pack-experience"),
								className: "flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/40 bg-paper text-xs font-bold text-ink hover:bg-cream transition",
								children: [/* @__PURE__ */ (void 0)(Plus, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 388,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "+ Ajouter une expérience chiffrée" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 389,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 383,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 319,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 303,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => toggleSection("educations"),
							className: "flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-7 items-center justify-center rounded-lg bg-paper text-ink",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 404,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 403,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Formations (",
									page.elements.filter((e) => e.type === "education").length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 406,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 402,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "educations" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 408,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 397,
							columnNumber: 11
						}, this), expandedSection === "educations" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-line p-3.5 space-y-3 bg-sheet",
							children: [page.elements.filter((e) => e.type === "education").map((el, idx) => /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-line bg-paper p-3 space-y-2",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-ink",
											children: ["Formation #", idx + 1]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 418,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												useStudio.getState().select([el.id]);
												useStudio.getState().deleteSelected();
											},
											className: "flex size-6 items-center justify-center rounded-md text-red-600 hover:bg-red-100",
											children: /* @__PURE__ */ (void 0)(Trash2, { size: 13 }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 427,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 419,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 417,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("input", {
										type: "text",
										placeholder: "Diplôme",
										value: el.content.degree ?? "",
										onChange: (e) => patchElement(page.id, el.id, { content: { degree: e.target.value } }),
										className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs font-semibold text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 431,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (void 0)("input", {
											type: "text",
											placeholder: "École / Université",
											value: el.content.school ?? "",
											onChange: (e) => patchElement(page.id, el.id, { content: { school: e.target.value } }),
											className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 440,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											placeholder: "Dates",
											value: el.content.date ?? "",
											onChange: (e) => patchElement(page.id, el.id, { content: { date: e.target.value } }),
											className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 447,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 439,
										columnNumber: 21
									}, this)
								]
							}, el.id, true, {
								fileName: _jsxFileName$6,
								lineNumber: 416,
								columnNumber: 19
							}, this)), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => addSectionPack("pack-education"),
								className: "flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/40 bg-paper text-xs font-bold text-ink hover:bg-cream transition",
								children: [/* @__PURE__ */ (void 0)(Plus, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 463,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "+ Ajouter une formation" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 464,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 458,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 412,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 396,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-line bg-sheet p-3.5 shadow-xs space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 text-xs font-bold text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 473,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Harmonies Couleurs (1 clic)" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 474,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 472,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-3 gap-2",
							children: COLOR_PALETTES.map((pal) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => applyPalette(pal.id),
								className: "flex flex-col items-center gap-1 rounded-xl border border-line bg-paper p-2 hover:border-ink transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-7 items-center justify-center rounded-full border border-line",
									style: { backgroundColor: pal.primary },
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "size-2.5 rounded-full",
										style: { backgroundColor: pal.accent }
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 488,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 484,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-medium text-ink truncate w-full text-center",
									children: pal.name.split("/")[0].trim()
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 490,
									columnNumber: 17
								}, this)]
							}, pal.id, true, {
								fileName: _jsxFileName$6,
								lineNumber: 478,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 476,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 471,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 88,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed bottom-0 inset-x-0 z-40 flex items-center justify-between border-t border-line bg-cream px-4 py-2.5 shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: onSwitchToCanvas,
					className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-sheet py-2.5 text-xs font-bold text-ink shadow-xs hover:bg-paper transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 15 }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 506,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Voir Planche A4" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 507,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 501,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					disabled: pdfLoading,
					onClick: handleDirectPdf,
					className: "ml-2 flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { size: 15 }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 516,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pdfLoading ? "Génération..." : "PDF Direct" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 517,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 510,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 500,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 70,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/studio/CvExtractorModal.tsx";
var SAMPLE_RAW_TEXT = `Jean-Baptiste Vasseur
Consultant Senior Data & IA
Paris, France • +33 6 42 18 90 12 • jb.vasseur@data-consulting.fr • linkedin.com/in/jb-vasseur

À PROPOS
Consultant avec 7 ans d'expérience dans le conseil stratégique en gouvernance de données et architecture cloud pour des clients CAC 40. Pilotage de programmes d'IA générative et de modernisation des entrepôts de données.

EXPÉRIENCE PROFESSIONNELLE
Senior Manager Data & Analytics
Atos Consulting — Paris
2021 — Aujourd'hui
• Direction d'un pôle de 12 consultants sur 4 missions d'accélération Data Cloud (Snowflake, AWS).
• Accroissement de 35% de la vélocité des livrables de reporting financier pour un groupe d'assurance.
• Animation de comités de direction et cadrage d'appels d'offres stratégiques (budget 1,2 M€).

Consultant Big Data & Business Intelligence
Wavestone — Paris
2018 — 2021
• Conception de pipelines ETL en Python/Airflow traitant plus de 500k transactions par jour.
• Modélisation de tableaux de bord Power BI utilisés quotidiennement par 150 décideurs.
• Réduction de 40% des incidents de qualité de données grâce à des tests automatisés.

FORMATION
Master 2 Big Data & Systèmes Décisionnels
Université Paris-Dauphine
2016 — 2018

Licence Mathématiques & Informatique
Sorbonne Université
2013 — 2016

COMPÉTENCES
Python, SQL Avancé, Snowflake, AWS, Databricks, Power BI, Dbt, Airflow, Docker, Conduite du changement

LANGUES
Français : Langue maternelle
Anglais : Courant C1 (Score TOEIC 945)
Espagnol : Intermédiaire B1`;
function CvExtractorModal() {
	const open = useStudio((s) => s.extractorModalOpen);
	const setOpen = useStudio((s) => s.setExtractorModalOpen);
	const importExtractedProfile = useStudio((s) => s.importExtractedProfile);
	const currentProfile = useStudio((s) => s.doc.profile);
	const [activeTab, setActiveTab] = (0, import_react.useState)("file");
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [rawText, setRawText] = (0, import_react.useState)("");
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("modern");
	const [showDetails, setShowDetails] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) setErrorMsg(null);
	}, [open]);
	if (!open) return null;
	const handleProcessFile = async (file) => {
		setSelectedFile(file);
		setErrorMsg(null);
		setIsProcessing(true);
		try {
			const res = await extractFromFile(file, currentProfile);
			setResult(res);
			setShowDetails(true);
		} catch (err) {
			console.error("Extraction error:", err);
			const msg = err instanceof Error ? err.message : "Impossible de lire le fichier";
			setErrorMsg(msg);
			setResult(null);
		} finally {
			setIsProcessing(false);
		}
	};
	const handleProcessText = (text) => {
		setRawText(text);
		setErrorMsg(null);
		if (!text.trim()) {
			setResult(null);
			return;
		}
		setIsProcessing(true);
		try {
			const res = extractFromText(text, currentProfile);
			setResult(res);
			setShowDetails(true);
		} catch (err) {
			console.error("Text extraction error:", err);
			const msg = err instanceof Error ? err.message : "Erreur lors de l'analyse du texte";
			setErrorMsg(msg);
			setResult(null);
		} finally {
			setIsProcessing(false);
		}
	};
	const applyExtracted = (asNewPage = false) => {
		if (!result) return;
		importExtractedProfile(result.profile, selectedTemplate, asNewPage);
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-xs",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-2xl border border-line bg-sheet text-ink shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-line bg-paper px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex size-9 items-center justify-center rounded-xl bg-signal font-bold text-signal-ink shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 18 }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 145,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 144,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display text-base font-bold tracking-tight",
								children: "Importateur & Extracteur de CV"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 149,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700",
								children: "CV_extractor 2026"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 152,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 148,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-mute",
							children: "Importez votre CV existant : extraction automatique des expériences, formations, compétences et coordonnées."
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 156,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 147,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 143,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setOpen(false),
						"aria-label": "Fermer",
						className: "flex size-8 items-center justify-center rounded-lg border border-line bg-sheet text-mute hover:bg-line/40 hover:text-ink transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 167,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 161,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 142,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-1.5 border-b border-line bg-cream/50 px-5 py-2 text-[11px] text-mute",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-ink",
						children: "Formats reconnus :"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 173,
						columnNumber: 11
					}, this), [
						"PDF (texte)",
						"Word .DOCX",
						"OpenDocument .ODT",
						"RTF",
						"HTML",
						"TXT brut"
					].map((fmt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-md border border-line/70 bg-sheet px-1.5 py-0.5 font-mono text-[10px] text-ink",
						children: fmt
					}, fmt, false, {
						fileName: _jsxFileName$5,
						lineNumber: 175,
						columnNumber: 13
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 172,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex border-b border-line bg-paper text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("file"),
						className: cn("flex flex-1 items-center justify-center gap-2 border-b-2 py-3 transition", activeTab === "file" ? "border-blue-600 bg-sheet text-blue-700" : "border-transparent text-mute hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 193,
							columnNumber: 13
						}, this), "Fichier (PDF, Word, ODT, TXT)"]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 183,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("text"),
						className: cn("flex flex-1 items-center justify-center gap-2 border-b-2 py-3 transition", activeTab === "text" ? "border-blue-600 bg-sheet text-blue-700" : "border-transparent text-mute hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 206,
							columnNumber: 13
						}, this), "Copier-Coller le texte brut"]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 196,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 182,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-5 space-y-4",
					children: [
						activeTab === "file" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								onDragOver: (e) => {
									e.preventDefault();
									setDragOver(true);
								},
								onDragLeave: () => setDragOver(false),
								onDrop: (e) => {
									e.preventDefault();
									setDragOver(false);
									const file = e.dataTransfer.files?.[0];
									if (file) handleProcessFile(file);
								},
								onClick: () => fileInputRef.current?.click(),
								className: cn("flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all", dragOver ? "border-blue-600 bg-signal/5 scale-[0.99]" : "border-line bg-sheet hover:border-blue-600/50 hover:bg-cream/40"),
								children: [
									/* @__PURE__ */ (void 0)("input", {
										ref: fileInputRef,
										type: "file",
										accept: ".pdf,.docx,.odt,.rtf,.html,.htm,.txt",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) handleProcessFile(f);
											e.target.value = "";
										}
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 236,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "flex size-12 items-center justify-center rounded-2xl bg-signal/10 text-blue-700 mb-2",
										children: /* @__PURE__ */ (void 0)(Upload, { size: 24 }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 249,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 248,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-sm font-bold text-ink",
										children: ["Glissez-déposez votre CV ici, ou ", /* @__PURE__ */ (void 0)("span", {
											className: "text-blue-700 underline",
											children: "cliquez pour parcourir"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 252,
											columnNumber: 52
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 251,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-mute",
										children: "Sélectionnez un document PDF, DOCX, ODT ou TXT (jusqu'à 12 Mo)."
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 254,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 216,
								columnNumber: 15
							}, this), selectedFile && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between rounded-xl border border-line bg-paper px-3.5 py-2 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [
										/* @__PURE__ */ (void 0)(FileType, {
											size: 16,
											className: "text-blue-700 shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 262,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-ink truncate",
											children: selectedFile.name
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 263,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-mute font-mono",
											children: [
												"(",
												(selectedFile.size / 1024).toFixed(1),
												" Ko)"
											]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 264,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 261,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										handleProcessFile(selectedFile);
									},
									disabled: isProcessing,
									className: "flex items-center gap-1 font-semibold text-blue-700 hover:underline disabled:opacity-50",
									children: "Ré-analyser"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 268,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 260,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 215,
							columnNumber: 13
						}, this),
						activeTab === "text" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-xs font-semibold text-ink",
									children: "Texte brut de votre CV ou profil LinkedIn :"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 288,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => handleProcessText(SAMPLE_RAW_TEXT),
									className: "text-xs font-semibold text-blue-700 hover:underline",
									children: "Charger un exemple type →"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 291,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 287,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								value: rawText,
								onChange: (e) => handleProcessText(e.target.value),
								rows: 7,
								placeholder: "Collez ici le texte brut de votre CV ou résumé LinkedIn...",
								className: "w-full resize-none rounded-xl border border-line bg-sheet p-3 font-mono text-xs leading-relaxed text-ink outline-none focus:border-blue-600"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 299,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 286,
							columnNumber: 13
						}, this),
						isProcessing && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-center gap-3 rounded-xl border border-blue-600/20 bg-signal/5 p-4 text-xs font-semibold text-blue-700",
							children: [/* @__PURE__ */ (void 0)(LoaderCircle, {
								size: 16,
								className: "animate-spin"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 312,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Extraction intelligente des entités en cours..." }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 313,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 311,
							columnNumber: 13
						}, this),
						errorMsg && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-700",
							children: [/* @__PURE__ */ (void 0)(TriangleAlert, {
								size: 16,
								className: "shrink-0 mt-0.5 text-red-600"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 320,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "font-bold",
								children: "Erreur de lecture"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 322,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: errorMsg }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 323,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 321,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 319,
							columnNumber: 13
						}, this),
						result && !isProcessing && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 rounded-xl border border-line bg-paper p-4",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(CircleCheck, {
											size: 18,
											className: "text-emerald-600"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 333,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-display text-sm font-bold text-ink",
											children: "Données extraites avec succès"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 334,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 332,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setShowDetails(!showDetails),
										className: "flex items-center gap-1 text-xs font-semibold text-mute hover:text-ink",
										children: [/* @__PURE__ */ (void 0)("span", { children: showDetails ? "Masquer détails" : "Voir détails" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 343,
											columnNumber: 19
										}, this), showDetails ? /* @__PURE__ */ (void 0)(ChevronUp, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 344,
											columnNumber: 34
										}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 344,
											columnNumber: 60
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 338,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 331,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-line bg-sheet p-3 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex flex-wrap items-baseline justify-between gap-1",
											children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
												className: "font-display text-base font-bold text-ink",
												children: result.profile.name
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 352,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-xs font-semibold text-blue-700",
												children: result.profile.role
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 355,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 351,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex flex-wrap gap-1 text-[11px] text-mute",
												children: [
													result.profile.email && /* @__PURE__ */ (void 0)("span", { children: ["✉ ", result.profile.email] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 360,
														columnNumber: 46
													}, this),
													result.profile.phone && /* @__PURE__ */ (void 0)("span", { children: ["• ☎ ", result.profile.phone] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 361,
														columnNumber: 46
													}, this),
													result.profile.location && /* @__PURE__ */ (void 0)("span", { children: ["• 📍 ", result.profile.location] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 362,
														columnNumber: 49
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 359,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 350,
											columnNumber: 17
										}, this),
										result.profile.summary && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-mute line-clamp-2 italic",
											children: [
												"\"",
												result.profile.summary,
												"\""
											]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 367,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-line/60",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(Briefcase, {
														size: 14,
														className: "text-blue-700"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 375,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.experiencesCount
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 377,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Expériences"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 378,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 376,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 374,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(GraduationCap, {
														size: 14,
														className: "text-blue-700"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 382,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.educationsCount
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 384,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Formations"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 385,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 383,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 381,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(Tags, {
														size: 14,
														className: "text-blue-700"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 389,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.skillsCount
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 391,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Compétences"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 392,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 390,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 388,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(Languages, {
														size: 14,
														className: "text-blue-700"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 396,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.languagesCount
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 398,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Langues"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 399,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 397,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 395,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 373,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 349,
									columnNumber: 15
								}, this),
								showDetails && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3 pt-2 text-xs",
									children: [
										result.profile.experiences.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-bold text-ink mb-1",
											children: "Expériences détectées :"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 411,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5 max-h-36 overflow-y-auto pr-1",
											children: result.profile.experiences.map((exp, i) => /* @__PURE__ */ (void 0)("div", {
												className: "rounded-lg border border-line bg-sheet p-2",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "flex justify-between font-semibold text-ink",
														children: [/* @__PURE__ */ (void 0)("span", { children: exp.role }, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 416,
															columnNumber: 31
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "text-[10px] text-mute font-mono",
															children: exp.date
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 417,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 415,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "text-[11px] text-mute",
														children: exp.company
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 419,
														columnNumber: 29
													}, this),
													exp.desc && /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute/80 line-clamp-2 mt-0.5",
														children: exp.desc
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 421,
														columnNumber: 31
													}, this)
												]
											}, i, true, {
												fileName: _jsxFileName$5,
												lineNumber: 414,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 412,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 410,
											columnNumber: 21
										}, this),
										result.profile.educations.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-bold text-ink mb-1",
											children: "Formations & Diplômes :"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 434,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5 max-h-28 overflow-y-auto pr-1",
											children: result.profile.educations.map((edu, i) => /* @__PURE__ */ (void 0)("div", {
												className: "rounded-lg border border-line bg-sheet p-2 flex justify-between",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
													className: "font-semibold text-ink",
													children: edu.degree
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 439,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-mute",
													children: edu.school
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 440,
													columnNumber: 31
												}, this)] }, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 438,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-mute font-mono",
													children: edu.date
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 442,
													columnNumber: 29
												}, this)]
											}, i, true, {
												fileName: _jsxFileName$5,
												lineNumber: 437,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 435,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 433,
											columnNumber: 21
										}, this),
										result.profile.skills.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-bold text-ink mb-1",
											children: "Compétences extraites :"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 452,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-wrap gap-1",
											children: result.profile.skills.map((s, i) => /* @__PURE__ */ (void 0)("span", {
												className: "rounded-md border border-line bg-sheet px-2 py-0.5 text-[11px] font-medium text-ink",
												children: s
											}, i, false, {
												fileName: _jsxFileName$5,
												lineNumber: 455,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 453,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 451,
											columnNumber: 21
										}, this),
										result.warnings.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] text-amber-800 space-y-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "font-bold flex items-center gap-1",
												children: [/* @__PURE__ */ (void 0)(TriangleAlert, { size: 12 }, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 470,
													columnNumber: 25
												}, this), "Observations :"]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 469,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("ul", {
												className: "list-disc pl-4 space-y-0.5",
												children: result.warnings.map((w, idx) => /* @__PURE__ */ (void 0)("li", { children: w }, idx, false, {
													fileName: _jsxFileName$5,
													lineNumber: 475,
													columnNumber: 27
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 473,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 468,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 407,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "pt-2 border-t border-line space-y-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-ink",
											children: "Choisir la mise en page de destination :"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 486,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] text-mute",
											children: "Format A4 Haute Définition"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 489,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 485,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-3 sm:grid-cols-6 gap-1.5",
										children: TEMPLATES.map((tpl) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setSelectedTemplate(tpl.id),
											className: cn("rounded-xl border p-2 text-center transition", selectedTemplate === tpl.id ? "border-blue-600 bg-signal/10 font-bold text-blue-700 shadow-xs" : "border-line bg-sheet text-mute hover:border-ink hover:text-ink"),
											children: /* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold leading-tight",
												children: tpl.name
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 504,
												columnNumber: 23
											}, this)
										}, tpl.id, false, {
											fileName: _jsxFileName$5,
											lineNumber: 493,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 491,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 484,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 330,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 212,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 border-t border-line bg-paper p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "rounded-xl border border-line bg-sheet px-4 py-2 text-xs font-semibold text-mute hover:text-ink transition",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 515,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							disabled: !result || isProcessing,
							onClick: () => applyExtracted(true),
							className: "flex items-center gap-1.5 rounded-xl border border-line bg-sheet px-4 py-2.5 text-xs font-semibold text-ink hover:bg-cream disabled:opacity-40 transition",
							title: "Ajoute une nouvelle page avec ce profil sans toucher à la page actuelle",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 531,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Créer une nouvelle page" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 532,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 524,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							disabled: !result || isProcessing,
							onClick: () => applyExtracted(false),
							className: "flex items-center gap-1.5 rounded-xl bg-signal px-5 py-2.5 text-xs font-bold text-signal-ink shadow-sm hover:bg-signal/90 disabled:opacity-40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheck, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 541,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Appliquer sur le CV (1 clic)" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 542,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 535,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 523,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 514,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 140,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 139,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/studio/OnboardingFlow.tsx";
function OnboardingFlow() {
	const setOnboarding = useStudio((s) => s.setOnboarding);
	const setEditorMode = useStudio((s) => s.setEditorMode);
	const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
	const loadDocument = useStudio((s) => s.loadDocument);
	const applyTemplate = useStudio((s) => s.applyTemplate);
	const setIdentity = useStudio((s) => s.setIdentity);
	const activeTemplate = useStudio((s) => s.activeTemplate);
	const doc = useStudio((s) => s.doc);
	const [startMode, setStartMode] = (0, import_react.useState)("guided");
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)(activeTemplate);
	const [selectedPresetId, setSelectedPresetId] = (0, import_react.useState)("designer");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const selectedPreset = JOB_PRESETS.find((preset) => preset.id === selectedPresetId) ?? JOB_PRESETS[0];
	const typedName = `${firstName} ${lastName}`.trim();
	const previewProfile = (0, import_react.useMemo)(() => ({
		...startMode === "example" ? selectedPreset.profile : doc.profile,
		name: startMode === "example" ? selectedPreset.profile.name : typedName || doc.profile.name || "Votre nom",
		role: startMode === "example" ? selectedPreset.profile.role : role.trim() || doc.profile.role || "Votre métier"
	}), [
		doc.profile,
		role,
		selectedPreset.profile,
		startMode,
		typedName
	]);
	const pageFor = (templateId, prefix) => ({
		id: prefix,
		name: "Aperçu",
		background: "#ffffff",
		elements: buildTemplate(templateId, previewProfile, prefix)
	});
	const launchEditor = () => {
		if (startMode === "import") {
			if (selectedTemplate !== activeTemplate) applyTemplate(selectedTemplate);
			setEditorMode("guided");
			setOnboarding(false);
			setExtractorModalOpen(true);
			return;
		}
		if (startMode === "example") {
			const profile = structuredClone(selectedPreset.profile);
			loadDocument({
				...doc,
				profile
			});
			applyTemplate(selectedTemplate);
			setOnboarding(false);
			setEditorMode("guided");
			return;
		}
		if (typedName) setIdentity("name", typedName);
		if (role.trim()) setIdentity("role", role.trim());
		if (selectedTemplate !== activeTemplate) applyTemplate(selectedTemplate);
		setOnboarding(false);
		setEditorMode("guided");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "cv-onboarding-shell min-h-dvh w-full overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "cv-brandbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "cv-wordmark",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "cv-wordmark-mark",
						children: "L."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 78,
						columnNumber: 38
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["LIBRE ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "cv-brand-suffix",
						children: "CV STUDIO"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 78,
						columnNumber: 94
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 78,
						columnNumber: 82
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 78,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "cv-brand-progress",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "cv-progress-dot" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 79,
						columnNumber: 44
					}, this), " Votre CV · brouillon"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 79,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: launchEditor,
					className: "cv-header-action",
					children: ["Ouvrir le studio ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { size: 15 }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 80,
						columnNumber: 100
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 80,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 77,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "cv-workbench",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "cv-workspace-main",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "cv-workspace-heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "cv-eyebrow",
								children: ["ATELIER DE CRÉATION ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "01 — 01" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 86,
									columnNumber: 61
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 86,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: ["Votre CV, ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("em", { children: "à votre façon." }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 87,
								columnNumber: 27
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 87,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Partez de ce que vous avez. Le contenu et la mise en page restent modifiables ensemble." }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 88,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 85,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "cv-start-panel",
						"aria-labelledby": "start-heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "cv-section-title",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "01" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 92,
									columnNumber: 47
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									id: "start-heading",
									children: "Qu’avez-vous déjà ?"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 92,
									columnNumber: 67
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Vous pourrez changer de méthode dans l’éditeur." }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 92,
									columnNumber: 114
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 92,
									columnNumber: 62
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 92,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "cv-start-options",
								role: "group",
								"aria-label": "Point de départ",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										"aria-pressed": startMode === "import",
										onClick: () => setStartMode("import"),
										className: `cv-start-option ${startMode === "import" ? "is-selected" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileUp, { size: 18 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 95,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Un CV à refaire" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 95,
												columnNumber: 43
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { children: "Importer ou coller son contenu" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 95,
												columnNumber: 65
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$4,
												lineNumber: 95,
												columnNumber: 37
											}, this),
											startMode === "import" && /* @__PURE__ */ (void 0)(Check, { size: 16 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 95,
												columnNumber: 144
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 94,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										"aria-pressed": startMode === "guided",
										onClick: () => setStartMode("guided"),
										className: `cv-start-option ${startMode === "guided" ? "is-selected" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDownToLine, { size: 18 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 98,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Quelques infos" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 98,
												columnNumber: 52
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { children: "Être guidé pour le construire" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 98,
												columnNumber: 73
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$4,
												lineNumber: 98,
												columnNumber: 46
											}, this),
											startMode === "guided" && /* @__PURE__ */ (void 0)(Check, { size: 16 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 98,
												columnNumber: 151
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 97,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										"aria-pressed": startMode === "example",
										onClick: () => setStartMode("example"),
										className: `cv-start-option ${startMode === "example" ? "is-selected" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 18 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 101,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Besoin d’un exemple" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 101,
												columnNumber: 45
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { children: "Partir d’un parcours fictif" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 101,
												columnNumber: 71
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$4,
												lineNumber: 101,
												columnNumber: 39
											}, this),
											startMode === "example" && /* @__PURE__ */ (void 0)(Check, { size: 16 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 101,
												columnNumber: 148
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 100,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 93,
								columnNumber: 13
							}, this),
							startMode === "guided" && /* @__PURE__ */ (void 0)("div", {
								className: "cv-start-fields",
								children: [
									/* @__PURE__ */ (void 0)("label", { children: ["PRÉNOM", /* @__PURE__ */ (void 0)("input", {
										value: firstName,
										onChange: (event) => setFirstName(event.target.value),
										placeholder: "Ex. Alex"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 106,
										columnNumber: 30
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 106,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("label", { children: ["NOM", /* @__PURE__ */ (void 0)("input", {
										value: lastName,
										onChange: (event) => setLastName(event.target.value),
										placeholder: "Ex. Martin"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 107,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 107,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("label", {
										className: "cv-field-wide",
										children: ["MÉTIER OU POSTE VISÉ", /* @__PURE__ */ (void 0)("input", {
											value: role,
											onChange: (event) => setRole(event.target.value),
											placeholder: "Ex. architecte, infirmier…"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 108,
											columnNumber: 70
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 108,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 105,
								columnNumber: 15
							}, this),
							startMode === "example" && /* @__PURE__ */ (void 0)("label", {
								className: "cv-preset-field",
								children: ["CHOISIR UN EXEMPLE", /* @__PURE__ */ (void 0)("select", {
									value: selectedPresetId,
									onChange: (event) => setSelectedPresetId(event.target.value),
									children: JOB_PRESETS.map((preset) => /* @__PURE__ */ (void 0)("option", {
										value: preset.id,
										children: preset.label
									}, preset.id, false, {
										fileName: _jsxFileName$4,
										lineNumber: 114,
										columnNumber: 48
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 113,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 112,
								columnNumber: 15
							}, this),
							startMode === "import" && /* @__PURE__ */ (void 0)("p", {
								className: "cv-import-hint",
								children: "Votre fichier sera importé dans cet atelier. Vous pourrez corriger le texte et refaire toute la mise en page ensuite."
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 118,
								columnNumber: 40
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 91,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "cv-model-section",
						"aria-labelledby": "models-heading",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "cv-section-title",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "02" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 122,
									columnNumber: 47
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									id: "models-heading",
									children: "Choisissez une base visuelle"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 122,
									columnNumber: 67
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Ce sont des modèles de départ, pas des cadres figés." }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 122,
									columnNumber: 124
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 122,
									columnNumber: 62
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "cv-model-count",
									children: [TEMPLATES.length, " MODÈLES"]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 122,
									columnNumber: 189
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 122,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "cv-template-gallery",
							children: TEMPLATES.map((template) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setSelectedTemplate(template.id),
								"aria-pressed": selectedTemplate === template.id,
								className: `cv-template-card ${selectedTemplate === template.id ? "is-selected" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "cv-template-thumb",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "cv-sheet-scale-thumb",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
											page: pageFor(template.id, `gallery-${template.id}`),
											interactive: false,
											selectedIds: [],
											editingId: null,
											showGrid: false,
											showMargins: false,
											guides: {
												x: [],
												y: []
											},
											marquee: null
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 126,
											columnNumber: 113
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 126,
										columnNumber: 74
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 126,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "cv-template-caption",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: template.name }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 127,
											columnNumber: 57
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { children: template.note }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 127,
											columnNumber: 79
										}, this),
										selectedTemplate === template.id && /* @__PURE__ */ (void 0)(Check, { size: 15 }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 127,
											columnNumber: 146
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 127,
									columnNumber: 19
								}, this)]
							}, template.id, true, {
								fileName: _jsxFileName$4,
								lineNumber: 125,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 123,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 121,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 84,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "cv-preview-column",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "cv-preview-sticky",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "cv-preview-heading",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", {}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 136,
								columnNumber: 55
							}, this), " APERÇU EN DIRECT"] }, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 136,
								columnNumber: 49
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { children: ["A4 · ", TEMPLATES.find((template) => template.id === selectedTemplate)?.name] }, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 136,
								columnNumber: 84
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 136,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "cv-preview-stage",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "cv-sheet-scale-live",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
									page: pageFor(selectedTemplate, `live-${selectedTemplate}`),
									interactive: false,
									selectedIds: [],
									editingId: null,
									showGrid: false,
									showMargins: false,
									guides: {
										x: [],
										y: []
									},
									marquee: null
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 137,
									columnNumber: 85
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 137,
								columnNumber: 47
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 137,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "cv-preview-caption",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: previewProfile.name }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 138,
								columnNumber: 49
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: previewProfile.role }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 138,
								columnNumber: 77
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 138,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: launchEditor,
							className: "cv-continue-button",
							children: [startMode === "import" ? "Importer mon CV" : "Continuer dans l’éditeur", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { size: 17 }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 139,
								columnNumber: 162
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 139,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "cv-free-note",
							children: "Le mode guidé et les réglages libres restent accessibles dans le même CV."
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 140,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 135,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 134,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 83,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 76,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/studio/ReadabilityModal.tsx";
function ReadabilityModal() {
	const open = useStudio((s) => s.readabilityModalOpen);
	const pendingExportConfirm = useStudio((s) => s.pendingExportConfirm);
	const doc = useStudio((s) => s.doc);
	const editorMode = useStudio((s) => s.editorMode);
	const paginationBlocked = useStudio((s) => s.paginationBlocked);
	const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
	const focusAuditIssue = useStudio((s) => s.focusAuditIssue);
	const paginateDocument = useStudio((s) => s.paginateDocument);
	const compactSpacing = useStudio((s) => s.compactSpacing);
	const setEditorMode = useStudio((s) => s.setEditorMode);
	const deletePage = useStudio((s) => s.deletePage);
	const directPdfExport = useStudio((s) => s.directPdfExport);
	const audit = (0, import_react.useMemo)(() => auditDocument(doc, {
		editorMode,
		paginationBlocked
	}), [
		doc,
		editorMode,
		paginationBlocked
	]);
	if (!open) return null;
	const actionableIssues = audit.issues.filter((i) => i.severity === "critical" || i.severity === "warning");
	const infoIssues = audit.issues.filter((i) => i.severity === "info");
	const handleViewBlock = (issue) => {
		setReadabilityModalOpen(false);
		focusAuditIssue(issue);
	};
	const handleAdjustInStudio = (issue) => {
		setReadabilityModalOpen(false);
		setEditorMode("pro");
		focusAuditIssue(issue);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		"data-testid": "readability-modal",
		className: "fixed inset-0 z-[190] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 no-print",
		onClick: () => setReadabilityModalOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-2xl bg-[#fbf8f2] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[86vh]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-4 bg-stone-900 text-[#f6f3ec] flex items-center justify-between shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-2.5 h-2.5 rounded-full bg-[#ff4f1f]" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 54,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-base font-bold tracking-tight",
							children: "Contrôle avant export"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 55,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 53,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-stone-300 mt-0.5",
						children: pendingExportConfirm ? "Des alertes de mise en page ont été détectées avant la génération du PDF." : "Vérification de la pagination A4, des débordements et de la lisibilité de votre CV."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 57,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 52,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setReadabilityModalOpen(false),
						className: "w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold cursor-pointer",
						title: "Fermer",
						children: "✕"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 63,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 overflow-y-auto space-y-4 flex-1",
					children: [actionableIssues.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						"data-testid": "readability-clean-state",
						className: "p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0",
							children: "✓"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 80,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold",
							children: "Aucun problème de débordement ni de lisibilité détecté"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 84,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-emerald-800 mt-1 leading-relaxed",
							children: "Toutes vos pages respectent le format A4 (1123 px), aucun texte n’est coupé ou en chevauchement, et les tailles de police ainsi que les contrastes sont conformes."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 85,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 83,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 76,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs font-semibold text-stone-700",
						children: actionableIssues.length === 1 ? "1 alerte détectée :" : `${actionableIssues.length} alertes détectées :`
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 92,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: actionableIssues.map((issue) => {
							const isCrit = issue.severity === "critical";
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-testid": `readability-issue-${issue.kind}`,
								className: `p-4 rounded-xl border ${isCrit ? "bg-red-50/75 border-red-200 text-red-950" : "bg-amber-50/75 border-amber-200 text-amber-950"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start justify-between gap-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: `px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${isCrit ? "bg-red-600 text-white" : "bg-amber-600 text-white"}`,
													children: isCrit ? "Critique" : "Lisibilité"
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 114,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[11px] font-semibold opacity-75",
													children: ["Page ", issue.pageNumber]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 121,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 113,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-sm font-bold leading-snug",
												children: ["• ", issue.message]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 125,
												columnNumber: 27
											}, this),
											issue.detail && /* @__PURE__ */ (void 0)("p", {
												className: "text-xs opacity-80 leading-relaxed",
												children: issue.detail
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 127,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 112,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 111,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 pt-2.5 border-t border-current/10 flex flex-wrap items-center gap-2",
									children: [
										issue.elementIds.length > 0 && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											"data-testid": "readability-view-block-btn",
											onClick: () => handleViewBlock(issue),
											className: "px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer",
											children: issue.elementIds.length > 1 ? "Voir les blocs" : "Voir le bloc"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 134,
											columnNumber: 27
										}, this),
										issue.actions.includes("paginate") && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											"data-testid": "readability-paginate-btn",
											onClick: () => paginateDocument(),
											className: "px-2.5 py-1 rounded-md text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition cursor-pointer",
											children: "Répartir sur les pages suivantes"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 145,
											columnNumber: 27
										}, this),
										issue.actions.includes("compact-spacing") && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											"data-testid": "readability-compact-btn",
											onClick: () => compactSpacing(issue.pageId),
											className: "px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer",
											children: "Réduire l’espacement"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 156,
											columnNumber: 27
										}, this),
										issue.actions.includes("delete-empty-page") && doc.pages.length > 1 && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => deletePage(issue.pageId),
											className: "px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer",
											children: "Supprimer la page vide"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 167,
											columnNumber: 27
										}, this),
										issue.actions.includes("adjust-studio") && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											"data-testid": "readability-adjust-studio-btn",
											onClick: () => handleAdjustInStudio(issue),
											className: "px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer",
											children: issue.kind === "overlap" ? "Ajuster dans le Studio" : "Ajuster manuellement"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 177,
											columnNumber: 27
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 132,
									columnNumber: 23
								}, this)]
							}, issue.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 102,
								columnNumber: 21
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 98,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 91,
						columnNumber: 13
					}, this), infoIssues.map((info) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-3.5 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 text-xs flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: info.message }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 199,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleAdjustInStudio(info),
							className: "px-2.5 py-1 rounded-md font-semibold bg-white border border-stone-300 hover:bg-stone-50 cursor-pointer",
							children: "Ouvrir le Studio"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 200,
							columnNumber: 15
						}, this)]
					}, info.id, true, {
						fileName: _jsxFileName$3,
						lineNumber: 195,
						columnNumber: 13
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 74,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"data-testid": "readability-fix-before-export-btn",
						onClick: () => {
							setReadabilityModalOpen(false);
							if (actionableIssues[0]) focusAuditIssue(actionableIssues[0]);
						},
						className: "px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition cursor-pointer",
						children: "Corriger avant l’export"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 213,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"data-testid": "readability-export-anyway-btn",
						onClick: () => {
							setReadabilityModalOpen(false);
							directPdfExport();
						},
						className: "px-4 py-2 rounded-lg text-xs font-bold bg-[#ff4f1f] text-white hover:bg-[#e54215] transition shadow-xs cursor-pointer",
						children: actionableIssues.length > 0 ? "Exporter quand même" : "Exporter en PDF"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 227,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 212,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 46,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 41,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/studio/PlainTextModal.tsx";
function PlainTextModal() {
	const open = useStudio((s) => s.plainTextModalOpen);
	const doc = useStudio((s) => s.doc);
	const setPlainTextModalOpen = useStudio((s) => s.setPlainTextModalOpen);
	const notify = useStudio((s) => s.notify);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const preview = (0, import_react.useMemo)(() => generatePlainTextPreview(doc), [doc]);
	if (!open) return null;
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(preview.text);
			setCopied(true);
			notify("✓ Texte brut copié dans le presse-papiers");
			window.setTimeout(() => setCopied(false), 2e3);
		} catch {
			const textarea = document.getElementById("plain-text-ats-area");
			if (textarea) {
				textarea.select();
				document.execCommand("copy");
				setCopied(true);
				notify("✓ Texte brut copié");
				window.setTimeout(() => setCopied(false), 2e3);
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		"data-testid": "plain-text-modal",
		className: "fixed inset-0 z-[190] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 no-print",
		onClick: () => setPlainTextModalOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-2xl bg-[#fbf8f2] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[86vh]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-4 bg-stone-900 text-[#f6f3ec] flex items-center justify-between shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 48,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-base font-bold tracking-tight",
							children: "Aperçu texte brut (lecture ATS)"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 49,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 47,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-stone-300 mt-0.5",
						children: "Texte extrait dans l’ordre de lecture visuel réel, tel qu’un logiciel de tri (ATS) l’analysera."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 51,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 46,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setPlainTextModalOpen(false),
						className: "w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold cursor-pointer",
						title: "Fermer",
						children: "✕"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 55,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 45,
					columnNumber: 9
				}, this),
				preview.readingOrderWarnings.length > 0 && /* @__PURE__ */ (void 0)("div", {
					"data-testid": "plain-text-order-warning",
					className: "px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-950 text-xs space-y-1 shrink-0",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "font-bold",
						children: "⚠️ Attention à l’ordre de lecture visuel :"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 71,
						columnNumber: 13
					}, this), preview.readingOrderWarnings.map((w, idx) => /* @__PURE__ */ (void 0)("div", {
						className: "leading-relaxed",
						children: ["• ", w]
					}, idx, true, {
						fileName: _jsxFileName$2,
						lineNumber: 73,
						columnNumber: 15
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 67,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 flex-1 flex flex-col min-h-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-stone-500",
							children: [
								"Flux linéaire (",
								doc.pages.length,
								" ",
								doc.pages.length > 1 ? "pages" : "page",
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 83,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] text-stone-500",
							children: "Formes décoratives ignorées • Blocs liés et blocs libres textuels inclus"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 86,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 82,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						id: "plain-text-ats-area",
						"data-testid": "plain-text-content",
						readOnly: true,
						value: preview.text,
						rows: 16,
						className: "w-full flex-1 min-h-[300px] p-4 rounded-xl bg-white border border-stone-300 font-mono text-xs text-stone-900 leading-relaxed focus:outline-none focus:border-stone-500 resize-none"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 91,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 81,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setPlainTextModalOpen(false),
						className: "px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition cursor-pointer",
						children: "Fermer"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 103,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"data-testid": "copy-plain-text-btn",
						onClick: handleCopy,
						className: "px-4 py-2 rounded-lg text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs cursor-pointer",
						children: copied ? "✓ Texte copié !" : "Copier le texte"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 111,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 102,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 40,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
function computeCVHealth(doc, activePageId) {
	const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];
	const elements = page ? page.elements.filter((e) => !e.hidden) : [];
	const profile = doc.profile;
	const hasName = Boolean(profile.name && profile.name.trim().length > 3) || elements.some((e) => e.type === "heading" && Boolean(e.content.text && e.content.text.trim().length > 3));
	const hasRole = Boolean(profile.role && profile.role.trim().length > 2) || elements.some((e) => e.bind?.kind === "role" || e.type === "text" && e.y < 160 && Boolean(e.content.text));
	const hasEmail = Boolean(profile.email && profile.email.includes("@")) || elements.some((e) => e.type === "contact" && e.content.icon === "mail" && e.content.text?.includes("@"));
	const hasPhone = Boolean(profile.phone && profile.phone.replace(/\D/g, "").length >= 8) || elements.some((e) => e.type === "contact" && e.content.icon === "phone");
	const contactOk = hasEmail && hasPhone;
	const hasSummary = Boolean(profile.summary && profile.summary.trim().length >= 35) || elements.some((e) => e.type === "text" && (e.content.text?.length ?? 0) >= 40);
	const expElements = elements.filter((e) => e.type === "experience");
	const hasMinExp = Math.max(profile.experiences.length, expElements.length) >= 2;
	const hasDetailedExp = expElements.some((e) => Boolean(e.content.desc && (e.content.desc.includes("%") || e.content.desc.length > 80))) || profile.experiences.some((e) => Boolean(e.desc && (e.desc.includes("%") || e.desc.length > 80)));
	const hasSkills = (elements.find((e) => e.type === "skills")?.content.items?.length ?? profile.skills.length) >= 3;
	const hasEducation = (elements.filter((e) => e.type === "education").length || profile.educations.length) >= 1;
	const hasLanguages = elements.filter((e) => e.type === "meters").length > 0 || profile.languages.length > 0;
	const items = [
		{
			id: "name",
			label: "Nom & Prénom renseignés",
			passed: hasName,
			hint: "Le recruteur doit vous identifier dès les 3 premières secondes.",
			actionText: "Renseigner"
		},
		{
			id: "role",
			label: "Intitulé de poste précis",
			passed: hasRole,
			hint: "Un titre clair (ex: 'Product Designer Senior' plutôt que juste 'Designer').",
			actionText: "Ajouter un titre"
		},
		{
			id: "contact",
			label: "Coordonnées de contact (Email + Tél)",
			passed: contactOk,
			hint: "Email professionnel et numéro de téléphone mobile indispensables.",
			actionText: "Compléter contact"
		},
		{
			id: "summary",
			label: "Bio / Accroche professionnelle",
			passed: hasSummary,
			hint: "2 à 3 phrases percutantes résumant vos forces et votre valeur ajoutée.",
			actionText: "Rédiger l'accroche"
		},
		{
			id: "experiences",
			label: "Au moins 2 expériences avec réalisations",
			passed: hasMinExp,
			hint: "Structurez avec poste, entreprise, dates et missions concrètes.",
			actionText: "Ajouter un poste"
		},
		{
			id: "metrics",
			label: "Puces de résultats chiffrés (+20%, 500k€)",
			passed: hasDetailedExp,
			hint: "Les chiffres attirent l'œil et prouvent l'impact réel de vos actions.",
			actionText: "✨ Chiffrer avec l'IA"
		},
		{
			id: "skills",
			label: "Compétences clés (au moins 3)",
			passed: hasSkills,
			hint: "Mots-clés recherchés par les recruteurs et les algorithmes ATS.",
			actionText: "Ajouter des skills"
		},
		{
			id: "education",
			label: "Formation ou diplôme",
			passed: hasEducation,
			hint: "Mentionnez votre niveau d'études ou vos certifications.",
			actionText: "Ajouter formation"
		},
		{
			id: "languages",
			label: "Langues ou niveaux de compétences",
			passed: hasLanguages,
			hint: "Indiquez votre niveau en langues étrangères (ex: Anglais C1).",
			actionText: "Ajouter langues"
		}
	];
	const passedCount = items.filter((i) => i.passed).length;
	const score = Math.round(passedCount / items.length * 100);
	let grade = "incomplet";
	if (score >= 90) grade = "excellent";
	else if (score >= 70) grade = "bon";
	else if (score >= 45) grade = "moyen";
	return {
		score,
		grade,
		items,
		missingCount: items.length - passedCount
	};
}
var _jsxFileName$1 = "/app/applet/src/components/studio/Studio.tsx";
function useNarrow() {
	const [narrow, setNarrow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(max-width: 960px)");
		const apply = () => setNarrow(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return narrow;
}
function Studio() {
	const narrow = useNarrow();
	const [panel, setPanel] = (0, import_react.useState)(null);
	const [healthOpen, setHealthOpen] = (0, import_react.useState)(false);
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const notice = useStudio((s) => s.notice);
	const saveStatus = useStudio((s) => s.saveStatus);
	const lastSavedAt = useStudio((s) => s.lastSavedAt);
	const zoom = useStudio((s) => s.zoom);
	const setZoom = useStudio((s) => s.setZoom);
	const past = useStudio((s) => s.past.length);
	const future = useStudio((s) => s.future.length);
	const undo = useStudio((s) => s.undo);
	const redo = useStudio((s) => s.redo);
	const syncCode = useStudio((s) => s.syncCode);
	const cloudModalOpen = useStudio((s) => s.cloudModalOpen);
	const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
	const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
	useStudio((s) => s.directPdfExport);
	const requestPdfExport = useStudio((s) => s.requestPdfExport);
	const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
	const setPlainTextModalOpen = useStudio((s) => s.setPlainTextModalOpen);
	const addSectionPack = useStudio((s) => s.addSectionPack);
	const boostElementText = useStudio((s) => s.boostElementText);
	const mobileTouchMode = useStudio((s) => s.mobileTouchMode);
	const setMobileTouchMode = useStudio((s) => s.setMobileTouchMode);
	const editorMode = useStudio((s) => s.editorMode);
	const setEditorMode = useStudio((s) => s.setEditorMode);
	const onboarding = useStudio((s) => s.onboarding);
	const setOnboarding = useStudio((s) => s.setOnboarding);
	const captureRef = (0, import_react.useRef)(null);
	const jsonInputRef = (0, import_react.useRef)(null);
	const page = activePage(doc, activePageId);
	const health = (0, import_react.useMemo)(() => computeCVHealth(doc, activePageId), [doc, activePageId]);
	(0, import_react.useEffect)(() => {
		useStudio.getState().hydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			const typing = target instanceof HTMLElement && (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT");
			const meta = event.metaKey || event.ctrlKey;
			const store = useStudio.getState();
			if (meta && event.key.toLowerCase() === "z") {
				event.preventDefault();
				if (event.shiftKey) store.redo();
				else store.undo();
				return;
			}
			if (meta && event.key.toLowerCase() === "y") {
				event.preventDefault();
				store.redo();
				return;
			}
			if (typing) return;
			if (meta && event.key.toLowerCase() === "d") {
				event.preventDefault();
				store.duplicateSelected();
				return;
			}
			if (meta && event.key.toLowerCase() === "c") {
				event.preventDefault();
				store.copy();
				return;
			}
			if (meta && event.key.toLowerCase() === "v") {
				event.preventDefault();
				store.paste();
				return;
			}
			if (meta && event.key.toLowerCase() === "a") {
				event.preventDefault();
				const current = activePage(store.doc, store.activePageId);
				store.select(current.elements.filter((el) => !el.hidden).map((el) => el.id));
				return;
			}
			if (event.key === "Escape") {
				store.select([]);
				store.setEditing(null);
				setPanel(null);
				setHealthOpen(false);
				setExportOpen(false);
				return;
			}
			if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();
				store.deleteSelected();
				return;
			}
			if (event.key === "[") {
				store.order("backward");
				return;
			}
			if (event.key === "]") {
				store.order("forward");
				return;
			}
			if (!event.key.startsWith("Arrow") || store.selectedIds.length === 0) return;
			event.preventDefault();
			const step = event.shiftKey ? 8 : 1;
			const dx = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
			const dy = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
			const current = activePage(store.doc, store.activePageId);
			const patches = {};
			for (const el of current.elements) {
				if (!store.selectedIds.includes(el.id) || el.locked) continue;
				patches[el.id] = {
					x: el.x + dx,
					y: el.y + dy
				};
			}
			if (Object.keys(patches).length) store.patchElements(store.activePageId, patches);
		};
		const onUp = (event) => {
			if (event.key.startsWith("Arrow")) useStudio.getState().release();
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const png = async () => {
			const node = captureRef.current;
			if (!node) return;
			useStudio.getState().notify("Génération de l'image HD…");
			try {
				const { toPng } = await import("../_libs/html-to-image.mjs").then((n) => n.t);
				const url = await toPng(node, {
					pixelRatio: 2,
					cacheBust: true
				});
				const a = document.createElement("a");
				a.href = url;
				a.download = "cv-atelier.png";
				a.click();
				useStudio.getState().notify("Image PNG téléchargée");
			} catch {
				useStudio.getState().notify("Export PNG indisponible — utilisez PDF");
			}
		};
		const json = () => {
			const blob = new Blob([JSON.stringify(useStudio.getState().doc, null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "cv-atelier.json";
			a.click();
			URL.revokeObjectURL(url);
			useStudio.getState().notify("Fichier JSON sauvegardé");
		};
		document.addEventListener("libre-png", png);
		document.addEventListener("libre-json", json);
		return () => {
			document.removeEventListener("libre-png", png);
			document.removeEventListener("libre-json", json);
		};
	}, []);
	const handleHealthAction = (item) => {
		setHealthOpen(false);
		if (item.id === "experiences") addSectionPack("pack-experience");
		else if (item.id === "skills") addSectionPack("pack-skills");
		else if (item.id === "languages") addSectionPack("pack-languages");
		else if (item.id === "metrics") {
			const firstExp = activePage(doc, activePageId).elements.find((e) => e.type === "experience");
			if (firstExp) {
				boostElementText(firstExp.id);
				useStudio.getState().select([firstExp.id]);
			} else addSectionPack("pack-experience");
		} else useStudio.getState().notify(`Complétez le champ ${item.label} dans le panneau de droite`);
	};
	const confirmModal = useStudio((s) => s.confirmModal);
	const setConfirmModal = useStudio((s) => s.setConfirmModal);
	const requestResetLayout = useStudio((s) => s.requestResetLayout);
	const requestNewDocument = useStudio((s) => s.requestNewDocument);
	const layoutCustomized = useStudio((s) => s.layoutCustomized);
	const sharedOverlays = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudSyncModal, {
			isOpen: cloudModalOpen,
			onClose: () => setCloudModalOpen(false)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 248,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvExtractorModal, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 249,
			columnNumber: 7
		}, this),
		confirmModal && /* @__PURE__ */ (void 0)("div", {
			className: "no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs",
			onClick: () => setConfirmModal(null),
			children: /* @__PURE__ */ (void 0)("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "confirm-modal-title",
				className: "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl space-y-4",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: cn("flex size-9 shrink-0 items-center justify-center rounded-xl", confirmModal.variant === "danger" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"),
								children: /* @__PURE__ */ (void 0)(CircleAlert, { size: 18 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 273,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 265,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("h3", {
								id: "confirm-modal-title",
								className: "text-sm font-bold text-slate-900",
								children: confirmModal.title
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 275,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 264,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setConfirmModal(null),
							className: "flex size-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700",
							"aria-label": "Fermer",
							children: /* @__PURE__ */ (void 0)(X, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 285,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 279,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 263,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs leading-relaxed text-slate-600",
						children: confirmModal.message
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 289,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setConfirmModal(null),
							className: "rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition",
							children: "Annuler"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 292,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => confirmModal.onConfirm(),
							className: cn("rounded-lg px-4 py-2 text-xs font-bold text-white transition shadow-xs", confirmModal.variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"),
							children: confirmModal.confirmLabel
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 299,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 291,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 256,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 252,
			columnNumber: 9
		}, this),
		notice && /* @__PURE__ */ (void 0)("div", {
			className: "no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-xl",
			children: notice
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 317,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadabilityModal, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 322,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PlainTextModal, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 323,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "print-root",
			children: doc.pages.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "print-sheet",
				style: {
					width: 794,
					height: PAGE_H
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
					page: item,
					interactive: false,
					exportSheetId: `print-${item.id}`,
					selectedIds: [],
					editingId: null,
					showGrid: false,
					showMargins: false,
					guides: {
						x: [],
						y: []
					},
					marquee: null
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 328,
					columnNumber: 13
				}, this)
			}, item.id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 327,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 325,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "no-print pointer-events-none fixed top-0 -left-[12000px]",
			"aria-hidden": true,
			children: doc.pages.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				ref: item.id === page.id ? captureRef : void 0,
				style: {
					width: 794,
					height: PAGE_H
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
					page: item,
					interactive: false,
					exportSheetId: item.id,
					selectedIds: [],
					editingId: null,
					showGrid: false,
					showMargins: false,
					guides: {
						x: [],
						y: []
					},
					marquee: null
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 351,
					columnNumber: 13
				}, this)
			}, item.id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 346,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 344,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 247,
		columnNumber: 5
	}, this);
	if (onboarding) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OnboardingFlow, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 371,
		columnNumber: 9
	}, this), sharedOverlays] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 370,
		columnNumber: 7
	}, this);
	if (editorMode === "guided") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SimpleEditor, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 380,
		columnNumber: 9
	}, this), sharedOverlays] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 379,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "studio flex h-dvh w-full flex-col overflow-hidden bg-paper text-ink select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "no-print relative z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3.5 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 min-w-0 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-display text-xs font-bold tracking-tight text-white",
									children: "CV"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 393,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "hidden sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-display text-sm font-bold tracking-tight text-slate-900 leading-none",
										children: "Atelier CV"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 397,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-0.5 text-[11px] font-medium text-slate-500 leading-none",
										children: "Studio d’édition A4"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 400,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 396,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 392,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden md:block h-4 w-px bg-slate-200" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 406,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "hidden md:flex items-center gap-2.5 text-xs text-slate-600",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-medium text-slate-800",
										children: page.name
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 410,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										"aria-hidden": "true",
										className: "text-slate-300",
										children: "·"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 411,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-1 text-slate-500",
										title: lastSavedAt ? `Dernière sauvegarde automatique à ${lastSavedAt}` : "Sauvegarde automatique active",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
											size: 13,
											className: "text-emerald-600 shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 416,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: saveStatus === "saving" ? "Sauvegarde…" : "Enregistré" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 417,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 412,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 409,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 391,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								role: "tablist",
								"aria-label": "Mode d'édition",
								className: "flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/80",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									role: "tab",
									"aria-selected": false,
									onClick: () => setEditorMode("guided"),
									className: "rounded-md px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition whitespace-nowrap",
									title: "Revenir au mode Saisie guidée sans perdre la mise en page",
									children: "Saisie guidée"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 430,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									role: "tab",
									"aria-selected": editorMode === "pro",
									onClick: () => setEditorMode("pro"),
									className: "rounded-md bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-2xs transition whitespace-nowrap",
									children: "Studio libre"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 440,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 425,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center rounded-lg border border-slate-200 bg-white p-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => undo(),
									disabled: past === 0,
									className: "flex size-7 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition",
									title: "Annuler (⌘Z)",
									"aria-label": "Annuler",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Undo2, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 461,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 453,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => redo(),
									disabled: future === 0,
									className: "flex size-7 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition",
									title: "Rétablir (⌘Y)",
									"aria-label": "Rétablir",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Redo2, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 471,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 463,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 452,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "hidden sm:flex items-center rounded-lg border border-slate-200 bg-white p-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setZoom(Math.round((zoom - .1) * 100) / 100),
										className: "flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition",
										title: "Zoom arrière",
										"aria-label": "Zoom arrière",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Minus, { size: 13 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 484,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 477,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => document.dispatchEvent(new Event("studio-fit-width")),
										className: "h-7 min-w-13 px-1.5 font-mono text-xs font-semibold tabular-nums text-slate-800 hover:bg-slate-100 rounded-md transition",
										title: "Ajuster confortablement à la largeur de travail",
										children: [Math.round(zoom * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 486,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setZoom(Math.round((zoom + .1) * 100) / 100),
										className: "flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition",
										title: "Zoom avant",
										"aria-label": "Zoom avant",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 13 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 501,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 494,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => document.dispatchEvent(new Event("studio-fit-page")),
										className: "flex size-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition border-l border-slate-100",
										title: "Voir la page entière",
										"aria-label": "Voir la page entière",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Maximize2, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 510,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 503,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 476,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative hidden xl:block",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setHealthOpen(!healthOpen),
									className: cn("flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium transition whitespace-nowrap", healthOpen ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"),
									title: "Vérifier les éléments clés du CV",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-[11px] font-semibold tabular-nums",
										children: [
											"Qualité ",
											health.score,
											"%"
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 527,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
										size: 12,
										className: cn("text-slate-400 transition-transform", healthOpen && "rotate-180 text-white")
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 530,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 516,
									columnNumber: 13
								}, this), healthOpen && /* @__PURE__ */ (void 0)("div", {
									className: "absolute top-full right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl z-50",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-xs font-bold text-slate-900",
											children: [
												"Vérification du CV (",
												health.score,
												"/100)"
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 537,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-slate-500 mt-0.5",
											children: "Points clés recommandés pour la lisibilité recruteur."
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 540,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 536,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setHealthOpen(false),
											className: "flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700",
											children: /* @__PURE__ */ (void 0)(X, { size: 13 }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 549,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 544,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 535,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "max-h-72 space-y-2 overflow-y-auto pr-1",
										children: health.items.map((item) => /* @__PURE__ */ (void 0)("div", {
											className: "flex items-start justify-between gap-2.5 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-start gap-2",
												children: [item.passed ? /* @__PURE__ */ (void 0)(CircleCheck, {
													size: 14,
													className: "mt-0.5 shrink-0 text-emerald-600"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 561,
													columnNumber: 27
												}, this) : /* @__PURE__ */ (void 0)(CircleAlert, {
													size: 14,
													className: "mt-0.5 shrink-0 text-amber-600"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 563,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
													className: "font-semibold text-slate-800 leading-snug",
													children: item.label
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 566,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "mt-0.5 text-[11px] text-slate-500 leading-snug",
													children: item.hint
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 567,
													columnNumber: 27
												}, this)] }, void 0, true, {
													fileName: _jsxFileName$1,
													lineNumber: 565,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 559,
												columnNumber: 23
											}, this), !item.passed && item.actionText && /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => handleHealthAction(item),
												className: "shrink-0 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white hover:bg-slate-800 transition",
												children: item.actionText
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 571,
												columnNumber: 25
											}, this)]
										}, item.id, true, {
											fileName: _jsxFileName$1,
											lineNumber: 555,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 553,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 534,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 515,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 423,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"data-testid": "open-plain-text-btn",
								onClick: () => setPlainTextModalOpen(true),
								className: "hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap",
								title: "Aperçu texte brut (lecture ATS)",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, {
										size: 13,
										className: "text-slate-500 shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 596,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden lg:inline",
										children: "Aperçu texte brut"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 597,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "lg:hidden",
										children: "Texte brut"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 598,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 589,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"data-testid": "open-readability-btn",
								onClick: () => setReadabilityModalOpen(true, false),
								className: "hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap",
								title: "Contrôle de lisibilité et de mise en page avant export",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, {
									size: 13,
									className: "text-slate-500 shrink-0"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 608,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Contrôle" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 609,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 601,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setExtractorModalOpen(true),
								className: "hidden md:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap",
								title: "Importer un CV existant (PDF, Word ou texte)",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, {
									size: 13,
									className: "text-slate-500 shrink-0"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 618,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Importer" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 619,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 612,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setCloudModalOpen(true),
								className: "hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap",
								title: "Synchronisation Cloud multi-appareils",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cloud, {
									size: 13,
									className: "text-slate-500 shrink-0"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 628,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden lg:inline",
									children: syncCode ? syncCode : "Cloud"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 629,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 622,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center rounded-lg bg-signal text-white shadow-2xs hover:bg-blue-700 transition",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										"data-testid": "export-pdf-btn",
										onClick: () => requestPdfExport(),
										className: "flex h-8 items-center gap-1.5 px-3.5 text-xs font-semibold whitespace-nowrap",
										title: "Exporter le CV au format PDF A4 haute définition",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {
											size: 13,
											className: "shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 642,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Exporter en PDF" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 643,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 635,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setExportOpen(!exportOpen),
										className: "flex h-8 w-7 items-center justify-center rounded-r-lg border-l border-white/20 hover:bg-blue-800 transition",
										title: "Plus d'options d'export et de fichier",
										"aria-label": "Options d'export",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
											size: 12,
											className: cn("transition-transform", exportOpen && "rotate-180")
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 652,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 645,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 634,
									columnNumber: 13
								}, this), exportOpen && /* @__PURE__ */ (void 0)("div", {
									className: "absolute right-0 top-full mt-1.5 w-64 rounded-xl border border-slate-200 bg-white p-1.5 text-slate-900 shadow-xl z-50",
									children: [
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												requestPdfExport();
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition",
											children: [/* @__PURE__ */ (void 0)(Download, {
												size: 14,
												className: "text-signal shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 666,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-slate-900",
												children: "Télécharger PDF (A4)"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 668,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-slate-500",
												children: "Document prêt à l’envoi"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 669,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 667,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 658,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												document.dispatchEvent(new Event("libre-png"));
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition",
											children: [/* @__PURE__ */ (void 0)(FileText, {
												size: 14,
												className: "text-slate-600 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 680,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-medium text-slate-900",
												children: "Image PNG haute résolution"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 682,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-slate-500",
												children: "Pour portfolio ou aperçu"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 683,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 681,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 672,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												window.print();
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition",
											children: [/* @__PURE__ */ (void 0)(Printer, {
												size: 14,
												className: "text-slate-600 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 694,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-medium text-slate-900",
												children: "Imprimer le document"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 696,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-slate-500",
												children: "Boîte de dialogue système"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 697,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 695,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 686,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { className: "my-1 border-t border-slate-100" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 701,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												document.dispatchEvent(new Event("libre-json"));
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition",
											children: [/* @__PURE__ */ (void 0)(FileText, {
												size: 13,
												className: "text-slate-400 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 711,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Sauvegarder le projet (.json)" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 712,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 703,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												jsonInputRef.current?.click();
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition",
											children: [/* @__PURE__ */ (void 0)(FolderOpen, {
												size: 13,
												className: "text-slate-400 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 722,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Ouvrir un projet (.json)" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 723,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 714,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												setOnboarding(true);
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition",
											children: [/* @__PURE__ */ (void 0)(Sparkles, {
												size: 13,
												className: "text-slate-400 shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 733,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Assistant de démarrage" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 734,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 725,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { className: "my-1 border-t border-slate-100" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 737,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												requestResetLayout();
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-amber-700 hover:bg-amber-50 transition",
											children: [/* @__PURE__ */ (void 0)(RotateCcw, {
												size: 13,
												className: "shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 747,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: ["Réinitialiser la mise en page", layoutCustomized ? " *" : ""] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 748,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 739,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setExportOpen(false);
												requestNewDocument();
											},
											className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 transition",
											children: [/* @__PURE__ */ (void 0)(RotateCcw, {
												size: 13,
												className: "shrink-0"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 759,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Réinitialiser tout le document" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 760,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 751,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 657,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 633,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								ref: jsonInputRef,
								type: "file",
								accept: "application/json",
								className: "hidden",
								onChange: (event) => {
									const file = event.target.files?.[0];
									if (!file) return;
									const reader = new FileReader();
									reader.onload = () => {
										try {
											useStudio.getState().loadDocument(JSON.parse(String(reader.result)));
										} catch {
											useStudio.getState().notify("Fichier JSON invalide");
										}
									};
									reader.readAsText(file);
									event.target.value = "";
								}
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 766,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 588,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 389,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DocumentAlertBanner, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 789,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 min-h-0 overflow-hidden",
				children: [
					!narrow && /* @__PURE__ */ (void 0)(Sidebar, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 793,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [narrow && mobileTouchMode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTouchEditor, { onSwitchToCanvas: () => setMobileTouchMode(false) }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 797,
							columnNumber: 13
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Canvas, { narrow }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 799,
							columnNumber: 13
						}, this), narrow && !mobileTouchMode && /* @__PURE__ */ (void 0)("div", {
							className: "no-print flex h-14 shrink-0 border-t border-slate-200 bg-white",
							children: [
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-signal",
									onClick: () => setMobileTouchMode(true),
									children: [/* @__PURE__ */ (void 0)(Smartphone, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 809,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Édition rapide" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 810,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 804,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700",
									onClick: () => setPanel("library"),
									children: [/* @__PURE__ */ (void 0)(Layers, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 817,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Modèles & Ajout" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 818,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 812,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700",
									onClick: () => setPanel("inspect"),
									children: [/* @__PURE__ */ (void 0)(SlidersHorizontal, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 825,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Propriétés" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 826,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 820,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700",
									onClick: () => setCloudModalOpen(true),
									children: [/* @__PURE__ */ (void 0)(Cloud, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 833,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Cloud" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 834,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 828,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 803,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 795,
						columnNumber: 9
					}, this),
					!narrow && /* @__PURE__ */ (void 0)(Inspector, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 840,
						columnNumber: 21
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 792,
				columnNumber: 7
			}, this),
			narrow && panel && /* @__PURE__ */ (void 0)("div", {
				className: "no-print fixed inset-0 z-40 flex bg-slate-900/40 backdrop-blur-2xs",
				onClick: () => setPanel(null),
				children: /* @__PURE__ */ (void 0)("div", {
					className: "h-full max-w-full",
					onClick: (event) => event.stopPropagation(),
					children: panel === "library" ? /* @__PURE__ */ (void 0)(Sidebar, { onDone: () => setPanel(null) }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 847,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (void 0)("div", {
						className: "h-full w-80 max-w-[100vw]",
						children: /* @__PURE__ */ (void 0)(Inspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 850,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 849,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 845,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 844,
				columnNumber: 9
			}, this),
			sharedOverlays
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 387,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Studio, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 3,
		columnNumber: 10
	}, this);
}
export { Home as component };
