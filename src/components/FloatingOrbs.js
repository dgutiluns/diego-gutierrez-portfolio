import React from 'react';
import './FloatingOrbs.css';

const FloatingOrbs = ({ position = 'top' }) => {
  return (
    <div className={`orb-container orb-container-${position}`}>
      {/* Background Orbs - Black themed with organic shapes */}
      <div className="orb orb-1 animate-orb-1"></div>
      <div className="orb orb-2 animate-orb-2"></div>
      <div className="orb orb-3 animate-orb-3"></div>
      <div className="orb orb-4 animate-orb-4"></div>
    </div>
  );
};

export default FloatingOrbs;
