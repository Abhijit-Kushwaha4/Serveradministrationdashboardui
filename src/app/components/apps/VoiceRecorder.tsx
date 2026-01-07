import { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [bars, setBars] = useState(Array(20).fill(20));

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setBars(Array(20).fill(0).map(() => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setBars(Array(20).fill(20));
    }
  }, [isRecording]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Voice Recorder
        </h2>
        <p className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          {isRecording ? 'Recording...' : 'Press record to start'}
        </p>
      </div>

      {/* Waveform */}
      <div className="flex items-end justify-center gap-1 h-40 mb-12">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-3 rounded-t transition-all duration-100"
            style={{
              height: `${height}%`,
              backgroundColor: isRecording ? 'var(--cyber-green)' : 'var(--cyber-border)',
              boxShadow: isRecording ? '0 0 8px var(--cyber-green-glow)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Record Button */}
      <button
        onClick={() => setIsRecording(!isRecording)}
        className="w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all hover:scale-105"
        style={{
          backgroundColor: isRecording ? 'var(--cyber-red)' : 'var(--cyber-green)',
          borderColor: isRecording ? 'var(--cyber-red)' : 'var(--cyber-green)',
          boxShadow: isRecording ? '0 0 20px var(--cyber-red-glow)' : '0 0 20px var(--cyber-green-glow)',
        }}
      >
        {isRecording ? (
          <Square className="w-8 h-8" style={{ color: 'var(--cyber-obsidian)' }} />
        ) : (
          <Mic className="w-8 h-8" style={{ color: 'var(--cyber-obsidian)' }} />
        )}
      </button>
    </div>
  );
}
