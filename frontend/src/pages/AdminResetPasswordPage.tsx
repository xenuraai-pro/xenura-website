import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { firstFormError, validateResetPassword } from '@/lib/formValidation';
import { BRAND_NAME } from '@/content/companyContact';
import { Logo } from '@/components/Logo';

const AdminResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = useMemo(() => searchParams.get('token')?.trim() || '', [searchParams]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Reset link is invalid. Request a new one.');
      return;
    }

    const nextErrors = validateResetPassword(password, confirmPassword);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error(firstFormError(nextErrors) || 'Please fix the highlighted fields.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.resetPassword({ token, password, confirmPassword });
      toast.success(data.message);
      navigate('/admin/login');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Unable to reset password.');
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
            <span className="text-xs font-semibold uppercase tracking-wide">New password</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">Choose a new password</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Use at least 8 characters. You&apos;ll sign in with this password going forward.
          </p>

          {!token ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              This reset link is missing or invalid.{' '}
              <Link to="/admin/forgot-password" className="font-semibold text-orange-700 hover:underline">
                Request a new link
              </Link>
              .
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-new-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-new-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${
                      errors.password ? 'border-red-400' : 'border-slate-300'
                    }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password || errors.confirmPassword) {
                        setErrors(validateResetPassword(e.target.value, confirmPassword));
                      }
                    }}
                    onBlur={() => setErrors(validateResetPassword(password, confirmPassword))}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="admin-confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${
                      errors.confirmPassword ? 'border-red-400' : 'border-slate-300'
                    }`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors(validateResetPassword(password, e.target.value));
                      }
                    }}
                    onBlur={() => setErrors(validateResetPassword(password, confirmPassword))}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : (
                  <>
                    Update password
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

export default AdminResetPasswordPage;
