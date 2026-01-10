import { 
  MessageSquare, Mic, Image, Video, Code, FileText, Table, Presentation, StickyNote, Paintbrush,
  Camera, Film, Box, Music, Play, Palette, Terminal, Server, BarChart, Map, FolderTree,
  Globe, Trello, Mail, Settings, User, LogOut, ScanLine
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
  { id: 'ocr', icon: ScanLine, label: 'OCR', section: 'AI' },
  
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
  activeApp: string | null;
  onAppChange: (appId: string) => void;
  onLogout?: () => void;
}

export function WorkspaceSidebar({ activeApp, onAppChange, onLogout }: WorkspaceSidebarProps) {
  return (
    <div className="h-screen w-16 md:w-20 flex flex-col items-center py-4 md:py-6 border-r overflow-y-auto bg-cyber-dark-surface border-cyber-border"
         style={{
           scrollbarWidth: 'thin',
           scrollbarColor: 'var(--cyber-border) transparent',
         }}>
      
      {/* Logo/Brand */}
      <div 
        className="mb-8 w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber))',
          boxShadow: '0 0 30px var(--cyber-green-glow)',
        }}
      >
        <div 
          className="w-7 h-7 rounded-lg" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {menuItems.map(item => {
          const isActive = activeApp === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onAppChange(item.id)}
              className="group relative w-full h-12 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{
                backgroundColor: isActive ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
                border: isActive ? '1px solid var(--cyber-green)' : '1px solid transparent',
              }}
            >
              <item.icon 
                className="w-5 h-5 transition-colors" 
                style={{ 
                  color: isActive ? 'var(--cyber-green)' : 'rgba(255, 255, 255, 0.5)',
                }}
              />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 bg-cyber-dark-surface border border-cyber-green text-cyber-green text-sm shadow-lg">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
          style={{
            backgroundColor: 'rgba(255, 23, 68, 0.1)',
          }}
        >
          <LogOut className="w-5 h-5 text-cyber-red" />
        </button>
      )}

      {/* User Profile */}
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border border-cyber-border"
      >
        <User className="w-6 h-6 text-cyber-green" />
      </div>
    </div>
  );
}