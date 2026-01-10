import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: number;
  timestamp: string;
  severity: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const sampleMessages = [
  { severity: 'INFO' as const, message: 'User {uid} logged in from {ip}' },
  { severity: 'INFO' as const, message: 'Processed payment of ${amount} for order {oid}' },
  { severity: 'INFO' as const, message: 'Database query took {ms}ms on shard-03' },
  { severity: 'WARN' as const, message: 'API latency for /v1/users is high: {ms}ms' },
  { severity: 'WARN' as const, message: "Queue depth for 'background-jobs' is at {n}" },
  { severity: 'ERROR' as const, message: "Failed to connect to Redis instance at {host}:{port}" },
  { severity: 'ERROR' as const, message: "Unhandled exception in service 'auth-service': {err}" },
  { severity: 'INFO' as const, message: "Deployment of '{service}:v{v}' successful" },
  { severity: 'WARN' as const, message: 'Disk space on {disk} is at {p}%' },
];

const getRandomMessage = () => {
  const template = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
  let message = template.message;
  // Replace placeholders with random data
  message = message.replace('{uid}', Math.floor(10000 + Math.random() * 90000).toString());
  message = message.replace('{ip}', `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
  message = message.replace('${amount}', (Math.random() * 500).toFixed(2));
  message = message.replace('{oid}', Math.random().toString(36).substr(2, 10).toUpperCase());
  message = message.replace('{ms}', Math.floor(Math.random() * 400 + 50).toString());
  message = message.replace('{n}', Math.floor(Math.random() * 1000).toString());
  message = message.replace('{host}', 'redis-prod-01');
  message = message.replace('{port}', '6379');
  message = message.replace('{err}', "TypeError: Cannot read property 'name' of undefined");
  message = message.replace('{service}', 'user-profiles');
  message = message.replace('{v}', `1.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`);
  message = message.replace('{disk}', '/dev/sda1');
  message = message.replace('{p}', Math.floor(85 + Math.random() * 15).toString());
  return { ...template, message };
};

export function LiveEventLog() {
  const [logs, setLogs] = useState<LogEntry[]>(() => Array.from({ length: 15 }, (_, i) => {
    const now = new Date(Date.now() - (15 - i) * 3000);
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const { severity, message } = getRandomMessage();
    return { id: i, timestamp, severity, message };
  }));
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(16);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const { severity, message } = getRandomMessage();
      
      const newLog: LogEntry = {
        id: nextId.current++,
        timestamp,
        severity,
        message,
      };

      setLogs(prev => [newLog, ...prev].slice(0, 30));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'INFO': return { bg: 'rgba(0, 255, 136, 0.1)', text: '#00ff88', border: 'rgba(0, 255, 136, 0.3)' };
      case 'WARN': return { bg: 'rgba(255, 176, 32, 0.1)', text: '#ffb020', border: 'rgba(255, 176, 32, 0.3)' };
      case 'ERROR': return { bg: 'rgba(255, 50, 50, 0.1)', text: '#ff3232', border: 'rgba(255, 50, 50, 0.3)' };
      default: return { bg: 'rgba(255, 255, 255, 0.05)', text: 'rgba(255, 255, 255, 0.7)', border: 'rgba(255, 255, 255, 0.1)' };
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border p-6 h-full col-span-2"
         style={{
           backgroundColor: 'var(--cyber-dark-surface)',
           borderColor: 'var(--cyber-border)',
           backdropFilter: 'blur(20px)',
         }}>
      
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px',
           }} />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Live Event Log Stream
          </h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--cyber-green)', boxShadow: '0 0 8px var(--cyber-green-glow)' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Live</span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar"
        >
          {logs.map((log, index) => {
            const styles = getSeverityStyles(log.severity);
            return (
              <div 
                key={log.id}
                className={`flex items-start gap-3 p-2 rounded border transition-all duration-300 ${index === 0 ? 'animate-fade-in' : ''}`}
                style={{
                  backgroundColor: styles.bg,
                  borderColor: styles.border,
                  fontFamily: 'monospace',
                }}
              >
                <span className="text-xs opacity-60" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{log.timestamp}</span>
                <span 
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: styles.text, color: 'var(--cyber-obsidian)' }}
                >
                  {log.severity}
                </span>
                <span className="text-sm flex-1" style={{ color: styles.text }}>{log.message}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--cyber-border)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Showing {logs.length} recent events</span>
          <button className="text-xs font-mono hover:underline" style={{ color: 'var(--cyber-green)' }}>View all logs</button>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--cyber-border);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: var(--cyber-green);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
