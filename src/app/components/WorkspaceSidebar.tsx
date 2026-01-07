import { 
  MessageSquare, Mic, Image, Video, Code, FileText, Table, Presentation, StickyNote, Paintbrush,
  Camera, Film, Box, Music, Play, Palette, Terminal, Server, BarChart, Map, FolderTree,
  Globe, Trello, Mail, Settings, User
} from 'lucide-react';

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  section: string;
}

const menuItems: MenuItem[] = [
  // AI SUITE
  { id: 'chat', icon: MessageSquare, label: 'Chat', section: 'AI' },
  { id: 'voice', icon: Mic, label: 'Voice', section: 'AI' },
  { id: 'imagegen', icon: Image, label: 'Image Gen', section: 'AI' },
  { id: 'videogen', icon: Video, label: 'Video Gen', section: 'AI' },
  { id: 'codegen', icon: Code, label: 'Code Gen', section: 'AI' },
  
  // OFFICE SUITE
  { id: 'word', icon: FileText, label: 'Word', section: 'Office' },
  { id: 'excel', icon: Table, label: 'Excel', section: 'Office' },
  { id: 'ppt', icon: Presentation, label: 'PPT', section: 'Office' },
  { id: 'keep', icon: StickyNote, label: 'Keep', section: 'Office' },
  { id: 'whiteboard', icon: Paintbrush, label: 'Whiteboard', section: 'Office' },
  
  // CREATIVE SUITE
  { id: 'photo', icon: Camera, label: 'Photo Studio', section: 'Creative' },
  { id: 'video', icon: Film, label: 'Video Studio', section: 'Creative' },
  { id: '3d', icon: Box, label: '3D Studio', section: 'Creative' },
  { id: 'sound', icon: Music, label: 'Sound Studio', section: 'Creative' },
  
  // DEV & UTILITIES
  { id: 'coderunner', icon: Play, label: 'Code Runner', section: 'Dev' },
  { id: 'designer', icon: Palette, label: 'UI Designer', section: 'Dev' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', section: 'Dev' },
  { id: 'datacenter', icon: Server, label: 'Data Center', section: 'Dev' },
  { id: 'analysis', icon: BarChart, label: 'Analysis', section: 'Dev' },
  { id: 'map', icon: Map, label: 'Map', section: 'Dev' },
  { id: 'files', icon: FolderTree, label: 'Files', section: 'Dev' },
  { id: 'browser', icon: Globe, label: 'Browser', section: 'Dev' },
  { id: 'collaborate', icon: Trello, label: 'Collaborate', section: 'Dev' },
  { id: 'mail', icon: Mail, label: 'Mail/Call', section: 'Dev' },
  { id: 'settings', icon: Settings, label: 'Settings', section: 'Dev' },
];

interface WorkspaceSidebarProps {
  activeApp: string;
  onAppChange: (appId: string) => void;
}

export function WorkspaceSidebar({ activeApp, onAppChange }: WorkspaceSidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-6 border-r overflow-y-auto"
         style={{
           backgroundColor: 'var(--cyber-charcoal)',
           borderColor: 'var(--cyber-border)',
           scrollbarWidth: 'thin',
           scrollbarColor: 'var(--cyber-border) transparent',
         }}>
      
      {/* Logo/Brand */}
      <div className="mb-8 w-10 h-10 rounded-lg flex items-center justify-center"
           style={{
             backgroundColor: 'var(--cyber-obsidian)',
             border: '1px solid var(--cyber-border)',
             boxShadow: '0 0 20px var(--cyber-green-glow)',
           }}>
        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--cyber-green)' }} />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-1 w-full px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onAppChange(item.id)}
            className="group relative w-full h-12 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: activeApp === item.id ? 'var(--cyber-dark-surface)' : 'transparent',
              border: activeApp === item.id ? '1px solid var(--cyber-border)' : '1px solid transparent',
            }}
          >
            <item.icon 
              className="w-4 h-4 transition-all" 
              style={{ 
                color: activeApp === item.id ? 'var(--cyber-green)' : 'rgba(255, 255, 255, 0.5)',
                filter: activeApp === item.id ? 'drop-shadow(0 0 8px var(--cyber-green-glow))' : 'none',
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
