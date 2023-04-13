import React, { useState, useEffect, useRef } from 'react';
import Bouton from '@/DesignSystem/Atoms/Bouton';

function Chrono() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setTimeout(() => {
      startTimer();
    }, 60000);
  };

  const formatTime = (timeInSeconds) => {
    const date = new Date(timeInSeconds * 1000);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <Bouton text="Temps-mort 1:00" onClick={pauseTimer}/>
    </div>
  );
}

export default Chrono;