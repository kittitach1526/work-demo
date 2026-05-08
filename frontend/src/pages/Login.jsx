import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleLogin = (e) => {
    e.preventDefault();
    setStatus('loading');
    // จำลอง auth delay — แทนที่ด้วย API call จริง
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 900);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-[#0a0f1e]">

      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* ── Glow orbs ── */}
      <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(79,142,247,0.12)', filter: 'blur(80px)', animation: 'drift 8s ease-in-out infinite' }} />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(0,229,195,0.08)', filter: 'blur(80px)', animation: 'drift 8s ease-in-out infinite', animationDelay: '-3s' }} />

      {/* ── Card ── */}
      <div className="relative w-full max-w-[420px] rounded-[20px] p-10 border border-white/5"
        style={{
          background: '#141c30',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
          animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}>

        {/* top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px rounded"
          style={{ background: 'linear-gradient(90deg,transparent,#4f8ef7,#00e5c3,transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#4f8ef7,#00e5c3)', boxShadow: '0 8px 24px rgba(79,142,247,0.35)' }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>AirCom</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">Management System</p>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-7">
          <h2 className="text-[26px] font-bold tracking-tight leading-tight text-white mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
            Welcome{' '}
            <span style={{ background: 'linear-gradient(90deg,#4f8ef7,#00e5c3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Back
            </span>
          </h2>
          <p className="text-sm text-slate-500 font-light">Sign in to access the compressor dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[10px] text-white text-sm pl-10 pr-4 py-3 outline-none transition-all placeholder:text-slate-600
                  focus:border-blue-500/60 focus:bg-blue-500/5 focus:shadow-[0_0_0_3px_rgba(79,142,247,0.12)]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[10px] text-white text-sm pl-10 pr-4 py-3 outline-none transition-all placeholder:text-slate-600
                  focus:border-blue-500/60 focus:bg-blue-500/5 focus:shadow-[0_0_0_3px_rgba(79,142,247,0.12)]"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer select-none">
              <input type="checkbox" className="w-3.5 h-3.5 accent-blue-500 rounded" />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-400/80 hover:text-blue-400 transition-colors">Forgot password?</a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full py-3.5 rounded-[10px] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 mt-2"
            style={{
              background: status === 'success'
                ? 'linear-gradient(135deg,#00e5c3,#0ab89a)'
                : 'linear-gradient(135deg,#4f8ef7,#3a70d4 50%,#00e5c3)',
              backgroundSize: '200% 200%',
              boxShadow: '0 8px 24px rgba(79,142,247,0.3)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            {status === 'idle' && <><LogIn className="w-4 h-4" /> Authenticate System</>}
            {status === 'loading' && (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </span>
            )}
            {status === 'success' && '✓ Access Granted'}
          </button>
        </form>

        {/* Status bar */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-white/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
            style={{ boxShadow: '0 0 6px #00e5c3' }} />
          <p className="text-[11.5px] text-slate-500">
            System online · <span className="text-emerald-400 font-medium">12 units connected</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-[11px] text-slate-700 leading-relaxed">
        Authorized Personnel Only<br />© 2026 Air Compressor Dashboard System
      </p>

      {/* Keyframe styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(20px,-15px) scale(1.05); }
          66%      { transform: translate(-10px,20px) scale(0.97); }
        }
      `}</style>
    </div>
  );
};

export default Login;
