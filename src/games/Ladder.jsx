import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import './Ladder.css';

const Ladder = ({ menus }) => {
  const canvasRef = useRef(null);

  const ladders = useMemo(() => {
    const numMembers = menus.length;
    if (numMembers < 2) return [];

    const newLadders = [];
    for (let level = 1; level < 8; level++) {
      const start = Math.floor(Math.random() * (numMembers - 1));
      // Avoid overlapping rungs on the same level
      if (!newLadders.some(l => l.level === level && (l.start === start || l.end === start))) {
         newLadders.push({ level, start, end: start + 1 });
      }
    }
    return newLadders;
  }, [menus]);

  const drawLadder = useCallback((ctx) => {
    const canvas = ctx.canvas;
    const numMembers = menus.length;
    if (numMembers === 0) return;
    const spacing = canvas.width / (numMembers + 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--text-color') || '#000';
    ctx.lineWidth = 2;

    // Draw vertical lines
    for (let i = 0; i < numMembers; i++) {
      ctx.beginPath();
      ctx.moveTo(spacing * (i + 1), 50);
      ctx.lineTo(spacing * (i + 1), canvas.height - 50);
      ctx.stroke();
    }

    // Draw horizontal rungs
    ladders.forEach(rung => {
      const startX = spacing * (rung.start + 1);
      const endX = spacing * (rung.end + 1);
      const y = 50 + rung.level * 40;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    });
  }, [menus, ladders]);

  const tracePath = (ctx, startIdx) => {
    const canvas = ctx.canvas;
    const numMembers = menus.length;
    const spacing = canvas.width / (numMembers + 1);
    let currentLine = startIdx;
    let y = 50;

    ctx.beginPath();
    ctx.moveTo(spacing * (startIdx + 1), y);
    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--primary-color') || '#ff6e6e';
    ctx.lineWidth = 3;

    let path = [{x: spacing * (startIdx + 1), y: y}];

    const sortedLadders = [...ladders].sort((a, b) => a.level - b.level);

    sortedLadders.forEach(rung => {
      const rungY = 50 + rung.level * 40;
      if (rung.start === currentLine) {
        path.push({x: spacing * (currentLine + 1), y: rungY});
        path.push({x: spacing * (rung.end + 1), y: rungY});
        currentLine = rung.end;
      } else if (rung.end === currentLine) {
        path.push({x: spacing * (currentLine + 1), y: rungY});
        path.push({x: spacing * (rung.start + 1), y: rungY});
        currentLine = rung.start;
      }
    });

    path.push({x: spacing * (currentLine + 1), y: canvas.height - 50});

    // Animate the path
    let i = 0;
    const animate = () => {
        if (i < path.length - 1) {
            ctx.beginPath();
            ctx.moveTo(path[i].x, path[i].y);
            ctx.lineTo(path[i+1].x, path[i+1].y);
            ctx.stroke();
            i++;
            requestAnimationFrame(animate);
        } else {
             setTimeout(() => {
              if (menus[currentLine]) {
                alert(`Result: ${menus[currentLine].name}`);
              }
            }, 100);
        }
    }
    animate();

    return currentLine;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawLadder(ctx);
  }, [drawLadder]);

  const handleStart = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawLadder(ctx); // Redraw clean ladder
    tracePath(ctx, index);
  };

  return (
    <div className="ladder-container">
      <div className="start-points">
        {menus.map((_, index) => (
          <button key={index} onClick={() => handleStart(index)}>
            {index + 1}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} width={menus.length * 100} height={400}></canvas>
      <div className="end-points">
        {menus.map((menu, index) => (
          <div key={index}>{menu.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Ladder;
