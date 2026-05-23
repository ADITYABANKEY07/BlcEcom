import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [input, setInput] = useState({ email: "", pass: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const emailOk = input.email.includes("@") && input.email.includes(".com");
  const hasNum = /[0-9]/.test(input.pass);
  const hasSym = /[!@#$%^&*()]/.test(input.pass);
  const hasUpper = /[A-Z]/.test(input.pass);
  const hasLower = /[a-z]/.test(input.pass);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!emailOk) return setError("Please enter a valid email address");

    if (!(hasNum && hasSym && hasUpper && hasLower))
      return setError("Please enter a valid password");

    try {
      setLoading(true);

      const api = `${import.meta.env.VITE_API_URL}/user/login`;

      const res = await axios.post(api, input);

      alert(res.data.msg)

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);
      // ✅ SAVE USER

      localStorage.setItem("user", JSON.stringify(res.data.user));

// ✅ READ SAVED REDIRECT
const savedRedirect = localStorage.getItem("redirectAfterLogin");

// ✅ CLEAR SAVED REDIRECT (prevent stale data)
localStorage.removeItem("redirectAfterLogin");

// REDIRECT (priority: state > savedRedirect > home)
const redirectTo =
  location.state?.from ||
  savedRedirect ||
  "/";

navigate(redirectTo);
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }) => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
const loginwithGoogle = () => {
  const savedRedirect = localStorage.getItem("redirectAfterLogin");
  const redirectTo = location.state?.from || savedRedirect || "/";
  // Save redirect for same-origin fallback
  localStorage.setItem("redirectAfterLogin", redirectTo);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:7001";
  window.open(
    `${apiUrl}/auth/google?redirect=${encodeURIComponent(redirectTo)}`,
    "_self"
  );
};


  return (
    <div className="min-h-screen font-mono grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between bg-[#0a0a0a] p-12 relative overflow-hidden">
        {/* Deco circles */}
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border-[40px] border-[#1a1a1a]" />
        <div className="absolute -top-10 right-10 w-24 h-24 rounded-full border-[20px] border-[#1a1a1a]" />
        <div className="absolute top-1/2 -left-8 w-20 h-20 rounded-full border-[15px] border-[#1a1a1a] -translate-y-1/2" />

        <div
          style={{ fontFamily: "'Bebas Neue',sans-serif" }}
          className="text-white text-2xl tracking-widest"
        >
          Base<span className="text-orange-500">LayerCase</span>
        </div>

        <div>
          <h2
            className="text-white leading-tight mb-4"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "44px",
              letterSpacing: "3px",
            }}
          >
            Welcome
            <br />
            <span className="text-orange-500">Back</span>
          </h2>
          <p className="text-[11px] text-gray-600 tracking-wide leading-relaxed max-w-xs mb-8">
            Sign in to access your orders, wishlist, and exclusive member deals
            — all in one place.
          </p>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              ["50K+", "Happy Customers"],
              ["99%", "Satisfaction"],
              ["24/7", "Support"],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-orange-500 text-2xl font-black"
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    letterSpacing: "2px",
                  }}
                >
                  {num}
                </span>
                <span className="text-[9px] tracking-[2px] uppercase text-gray-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-gray-700 tracking-wide">
          © 2026 BaseLayerCase. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <p className="text-[10px] tracking-[2px] uppercase text-orange-500 mb-2">
            Welcome Back
          </p>
          <h1
            className="text-black mb-1 leading-none"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "36px",
              letterSpacing: "3px",
            }}
          >
            Sign In
          </h1>
          <p className="text-[11px] text-gray-400 tracking-wide mb-8">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Create one →
            </span>
          </p>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            {[{ label: "Google", icon: <FcGoogle /> }].map((s) => (
              <button
                key={s.label}
                onClick={loginwithGoogle}
                className="h-10 border border-gray-200 bg-white text-[11px] tracking-wide text-gray-500 hover:border-gray-400 bg-white text-[11px] tracking-wide text-gray-500 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] tracking-[2px] uppercase text-gray-400">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-3 mb-4 text-[11px] text-red-500 tracking-wide">
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  placeholder="john@example.com"
                  value={input.email}
                  onChange={handleInput}
                  className={`w-full h-11 border px-4 pr-10 font-mono text-xs text-black bg-white outline-none transition-colors focus:border-orange-500
                    ${
                      input.email === ""
                        ? "border-gray-200"
                        : emailOk
                          ? "border-green-400"
                          : "border-red-400"
                    }`}
                />
                {emailOk && input.email !== "" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-1">
              <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="pass"
                  placeholder="Enter your password"
                  value={input.pass}
                  onChange={handleInput}
                  className="w-full h-11 border border-gray-200 px-4 pr-10 font-mono text-xs text-black bg-white outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${showPass ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mt-3 mb-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 accent-orange-500 cursor-pointer"
                />
                <span className="text-[11px] tracking-wide text-gray-400">
                  Remember me
                </span>
              </label>
              <span className="text-[10px] tracking-[1.5px] uppercase text-gray-400 hover:text-orange-500 cursor-pointer transition-colors">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 active:scale-95 text-white tracking-widest uppercase transition-all cursor-pointer disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "20px",
                letterSpacing: "3px",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 tracking-wide mt-5">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Create one →
            </span>
          </p>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-4 text-[9px] tracking-[2px] uppercase text-gray-300">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            SSL Encrypted · Your data is safe
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
