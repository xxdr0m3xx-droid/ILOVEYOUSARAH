import React, { useState } from 'react';

interface AccessGateProps {
  onAccess: (key: string) => void;
  onAdminRequest: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onAccess, onAdminRequest }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === '51825') {
      onAccess(key);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff8f8] px-4 relative overflow-hidden">
      {/* Visual Background Decor - Multi-layer Aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-rose-200/40 rounded-full blur-[140px] bg-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-pink-100/40 rounded-full blur-[140px] bg-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="z-10 w-full max-w-md text-center">
        <div className="mb-16 relative inline-block group">
           <div className="absolute inset-0 bg-rose-400 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-all duration-1000"></div>
           <div className="relative transform hover:scale-110 transition-transform duration-700 cursor-heart">
             <span className="text-[120px] leading-none drop-shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>💝</span>
           </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-romantic text-rose-800 mb-6 drop-shadow-sm select-none">The Sanctuary</h1>
        <p className="text-rose-400 font-bold tracking-[0.5em] text-[10px] uppercase mb-12 select-none opacity-80">A Private World Built for You</p>

        <div className="bg-white/70 backdrop-blur-3xl rounded-[4rem] p-12 shadow-[0_40px_100px_-20px_rgba(255,182,193,0.4)] border border-white">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative">
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className={`w-full bg-rose-50/50 border-2 ${error ? 'border-red-300 animate-shake' : 'border-rose-100'} focus:border-rose-300 outline-none rounded-3xl px-6 py-6 text-center text-4xl tracking-[0.6em] transition-all font-serif text-rose-700 placeholder:text-rose-100`}
                placeholder="•••••"
                maxLength={5}
                autoFocus
              />
              {error && <span className="absolute -bottom-8 left-0 right-0 text-red-400 text-[11px] font-black uppercase tracking-widest">Wrong Key, My Love</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black py-6 rounded-3xl shadow-2xl shadow-rose-200 hover:shadow-rose-400 hover:-translate-y-1 active:scale-95 transition-all text-[11px] uppercase tracking-[0.3em] shimmer"
            >
              Enter Sanctuary
            </button>
          </form>

          <div className="mt-14 flex justify-between items-center text-[10px] text-rose-300 uppercase tracking-[0.3em] font-black">
            <button onClick={onAdminRequest} className="hover:text-rose-600 transition-colors py-2 opacity-60 hover:opacity-100 border-b border-transparent hover:border-rose-200">Owner Access</button>
            <span className="opacity-30">V 1.1.0</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-center opacity-40 px-8 max-w-lg z-0">
        <p className="font-serif italic text-rose-900 leading-relaxed text-sm">"You are my favorite place to go when my mind searches for peace."</p>
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 3; }
        .cursor-heart { cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' style='font-size: 20px;'><text y='15'>❤️</text></svg>"), auto; }
      `}</style>
    </div>
  );
};