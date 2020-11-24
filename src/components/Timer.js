import React, { useState, useEffect } from 'react';

export default function Timer(){
  // Define state variables for time left and whether countdown is active
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  // Start/Pause toggles active countdown
  function toggle() {
    setIsActive(!isActive);
  }

  // Countdown reset to 60s and made inactive
  function reset() {
    setSeconds(60);
    setIsActive(false);
  }


  useEffect(() => {
    let interval = null;
    // If counting down and time remains
    if (isActive && seconds > 0) {
      // Continue decreasing interval
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="time">
      <h3>{seconds}s</h3>
      <button className={isActive ? 'btn timer btn-warning' : 'btn timer btn-success'} onClick={toggle}>
        <span className={isActive ? 'icon icon-pause' : 'icon icon-start'}></span>
      </button>
      <button className="btn timer btn-danger" onClick={reset}>
        <span className="icon icon-reset"></span>
      </button> 
    </div>
  );
};