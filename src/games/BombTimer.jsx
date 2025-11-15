import React, { useState, useEffect } from 'react';
import './BombTimer.css';

const BombTimer = ({ menus }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setExploded(true);
    }
  }, [timeLeft]);

  const restart = () => {
    setTimeLeft(10);
    setExploded(false);
  };

  return (
    <div className="bomb-timer-container">
      <div className={`bomb ${exploded ? 'exploded' : ''}`}>
        {exploded ? '💥' : timeLeft}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
};

export default BombTimer;
