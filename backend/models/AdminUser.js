import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export async function ensureAdminUser() {
  const username = (process.env.ADMIN_USERNAME || 'admin').trim().replace(/^\uFEFF/, '').toLowerCase();
  const password = (process.env.ADMIN_PASSWORD || 'adminpassword').trim().replace(/^\uFEFF/, '');
  const email = (process.env.ADMIN_EMAIL || 'hello@xenuralabs.com').trim().toLowerCase();

  const existing = await AdminUser.findOne({ username });
  if (existing) {
    if (existing.email !== email) {
      existing.email = email;
      await existing.save();
    }
    return existing;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  return AdminUser.create({ username, email, passwordHash });
}

export async function verifyAdminCredentials(username, password) {
  const admin = await AdminUser.findOne({ username: username.trim().toLowerCase() });
  if (!admin) return null;
  const match = await bcrypt.compare(password.trim(), admin.passwordHash);
  return match ? admin : null;
}

export async function updateAdminPassword(adminId, newPassword) {
  const passwordHash = await bcrypt.hash(newPassword.trim(), 12);
  await AdminUser.findByIdAndUpdate(adminId, { passwordHash });
}

export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
