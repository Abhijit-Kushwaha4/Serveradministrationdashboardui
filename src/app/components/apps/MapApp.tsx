export function MapApp() {
  const servers = [
    { name: 'US East', x: 25, y: 40 },
    { name: 'Europe', x: 50, y: 35 },
    { name: 'Asia', x: 75, y: 45 },
  ];

  return (
    <div className="h-full flex items-center justify-center p-8"
         style={{ backgroundColor: 'var(--cyber-obsidian)' }}>
      <div className="w-full max-w-6xl aspect-[16/9] relative rounded-lg border overflow-hidden"
           style={{
             borderColor: 'var(--cyber-border)',
             background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
           }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.1) 49px, rgba(255,255,255,0.1) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.1) 49px, rgba(255,255,255,0.1) 50px)',
             }} />

        {/* Server pins */}
        {servers.map((server) => (
          <div key={server.name} className="absolute" style={{ left: `${server.x}%`, top: `${server.y}%` }}>
            <div className="relative">
              <div className="w-4 h-4 rounded-full animate-pulse"
                   style={{
                     backgroundColor: 'var(--cyber-green)',
                     boxShadow: '0 0 20px var(--cyber-green-glow)',
                   }} />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping"
                   style={{
                     backgroundColor: 'var(--cyber-green)',
                     opacity: 0.3,
                   }} />
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs font-mono"
                   style={{
                     backgroundColor: 'var(--cyber-dark-surface)',
                     borderColor: 'var(--cyber-border)',
                     color: 'rgba(255, 255, 255, 0.9)',
                   }}>
                {server.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
