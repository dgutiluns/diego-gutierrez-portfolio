import React from 'react';
import './FloatingOrbs.css';

const FloatingOrbs = () => {
  return (
    <div className="orb-container">
      {/* Single large background canvas covering entire page */}
      <div className="orb orb-1 animate-orb-1"></div>
      <div className="orb orb-2 animate-orb-2"></div>
      <div className="orb orb-3 animate-orb-3"></div>
      <div className="orb orb-4 animate-orb-4"></div>
      <div className="orb orb-5 animate-orb-5"></div>
      <div className="orb orb-6 animate-orb-6"></div>
      <div className="orb orb-7 animate-orb-7"></div>
      <div className="orb orb-8 animate-orb-8"></div>
    </div>
  );
};

export default FloatingOrbs;
