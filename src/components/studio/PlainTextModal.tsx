import { useMemo, useState } from "react";
import { generatePlainTextPreview } from "@/cv/audit";
import { useStudio } from "@/cv/store";

export function PlainTextModal() {
  const open = useStudio((s) => s.plainTextModalOpen);
  const doc = useStudio((s) => s.doc);
  const setPlainTextModalOpen = useStudio((s) => s.setPlainTextModalOpen);
  const notify = useStudio((s) => s.notify);
  const [copied, setCopied] = useState(false);

  const preview = useMemo(() => generatePlainTextPreview(doc), [doc]);

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preview.text);
      setCopied(true);
      notify("✓ Texte brut copié dans le presse-papiers");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.getElementById("plain-text-ats-area") as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.select();
        document.execCommand("copy");
        setCopied(true);
        notify("✓ Texte brut copié");
        window.setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div
      data-testid="plain-text-modal"
      className="fixed inset-0 z-[190] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={() => setPlainTextModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#fbf8f2] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[86vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-[#f6f3ec] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h2 className="text-base font-bold tracking-tight">Aperçu texte brut (lecture ATS)</h2>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              Texte extrait dans l’ordre de lecture visuel réel, tel qu’un logiciel de tri (ATS) l’analysera.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPlainTextModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold cursor-pointer"
            title="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Reading order warning if any */}
        {preview.readingOrderWarnings.length > 0 && (
          <div
            data-testid="plain-text-order-warning"
            className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-950 text-xs space-y-1 shrink-0"
          >
            <div className="font-bold">⚠️ Attention à l’ordre de lecture visuel :</div>
            {preview.readingOrderWarnings.map((w, idx) => (
              <div key={idx} className="leading-relaxed">
                • {w}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Flux linéaire ({doc.pages.length} {doc.pages.length > 1 ? "pages" : "page"})
            </span>
            <span className="text-[11px] text-stone-500">
              Formes décoratives ignorées • Blocs liés et blocs libres textuels inclus
            </span>
          </div>

          <textarea
            id="plain-text-ats-area"
            data-testid="plain-text-content"
            readOnly
            value={preview.text}
            rows={16}
            className="w-full flex-1 min-h-[300px] p-4 rounded-xl bg-white border border-stone-300 font-mono text-xs text-stone-900 leading-relaxed focus:outline-none focus:border-stone-500 resize-none"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setPlainTextModalOpen(false)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition cursor-pointer"
          >
            Fermer
          </button>

          <button
            type="button"
            data-testid="copy-plain-text-btn"
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs cursor-pointer"
          >
            {copied ? "✓ Texte copié !" : "Copier le texte"}
          </button>
        </div>
      </div>
    </div>
  );
}
