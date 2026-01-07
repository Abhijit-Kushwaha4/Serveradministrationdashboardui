import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: number;
  timestamp: string;
  severity: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const initialLogs: LogEntry[] = [
  { id: 1, timestamp: '10:45:22', severity: 'WARN', message: 'High latency detected on DB-03 (127ms)' },
  { id: 2, timestamp: '10:45:18', severity: 'INFO', message: 'Health check passed on WEB-012' },
  { id: 3, timestamp: '10:45:15', severity: 'INFO', message: 'SSL certificate renewed for api.example.com' },
  { id: 4, timestamp: '10:45:12', severity: 'INFO', message: 'Backup completed: 2.4TB transferred' },
  { id: 5, timestamp: '10:45:08', severity: 'WARN', message: 'Memory threshold reached on APP-07 (85%)' },
  { id: 6, timestamp: '10:45:05', severity: 'INFO', message: 'Load balancer adjusted weights for cluster-east' },
  { id: 7, timestamp: '10:45:01', severity: 'INFO', message: 'New deployment started: api-service v2.4.1' },
  { id: 8, timestamp: '10:44:58', severity: 'INFO', message: 'Cache invalidation completed (1.2M keys)' },
];

const sampleMessages = [
  { severity: 'INFO' as const, message: 'Container scaled up on NODE-{n}' },
  { severity: 'INFO' as const, message: 'Request processed: {n}ms latency' },
  { severity: 'INFO' as const, message: 'Database connection pool resized to {n}' },
  { severity: 'WARN' as const, message: 'Retry attempt {n}/3 for service mesh' },
  { severity: 'INFO' as const, message: 'Metrics exported to monitoring system' },
  { severity: 'INFO' as const, message: 'Auto-scaling triggered for region us-west' },
];

export function LiveEventLog() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(9);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      const template = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const randomNum = Math.floor(Math.random() * 100);
      const message = template.message.replace('{n}', randomNum.toString());
      
      const newLog: LogEntry = {
        id: nextId.current++,
        timestamp,
        severity: template.severity,
        message,
      };

      setLogs(prev => [newLog, ...prev].slice(0, 12));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'INFO':
        return 'var(--cyber-green)';
      case 'WARN':
        return 'var(--cyber-amber)';
      case 'ERROR':
        return 'var(--cyber-red)';
      default:
        return 'rgba(255, 255, 255, 0.5)';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border p-6 h-full"
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

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Live Event Log Stream
          </h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" 
                 style={{ 
                   backgroundColor: 'var(--cyber-green)',
                   boxShadow: '0 0 8px var(--cyber-green-glow)',
                 }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Live
            </span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-2 pr-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--cyber-border) transparent',
          }}
        >
          {logs.map((log) => (
            <div 
              key={log.id}
              className="flex items-start gap-3 p-2 rounded border transition-colors hover:bg-opacity-5 hover:bg-white"
              style={{
                borderColor: 'var(--cyber-border)',
                fontFamily: 'monospace',
              }}
            >
              <span className="text-xs opacity-50" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {log.timestamp}
              </span>
              <span 
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: getSeverityColor(log.severity),
                  color: 'var(--cyber-obsidian)',
                  minWidth: '48px',
                  textAlign: 'center',
                }}
              >
                {log.severity}
              </span>
              <span className="text-xs flex-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {log.message}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Showing {logs.length} recent events
          </span>
          <button className="text-xs font-mono hover:underline" style={{ color: 'var(--cyber-green)' }}>
            View all logs →
          </button>
        </div>
      </div>
    </div>
  );
}
