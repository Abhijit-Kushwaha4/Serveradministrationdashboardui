import { useState } from 'react';

export function SoundStudio() {
  const bands = ['60Hz', '250Hz', '1kHz', '4kHz', '16kHz'];
  const [levels, setLevels] = useState([50, 50, 50, 50, 50]);

  const handleLevelChange = (index: number, value: number) => {
    const newLevels = [...levels];
    newLevels[index] = value;
    setLevels(newLevels);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <h2 className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        Equalizer
      </h2>

      <div className="flex items-end gap-8 h-96">
        {bands.map((band, idx) => (
          <div key={band} className="flex flex-col items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={levels[idx]}
              onChange={(e) => handleLevelChange(idx, Number(e.target.value))}
              orient="vertical"
              className="h-64"
              style={{
                writingMode: 'bt-lr',
                appearance: 'slider-vertical',
                width: '40px',
              }}
            />
            <div className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {band}
            </div>
            <div className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {levels[idx]}%
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 px-6 py-2 rounded-lg border font-mono"
              style={{
                backgroundColor: 'var(--cyber-green)',
                borderColor: 'var(--cyber-green)',
                color: 'var(--cyber-obsidian)',
              }}>
        Apply
      </button>
    </div>
  );
}
