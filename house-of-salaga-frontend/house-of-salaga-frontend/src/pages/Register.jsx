import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

function SocialButtons() {
  return (
    <>
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#cfcfcf]" />
        <span className="text-[10px] text-[#8a8a8a]">or continue with</span>
        <div className="h-px flex-1 bg-[#cfcfcf]" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c7c7c7] bg-white shadow-sm"
        >
          <span className="text-lg font-black text-[#1877F2]">f</span>
        </button>

        <button
          type="button"
          aria-label="Continue with Google"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c7c7c7] bg-white shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.71-.06-1.22-.2-1.75H12v3.36h5.52a4.75 4.75 0 0 1-2.05 3.03l-.02.11 2.98 2.31.21.02c1.93-1.78 2.96-4.41 2.96-7.08Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.69 0 4.95-.89 6.6-2.42l-3.15-2.44c-.84.57-1.96.97-3.45.97-2.59 0-4.79-1.75-5.58-4.16l-.11.01-3.1 2.4-.04.1A9.98 9.98 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.42 13.95A6.02 6.02 0 0 1 6.1 12c0-.68.12-1.34.31-1.95l-.01-.13-3.14-2.44-.1.05A10 10 0 0 0 2 12c0 1.61.39 3.13 1.17 4.47l3.25-2.52Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.89c1.88 0 3.15.81 3.88 1.49l2.79-2.72C16.96 3.07 14.69 2 12 2a9.98 9.98 0 0 0-8.83 5.53l3.24 2.52C7.21 7.64 9.41 5.89 12 5.89Z"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Continue with LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c7c7c7] bg-white shadow-sm"
        >
          <span className="text-sm font-black text-[#0A66C2]">in</span>
        </button>
      </div>
    </>
  );
}

export default function Register() {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!values.fullname) next.fullname = "Full name is required.";
    if (!values.email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (!values.confirmPassword)
      next.confirmPassword = "Please confirm your password.";
    else if (values.password !== values.confirmPassword)
      next.confirmPassword = "Passwords do not match.";
    if (!values.agree) next.agree = "You must agree to the terms.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: {
          name: values.fullname,
          email: values.email,
          password: values.password,
        },
      });
      navigate("/login");
    } catch (error) {
      setErrors({
        form: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-[360px] rounded-xl bg-[#eeeeee] p-7 shadow-2xl">
        <div className="mb-6 grid grid-cols-2 border-b border-[#cfcfcf] text-center text-xs font-semibold text-[#555]">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="pb-3 hover:text-black"
          >
            Sign In
          </button>
          <button
            type="button"
            className="border-b-2 border-[#F4B000] pb-3 text-black"
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#333]">
              Full Name
            </label>
            <input
              type="text"
              value={values.fullname}
              onChange={(e) => {
                setValues({ ...values, fullname: e.target.value });
                if (errors.fullname) setErrors({ ...errors, fullname: "" });
              }}
              className="w-full rounded-md border border-[#c7c7c7] bg-[#d9d9d9] px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-[#F4B000]"
            />
            {errors.fullname && (
              <p className="mt-1 text-xs text-red-500">{errors.fullname}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#333]">
              Email Address
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="w-full rounded-md border border-[#c7c7c7] bg-[#d9d9d9] px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-[#F4B000]"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#333]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className="w-full rounded-md border border-[#c7c7c7] bg-[#d9d9d9] px-3 py-2 pr-9 text-sm text-black outline-none focus:ring-2 focus:ring-[#F4B000]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777]"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#333]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={(e) => {
                  setValues({ ...values, confirmPassword: e.target.value });
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: "" });
                }}
                className="w-full rounded-md border border-[#c7c7c7] bg-[#d9d9d9] px-3 py-2 pr-9 text-sm text-black outline-none focus:ring-2 focus:ring-[#F4B000]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777]"
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] text-[#555]">
              <input
                type="checkbox"
                checked={values.agree}
                onChange={(e) => {
                  setValues({ ...values, agree: e.target.checked });
                  if (errors.agree) setErrors({ ...errors, agree: "" });
                }}
                className="accent-[#F4B000]"
              />
              I agree to the terms and conditions
            </label>
            {errors.agree && (
              <p className="mt-1 text-xs text-red-500">{errors.agree}</p>
            )}
          </div>

          {errors.form && (
            <p className="text-center text-xs text-red-500">{errors.form}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[#F4B000] py-2.5 text-xs font-bold text-black transition hover:bg-[#dca000] disabled:opacity-60"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <SocialButtons />

        <p className="mt-5 text-center text-[10px] text-[#777]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-black hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
