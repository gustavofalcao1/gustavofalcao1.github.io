import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './hooks/useI18n';
import PageTracking from './components/PageTracking';
import ScrollToTop from './components/ScrollToTop';

import './App.css';
import Layout from './components/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Play from './pages/Play';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <I18nProvider>
      <Router>
        <ScrollToTop />
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
};

export default App;
