import { useEffect, useState } from 'react';

export function Studio3D() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8"
         style={{ 
           backgroundColor: 'var(--cyber-obsidian)',
           perspective: '1000px',
         }}>
      <div
        style={{
          width: '200px',
          height: '200px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation}deg) rotateY(${rotation}deg)`,
        }}
      >
        {/* Cube faces */}
        {[
          { transform: 'rotateY(0deg) translateZ(100px)', bg: 'rgba(0, 255, 136, 0.3)' },
          { transform: 'rotateY(90deg) translateZ(100px)', bg: 'rgba(0, 255, 136, 0.3)' },
          { transform: 'rotateY(180deg) translateZ(100px)', bg: 'rgba(0, 255, 136, 0.3)' },
          { transform: 'rotateY(-90deg) translateZ(100px)', bg: 'rgba(0, 255, 136, 0.3)' },
          { transform: 'rotateX(90deg) translateZ(100px)', bg: 'rgba(0, 255, 136, 0.3)' },
          { transform: 'rotateX(-90deg) translateZ(100px)', bg: 'rgba(0, 255, 136, 0.3)' },
        ].map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              border: '2px solid var(--cyber-green)',
              backgroundColor: face.bg,
              transform: face.transform,
              boxShadow: '0 0 20px var(--cyber-green-glow)',
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-8 text-center">
        <div className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          3D Wireframe Cube
        </div>
        <div className="text-xs font-mono mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Rotation: {rotation}°
        </div>
      </div>
    </div>
  );
}
