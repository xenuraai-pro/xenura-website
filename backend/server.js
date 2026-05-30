import dns from 'dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Submission, formatSubmission } from './models/Submission.js';
import {
  ModalPromo,
  formatModalPromo,
  ensureDefaultPromo,
  DEFAULT_PROMO,
  BANNER_IMAGE_PATH,
} from './models/ModalPromo.js';
import { uploadBanner, deleteStoredBanner } from './middleware/uploadBanner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Windows local DNS sometimes blocks mongodb+srv SRV lookups (not needed on Vercel)
if (process.platform === 'win32' && !process.env.VERCEL) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'xenura_jwt_secure_super_secret_secret_key_token_2026';
function getMongoUri() {
  return process.env.MONGODB_URI?.trim() || '';
}

const corsOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((o) => o.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      if (/^https:\/\/[\w.-]+\.vercel\.app$/i.test(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

const mongoOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 15000,
  maxPoolSize: 10,
};

let promoSeeded = false;

async function ensureDb() {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve, reject) => {
      mongoose.connection.once('connected', resolve);
      mongoose.connection.once('error', reject);
    });
    return;
  }

  await mongoose.connect(uri, mongoOptions);

  if (!promoSeeded) {
    await ensureDefaultPromo();
    promoSeeded = true;
  }
}

if (process.env.VERCEL) {
  app.use(async (req, res, next) => {
    try {
      await ensureDb();
      next();
    } catch (err) {
      console.error('Database connection error:', err.message);
      const hint = /whitelist|ECONNREFUSED|timed out/i.test(err.message)
        ? 'Allow 0.0.0.0/0 in MongoDB Atlas → Network Access, then wait 2 minutes.'
        : 'Check MONGODB_URI in Vercel project settings.';
      res.status(503).json({
        error: 'Database unavailable.',
        hint,
        detail: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
  });
}
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Authorization token missing.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Access denied. Token is invalid or expired.' });
    }
    req.user = user;
    next();
  });
};

/* ─── PUBLIC ENDPOINTS ─── */

app.get('/api/promo/popup', async (_req, res) => {
  try {
    let promo = await ModalPromo.findOne({ slug: 'popup' }).select('-bannerData');
    if (!promo) {
      await ensureDefaultPromo();
      promo = await ModalPromo.findOne({ slug: 'popup' }).select('-bannerData');
    }
    res.json(formatModalPromo(promo));
  } catch (err) {
    console.error('Promo fetch error:', err.message);
    res.status(500).json({ error: 'Failed to load promo content.' });
  }
});

app.get('/api/promo/popup/banner', async (_req, res) => {
  try {
    const promo = await ModalPromo.findOne({ slug: 'popup' }).select('+bannerData bannerMimeType imageUrl');

    if (promo?.bannerData?.length) {
      res.set('Content-Type', promo.bannerMimeType || 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return res.send(promo.bannerData);
    }

    if (promo?.imageUrl?.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, promo.imageUrl.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }

    res.status(404).json({ error: 'Banner not found.' });
  } catch (err) {
    console.error('Banner serve error:', err.message);
    res.status(500).json({ error: 'Failed to load banner image.' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, budget, message, resumeUrl, source } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        error: 'Missing required parameters. Name, email, and message are mandatory.',
      });
    }

    const validSource = ['popup', 'contact', 'career'].includes(source) ? source : 'contact';

    if (validSource === 'career' && !resumeUrl?.trim()) {
      return res.status(400).json({
        error: 'Resume link is required for career applications.',
      });
    }

    const submission = await Submission.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      company: company?.trim() || '',
      budget: budget || '',
      message: message.trim(),
      resumeUrl: resumeUrl?.trim() || '',
      source: validSource,
      status: 'new',
      submittedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received and recorded successfully.',
      submissionId: submission._id.toString(),
    });
  } catch (err) {
    console.error('Error inserting submission:', err.message);
    res.status(500).json({ error: 'Failed to record your inquiry. Database insert error.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const stripEnv = (v, fallback) =>
    (v || fallback).trim().replace(/^\uFEFF/, '');

  const adminUsername = stripEnv(process.env.ADMIN_USERNAME, 'admin');
  const adminPassword = stripEnv(process.env.ADMIN_PASSWORD, 'adminpassword');

  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ error: 'Please enter both username and password.' });
  }

  const inputUser = username.trim();
  const inputPass = password.trim();

  if (
    inputUser.toLowerCase() === adminUsername.toLowerCase() &&
    inputPass === adminPassword
  ) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      success: true,
      token,
      message: 'Access granted. Session initialized.',
    });
  }

  res.status(401).json({ error: 'Invalid username or password. Authentication failed.' });
});

/* ─── PROTECTED ADMIN ENDPOINTS ─── */

app.get('/api/admin/submissions', authenticateToken, async (req, res) => {
  try {
    const rows = await Submission.find().sort({ submittedAt: -1 }).lean();
    res.json(rows.map(formatSubmission));
  } catch (err) {
    console.error('Database fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

app.patch('/api/admin/submissions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status parameter. Must be "new", "read", or "replied".',
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid submission id.' });
    }

    const updated = await Submission.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Inquiry record not found.' });
    }

    res.json({ success: true, message: `Submission status successfully marked as: ${status}` });
  } catch (err) {
    console.error('Database update error:', err.message);
    res.status(500).json({ error: 'Failed to update submission status.' });
  }
});

app.delete('/api/admin/submissions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid submission id.' });
    }

    const deleted = await Submission.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Inquiry record not found.' });
    }

    res.json({ success: true, message: 'Submission deleted permanently.' });
  } catch (err) {
    console.error('Database delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete submission.' });
  }
});

app.get('/api/admin/promo/popup', authenticateToken, async (_req, res) => {
  try {
    let promo = await ModalPromo.findOne({ slug: 'popup' }).select('-bannerData');
    if (!promo) {
      await ensureDefaultPromo();
      promo = await ModalPromo.findOne({ slug: 'popup' }).select('-bannerData');
    }
    res.json(formatModalPromo(promo));
  } catch (err) {
    console.error('Admin promo fetch error:', err.message);
    res.status(500).json({ error: 'Failed to load promo settings.' });
  }
});

app.put('/api/admin/promo/popup', authenticateToken, async (req, res) => {
  try {
    const { isActive, bannerLink } = req.body;

    const promo = await ModalPromo.findOneAndUpdate(
      { slug: 'popup' },
      {
        isActive: isActive !== false,
        bannerLink: bannerLink?.trim() || '',
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      message: 'Popup settings saved.',
      promo: formatModalPromo(promo),
    });
  } catch (err) {
    console.error('Promo update error:', err.message);
    res.status(500).json({ error: 'Failed to update promo settings.' });
  }
});

app.post(
  '/api/admin/promo/popup/banner',
  authenticateToken,
  uploadBanner.single('banner'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Please choose an image file to upload.' });
      }

      const existing = await ModalPromo.findOne({ slug: 'popup' }).select('imageUrl');

      if (existing?.imageUrl?.startsWith('/uploads/')) {
        deleteStoredBanner(existing.imageUrl);
      }

      const promo = await ModalPromo.findOneAndUpdate(
        { slug: 'popup' },
        {
          bannerData: req.file.buffer,
          bannerMimeType: req.file.mimetype,
          imageUrl: BANNER_IMAGE_PATH,
          isActive: true,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).select('-bannerData');

      res.json({
        success: true,
        message: 'Banner image uploaded successfully.',
        promo: formatModalPromo(promo),
      });
    } catch (err) {
      console.error('Banner upload error:', err.message);
      res.status(500).json({ error: 'Failed to upload banner image.' });
    }
  }
);

app.delete('/api/admin/promo/popup/banner', authenticateToken, async (_req, res) => {
  try {
    const existing = await ModalPromo.findOne({ slug: 'popup' }).select('imageUrl');
    if (existing?.imageUrl?.startsWith('/uploads/')) {
      deleteStoredBanner(existing.imageUrl);
    }

    const promo = await ModalPromo.findOneAndUpdate(
      { slug: 'popup' },
      { $unset: { bannerData: 1 }, bannerMimeType: '', imageUrl: '' },
      { new: true }
    ).select('-bannerData');

    res.json({
      success: true,
      message: 'Banner image removed.',
      promo: formatModalPromo(promo || { slug: 'popup', ...DEFAULT_PROMO, imageUrl: '' }),
    });
  } catch (err) {
    console.error('Banner delete error:', err.message);
    res.status(500).json({ error: 'Failed to remove banner image.' });
  }
});

app.use((err, _req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message || 'Upload failed.' });
  }
  next();
});

app.delete('/api/admin/submissions', authenticateToken, async (req, res) => {
  try {
    await Submission.deleteMany({});
    res.json({ success: true, message: 'All submissions cleared successfully.' });
  } catch (err) {
    console.error('Database purge error:', err.message);
    res.status(500).json({ error: 'Failed to purge database.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

async function startServer() {
  try {
    await ensureDb();
    console.log('Successfully connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`\n==============================================`);
      console.log(`  XENURA BACKEND API SERVER RUNNING ON PORT ${PORT}`);
      console.log(`  MongoDB: ${mongoose.connection.name}`);
      console.log(`==============================================\n`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

export default app;

if (!process.env.VERCEL) {
  if (!getMongoUri()) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }
  startServer();
}
