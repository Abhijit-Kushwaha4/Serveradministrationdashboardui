import { useState, useRef } from 'react';
import { Eraser } from 'lucide-react';

interface Dot {
  x: number;
  y: number;
}

export function Whiteboard() {
  const [dots, setDots] = useState<Dot[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDots([...dots, { x, y }]);
  };

  const clearCanvas = () => {
    setDots([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-4"
           style={{ borderColor: 'var(--cyber-border)' }}>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 rounded-lg border flex items-center gap-2 font-mono text-sm transition-all hover:border-opacity-50"
          style={{
            backgroundColor: 'var(--cyber-red)',
            borderColor: 'var(--cyber-red)',
            color: 'var(--cyber-obsidian)',
          }}>
          <Eraser className="w-4 h-4" />
          Clear
        </button>
        <span className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Click to draw dots
        </span>
      </div>

      <div
        ref={canvasRef}
        onClick={handleClick}
        className="flex-1 relative cursor-crosshair"
        style={{ backgroundColor: '#ffffff' }}
      >
        {dots.map((dot, idx) => (
          <div
            key={idx}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: dot.x - 6,
              top: dot.y - 6,
              backgroundColor: 'var(--cyber-green)',
              boxShadow: '0 0 8px var(--cyber-green-glow)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
