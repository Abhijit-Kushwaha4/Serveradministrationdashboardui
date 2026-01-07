import { AlertTriangle, ArrowRight } from 'lucide-react';

export function ActiveIncidentsCard() {
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
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--cyber-amber)' }} />
              <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Active Incidents
              </h3>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-mono tracking-tight" 
                    style={{ 
                      color: 'var(--cyber-amber)',
                      textShadow: '0 0 20px var(--cyber-amber-glow)',
                    }}>
                2
              </span>
              <span className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Warnings
              </span>
            </div>
          </div>
        </div>

        {/* Incident List */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono" 
               style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <div className="w-1.5 h-1.5 rounded-full" 
                 style={{ backgroundColor: 'var(--cyber-amber)' }} />
            <span>High latency on DB-03</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono" 
               style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <div className="w-1.5 h-1.5 rounded-full" 
                 style={{ backgroundColor: 'var(--cyber-amber)' }} />
            <span>Memory threshold at 85%</span>
          </div>
        </div>

        <button className="w-full h-10 rounded-lg border flex items-center justify-center gap-2 transition-all hover:border-opacity-50 group"
                style={{
                  backgroundColor: 'var(--cyber-glass)',
                  borderColor: 'var(--cyber-amber)',
                  color: 'var(--cyber-amber)',
                }}>
          <span className="text-sm font-mono">View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
