
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { runFluxDev } from '../../bytezClient-flux'; // Using FLUX for image generation

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]); // Clear previous images

    try {
      // The model is expected to return an array of image URLs or base64 strings.
      // We will generate one image for this example.
      const result = await runFluxDev(prompt);

      // Bytez.js might return a single URL or an array.
      const newImages = Array.isArray(result) ? result : [result];

      setImages(newImages);

    } catch (e: any) {
      console.error("Image Generation Error:", e);
      setError(e.message || "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center gap-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Sparkles className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          AI Image Generator (FLUX.1-dev)
        </h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g., 'A cinematic shot of a raccoon astronaut in a futuristic city'"
            className="flex-1 px-4 py-3 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 rounded-lg border transition-all hover:border-opacity-50 font-mono disabled:opacity-50"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
        {isLoading && (
            <div className="col-span-full flex items-center justify-center">
                <p className="text-cyber-secondary font-mono">Generating your masterpiece...</p>
            </div>
        )}
        {error && (
            <div className="col-span-full flex items-center justify-center">
                <p className="text-red-500 font-mono">{error}</p>
            </div>
        )}
        {images.map((src, i) => (
          <div
            key={i}
            className="rounded-lg border overflow-hidden bg-cyber-obsidian"
            style={{ borderColor: 'var(--cyber-border)' }}
          >
            <img src={src} alt={`Generated image ${i + 1} from prompt: ${prompt}`} className="w-full h-full object-cover" />
          </div>
        ))}
         {!isLoading && !error && images.length === 0 && (
            <div className="col-span-full flex items-center justify-center">
                <p className="text-cyber-secondary font-mono">Your generated images will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
