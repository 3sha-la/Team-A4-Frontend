import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      // TODO: Add your password reset API call here
      console.log("Password reset request for:", email);
      // Simulate successful submission
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    } catch (error) {
      setErrors({ form: "Request failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout title="Check Your Email">
        <div className="text-center space-y-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Email Sent!</p>
            <p className="text-sm mt-2">We've sent password reset instructions to <strong>{email}</strong></p>
          </div>
          <p className="text-gray-600 text-sm">
            Please check your email and follow the link to reset your password. If you don't see it, check your spam folder.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-black hover:bg-gray-800 text-yellow-300 font-medium py-2 rounded-lg transition"
          >
            Back to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-yellow-300 font-medium py-2 rounded-lg transition"
        >
          {submitting ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 text-yellow-600 hover:underline font-semibold"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </form>
    </AuthLayout>
  );
}
