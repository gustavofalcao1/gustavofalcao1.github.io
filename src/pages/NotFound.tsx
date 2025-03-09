import React, { useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

const NotFound: React.FC = () => {
  const { refreshTranslations } = useI18n();
  
  useEffect(() => {
    refreshTranslations();
  }, [refreshTranslations]);
  
  return (
    <div className="404-container">
      <h1>Welcome</h1>
      <div className="content">
        <p>This is the 404 page</p>
      </div>
    </div>
  );
};

export default NotFound;