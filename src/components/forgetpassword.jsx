import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthLayout from "./AuthLayout";

/**
 * Forgot-password form: collects an email and shows a confirmation state.
 * Props:
 *  - onSubmit(email): called when the form is submitted
 *  - onNavigateLogin: nav handler ("back to login")
 */
export default function ForgotPassword({ onSubmit = () => {}, onNavigateLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onSubmit(email);
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 size={24} className="text-emerald-400" />
          </div>
          <p className="text-sm text-slate-400">
            If an account exists for <span className="text-white">{email}</span>, we've sent a link to
            reset your password.
          </p>
          <button
            onClick={onNavigateLogin}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft size={14} />
            Back to log in
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="forgot-email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md border bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 ${
                error ? "border-red-500" : "border-slate-700"
              }`}
              placeholder="you@example.com"
            />
          </div>
          {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <button
        onClick={onNavigateLogin}
        className="mt-6 flex w-full items-center justify-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white"
      >
        <ArrowLeft size={14} />
        Back to log in
      </button>
    </AuthLayout>
  );
}