
import { useState } from 'react';
import { Film } from 'lucide-react';
import { runSora2Pro } from '../../bytezClient'; // Using Sora for video generation

export function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const result = await runSora2Pro(prompt);
      // The result should be a URL to the generated video.
      setVideoUrl(result);
    } catch (e: any) {
      console.error("Video Generation Error:", e);
      setError(e.message || "An unknown error occurred during video generation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl mb-6 flex items-center gap-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Film className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          AI Video Generator (Sora-2-Pro)
        </h2>
        
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g., 'A majestic whale floating through the clouds'"
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

        {isLoading && (
            <div className="text-center">
                <p className="text-cyber-secondary font-mono">Your video is being generated. This may take a moment...</p>
            </div>
        )}
        {error && (
            <div className="text-center">
                <p className="text-red-500 font-mono">{error}</p>
            </div>
        )}

        {/* Video Preview */}
        {videoUrl && (
          <div className="mt-8 aspect-video rounded-lg border overflow-hidden bg-black"
               style={{ borderColor: 'var(--cyber-border)' }}>
            <video src={videoUrl} controls autoPlay loop className="w-full h-full" />
          </div>
        )}

        {!isLoading && !videoUrl && !error && (
            <div className="mt-8 text-center">
                <p className="text-cyber-secondary font-mono">The generated video will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
