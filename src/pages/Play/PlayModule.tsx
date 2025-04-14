import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useParams, useNavigate } from 'react-router-dom';
import ReactWebDemo from './modules/ReactWebDemo';
import ReactNativeDemo from './modules/ReactNativeDemo';

const modulesMap: Record<string, React.FC> = {
  'react-web': ReactWebDemo,
  'react-native': ReactNativeDemo,
};

const PlayModule: React.FC = () => {
  const { t, isLoading } = useI18n();
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const ModuleComponent = modulesMap[moduleId || ''];

  if (isLoading) return null;

  if (!ModuleComponent) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">{t('play.module.notfound')}</h1>
        <button 
          onClick={() => navigate('/play')}
          className="mt-6 px-4 py-2 border rounded-lg hover:bg-white/10"
        >
          {t('play.module.backplay')}
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ModuleComponent />
    </main>
  );
};

export default PlayModule;
