import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

export function VideoStudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center p-8"
           style={{ backgroundColor: 'var(--cyber-obsidian)' }}>
        <div className="max-w-4xl w-full aspect-video rounded-lg overflow-hidden border flex items-center justify-center"
             style={{
               borderColor: 'var(--cyber-border)',
               background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
             }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all hover:scale-105"
            style={{
              borderColor: 'var(--cyber-green)',
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
            }}>
            {isPlaying ? (
              <Pause className="w-8 h-8" style={{ color: 'var(--cyber-green)' }} />
            ) : (
              <Play className="w-8 h-8 ml-1" style={{ color: 'var(--cyber-green)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="h-48 border-t p-4"
           style={{ borderColor: 'var(--cyber-border)', backgroundColor: 'var(--cyber-charcoal)' }}>
        <div className="text-xs font-mono mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Timeline
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="h-12 flex-1 rounded border"
                 style={{ backgroundColor: 'var(--cyber-green)', borderColor: 'var(--cyber-border)', opacity: 0.5 }}>
              <div className="p-2 text-xs font-mono" style={{ color: 'var(--cyber-obsidian)' }}>Video Track 1</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-12 w-1/2 rounded border"
                 style={{ backgroundColor: 'var(--cyber-amber)', borderColor: 'var(--cyber-border)', opacity: 0.5 }}>
              <div className="p-2 text-xs font-mono" style={{ color: 'var(--cyber-obsidian)' }}>Audio Track</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
