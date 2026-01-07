import { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

export function BrowserApp() {
  const [url, setUrl] = useState('https://example.com');
  const [displayUrl, setDisplayUrl] = useState('https://example.com');

  const handleGo = () => {
    setDisplayUrl(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Address Bar */}
      <div className="p-4 border-b flex items-center gap-2"
           style={{ borderColor: 'var(--cyber-border)', backgroundColor: 'var(--cyber-charcoal)' }}>
        <button className="p-2 rounded border"
                style={{
                  backgroundColor: 'var(--cyber-dark-surface)',
                  borderColor: 'var(--cyber-border)',
                }}>
          <ArrowLeft className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        </button>
        <button className="p-2 rounded border"
                style={{
                  backgroundColor: 'var(--cyber-dark-surface)',
                  borderColor: 'var(--cyber-border)',
                }}>
          <ArrowRight className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        </button>
        <button className="p-2 rounded border"
                style={{
                  backgroundColor: 'var(--cyber-dark-surface)',
                  borderColor: 'var(--cyber-border)',
                }}>
          <RotateCw className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        </button>
        
        <div className="flex-1 flex items-center gap-2">
          <Globe className="w-4 h-4 ml-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGo()}
            className="flex-1 px-3 py-2 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />
          <button
            onClick={handleGo}
            className="px-4 py-2 rounded-lg border font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}>
            Go
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center"
           style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center">
          <Globe className="w-16 h-16 mx-auto mb-4" style={{ color: '#333' }} />
          <div className="text-xl mb-2" style={{ color: '#333' }}>{displayUrl}</div>
          <div className="text-sm" style={{ color: '#666' }}>Simulated browser view</div>
        </div>
      </div>
    </div>
  );
}
