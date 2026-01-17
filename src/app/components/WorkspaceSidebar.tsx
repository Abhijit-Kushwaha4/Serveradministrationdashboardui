
import {
  MessageSquare, Mic, Image, Video, Code, FileText, Table, Presentation, StickyNote, Paintbrush,
  Camera, Film, Box, Music, Play, Palette, Terminal, Server, BarChart, Map, FolderTree,
  Globe, Trello, Mail, Settings, User, LogOut, ScanLine
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarFooter } from './ui/sidebar';
import { useIsMobile } from './ui/use-mobile';
import React from 'react';

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  section: string;
}

const menuItems: MenuItem[] = [
  { id: 'chat', icon: MessageSquare, label: 'Chat', section: 'AI' },
  { id: 'voice', icon: Mic, label: 'Voice', section: 'AI' },
  { id: 'imagegen', icon: Image, label: 'Image Gen', section: 'AI' },
  { id: 'videogen', icon: Video, label: 'Video Gen', section: 'AI' },
  { id: 'codegen', icon: Code, label: 'Code Gen', section: 'AI' },
  { id: 'ocr', icon: ScanLine, label: 'OCR', section: 'AI' },
  { id: 'word', icon: FileText, label: 'Word', section: 'Office' },
  { id: 'excel', icon: Table, label: 'Excel', section: 'Office' },
  { id: 'ppt', icon: Presentation, label: 'PPT', section: 'Office' },
  { id: 'keep', icon: StickyNote, label: 'Keep', section: 'Office' },
  { id: 'whiteboard', icon: Paintbrush, label: 'Whiteboard', section: 'Office' },
  { id: 'photo', icon: Camera, label: 'Photo Studio', section: 'Creative' },
  { id: 'video', icon: Film, label: 'Video Studio', section: 'Creative' },
  { id: '3d', icon: Box, label: '3D Studio', section: 'Creative' },
  { id: 'sound', icon: Music, label: 'Sound Studio', section: 'Creative' },
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

const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.section]) {
    acc[item.section] = [];
  }
  acc[item.section].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);

interface WorkspaceSidebarProps {
  activeApp: string | null;
  onAppChange: (appId: string) => void;
  onLogout?: () => void;
}

export function WorkspaceSidebar({ activeApp, onAppChange, onLogout }: WorkspaceSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <Sidebar isMobile={isMobile}>
      <SidebarContent
        className="w-72"
        style={{
          backgroundColor: 'var(--cyber-dark-surface)',
          borderColor: 'var(--cyber-border)',
        }}
      >
        <SidebarHeader className="flex items-center justify-start">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber))',
              boxShadow: '0 0 30px var(--cyber-green-glow)',
            }}
          >
            <div className="w-7 h-7 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
          </div>
          <span className="ml-4 text-xl font-bold">Workspace</span>
        </SidebarHeader>

        <SidebarMenu>
          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section} className="mb-2">
              <h4 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{section}</h4>
              {items.map(item => (
                <SidebarMenuItem key={item.id} active={activeApp === item.id} onClick={() => onAppChange(item.id)}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </SidebarMenuItem>
              ))}
            </div>
          ))}
        </SidebarMenu>

        <SidebarFooter className="flex-col items-start p-4">
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full h-12 rounded-lg flex items-center justify-start px-4 mb-4 transition-colors text-cyber-red bg-opacity-10 bg-red-500 hover:bg-opacity-20"
            >
              <LogOut className="w-5 h-5 mr-4" />
              <span>Logout</span>
            </button>
          )}
          <div
            className="w-full flex items-center p-2 rounded-lg cursor-pointer border border-cyber-border"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-cyber-green">
              <User className="w-6 h-6 text-cyber-green" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Admin</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
