import React, { useState } from 'react';
import { useI18n } from '../../../hooks/useI18n';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tabs = ["Home", "Components", "Hooks", "Animations", "About"];

const ReactWebDemo: React.FC = () => {
  const { t, isLoading } = useI18n();
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  if (isLoading) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome to Reactify™</h2>
            <p className="text-gray-400">Transforma qualquer site em React. Mesmo que já seja.</p>
          </div>
        );
      case "Components":
        return (
          <div className="grid grid-cols-2 gap-4">
            {["Button", "Card", "Modal", "Form"].map((comp) => (
              <div
                key={comp}
                className="bg-white/5 border border-white/10 p-4 rounded-xl text-center hover:scale-105 transition"
              >
                <p className="text-lg font-semibold">{comp}</p>
              </div>
            ))}
          </div>
        );
      case "Hooks":
        return (
          <div className="text-center">
            <p className="text-xl">useState Demo:</p>
            <HookDemo />
          </div>
        );
      case "Animations":
        return (
          <div className="animate-pulse text-center text-2xl text-primary">Motion is life ⚡</div>
        );
      case "About":
        return (
          <div className="text-center max-w-xl mx-auto">
            <p>
              Reactify™ é um produto fictício criado para demonstrar o poder do React dentro do meu playground pessoal.
              Tudo aqui é real, feito com componentes modulares, efeitos de animação e muito amor ao frontend.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:mt-24">
      <div className="relative w-full max-w-4xl bg-dark/30 backdrop-blur-md border border-primary/10 p-6 rounded-2xl shadow-xl">
        <button
          onClick={() => navigate("/play")}
          className="absolute top-4 left-4 flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft size={16} /> {t('play.module.back')}
        </button>

        <h1 className="mt-8 md:mt-0 text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 text-center">
          {t('play.module.react-web.item1.title')}
        </h1>
        <p className="mb-8 text-white/70 text-center max-w-lg mx-auto">
          {t('play.module.react-web.item1.description')}
        </p>

        {/* Browser Mockup */}
        <div className="w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 px-4 py-2 bg-dark/50 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="p-4">
            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full border transition text-sm ${
                    activeTab === tab
                      ? 'bg-primary text-black border-primary'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="w-full bg-white/5 border border-white/10 p-6 rounded-xl">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HookDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  return (
    <div className={`p-4 rounded-xl mt-4 ${dark ? 'bg-black/50' : 'bg-white/10'}`}>
      <p className="mb-2">Contador: <strong>{count}</strong></p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-3 py-1 text-sm bg-primary text-black rounded mr-2"
      >
        Incrementar
      </button>
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 text-sm border border-white/20 rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ReactWebDemo;
