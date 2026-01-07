import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    // Generate 4 placeholder images with gradient patterns
    const newImages = Array(4).fill(0).map((_, i) => {
      const hue1 = Math.random() * 360;
      const hue2 = (hue1 + 60) % 360;
      return `linear-gradient(135deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 30%))`;
    });
    setImages(newImages);
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center gap-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Sparkles className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          AI Image Generator
        </h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Enter your prompt..."
            className="flex-1 px-4 py-3 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />
          <button
            onClick={handleGenerate}
            className="px-6 rounded-lg border transition-all hover:border-opacity-50 font-mono"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {images.map((gradient, i) => (
          <div
            key={i}
            className="rounded-lg border overflow-hidden"
            style={{
              background: gradient,
              borderColor: 'var(--cyber-border)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center backdrop-blur-sm"
                 style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
              <span className="font-mono text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Generated Image {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
