import React, { useRef, useEffect } from 'react';
import './Ladder.css';

const Ladder = ({ menus }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Basic ladder drawing logic
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    const numMenus = menus.length;
    if (numMenus < 2) return;

    const spacing = canvas.width / numMenus;

    for (let i = 0; i < numMenus; i++) {
      ctx.beginPath();
      ctx.moveTo(spacing / 2 + i * spacing, 0);
      ctx.lineTo(spacing / 2 + i * spacing, canvas.height);
      ctx.stroke();
    }
  }, [menus]);

  return (
    <div className="ladder-container">
      <canvas ref={canvasRef} width={400} height={300}></canvas>
    </div>
  );
};

export default Ladder;
