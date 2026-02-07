
import { useState, useEffect } from 'react';
import { Film, CheckCircle, AlertTriangle } from 'lucide-react';
import { runSora2Pro, getVideoStatus } from '../../bytezClient';

export function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const pollForVideo = async (id: string) => {
    if (!isPolling) return;

    try {
      const status = await getVideoStatus(id);
      if (status.videoUrl) {
        setVideoUrl(status.videoUrl);
        setIsPolling(false);
        setJobId(null);
      } else {
        // If not ready, poll again after a delay
        setTimeout(() => pollForVideo(id), 5000);
      }
    } catch (e: any) {
      console.error("Polling Error:", e);
      setError("Failed to retrieve video status.");
      setIsPolling(false);
    }
  };

  useEffect(() => {
    if (jobId && isPolling) {
      pollForVideo(jobId);
    }
    // Cleanup on unmount
    return () => {
      setIsPolling(false);
    };
  }, [jobId, isPolling]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);
    setJobId(null);

    try {
      const result = await runSora2Pro(prompt);
      if (result.jobId) {
        setJobId(result.jobId);
        setIsPolling(true);
      } else {
        setError("Failed to start video generation job.");
      }
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
            disabled={isLoading || isPolling}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || isPolling}
            className="px-6 rounded-lg border transition-all hover:border-opacity-50 font-mono disabled:opacity-50"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}
          >
            {isLoading ? 'Starting...' : (isPolling ? 'Generating...': 'Generate')}
          </button>
        </div>

        {isPolling && (
            <div className="text-center p-4 rounded-lg bg-cyber-surface border border-cyber-border">
                <p className="text-cyber-secondary font-mono animate-pulse">Your video is being generated. This may take a moment...</p>
            </div>
        )}
        {error && (
            <div className="text-center p-4 rounded-lg bg-red-900/20 border border-red-500/50 flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500"/>
                <p className="text-red-400 font-mono">{error}</p>
            </div>
        )}

        {videoUrl && (
          <div className="mt-8 aspect-video rounded-lg border overflow-hidden bg-black shadow-lg shadow-cyber-green/20"
               style={{ borderColor: 'var(--cyber-green)' }}>
            <video src={videoUrl} controls autoPlay loop className="w-full h-full" />
            <div className="mt-2 text-center flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyber-green"/>
              <p className="text-cyber-green font-mono">Video generation complete!</p>
            </div>
          </div>
        )}

        {!isLoading && !videoUrl && !error && !isPolling && (
            <div className="mt-8 text-center p-4 rounded-lg bg-cyber-surface border border-cyber-border">
                <p className="text-cyber-secondary font-mono">The generated video will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
