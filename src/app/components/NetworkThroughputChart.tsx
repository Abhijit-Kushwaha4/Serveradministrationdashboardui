import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Network } from 'lucide-react';

const data = [
  { time: '00:00', in: 2.4, out: 1.8 },
  { time: '04:00', in: 2.1, out: 1.5 },
  { time: '08:00', in: 4.2, out: 3.1 },
  { time: '12:00', in: 5.8, out: 4.3 },
  { time: '16:00', in: 6.2, out: 4.8 },
  { time: '20:00', in: 4.5, out: 3.4 },
  { time: '24:00', in: 3.2, out: 2.3 },
];

export function NetworkThroughputChart() {
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
            <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Network Throughput (In/Out)
            </h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--cyber-green)' }} />
              <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Inbound</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#00d4ff' }} />
              <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Outbound</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cyber-green)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--cyber-green)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--cyber-border)"
                opacity={0.3}
              />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255, 255, 255, 0.3)"
                style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.3)"
                style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
                label={{ 
                  value: 'Gbps', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '0.75rem', fontFamily: 'monospace', fill: 'rgba(255, 255, 255, 0.5)' }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--cyber-charcoal)',
                  border: '1px solid var(--cyber-border)',
                  borderRadius: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
                labelStyle={{ color: 'rgba(255, 255, 255, 0.6)' }}
                formatter={(value: number) => [`${value} Gbps`]}
              />
              <Area
                type="monotone"
                dataKey="in"
                stroke="var(--cyber-green)"
                strokeWidth={2}
                fill="url(#colorIn)"
              />
              <Area
                type="monotone"
                dataKey="out"
                stroke="#00d4ff"
                strokeWidth={2}
                fill="url(#colorOut)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Current In
            </div>
            <div className="text-xl font-mono" style={{ color: 'var(--cyber-green)' }}>
              6.2 Gbps
            </div>
          </div>
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Current Out
            </div>
            <div className="text-xl font-mono" style={{ color: '#00d4ff)' }}>
              4.8 Gbps
            </div>
          </div>
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Peak Today
            </div>
            <div className="text-xl font-mono" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              8.4 Gbps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}