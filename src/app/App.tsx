import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkspaceSidebar } from './components/WorkspaceSidebar';
import { AuthScreen } from './components/AuthScreen';
import { GridBackground } from './components/GridBackground';
import { TabBar, Tab } from './components/TabBar';
import { TopBar } from './components/TopBar';
import { LoadingScreen } from './components/LoadingScreen';

// Import all apps
import { AIChat } from './components/apps/AIChat';
import { VoiceRecorder } from './components/apps/VoiceRecorder';
import { ImageGenerator } from './components/apps/ImageGenerator';
import { VideoGenerator } from './components/apps/VideoGenerator';
import { CodeGenerator } from './components/apps/CodeGenerator';
import { WordEditor } from './components/apps/WordEditor';
import { ExcelGrid } from './components/apps/ExcelGrid';
import { PPTEditor } from './components/apps/PPTEditor';
import { KeepNotes } from './components/apps/KeepNotes';
import { Whiteboard } from './components/apps/Whiteboard';
import { PhotoStudio } from './components/apps/PhotoStudio';
import { VideoStudio } from './components/apps/VideoStudio';
import { Studio3D } from './components/apps/Studio3D';
import { SoundStudio } from './components/apps/SoundStudio';
import { CodeRunner } from './components/apps/CodeRunner';
import { UIDesigner } from './components/apps/UIDesigner';
import { TerminalApp } from './components/apps/TerminalApp';
import { DataCenter } from './components/apps/DataCenter';
import { AnalysisApp } from './components/apps/AnalysisApp';
import { MapApp } from './components/apps/MapApp';
import { FilesApp } from './components/apps/FilesApp';
import { BrowserApp } from './components/apps/BrowserApp';
import { CollaborateApp } from './components/apps/CollaborateApp';
import { MailCallApp } from './components/apps/MailCallApp';
import { SettingsApp } from './components/apps/SettingsApp';

// App name mappings
const appNames: Record<string, string> = {
  chat: 'AI Chat',
  voice: 'Voice Recorder',
  imagegen: 'Image Generator',
  videogen: 'Video Generator',
  codegen: 'Code Generator',
  word: 'Word Editor',
  excel: 'Excel Grid',
  ppt: 'PPT Editor',
  keep: 'Keep Notes',
  whiteboard: 'Whiteboard',
  photo: 'Photo Studio',
  video: 'Video Studio',
  '3d': '3D Studio',
  sound: 'Sound Studio',
  coderunner: 'Code Runner',
  designer: 'UI Designer',
  terminal: 'Terminal',
  datacenter: 'Data Center',
  analysis: 'Analysis',
  map: 'Map',
  files: 'Files',
  browser: 'Browser',
  collaborate: 'Collaborate',
  mail: 'Mail/Call',
  settings: 'Settings',
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setOpenTabs([]);
    setActiveTab(null);
  };

  const handleAppChange = (appId: string) => {
    // Check if tab already exists
    const existingTab = openTabs.find(tab => tab.id === appId);
    
    if (existingTab) {
      // Tab exists, just switch to it
      setActiveTab(appId);
    } else {
      // Create new tab
      const newTab: Tab = {
        id: appId,
        name: appNames[appId] || appId,
      };
      setOpenTabs([...openTabs, newTab]);
      setActiveTab(appId);
    }
  };

  const handleTabClose = (tabId: string) => {
    const updatedTabs = openTabs.filter(tab => tab.id !== tabId);
    setOpenTabs(updatedTabs);
    
    // If closing active tab, switch to another tab or null
    if (activeTab === tabId) {
      if (updatedTabs.length > 0) {
        setActiveTab(updatedTabs[updatedTabs.length - 1].id);
      } else {
        setActiveTab(null);
      }
    }
  };

  const handleToolClick = (toolId: string) => {
    // Handle developer tool clicks
    if (toolId === 'browser') {
      handleAppChange('browser');
    } else if (toolId === 'settings') {
      handleAppChange('settings');
    } else if (toolId === 'inspect') {
      // Open code inspect or terminal
      handleAppChange('terminal');
    }
    // VPN, Firewall, Encryption are toggled in the TopBar itself
  };

  const renderApp = (appId: string) => {
    switch (appId) {
      case 'chat': return <AIChat />;
      case 'voice': return <VoiceRecorder />;
      case 'imagegen': return <ImageGenerator />;
      case 'videogen': return <VideoGenerator />;
      case 'codegen': return <CodeGenerator />;
      case 'word': return <WordEditor />;
      case 'excel': return <ExcelGrid />;
      case 'ppt': return <PPTEditor />;
      case 'keep': return <KeepNotes />;
      case 'whiteboard': return <Whiteboard />;
      case 'photo': return <PhotoStudio />;
      case 'video': return <VideoStudio />;
      case '3d': return <Studio3D />;
      case 'sound': return <SoundStudio />;
      case 'coderunner': return <CodeRunner />;
      case 'designer': return <UIDesigner />;
      case 'terminal': return <TerminalApp />;
      case 'datacenter': return <DataCenter />;
      case 'analysis': return <AnalysisApp />;
      case 'map': return <MapApp />;
      case 'files': return <FilesApp />;
      case 'browser': return <BrowserApp />;
      case 'collaborate': return <CollaborateApp />;
      case 'mail': return <MailCallApp />;
      case 'settings': return <SettingsApp />;
      default: return null;
    }
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: 'var(--cyber-obsidian)',
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 176, 32, 0.02) 0%, transparent 50%)
        `,
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Grid Overlay */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="app-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="rgba(0, 255, 136, 0.5)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#app-grid)" />
          </svg>
        </motion.div>

        {/* Scanning Lines */}
        <motion.div
          className="absolute w-full h-0.5 left-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
            boxShadow: '0 0 20px var(--cyber-green)',
            filter: 'blur(1px)',
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute h-full w-0.5 top-0"
          style={{
            background: 'linear-gradient(180deg, transparent, var(--cyber-amber), transparent)',
            boxShadow: '0 0 20px var(--cyber-amber)',
            filter: 'blur(1px)',
          }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}
        />

        {/* Floating Ambient Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: i % 3 === 0 ? 'var(--cyber-green)' : i % 3 === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)',
              boxShadow: `0 0 ${Math.random() * 15 + 10}px ${i % 3 === 0 ? 'var(--cyber-green)' : i % 3 === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)'}`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Energy Orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(0, 255, 136, 0.08)' : 
                i % 3 === 1 ? 'rgba(255, 176, 32, 0.06)' : 
                'rgba(0, 212, 255, 0.07)'
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <WorkspaceSidebar 
        activeApp={activeTab} 
        onAppChange={handleAppChange}
        onLogout={handleLogout}
      />

      {/* Main Content Window */}
      <main className="ml-16 md:ml-20 h-screen flex flex-col">
        <TopBar onToolClick={handleToolClick} />
        <motion.div 
          className="flex-1 rounded-tl-2xl border-l border-t overflow-hidden flex flex-col"
          style={{
            backgroundColor: 'var(--cyber-dark-surface)',
            borderColor: 'var(--cyber-border)',
            boxShadow: 'inset 0 1px 0 rgba(0, 255, 136, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tab Bar */}
          <TabBar 
            tabs={openTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onTabClose={handleTabClose}
          />

          {/* App Content Area */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab ? (
                <motion.div
                  key={activeTab}
                  className="h-full w-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderApp(activeTab)}
                </motion.div>
              ) : (
                <motion.div
                  key="grid-background"
                  className="h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GridBackground />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}