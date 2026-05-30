import { Resend } from 'resend';

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();

  if (!apiKey || !from) {
    return null;
  }

  return {
    client: new Resend(apiKey),
    from,
  };
}

export function isMailConfigured() {
  return Boolean(getResendConfig());
}

function buildPasswordResetContent(resetUrl) {
  const subject = 'Reset your Xenura admin password';
  const text = [
    'You requested a password reset for your Xenura admin account.',
    '',
    'Open this link to choose a new password (valid for 1 hour):',
    resetUrl,
    '',
    'If you did not request this, you can ignore this email.',
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:560px">
      <h2 style="margin:0 0 12px;color:#ea580c">Reset your admin password</h2>
      <p>You requested a password reset for your Xenura admin dashboard.</p>
      <p>
        <a href="${resetUrl}" style="display:inline-block;background:#ea580c;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600">
          Reset password
        </a>
      </p>
      <p style="font-size:13px;color:#64748b">This link expires in 1 hour. If you did not request a reset, ignore this email.</p>
      <p style="font-size:12px;color:#94a3b8;word-break:break-all">${resetUrl}</p>
    </div>
  `;

  return { subject, text, html };
}

export async function sendPasswordResetEmail({ to, resetUrl }) {
  const config = getResendConfig();
  if (!config) {
    throw new Error('Email service is not configured. Set RESEND_API_KEY and RESEND_FROM.');
  }

  const { subject, text, html } = buildPasswordResetContent(resetUrl);

  const { data, error } = await config.client.emails.send({
    from: config.from,
    to: [to],
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || 'Resend failed to send the password reset email.');
  }

  return data;
}
