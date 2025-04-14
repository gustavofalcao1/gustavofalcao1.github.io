import React, { useState } from 'react';
import { useI18n } from '../../../hooks/useI18n';
import { ArrowLeft, Home, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReactNativeDemo: React.FC = () => {
  const { t, isLoading } = useI18n();
  const [tab, setTab] = useState<'home' | 'profile' | 'settings'>('home');
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 mt-24">
      <div className="relative w-full max-w-4xl bg-dark/30 backdrop-blur-md border border-primary/10 p-6 rounded-2xl shadow-xl">
        <button
          onClick={() => navigate('/play')}
          className="absolute top-4 left-4 flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft size={16} /> {t('play.module.back')}
        </button>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 text-center">
          {t('play.module.react-native.item1.title')}
        </h1>
        <p className="mb-8 text-white/70 text-center max-w-lg mx-auto">
          {t('play.module.react-native.item1.description')}
        </p>

        <div className="flex items-center justify-center">
          <div className="relative w-[340px] h-[680px] bg-gradient-to-b from-dark/40 to-dark/80 border-[6px] border-white/10 rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer select-none">

            {/* Botões laterais Fake */}
            <div className="absolute right-[-8px] top-16 w-1.5 h-12 bg-white/10 rounded-md"></div>
            <div className="absolute left-[-8px] top-24 w-1.5 h-8 bg-white/10 rounded-md"></div>
            <div className="absolute left-[-8px] top-36 w-1.5 h-8 bg-white/10 rounded-md"></div>

            {/* Notch Fake */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-dark/80 rounded-b-xl z-10" />

            {/* Status Bar Fake Melhorada */}
            <div className="flex justify-between items-center px-8 py-2 text-xs text-white/40 border-b border-white/10">
              <span className="tracking-wider">9:41</span>
              <div className="flex items-center gap-2">
                {/* Wifi Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 mt-[-6px]">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M8.5 16.15a6 6 0 0 1 7 0"></path>
                  <line x1="12" y1="20" x2="12.01" y2="20"></line>
                </svg>
                {/* Battery Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                  <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
                  <line x1="23" y1="13" x2="23" y2="11"></line>
                </svg>
              </div>
            </div>

            <div className="h-full flex flex-col justify-between">
              <div className="flex-1 overflow-auto p-4 pb-20 scroll-smooth">
                {tab === 'home' && (
                  <div>
                    <h1 className="text-xl font-bold text-white mb-4">Home</h1>
                    <div className="space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="bg-white/5 border border-white/10 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow"
                        >
                          <h2 className="text-white font-semibold">Card {n}</h2>
                          <p className="text-sm text-white/60">Conteúdo visual simulado para mobile.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'profile' && (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4" />
                    <h2 className="text-white font-bold text-lg">Gustavo Falcão</h2>
                    <p className="text-white/50 text-sm">Frontend · Mobile · Fullstack</p>
                  </div>
                )}

                {tab === 'settings' && (
                  <div className="text-white">
                    <h2 className="text-lg font-semibold mb-2">Configurações</h2>
                    <label className="flex items-center justify-between mb-2">
                      <span>Modo Escuro</span>
                      <input type="checkbox" defaultChecked className="accent-primary" disabled />
                    </label>
                    <label className="flex items-center justify-between mb-2">
                      <span>Idioma</span>
                      <span className="text-sm text-white/50">PT</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 w-full border-t border-white/10 bg-dark/50 flex justify-around py-2">
                <button onClick={() => setTab('home')} className="flex flex-col items-center text-xs text-white/70 hover:text-white active:scale-95 transition">
                  <Home size={18} /> Home
                </button>
                <button onClick={() => setTab('profile')} className="flex flex-col items-center text-xs text-white/70 hover:text-white active:scale-95 transition">
                  <User size={18} /> Perfil
                </button>
                <button onClick={() => setTab('settings')} className="flex flex-col items-center text-xs text-white/70 hover:text-white active:scale-95 transition">
                  <Settings size={18} /> Config
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReactNativeDemo;
