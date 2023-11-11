import React, { useState, useEffect } from 'react';
import './loading.css';
import logo from '../assets/logo.png';
import Signup from './Signup';

function LoadScrn() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []); 
  return (
    <>
     {showLoading ? (
        <div className='loading'>
          <img src={logo} alt="LOGO" />
          <h1>BUDGET BUDDY</h1>
          <h3 className='team'>By Team Unknown</h3>
        </div>
      ) : (
        <>
          <Signup />
        </>
      )}
    </>
  );
}

export default LoadScrn;
