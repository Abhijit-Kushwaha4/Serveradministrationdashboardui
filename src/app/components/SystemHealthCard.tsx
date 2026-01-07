import { Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const sparklineData = [
  { value: 99.95 },
  { value: 99.97 },
  { value: 99.99 },
  { value: 99.98 },
  { value: 99.99 },
  { value: 100 },
  { value: 99.99 },
  { value: 99.99 },
];

export function SystemHealthCard() {
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
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
              <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Global System Health
              </h3>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-mono tracking-tight" 
                    style={{ 
                      color: 'var(--cyber-green)',
                      textShadow: '0 0 20px var(--cyber-green-glow)',
                    }}>
                99.99%
              </span>
              <span className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Uptime
              </span>
            </div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="h-16 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--cyber-green)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Last incident: 127 days ago
          </span>
          <div className="w-2 h-2 rounded-full animate-pulse" 
               style={{ 
                 backgroundColor: 'var(--cyber-green)',
                 boxShadow: '0 0 8px var(--cyber-green-glow)',
               }} />
        </div>
      </div>
    </div>
  );
}