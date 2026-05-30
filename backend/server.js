import dns from 'dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Submission, formatSubmission } from './models/Submission.js';
import { ModalPromo, formatModalPromo, ensureDefaultPromo, DEFAULT_PROMO } from './models/ModalPromo.js';
import { AdminUser, ensureAdminUser, verifyAdminCredentials, updateAdminPassword } from './models/AdminUser.js';
import {
  PasswordResetToken,
  createResetTokenValue,
  hashResetToken,
} from './models/PasswordResetToken.js';
import { uploadBanner } from './middleware/uploadBanner.js';
import { validateContactSubmission, validateBannerLink } from './utils/validateSubmission.js';
import { isMailConfigured, sendPasswordResetEmail } from './utils/mail.js';

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

function normalizeHost(hostname) {
  return hostname.toLowerCase().replace(/^www\./, '');
}

function isAllowedCorsOrigin(origin) {
  if (!origin) return true;
  if (corsOrigins.includes(origin)) return true;

  if (/^https:\/\/[\w.-]+\.vercel\.app$/i.test(origin)) return true;
  if (/^https:\/\/(www\.)?xenuralabs\.com$/i.test(origin)) return true;

  try {
    const originUrl = new URL(origin);
    const originHost = normalizeHost(originUrl.hostname);

    for (const allowed of corsOrigins) {
      try {
        const allowedUrl = new URL(allowed);
        if (
          originUrl.protocol === allowedUrl.protocol &&
          normalizeHost(allowedUrl.hostname) === originHost
        ) {
          return true;
        }
      } catch {
        // skip invalid FRONTEND_URL entry
      }
    }
  } catch {
    return false;
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      callback(null, isAllowedCorsOrigin(origin));
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
let adminSeeded = false;

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

  if (!adminSeeded) {
    await ensureAdminUser();
    adminSeeded = true;
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

async function loadPromoSettings() {
  let promo = await ModalPromo.findOne({ slug: 'popup' }).select('-bannerData');
  if (!promo) {
    await ensureDefaultPromo();
    promo = await ModalPromo.findOne({ slug: 'popup' }).select('-bannerData');
  }
  return promo;
}

/* ─── PUBLIC ENDPOINTS ─── */

app.get('/api/promo/popup', async (_req, res) => {
  try {
    const promo = await loadPromoSettings();
    res.json(formatModalPromo(promo));
  } catch (err) {
    console.error('Promo fetch error:', err.message);
    res.status(500).json({ error: 'Failed to load promo content.' });
  }
});

app.get('/api/promo/popup/banner', async (_req, res) => {
  try {
    const promo = await ModalPromo.findOne({ slug: 'popup' }).select('+bannerData bannerMimeType');

    if (!promo?.bannerData?.length) {
      return res.status(404).json({ error: 'Banner not found.' });
    }

    const buffer = Buffer.isBuffer(promo.bannerData)
      ? promo.bannerData
      : Buffer.from(promo.bannerData);

    res.set('Content-Type', promo.bannerMimeType || 'image/jpeg');
    res.set('Content-Length', String(buffer.length));
    res.set('Accept-Ranges', 'none');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');

    return res.end(buffer);
  } catch (err) {
    console.error('Banner serve error:', err.message);
    res.status(500).json({ error: 'Failed to load banner image.' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { error, data } = validateContactSubmission(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const submission = await Submission.create({
      ...data,
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

app.post('/api/auth/login', async (req, res) => {
  try {
    await ensureDb();
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Please enter both username and password.' });
    }

    const admin = await verifyAdminCredentials(username, password);
    if (admin) {
      const token = jwt.sign({ role: 'admin', sub: admin._id.toString() }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({
        success: true,
        token,
        message: 'Access granted. Session initialized.',
      });
    }

    res.status(401).json({ error: 'Invalid username or password. Authentication failed.' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Unable to sign in right now. Please try again.' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    await ensureDb();

    if (!isMailConfigured()) {
      return res.status(503).json({
        error: 'Password reset email is not configured. Set RESEND_API_KEY and RESEND_FROM on the server.',
      });
    }

    const email = req.body.email?.trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return res.json({
        success: true,
        message: 'If that email is registered, a reset link has been sent.',
      });
    }

    await PasswordResetToken.deleteMany({ adminId: admin._id, usedAt: null });

    const rawToken = createResetTokenValue();
    const tokenHash = hashResetToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await PasswordResetToken.create({
      adminId: admin._id,
      tokenHash,
      expiresAt,
    });

    const frontendBase = (process.env.FRONTEND_URL || 'http://localhost:5173')
      .split(',')[0]
      .trim()
      .replace(/\/$/, '');
    const resetUrl = `${frontendBase}/admin/reset-password?token=${rawToken}`;

    await sendPasswordResetEmail({ to: admin.email, resetUrl });

    res.json({
      success: true,
      message: 'If that email is registered, a reset link has been sent.',
    });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ error: 'Unable to send reset email. Please try again later.' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    await ensureDb();

    const token = req.body.token?.trim();
    const password = req.body.password?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();

    if (!token) {
      return res.status(400).json({ error: 'Reset token is missing or invalid.' });
    }
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: 'Please enter and confirm your new password.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const tokenHash = hashResetToken(token);
    const resetRecord = await PasswordResetToken.findOne({
      tokenHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.status(400).json({ error: 'This reset link is invalid or has expired.' });
    }

    await updateAdminPassword(resetRecord.adminId, password);
    resetRecord.usedAt = new Date();
    await resetRecord.save();
    await PasswordResetToken.deleteMany({ adminId: resetRecord.adminId, usedAt: null });

    res.json({
      success: true,
      message: 'Password updated successfully. You can sign in with your new password.',
    });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ error: 'Unable to reset password. Please try again.' });
  }
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
    const promo = await loadPromoSettings();
    res.json(formatModalPromo(promo));
  } catch (err) {
    console.error('Admin promo fetch error:', err.message);
    res.status(500).json({ error: 'Failed to load promo settings.' });
  }
});

app.put('/api/admin/promo/popup', authenticateToken, async (req, res) => {
  try {
    const { isActive, bannerLink } = req.body;

    const linkError = validateBannerLink(bannerLink);
    if (linkError) {
      return res.status(400).json({ error: linkError });
    }

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

      const promo = await ModalPromo.findOneAndUpdate(
        { slug: 'popup' },
        {
          bannerData: req.file.buffer,
          bannerMimeType: req.file.mimetype,
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
    const promo = await ModalPromo.findOneAndUpdate(
      { slug: 'popup' },
      { $unset: { bannerData: 1 }, bannerMimeType: '' },
      { new: true }
    ).select('-bannerData');

    res.json({
      success: true,
      message: 'Banner image removed.',
      promo: formatModalPromo(promo || { slug: 'popup', ...DEFAULT_PROMO }),
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
