import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export default function Login() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);

  const [forgotMode, setForgotMode]     = useState(false);
  const [resetEmail, setResetEmail]     = useState("");
  const [resetSent, setResetSent]       = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError]     = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter email and password."); return; }
    setLoading(true); setError("");
    try {
      const result  = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "user", result.user.uid));
      const data    = userDoc.data();
      if (!data) throw new Error("No record");
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "user") {
        const dept = data.department;
        if      (dept === "warehouse") navigate("/store/dashboard");
        else if (dept === "sales")     navigate("/sales/dashboard");
        else if (dept === "accounts")  navigate("/accounts/dashboard");
        else navigate("/login");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally { setLoading(false); }
  };

  const handleReset = async () => {
    if (!resetEmail) { setResetError("Please enter your email address."); return; }
    setResetLoading(true); setResetError("");
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch {
      setResetError("Could not send reset email. Check the address and try again.");
    } finally { setResetLoading(false); }
  };

  const goBack = () => {
    setForgotMode(false); setResetSent(false);
    setResetError(""); setResetEmail("");
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center relative overflow-hidden p-6">

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(249,115,22,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,.05) 1px, transparent 1px)`,
          backgroundSize: "44px 44px"
        }}
      />

      {/* Glow blobs */}
      <div className="f2f-glow-1 absolute rounded-full pointer-events-none"
        style={{
          top:"-15%", left:"-10%", width:"600px", height:"600px",
          background:"radial-gradient(circle, rgba(249,115,22,.14) 0%, transparent 70%)"
        }}
      />
      <div className="f2f-glow-2 absolute rounded-full pointer-events-none"
        style={{
          bottom:"-20%", right:"-8%", width:"520px", height:"520px",
          background:"radial-gradient(circle, rgba(251,146,60,.08) 0%, transparent 70%)"
        }}
      />

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-[860px] min-h-[540px] rounded-3xl overflow-hidden"
        style={{ boxShadow:"0 40px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(249,115,22,.15)" }}
      >

        {/* ── LEFT PANEL — Logo only ── */}
        {/* <div className="hidden md:flex flex-col items-center justify-center w-[220px] flex-shrink-0 p-8"
          style={{
            background:"linear-gradient(145deg, #111827 0%, #080d1a 55%, #1a0900 100%)",
            borderRight:"1px solid rgba(249,115,22,.15)"
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
              <rect width="14" height="14" rx="3" fill="#f97316"/>
              <rect x="18" width="14" height="14" rx="3" fill="#fb923c" opacity=".7"/>
              <rect y="18" width="14" height="14" rx="3" fill="#fed7aa" opacity=".5"/>
              <rect x="18" y="18" width="14" height="14" rx="3" fill="#f97316" opacity=".9"/>
            </svg>
            <span className="font-bold text-2xl text-white tracking-tight"
              style={{fontFamily:"'Syne', sans-serif"}}
            >
              Fit2Feb
            </span>
            <span className="text-[9px] font-semibold tracking-[2px] text-orange-500 px-2 py-1 rounded-full border"
              style={{ background:"rgba(249,115,22,.1)", borderColor:"rgba(249,115,22,.25)" }}
            >
              ERP SUITE
            </span>
          </div>
        </div> */}

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-1 items-center justify-center px-10 py-11 bg-[#0d1526]">
          <div className="w-full max-w-[340px]">

            {forgotMode ? (
              <>
                <button onClick={goBack}
                  className="text-xs text-slate-500 mb-5 block hover:text-slate-400 transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  ← Back to login
                </button>

                {resetSent ? (
                  <div className="text-center py-2">
                    <div className="text-5xl mb-4">✉️</div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3"
                      style={{fontFamily:"'Syne', sans-serif"}}
                    >
                      Check your inbox
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                      Reset link sent to <strong className="text-slate-400">{resetEmail}</strong>.<br />
                      Follow the instructions in the email.
                    </p>
                    <button onClick={goBack} className="f2f-btn w-full">
                      <span className="flex items-center justify-center gap-2">
                        Back to Sign In <FaArrowRight size={12}/>
                      </span>
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-[9.5px] font-semibold tracking-[2.5px] text-orange-500 mb-1.5">
                      PASSWORD RESET
                    </p>
                    <h2 className="text-[22px] font-bold text-slate-100 tracking-tight mb-3"
                      style={{fontFamily:"'Syne', sans-serif"}}
                    >
                      Forgot your password?
                    </h2>
                    <p className="text-[13px] text-slate-500 mb-5 leading-relaxed">
                      Enter your registered email and we'll send you a secure reset link.
                    </p>

                    {resetError && <div className="f2f-error-box mb-4">{resetError}</div>}

                    <div className="mb-4">
                      <label className="f2f-label mb-1.5">Email Address</label>
                      <div className="relative flex items-center">
                        <FaEnvelope className="absolute left-3 text-slate-600 text-[13px] pointer-events-none" />
                        <input
                          type="email"
                          placeholder="you@company.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleReset()}
                          className="f2f-input w-full"
                        />
                      </div>
                    </div>

                    <button onClick={handleReset} disabled={resetLoading} className="f2f-btn w-full">
                      {resetLoading ? <span className="f2f-spinner" /> : "Send Reset Link →"}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <p className="text-[9.5px] font-semibold tracking-[2.5px] text-orange-500 mb-1.5">
                  SECURE ACCESS
                </p>
                <h2 className="text-[22px] font-bold text-slate-100 tracking-tight mb-6"
                  style={{fontFamily:"'Syne', sans-serif"}}
                >
                  Sign in to your workspace
                </h2>

                {error && <div className="f2f-error-box mb-4">{error}</div>}

                {/* Email */}
                <div className="mb-4">
                  <label className="f2f-label mb-1.5">Email Address</label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-3 text-slate-600 text-[13px] pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="f2f-input w-full"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="f2f-label">Password</label>
                    <button
                      onClick={() => { setForgotMode(true); setError(""); }}
                      className="text-[11.5px] text-orange-500 hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer font-medium p-0"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3 text-slate-600 text-[13px] pointer-events-none" />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="f2f-input w-full pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 text-slate-600 hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-1"
                    >
                      {showPass ? <FaEyeSlash size={15}/> : <FaEye size={15}/>}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="f2f-btn w-full"
                  style={{ opacity: loading ? 0.8 : 1, cursor: loading ? "wait" : "pointer" }}
                >
                  {loading
                    ? <span className="f2f-spinner" />
                    : <span className="flex items-center justify-center gap-2">
                        Sign In <FaArrowRight size={13}/>
                      </span>
                  }
                </button>
              </>
            )}

            <p className="mt-7 text-[10px] text-slate-700 text-center tracking-wide">
              © 2026 Fit2Feb ERP · v2.1.0 · All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}