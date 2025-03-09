import React from 'react';
import logo from '../logo.svg';

const Loading: React.FC = () => {
  return (
    <div className="Loading">
      <header className="Loading-header">
        <img src={logo} className="Loading-logo" alt="logo" />
      </header>
    </div>
  );
};

export default Loading;
