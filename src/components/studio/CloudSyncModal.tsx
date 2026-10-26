import { useState } from "react";
import { Check, Cloud, Copy, Download, RefreshCw, Smartphone, Upload, X } from "lucide-react";
import { useStudio } from "@/cv/store";

export function CloudSyncModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const syncCode = useStudio((s) => s.syncCode);
  const syncToCloud = useStudio((s) => s.syncToCloud);
  const loadFromCloud = useStudio((s) => s.loadFromCloud);

  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"save" | "load">("save");

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
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadCode = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    const ok = await loadFromCloud(inputCode.trim());
    setLoading(false);
    if (ok) {
      onClose();
    }
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-line bg-sheet p-5 text-ink shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <Cloud size={18} />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold tracking-wide">Synchronisation Cloud Multi-appareils</h3>
              <p className="text-[11px] text-mute">Sans compte ni mot de passe</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-md text-mute hover:bg-paper hover:text-ink transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Onglets Sauvegarder / Récupérer */}
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-paper p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("save")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              activeTab === "save" ? "bg-sheet text-ink shadow-xs" : "text-mute hover:text-ink"
            }`}
          >
            <Upload size={14} />
            Sauvegarder ce CV
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("load")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              activeTab === "load" ? "bg-sheet text-ink shadow-xs" : "text-mute hover:text-ink"
            }`}
          >
            <Download size={14} />
            Ouvrir sur cet appareil
          </button>
        </div>

        {activeTab === "save" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-950">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                <Smartphone size={14} />
                <span>Retrouvez votre CV sur mobile ou un autre PC</span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-900/80">
                Générez un code unique ou un lien direct pour continuer l'édition de votre CV instantanément sur n'importe quel autre appareil.
              </p>
            </div>

            {syncCode ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-line bg-paper p-3 text-center">
                  <span className="text-[10px] font-bold tracking-widest text-mute uppercase">Votre code secret</span>
                  <div className="mt-1 font-mono text-2xl font-black tracking-wider text-ink">
                    {syncCode}
                  </div>
                  <p className="mt-1 text-[10px] text-mute">
                    Entrez ce code sur votre téléphone ou autre ordinateur
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-mute">Lien de synchronisation directe :</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      readOnly
                      value={shareLink}
                      className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-sheet px-2.5 font-mono text-xs text-ink outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex h-9 items-center gap-1 rounded-lg bg-ink px-3 text-xs font-semibold text-cream hover:bg-neutral-800 transition"
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSyncNow}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-line bg-sheet text-xs font-semibold text-ink hover:bg-paper transition"
                >
                  <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                  <span>Mettre à jour les modifications dans le Cloud</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-center py-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSyncNow}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  <Cloud size={16} />
                  <span>{loading ? "Génération du code..." : "Activer la synchronisation Cloud"}</span>
                </button>
                <p className="text-[11px] text-mute">
                  Génère instantanément votre clé de synchronisation multi-appareils
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "load" && (
          <div className="space-y-4">
            <p className="text-xs text-mute">
              Vous avez commencé votre CV sur un autre appareil ? Entrez ici le code de synchronisation à 6 caractères pour le charger immédiatement.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink">Code de synchronisation :</label>
              <input
                type="text"
                maxLength={8}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Ex: A9F2B7"
                className="h-12 w-full rounded-xl border border-line bg-sheet px-3 text-center font-mono text-xl font-bold tracking-widest text-ink uppercase outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="button"
              disabled={loading || !inputCode.trim()}
              onClick={handleLoadCode}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-bold text-cream hover:bg-neutral-800 disabled:opacity-40 transition"
            >
              <Download size={14} />
              <span>{loading ? "Recherche du CV..." : "Charger le CV depuis le Cloud"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
