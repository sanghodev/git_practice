import React, { useState } from 'react';
import './Roulette.css';

const Roulette = ({ menus }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);

  const startSpin = () => {
    if (menus.length > 0) {
      setResult(null);
      setSpinning(true);
      const randomIndex = Math.floor(Math.random() * menus.length);
      const degreesPerItem = 360 / menus.length;
      // Add multiple rotations for visual effect
      const randomRotation = 360 * 5 + (360 - degreesPerItem * randomIndex);

      setRotation(rotation + randomRotation);

      setTimeout(() => {
        setResult(menus[randomIndex]);
        setSpinning(false);
      }, 4000); // 4 seconds spin
    }
  };

  const sliceStyle = (index) => {
    const degreesPerItem = 360 / menus.length;
    const rotate = degreesPerItem * index;
    return {
      transform: `rotate(${rotate}deg) skewY(-${90 - degreesPerItem}deg)`
    };
  };

  return (
    <div className="roulette-container">
      <div className="roulette-wheel-wrapper">
        <div
          className="roulette-wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {menus.map((menu, index) => (
            <div key={index} className="roulette-slice" style={sliceStyle(index)}>
              <span className="slice-text">{menu.name}</span>
            </div>
          ))}
        </div>
        <div className="roulette-pointer"></div>
      </div>
      <button onClick={startSpin} disabled={spinning}>
        Spin
      </button>
      {result && <p className="result-text">Result: {result.name}</p>}
    </div>
  );
};

export default Roulette;
