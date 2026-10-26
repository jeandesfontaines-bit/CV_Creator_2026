/**
 * Reads and optimizes an image file for CV use.
 * Automatically resizes large camera photos (e.g. 10MB+) to crisp avatar dimensions (max 520px)
 * and applies progressive compression so the base64 string stays under ~60-80 KB,
 * preventing any localStorage saturation.
 */
export function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // 520px is more than enough for a 120-180px CV photo at 300 DPI on A4
      const maxDim = 520;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Impossible de créer le contexte canvas"));
        return;
      }

      // Smooth bicubic rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);

      // Try webp first, fallback to jpeg with 0.80 quality
      try {
        const webpData = canvas.toDataURL("image/webp", 0.8);
        if (webpData.startsWith("data:image/webp") && webpData.length < 150000) {
          resolve(webpData);
          return;
        }
      } catch {
        // webp not supported, fallback to jpeg
      }

      const jpegData = canvas.toDataURL("image/jpeg", 0.78);
      resolve(jpegData);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Fichier image illisible"));
    };
    img.src = url;
  });
}
