import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Cpu } from 'lucide-react';

const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      time: new Date(Date.now() - (14 - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      cpu: Math.random() * 20 + 40,
      memory: Math.random() * 20 + 50,
    });
  }
  return data;
};

export function CPUMemoryChart() {
  const [data, setData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = prevData.slice(1);
        const lastDataPoint = prevData[prevData.length - 1];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: Math.max(20, Math.min(95, lastDataPoint.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(90, lastDataPoint.memory + (Math.random() - 0.5) * 5)),
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentCpu = data[data.length - 1]?.cpu.toFixed(1) || 0;
  const currentMemory = data[data.length - 1]?.memory.toFixed(1) || 0;

  return (
    <div className="relative overflow-hidden rounded-xl border p-6 col-span-2"
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
            <Cpu className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
            <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              CPU & Memory Usage (Real-time)
            </h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--cyber-green)' }} />
              <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--cyber-amber)' }} />
              <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Memory</span>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cyber-green)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--cyber-green)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cyber-amber)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--cyber-amber)" stopOpacity={0}/>
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
                interval="preserveStartEnd"
                ticks={[data[0]?.time, data[Math.floor(data.length / 2)]?.time, data[data.length - 1]?.time]}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.3)"
                style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
                domain={[0, 100]}
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
              />
              <Area
                isAnimationActive={false}
                type="monotone"
                dataKey="cpu"
                stroke="var(--cyber-green)"
                strokeWidth={2}
                fill="url(#colorCpu)"
              />
              <Area
                isAnimationActive={false}
                type="monotone"
                dataKey="memory"
                stroke="var(--cyber-amber)"
                strokeWidth={2}
                fill="url(#colorMemory)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Current CPU
            </div>
            <div className="text-xl font-mono" style={{ color: 'var(--cyber-green)' }}>
              {currentCpu}%
            </div>
          </div>
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Current Memory
            </div>
            <div className="text-xl font-mono" style={{ color: 'var(--cyber-amber)' }}>
              {currentMemory}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
