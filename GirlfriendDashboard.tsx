import React, { useState, useEffect } from 'react';
import { ContentItem, ANNIVERSARY_DATE } from '../types';

interface DashboardProps {
  content: ContentItem[];
  onLogout: () => void;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<number[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-15), Date.now()]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {hearts.map(h => (
        <div 
          key={h} 
          className="absolute animate-float text-2xl select-none"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: '110%',
            animationDuration: `${12 + Math.random() * 20}s`,
            opacity: 0.3 + Math.random() * 0.7
          }}
        >
          {['🌸', '💗', '✨', '🕊️'][Math.floor(Math.random() * 4)]}
        </div>
      ))}
      <style>{`
        @keyframes float { 
          0% { transform: translateY(0) rotate(0) scale(1); }
          100% { transform: translateY(-120vh) rotate(360deg) scale(0.5); }
        }
        .animate-float { animation: float linear forwards; }
      `}</style>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let next = new Date(now.getFullYear(), ANNIVERSARY_DATE.month, ANNIVERSARY_DATE.day);
      if (now > next) next = new Date(now.getFullYear() + 1, ANNIVERSARY_DATE.month, ANNIVERSARY_DATE.day);
      const diff = next.getTime() - now.getTime();
      
      const last = new Date(next.getFullYear() - 1, ANNIVERSARY_DATE.month, ANNIVERSARY_DATE.day);
      const total = next.getTime() - last.getTime();
      setProgress(((now.getTime() - last.getTime()) / total) * 100);

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        mins: Math.floor((diff / 60000) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Unit = ({ val, label }: { val: number, label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-serif font-bold text-rose-800 leading-none mb-1">{val.toString().padStart(2, '0')}</span>
      <span className="text-[7px] uppercase font-black text-rose-300 tracking-[0.2em]">{label}</span>
    </div>
  );

  return (
    <div className="w-full bg-white/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-sm text-center">
      <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-400 mb-8 flex items-center justify-center gap-2">
        <span className="w-8 h-[1px] bg-rose-200"></span>
        Countdown to Us
        <span className="w-8 h-[1px] bg-rose-200"></span>
      </h4>
      <div className="flex justify-around mb-8">
        <Unit val={timeLeft.days} label="Days" />
        <Unit val={timeLeft.hours} label="Hours" />
        <Unit val={timeLeft.mins} label="Mins" />
        <Unit val={timeLeft.secs} label="Secs" />
      </div>
      <div className="h-1.5 w-full bg-rose-100/30 rounded-full overflow-hidden p-[2px]">
        <div className="h-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,100,100,0.3)]" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export const GirlfriendDashboard: React.FC<DashboardProps> = ({ content, onLogout }) => {
  const [kisses, setKisses] = useState<{ id: number; x: number; y: number }[]>([]);
  const sortedContent = [...content].sort((a, b) => b.timestamp - a.timestamp);

  const spawnKiss = (e: React.MouseEvent) => {
    const id = Date.now() + Math.random();
    setKisses(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setKisses(prev => prev.filter(k => k.id !== id));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fffafa] relative" onClick={(e) => { 
      const target = e.target as HTMLElement;
      if (target.tagName === 'DIV' || target.tagName === 'MAIN' || target.tagName === 'SECTION') {
        spawnKiss(e);
      }
    }}>
      <FloatingHearts />
      
      {/* Kiss Particles */}
      <div className="fixed inset-0 pointer-events-none z-[1000]">
        {kisses.map(k => (
          <div key={k.id} className="absolute text-3xl animate-kiss-float select-none" style={{ left: k.x - 15, top: k.y - 15 }}>💋</div>
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-10 z-[100] bg-white/60 backdrop-blur-3xl border-b border-white/50">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
             <span className="text-xl md:text-2xl animate-pulse">🕊️</span>
          </div>
          <span className="font-romantic text-2xl md:text-4xl text-rose-800 font-bold tracking-tight">Us Forever</span>
        </div>
        <button onClick={onLogout} className="px-4 md:px-8 py-2 md:py-3 rounded-full bg-white/80 text-rose-800 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] border border-rose-100 hover:bg-rose-50 hover:shadow-lg hover:shadow-rose-100 transition-all active:scale-95">Lock Sanctuary</button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
        <aside className="lg:col-span-4 space-y-10">
          <div className="p-8 md:p-10 bg-white/70 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] border border-white shadow-[0_30px_70px_-20px_rgba(255,182,193,0.15)] text-center lg:sticky lg:top-40">
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full p-2 bg-gradient-to-tr from-rose-300 via-pink-200 to-white mb-6 md:mb-10 shadow-2xl relative group">
               <div className="absolute inset-0 bg-rose-400 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
               <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-5xl md:text-7xl shadow-inner relative z-10">👸</div>
               <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl border-4 border-white shadow-xl animate-bounce">💖</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-romantic text-rose-800 mb-2">My Queen</h2>
            <p className="text-[10px] font-black text-rose-300 uppercase tracking-[0.4em] mb-8 md:mb-12">Private Archive</p>
            <Countdown />
          </div>

          <div className="p-8 md:p-10 bg-gradient-to-br from-rose-50 to-pink-50 rounded-[3rem] border border-white text-center shadow-sm">
             <h3 className="text-rose-900 font-serif italic text-base md:text-lg mb-6 md:mb-8 leading-relaxed">"You are the most beautiful chapter in my life's story."</h3>
             <button onClick={(e) => spawnKiss(e)} className="bg-rose-500 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-rose-200 hover:scale-110 active:scale-95 transition-all shimmer">Send a Kiss 💋</button>
          </div>
        </aside>

        <main className="lg:col-span-8">
          {content.length === 0 ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-10 md:p-20 bg-white/60 backdrop-blur-2xl rounded-[3rem] md:rounded-[4rem] border border-white shadow-sm">
               <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-4xl mb-8 animate-pulse">✨</div>
               <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-4 font-bold">The Garden is Waiting</h3>
               <p className="text-rose-400 text-sm italic max-w-xs leading-relaxed">Our special memories, photos, and secrets will appear here as I add them.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 gap-6 md:gap-10">
              {sortedContent.map((item) => (
                <div key={item.id} className="break-inside-avoid mb-6 md:mb-10 bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(255,182,193,0.25)] overflow-hidden border border-white/50 hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-700 group">
                  {item.type === 'photo' && (
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img src={item.content} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-lg md:text-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">📸</div>
                    </div>
                  )}

                  <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                       <h3 className="text-xl md:text-2xl font-bold text-rose-950 font-serif leading-tight">{item.title}</h3>
                       <span className="text-[8px] md:text-[9px] font-black text-rose-400 uppercase tracking-[0.3em] px-3 md:px-4 py-1.5 bg-rose-50 rounded-full border border-rose-100/50">{item.type}</span>
                    </div>

                    {item.type === 'voice' && (
                      <div className="text-center py-4 md:py-6 bg-rose-50/50 rounded-[2rem] md:rounded-[2.5rem] border border-rose-100/30 mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-rose-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 md:mb-6 shadow-xl shadow-rose-200 animate-pulse">🔊</div>
                        <audio controls src={item.content} className="w-full px-4 accent-rose-500 h-10" />
                        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-rose-300 mt-4">Voice Memo from Heart</p>
                      </div>
                    )}

                    {(item.type === 'poem' || item.type === 'memory') && (
                      <div className="font-serif italic text-rose-900 leading-[1.8] text-lg md:text-xl whitespace-pre-wrap selection:bg-rose-200/50 relative">
                        <span className="absolute -left-3 md:-left-4 -top-1 md:-top-2 text-rose-200 text-5xl md:text-6xl opacity-20 font-serif">"</span>
                        {item.content}
                      </div>
                    )}

                    <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-rose-50 flex justify-between items-center text-[9px] md:text-[10px] font-black text-rose-300 uppercase tracking-[0.3em]">
                       <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-ping"></span>
                         <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                       </div>
                       <span className="text-rose-500 hover:scale-110 transition-transform cursor-pointer">❤ Us</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes kiss-float { 
          0% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
          100% { transform: translateY(-120px) scale(2) rotate(25deg); opacity: 0; }
        }
        .animate-kiss-float { animation: kiss-float 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
};