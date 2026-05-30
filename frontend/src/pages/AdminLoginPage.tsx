import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowRight, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { firstFormError, validateAdminLogin } from '@/lib/formValidation';
import { BRAND_NAME } from '@/content/companyContact';
import { Logo } from '@/components/Logo';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (api.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateAdminLogin(username, password);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error(firstFormError(nextErrors) || 'Please fix the highlighted fields.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.login(username.trim(), password);
      toast.success(data.message || 'Welcome back!');
      window.location.href = '/admin/dashboard';
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-crm min-h-screen bg-slate-100 flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12">
        <div>
          <Logo size="lg" href="/" onDarkSurface />
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Manage every client inquiry in one place.
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-md">
            Track contact form submissions, update lead status, and export data - all connected
            to your live MongoDB database.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-300">
            {['Real-time form submissions', 'Status pipeline: New → Read → Contacted', 'Secure admin access'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
        <p className="text-xs text-slate-500">© {BRAND_NAME} - Admin only</p>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo size="md" href="/" />
            <p className="text-xs text-slate-500 mt-2">Admin sign in</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Admin sign in</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              Enter your credentials to access the dashboard.
            </p>

            <form noValidate onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-username" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-username"
                    type="text"
                    autoComplete="username"
                    maxLength={50}
                    placeholder="Admin username"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${
                      errors.username ? 'border-red-400' : 'border-slate-300'
                    }`}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) {
                        setErrors((prev) => ({ ...prev, username: validateAdminLogin(e.target.value, password).username }));
                      }
                    }}
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, username: validateAdminLogin(username, password).username }))
                    }
                    aria-invalid={Boolean(errors.username)}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link to="/admin/forgot-password" className="text-xs text-orange-600 hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${
                      errors.password ? 'border-red-400' : 'border-slate-300'
                    }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: validateAdminLogin(username, e.target.value).password }));
                      }
                    }}
                    onBlur={() =>
                      setErrors((prev) => ({ ...prev, password: validateAdminLogin(username, password).password }))
                    }
                    aria-invalid={Boolean(errors.password)}
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
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-slate-500">
            <Link to="/" className="text-orange-600 hover:underline font-medium">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
