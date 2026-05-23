import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginwithGoogle = () => {
    const savedRedirect = localStorage.getItem("redirectAfterLogin");
    const redirectTo = location.state?.from || savedRedirect || "/";
    localStorage.setItem("redirectAfterLogin", redirectTo);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:7001";
    window.open(
      `${apiUrl}/auth/google?redirect=${encodeURIComponent(redirectTo)}`,
      "_self"
    );
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCnf, setShowCnf] = useState(false);
  const [input, setInput] = useState({
    fullName: "", email: "", pass: "", cnfPass: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Password strength
  const hasUpper = /[A-Z]/.test(input.pass);
  const hasLower = /[a-z]/.test(input.pass);
  const hasNum   = /[0-9]/.test(input.pass);
  const hasSym   = /[!@#$%^&*()]/.test(input.pass);
  const hasLen   = input.pass.length >= 8;
  const score    = [hasUpper, hasLower, hasNum, hasSym, hasLen].filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Strong"][score];
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-400", "bg-green-500", "bg-green-500"][score];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const cleanEmail = input.email.includes("@") && input.email.includes(".com");
    if (!input.fullName.trim())              return setError("Please enter a valid full name");
    if (!cleanEmail)                         return setError("Please enter a valid email address");
    if (!(hasUpper && hasLower && hasNum && hasSym))
      return setError("Password must have uppercase, lowercase, number & symbol");
    if (input.pass !== input.cnfPass)        return setError("Passwords do not match");
    try {
      setLoading(true);
      const api = `${import.meta.env.VITE_API_URL}/user/signup`;
      const res = await axios.post(api, input);
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show }) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      {show
        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      }
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  const Hint = ({ met, label }) => (
    <div className={`flex items-center gap-1.5 text-[9px] tracking-wide uppercase ${met ? "text-green-500" : "text-gray-400"}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${met ? "bg-green-500" : "bg-gray-300"}`} />
      {label}
    </div>
  );

  const Field = ({ label, id, name, type = "text", placeholder, value, extra }) => (
    <div className="mb-4 relative">
      <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id} type={type} name={name} placeholder={placeholder} value={value}
          onChange={handleInput}
          className={`w-full h-11 border px-4 pr-10 font-mono text-xs text-black bg-white outline-none transition-colors
            ${value === "" ? "border-gray-200"
              : extra?.valid ? "border-green-400" : extra?.touched ? "border-red-400" : "border-gray-200"}
            focus:border-orange-500`}
        />
        {extra?.showToggle && (
          <button type="button" onClick={extra.onToggle}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${extra.show ? "text-orange-500" : "text-gray-400"}`}>
            <EyeIcon show={extra.show} />
          </button>
        )}
        {!extra?.showToggle && extra?.valid && value !== "" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"><CheckIcon /></span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-mono grid grid-cols-1 lg:grid-cols-2">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between bg-[#0a0a0a] p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border-[40px] border-[#1a1a1a]" />
        <div className="absolute -top-10 right-10 w-24 h-24 rounded-full border-[20px] border-[#1a1a1a]" />

        <div className="font-black text-white tracking-widest text-2xl"
             style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "4px" }}>
          Base<span className="text-orange-500">LayerCase</span>
        </div>

        <div>
          <h2 className="text-white leading-tight mb-4"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "44px", letterSpacing: "3px" }}>
            Join The<br /><span className="text-orange-500">Community</span>
          </h2>
          <p className="text-[11px] text-gray-600 tracking-wide leading-relaxed max-w-xs">
            Create your account and start shopping the best products at the best prices.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {["Free shipping on orders over $50", "Exclusive member-only deals",
              "Easy returns within 30 days", "Track orders in real time"].map((p, i) => (
              <div key={i} className="flex items-center gap-3 text-[11px] text-gray-600 tracking-wide">
                <div className="w-1.5 h-1.5 bg-orange-500 flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-gray-700 tracking-wide">© 2026 BaseLayerCase. All rights reserved.</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <p className="text-[10px] tracking-[2px] uppercase text-orange-500 mb-2">Get Started</p>
            <h1 className="text-black leading-none mb-1"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "36px", letterSpacing: "3px" }}>
              Create Account
            </h1>
            <p className="text-[11px] text-gray-400 tracking-wide">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}
                className="text-orange-500 cursor-pointer hover:underline">Log in</span>
            </p>
          </div>


{/* Social Buttons */}
<div className="grid grid-cols-1 gap-3 mb-5">
  {[
    { label: "Google", icon: <FcGoogle /> },
  ].map((s) => (
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
            <span className="text-[10px] tracking-[2px] uppercase text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-3 mb-4 text-[11px] text-red-500 tracking-wide">
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Field label="Full Name" id="fullName" name="fullName" placeholder="John Doe"
              value={input.fullName}
              extra={{ valid: input.fullName.trim().length > 1, touched: input.fullName !== "" }} />

            {/* Email */}
            <Field label="Email Address" id="email" name="email" type="email"
              placeholder="john@example.com" value={input.email}
              extra={{ valid: input.email.includes("@") && input.email.includes(".com"), touched: input.email !== "" }} />

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} name="pass"
                  placeholder="Create a strong password" value={input.pass}
                  onChange={handleInput}
                  className="w-full h-11 border border-gray-200 px-4 pr-10 font-mono text-xs text-black bg-white outline-none focus:border-orange-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${showPass ? "text-orange-500" : "text-gray-400"}`}>
                  <EyeIcon show={showPass} />
                </button>
              </div>
              {/* Strength bar */}
              {input.pass && (
                <>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-0.5 flex-1 transition-colors ${i <= score ? strengthColor : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-[9px] tracking-widest uppercase text-gray-400 mt-1">{strengthLabel}</p>
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    <Hint met={hasUpper} label="Uppercase" />
                    <Hint met={hasLower} label="Lowercase" />
                    <Hint met={hasNum}   label="Number" />
                    <Hint met={hasSym}   label="Symbol" />
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-5 relative">
              <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showCnf ? "text" : "password"} name="cnfPass"
                  placeholder="Repeat your password" value={input.cnfPass}
                  onChange={handleInput}
                  className={`w-full h-11 border px-4 pr-10 font-mono text-xs text-black bg-white outline-none transition-colors
                    ${input.cnfPass === "" ? "border-gray-200"
                      : input.cnfPass === input.pass ? "border-green-400" : "border-red-400"}
                    focus:border-orange-500`}
                />
                <button type="button" onClick={() => setShowCnf(!showCnf)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${showCnf ? "text-orange-500" : "text-gray-400"}`}>
                  <EyeIcon show={showCnf} />
                </button>
              </div>
              {input.cnfPass && input.cnfPass !== input.pass && (
                <p className="text-[9px] text-red-400 tracking-wide mt-1">Passwords do not match</p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 active:scale-95 text-white tracking-widest uppercase transition-all cursor-pointer disabled:cursor-not-allowed"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: "3px" }}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 tracking-wide mt-5">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer hover:underline">Log in →</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;