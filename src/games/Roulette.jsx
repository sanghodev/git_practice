import React, { useState, useEffect } from 'react';
import './Roulette.css';

const Roulette = ({ menus }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const startSpin = () => {
    if (menus.length > 0) {
      setSpinning(true);
      const randomIndex = Math.floor(Math.random() * menus.length);
      setTimeout(() => {
        setResult(menus[randomIndex]);
        setSpinning(false);
      }, 3000); // 3 seconds spin
    }
  };

  return (
    <div className="roulette-container">
      <div className={`roulette-wheel ${spinning ? 'spinning' : ''}`}>
        {menus.map((menu, index) => (
          <div key={index} className="roulette-slice">
            {menu.name}
          </div>
        ))}
      </div>
      <button onClick={startSpin} disabled={spinning}>
        Spin
      </button>
      {result && <p>Result: {result.name}</p>}
    </div>
  );
};

export default Roulette;
