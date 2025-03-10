import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that tracks the current page and sets the data-page attribute
 * This enables the Tailwind page-* variants to work correctly
 */
const PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract page name from path
    const path = location.pathname;
    let pageName = path === '/' ? 'home' : path.substring(1).split('/')[0];
    
    // Set the data-page attribute
    document.body.setAttribute('data-page', pageName);
    
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, [location.pathname]);

  return null;
};

export default PageTracking;