
import { LayoutDashboard, Server, Network, FileText, Shield, Settings, User } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter } from './ui/sidebar';
import { useIsMobile } from './ui/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <Sidebar isMobile={isMobile}>
      <SidebarContent
        className="w-64"
        style={{
          backgroundColor: 'var(--cyber-charcoal)',
          borderColor: 'var(--cyber-border)',
        }}
      >
        <SidebarHeader className="flex items-center justify-start">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
               style={{
                 backgroundColor: 'var(--cyber-obsidian)',
                 border: '1px solid var(--cyber-border)',
                 boxShadow: '0 0 20px var(--cyber-green-glow)',
               }}>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--cyber-green)' }} />
          </div>
          <span className="ml-4 font-semibold text-lg">Admin</span>
        </SidebarHeader>

        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label} active={item.active}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarFooter>
          <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
               style={{
                 backgroundColor: 'var(--cyber-dark-surface)',
                 border: '1px solid var(--cyber-border)',
               }}>
            <User className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
