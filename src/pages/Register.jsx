import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const [values, setValues] = useState({ fullname: "", email: "", password: "", confirmPassword: "", agree: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!values.fullname) next.fullname = "Full name is required.";
    if (!values.email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 6) next.password = "Password must be at least 6 characters.";
    if (!values.confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (values.password !== values.confirmPassword) next.confirmPassword = "Passwords do not match.";
    if (!values.agree) next.agree = "You must agree to the terms.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      // TODO: Add your registration API call here
      console.log("Registration attempt:", values);
      // Simulate successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setErrors({ form: "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={values.fullname}
              onChange={(e) => {
                setValues({ ...values, fullname: e.target.value });
                if (errors.fullname) setErrors({ ...errors, fullname: "" });
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={(e) => {
                setValues({ ...values, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={(e) => {
                setValues({ ...values, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
              }}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={values.agree}
            onChange={(e) => {
              setValues({ ...values, agree: e.target.checked });
              if (errors.agree) setErrors({ ...errors, agree: "" });
            }}
            className="rounded border-gray-300"
          />
          <label className="ml-2 text-sm text-gray-700">I agree to the terms and conditions</label>
        </div>
        {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

        {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-yellow-300 font-medium py-2 rounded-lg transition"
        >
          {submitting ? "Creating Account..." : "Register"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-yellow-600 hover:underline font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
