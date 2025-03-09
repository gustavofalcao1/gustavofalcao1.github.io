import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './hooks/useI18n';
import PageTracking from './components/PageTracking';
import ScrollToTop from './components/ScrollToTop';
import { ContactChat } from './components/ContactChat';

import './App.css';
import Layout from './components/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Play from './pages/Play';
import NotFound from './pages/NotFound';

// Create a context for chat visibility
export const ContactContext = createContext<{
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showChat: false,
  setShowChat: () => {},
});

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <I18nProvider>
      <ContactContext.Provider value={{ showChat, setShowChat }}>
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
          <ContactChat 
            isVisible={showChat} 
            onClose={() => setShowChat(false)} 
          />
        </Router>
      </ContactContext.Provider>
    </I18nProvider>
  );
};

export default App;
