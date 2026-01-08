import { 
  MessageSquare, Mic, Image, Video, Code, FileText, Table, Presentation, StickyNote, Paintbrush,
  Camera, Film, Box, Music, Play, Palette, Terminal, Server, BarChart, Map, FolderTree,
  Globe, Trello, Mail, Settings, User, LogOut
} from 'lucide-react';
import { motion } from 'motion/react';

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
  activeApp: string | null;
  onAppChange: (appId: string) => void;
  onLogout?: () => void;
}

export function WorkspaceSidebar({ activeApp, onAppChange, onLogout }: WorkspaceSidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 md:w-20 flex flex-col items-center py-4 md:py-6 border-r overflow-y-auto backdrop-blur-xl relative"
         style={{
           backgroundColor: 'rgba(19, 19, 26, 0.98)',
           borderColor: 'var(--cyber-border)',
           scrollbarWidth: 'thin',
           scrollbarColor: 'var(--cyber-border) transparent',
           boxShadow: '4px 0 24px rgba(0, 0, 0, 0.5), inset -1px 0 0 rgba(0, 255, 136, 0.1)',
         }}>
      
      {/* Animated Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'linear-gradient(180deg, var(--cyber-green), var(--cyber-amber), var(--cyber-green))',
          backgroundSize: '100% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
          boxShadow: '0 0 10px var(--cyber-green)',
        }}
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Logo/Brand */}
      <motion.div 
        className="mb-8 w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer relative"
        style={{
          background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber))',
          boxShadow: '0 0 30px var(--cyber-green-glow)',
        }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 255, 136, 0.3)',
            '0 0 40px rgba(0, 255, 136, 0.5)',
            '0 0 20px rgba(0, 255, 136, 0.3)',
          ],
        }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <motion.div 
          className="w-7 h-7 rounded-lg" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Corner Accents */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2"
            style={{
              top: i < 2 ? '0' : 'auto',
              bottom: i >= 2 ? '0' : 'auto',
              left: i % 2 === 0 ? '0' : 'auto',
              right: i % 2 === 1 ? '0' : 'auto',
              border: `1px solid var(--cyber-green)`,
              borderRight: i % 2 === 0 ? 'none' : undefined,
              borderLeft: i % 2 === 1 ? 'none' : undefined,
              borderBottom: i < 2 ? 'none' : undefined,
              borderTop: i >= 2 ? 'none' : undefined,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {menuItems.map((item, index) => {
          const isActive = activeApp === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onAppChange(item.id)}
              className="group relative w-full h-12 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: isActive ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
                border: isActive ? '1px solid var(--cyber-green)' : '1px solid transparent',
                boxShadow: isActive ? '0 0 20px rgba(0, 255, 136, 0.2)' : 'none',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: isActive ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon 
                className="w-5 h-5 transition-all" 
                style={{ 
                  color: isActive ? 'var(--cyber-green)' : 'rgba(255, 255, 255, 0.5)',
                  filter: isActive ? 'drop-shadow(0 0 8px var(--cyber-green-glow))' : 'none',
                }}
              />
              
              {/* Active Indicator Line */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{
                    backgroundColor: 'var(--cyber-green)',
                    boxShadow: '0 0 10px var(--cyber-green)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 backdrop-blur-xl"
                   style={{
                     backgroundColor: 'rgba(26, 26, 36, 0.95)',
                     border: '1px solid var(--cyber-green)',
                     color: 'var(--cyber-green)',
                     fontSize: '0.875rem',
                     boxShadow: '0 4px 20px rgba(0, 255, 136, 0.2)',
                   }}>
                {item.label}
                <div className="absolute top-1/2 right-full -translate-y-1/2 w-2 h-2 rotate-45"
                     style={{
                       backgroundColor: 'rgba(26, 26, 36, 0.95)',
                       borderLeft: '1px solid var(--cyber-green)',
                       borderBottom: '1px solid var(--cyber-green)',
                     }} />
              </div>
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Button */}
      {onLogout && (
        <motion.button
          onClick={onLogout}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all"
          style={{
            backgroundColor: 'rgba(255, 23, 68, 0.1)',
            border: '1px solid transparent',
          }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'rgba(255, 23, 68, 0.2)',
            borderColor: 'var(--cyber-red)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5" style={{ color: 'var(--cyber-red)' }} />
        </motion.button>
      )}

      {/* User Profile */}
      <motion.div 
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border"
        style={{
          backgroundColor: 'var(--cyber-dark-surface)',
          borderColor: 'var(--cyber-border)',
        }}
        whileHover={{ 
          scale: 1.1,
          borderColor: 'var(--cyber-green)',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-6 h-6" style={{ color: 'var(--cyber-green)' }} />
      </motion.div>
    </div>
  );
}