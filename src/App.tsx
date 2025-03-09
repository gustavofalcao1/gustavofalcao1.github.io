import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider, useI18n } from './hooks/useI18n';
import PageTracking from './components/PageTracking';

import './App.css';
import Layout from './components/Layout';
import Loading from './components/Loading';

import Home from './pages/Home';
import About from './pages/About';
import Play from './pages/Play';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { refreshTranslations } = useI18n();

  const loading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }
    , 2000);
  };

  useEffect(() => {
    loading();
    refreshTranslations();
  }, [refreshTranslations]);
  
  if (isLoading) {
    return (
      <Loading />
    );
  } else {
    return (
      <I18nProvider>
        <Router>
          <PageTracking />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="play" element={<Play />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </I18nProvider>
    );
  }
};

export default App;
