import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { Link } from 'react-router-dom';



const Play: React.FC = () => {
  const { t, isLoading } = useI18n();

  if (isLoading) return null;

  const modules = [
    {
      id: 'react-web',
      name: t('play.module.react-web.title'),
      description: t('play.module.react-web.description'),
      icon: <i className="devicon-react-original text-5xl text-primary" />,
    },
    {
      id: 'react-native',
      name: t('play.module.react-native.title'),
      description: t('play.module.react-native.description'),
      icon: <i className="devicon-react-original text-5xl text-primary" />,
    }
  ];

  return (
    <main className="min-h-screen w-full md:pt-32 relative flex flex-col items-center py-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] bg-clip-text text-transparent z-10">
        {t('play.title')}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 z-10 mt-4">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            to={`/play/${mod.id}`}
            className="group p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              {mod.icon}
              <h2 className="text-xl font-semibold mt-4 text-light group-hover:text-white transition-colors">
                {mod.name}
              </h2>
              <p className="text-sm text-gray-400 mt-2 text-center">
                {mod.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Play;
