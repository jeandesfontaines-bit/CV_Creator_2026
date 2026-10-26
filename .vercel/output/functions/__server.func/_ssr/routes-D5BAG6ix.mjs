import { i as __toESM } from "../_runtime.mjs";
import { U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Gauge, B as ChevronDown, C as Link, D as Heading, E as Image$1, F as Copy, G as AlignRight, H as Briefcase, I as Cloud, K as AlignCenter, L as Circle, M as FileJson, N as Eye, O as Grid3x3, P as EyeOff, R as CircleCheck, S as LockOpen, T as Italic, U as Bold, V as BringToFront, W as AlignLeft, _ as Minus, b as Magnet, c as Square, d as SendToBack, f as Printer, g as Package, h as Palette, i as Type, j as FilePlus, k as GraduationCap, l as Sparkles, m as Phone, n as WandSparkles, o as Trash2, p as Plus, r as Upload, s as Tags, t as X, u as SlidersHorizontal, v as MapPin, w as Layers, x as Lock, y as Mail, z as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-D5BAG6ix.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
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
var _jsxFileName$6 = "/app/applet/src/components/studio/ElementView.tsx";
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
		fileName: _jsxFileName$6,
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
		fileName: _jsxFileName$6,
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
		fileName: _jsxFileName$6,
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
						fileName: _jsxFileName$6,
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
						fileName: _jsxFileName$6,
						lineNumber: 139,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
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
					fileName: _jsxFileName$6,
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
					fileName: _jsxFileName$6,
					lineNumber: 154,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
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
					fileName: _jsxFileName$6,
					lineNumber: 168,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
					text: c.date ?? "",
					editing,
					className: "shrink-0 outline-none",
					style: { opacity: .62 },
					onCommit: (date) => commit({ date })
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 175,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 167,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveText, {
				text: c.school ?? "",
				editing,
				className: "outline-none",
				style: { opacity: .72 },
				onCommit: (school) => commit({ school })
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 183,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
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
				fileName: _jsxFileName$6,
				lineNumber: 197,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$6,
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
						fileName: _jsxFileName$6,
						lineNumber: 214,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						style: { opacity: .55 },
						children: meter.value
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 215,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
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
						fileName: _jsxFileName$6,
						lineNumber: 218,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 217,
					columnNumber: 13
				}, this)]
			}, `${meter.label}-${index}`, true, {
				fileName: _jsxFileName$6,
				lineNumber: 212,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$6,
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
				fileName: _jsxFileName$6,
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
				fileName: _jsxFileName$6,
				lineNumber: 230,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
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
			fileName: _jsxFileName$6,
			lineNumber: 243,
			columnNumber: 11
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-full w-full flex-col items-center justify-center gap-1 text-mute",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-medium",
				children: "Photo"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 246,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$6,
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
				fileName: _jsxFileName$6,
				lineNumber: 252,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 250,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
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
				fileName: _jsxFileName$6,
				lineNumber: 291,
				columnNumber: 7
			}, this),
			chrome && selected && !el.locked && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (void 0)("div", { className: "pointer-events-none absolute inset-0 border border-ink" }, void 0, false, {
					fileName: _jsxFileName$6,
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
					fileName: _jsxFileName$6,
					lineNumber: 306,
					columnNumber: 13
				}, this)),
				/* @__PURE__ */ (void 0)("div", {
					className: "no-export absolute -top-7 left-1/2 flex -translate-x-1/2 flex-col items-center",
					children: [/* @__PURE__ */ (void 0)("div", { className: "h-4 w-px bg-ink" }, void 0, false, {
						fileName: _jsxFileName$6,
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
						fileName: _jsxFileName$6,
						lineNumber: 319,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 317,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 303,
				columnNumber: 9
			}, this),
			chrome && selected && el.locked && /* @__PURE__ */ (void 0)("div", { className: "pointer-events-none absolute inset-0 border border-dashed border-mute" }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 331,
				columnNumber: 43
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 272,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/studio/PageSheet.tsx";
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
				fileName: _jsxFileName$5,
				lineNumber: 49,
				columnNumber: 9
			}, this),
			showMargins && interactive && /* @__PURE__ */ (void 0)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute inset-9 border border-dashed border-line"
			}, void 0, false, {
				fileName: _jsxFileName$5,
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
				fileName: _jsxFileName$5,
				lineNumber: 64,
				columnNumber: 11
			}, this)),
			guides.x.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-signal",
				style: { left: x }
			}, `x-${x}`, false, {
				fileName: _jsxFileName$5,
				lineNumber: 79,
				columnNumber: 9
			}, this)),
			guides.y.map((y) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-canvas": "bg",
				className: "no-export pointer-events-none absolute right-0 left-0 z-40 h-px bg-signal",
				style: { top: y }
			}, `y-${y}`, false, {
				fileName: _jsxFileName$5,
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
				fileName: _jsxFileName$5,
				lineNumber: 85,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 42,
		columnNumber: 5
	}, this);
}
function readImage(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
			const w = Math.max(1, Math.round(img.width * scale));
			const h = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("canvas"));
				return;
			}
			ctx.drawImage(img, 0, 0, w, h);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", .86));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("image"));
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
		hydrate: () => {
			const loaded = readStorage();
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
		importText: (raw, template) => {
			const pageId = get().activePageId;
			commit((doc) => {
				const profile = parseProfile(raw, doc.profile);
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
			get().notify("Texte réparti sur la page");
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
var _jsxFileName$4 = "/app/applet/src/components/studio/Canvas.tsx";
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
	const boostElementText = useStudio((s) => s.boostElementText);
	const addSectionPack = useStudio((s) => s.addSectionPack);
	const [healthOpen, setHealthOpen] = (0, import_react.useState)(false);
	const [boostMenuOpen, setBoostMenuOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
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
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "no-print relative z-30 flex h-13 shrink-0 items-center justify-between gap-3 border-b border-line bg-cream px-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [
						narrow && /* @__PURE__ */ (void 0)("span", {
							className: "font-display text-sm font-bold tracking-wide",
							children: "LIBRE"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 358,
							columnNumber: 22
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-ink",
								children: page.name
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 360,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] text-cream",
								children: "A4 (794×1123)"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 361,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 359,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden h-4 w-px bg-line sm:block" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 364,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setHealthOpen(!healthOpen),
								className: cn("group flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium transition shadow-xs", healthOpen ? "border-ink bg-ink text-cream" : "border-line bg-sheet text-ink hover:border-ink hover:bg-cream"),
								title: "Cliquez pour voir la checklist de complétion de votre CV",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs",
											children: health.score >= 85 ? "🎯" : health.score >= 60 ? "⚡" : "💡"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 380,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] font-semibold",
											children: [
												"CV prêt à ",
												health.score,
												"%"
											]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 383,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 379,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-1.5 w-12 overflow-hidden rounded-full bg-line/60",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-full rounded-full transition-all duration-500",
											style: {
												width: `${health.score}%`,
												backgroundColor: health.score >= 80 ? "#10b981" : health.score >= 50 ? "#f59e0b" : "#ef4444"
											}
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 388,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 387,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, {
										size: 12,
										className: cn("transition-transform", healthOpen && "rotate-180")
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 397,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 368,
								columnNumber: 13
							}, this), healthOpen && /* @__PURE__ */ (void 0)("div", {
								className: "absolute top-full left-0 mt-2 w-80 rounded-ui border border-line bg-sheet p-3.5 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-2",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "mb-2.5 flex items-center justify-between border-b border-line pb-2",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1.5 text-xs font-bold text-ink",
											children: [/* @__PURE__ */ (void 0)("span", { children: "Qualité & Impact du CV" }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 406,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "rounded-full bg-ink px-1.5 py-0.2 font-mono text-[10px] text-cream",
												children: [health.score, "/100"]
											}, void 0, true, {
												fileName: _jsxFileName$4,
												lineNumber: 407,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 405,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[10px] text-mute",
											children: health.score >= 85 ? "🎉 Excellent ! Votre CV est complet et très impactant." : health.score >= 60 ? "Bonne base ! Quelques détails pour faire la différence." : "Pensez à compléter les rubriques clés pour maximiser vos chances."
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 411,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 404,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setHealthOpen(false),
											className: "flex size-5 items-center justify-center rounded-sm text-mute hover:text-ink",
											children: /* @__PURE__ */ (void 0)(X, { size: 12 }, void 0, false, {
												fileName: _jsxFileName$4,
												lineNumber: 424,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 419,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 403,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "max-h-72 space-y-2 overflow-y-auto pr-1",
										children: health.items.map((item) => /* @__PURE__ */ (void 0)("div", {
											className: cn("rounded-ui border p-2 text-xs transition", item.passed ? "border-emerald-200 bg-emerald-50/40 text-emerald-950" : "border-amber-200 bg-amber-50/50 text-amber-950"),
											children: /* @__PURE__ */ (void 0)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-start gap-1.5",
													children: [item.passed ? /* @__PURE__ */ (void 0)(CircleCheck, {
														size: 14,
														className: "mt-0.5 shrink-0 text-emerald-600"
													}, void 0, false, {
														fileName: _jsxFileName$4,
														lineNumber: 442,
														columnNumber: 29
													}, this) : /* @__PURE__ */ (void 0)(CircleAlert, {
														size: 14,
														className: "mt-0.5 shrink-0 text-amber-600"
													}, void 0, false, {
														fileName: _jsxFileName$4,
														lineNumber: 444,
														columnNumber: 29
													}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
														className: "font-semibold leading-tight",
														children: item.label
													}, void 0, false, {
														fileName: _jsxFileName$4,
														lineNumber: 447,
														columnNumber: 29
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "mt-0.5 text-[10px] text-mute leading-snug",
														children: item.hint
													}, void 0, false, {
														fileName: _jsxFileName$4,
														lineNumber: 448,
														columnNumber: 29
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$4,
														lineNumber: 446,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$4,
													lineNumber: 440,
													columnNumber: 25
												}, this), !item.passed && item.actionText && /* @__PURE__ */ (void 0)("button", {
													type: "button",
													onClick: () => handleHealthAction(item),
													className: "shrink-0 rounded-md bg-ink px-2 py-0.5 text-[10px] font-semibold text-cream hover:bg-neutral-800 transition",
													children: item.actionText
												}, void 0, false, {
													fileName: _jsxFileName$4,
													lineNumber: 452,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$4,
												lineNumber: 439,
												columnNumber: 23
											}, this)
										}, item.id, false, {
											fileName: _jsxFileName$4,
											lineNumber: 430,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 428,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-3 flex items-center justify-between border-t border-line pt-2 text-[10px] text-mute",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Mis à jour en temps réel" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 466,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												useStudio.getState().applyJobPreset("developer");
												setHealthOpen(false);
											},
											className: "font-semibold text-amber-600 hover:underline",
											children: "⚡ Remplir automatiquement à 100%"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 467,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 465,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 402,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 367,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 357,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: saveNow,
						className: "hidden items-center gap-1.5 rounded-full border border-line bg-sheet px-2.5 py-1 text-[11px] font-medium text-mute hover:border-ink hover:text-ink sm:flex transition shadow-xs",
						title: "Cliquez pour forcer l'enregistrement immédiat",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cloud, {
							size: 13,
							className: saveStatus === "saving" ? "animate-pulse text-amber-500" : "text-emerald-600"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 492,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: saveStatus === "saving" ? "Sauvegarde..." : mounted && lastSavedAt ? `Enregistré (${lastSavedAt})` : "Enregistré" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 493,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 486,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "h-8 rounded-ui px-2 text-xs font-semibold text-mute hover:bg-paper hover:text-ink",
								onClick: () => setZoom(zoom / 1.1),
								title: "Zoom arrière",
								children: "−"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 497,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "h-8 min-w-12 rounded-ui px-2 text-xs font-semibold tabular-nums hover:bg-paper",
								onClick: fit,
								title: "Adapter à l'écran",
								children: [Math.round(zoom * 100), "%"]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 505,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "h-8 rounded-ui px-2 text-xs font-semibold text-mute hover:bg-paper hover:text-ink",
								onClick: () => setZoom(zoom * 1.1),
								title: "Zoom avant",
								children: "+"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 513,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 496,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 484,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 356,
				columnNumber: 7
			}, this),
			primarySelected && !primarySelected.locked && /* @__PURE__ */ (void 0)("div", {
				className: "no-print absolute top-15 left-1/2 z-40 -translate-x-1/2 flex items-center gap-1.5 rounded-xl border border-ink-line bg-ink p-1.5 text-xs text-cream shadow-2xl animate-in fade-in slide-in-from-top-3",
				children: [
					[
						"text",
						"heading",
						"experience"
					].includes(primarySelected.type) && /* @__PURE__ */ (void 0)("div", {
						className: "relative flex items-center",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => boostElementText(primarySelected.id),
								className: "flex h-8 items-center gap-1.5 rounded-lg bg-amber-400 px-2.5 text-xs font-bold text-black hover:bg-amber-300 transition shadow-xs",
								title: "Transforme ce texte en une formulation professionnelle orientée résultats",
								children: [/* @__PURE__ */ (void 0)(Sparkles, {
									size: 13,
									className: "shrink-0"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 537,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Formuler comme un pro" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 538,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 531,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setBoostMenuOpen(!boostMenuOpen),
								className: "flex h-8 items-center px-1 rounded-r-lg bg-amber-400 text-black hover:bg-amber-300 border-l border-amber-500/40",
								title: "Choisir un style de formulation",
								children: /* @__PURE__ */ (void 0)(ChevronDown, { size: 11 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 546,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 540,
								columnNumber: 15
							}, this),
							boostMenuOpen && /* @__PURE__ */ (void 0)("div", {
								className: "absolute top-full left-0 mt-1.5 w-64 rounded-ui border border-ink-line bg-ink p-2 text-xs text-cream shadow-2xl z-50 space-y-1.5",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-[10px] font-bold tracking-wider text-amber-300 uppercase px-1",
									children: "Variantes d'impact"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 552,
									columnNumber: 19
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
										fileName: _jsxFileName$4,
										lineNumber: 566,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-[10px] text-ink-mute truncate",
										children: preset.options[0]
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 567,
										columnNumber: 23
									}, this)]
								}, preset.tone, true, {
									fileName: _jsxFileName$4,
									lineNumber: 556,
									columnNumber: 21
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 551,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 530,
						columnNumber: 13
					}, this),
					["text", "heading"].includes(primarySelected.type) && /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-1 border-l border-ink-line pl-1.5",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": "Diminuer la taille",
								onClick: () => useStudio.getState().patchSelectedStyle({ fontSize: Math.max(8, (primarySelected.style.fontSize || 12) - 1) }),
								className: "flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream",
								children: /* @__PURE__ */ (void 0)(Minus, { size: 11 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 588,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 578,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "font-mono text-xs w-6 text-center text-cream",
								children: primarySelected.style.fontSize || 12
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 590,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": "Augmenter la taille",
								onClick: () => useStudio.getState().patchSelectedStyle({ fontSize: Math.min(120, (primarySelected.style.fontSize || 12) + 1) }),
								className: "flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream",
								children: /* @__PURE__ */ (void 0)(Plus, { size: 11 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 603,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 593,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": "Gras",
								onClick: () => useStudio.getState().patchSelectedStyle({ fontWeight: primarySelected.style.fontWeight >= 650 ? 400 : 700 }),
								className: cn("flex size-7 items-center justify-center rounded-md transition", primarySelected.style.fontWeight >= 650 ? "bg-cream text-ink font-bold" : "bg-ink-raise text-ink-mute hover:text-cream"),
								children: /* @__PURE__ */ (void 0)(Bold, { size: 12 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 619,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 606,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 577,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-1 border-l border-ink-line pl-1.5",
						children: /* @__PURE__ */ (void 0)("label", {
							className: "flex items-center gap-1 cursor-pointer",
							title: "Couleur de fond",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[10px] text-ink-mute",
								children: "Fond:"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 627,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "color",
								value: primarySelected.style.backgroundColor !== "transparent" ? primarySelected.style.backgroundColor : "#ffffff",
								onChange: (e) => useStudio.getState().patchSelectedStyle({ backgroundColor: e.target.value }),
								className: "size-6 cursor-pointer rounded-md border border-ink-line bg-transparent p-0"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 628,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 626,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 625,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-0.5 border-l border-ink-line pl-1.5",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().order("front"),
								className: "flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream",
								title: "Mettre au premier plan",
								children: /* @__PURE__ */ (void 0)(BringToFront, { size: 12 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 645,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 639,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().order("back"),
								className: "flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream",
								title: "Mettre à l'arrière-plan",
								children: /* @__PURE__ */ (void 0)(SendToBack, { size: 12 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 653,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 647,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().duplicateSelected(),
								className: "flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream",
								title: "Dupliquer (⌘D)",
								children: /* @__PURE__ */ (void 0)(Copy, { size: 12 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 661,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 655,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => useStudio.getState().deleteSelected(),
								className: "flex size-7 items-center justify-center rounded-md bg-red-950/60 text-red-300 hover:bg-red-900",
								title: "Supprimer",
								children: /* @__PURE__ */ (void 0)(Trash2, { size: 12 }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 669,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 663,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 638,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 527,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
										fileName: _jsxFileName$4,
										lineNumber: 688,
										columnNumber: 21
									}, this)
								}, page.id, false, {
									fileName: _jsxFileName$4,
									lineNumber: 687,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 685,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 684,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 683,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 682,
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
					fileName: _jsxFileName$4,
					lineNumber: 718,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 676,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 354,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/studio/Inspector.tsx";
var input = "h-10 w-full rounded-ui border border-line bg-sheet px-2 text-sm outline-none";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-xs font-medium text-mute",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 29,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1",
			children
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 30,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 28,
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
		className: "flex h-full w-72 shrink-0 flex-col border-l border-line bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-12 items-center border-b border-line px-4",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-sm font-semibold",
				children: one ? TYPE_LABEL[one.type] : selected.length > 1 ? `${selected.length} blocs` : "Le CV"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 59,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 58,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4",
			children: [
				!selected.length && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "rounded-ui border border-amber-400/40 bg-amber-400/10 p-2.5 space-y-1.5",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 text-xs font-bold text-amber-900",
							children: [/* @__PURE__ */ (void 0)(WandSparkles, { size: 13 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 67,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Remplir par métier (1 clic)" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 68,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 66,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("select", {
							onChange: (e) => {
								if (e.target.value) {
									useStudio.getState().applyJobPreset(e.target.value);
									e.target.value = "";
								}
							},
							defaultValue: "",
							className: "h-9 w-full rounded-ui border border-amber-300 bg-sheet px-2 text-xs font-medium text-ink outline-none",
							children: [/* @__PURE__ */ (void 0)("option", {
								value: "",
								disabled: true,
								children: "Choisir un profil pré-rédigé..."
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 80,
								columnNumber: 17
							}, this), JOB_PRESETS.map((p) => /* @__PURE__ */ (void 0)("option", {
								value: p.id,
								children: [
									p.label,
									" (",
									p.category,
									")"
								]
							}, p.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 84,
								columnNumber: 19
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 70,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 65,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "text-xs font-medium text-mute",
							children: "Harmonie couleurs en 1 clic"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 93,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-1 rounded-ui border border-line bg-sheet p-1.5",
							children: COLOR_PALETTES.map((pal) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								title: pal.name,
								onClick: () => useStudio.getState().applyPalette(pal.id),
								className: "flex size-7 items-center justify-center rounded-full transition hover:scale-110",
								style: { backgroundColor: pal.primary },
								children: /* @__PURE__ */ (void 0)("div", {
									className: "size-2 rounded-full",
									style: { backgroundColor: pal.accent }
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 104,
									columnNumber: 21
								}, this)
							}, pal.id, false, {
								fileName: _jsxFileName$3,
								lineNumber: 96,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 94,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 92,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Nom",
						children: /* @__PURE__ */ (void 0)("input", {
							className: input,
							value: profile.name,
							onChange: (e) => identity("name", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 111,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 110,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Poste",
						children: /* @__PURE__ */ (void 0)("input", {
							className: input,
							value: profile.role,
							onChange: (e) => identity("role", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 114,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 113,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "E-mail",
						children: /* @__PURE__ */ (void 0)("input", {
							className: input,
							value: profile.email,
							onChange: (e) => identity("email", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 117,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 116,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Téléphone",
						children: /* @__PURE__ */ (void 0)("input", {
							className: input,
							value: profile.phone,
							onChange: (e) => identity("phone", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 120,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 119,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Ville",
						children: /* @__PURE__ */ (void 0)("input", {
							className: input,
							value: profile.location,
							onChange: (e) => identity("location", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 123,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 122,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Lien",
						children: /* @__PURE__ */ (void 0)("input", {
							className: input,
							value: profile.link,
							onChange: (e) => identity("link", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 126,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 125,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Profil / Bio",
						children: /* @__PURE__ */ (void 0)("textarea", {
							className: `${input} h-28 resize-none py-2`,
							value: profile.summary,
							onChange: (e) => identity("summary", e.target.value),
							onBlur: release
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 129,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 128,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Field, {
						label: "Fond de page",
						children: /* @__PURE__ */ (void 0)("input", {
							type: "color",
							value: toHex(page.background),
							onChange: (e) => useStudio.getState().setPageBackground(e.target.value, true),
							onBlur: release,
							className: "h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 132,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 131,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-1 border-t border-line pt-3 text-xs leading-relaxed text-mute",
						children: [
							/* @__PURE__ */ (void 0)("p", { children: "Glisse un bloc. Les bords s’aimantent." }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 141,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", { children: "Double-clic pour réécrire sur la page." }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 142,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", { children: "Flèches : 1 px. Maj : 8 px. ⌘D duplique. ⌘Z annule." }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 143,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 140,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 63,
					columnNumber: 11
				}, this),
				selected.length > 1 && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-mute",
							children: "Aligner la sélection"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 150,
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
								fileName: _jsxFileName$3,
								lineNumber: 162,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 151,
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
								fileName: _jsxFileName$3,
								lineNumber: 168,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-9 rounded-ui border border-line text-xs",
								onClick: () => useStudio.getState().distribute("y"),
								children: "Répartir ↕"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 171,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 167,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 149,
					columnNumber: 11
				}, this),
				one && /* @__PURE__ */ (void 0)(ContentFields, {
					el: one,
					pageId: page.id
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 178,
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
					fileName: _jsxFileName$3,
					lineNumber: 181,
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
								fileName: _jsxFileName$3,
								lineNumber: 191,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 190,
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
								fileName: _jsxFileName$3,
								lineNumber: 194,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 193,
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
								fileName: _jsxFileName$3,
								lineNumber: 197,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 196,
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
								fileName: _jsxFileName$3,
								lineNumber: 200,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 199,
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
								fileName: _jsxFileName$3,
								lineNumber: 203,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 202,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 189,
					columnNumber: 11
				}, this),
				selected.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap gap-1 border-t border-line pt-3",
					children: [
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Premier plan",
							onClick: () => useStudio.getState().order("front"),
							children: /* @__PURE__ */ (void 0)(BringToFront, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 211,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 210,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Arrière-plan",
							onClick: () => useStudio.getState().order("back"),
							children: /* @__PURE__ */ (void 0)(SendToBack, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 214,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 213,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Dupliquer",
							onClick: () => useStudio.getState().duplicateSelected(),
							children: /* @__PURE__ */ (void 0)(Copy, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 217,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 216,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: selected.some((el) => !el.locked) ? "Verrouiller" : "Déverrouiller",
							onClick: () => useStudio.getState().lockSelected(selected.some((el) => !el.locked)),
							children: selected.some((el) => !el.locked) ? /* @__PURE__ */ (void 0)(Lock, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 220,
								columnNumber: 52
							}, this) : /* @__PURE__ */ (void 0)(LockOpen, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 220,
								columnNumber: 73
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 219,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(IconTip, {
							label: "Supprimer",
							danger: true,
							onClick: () => useStudio.getState().deleteSelected(),
							children: /* @__PURE__ */ (void 0)(Trash2, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 223,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 222,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 209,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 61,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 57,
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
		fileName: _jsxFileName$3,
		lineNumber: 234,
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
						fileName: _jsxFileName$3,
						lineNumber: 258,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("option", {
						value: "phone",
						children: "Téléphone"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 259,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("option", {
						value: "pin",
						children: "Lieu"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 260,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("option", {
						value: "link",
						children: "Lien"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 261,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 257,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 256,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-medium text-mute",
					children: "Texte"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 267,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => useStudio.getState().boostElementText(el.id),
					className: "flex items-center gap-1 rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-400/30 transition",
					title: "Formuler ce texte de manière percutante",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 11 }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 274,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "✨ Formuler comme un pro" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 275,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 268,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 266,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
				className: `${input} h-24 resize-none py-2`,
				value: c.text ?? "",
				onChange: (e) => patch({ text: e.target.value }),
				onBlur: release
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 278,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 265,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 254,
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
					fileName: _jsxFileName$3,
					lineNumber: 287,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 286,
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
					fileName: _jsxFileName$3,
					lineNumber: 290,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 289,
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
					fileName: _jsxFileName$3,
					lineNumber: 293,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 292,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-medium text-mute",
						children: "Récit & Réalisations"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 297,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => useStudio.getState().boostElementText(el.id),
						className: "flex items-center gap-1 rounded-md bg-amber-400/25 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-400/40 transition",
						title: "Ajoute une réalisation concrète et chiffrée",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 11 }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 304,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "✨ Chiffrer comme un pro" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 305,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 298,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 296,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
					className: `${input} h-28 resize-none py-2`,
					value: c.desc ?? "",
					onChange: (e) => patch({ desc: e.target.value }),
					onBlur: release
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 308,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 295,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 285,
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
					fileName: _jsxFileName$3,
					lineNumber: 317,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 316,
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
					fileName: _jsxFileName$3,
					lineNumber: 320,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 319,
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
					fileName: _jsxFileName$3,
					lineNumber: 323,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 322,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 315,
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
			fileName: _jsxFileName$3,
			lineNumber: 331,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 330,
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
					fileName: _jsxFileName$3,
					lineNumber: 349,
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
					fileName: _jsxFileName$3,
					lineNumber: 358,
					columnNumber: 13
				}, this)]
			}, index, true, {
				fileName: _jsxFileName$3,
				lineNumber: 348,
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
				fileName: _jsxFileName$3,
				lineNumber: 372,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 346,
			columnNumber: 7
		}, this);
	}
	if (el.type === "photo") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "text-xs text-mute",
		children: "Importe une photo depuis le bloc, ou ici."
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 383,
		columnNumber: 12
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
				fileName: _jsxFileName$3,
				lineNumber: 392,
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
							fileName: _jsxFileName$3,
							lineNumber: 398,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 396,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 395,
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
							fileName: _jsxFileName$3,
							lineNumber: 405,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							"aria-label": "Gras",
							className: cn("flex size-10 items-center justify-center rounded-ui border border-line", style.fontWeight >= 650 && "bg-ink text-cream"),
							onClick: () => patch({ fontWeight: style.fontWeight >= 650 ? 400 : 700 }),
							children: /* @__PURE__ */ (void 0)(Bold, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 407,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 406,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							"aria-label": "Italique",
							className: cn("flex size-10 items-center justify-center rounded-ui border border-line", style.italic && "bg-ink text-cream"),
							onClick: () => patch({ italic: !style.italic }),
							children: /* @__PURE__ */ (void 0)(Italic, { size: 15 }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 410,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 409,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 404,
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
							fileName: _jsxFileName$3,
							lineNumber: 422,
							columnNumber: 17
						}, this)
					}, align, false, {
						fileName: _jsxFileName$3,
						lineNumber: 421,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 413,
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
						fileName: _jsxFileName$3,
						lineNumber: 427,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 426,
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
						fileName: _jsxFileName$3,
						lineNumber: 430,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 429,
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
						fileName: _jsxFileName$3,
						lineNumber: 433,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 432,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 394,
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
						fileName: _jsxFileName$3,
						lineNumber: 439,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "h-10 rounded-ui border border-line px-2 text-xs",
						onClick: () => patch({ backgroundColor: "transparent" }),
						children: "Aucun"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 440,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 438,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 437,
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
					fileName: _jsxFileName$3,
					lineNumber: 446,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 445,
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
					fileName: _jsxFileName$3,
					lineNumber: 449,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 448,
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
						fileName: _jsxFileName$3,
						lineNumber: 453,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 452,
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
						fileName: _jsxFileName$3,
						lineNumber: 456,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 455,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 451,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 391,
		columnNumber: 5
	}, this);
}
function toHex(color) {
	return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#141311";
}
var _jsxFileName$2 = "/app/applet/src/components/studio/Sidebar.tsx";
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
			fileName: _jsxFileName$2,
			lineNumber: 54,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col gap-1 p-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-2/3 rounded-full bg-ink" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 56,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 57,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 58,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 55,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 53,
		columnNumber: 7
	}, this);
	if (id === "creative") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative h-full bg-sheet",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 right-0 size-8 rounded-full bg-signal" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 66,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute right-1 bottom-1 left-1 h-2 rounded-sm bg-ink" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 67,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-3 left-1.5 h-1.5 w-8 rounded-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 68,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 65,
		columnNumber: 7
	}, this);
	if (id === "swiss") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full bg-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-full w-1 bg-signal" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 75,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid flex-1 grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-r border-line p-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-ink" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 78,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 77,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 81,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 80,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 76,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 74,
		columnNumber: 7
	}, this);
	if (id === "editorial") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full flex-col justify-center gap-1 bg-sheet px-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2 w-5/6 rounded-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 90,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 91,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-1/2 rounded-full bg-line" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 92,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 89,
		columnNumber: 7
	}, this);
	if (id === "minimal") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full flex-col items-center justify-center gap-1 bg-sheet px-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1.5 w-2/3 rounded-full bg-ink" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 99,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px w-6 bg-ink" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 100,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 101,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 98,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-full flex-col bg-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2/5 bg-ink" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 107,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col gap-1 p-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-1/2 rounded-full bg-ink" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 109,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-full rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 110,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-1 w-4/5 rounded-full bg-line" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 111,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 108,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 106,
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
	const past = useStudio((s) => s.past.length);
	const future = useStudio((s) => s.future.length);
	const saveStatus = useStudio((s) => s.saveStatus);
	const lastSavedAt = useStudio((s) => s.lastSavedAt);
	const page = activePage(doc, activePageId);
	const jsonRef = (0, import_react.useRef)(null);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [importText, setImportText] = (0, import_react.useState)("");
	const [importTemplate, setImportTemplate] = (0, import_react.useState)("modern");
	const [activeTab, setActiveTab] = (0, import_react.useState)("presets");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const done = () => onDone?.();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: "flex h-full w-72 shrink-0 flex-col bg-ink text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-13 items-center justify-between border-b border-ink-line px-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex size-7 items-center justify-center rounded-ui bg-signal font-display text-sm font-bold text-signal-ink",
						children: "CV"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 148,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-display text-sm leading-none font-bold tracking-wide",
							children: "STUDIO PRO"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 152,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-0.5 text-[10px] tracking-wide text-ink-mute",
							children: "Éditeur & Remplissage"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 153,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 151,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 147,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 rounded-full border border-ink-line bg-ink-raise px-2 py-0.5 text-[11px] text-ink-mute",
					title: "Vos modifications sont automatiquement sauvegardées en continu dans le navigateur",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-2 rounded-full transition-all duration-300", saveStatus === "saving" ? "bg-amber-400 animate-ping" : "bg-emerald-400") }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 162,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-[10px] text-cream",
						children: saveStatus === "saving" ? "Sauvegarde..." : mounted && lastSavedAt ? `Sauvegardé` : "Auto-save"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 168,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 158,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 146,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-3 border-b border-ink-line bg-ink-raise/40 p-1 text-[11px] font-medium",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("presets"),
						className: cn("flex items-center justify-center gap-1 rounded-md py-1.5 transition", activeTab === "presets" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { size: 12 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 184,
							columnNumber: 11
						}, this), "Métiers"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 176,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("blocks"),
						className: cn("flex items-center justify-center gap-1 rounded-md py-1.5 transition", activeTab === "blocks" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { size: 12 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 195,
							columnNumber: 11
						}, this), "Packs"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 187,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("templates"),
						className: cn("flex items-center justify-center gap-1 rounded-md py-1.5 transition", activeTab === "templates" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { size: 12 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 206,
							columnNumber: 11
						}, this), "Modèles"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 198,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 175,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-3",
				children: [
					activeTab === "presets" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-ui border border-amber-500/30 bg-amber-500/10 p-2.5",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-1.5 text-xs font-bold text-amber-300",
									children: [/* @__PURE__ */ (void 0)(WandSparkles, {
										size: 13,
										className: "shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 217,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Zéro page blanche en 1 clic" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 218,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 216,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-[11px] leading-snug text-ink-mute",
									children: "Sélectionnez votre métier : l'ensemble du CV est instantanément rempli avec des textes réalistes, des chiffres d'impact et des compétences percutantes."
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 220,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 215,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (void 0)("h2", {
									className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
									children: "8 Métiers pré-rédigés"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 226,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 gap-1.5",
									children: JOB_PRESETS.map((preset) => /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => {
											useStudio.getState().applyJobPreset(preset.id);
											done();
										},
										className: "group flex items-center justify-between rounded-ui border border-ink-line bg-ink-raise px-3 py-2 text-left transition hover:border-amber-400/60 hover:bg-ink-line/50",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-cream group-hover:text-amber-200 truncate",
												children: preset.label
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 239,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-ink-mute truncate",
												children: preset.badge
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 242,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 238,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "shrink-0 text-xs font-bold text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity",
											children: "Remplir →"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 244,
											columnNumber: 21
										}, this)]
									}, preset.id, true, {
										fileName: _jsxFileName$2,
										lineNumber: 229,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 227,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 225,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 border-t border-ink-line pt-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h2", {
										className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
										children: "Harmonies Couleurs (1 clic)"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 255,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-ink-mute",
										children: "Harmonise tout"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 256,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 254,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-3 gap-1.5",
									children: COLOR_PALETTES.map((palette) => /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => useStudio.getState().applyPalette(palette.id),
										className: "group flex flex-col items-center gap-1 rounded-ui border border-ink-line bg-ink-raise p-2 hover:border-cream",
										title: palette.desc,
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "size-7 rounded-full border-2 border-ink-line group-hover:scale-105 group-hover:border-cream transition flex items-center justify-center",
											style: { backgroundColor: palette.primary },
											children: /* @__PURE__ */ (void 0)("div", {
												className: "size-2.5 rounded-full",
												style: { backgroundColor: palette.accent }
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 271,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 267,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[9px] font-medium text-cream text-center leading-tight truncate w-full",
											children: palette.name.split("/")[0].trim()
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 273,
											columnNumber: 21
										}, this)]
									}, palette.id, true, {
										fileName: _jsxFileName$2,
										lineNumber: 260,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 258,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 253,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 214,
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
									children: "Packs de sections pré-groupées"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 288,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] text-amber-400 font-medium",
									children: "Prêts à poser"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 289,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 287,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5",
								children: SECTION_PACKS.map((pack) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										useStudio.getState().addSectionPack(pack.id);
										done();
									},
									className: "group flex w-full items-center gap-2.5 rounded-ui border border-ink-line bg-ink-raise p-2 text-left transition hover:border-cream hover:bg-ink-line/40",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "flex size-7 shrink-0 items-center justify-center rounded-md bg-ink-line text-sm",
											children: pack.icon
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 302,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-semibold text-cream leading-tight",
												children: pack.name
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 306,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] text-ink-mute truncate",
												children: pack.desc
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 307,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 305,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-xs text-ink-mute group-hover:text-cream",
											children: "+"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 309,
											columnNumber: 21
										}, this)
									]
								}, pack.id, true, {
									fileName: _jsxFileName$2,
									lineNumber: 293,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 291,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 286,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2 border-t border-ink-line pt-3",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
								children: "Blocs unitaires"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 316,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-4 gap-1.5",
								children: ADD.map((item) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										useStudio.getState().addElement(item.type);
										done();
									},
									className: "flex h-12 flex-col items-center justify-center gap-0.5 rounded-ui border border-ink-line bg-ink-raise text-ink-mute hover:text-cream transition",
									children: [/* @__PURE__ */ (void 0)(item.icon, {
										size: 13,
										strokeWidth: 1.75,
										"aria-hidden": true
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 328,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px]",
										children: item.label
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 329,
										columnNumber: 21
									}, this)]
								}, item.type, true, {
									fileName: _jsxFileName$2,
									lineNumber: 319,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 317,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 315,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 285,
						columnNumber: 11
					}, this),
					activeTab === "templates" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: /* @__PURE__ */ (void 0)("section", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
								children: "Templates Graphiques"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 341,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 gap-2",
								children: TEMPLATES.map((tpl) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										useStudio.getState().applyTemplate(tpl.id);
										done();
									},
									className: "overflow-hidden rounded-ui border border-ink-line bg-ink-raise text-left hover:border-cream transition",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "h-14",
										children: /* @__PURE__ */ (void 0)(Thumb, { id: tpl.id }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 353,
											columnNumber: 44
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 353,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "px-2 py-1.5",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-xs font-semibold",
											children: tpl.name
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 355,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-[10px] text-ink-mute",
											children: tpl.note
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 356,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 354,
										columnNumber: 21
									}, this)]
								}, tpl.id, true, {
									fileName: _jsxFileName$2,
									lineNumber: 344,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 342,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 340,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 339,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "space-y-2 border-t border-ink-line pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
								children: [
									"Calques (",
									page.elements.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 368,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] text-ink-mute",
								children: "Ordre Z"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 371,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 367,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-h-36 space-y-1 overflow-y-auto pr-0.5",
							children: [[...page.elements].sort((a, b) => b.z - a.z).map((el) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: cn("flex items-center gap-1 rounded-ui border px-1.5 py-1", selectedIds.includes(el.id) ? "border-cream bg-cream text-ink" : "border-ink-line bg-ink-raise"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									className: "min-w-0 flex-1 truncate text-left text-xs",
									onClick: () => {
										useStudio.getState().setActive(page.id);
										useStudio.getState().select([el.id]);
									},
									children: snippet(el)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 386,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									"aria-label": el.hidden ? "Afficher" : "Masquer",
									className: "flex size-6 items-center justify-center text-ink-mute hover:text-cream",
									onClick: () => useStudio.getState().toggleHidden(page.id, el.id),
									children: el.hidden ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { size: 12 }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 402,
										columnNumber: 34
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { size: 12 }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 402,
										columnNumber: 57
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 396,
									columnNumber: 19
								}, this)]
							}, el.id, true, {
								fileName: _jsxFileName$2,
								lineNumber: 377,
								columnNumber: 17
							}, this)), page.elements.length === 0 && /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-ink-mute",
								children: "Page vide. Choisissez un métier ou un pack."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 407,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 373,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 366,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "space-y-2 border-t border-ink-line pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
								children: [
									"Pages (",
									doc.pages.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 415,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"aria-label": "Nouvelle page",
								className: "flex size-6 items-center justify-center rounded-ui bg-cream text-xs font-bold text-ink hover:bg-white",
								onClick: () => useStudio.getState().addPage(),
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FilePlus, { size: 13 }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 422,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 416,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 414,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1",
							children: doc.pages.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: cn("flex items-center gap-1 rounded-ui border px-2 py-1 text-xs", item.id === activePageId ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line"),
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										className: "min-w-0 flex-1 truncate text-left",
										onClick: () => useStudio.getState().setActive(item.id),
										children: [
											index + 1,
											". ",
											item.name
										]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 434,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										"aria-label": "Dupliquer la page",
										className: "flex size-6 items-center justify-center text-ink-mute hover:text-cream",
										onClick: () => {
											useStudio.getState().setActive(item.id);
											useStudio.getState().duplicatePage();
										},
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { size: 11 }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 450,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 441,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										"aria-label": "Supprimer la page",
										className: "px-1 text-signal hover:text-red-300",
										onClick: () => useStudio.getState().deletePage(item.id),
										children: "×"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 452,
										columnNumber: 17
									}, this)
								]
							}, item.id, true, {
								fileName: _jsxFileName$2,
								lineNumber: 427,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 425,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 413,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "space-y-2 border-t border-ink-line pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-[10px] font-bold tracking-widest text-ink-mute uppercase",
							children: "Affichage & Planche"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 467,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
									"Marges",
									margins,
									"margins",
									Minus
								]
							].map(([label, on, key]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => useStudio.getState().toggle(key),
								className: cn("flex h-8 items-center justify-between rounded-ui border px-2 text-[11px] font-medium transition", on ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line bg-ink-raise text-ink-mute hover:text-cream"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: label }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 486,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px]",
									children: on ? "✓" : ""
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 487,
									columnNumber: 17
								}, this)]
							}, key, true, {
								fileName: _jsxFileName$2,
								lineNumber: 477,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 468,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 466,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 211,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2 border-t border-ink-line p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "h-10 flex-1 rounded-ui border border-ink-line text-xs font-medium disabled:opacity-30",
							disabled: past === 0,
							onClick: () => useStudio.getState().undo(),
							children: "Annuler"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 496,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "h-10 flex-1 rounded-ui border border-ink-line text-xs font-medium disabled:opacity-30",
							disabled: future === 0,
							onClick: () => useStudio.getState().redo(),
							children: "Rétablir"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 499,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 495,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-3 gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "flex h-11 items-center justify-center gap-1 rounded-ui bg-cream text-xs font-semibold text-ink",
								onClick: () => window.print(),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Printer, { size: 13 }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 505,
									columnNumber: 13
								}, this), " PDF"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 504,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "h-11 rounded-ui border border-ink-line text-xs font-semibold",
								onClick: () => document.dispatchEvent(new Event("libre-png")),
								children: "PNG"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 507,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								className: "h-11 rounded-ui border border-ink-line text-xs font-semibold",
								onClick: () => document.dispatchEvent(new Event("libre-json")),
								children: "JSON"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 510,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 503,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "flex h-10 flex-1 items-center justify-center gap-1 rounded-ui border border-ink-line text-xs",
							onClick: () => jsonRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { size: 13 }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 516,
								columnNumber: 13
							}, this), " Ouvrir"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 515,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "flex h-10 flex-1 items-center justify-center gap-1 rounded-ui border border-ink-line text-xs",
							onClick: () => setImportOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileJson, { size: 13 }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 519,
								columnNumber: 13
							}, this), " Coller"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 518,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 514,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "h-8 w-full text-xs text-ink-mute hover:text-cream",
						onClick: () => useStudio.getState().newDocument(),
						children: "Nouveau document"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 522,
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
						fileName: _jsxFileName$2,
						lineNumber: 525,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 494,
				columnNumber: 7
			}, this),
			importOpen && /* @__PURE__ */ (void 0)("div", {
				className: "no-print fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 sm:items-center",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-lg rounded-ui border border-line bg-cream p-4 text-ink shadow-none",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-display text-base font-bold",
								children: "Coller un CV"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 551,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "flex size-8 items-center justify-center rounded-ui bg-paper",
								onClick: () => setImportOpen(false),
								"aria-label": "Fermer",
								children: "×"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 552,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 550,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mb-3 text-sm text-mute",
							children: "Colle le texte brut. Nom, poste, e-mail, puis des blocs séparés par une ligne vide sous Expérience, Formation, Compétences, Langues."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 556,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("textarea", {
							value: importText,
							onChange: (event) => setImportText(event.target.value),
							rows: 8,
							className: "mb-3 w-full resize-none rounded-ui border border-line bg-sheet p-3 text-sm outline-none",
							placeholder: "Camille Martin\nDirectrice artistique\nHuit ans entre l'édition et le numérique.\n\nExpérience\nDirectrice artistique\nAtelier Nord — Genève\n2022 — Aujourd'hui\nRefonte de l'identité et du site.\n\nFormation\nBachelor design\nECAL\n2014 — 2017\n\nCompétences\nTypographie, Direction, Print\n\nLangues\nFrançais — natif\nAnglais — courant"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 559,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center justify-end gap-2",
							children: [/* @__PURE__ */ (void 0)("select", {
								value: importTemplate,
								onChange: (event) => setImportTemplate(event.target.value),
								className: "h-11 rounded-ui border border-line bg-sheet px-2 text-sm",
								children: TEMPLATES.map((tpl) => /* @__PURE__ */ (void 0)("option", {
									value: tpl.id,
									children: tpl.name
								}, tpl.id, false, {
									fileName: _jsxFileName$2,
									lineNumber: 573,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 567,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								className: "h-11 rounded-ui bg-ink px-4 text-sm font-semibold text-cream",
								onClick: () => {
									useStudio.getState().importText(importText, importTemplate);
									setImportOpen(false);
									setImportText("");
									done();
								},
								children: "Poser sur la page"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 578,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 566,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 549,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 548,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 144,
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
				lineNumber: 156,
				columnNumber: 19
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Canvas, { narrow }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 158,
					columnNumber: 9
				}, this), narrow && /* @__PURE__ */ (void 0)("div", {
					className: "no-print flex h-14 shrink-0 border-t border-line bg-cream",
					children: [/* @__PURE__ */ (void 0)("button", {
						type: "button",
						className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium",
						onClick: () => setPanel("library"),
						children: [/* @__PURE__ */ (void 0)(Layers, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 162,
							columnNumber: 15
						}, this), "Atelier"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 161,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						type: "button",
						className: "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium",
						onClick: () => setPanel("inspect"),
						children: [/* @__PURE__ */ (void 0)(SlidersHorizontal, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 166,
							columnNumber: 15
						}, this), "Réglages"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 165,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 160,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 157,
				columnNumber: 7
			}, this),
			!narrow && /* @__PURE__ */ (void 0)(Inspector, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 172,
				columnNumber: 19
			}, this),
			narrow && panel && /* @__PURE__ */ (void 0)("div", {
				className: "no-print fixed inset-0 z-40 flex bg-ink/50",
				onClick: () => setPanel(null),
				children: /* @__PURE__ */ (void 0)("div", {
					className: "h-full max-w-full",
					onClick: (event) => event.stopPropagation(),
					children: panel === "library" ? /* @__PURE__ */ (void 0)(Sidebar, { onDone: () => setPanel(null) }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 177,
						columnNumber: 36
					}, this) : /* @__PURE__ */ (void 0)("div", {
						className: "h-full w-80 max-w-[100vw]",
						children: /* @__PURE__ */ (void 0)(Inspector, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 177,
							columnNumber: 123
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 177,
						columnNumber: 80
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 176,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 175,
				columnNumber: 9
			}, this),
			notice && /* @__PURE__ */ (void 0)("div", {
				className: "no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-cream",
				children: notice
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 183,
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
						lineNumber: 191,
						columnNumber: 13
					}, this)
				}, item.id, false, {
					fileName: _jsxFileName$1,
					lineNumber: 190,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 188,
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
						lineNumber: 207,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 206,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 205,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 155,
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
