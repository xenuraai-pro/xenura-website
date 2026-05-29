import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PROMO_UPLOAD_DIR = process.env.VERCEL
  ? path.join('/tmp', 'xenura-uploads', 'promo')
  : path.join(__dirname, '..', 'uploads', 'promo');

fs.mkdirSync(PROMO_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PROMO_UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const safeExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext) ? ext : '.jpg';
    cb(null, `popup-banner-${Date.now()}${safeExt}`);
  },
});

export const uploadBanner = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, GIF, or WebP images are allowed.'));
    }
  },
});

export function deleteStoredBanner(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/promo/')) return;
  const filePath = path.join(__dirname, '..', imageUrl.replace(/^\//, ''));
  fs.unlink(filePath, () => {});
}
