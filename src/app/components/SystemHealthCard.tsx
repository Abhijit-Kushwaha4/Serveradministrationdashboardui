import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const generateSparklineData = () => {
  const data = [];
  let lastValue = 99.98 + Math.random() * 0.04 - 0.02;
  for (let i = 0; i < 20; i++) {
    lastValue += Math.random() * 0.02 - 0.01;
    lastValue = Math.min(100, Math.max(99.9, lastValue));
    data.push({ value: parseFloat(lastValue.toFixed(2)) });
  }
  return data;
};

export function SystemHealthCard() {
  const [uptime, setUptime] = useState(99.99);
  const [sparklineData, setSparklineData] = useState(generateSparklineData());
  const [lastIncident, setLastIncident] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => {
        let newUptime = prev + (Math.random() - 0.5) * 0.01;
        return Math.min(100, Math.max(99.9, newUptime));
      });
      setSparklineData(generateSparklineData());
    }, 2000);

    const incidentInterval = setInterval(() => {
      setLastIncident(prev => prev + 1);
    }, 86400000); // Increment every day

    return () => {
      clearInterval(interval);
      clearInterval(incidentInterval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border p-6 col-span-1"
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
                      color: uptime > 99.95 ? 'var(--cyber-green)' : 'var(--cyber-amber)',
                      textShadow: `0 0 20px ${uptime > 99.95 ? 'var(--cyber-green-glow)' : 'var(--cyber-amber-glow)'}`,
                    }}>
                {uptime.toFixed(2)}%
              </span>
              <span className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Uptime
              </span>
            </div>
          </div>
        </div>

        <div className="h-16 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={uptime > 99.95 ? 'var(--cyber-green)' : 'var(--cyber-amber)'}
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Last incident: {lastIncident} days ago
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
