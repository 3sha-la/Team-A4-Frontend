import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import AuthLayout from "./AuthLayout";

/**
 * Registration form.
 * Props:
 *  - onSubmit(values): called with { name, email, password }
 *  - onNavigateLogin: nav handler
 */
export default function Register({ onSubmit = () => {}, onNavigateLogin = () => {} }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Full name is required.";
    if (!values.email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (values.confirmPassword !== values.password) next.confirmPassword = "Passwords do not match.";
    if (!values.agree) next.agree = "You must accept the terms to continue.";
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
    const value = field === "agree" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start your free account in under a minute">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Full name
          </label>
          <div className="relative">
            <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={handleChange("name")}
              className={`w-full rounded-md border bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : "border-slate-700"
              }`}
              placeholder="Jane Doe"
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="reg-email"
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
          <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-slate-300">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange("password")}
              className={`w-full rounded-md border bg-slate-800 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-slate-700"
              }`}
              placeholder="At least 8 characters"
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

        {/* Confirm password */}
        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-slate-300">
            Confirm password
          </label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className={`w-full rounded-md border bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-slate-700"
              }`}
              placeholder="Re-enter your password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={values.agree}
              onChange={handleChange("agree")}
              className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
            />
            <span>
              I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a> and{" "}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>.
            </span>
          </label>
          {errors.agree && <p className="mt-1.5 text-xs text-red-400">{errors.agree}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <button onClick={onNavigateLogin} className="font-medium text-indigo-400 hover:text-indigo-300">
          Log in
        </button>
      </p>
    </AuthLayout>
  );
}