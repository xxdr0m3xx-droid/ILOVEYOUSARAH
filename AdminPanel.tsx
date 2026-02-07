
import React, { useState, useRef } from 'react';
import { ContentItem, ContentType } from '../types';
import { enhancePoemLocally, generateAcrosticLocally } from '../services/romanceService';

interface AdminPanelProps {
  onAddContent: (item: ContentItem) => void;
  onLogout: () => void;
  content: ContentItem[];
  onDelete: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddContent, onLogout, content, onDelete }) => {
  const [activeTab, setActiveTab] = useState<ContentType>('photo');
  const [title, setTitle] = useState('');
  const [textBody, setTextBody] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAddContent({
          id: Date.now().toString(),
          type: 'photo',
          title: title || 'A Special Moment',
          content: reader.result as string,
          timestamp: Date.now(),
        });
        setTitle('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMagicWrite = () => {
    if (!textBody) return;
    setIsProcessing(true);
    setTimeout(() => {
      setTextBody(enhancePoemLocally(textBody));
      setIsProcessing(false);
    }, 600);
  };

  const handleCreateAcrostic = () => {
    if (!title) return;
    setIsProcessing(true);
    setTimeout(() => {
      setTextBody(generateAcrosticLocally(title));
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 p-6 md:p-12 font-sans selection:bg-rose-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-white/5 pb-10">
          <div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Sanctuary Command</h1>
            <p className="text-neutral-500 text-sm font-medium">Curating eternal moments for June 18.</p>
          </div>
          <button onClick={onLogout} className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 transition-all font-bold text-[10px] uppercase tracking-widest">
            Lock System
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
              <div className="flex flex-wrap gap-1 mb-10 bg-black/40 p-1.5 rounded-2xl overflow-x-auto">
                {(['photo', 'poem', 'voice', 'memory'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[90px] py-3.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'bg-rose-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={activeTab === 'poem' ? "Topic or Acrostic Word..." : "Title of this memory..."}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-rose-500/50 outline-none transition-all"
                />

                {activeTab === 'photo' && (
                  <div className="relative group">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileUpload} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="w-full aspect-[16/10] border-2 border-dashed border-neutral-800 rounded-3xl flex flex-col items-center justify-center hover:bg-rose-500/5 hover:border-rose-500/30 transition-all">
                      <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">📸</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-rose-400">Add Memory Image</span>
                    </button>
                  </div>
                )}

                {(activeTab === 'poem' || activeTab === 'memory') && (
                  <div className="space-y-4">
                    <textarea
                      value={textBody}
                      onChange={(e) => setTextBody(e.target.value)}
                      placeholder="Write from the heart..."
                      className="w-full h-64 bg-black/40 border border-white/10 rounded-3xl px-8 py-8 text-white font-serif text-lg leading-relaxed resize-none focus:ring-1 focus:ring-rose-500/50 outline-none"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                       {activeTab === 'poem' && (
                        <button onClick={handleCreateAcrostic} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-400 transition-all">
                          Auto-Acrostic
                        </button>
                       )}
                      <button onClick={handleMagicWrite} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-400 transition-all">
                        {isProcessing ? 'Styling...' : 'Romantic Styling'}
                      </button>
                      <button onClick={() => {
                        onAddContent({ id: Date.now().toString(), type: activeTab, title: title || 'A Note', content: textBody, timestamp: Date.now() });
                        setTextBody(''); setTitle('');
                      }} className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-900/20 hover:bg-rose-500 transition-all">
                        Post Content
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'voice' && (
                  <div className="py-20 text-center bg-black/20 rounded-3xl border border-white/5">
                    <button
                      onClick={isRecording ? () => mediaRecorderRef.current?.stop() : async () => {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        const mediaRecorder = new MediaRecorder(stream);
                        mediaRecorderRef.current = mediaRecorder;
                        audioChunksRef.current = [];
                        mediaRecorder.ondataavailable = (event) => audioChunksRef.current.push(event.data);
                        mediaRecorder.onstop = () => {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            onAddContent({ id: Date.now().toString(), type: 'voice', title: title || 'Voice Note', content: reader.result as string, timestamp: Date.now() });
                            setTitle('');
                          };
                          reader.readAsDataURL(new Blob(audioChunksRef.current, { type: 'audio/wav' }));
                        };
                        mediaRecorder.start();
                        setIsRecording(true);
                      }}
                      className={`h-24 w-24 rounded-full flex items-center justify-center transition-all shadow-2xl mx-auto mb-8 relative ${isRecording ? 'bg-red-600 animate-pulse' : 'bg-rose-600 hover:scale-105'}`}
                    >
                      {isRecording && <div className="absolute inset-0 rounded-full animate-ping bg-red-600 opacity-20"></div>}
                      <span className="text-white text-3xl relative">{isRecording ? '⏹' : '🎤'}</span>
                    </button>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">{isRecording ? 'Recording your heart...' : 'Speak your truth'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em] mb-8">Asset Library ({content.length})</h2>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-3 custom-scrollbar">
              {content.map(item => (
                <div key={item.id} className="bg-neutral-900/30 p-5 rounded-2xl border border-white/5 flex gap-5 items-center group">
                  <div className="w-14 h-14 rounded-xl bg-black shrink-0 flex items-center justify-center text-xl overflow-hidden">
                    {item.type === 'photo' ? <img src={item.content} className="w-full h-full object-cover opacity-80" /> : '📜'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-bold truncate text-sm mb-1">{item.title}</h4>
                    <span className="text-[9px] text-rose-500 font-black uppercase tracking-widest">{item.type}</span>
                  </div>
                  <button onClick={() => onDelete(item.id)} className="text-neutral-700 hover:text-red-500 transition-colors p-2 text-xl">&times;</button>
                </div>
              ))}
              {content.length === 0 && (
                <div className="py-20 text-center border border-dashed border-neutral-800 rounded-3xl">
                  <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Nothing here yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 10px; }
      `}</style>
    </div>
  );
};
