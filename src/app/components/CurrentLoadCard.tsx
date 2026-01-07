import { Gauge } from 'lucide-react';

export function CurrentLoadCard() {
  const loadPercentage = 78;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (loadPercentage / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-xl border p-6"
         style={{
           backgroundColor: 'var(--cyber-dark-surface)',
           borderColor: 'var(--cyber-border)',
           backdropFilter: 'blur(20px)',
         }}>
      
      {/* Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px',
           }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Current Load
          </h3>
        </div>

        {/* Gauge Chart */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="var(--cyber-border)"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="var(--cyber-green)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 8px var(--cyber-green-glow))',
                  transition: 'stroke-dashoffset 0.5s ease',
                }}
              />
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-mono" 
                    style={{ 
                      color: 'var(--cyber-green)',
                      textShadow: '0 0 20px var(--cyber-green-glow)',
                    }}>
                {loadPercentage}%
              </span>
              <span className="text-xs font-mono mt-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Avg Utilization
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-mono" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              156
            </div>
            <div className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Active Nodes
            </div>
          </div>
          <div>
            <div className="text-lg font-mono" style={{ color: 'var(--cyber-green)' }}>
              12.4k
            </div>
            <div className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Req/sec
            </div>
          </div>
          <div>
            <div className="text-lg font-mono" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              4.2ms
            </div>
            <div className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Avg Latency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
