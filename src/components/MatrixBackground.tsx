import React, { useEffect, useRef, useCallback } from 'react';

interface MatrixBackgroundProps {
  className?: string;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨ';

  // Helper to get random starting position
  const getRandomStart = (height: number) => -Math.random() * height * 2;

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.font = '14px monospace';
    
    return () => {
      // Darker fade for better contrast
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, width, height);

      const drops = dropsRef.current;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character for current position
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14; // Column spacing
        const y = drops[i];

        // Draw leading character (bright purple)
        ctx.fillStyle = '#8957e5';
        ctx.shadowColor = '#8957e5';
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, y);

        // Draw trail (green with fade)
        ctx.shadowBlur = 0;
        for (let j = 1; j < 20; j++) {
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          const opacity = 1 - (j / 20);
          ctx.fillStyle = `rgba(46, 154, 64, ${opacity})`;
          ctx.fillText(trailChar, x, y - (j * 14));
        }

        // Update drop position with varying speed
        drops[i] += Math.random() * 5 + 5; // Speed between 5-10

        // Reset with more randomization
        if (drops[i] > height) {
          // 30% chance to reset immediately
          if (Math.random() > 0.7) {
            drops[i] = 0;
          } else {
            // Otherwise, start from random position above
            drops[i] = getRandomStart(height);
          }
        }
      }
    };
  }, [chars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize drops with better distribution
      const columns = Math.floor(canvas.width / 14);
      dropsRef.current = new Array(columns).fill(0).map(() => 
        getRandomStart(canvas.height)
      );
    };

    setSize();
    const drawFrame = draw(ctx, canvas.width, canvas.height);
    const intervalId = setInterval(drawFrame, 33); // ~30fps

    window.addEventListener('resize', setSize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', setSize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};

export default MatrixBackground;