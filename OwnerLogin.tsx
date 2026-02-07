import React, { useState } from 'react';

interface OwnerLoginProps {
  onLogin: (code: string) => boolean;
  onBack: () => void;
}

export const OwnerLogin: React.FC<OwnerLoginProps> = ({ onLogin, onBack }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(code)) {
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] px-4 relative overflow-hidden">
      {/* Deep Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/30 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-900/20 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-md w-full backdrop-blur-3xl bg-white/[0.03] p-12 rounded-[3rem] border border-white/[0.08] shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 to-indigo-700 mb-8 shadow-2xl shadow-rose-900/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">System Access</h1>
          <p className="text-neutral-500 text-[11px] uppercase tracking-[0.3em] font-black">Restricted Administrator Area</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full bg-white/[0.03] border-2 ${error ? 'border-red-900/50' : 'border-white/[0.05]'} focus:border-rose-500/50 rounded-2xl px-6 py-5 text-white text-center text-3xl tracking-[0.6em] focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-neutral-800`}
              placeholder="000000"
              maxLength={6}
              autoFocus
            />
            {error && <p className="absolute -bottom-7 left-0 right-0 text-red-500 text-[10px] text-center font-bold uppercase tracking-widest">Authentication Failed</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-rose-950/40 hover:from-rose-500 hover:to-rose-600 transition-all hover:-translate-y-0.5"
          >
            Authenticate Session
          </button>
        </form>

        <button 
          onClick={onBack}
          className="mt-12 w-full text-neutral-600 hover:text-neutral-300 transition-colors text-[10px] uppercase tracking-[0.4em] font-black"
        >
          Return to Sanctuary
        </button>
      </div>
    </div>
  );
};