import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthLayout from "./AuthLayout";

/**
 * Login form.
 * Props:
 *  - onSubmit(values): called with { email, password, remember }
 *  - onNavigateRegister, onNavigateForgotPassword: nav handlers
 */
export default function Login({
  onSubmit = () => {},
  onNavigateRegister = () => {},
  onNavigateForgotPassword = () => {},
}) {
  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!values.email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    const value = field === "remember" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your account to continue">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange("email")}
              className={`w-full rounded-md border bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-slate-700"
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <button
              type="button"
              onClick={onNavigateForgotPassword}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange("password")}
              className={`w-full rounded-md border bg-slate-800 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-slate-700"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={handleChange("remember")}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <button onClick={onNavigateRegister} className="font-medium text-indigo-400 hover:text-indigo-300">
          Sign up
        </button>
      </p>
    </AuthLayout>
  );
}