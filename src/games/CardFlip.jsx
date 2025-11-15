import React, { useState } from 'react';
import './CardFlip.css';

const CardFlip = ({ menus }) => {
  const [flipped, setFlipped] = useState(Array(menus.length).fill(false));

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="card-flip-container">
      {menus.map((menu, index) => (
        <div
          key={menu.id}
          className={`card ${flipped[index] ? 'flipped' : ''}`}
          onClick={() => handleFlip(index)}
        >
          <div className="card-inner">
            <div className="card-front">?</div>
            <div className="card-back">{menu.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFlip;
