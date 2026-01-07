import { Search, Bell, ChevronDown, Clock } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-20 right-0 h-16 flex items-center px-8 gap-6 border-b z-40"
            style={{
              backgroundColor: 'var(--cyber-charcoal)',
              borderColor: 'var(--cyber-border)',
              backdropFilter: 'blur(20px)',
            }}>
      
      {/* Cluster Selector */}
      <button className="flex items-center gap-2 px-4 h-10 rounded-lg border transition-all hover:border-opacity-50"
              style={{
                backgroundColor: 'var(--cyber-dark-surface)',
                borderColor: 'var(--cyber-border)',
                color: 'rgba(255, 255, 255, 0.9)',
              }}>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--cyber-green)' }} />
        <span className="text-sm font-mono">us-east-1-prod</span>
        <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
      </button>

      {/* Global Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" 
                style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
        <input
          type="text"
          placeholder="Search nodes, metrics, logs..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border outline-none transition-all focus:border-opacity-50 font-mono text-sm"
          style={{
            backgroundColor: 'var(--cyber-dark-surface)',
            borderColor: 'var(--cyber-border)',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        />
      </div>

      {/* Time Range Picker */}
      <button className="flex items-center gap-2 px-4 h-10 rounded-lg border transition-all hover:border-opacity-50"
              style={{
                backgroundColor: 'var(--cyber-dark-surface)',
                borderColor: 'var(--cyber-border)',
                color: 'rgba(255, 255, 255, 0.9)',
              }}>
        <Clock className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <span className="text-sm font-mono">Last 24h</span>
        <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
      </button>

      <div className="flex-1" />

      {/* Notification Bell */}
      <button className="relative w-10 h-10 rounded-lg border flex items-center justify-center transition-all hover:border-opacity-50"
              style={{
                backgroundColor: 'var(--cyber-dark-surface)',
                borderColor: 'var(--cyber-border)',
              }}>
        <Bell className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
        
        {/* Alert Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono animate-pulse"
             style={{
               backgroundColor: 'var(--cyber-amber)',
               color: 'var(--cyber-obsidian)',
               boxShadow: '0 0 12px var(--cyber-amber-glow)',
             }}>
          2
        </div>
      </button>
    </header>
  );
}
