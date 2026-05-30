import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { validateForgotPasswordEmail } from '@/lib/formValidation';
import { BRAND_NAME } from '@/content/companyContact';
import { Logo } from '@/components/Logo';

const AdminForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextError = validateForgotPasswordEmail(email);
    setError(nextError);
    if (nextError) {
      toast.error(nextError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.forgotPassword(email.trim());
      setSent(true);
      toast.success(data.message);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Unable to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-crm min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo size="md" href="/" className="justify-center" />
          <p className="text-xs text-slate-500 mt-2">{BRAND_NAME} admin</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wide">Forgot password</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">Reset your password</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Enter the admin email on file. We&apos;ll send a secure link to choose a new password.
          </p>

          {sent ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Check your inbox for the reset link. It expires in one hour.
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-reset-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Admin email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-reset-email"
                    type="email"
                    autoComplete="email"
                    placeholder="hello@xenuralabs.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${
                      error ? 'border-red-400' : 'border-slate-300'
                    }`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(validateForgotPasswordEmail(e.target.value));
                    }}
                    onBlur={() => setError(validateForgotPasswordEmail(email))}
                    aria-invalid={Boolean(error)}
                  />
                </div>
                {error && (
                  <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : (
                  <>
                    Send reset link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-center mt-6 text-sm text-slate-500">
            <Link to="/admin/login" className="text-orange-600 hover:underline font-medium">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
