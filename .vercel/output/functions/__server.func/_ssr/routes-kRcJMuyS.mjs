import { o as __toESM } from "../_runtime.mjs";
import { W as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { $ as BringToFront, A as LayoutTemplate, B as FileText, C as MapPin, D as LockOpen, E as Lock, F as Heading, G as Copy, H as Eye, I as Grid3x3, J as CircleCheck, K as Cloud, L as GraduationCap, M as Languages, N as Italic, O as LoaderCircle, P as Image$1, Q as Check, R as Gauge, S as Minus, T as Magnet, U as EyeOff, V as FileCheck, W as Download, X as ChevronUp, Y as CircleAlert, Z as ChevronDown, _ as Printer, a as Undo, b as Palette, c as Trash2, d as Sparkles, et as Briefcase, f as Smartphone, g as Redo, h as RefreshCw, i as Upload, it as AlignCenter, j as Layers, k as Link, l as Tags, m as SendToBack, n as WandSparkles, nt as AlignLeft, o as Type, p as SlidersHorizontal, q as Circle, r as User, rt as AlignRight, s as TriangleAlert, t as X, tt as Bold, u as Square, v as Plus, w as Mail, x as Package, y as Phone, z as FileType } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { n as toPng } from "../_libs/html-to-image.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-kRcJMuyS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var PAGE_H = 1123;
var INK = "#141311";
var CREAM = "#f6f3ec";
var MUTE = "#5e5952";
var SIGNAL = "#d6372a";
var SHEET = "#fffdf8";
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
var _jsxFileName$9 = "/app/applet/src/components/studio/ElementView.tsx";
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
		fileName: _jsxFileName$9,
		lineNumber: 66,
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
		fileName: _jsxFileName$9,
		lineNumber: 73,
		columnNumber: 5
	}, this);
}
function ElementView({ el, selected, editing, chrome, onPointerDown, onDoubleClick, onChange, onResize, onRotate, onUpload }) {
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
		fileName: _jsxFileName$9,
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
						fileName: _jsxFileName$9,
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
						fileName: _jsxFileName$9,
						lineNumber: 139,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
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
					fileName: _jsxFileName$9,
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
					fileName: _jsxFileName$9,
					lineNumber: 154,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$9,
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
					fileName: _jsxFileName$9,
					lineNumber: 168,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
					text: c.date ?? "",
					editing,
					className: "shrink-0 outline-none",
					style: { opacity: .62 },
					onCommit: (date) => commit({ date })
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 175,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 167,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
				text: c.school ?? "",
				editing,
				className: "outline-none",
				style: { opacity: .72 },
				onCommit: (school) => commit({ school })
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 183,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$9,
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
				fileName: _jsxFileName$9,
				lineNumber: 197,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$9,
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
						fileName: _jsxFileName$9,
						lineNumber: 214,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						style: { opacity: .55 },
						children: meter.value
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 215,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
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
						fileName: _jsxFileName$9,
						lineNumber: 218,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 217,
					columnNumber: 13
				}, this)]
			}, `${meter.label}-${index}`, true, {
				fileName: _jsxFileName$9,
				lineNumber: 212,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$9,
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
				fileName: _jsxFileName$9,
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
				fileName: _jsxFileName$9,
				lineNumber: 230,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$9,
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
			fileName: _jsxFileName$9,
			lineNumber: 243,
			columnNumber: 11
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-full w-full flex-col items-center justify-center gap-1 text-mute",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-medium",
				children: "Photo"
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 246,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 245,
			columnNumber: 11
		}, this), chrome && selected && /* @__PURE__ */ (void 0)("label", {
			className: "no-export absolute inset-x-2 bottom-2 flex h-8 cursor-pointer items-center justify-center rounded-ui bg-ink text-xs font-semibold text-cream",
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
				fileName: _jsxFileName$9,
				lineNumber: 252,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 250,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 241,
		columnNumber: 7
	}, this);
	const radius = el.type === "ellipse" ? 9999 : s.borderRadius;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		"data-element": el.id,
		className: el.locked ? "absolute" : "absolute touch-none",
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
				className: "h-full w-full overflow-hidden",
				style: {
					background: s.backgroundColor,
					borderRadius: radius,
					border: s.borderWidth ? `${s.borderWidth}px solid ${s.borderColor}` : void 0,
					boxSizing: "border-box"
				},
				children: body
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 291,
				columnNumber: 7
			}, this),
			chrome && selected && !el.locked && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (void 0)("div", { className: "pointer-events-none absolute inset-0 border border-ink" }, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 304,
					columnNumber: 11
				}, this),
				HANDLES.map((handle) => /* @__PURE__ */ (void 0)("div", {
					role: "button",
					"aria-label": `Redimensionner ${handle.id}`,
					className: `no-export absolute z-10 size-3 rounded-sm border border-ink bg-cream ${handle.className}`,
					onPointerDown: (event) => {
						event.stopPropagation();
						onResize?.(handle.id, event);
					}
				}, handle.id, false, {
					fileName: _jsxFileName$9,
					lineNumber: 306,
					columnNumber: 13
				}, this)),
				/* @__PURE__ */ (void 0)("div", {
					className: "no-export absolute -top-7 left-1/2 flex -translate-x-1/2 flex-col items-center",
					children: [/* @__PURE__ */ (void 0)("div", { className: "h-4 w-px bg-ink" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 318,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						role: "button",
						"aria-label": "Pivoter",
						className: "size-3 rounded-full border border-ink bg-cream",
						onPointerDown: (event) => {
							event.stopPropagation();
							onRotate?.(event);
						}
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 319,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 317,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 303,
				columnNumber: 9
			}, this),
			chrome && selected && el.locked && /* @__PURE__ */ (void 0)("div", { className: "pointer-events-none absolute inset-0 border border-dashed border-mute" }, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 331,
				columnNumber: 43
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 272,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/studio/PageSheet.tsx";
function PageSheet({ page, interactive, selectedIds, editingId, showGrid, showMargins, guides, marquee, onSheetPointerDown, onElementPointerDown, onDoubleClick, onChange, onResize, onRotate, onUpload }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "sheet-shadow relative overflow-hidden",
		"data-sheet": interactive ? page.id : void 0,
		style: {
			width: 794,
			height: PAGE_H,
			background: page.background
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
				fileName: _jsxFileName$8,
				lineNumber: 49,
				columnNumber: 9
			}, this),
			showMargins && interactive && /* @__PURE__ */ (void 0)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute inset-9 border border-dashed border-line"
			}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 60,
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
				fileName: _jsxFileName$8,
				lineNumber: 64,
				columnNumber: 11
			}, this)),
			guides.x.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-signal",
				style: { left: x }
			}, `x-${x}`, false, {
				fileName: _jsxFileName$8,
				lineNumber: 79,
				columnNumber: 9
			}, this)),
			guides.y.map((y) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute right-0 left-0 z-40 h-px bg-signal",
				style: { top: y }
			}, `y-${y}`, false, {
				fileName: _jsxFileName$8,
				lineNumber: 82,
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
				fileName: _jsxFileName$8,
				lineNumber: 85,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 42,
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
	if (bind.kind === "role" && content.text != null) next.role = content.text;
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
	const pages = doc.pages.map((page) => ({
		...page,
		elements: page.elements.map((el) => {
			const bind = el.bind;
			if (!bind) return el;
			if (bind.kind === "name" && field === "name") return {
				...el,
				content: {
					...el.content,
					text: value
				}
			};
			if (bind.kind === "summary" && field === "summary") return {
				...el,
				content: {
					...el.content,
					text: value
				}
			};
			if (bind.kind === "role" && field === "role") {
				const current = el.content.text ?? "";
				const upper = current === current.toUpperCase() && current !== current.toLowerCase();
				return {
					...el,
					content: {
						...el.content,
						text: upper ? value.toUpperCase() : value
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
		})
	}));
	return {
		...doc,
		profile,
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
			h: 172,
			z: 1,
			style: { backgroundColor: INK }
		}),
		el({
			type: "heading",
			x: 40,
			y: 38,
			w: 420,
			h: 48,
			z: 3,
			bind: { kind: "name" },
			content: { text: p.name },
			style: {
				fontFamily: "Fraunces",
				fontSize: 34,
				fontWeight: 600,
				color: CREAM,
				lineHeight: 1.05
			}
		}),
		el({
			type: "text",
			x: 40,
			y: 94,
			w: 420,
			h: 22,
			z: 4,
			bind: { kind: "role" },
			content: { text: p.role.toUpperCase() },
			style: {
				fontSize: 12,
				fontWeight: 600,
				color: DARK_MUTE,
				letterSpacing: 1.6
			}
		}),
		el({
			type: "contact",
			x: 470,
			y: 40,
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
			y: 68,
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
			y: 96,
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
			y: 124,
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
		el(label("PROFIL", 40, 196, 9)),
		el({
			type: "text",
			x: 40,
			y: 220,
			w: 714,
			h: 58,
			z: 10,
			bind: { kind: "summary" },
			content: { text: p.summary },
			style: {
				fontSize: 14,
				lineHeight: 1.5,
				color: "#3a3632"
			}
		}),
		el({
			type: "rule",
			x: 40,
			y: 292,
			w: 714,
			h: 1,
			z: 11,
			style: { backgroundColor: HAIR }
		}),
		el(label("EXPÉRIENCE", 40, 312, 12)),
		...experiences(p, 40, 338, 714, 104, 12, 13).map(el),
		el(label("FORMATION", 40, 698, 20)),
		...educations(p, 40, 722, 714, 21).map(el),
		el(label("COMPÉTENCES", 40, 836, 30)),
		el({
			type: "skills",
			x: 40,
			y: 860,
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
		el(label("LANGUES", 40, 928, 32)),
		el({
			type: "meters",
			x: 40,
			y: 952,
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
* Supports multi-page documents.
*/
async function downloadDirectPDF(doc, activePageId, onProgress) {
	onProgress?.("Génération du PDF en cours...");
	const pdf = new import_jspdf_node_min.default({
		orientation: "portrait",
		unit: "mm",
		format: "a4",
		compress: true
	});
	const fileName = `CV_${(doc.profile.name || "CV").trim().replace(/\s+/g, "_").replace(/[^\w-]/g, "")}.pdf`;
	const pages = doc.pages;
	for (let i = 0; i < pages.length; i++) {
		const page = pages[i];
		onProgress?.(`Rendu de la page ${i + 1}/${pages.length}...`);
		const sheetEl = document.querySelector(`[data-sheet="${page.id}"]`);
		if (!sheetEl) continue;
		const dataUrl = await toPng(sheetEl, {
			pixelRatio: 2.2,
			cacheBust: true,
			filter: (node) => {
				if (node instanceof HTMLElement && node.classList.contains("no-export")) return false;
				return true;
			}
		});
		if (i > 0) pdf.addPage("a4", "portrait");
		pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, void 0, "FAST");
	}
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
var KEY = "libre-cv-doc-v1";
var noticeTimer = 0;
var persistTimer = 0;
function formatTime(d = /* @__PURE__ */ new Date()) {
	return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
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
function persist(doc) {
	if (typeof window === "undefined") return;
	useStudio.setState({ saveStatus: "saving" });
	window.clearTimeout(persistTimer);
	persistTimer = window.setTimeout(() => {
		flushSave(doc);
	}, 250);
}
if (typeof window !== "undefined") window.addEventListener("beforeunload", () => {
	try {
		const doc = useStudio.getState().doc;
		if (doc) localStorage.setItem(KEY, JSON.stringify(doc));
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
			set({ doc: recipe(get().doc) });
			persist(get().doc);
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
	return {
		doc: initial,
		past: [],
		future: [],
		historyHeld: false,
		activePageId: initial.pages[0].id,
		selectedIds: [],
		editingId: null,
		zoom: .72,
		showGrid: false,
		snap: true,
		guides: true,
		margins: true,
		notice: null,
		clipboard: [],
		saveStatus: "saved",
		lastSavedAt: null,
		syncCode: null,
		cloudStatus: "idle",
		cloudModalOpen: false,
		extractorModalOpen: false,
		mobileTouchMode: false,
		setCloudModalOpen: (open) => set({ cloudModalOpen: open }),
		setExtractorModalOpen: (open) => set({ extractorModalOpen: open }),
		setMobileTouchMode: (active) => set({ mobileTouchMode: active }),
		hydrate: () => {
			let urlSyncCode = null;
			if (typeof window !== "undefined") try {
				const s = new URLSearchParams(window.location.search).get("sync");
				if (s && s.trim()) urlSyncCode = s.trim().toUpperCase();
			} catch {}
			const loaded = readStorage();
			let storedSyncCode = null;
			if (typeof window !== "undefined") try {
				storedSyncCode = localStorage.getItem("libre-cv-sync-code");
			} catch {}
			const activeCode = urlSyncCode || storedSyncCode;
			if (activeCode) set({ syncCode: activeCode });
			if (urlSyncCode) {
				get().loadFromCloud(urlSyncCode);
				return;
			}
			if (!loaded) return;
			set({
				doc: loaded,
				activePageId: loaded.pages[0].id,
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
		setActive: (id) => set({ activePageId: id }),
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
			set({ doc: mapPage(get().doc, pageId, (page) => ({
				...page,
				elements: page.elements.map((el) => patches[el.id] ? mergeElement(el, patches[el.id]) : el)
			})) });
		},
		patchElement: (pageId, id, patch, live = false) => {
			commit((doc) => {
				let profile = doc.profile;
				const pages = doc.pages.map((page) => {
					if (page.id !== pageId) return page;
					return {
						...page,
						elements: page.elements.map((el) => {
							if (el.id !== id) return el;
							const next = mergeElement(el, patch);
							if (patch.content) profile = syncProfile(profile, next.bind, next.content);
							return next;
						})
					};
				});
				return {
					...doc,
					profile,
					pages
				};
			}, live);
		},
		patchSelectedStyle: (patch, live = false) => {
			const { page, elements } = selectedOnActive();
			if (!elements.length) return;
			const ids = new Set(elements.map((e) => e.id));
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.map((el) => ids.has(el.id) ? mergeElement(el, { style: patch }) : el)
			})), live);
		},
		setIdentity: (field, value) => {
			if (!get().historyHeld) get().hold();
			const doc = applyIdentity(get().doc, field, value);
			set({ doc });
			persist(doc);
		},
		deleteSelected: () => {
			const { page } = selectedOnActive();
			const ids = new Set(get().selectedIds);
			if (!ids.size) return;
			commit((doc) => mapPage(doc, page.id, (p) => ({
				...p,
				elements: p.elements.filter((el) => !ids.has(el.id))
			})), false);
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
			commit((doc) => {
				return mapPage(doc, (doc.pages.find((p) => p.id === pageId) ?? doc.pages[0]).id, (p) => ({
					...p,
					background: SHEET,
					elements: buildTemplate(id, doc.profile, `${id}-${uid()}`)
				}));
			}, false);
			set({
				selectedIds: [],
				editingId: null
			});
			const name = id;
			get().notify(`Modèle ${name} posé sur la page`);
		},
		applyJobPreset: (presetId) => {
			const preset = JOB_PRESETS.find((p) => p.id === presetId);
			if (!preset) return;
			const pageId = get().activePageId;
			commit((doc) => {
				const page = doc.pages.find((p) => p.id === pageId) ?? doc.pages[0];
				const nextProfile = structuredClone(preset.profile);
				return mapPage({
					...doc,
					profile: nextProfile
				}, page.id, (p) => ({
					...p,
					elements: buildTemplate("modern", nextProfile, `preset-${uid()}`)
				}));
			}, false);
			set({
				selectedIds: [],
				editingId: null
			});
			get().notify(`⚡ Métier "${preset.label}" chargé !`);
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
		addSectionPack: (packId) => {
			const pack = SECTION_PACKS.find((p) => p.id === packId);
			if (!pack) return;
			const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
			const bottom = page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48);
			const startY = Math.min(PAGE_H - 120, bottom + 20);
			const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
			const { elements: newElements } = pack.createElements(startY, maxZ);
			commit((doc) => {
				return mapPage(doc, page.id, (p) => ({
					...p,
					elements: [...p.elements, ...newElements]
				}));
			}, false);
			set({
				selectedIds: newElements.map((e) => e.id),
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
			if (get().activePageId === id) set({
				activePageId: get().doc.pages[0].id,
				selectedIds: []
			});
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
			commit(() => doc, false);
			set({
				activePageId: doc.pages[0].id,
				selectedIds: [],
				editingId: null
			});
			get().notify("Nouveau document");
		},
		loadDocument: (doc) => {
			if (!doc.pages?.length || !doc.profile) {
				get().notify("Fichier illisible");
				return;
			}
			commit(() => doc, false);
			set({
				activePageId: doc.pages[0].id,
				selectedIds: [],
				editingId: null
			});
			get().notify("Projet ouvert");
		},
		importExtractedProfile: (profile, template = "modern", asNewPage = false) => {
			const activeId = get().activePageId;
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
					return {
						...doc,
						profile: nextProfile,
						pages: [...doc.pages, newPage]
					};
				} else return mapPage({
					...doc,
					profile: nextProfile
				}, activeId, (p) => ({
					...p,
					elements: buildTemplate(template, nextProfile, `${template}-${uid()}`)
				}));
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
			commit((doc) => {
				let profile;
				try {
					profile = extractFromText(raw, doc.profile).profile;
				} catch {
					profile = parseProfile(raw, doc.profile);
				}
				return mapPage({
					...doc,
					profile
				}, pageId, (p) => ({
					...p,
					elements: buildTemplate(template, profile, `${template}-${uid()}`)
				}));
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
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$7 = "/app/applet/src/components/studio/Canvas.tsx";
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
	const scrollerRef = (0, import_react.useRef)(null);
	const gesture = (0, import_react.useRef)(null);
	const space = (0, import_react.useRef)(false);
	const [spaceOn, setSpaceOn] = (0, import_react.useState)(false);
	const [guideLines, setGuideLines] = (0, import_react.useState)({
		x: [],
		y: []
	});
	const [marquee, setMarquee] = (0, import_react.useState)(null);
	(0, import_react.useLayoutEffect)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const z = Math.min((el.clientWidth - 64) / 794, (el.clientHeight - 64) / PAGE_H);
		if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
	}, [setZoom, narrow]);
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
			const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || ["INPUT", "TEXTAREA"].includes(event.target.tagName));
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
	const saveStatus = useStudio((s) => s.saveStatus);
	const lastSavedAt = useStudio((s) => s.lastSavedAt);
	const saveNow = useStudio((s) => s.saveNow);
	const syncCode = useStudio((s) => s.syncCode);
	const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
	const directPdfExport = useStudio((s) => s.directPdfExport);
	const boostElementText = useStudio((s) => s.boostElementText);
	const addSectionPack = useStudio((s) => s.addSectionPack);
	const past = useStudio((s) => s.past.length);
	const future = useStudio((s) => s.future.length);
	const undo = useStudio((s) => s.undo);
	const redo = useStudio((s) => s.redo);
	const [healthOpen, setHealthOpen] = (0, import_react.useState)(false);
	const [boostMenuOpen, setBoostMenuOpen] = (0, import_react.useState)(false);
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		if (typeof window !== "undefined") window.useStudio = useStudio;
	}, []);
	const health = (0, import_react.useMemo)(() => computeCVHealth(doc, activePageId), [doc, activePageId]);
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
	const floatingBarTop = (0, import_react.useMemo)(() => {
		if (!primarySelected) return 12;
		const pageOffset = pageIndex * (PAGE_H + 40);
		const elementTopZoomed = (pageOffset + primarySelected.y) * zoom;
		const elementBottomZoomed = (pageOffset + primarySelected.y + primarySelected.h) * zoom;
		if (elementTopZoomed < 64 || primarySelected.y < 90) return elementBottomZoomed + 16;
		return Math.max(12, elementTopZoomed - 52);
	}, [
		primarySelected,
		pageIndex,
		zoom
	]);
	const fit = () => {
		const el = scrollerRef.current;
		if (!el) return;
		const z = Math.min((el.clientWidth - 64) / 794, (el.clientHeight - 64) / PAGE_H);
		if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
	};
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
	const innerHeight = doc.pages.length * PAGE_H + Math.max(0, doc.pages.length - 1) * 40;
	const page = activePage(doc, activePageId);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative flex min-h-0 min-w-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "no-print relative z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line bg-cream px-3 select-none flex-nowrap whitespace-nowrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex min-w-0 items-center gap-2.5 shrink-0 whitespace-nowrap",
					children: [
						narrow && /* @__PURE__ */ (void 0)("span", {
							className: "font-display text-sm font-bold tracking-wide whitespace-nowrap shrink-0",
							children: "CV PRO"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 394,
							columnNumber: 22
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 text-xs text-ink whitespace-nowrap shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-bold whitespace-nowrap",
									children: page.name
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 396,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-mute font-normal",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 397,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-mute font-mono text-[11px] whitespace-nowrap",
									children: "A4 (794×1123)"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 398,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 395,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden h-4 w-px bg-line sm:block shrink-0" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 401,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setHealthOpen(!healthOpen),
								className: cn("group flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition shadow-xs whitespace-nowrap shrink-0", healthOpen ? "border-ink bg-ink text-cream" : "border-line bg-sheet text-ink hover:border-ink hover:bg-cream"),
								title: "Cliquez pour voir la checklist de complétion de votre CV",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1.5 whitespace-nowrap shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs",
											children: health.score >= 85 ? "🎯" : health.score >= 60 ? "⚡" : "💡"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 417,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] font-semibold whitespace-nowrap",
											children: [
												"Score : ",
												health.score,
												"%"
											]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 420,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 416,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-1.5 w-10 overflow-hidden rounded-full bg-line/80 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-full rounded-full transition-all duration-500",
											style: {
												width: `${health.score}%`,
												backgroundColor: health.score >= 80 ? "#10b981" : health.score >= 50 ? "#f59e0b" : "#ef4444"
											}
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 425,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 424,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
										size: 11,
										className: cn("transition-transform text-mute shrink-0", healthOpen && "rotate-180 text-cream")
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 434,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 405,
								columnNumber: 13
							}, this), healthOpen && /* @__PURE__ */ (void 0)("div", {
								className: "absolute top-full left-0 mt-2 w-80 rounded-xl border border-line bg-sheet p-3.5 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-2",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "mb-2.5 flex items-center justify-between border-b border-line pb-2",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1.5 text-xs font-bold text-ink",
											children: [/* @__PURE__ */ (void 0)("span", { children: "Qualité & Impact du CV" }, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 443,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "rounded-full bg-ink px-1.5 py-0.2 font-mono text-[10px] text-cream",
												children: [health.score, "/100"]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 444,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 442,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[10px] text-mute mt-0.5",
											children: health.score >= 85 ? "🎉 Excellent ! Votre CV est complet et très impactant." : health.score >= 60 ? "Bonne base ! Quelques détails pour faire la différence." : "Pensez à compléter les rubriques clés pour maximiser vos chances."
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 448,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 441,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setHealthOpen(false),
											className: "flex size-5 items-center justify-center rounded-sm text-mute hover:text-ink",
											children: /* @__PURE__ */ (void 0)(X, { size: 12 }, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 461,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 456,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 440,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "max-h-72 space-y-2 overflow-y-auto pr-1",
										children: health.items.map((item) => /* @__PURE__ */ (void 0)("div", {
											className: cn("rounded-lg border p-2 text-xs transition", item.passed ? "border-emerald-200 bg-emerald-50/40 text-emerald-950" : "border-amber-200 bg-amber-50/50 text-amber-950"),
											children: /* @__PURE__ */ (void 0)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-start gap-1.5",
													children: [item.passed ? /* @__PURE__ */ (void 0)(CircleCheck, {
														size: 14,
														className: "mt-0.5 shrink-0 text-emerald-600"
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 479,
														columnNumber: 29
													}, this) : /* @__PURE__ */ (void 0)(CircleAlert, {
														size: 14,
														className: "mt-0.5 shrink-0 text-amber-600"
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 481,
														columnNumber: 29
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-semibold leading-tight",
														children: item.label
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 484,
														columnNumber: 29
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "mt-0.5 text-[10px] text-mute leading-snug",
														children: item.hint
													}, void 0, false, {
														fileName: _jsxFileName$7,
														lineNumber: 485,
														columnNumber: 29
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$7,
														lineNumber: 483,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$7,
													lineNumber: 477,
													columnNumber: 25
												}, this), !item.passed && item.actionText && /* @__PURE__ */ (void 0)("button", {
													type: "button",
													onClick: () => handleHealthAction(item),
													className: "shrink-0 rounded-md bg-ink px-2 py-0.5 text-[10px] font-semibold text-cream hover:bg-neutral-800 transition",
													children: item.actionText
												}, void 0, false, {
													fileName: _jsxFileName$7,
													lineNumber: 489,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$7,
												lineNumber: 476,
												columnNumber: 23
											}, this)
										}, item.id, false, {
											fileName: _jsxFileName$7,
											lineNumber: 467,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 465,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-3 flex items-center justify-between border-t border-line pt-2 text-[10px] text-mute",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Temps réel" }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 503,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												useStudio.getState().applyJobPreset("developer");
												setHealthOpen(false);
											},
											className: "font-semibold text-amber-600 hover:underline",
											children: "⚡ Compléter à 100%"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 504,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 502,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 439,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 404,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 393,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden xl:flex items-center gap-2.5 shrink-0 whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-0.5 rounded-lg border border-line bg-sheet p-0.5 shrink-0 whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => undo(),
							disabled: past === 0,
							className: "flex size-7 items-center justify-center rounded text-ink disabled:opacity-25 hover:bg-paper transition shrink-0",
							title: "Annuler (⌘Z)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Undo, { size: 13 }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 530,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 523,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => redo(),
							disabled: future === 0,
							className: "flex size-7 items-center justify-center rounded text-ink disabled:opacity-25 hover:bg-paper transition shrink-0",
							title: "Rétablir (⌘Y)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Redo, { size: 13 }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 539,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 532,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 522,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: saveNow,
						className: "flex items-center gap-1.5 text-[11px] text-mute hover:text-ink cursor-pointer transition shrink-0 whitespace-nowrap",
						title: "Enregistrement continu en local. Cliquez pour sauvegarder maintenant.",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-2 rounded-full shrink-0", saveStatus === "saving" ? "bg-amber-500 animate-pulse" : "bg-emerald-500") }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 548,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-mono text-[10px] whitespace-nowrap",
							children: saveStatus === "saving" ? "Sauvegarde..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Enregistré" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 554,
								columnNumber: 19
							}, this), mounted && lastSavedAt && /* @__PURE__ */ (void 0)("span", {
								className: "hidden xl:inline",
								children: ` (${lastSavedAt})`
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 555,
								columnNumber: 46
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 553,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 549,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 543,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 521,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 shrink-0 whitespace-nowrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setCloudModalOpen(true),
							className: "hidden xl:flex items-center gap-1.5 rounded-lg border border-line bg-sheet px-2.5 py-1.5 text-xs font-medium text-ink hover:border-blue-500 hover:text-blue-600 transition shadow-xs whitespace-nowrap shrink-0",
							title: "Synchroniser votre CV sur mobile ou un autre appareil sans compte",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cloud, {
								size: 13,
								className: syncCode ? "text-blue-600 shrink-0" : "text-mute shrink-0"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 571,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "whitespace-nowrap",
								children: syncCode ? `Sync: ${syncCode}` : "Cloud Sync"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 572,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 565,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-0.5 rounded-lg border border-line bg-sheet p-0.5 shrink-0 whitespace-nowrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									className: "flex size-7 items-center justify-center rounded text-xs font-semibold text-mute hover:bg-paper hover:text-ink transition shrink-0",
									onClick: () => setZoom(zoom / 1.15),
									title: "Zoom arrière",
									children: "−"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 577,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									className: "h-7 min-w-10 px-1 text-xs font-semibold tabular-nums hover:bg-paper rounded transition whitespace-nowrap shrink-0 text-center",
									onClick: fit,
									title: "Adapter à l'écran",
									children: [Math.round(zoom * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 585,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									className: "flex size-7 items-center justify-center rounded text-xs font-semibold text-mute hover:bg-paper hover:text-ink transition shrink-0",
									onClick: () => setZoom(zoom * 1.15),
									title: "Zoom avant",
									children: "+"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 593,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 576,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative shrink-0 whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center rounded-lg bg-blue-600 text-white shadow-xs shrink-0 whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => directPdfExport(),
									className: "flex items-center gap-1.5 h-8 px-2.5 py-1.5 text-xs font-bold hover:bg-blue-700 rounded-l-lg transition whitespace-nowrap shrink-0",
									title: "Télécharger directement le fichier A4 en PDF prêt à l'envoi",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {
										size: 13,
										className: "shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 612,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "whitespace-nowrap",
										children: "Télécharger PDF"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 613,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 606,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setExportOpen(!exportOpen),
									className: "flex items-center justify-center h-8 w-6 border-l border-blue-500/50 hover:bg-blue-700 rounded-r-lg transition shrink-0",
									title: "Autres formats d'export",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
										size: 12,
										className: cn("transition-transform shrink-0", exportOpen && "rotate-180")
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 621,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 615,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 605,
								columnNumber: 13
							}, this), exportOpen && /* @__PURE__ */ (void 0)("div", {
								className: "absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-line bg-sheet p-1 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-1",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											setExportOpen(false);
											directPdfExport();
										},
										className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-cream transition",
										children: [/* @__PURE__ */ (void 0)(Download, {
											size: 14,
											className: "text-blue-600 shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 635,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-bold text-ink",
												children: "Télécharger PDF (A4)"
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 637,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-mute",
												children: "Export direct 1-clic haute qualité"
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 638,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 636,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 627,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											setExportOpen(false);
											document.dispatchEvent(new Event("libre-png"));
										},
										className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-cream transition",
										children: [/* @__PURE__ */ (void 0)(FileText, {
											size: 14,
											className: "text-zinc-600 shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 649,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-ink",
												children: "Image HD (PNG)"
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 651,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-mute",
												children: "Idéal pour aperçu web ou mobile"
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 652,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 650,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 641,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											setExportOpen(false);
											window.print();
										},
										className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-cream transition",
										children: [/* @__PURE__ */ (void 0)(Printer, {
											size: 14,
											className: "text-zinc-600 shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 663,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-ink",
												children: "Imprimer (Système)"
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 665,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-mute",
												children: "Via l'imprimante ou boîte native"
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 666,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$7,
											lineNumber: 664,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 655,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { className: "my-1 border-t border-line" }, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 669,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											setExportOpen(false);
											document.dispatchEvent(new Event("libre-json"));
										},
										className: "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-mute hover:text-ink hover:bg-cream transition text-xs",
										children: /* @__PURE__ */ (void 0)("span", { children: "Sauvegarder le projet (JSON)" }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 678,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 670,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 626,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 604,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 563,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 391,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref: scrollerRef,
			className: "no-print relative min-h-0 flex-1 overflow-auto bg-paper",
			style: { cursor: spaceOn ? "grab" : "default" },
			onPointerDown: onScrollerPointerDown,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "box-border min-h-full px-8 py-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mx-auto",
					style: {
						width: 794 * zoom,
						height: innerHeight * zoom
					},
					children: [primarySelected && !primarySelected.locked && /* @__PURE__ */ (void 0)("div", {
						className: "no-print absolute left-1/2 z-40 -translate-x-1/2 flex items-center gap-1.5 rounded-xl border border-ink-line bg-ink p-1.5 text-xs text-cream shadow-2xl animate-in fade-in slide-in-from-top-3 whitespace-nowrap flex-nowrap w-max",
						style: { top: floatingBarTop },
						children: [
							[
								"text",
								"heading",
								"experience"
							].includes(primarySelected.type) && /* @__PURE__ */ (void 0)("div", {
								className: "relative flex items-center shrink-0",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => boostElementText(primarySelected.id),
										className: "flex h-8 items-center gap-1.5 rounded-l-lg bg-amber-400 px-2.5 text-xs font-bold text-black hover:bg-amber-300 transition shadow-xs whitespace-nowrap shrink-0",
										title: "Transforme ce texte en une formulation professionnelle orientée résultats",
										children: [/* @__PURE__ */ (void 0)(Sparkles, {
											size: 13,
											className: "shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 710,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "whitespace-nowrap shrink-0",
											children: "✨ Formuler comme un pro"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 711,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 704,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setBoostMenuOpen(!boostMenuOpen),
										className: "flex h-8 items-center px-1 rounded-r-lg bg-amber-400 text-black hover:bg-amber-300 border-l border-amber-500/40 shrink-0",
										title: "Choisir un style de formulation",
										children: /* @__PURE__ */ (void 0)(ChevronDown, {
											size: 11,
											className: "shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 719,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 713,
										columnNumber: 21
									}, this),
									boostMenuOpen && /* @__PURE__ */ (void 0)("div", {
										className: "absolute top-full left-0 mt-1.5 w-64 rounded-ui border border-ink-line bg-ink p-2 text-xs text-cream shadow-2xl z-50 space-y-1.5",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-[10px] font-bold tracking-wider text-amber-300 uppercase px-1",
											children: "Variantes d'impact"
										}, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 725,
											columnNumber: 25
										}, this), BOOST_PRESETS.map((preset) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												const random = preset.options[Math.floor(Math.random() * preset.options.length)];
												boostElementText(primarySelected.id, random);
												setBoostMenuOpen(false);
											},
											className: "w-full text-left rounded-md px-2 py-1.5 hover:bg-ink-line text-[11px] transition",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "font-semibold text-cream",
												children: preset.category
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 739,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-ink-mute truncate",
												children: preset.options[0]
											}, void 0, false, {
												fileName: _jsxFileName$7,
												lineNumber: 740,
												columnNumber: 29
											}, this)]
										}, preset.tone, true, {
											fileName: _jsxFileName$7,
											lineNumber: 729,
											columnNumber: 27
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName$7,
										lineNumber: 724,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 703,
								columnNumber: 19
							}, this),
							["text", "heading"].includes(primarySelected.type) && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1 border-l border-ink-line pl-1.5 shrink-0 whitespace-nowrap",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Diminuer la taille",
										onClick: () => useStudio.getState().patchSelectedStyle({ fontSize: Math.max(8, (primarySelected.style.fontSize || 12) - 1) }),
										className: "flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream shrink-0",
										children: /* @__PURE__ */ (void 0)(Minus, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 761,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 751,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-xs w-6 text-center text-cream shrink-0",
										children: primarySelected.style.fontSize || 12
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 763,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Augmenter la taille",
										onClick: () => useStudio.getState().patchSelectedStyle({ fontSize: Math.min(120, (primarySelected.style.fontSize || 12) + 1) }),
										className: "flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream shrink-0",
										children: /* @__PURE__ */ (void 0)(Plus, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 776,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 766,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Gras",
										onClick: () => useStudio.getState().patchSelectedStyle({ fontWeight: primarySelected.style.fontWeight >= 650 ? 400 : 700 }),
										className: cn("flex size-7 items-center justify-center rounded-md transition shrink-0", primarySelected.style.fontWeight >= 650 ? "bg-cream text-ink font-bold" : "bg-ink-raise text-ink-mute hover:text-cream"),
										children: /* @__PURE__ */ (void 0)(Bold, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 792,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 779,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 750,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1 border-l border-ink-line pl-1.5 shrink-0 whitespace-nowrap",
								children: /* @__PURE__ */ (void 0)("label", {
									className: "flex items-center gap-1 cursor-pointer shrink-0",
									title: "Couleur de fond",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-ink-mute whitespace-nowrap",
										children: "Fond:"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 800,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "color",
										value: primarySelected.style.backgroundColor !== "transparent" ? primarySelected.style.backgroundColor : "#ffffff",
										onChange: (e) => useStudio.getState().patchSelectedStyle({ backgroundColor: e.target.value }),
										className: "size-6 cursor-pointer rounded-md border border-ink-line bg-transparent p-0 shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 801,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 799,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 798,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-0.5 border-l border-ink-line pl-1.5 shrink-0 whitespace-nowrap",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().order("front"),
										className: "flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream shrink-0",
										title: "Mettre au premier plan",
										children: /* @__PURE__ */ (void 0)(BringToFront, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 818,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 812,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().order("back"),
										className: "flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream shrink-0",
										title: "Mettre à l'arrière-plan",
										children: /* @__PURE__ */ (void 0)(SendToBack, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 826,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 820,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().duplicateSelected(),
										className: "flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream shrink-0",
										title: "Dupliquer (⌘D)",
										children: /* @__PURE__ */ (void 0)(Copy, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 834,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 828,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().deleteSelected(),
										className: "flex size-7 items-center justify-center rounded-md bg-red-950/60 text-red-300 hover:bg-red-900 shrink-0",
										title: "Supprimer",
										children: /* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
											fileName: _jsxFileName$7,
											lineNumber: 842,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 836,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 811,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 697,
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
								className: page.id === activePageId ? "rounded-sm ring-1 ring-ink" : "rounded-sm ring-1 ring-line",
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
									fileName: _jsxFileName$7,
									lineNumber: 851,
									columnNumber: 21
								}, this)
							}, page.id, false, {
								fileName: _jsxFileName$7,
								lineNumber: 850,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 848,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 847,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 694,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 693,
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
				fileName: _jsxFileName$7,
				lineNumber: 881,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 687,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 389,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/studio/Inspector.tsx";
var input = "h-10 w-full rounded-ui border border-line bg-sheet px-2 text-sm outline-none";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-xs font-medium text-mute",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 28,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1",
			children
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 29,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
function release() {
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: "flex h-full w-72 shrink-0 flex-col border-l border-line bg-cream select-none z-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-13 shrink-0 items-center justify-between border-b border-line px-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-xs font-bold uppercase tracking-wider text-ink",
				children: one ? TYPE_LABEL[one.type] : selected.length > 1 ? `${selected.length} éléments sélectionnés` : "Propriétés du document"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 58,
				columnNumber: 9
			}, this), one && /* @__PURE__ */ (void 0)("span", {
				className: "text-[10px] text-mute font-mono",
				children: [
					Math.round(one.w),
					"×",
					Math.round(one.h),
					"px"
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 62,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 57,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4",
			children: [
				!selected.length && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-line bg-sheet/80 p-3 space-y-1.5",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "text-xs font-semibold text-ink flex items-center gap-1.5",
							children: [/* @__PURE__ */ (void 0)("span", { children: "💡" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 72,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Astuce d'édition" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 73,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 71,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] leading-relaxed text-mute",
							children: "Cliquez sur n'importe quel bloc sur la page pour le modifier directement, ou ajustez vos informations globales ci-dessous."
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 75,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 70,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-3 pt-1",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between border-b border-line pb-1.5",
								children: /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] font-bold tracking-widest text-mute uppercase",
									children: "Coordonnées du profil"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 82,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 81,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Nom complet",
								children: /* @__PURE__ */ (void 0)("input", {
									className: input,
									value: profile.name,
									onChange: (e) => identity("name", e.target.value),
									onBlur: release,
									placeholder: "Ex: Alexandra Dubois"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 86,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 85,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Intitulé du poste",
								children: /* @__PURE__ */ (void 0)("input", {
									className: input,
									value: profile.role,
									onChange: (e) => identity("role", e.target.value),
									onBlur: release,
									placeholder: "Ex: Lead Développeur"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 89,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 88,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Adresse e-mail",
								children: /* @__PURE__ */ (void 0)("input", {
									className: input,
									value: profile.email,
									onChange: (e) => identity("email", e.target.value),
									onBlur: release,
									placeholder: "contact@domaine.com"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 92,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 91,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Téléphone",
								children: /* @__PURE__ */ (void 0)("input", {
									className: input,
									value: profile.phone,
									onChange: (e) => identity("phone", e.target.value),
									onBlur: release,
									placeholder: "+33 6 00 00 00 00"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 95,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 94,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Ville / Mobilité",
								children: /* @__PURE__ */ (void 0)("input", {
									className: input,
									value: profile.location,
									onChange: (e) => identity("location", e.target.value),
									onBlur: release,
									placeholder: "Paris, France"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 98,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 97,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Lien professionnel (LinkedIn, Portfolio)",
								children: /* @__PURE__ */ (void 0)("input", {
									className: input,
									value: profile.link,
									onChange: (e) => identity("link", e.target.value),
									onBlur: release,
									placeholder: "linkedin.com/in/nom"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 101,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 100,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Résumé de profil / Accroche",
								children: /* @__PURE__ */ (void 0)("textarea", {
									className: `${input} h-24 resize-none py-2`,
									value: profile.summary,
									onChange: (e) => identity("summary", e.target.value),
									onBlur: release,
									placeholder: "Présentation synthétique..."
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 104,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 103,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Field, {
								label: "Couleur de fond du document A4",
								children: /* @__PURE__ */ (void 0)("input", {
									type: "color",
									value: toHex(page.background),
									onChange: (e) => useStudio.getState().setPageBackground(e.target.value, true),
									onBlur: release,
									className: "h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 107,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 106,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 80,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-1.5 border-t border-line pt-3 text-[11px] leading-relaxed text-mute",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "font-semibold text-ink text-xs mb-1",
								children: "Raccourcis clavier :"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 118,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", { children: [
								"• ",
								/* @__PURE__ */ (void 0)("strong", { children: "Double-clic" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 119,
									columnNumber: 20
								}, this),
								" : éditer le texte sur la feuille"
							] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 119,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", { children: [
								"• ",
								/* @__PURE__ */ (void 0)("strong", { children: "Flèches" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 120,
									columnNumber: 20
								}, this),
								" : déplacer de 1 px (Maj : 8 px)"
							] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 120,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", { children: [
								"• ",
								/* @__PURE__ */ (void 0)("strong", { children: "⌘D / Ctrl+D" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 121,
									columnNumber: 20
								}, this),
								" : dupliquer le bloc"
							] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 121,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", { children: [
								"• ",
								/* @__PURE__ */ (void 0)("strong", { children: "Suppr / Retour" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 122,
									columnNumber: 20
								}, this),
								" : effacer le bloc"
							] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 122,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 117,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 69,
					columnNumber: 11
				}, this),
				selected.length > 1 && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-mute",
							children: "Aligner la sélection"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 129,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-3 gap-1",
							children: [
								["left", "Gauche"],
								["center", "Centre"],
								["right", "Droite"],
								["top", "Haut"],
								["middle", "Milieu"],
								["bottom", "Bas"]
							].map(([mode, label]) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-9 rounded-ui border border-line text-xs",
								onClick: () => useStudio.getState().align(mode),
								children: label
							}, mode, false, {
								fileName: _jsxFileName$6,
								lineNumber: 141,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 130,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-1",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-9 rounded-ui border border-line text-xs",
								onClick: () => useStudio.getState().distribute("x"),
								children: "Répartir ↔"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 147,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-9 rounded-ui border border-line text-xs",
								onClick: () => useStudio.getState().distribute("y"),
								children: "Répartir ↕"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 150,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 146,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 128,
					columnNumber: 11
				}, this),
				one && /* @__PURE__ */ (void 0)(ContentFields, {
					el: one,
					pageId: page.id
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 157,
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
					fileName: _jsxFileName$6,
					lineNumber: 160,
					columnNumber: 11
				}, this),
				one && /* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (void 0)(Field, {
							label: "X",
							children: /* @__PURE__ */ (void 0)("input", {
								className: input,
								type: "number",
								value: Math.round(one.x),
								onChange: (e) => live(one.id, { x: Number(e.target.value) }),
								onBlur: release
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 170,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 169,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Y",
							children: /* @__PURE__ */ (void 0)("input", {
								className: input,
								type: "number",
								value: Math.round(one.y),
								onChange: (e) => live(one.id, { y: Number(e.target.value) }),
								onBlur: release
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 173,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 172,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Largeur",
							children: /* @__PURE__ */ (void 0)("input", {
								className: input,
								type: "number",
								value: Math.round(one.w),
								onChange: (e) => live(one.id, { w: Math.max(20, Number(e.target.value) || 20) }),
								onBlur: release
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 176,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 175,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Hauteur",
							children: /* @__PURE__ */ (void 0)("input", {
								className: input,
								type: "number",
								value: Math.round(one.h),
								onChange: (e) => live(one.id, { h: Math.max(12, Number(e.target.value) || 12) }),
								onBlur: release
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 179,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 178,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Rotation",
							children: /* @__PURE__ */ (void 0)("input", {
								className: input,
								type: "number",
								value: Math.round(one.rotation),
								onChange: (e) => live(one.id, { rotation: Number(e.target.value) || 0 }),
								onBlur: release
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 182,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 181,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 168,
					columnNumber: 11
				}, this),
				selected.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap gap-1 border-t border-line pt-3",
					children: [
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Premier plan",
							onClick: () => useStudio.getState().order("front"),
							children: /* @__PURE__ */ (void 0)(BringToFront, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 190,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 189,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Arrière-plan",
							onClick: () => useStudio.getState().order("back"),
							children: /* @__PURE__ */ (void 0)(SendToBack, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 193,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 192,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Dupliquer",
							onClick: () => useStudio.getState().duplicateSelected(),
							children: /* @__PURE__ */ (void 0)(Copy, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 196,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 195,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: selected.some((el) => !el.locked) ? "Verrouiller" : "Déverrouiller",
							onClick: () => useStudio.getState().lockSelected(selected.some((el) => !el.locked)),
							children: selected.some((el) => !el.locked) ? /* @__PURE__ */ (void 0)(Lock, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 199,
								columnNumber: 52
							}, this) : /* @__PURE__ */ (void 0)(LockOpen, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 199,
								columnNumber: 73
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 198,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Supprimer",
							danger: true,
							onClick: () => useStudio.getState().deleteSelected(),
							children: /* @__PURE__ */ (void 0)(Trash2, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 202,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 201,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 188,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 67,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
function IconTip({ label, onClick, children, danger }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: cn("flex size-10 items-center justify-center rounded-ui border border-line", danger && "text-signal"),
		children
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 213,
		columnNumber: 5
	}, this);
}
function ContentFields({ el, pageId }) {
	const patch = (content, live = true) => {
		useStudio.getState().setEditing(null);
		useStudio.getState().patchElement(pageId, el.id, { content }, live);
	};
	const c = el.content;
	if (el.type === "heading" || el.type === "text" || el.type === "contact") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3",
		children: [el.type === "contact" && /* @__PURE__ */ (void 0)(Field, {
			label: "Icône",
			children: /* @__PURE__ */ (void 0)("select", {
				className: input,
				value: c.icon ?? "mail",
				onChange: (e) => patch({ icon: e.target.value }, false),
				children: [
					/* @__PURE__ */ (void 0)("option", {
						value: "mail",
						children: "E-mail"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 237,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("option", {
						value: "phone",
						children: "Téléphone"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 238,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("option", {
						value: "pin",
						children: "Lieu"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 239,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("option", {
						value: "link",
						children: "Lien"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 240,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 236,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 235,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-medium text-mute whitespace-nowrap shrink-0",
					children: "Texte"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 246,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => useStudio.getState().boostElementText(el.id),
					className: "flex items-center gap-1 rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-400/30 transition whitespace-nowrap shrink-0",
					title: "Formuler ce texte de manière percutante",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {
						size: 11,
						className: "shrink-0"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 253,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "whitespace-nowrap",
						children: "✨ Formuler comme un pro"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 254,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 247,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 245,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
				className: `${input} h-24 resize-none py-2`,
				value: c.text ?? "",
				onChange: (e) => patch({ text: e.target.value }),
				onBlur: release
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 257,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 244,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 233,
		columnNumber: 7
	}, this);
	if (el.type === "experience") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Poste",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: c.role ?? "",
					onChange: (e) => patch({ role: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 266,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 265,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Structure",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: c.company ?? "",
					onChange: (e) => patch({ company: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 269,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 268,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Dates",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: c.date ?? "",
					onChange: (e) => patch({ date: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 272,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 271,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-medium text-mute whitespace-nowrap shrink-0",
						children: "Récit & Réalisations"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 276,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => useStudio.getState().boostElementText(el.id),
						className: "flex items-center gap-1 rounded-md bg-amber-400/25 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-400/40 transition whitespace-nowrap shrink-0",
						title: "Ajoute une réalisation concrète et chiffrée",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {
							size: 11,
							className: "shrink-0"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 283,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "whitespace-nowrap",
							children: "✨ Chiffrer comme un pro"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 284,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 277,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 275,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
					className: `${input} h-28 resize-none py-2`,
					value: c.desc ?? "",
					onChange: (e) => patch({ desc: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 287,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 274,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 264,
		columnNumber: 7
	}, this);
	if (el.type === "education") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Diplôme",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: c.degree ?? "",
					onChange: (e) => patch({ degree: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 296,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 295,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "École",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: c.school ?? "",
					onChange: (e) => patch({ school: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 299,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 298,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Dates",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: c.date ?? "",
					onChange: (e) => patch({ date: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 302,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 301,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 294,
		columnNumber: 7
	}, this);
	if (el.type === "skills") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
		label: "Une compétence par ligne",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
			className: `${input} h-28 resize-none py-2`,
			value: (c.items ?? []).join("\n"),
			onChange: (e) => patch({ items: e.target.value.split("\n") }),
			onBlur: (e) => {
				patch({ items: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) }, false);
				release();
			}
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 310,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 309,
		columnNumber: 7
	}, this);
	if (el.type === "meters") {
		const meters = c.meters ?? [];
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [meters.map((meter, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-[1fr_4.5rem] gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
					value: meter.label,
					onChange: (e) => {
						const next = meters.map((m, i) => i === index ? {
							...m,
							label: e.target.value
						} : m);
						patch({ meters: next });
					},
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 328,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: input,
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
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 337,
					columnNumber: 13
				}, this)]
			}, index, true, {
				fileName: _jsxFileName$6,
				lineNumber: 327,
				columnNumber: 11
			}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				className: "h-9 w-full rounded-ui border border-line text-xs",
				onClick: () => patch({ meters: [...meters, {
					label: "Nouvelle",
					value: 50
				}] }, false),
				children: "Ajouter un niveau"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 351,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 325,
			columnNumber: 7
		}, this);
	}
	if (el.type === "photo") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [c.src ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: c.src,
				alt: "Photo profil",
				className: "size-16 rounded-xl object-cover border border-line shadow-xs"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 366,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex size-16 items-center justify-center rounded-xl border border-dashed border-line bg-sheet text-mute",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image$1, { size: 20 }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 369,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 368,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "flex h-9 w-full cursor-pointer items-center justify-center rounded-ui bg-ink text-xs font-semibold text-cream hover:bg-neutral-800 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: c.src ? "Remplacer l'image" : "Choisir une photo" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 374,
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
								useStudio.getState().notify("Photo optimisée & intégrée !");
							} catch {
								useStudio.getState().notify("Impossible de lire cette image");
							}
							e.target.value = "";
						}
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 375,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 373,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-mute",
					children: "Compression & redimensionnement automatiques HD (<80 KB)"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 393,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 372,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 364,
			columnNumber: 9
		}, this), c.src && /* @__PURE__ */ (void 0)("button", {
			type: "button",
			onClick: () => patch({ src: "" }, false),
			className: "flex h-8 w-full items-center justify-center gap-1 rounded-ui border border-line text-xs text-mute hover:border-red-300 hover:text-red-500 transition",
			children: [/* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 402,
				columnNumber: 13
			}, this), /* @__PURE__ */ (void 0)("span", { children: "Retirer la photo" }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 403,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 397,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 363,
		columnNumber: 7
	}, this);
	return null;
}
function StyleFields({ style, mixed, textual }) {
	const patch = (next, live = false) => useStudio.getState().patchSelectedStyle(next, live);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3 border-t border-line pt-3",
		children: [
			mixed && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-mute",
				children: "Le style s’applique à toute la sélection."
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 416,
				columnNumber: 17
			}, this),
			textual && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (void 0)(Field, {
					label: "Police",
					children: /* @__PURE__ */ (void 0)("select", {
						className: input,
						value: FONTS.includes(style.fontFamily) ? style.fontFamily : "Source Sans 3",
						onChange: (e) => patch({ fontFamily: e.target.value }),
						children: FONTS.map((font) => /* @__PURE__ */ (void 0)("option", {
							value: font,
							style: { fontFamily: font },
							children: font
						}, font, false, {
							fileName: _jsxFileName$6,
							lineNumber: 422,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 420,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 419,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-[1fr_auto_auto] gap-1",
					children: [
						/* @__PURE__ */ (void 0)("input", {
							className: input,
							type: "number",
							min: 8,
							max: 160,
							value: style.fontSize,
							onChange: (e) => patch({ fontSize: Number(e.target.value) || 12 }, true),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 429,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							"aria-label": "Gras",
							className: cn("flex size-10 items-center justify-center rounded-ui border border-line", style.fontWeight >= 650 && "bg-ink text-cream"),
							onClick: () => patch({ fontWeight: style.fontWeight >= 650 ? 400 : 700 }),
							children: /* @__PURE__ */ (void 0)(Bold, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 431,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 430,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							"aria-label": "Italique",
							className: cn("flex size-10 items-center justify-center rounded-ui border border-line", style.italic && "bg-ink text-cream"),
							onClick: () => patch({ italic: !style.italic }),
							children: /* @__PURE__ */ (void 0)(Italic, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 434,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 433,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 428,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-3 gap-1",
					children: [
						["left", AlignLeft],
						["center", AlignCenter],
						["right", AlignRight]
					].map(([align, Icon]) => /* @__PURE__ */ (void 0)("button", {
						type: "button",
						"aria-label": align,
						className: cn("flex h-9 items-center justify-center rounded-ui border border-line", style.textAlign === align && "bg-ink text-cream"),
						onClick: () => patch({ textAlign: align }),
						children: /* @__PURE__ */ (void 0)(Icon, { size: 15 }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 446,
							columnNumber: 17
						}, this)
					}, align, false, {
						fileName: _jsxFileName$6,
						lineNumber: 445,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 437,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)(Field, {
					label: "Couleur du texte",
					children: /* @__PURE__ */ (void 0)("input", {
						type: "color",
						value: toHex(style.color),
						onChange: (e) => patch({ color: e.target.value }, true),
						onBlur: release,
						className: "h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 451,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 450,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)(Field, {
					label: "Interligne",
					children: /* @__PURE__ */ (void 0)("input", {
						type: "range",
						min: .9,
						max: 2,
						step: .05,
						value: style.lineHeight,
						onChange: (e) => patch({ lineHeight: Number(e.target.value) }, true),
						onPointerUp: release,
						className: "w-full"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 454,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 453,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)(Field, {
					label: "Approche",
					children: /* @__PURE__ */ (void 0)("input", {
						type: "range",
						min: -1,
						max: 8,
						step: .1,
						value: style.letterSpacing,
						onChange: (e) => patch({ letterSpacing: Number(e.target.value) }, true),
						onPointerUp: release,
						className: "w-full"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 457,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 456,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 418,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Fond",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "color",
						value: toHex(style.backgroundColor),
						onChange: (e) => patch({ backgroundColor: e.target.value }, true),
						onBlur: release,
						className: "h-10 min-w-0 flex-1 cursor-pointer rounded-ui border border-line bg-sheet"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 463,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "h-10 rounded-ui border border-line px-2 text-xs",
						onClick: () => patch({ backgroundColor: "transparent" }),
						children: "Aucun"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 464,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 462,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 461,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Coins",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					type: "range",
					min: 0,
					max: 80,
					value: style.borderRadius,
					onChange: (e) => patch({ borderRadius: Number(e.target.value) }, true),
					onPointerUp: release,
					className: "w-full"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 470,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 469,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
				label: "Opacité",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					type: "range",
					min: .15,
					max: 1,
					step: .05,
					value: style.opacity,
					onChange: (e) => patch({ opacity: Number(e.target.value) }, true),
					onPointerUp: release,
					className: "w-full"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 473,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 472,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Bord",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						className: input,
						type: "number",
						min: 0,
						max: 12,
						value: style.borderWidth,
						onChange: (e) => patch({ borderWidth: Number(e.target.value) || 0 }, true),
						onBlur: release
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 477,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 476,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
					label: "Trait",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "color",
						value: toHex(style.borderColor),
						onChange: (e) => patch({ borderColor: e.target.value }, true),
						onBlur: release,
						className: "h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 480,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 479,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 475,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 415,
		columnNumber: 5
	}, this);
}
function toHex(color) {
	return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#141311";
}
var _jsxFileName$5 = "/app/applet/src/components/studio/Sidebar.tsx";
var ADD = [
	{
		type: "heading",
		label: "Titre",
		icon: Heading
	},
	{
		type: "text",
		label: "Texte",
		icon: Type
	},
	{
		type: "experience",
		label: "Poste",
		icon: Briefcase
	},
	{
		type: "education",
		label: "École",
		icon: GraduationCap
	},
	{
		type: "skills",
		label: "Skills",
		icon: Tags
	},
	{
		type: "meters",
		label: "Niveau",
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
		label: "Bloc",
		icon: Square
	},
	{
		type: "ellipse",
		label: "Rond",
		icon: Circle
	},
	{
		type: "rule",
		label: "Trait",
		icon: Minus
	}
];
function Thumb({ id }) {
	if (id === "executive") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-full w-1/3 bg-ink" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 56,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col gap-1 p-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-2/3 rounded-full bg-ink" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 58,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 59,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 60,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 57,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 55,
		columnNumber: 7
	}, this);
	if (id === "creative") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative h-full bg-sheet",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 right-0 size-8 rounded-full bg-signal" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 68,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute right-1 bottom-1 left-1 h-2 rounded-sm bg-ink" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 69,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-3 left-1.5 h-1.5 w-8 rounded-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 70,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 67,
		columnNumber: 7
	}, this);
	if (id === "swiss") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full bg-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-full w-1 bg-signal" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 77,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid flex-1 grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-r border-line p-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-ink" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 80,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 79,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 83,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 82,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 78,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 76,
		columnNumber: 7
	}, this);
	if (id === "editorial") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full flex-col justify-center gap-1 bg-sheet px-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2 w-5/6 rounded-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 92,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 93,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-1/2 rounded-full bg-line" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 94,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 91,
		columnNumber: 7
	}, this);
	if (id === "minimal") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full flex-col items-center justify-center gap-1 bg-sheet px-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1.5 w-2/3 rounded-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 101,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-6 bg-ink" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 102,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 103,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 100,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full flex-col bg-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2/5 bg-ink" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 109,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col gap-1 p-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-1/2 rounded-full bg-ink" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 111,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 112,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 113,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 110,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 108,
		columnNumber: 5
	}, this);
}
function Sidebar({ onDone }) {
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const selectedIds = useStudio((s) => s.selectedIds);
	const showGrid = useStudio((s) => s.showGrid);
	const snap = useStudio((s) => s.snap);
	const guides = useStudio((s) => s.guides);
	const margins = useStudio((s) => s.margins);
	const saveStatus = useStudio((s) => s.saveStatus);
	const lastSavedAt = useStudio((s) => s.lastSavedAt);
	const page = activePage(doc, activePageId);
	const jsonRef = (0, import_react.useRef)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("templates");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const done = () => onDone?.();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: "flex h-full w-72 shrink-0 flex-col bg-ink text-cream border-r border-ink-line select-none z-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-13 shrink-0 items-center justify-between border-b border-ink-line px-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex size-7 items-center justify-center rounded-lg bg-white font-display text-xs font-black text-ink shadow-xs",
						children: "CV"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 145,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-display text-xs font-bold tracking-wider leading-none",
						children: "CV STUDIO PRO"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 149,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-1 text-[10px] text-ink-mute",
						children: "Édition & Design A4"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 150,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 148,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 144,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 text-[11px] text-ink-mute",
					title: "Sauvegarde automatique active",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-2 rounded-full transition-all duration-300", saveStatus === "saving" ? "bg-amber-400 animate-ping" : "bg-emerald-400") }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 159,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] text-zinc-400",
						children: saveStatus === "saving" ? "Sauvegarde..." : mounted && lastSavedAt ? "Auto-save" : "Auto-save"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 165,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 155,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-3 border-b border-ink-line bg-ink-raise/40 p-1 text-[11px] font-medium shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("templates"),
						className: cn("flex items-center justify-center gap-1.5 rounded-md py-1.5 transition text-xs", activeTab === "templates" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutTemplate, { size: 13 }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 181,
							columnNumber: 11
						}, this), "Modèles"]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 173,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("blocks"),
						className: cn("flex items-center justify-center gap-1.5 rounded-md py-1.5 transition text-xs", activeTab === "blocks" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { size: 13 }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 192,
							columnNumber: 11
						}, this), "Ajouter"]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 184,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("layers"),
						className: cn("flex items-center justify-center gap-1.5 rounded-md py-1.5 transition text-xs", activeTab === "layers" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { size: 13 }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 203,
							columnNumber: 11
						}, this), "Calques"]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 195,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 172,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-3.5 py-3.5",
				children: [
					activeTab === "templates" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3 space-y-2",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1.5 text-xs font-bold text-emerald-300",
											children: [/* @__PURE__ */ (void 0)(FileCheck, {
												size: 14,
												className: "text-emerald-400"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 217,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Importer un CV" }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 218,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 216,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "rounded bg-emerald-500/25 px-1.5 py-0.5 text-[9px] font-bold text-emerald-200",
											children: "IA & Extraction"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 220,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 215,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[11px] leading-snug text-zinc-300",
										children: "Téléversez votre PDF, Word (.docx) ou texte brut : l'extracteur remplit instantanément vos sections."
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 224,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											useStudio.getState().setExtractorModalOpen(true);
											done();
										},
										className: "flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs",
										children: [/* @__PURE__ */ (void 0)(Upload, { size: 13 }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 235,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Sélectionner mon CV existant" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 236,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 227,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 214,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h2", {
										className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
										children: [
											"Modèles de design (",
											TEMPLATES.length,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 243,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-zinc-400",
										children: "Mise en page pro"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 246,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 242,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2",
									children: TEMPLATES.map((tpl) => /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											useStudio.getState().applyTemplate(tpl.id);
											done();
										},
										className: "group overflow-hidden rounded-xl border border-ink-line bg-ink-raise text-left transition hover:border-cream",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "h-16 overflow-hidden bg-sheet/10 p-1 group-hover:scale-[1.02] transition",
											children: /* @__PURE__ */ (void 0)(Thumb, { id: tpl.id }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 260,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 259,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "p-2 border-t border-ink-line/50",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-cream leading-tight",
												children: tpl.name
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 263,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-ink-mute truncate",
												children: tpl.note
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 264,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 262,
											columnNumber: 21
										}, this)]
									}, tpl.id, true, {
										fileName: _jsxFileName$5,
										lineNumber: 250,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 248,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 241,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 border-t border-ink-line pt-3",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("h2", {
											className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase flex items-center gap-1",
											children: [/* @__PURE__ */ (void 0)(WandSparkles, {
												size: 12,
												className: "text-amber-400"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 275,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Profils par métier" }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 276,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 274,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-amber-400 font-medium",
											children: "1 clic = pré-rempli"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 278,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 273,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[11px] leading-snug text-ink-mute",
										children: "Besoin d'inspiration ? Chargez un profil complet avec chiffres d'impact et compétences types :"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 280,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 gap-1.5",
										children: JOB_PRESETS.map((preset) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												useStudio.getState().applyJobPreset(preset.id);
												done();
											},
											className: "flex flex-col rounded-lg border border-ink-line bg-ink-raise p-2 text-left transition hover:border-amber-400/60 hover:bg-ink-line/40",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-cream leading-tight truncate",
												children: preset.label
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 294,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[9px] text-ink-mute truncate mt-0.5",
												children: preset.badge
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 295,
												columnNumber: 21
											}, this)]
										}, preset.id, true, {
											fileName: _jsxFileName$5,
											lineNumber: 285,
											columnNumber: 19
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 283,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 272,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 border-t border-ink-line pt-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h2", {
										className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
										children: "Harmonies Couleurs"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 304,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-ink-mute",
										children: "Harmonise tout le CV"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 307,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 303,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-3 gap-1.5",
									children: COLOR_PALETTES.map((palette) => /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().applyPalette(palette.id),
										className: "group flex flex-col items-center gap-1 rounded-lg border border-ink-line bg-ink-raise p-2 hover:border-cream transition",
										title: palette.desc,
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "size-6 rounded-full border border-ink-line group-hover:scale-110 group-hover:border-cream transition flex items-center justify-center",
											style: { backgroundColor: palette.primary },
											children: /* @__PURE__ */ (void 0)("div", {
												className: "size-2 rounded-full",
												style: { backgroundColor: palette.accent }
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 322,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 318,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[9px] font-medium text-cream text-center leading-tight truncate w-full",
											children: palette.name.split("/")[0].trim()
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 324,
											columnNumber: 21
										}, this)]
									}, palette.id, true, {
										fileName: _jsxFileName$5,
										lineNumber: 311,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 309,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 302,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 212,
						columnNumber: 11
					}, this),
					activeTab === "blocks" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("h2", {
									className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
									children: "Packs complets prêts à poser"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 340,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] text-amber-400 font-medium",
									children: "Pré-groupés"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 343,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 339,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5",
								children: SECTION_PACKS.map((pack) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										useStudio.getState().addSectionPack(pack.id);
										done();
									},
									className: "group flex w-full items-center gap-2.5 rounded-xl border border-ink-line bg-ink-raise p-2.5 text-left transition hover:border-cream hover:bg-ink-line/40",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink-line text-sm",
											children: pack.icon
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 356,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-cream leading-tight",
												children: pack.name
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 360,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-ink-mute truncate",
												children: pack.desc
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 361,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 359,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-ink-mute group-hover:text-cream",
											children: "+"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 363,
											columnNumber: 21
										}, this)
									]
								}, pack.id, true, {
									fileName: _jsxFileName$5,
									lineNumber: 347,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 345,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 338,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2 border-t border-ink-line pt-3",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
								children: "Blocs individuels"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 371,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-4 gap-1.5",
								children: ADD.map((item) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										useStudio.getState().addElement(item.type);
										done();
									},
									className: "flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg border border-ink-line bg-ink-raise text-ink-mute hover:text-cream hover:border-cream transition",
									children: [/* @__PURE__ */ (void 0)(item.icon, {
										size: 13,
										strokeWidth: 1.75,
										"aria-hidden": true
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 385,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px]",
										children: item.label
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 386,
										columnNumber: 21
									}, this)]
								}, item.type, true, {
									fileName: _jsxFileName$5,
									lineNumber: 376,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 374,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 370,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 336,
						columnNumber: 11
					}, this),
					activeTab === "layers" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h2", {
										className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
										children: [
											"Pages A4 (",
											doc.pages.length,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 400,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										"aria-label": "Nouvelle page",
										className: "flex h-6 items-center gap-1 px-2 rounded-md bg-cream text-[10px] font-bold text-ink hover:bg-white transition",
										onClick: () => useStudio.getState().addPage(),
										children: [/* @__PURE__ */ (void 0)(Plus, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 409,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Page" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 410,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 403,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 399,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-1",
									children: doc.pages.map((item, index) => /* @__PURE__ */ (void 0)("div", {
										className: cn("flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition", item.id === activePageId ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line bg-ink-raise text-cream"),
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
												fileName: _jsxFileName$5,
												lineNumber: 422,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("button", {
												type: "button",
												title: "Dupliquer la page",
												className: "flex size-6 items-center justify-center text-ink-mute hover:text-cream",
												onClick: () => {
													useStudio.getState().setActive(item.id);
													useStudio.getState().duplicatePage();
												},
												children: /* @__PURE__ */ (void 0)(Copy, { size: 11 }, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 438,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 429,
												columnNumber: 21
											}, this),
											doc.pages.length > 1 && /* @__PURE__ */ (void 0)("button", {
												type: "button",
												title: "Supprimer la page",
												className: "flex size-6 items-center justify-center text-red-400 hover:text-red-300",
												onClick: () => useStudio.getState().deletePage(item.id),
												children: /* @__PURE__ */ (void 0)(Trash2, { size: 11 }, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 447,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 441,
												columnNumber: 23
											}, this)
										]
									}, item.id, true, {
										fileName: _jsxFileName$5,
										lineNumber: 415,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 413,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 398,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 border-t border-ink-line pt-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h2", {
										className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
										children: [
											"Calques (",
											page.elements.length,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 458,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-ink-mute",
										children: "Ordre Z"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 461,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 457,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "max-h-48 space-y-1 overflow-y-auto pr-0.5",
									children: [[...page.elements].sort((a, b) => b.z - a.z).map((el) => /* @__PURE__ */ (void 0)("div", {
										className: cn("flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition", selectedIds.includes(el.id) ? "border-cream bg-cream text-ink font-medium" : "border-ink-line bg-ink-raise text-cream"),
										children: [/* @__PURE__ */ (void 0)("button", {
											type: "button",
											className: "min-w-0 flex-1 truncate text-left text-xs",
											onClick: () => {
												useStudio.getState().setActive(page.id);
												useStudio.getState().select([el.id]);
											},
											children: snippet(el)
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 476,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											"aria-label": el.hidden ? "Afficher" : "Masquer",
											className: "flex size-6 items-center justify-center text-ink-mute hover:text-cream",
											onClick: () => useStudio.getState().toggleHidden(page.id, el.id),
											children: el.hidden ? /* @__PURE__ */ (void 0)(EyeOff, { size: 12 }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 492,
												columnNumber: 38
											}, this) : /* @__PURE__ */ (void 0)(Eye, { size: 12 }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 492,
												columnNumber: 61
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 486,
											columnNumber: 23
										}, this)]
									}, el.id, true, {
										fileName: _jsxFileName$5,
										lineNumber: 467,
										columnNumber: 21
									}, this)), page.elements.length === 0 && /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-ink-mute py-2 text-center",
										children: "Page vide."
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 497,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 463,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 456,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 border-t border-ink-line pt-3",
								children: [/* @__PURE__ */ (void 0)("h2", {
									className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
									children: "Aides au positionnement"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 504,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-1.5",
									children: [
										[
											"Grille",
											showGrid,
											"showGrid",
											Grid3x3
										],
										[
											"Aimant",
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
										className: cn("flex h-8 items-center justify-between rounded-lg border px-2.5 text-[11px] font-medium transition", on ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line bg-ink-raise text-ink-mute hover:text-cream"),
										children: [/* @__PURE__ */ (void 0)("span", { children: label }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 525,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-bold",
											children: on ? "✓" : ""
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 526,
											columnNumber: 21
										}, this)]
									}, key, true, {
										fileName: _jsxFileName$5,
										lineNumber: 516,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 507,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 503,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 396,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 209,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "shrink-0 border-t border-ink-line p-3 space-y-2 bg-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "flex h-8 items-center justify-center gap-1 rounded-lg border border-ink-line bg-ink-raise text-[11px] font-medium text-cream hover:bg-ink-line/50 transition",
							onClick: () => jsonRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { size: 12 }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 543,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ouvrir JSON" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 544,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 538,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "flex h-8 items-center justify-center gap-1 rounded-lg border border-ink-line bg-ink-raise text-[11px] font-medium text-cream hover:bg-ink-line/50 transition",
							onClick: () => document.dispatchEvent(new Event("libre-json")),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 12 }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 551,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sauvegarder" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 552,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 546,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 537,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "h-7 w-full text-[11px] text-ink-mute hover:text-cream transition text-center",
						onClick: () => {
							if (confirm("Réinitialiser et créer un nouveau document vierge ?")) useStudio.getState().newDocument();
						},
						children: "Nouveau document vierge"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 556,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						ref: jsonRef,
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
									useStudio.getState().notify("JSON illisible");
								}
							};
							reader.readAsText(file);
							event.target.value = "";
						}
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 568,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 536,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 141,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/studio/CloudSyncModal.tsx";
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
								fileName: _jsxFileName$4,
								lineNumber: 49,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 48,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-sm font-bold tracking-wide",
							children: "Synchronisation Cloud Multi-appareils"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 52,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-mute",
							children: "Sans compte ni mot de passe"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 53,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 51,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 47,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: onClose,
						className: "flex size-7 items-center justify-center rounded-md text-mute hover:bg-paper hover:text-ink transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 61,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 56,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
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
							fileName: _jsxFileName$4,
							lineNumber: 74,
							columnNumber: 13
						}, this), "Sauvegarder ce CV"]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 67,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("load"),
						className: `flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${activeTab === "load" ? "bg-sheet text-ink shadow-xs" : "text-mute hover:text-ink"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 84,
							columnNumber: 13
						}, this), "Ouvrir sur cet appareil"]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 77,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
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
								fileName: _jsxFileName$4,
								lineNumber: 93,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Retrouvez votre CV sur mobile ou un autre PC" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 94,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 92,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] leading-relaxed text-blue-900/80",
							children: "Générez un code unique ou un lien direct pour continuer l'édition de votre CV instantanément sur n'importe quel autre appareil."
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 96,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
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
										fileName: _jsxFileName$4,
										lineNumber: 104,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-1 font-mono text-2xl font-black tracking-wider text-ink",
										children: syncCode
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 105,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-[10px] text-mute",
										children: "Entrez ce code sur votre téléphone ou autre ordinateur"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 108,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 103,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-medium text-mute",
									children: "Lien de synchronisation directe :"
								}, void 0, false, {
									fileName: _jsxFileName$4,
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
										fileName: _jsxFileName$4,
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
											fileName: _jsxFileName$4,
											lineNumber: 127,
											columnNumber: 33
										}, this) : /* @__PURE__ */ (void 0)(Copy, { size: 13 }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 127,
											columnNumber: 84
										}, this), /* @__PURE__ */ (void 0)("span", { children: copied ? "Copié !" : "Copier" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 128,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 122,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 115,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
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
									fileName: _jsxFileName$4,
									lineNumber: 139,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Mettre à jour les modifications dans le Cloud" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 140,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 133,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
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
								fileName: _jsxFileName$4,
								lineNumber: 151,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: loading ? "Génération du code..." : "Activer la synchronisation Cloud" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 152,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 145,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-mute",
							children: "Génère instantanément votre clé de synchronisation multi-appareils"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 154,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 144,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
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
							fileName: _jsxFileName$4,
							lineNumber: 164,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("label", {
								className: "text-xs font-medium text-ink",
								children: "Code de synchronisation :"
							}, void 0, false, {
								fileName: _jsxFileName$4,
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
								fileName: _jsxFileName$4,
								lineNumber: 170,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 168,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							disabled: loading || !inputCode.trim(),
							onClick: handleLoadCode,
							className: "flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-bold text-cream hover:bg-neutral-800 disabled:opacity-40 transition",
							children: [/* @__PURE__ */ (void 0)(Download, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 186,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", { children: loading ? "Recherche du CV..." : "Charger le CV depuis le Cloud" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 187,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 180,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 163,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 45,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 44,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/studio/MobileTouchEditor.tsx";
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
					fileName: _jsxFileName$3,
					lineNumber: 74,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-mute",
					children: "Modifiez facilement chaque rubrique au doigt"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 75,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 73,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: onSwitchToCanvas,
					className: "flex items-center gap-1.5 rounded-full border border-ink bg-ink px-3 py-1.5 text-xs font-bold text-cream shadow-sm hover:bg-neutral-800 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 13 }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 83,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Aperçu A4" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 84,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 78,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
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
									fileName: _jsxFileName$3,
									lineNumber: 97,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 96,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold text-emerald-950 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Importer un CV existant" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 101,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded bg-emerald-200 px-1 py-0.2 text-[9px] font-bold text-emerald-800",
									children: "PDF / Word"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 102,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 100,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-emerald-800/80",
								children: "Extrait automatiquement vos rubriques"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 106,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 99,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 95,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-bold text-emerald-700",
							children: "Ouvrir →"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 111,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
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
									fileName: _jsxFileName$3,
									lineNumber: 118,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Remplir par métier (Zéro page blanche)" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 119,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 117,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-semibold text-amber-800",
								children: "1 clic"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 121,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
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
								fileName: _jsxFileName$3,
								lineNumber: 134,
								columnNumber: 13
							}, this), JOB_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: p.id,
								children: p.label
							}, p.id, false, {
								fileName: _jsxFileName$3,
								lineNumber: 138,
								columnNumber: 15
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 124,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 154,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 153,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Identité & Coordonnées" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 156,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 152,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "identity" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 158,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
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
											fileName: _jsxFileName$3,
											lineNumber: 167,
											columnNumber: 21
										}, this) : /* @__PURE__ */ (void 0)(Image$1, { size: 20 }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 173,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 165,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold",
												children: "Photo de profil"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 177,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-mute mb-1.5",
												children: "Compression automatique sans ralentissement"
											}, void 0, false, {
												fileName: _jsxFileName$3,
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
													fileName: _jsxFileName$3,
													lineNumber: 181,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 179,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 176,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 164,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-[11px] font-semibold text-mute",
									children: "Nom complet"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 196,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: profile.name,
									onChange: (e) => setIdentity("name", e.target.value),
									className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 197,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 195,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-[11px] font-semibold text-mute",
									children: "Intitulé de poste cible"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 206,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: profile.role,
									onChange: (e) => setIdentity("role", e.target.value),
									className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 207,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 205,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Email"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 217,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "email",
										value: profile.email,
										onChange: (e) => setIdentity("email", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 218,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 216,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Téléphone"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 226,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "tel",
										value: profile.phone,
										onChange: (e) => setIdentity("phone", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 227,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 225,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 215,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Ville / Pays"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 238,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: profile.location,
										onChange: (e) => setIdentity("location", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 239,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 237,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-semibold text-mute",
										children: "Lien / LinkedIn"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 247,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: profile.link,
										onChange: (e) => setIdentity("link", e.target.value),
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 248,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 246,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 236,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 162,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 269,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 268,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Accroche & Bio professionnelle" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 271,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 267,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "summary" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 273,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
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
									fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 288,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "✨ Formuler pro" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 289,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 280,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 278,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								rows: 4,
								value: profile.summary,
								onChange: (e) => setIdentity("summary", e.target.value),
								className: "w-full rounded-xl border border-line bg-paper p-3 text-xs leading-relaxed text-ink outline-none"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 292,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 277,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 311,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 310,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Expériences (",
									page.elements.filter((e) => e.type === "experience").length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 313,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 309,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "experiences" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 315,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
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
											fileName: _jsxFileName$3,
											lineNumber: 325,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => boostElementText(el.id),
												className: "flex items-center gap-1 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-black",
												children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 332,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", { children: "✨ Chiffrer" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 333,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
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
													fileName: _jsxFileName$3,
													lineNumber: 343,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 335,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 326,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
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
											fileName: _jsxFileName$3,
											lineNumber: 357,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											placeholder: "Dates",
											value: el.content.date ?? "",
											onChange: (e) => patchElement(page.id, el.id, { content: { date: e.target.value } }),
											className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 364,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 373,
										columnNumber: 21
									}, this)
								]
							}, el.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 323,
								columnNumber: 19
							}, this)), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => addSectionPack("pack-experience"),
								className: "flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/40 bg-paper text-xs font-bold text-ink hover:bg-cream transition",
								children: [/* @__PURE__ */ (void 0)(Plus, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 388,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "+ Ajouter une expérience chiffrée" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 389,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 383,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 319,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 404,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 403,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Formations (",
									page.elements.filter((e) => e.type === "education").length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 406,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 402,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
								size: 16,
								className: `transition-transform ${expandedSection === "educations" ? "rotate-180" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 408,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
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
											fileName: _jsxFileName$3,
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
												fileName: _jsxFileName$3,
												lineNumber: 427,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 419,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
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
											fileName: _jsxFileName$3,
											lineNumber: 440,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											placeholder: "Dates",
											value: el.content.date ?? "",
											onChange: (e) => patchElement(page.id, el.id, { content: { date: e.target.value } }),
											className: "h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 447,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 439,
										columnNumber: 21
									}, this)
								]
							}, el.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 416,
								columnNumber: 19
							}, this)), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => addSectionPack("pack-education"),
								className: "flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/40 bg-paper text-xs font-bold text-ink hover:bg-cream transition",
								children: [/* @__PURE__ */ (void 0)(Plus, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 463,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "+ Ajouter une formation" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 464,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 458,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 412,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 396,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-line bg-sheet p-3.5 shadow-xs space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 text-xs font-bold text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 473,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Harmonies Couleurs (1 clic)" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 474,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
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
										fileName: _jsxFileName$3,
										lineNumber: 488,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 484,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-medium text-ink truncate w-full text-center",
									children: pal.name.split("/")[0].trim()
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 490,
									columnNumber: 17
								}, this)]
							}, pal.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 478,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 476,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 471,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
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
						fileName: _jsxFileName$3,
						lineNumber: 506,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Voir Planche A4" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 507,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 501,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					disabled: pdfLoading,
					onClick: handleDirectPdf,
					className: "ml-2 flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { size: 15 }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 516,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pdfLoading ? "Génération..." : "PDF Direct" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 517,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 510,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 500,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 70,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/studio/CvExtractorModal.tsx";
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
							className: "flex size-9 items-center justify-center rounded-xl bg-signal font-bold text-white shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 18 }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 145,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 144,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display text-base font-bold tracking-tight",
								children: "Importateur & Extracteur de CV"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 149,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700",
								children: "CV_extractor 2026"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 152,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 148,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-mute",
							children: "Importez votre CV existant : extraction automatique des expériences, formations, compétences et coordonnées."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 156,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 147,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 143,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setOpen(false),
						"aria-label": "Fermer",
						className: "flex size-8 items-center justify-center rounded-lg border border-line bg-sheet text-mute hover:bg-line/40 hover:text-ink transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 167,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 161,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 142,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-1.5 border-b border-line bg-cream/50 px-5 py-2 text-[11px] text-mute",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-ink",
						children: "Formats reconnus :"
					}, void 0, false, {
						fileName: _jsxFileName$2,
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
						fileName: _jsxFileName$2,
						lineNumber: 175,
						columnNumber: 13
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 172,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex border-b border-line bg-paper text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("file"),
						className: cn("flex flex-1 items-center justify-center gap-2 border-b-2 py-3 transition", activeTab === "file" ? "border-signal bg-sheet text-signal" : "border-transparent text-mute hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 193,
							columnNumber: 13
						}, this), "Fichier (PDF, Word, ODT, TXT)"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 183,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("text"),
						className: cn("flex flex-1 items-center justify-center gap-2 border-b-2 py-3 transition", activeTab === "text" ? "border-signal bg-sheet text-signal" : "border-transparent text-mute hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 14 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 206,
							columnNumber: 13
						}, this), "Copier-Coller le texte brut"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 196,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
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
								className: cn("flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all", dragOver ? "border-signal bg-signal/5 scale-[0.99]" : "border-line bg-sheet hover:border-signal/50 hover:bg-cream/40"),
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
										fileName: _jsxFileName$2,
										lineNumber: 236,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "flex size-12 items-center justify-center rounded-2xl bg-signal/10 text-signal mb-2",
										children: /* @__PURE__ */ (void 0)(Upload, { size: 24 }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 249,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 248,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-sm font-bold text-ink",
										children: ["Glissez-déposez votre CV ici, ou ", /* @__PURE__ */ (void 0)("span", {
											className: "text-signal underline",
											children: "cliquez pour parcourir"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 252,
											columnNumber: 52
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 251,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-mute",
										children: "Sélectionnez un document PDF, DOCX, ODT ou TXT (jusqu'à 12 Mo)."
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 254,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 216,
								columnNumber: 15
							}, this), selectedFile && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between rounded-xl border border-line bg-paper px-3.5 py-2 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [
										/* @__PURE__ */ (void 0)(FileType, {
											size: 16,
											className: "text-signal shrink-0"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 262,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-ink truncate",
											children: selectedFile.name
										}, void 0, false, {
											fileName: _jsxFileName$2,
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
											fileName: _jsxFileName$2,
											lineNumber: 264,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 261,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										handleProcessFile(selectedFile);
									},
									disabled: isProcessing,
									className: "flex items-center gap-1 font-semibold text-signal hover:underline disabled:opacity-50",
									children: "Ré-analyser"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 268,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 260,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
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
									fileName: _jsxFileName$2,
									lineNumber: 288,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => handleProcessText(SAMPLE_RAW_TEXT),
									className: "text-xs font-semibold text-signal hover:underline",
									children: "Charger un exemple type →"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 291,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 287,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								value: rawText,
								onChange: (e) => handleProcessText(e.target.value),
								rows: 7,
								placeholder: "Collez ici le texte brut de votre CV ou résumé LinkedIn...",
								className: "w-full resize-none rounded-xl border border-line bg-sheet p-3 font-mono text-xs leading-relaxed text-ink outline-none focus:border-signal"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 299,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 286,
							columnNumber: 13
						}, this),
						isProcessing && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-center gap-3 rounded-xl border border-signal/20 bg-signal/5 p-4 text-xs font-semibold text-signal",
							children: [/* @__PURE__ */ (void 0)(LoaderCircle, {
								size: 16,
								className: "animate-spin"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 312,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Extraction intelligente des entités en cours..." }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 313,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 311,
							columnNumber: 13
						}, this),
						errorMsg && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-700",
							children: [/* @__PURE__ */ (void 0)(TriangleAlert, {
								size: 16,
								className: "shrink-0 mt-0.5 text-red-600"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 320,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "font-bold",
								children: "Erreur de lecture"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 322,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: errorMsg }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 323,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 321,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
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
											fileName: _jsxFileName$2,
											lineNumber: 333,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-display text-sm font-bold text-ink",
											children: "Données extraites avec succès"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 334,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 332,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setShowDetails(!showDetails),
										className: "flex items-center gap-1 text-xs font-semibold text-mute hover:text-ink",
										children: [/* @__PURE__ */ (void 0)("span", { children: showDetails ? "Masquer détails" : "Voir détails" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 343,
											columnNumber: 19
										}, this), showDetails ? /* @__PURE__ */ (void 0)(ChevronUp, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 344,
											columnNumber: 34
										}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 344,
											columnNumber: 60
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 338,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
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
												fileName: _jsxFileName$2,
												lineNumber: 352,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-xs font-semibold text-signal",
												children: result.profile.role
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 355,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$2,
												lineNumber: 351,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex flex-wrap gap-1 text-[11px] text-mute",
												children: [
													result.profile.email && /* @__PURE__ */ (void 0)("span", { children: ["✉ ", result.profile.email] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 360,
														columnNumber: 46
													}, this),
													result.profile.phone && /* @__PURE__ */ (void 0)("span", { children: ["• ☎ ", result.profile.phone] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 361,
														columnNumber: 46
													}, this),
													result.profile.location && /* @__PURE__ */ (void 0)("span", { children: ["• 📍 ", result.profile.location] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 362,
														columnNumber: 49
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$2,
												lineNumber: 359,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
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
											fileName: _jsxFileName$2,
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
														className: "text-signal"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 375,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.experiencesCount
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 377,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Expériences"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 378,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 376,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 374,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(GraduationCap, {
														size: 14,
														className: "text-signal"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 382,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.educationsCount
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 384,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Formations"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 385,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 383,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 381,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(Tags, {
														size: 14,
														className: "text-signal"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 389,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.skillsCount
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 391,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Compétences"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 392,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 390,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 388,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 rounded-lg bg-paper p-2 text-xs",
													children: [/* @__PURE__ */ (void 0)(Languages, {
														size: 14,
														className: "text-signal"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 396,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-bold text-ink",
														children: result.stats.languagesCount
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 398,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute",
														children: "Langues"
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 399,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 397,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 395,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 373,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
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
											fileName: _jsxFileName$2,
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
															fileName: _jsxFileName$2,
															lineNumber: 416,
															columnNumber: 31
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "text-[10px] text-mute font-mono",
															children: exp.date
														}, void 0, false, {
															fileName: _jsxFileName$2,
															lineNumber: 417,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$2,
														lineNumber: 415,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "text-[11px] text-mute",
														children: exp.company
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 419,
														columnNumber: 29
													}, this),
													exp.desc && /* @__PURE__ */ (void 0)("div", {
														className: "text-[10px] text-mute/80 line-clamp-2 mt-0.5",
														children: exp.desc
													}, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 421,
														columnNumber: 31
													}, this)
												]
											}, i, true, {
												fileName: _jsxFileName$2,
												lineNumber: 414,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 412,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 410,
											columnNumber: 21
										}, this),
										result.profile.educations.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-bold text-ink mb-1",
											children: "Formations & Diplômes :"
										}, void 0, false, {
											fileName: _jsxFileName$2,
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
													fileName: _jsxFileName$2,
													lineNumber: 439,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-mute",
													children: edu.school
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 440,
													columnNumber: 31
												}, this)] }, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 438,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-mute font-mono",
													children: edu.date
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 442,
													columnNumber: 29
												}, this)]
											}, i, true, {
												fileName: _jsxFileName$2,
												lineNumber: 437,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 435,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 433,
											columnNumber: 21
										}, this),
										result.profile.skills.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-bold text-ink mb-1",
											children: "Compétences extraites :"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 452,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-wrap gap-1",
											children: result.profile.skills.map((s, i) => /* @__PURE__ */ (void 0)("span", {
												className: "rounded-md border border-line bg-sheet px-2 py-0.5 text-[11px] font-medium text-ink",
												children: s
											}, i, false, {
												fileName: _jsxFileName$2,
												lineNumber: 455,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 453,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 451,
											columnNumber: 21
										}, this),
										result.warnings.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] text-amber-800 space-y-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "font-bold flex items-center gap-1",
												children: [/* @__PURE__ */ (void 0)(TriangleAlert, { size: 12 }, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 470,
													columnNumber: 25
												}, this), "Observations :"]
											}, void 0, true, {
												fileName: _jsxFileName$2,
												lineNumber: 469,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("ul", {
												className: "list-disc pl-4 space-y-0.5",
												children: result.warnings.map((w, idx) => /* @__PURE__ */ (void 0)("li", { children: w }, idx, false, {
													fileName: _jsxFileName$2,
													lineNumber: 475,
													columnNumber: 27
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 473,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 468,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
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
											fileName: _jsxFileName$2,
											lineNumber: 486,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] text-mute",
											children: "Format A4 Haute Définition"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 489,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 485,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-3 sm:grid-cols-6 gap-1.5",
										children: TEMPLATES.map((tpl) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setSelectedTemplate(tpl.id),
											className: cn("rounded-xl border p-2 text-center transition", selectedTemplate === tpl.id ? "border-signal bg-signal/10 font-bold text-signal shadow-xs" : "border-line bg-sheet text-mute hover:border-ink hover:text-ink"),
											children: /* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold leading-tight",
												children: tpl.name
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 504,
												columnNumber: 23
											}, this)
										}, tpl.id, false, {
											fileName: _jsxFileName$2,
											lineNumber: 493,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 491,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 484,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 330,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
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
						fileName: _jsxFileName$2,
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
								fileName: _jsxFileName$2,
								lineNumber: 531,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Créer une nouvelle page" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 532,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 524,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							disabled: !result || isProcessing,
							onClick: () => applyExtracted(false),
							className: "flex items-center gap-1.5 rounded-xl bg-signal px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-signal/90 disabled:opacity-40 transition",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheck, { size: 14 }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 541,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Appliquer sur le CV (1 clic)" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 542,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 535,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 523,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 514,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 140,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 139,
		columnNumber: 5
	}, this);
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
	const doc = useStudio((s) => s.doc);
	const activePageId = useStudio((s) => s.activePageId);
	const notice = useStudio((s) => s.notice);
	const cloudModalOpen = useStudio((s) => s.cloudModalOpen);
	const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
	const mobileTouchMode = useStudio((s) => s.mobileTouchMode);
	const setMobileTouchMode = useStudio((s) => s.setMobileTouchMode);
	const captureRef = (0, import_react.useRef)(null);
	const page = activePage(doc, activePageId);
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
			useStudio.getState().notify("Image en cours…");
			try {
				const { toPng } = await import("../_libs/html-to-image.mjs").then((n) => n.t);
				const url = await toPng(node, {
					pixelRatio: 2,
					cacheBust: true
				});
				const a = document.createElement("a");
				a.href = url;
				a.download = "cv-libre.png";
				a.click();
				useStudio.getState().notify("PNG téléchargé");
			} catch {
				useStudio.getState().notify("PNG impossible — utilise PDF");
			}
		};
		const json = () => {
			const blob = new Blob([JSON.stringify(useStudio.getState().doc, null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "cv-libre.json";
			a.click();
			URL.revokeObjectURL(url);
			useStudio.getState().notify("JSON téléchargé");
		};
		document.addEventListener("libre-png", png);
		document.addEventListener("libre-json", json);
		return () => {
			document.removeEventListener("libre-png", png);
			document.removeEventListener("libre-json", json);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "studio flex h-dvh w-full overflow-hidden bg-paper text-ink",
		children: [
			!narrow && /* @__PURE__ */ (void 0)(Sidebar, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 163,
				columnNumber: 19
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [narrow && mobileTouchMode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTouchEditor, { onSwitchToCanvas: () => setMobileTouchMode(false) }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 166,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Canvas, { narrow }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 168,
					columnNumber: 11
				}, this), narrow && !mobileTouchMode && /* @__PURE__ */ (void 0)("div", {
					className: "no-print flex h-14 shrink-0 border-t border-line bg-cream",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-blue-600",
							onClick: () => setMobileTouchMode(true),
							children: [/* @__PURE__ */ (void 0)(Smartphone, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 177,
								columnNumber: 15
							}, this), "Tactile"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 172,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium",
							onClick: () => setPanel("library"),
							children: [/* @__PURE__ */ (void 0)(Layers, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 181,
								columnNumber: 15
							}, this), "Atelier"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 180,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium",
							onClick: () => setPanel("inspect"),
							children: [/* @__PURE__ */ (void 0)(SlidersHorizontal, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 185,
								columnNumber: 15
							}, this), "Réglages"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 184,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium",
							onClick: () => setCloudModalOpen(true),
							children: [/* @__PURE__ */ (void 0)(Cloud, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 193,
								columnNumber: 15
							}, this), "Cloud"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 171,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 164,
				columnNumber: 7
			}, this),
			!narrow && /* @__PURE__ */ (void 0)(Inspector, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 199,
				columnNumber: 19
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudSyncModal, {
				isOpen: cloudModalOpen,
				onClose: () => setCloudModalOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 201,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvExtractorModal, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 202,
				columnNumber: 7
			}, this),
			narrow && panel && /* @__PURE__ */ (void 0)("div", {
				className: "no-print fixed inset-0 z-40 flex bg-ink/50",
				onClick: () => setPanel(null),
				children: /* @__PURE__ */ (void 0)("div", {
					className: "h-full max-w-full",
					onClick: (event) => event.stopPropagation(),
					children: panel === "library" ? /* @__PURE__ */ (void 0)(Sidebar, { onDone: () => setPanel(null) }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 207,
						columnNumber: 36
					}, this) : /* @__PURE__ */ (void 0)("div", {
						className: "h-full w-80 max-w-[100vw]",
						children: /* @__PURE__ */ (void 0)(Inspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 207,
							columnNumber: 123
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 207,
						columnNumber: 80
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 206,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 205,
				columnNumber: 9
			}, this),
			notice && /* @__PURE__ */ (void 0)("div", {
				className: "no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-cream",
				children: notice
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 213,
				columnNumber: 9
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
						lineNumber: 221,
						columnNumber: 13
					}, this)
				}, item.id, false, {
					fileName: _jsxFileName$1,
					lineNumber: 220,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 218,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "no-print pointer-events-none fixed top-0 -left-[12000px]",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					ref: captureRef,
					style: {
						width: 794,
						height: PAGE_H
					},
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageSheet, {
						page,
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
						fileName: _jsxFileName$1,
						lineNumber: 237,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 236,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 235,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 162,
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
