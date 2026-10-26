import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import type { Doc } from "@/cv/types";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let res = "";
  for (let i = 0; i < 6; i++) {
    res += chars[Math.floor(Math.random() * chars.length)];
  }
  return res;
}

export type SaveCloudResult =
  | { success: true; syncCode: string; updatedAt: string }
  | { success: false; error: string };

export type LoadCloudResult =
  | { success: true; doc: Doc; title: string; syncCode: string; updatedAt: string }
  | { success: false; error: string };

export const saveCvToCloud = createServerFn({ method: "POST" })
  .validator((data: { doc: Doc; syncCode?: string; title?: string }) => data)
  .handler(async ({ data }): Promise<SaveCloudResult> => {
    try {
      const sql = await getSql();
      let code = (data.syncCode || "").trim().toUpperCase();
      if (!code) {
        code = generateCode();
      }
      const title = data.title || data.doc.profile.name || "Mon CV";
      const docJson = JSON.stringify(data.doc);

      await sql`
        INSERT INTO cloud_cvs (sync_code, doc, title, updated_at)
        VALUES (${code}, ${docJson}::jsonb, ${title}, NOW())
        ON CONFLICT (sync_code)
        DO UPDATE SET doc = ${docJson}::jsonb, title = ${title}, updated_at = NOW()
      `;

      return {
        success: true,
        syncCode: code,
        updatedAt: new Date().toISOString(),
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de sauvegarde Cloud";
      return { success: false, error: msg };
    }
  });

export const loadCvFromCloud = createServerFn({ method: "GET" })
  .validator((code: string) => code.trim().toUpperCase())
  .handler(async ({ data: code }): Promise<LoadCloudResult> => {
    try {
      const sql = await getSql();
      const rows = await sql<{ sync_code: string; doc: Doc; title: string; updated_at: string }>`
        SELECT sync_code, doc, title, updated_at FROM cloud_cvs WHERE sync_code = ${code}
      `;
      if (!rows.length) {
        return { success: false, error: "Aucun CV trouvé pour ce code de synchronisation." };
      }
      return {
        success: true,
        doc: rows[0].doc,
        title: rows[0].title,
        syncCode: rows[0].sync_code,
        updatedAt: rows[0].updated_at,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de chargement Cloud";
      return { success: false, error: msg };
    }
  });
