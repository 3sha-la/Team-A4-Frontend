import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const data = await apiFetch("/users/forgot-password", {
        method: "POST",
        body: { email },
      });

      if (data.resetToken) {
        sessionStorage.setItem("hos_reset_token", data.resetToken);
      }
      setSubmitted(true);
    } catch (error) {
      setErrors({ form: error.message || "Request failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-[390px] rounded-xl bg-[#eeeeee] p-8 shadow-2xl">
        {!submitted ? (
          <>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-black">
                Forget your password?
              </h1>
              <p className="mt-1 text-[10px] text-[#777]">
                Enter your email and we&apos;ll help you reset it.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#333]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className="w-full rounded-md border border-[#c7c7c7] bg-[#e4e4e4] px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-[#F4B000]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {errors.form && (
                <p className="text-center text-xs text-red-500">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-[#F4B000] py-2.5 text-xs font-bold text-black transition hover:bg-[#dca000] disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Reset Email"}
              </button>
            </form>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-full bg-[#7c7c7c] px-5 py-2 text-[10px] font-semibold text-white transition hover:bg-[#696969]"
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-semibold text-black">
              Check your email
            </h1>
            <p className="mt-3 text-sm text-[#666]">
              Reset instructions were sent for <strong>{email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-7 w-full rounded-md bg-[#F4B000] py-2.5 text-xs font-bold text-black transition hover:bg-[#dca000]"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
