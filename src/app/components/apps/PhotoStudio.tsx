import { useState } from 'react';

export function PhotoStudio() {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const filterStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full aspect-video rounded-lg overflow-hidden border"
             style={{
               borderColor: 'var(--cyber-border)',
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
             }}>
          <div className="w-full h-full flex items-center justify-center" style={filterStyle}>
            <span className="text-2xl font-mono text-white">Sample Image</span>
          </div>
        </div>
      </div>

      <div className="w-80 border-l p-6 space-y-6"
           style={{ borderColor: 'var(--cyber-border)' }}>
        <h3 className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Adjustments</h3>
        
        <div>
          <label className="text-sm font-mono mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Brightness: {brightness}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-mono mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Contrast: {contrast}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-mono mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Saturation: {saturation}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <button className="w-full py-2 rounded-lg border font-mono"
                style={{
                  backgroundColor: 'var(--cyber-green)',
                  borderColor: 'var(--cyber-green)',
                  color: 'var(--cyber-obsidian)',
                }}>
          Export
        </button>
      </div>
    </div>
  );
}
