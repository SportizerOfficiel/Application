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
    }, 5000);
  };

  return (
    <div>
      <h1>{time}</h1>
      <Bouton onClick={pauseTimer}>
        Temps-mort 1:00
      </Bouton>
    </div>
  );
}

export default Chrono;