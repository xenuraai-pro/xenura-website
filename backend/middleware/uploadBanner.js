import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadBanner = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, GIF, or WebP images are allowed.'));
    }
  },
});

/** Remove legacy on-disk banners from before BLOB storage. */
export function deleteStoredBanner(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/promo/')) return;
  const filePath = path.join(__dirname, '..', imageUrl.replace(/^\//, ''));
  fs.unlink(filePath, () => {});
}
