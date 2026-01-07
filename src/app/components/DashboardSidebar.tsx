import { LayoutDashboard, Server, Network, FileText, Shield, Settings, User } from 'lucide-react';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Server, label: 'Nodes' },
  { icon: Network, label: 'Networking' },
  { icon: FileText, label: 'Logs' },
  { icon: Shield, label: 'Security' },
  { icon: Settings, label: 'Settings' },
];

export function DashboardSidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-6 border-r"
         style={{
           backgroundColor: 'var(--cyber-charcoal)',
           borderColor: 'var(--cyber-border)',
         }}>
      
      {/* Logo/Brand */}
      <div className="mb-12 w-10 h-10 rounded-lg flex items-center justify-center"
           style={{
             backgroundColor: 'var(--cyber-obsidian)',
             border: '1px solid var(--cyber-border)',
             boxShadow: '0 0 20px var(--cyber-green-glow)',
           }}>
        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--cyber-green)' }} />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="group relative w-full h-14 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: item.active ? 'var(--cyber-dark-surface)' : 'transparent',
              border: item.active ? '1px solid var(--cyber-border)' : '1px solid transparent',
            }}
          >
            <item.icon 
              className="w-5 h-5 transition-all" 
              style={{ 
                color: item.active ? 'var(--cyber-green)' : 'rgba(255, 255, 255, 0.5)',
                filter: item.active ? 'drop-shadow(0 0 8px var(--cyber-green-glow))' : 'none',
              }}
            />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-2 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
                 style={{
                   backgroundColor: 'var(--cyber-dark-surface)',
                   border: '1px solid var(--cyber-border)',
                   color: 'rgba(255, 255, 255, 0.9)',
                   fontSize: '0.875rem',
                 }}>
              {item.label}
            </div>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
           style={{
             backgroundColor: 'var(--cyber-dark-surface)',
             border: '1px solid var(--cyber-border)',
           }}>
        <User className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
      </div>
    </div>
  );
}
