import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

export function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isRendering) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRendering(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRendering]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setProgress(0);
    setIsRendering(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl mb-6 flex items-center gap-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Film className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          AI Video Generator
        </h2>
        
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Describe your video..."
            className="flex-1 px-4 py-3 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={isRendering}
            className="px-6 rounded-lg border transition-all hover:border-opacity-50 font-mono disabled:opacity-50"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}
          >
            Generate
          </button>
        </div>

        {/* Progress Bar */}
        {(isRendering || progress > 0) && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <span>{isRendering ? 'Rendering...' : 'Complete!'}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--cyber-dark-surface)' }}>
              <div 
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: 'var(--cyber-green)',
                  boxShadow: '0 0 12px var(--cyber-green-glow)',
                }}
              />
            </div>
          </div>
        )}

        {/* Video Preview */}
        {progress === 100 && (
          <div className="mt-8 aspect-video rounded-lg border overflow-hidden"
               style={{
                 backgroundColor: 'var(--cyber-dark-surface)',
                 borderColor: 'var(--cyber-border)',
               }}>
            <div className="w-full h-full flex items-center justify-center"
                 style={{
                   background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber))',
                 }}>
              <span className="font-mono text-lg" style={{ color: 'var(--cyber-obsidian)' }}>
                Generated Video Preview
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
