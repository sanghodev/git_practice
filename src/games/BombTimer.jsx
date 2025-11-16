import React, { useState, useEffect } from 'react';
import './BombTimer.css';
// import tickSound from '../../assets/audio/tick.mp3';
// import explosionSound from '../../assets/audio/explosion.mp3';

const BombTimer = ({ menus }) => {
  const getRandomTime = () => Math.floor(Math.random() * 21) + 10;

  const [timeLeft, setTimeLeft] = useState(getRandomTime);
  const [exploded, setExploded] = useState(false);
  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!exploded) {
        // Defer state update to next tick
        setTimeout(() => setExploded(true), 0);
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      // tickAudio.play();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, exploded]);

  useEffect(() => {
      if (exploded) {
          // explosionAudio.play();
          if (menus && menus.length > 0) {
              const randomLoser = menus[Math.floor(Math.random() * menus.length)];
              setTimeout(() => {
                  alert(`Boom! ${randomLoser.name} got caught!`);
              }, 100);
          }
      }
  }, [exploded, menus]);

  const restart = () => {
    setGameId(id => id + 1);
    setExploded(false);
    setTimeLeft(getRandomTime());
  };

  return (
    <div className="bomb-timer-container" key={gameId}>
      <div className={`bomb ${exploded ? 'exploded' : ''}`}>
        {exploded ? '💥' : timeLeft}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
};

export default BombTimer;
