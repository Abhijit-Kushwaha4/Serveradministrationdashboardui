
import { useState, useEffect, useCallback, Suspense } from 'react';
import { WorkspaceSidebar } from './components/WorkspaceSidebar';
import { AuthScreen } from './components/AuthScreen';
import { GridBackground } from './components/GridBackground';
import { TopBar } from './components/TopBar';
import { Sidekick } from './components/Sidekick';
import { QuickActionToolbar } from './components/QuickActionToolbar';
import { useAIChat } from './components/apps/useAIChat';
import { WindowComponent } from './components/WindowComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { appRegistry } from './components/apps/appRegistry';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selection, setSelection] = useState<{ x: number, y: number, text: string } | null>(null);
  const { handleSend } = useAIChat();

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setOpenWindows([]);
    setMinimizedWindows([]);
  };

  const handleAppChange = (appId: string) => {
    const app = appRegistry.find(app => app.id === appId);
    if (app) {
      if (!openWindows.includes(appId)) {
        setOpenWindows([...openWindows, appId]);
      }
      if (minimizedWindows.includes(appId)) {
        setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
      }
    }
  };

  const handleWindowClose = (appId: string) => {
    setOpenWindows(openWindows.filter(id => id !== appId));
  };

  const handleWindowMinimize = (appId: string) => {
    if (!minimizedWindows.includes(appId)) {
      setMinimizedWindows([...minimizedWindows, appId]);
    }
  };

  const handleToolClick = (toolId: string) => {
    if (toolId === 'browser' || toolId === 'settings' || toolId === 'inspect') {
      handleAppChange(toolId === 'inspect' ? 'TerminalApp' : (toolId === 'browser' ? 'BrowserApp' : 'SettingsApp'));
    }
  };

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelection({ x: rect.left, y: rect.bottom + 5, text: selection.toString() });
    } else {
      setSelection(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const renderApp = (appId: string) => {
    const app = appRegistry.find(app => app.id === appId);
    if (app) {
      const AppComponent = app.component;
      return <AppComponent />;
    }
    return null;
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-cyber-obsidian relative overflow-hidden">
      <WorkspaceSidebar
        activeApp={openWindows[openWindows.length - 1]}
        onAppChange={handleAppChange}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col h-screen relative">
        <main className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'mr-96' : 'mr-0'}`}>
          <TopBar onToolClick={handleToolClick} />
          <div className="flex-1 rounded-tl-2xl border-l border-t border-cyber-border bg-cyber-dark-surface shadow-inset-green overflow-hidden flex flex-col">
            <div className="flex-1 relative overflow-hidden">
                <GridBackground />
                <AnimatePresence>
                    {openWindows.map(appId => {
                    const app = appRegistry.find(app => app.id === appId);
                    if (!app) return null;
                    return (
                        <WindowComponent
                        key={appId}
                        title={app.name}
                        isOpen={!minimizedWindows.includes(appId)}
                        onClose={() => handleWindowClose(appId)}
                        onMinimize={() => handleWindowMinimize(appId)}
                        layoutId={`window-${appId}`}
                        >
                        <Suspense fallback={<div>Loading...</div>}>
                            {renderApp(appId)}
                        </Suspense>
                        </WindowComponent>
                    );
                    })}
                </AnimatePresence>
            </div>
            <div className="h-16 bg-cyber-surface border-t border-cyber-border flex items-center px-4 space-x-2">
              {minimizedWindows.map(appId => (
                <motion.button
                  key={appId}
                  layoutId={`window-${appId}`}
                  onClick={() => handleAppChange(appId)}
                  className="h-10 w-10 bg-cyber-glass rounded-lg border border-cyber-border"
                />
              ))}
            </div>
          </div>
        </main>
        {selection && (
          <QuickActionToolbar
            x={selection.x}
            y={selection.y}
            onSummarize={() => handleSend(`Summarize: "${selection.text}"`)}
            onTranslate={() => handleSend(`Translate to Spanish: "${selection.text}"`)}
            onExplain={() => handleSend(`Explain: "${selection.text}"`)}
            onRewrite={() => handleSend(`Rewrite: "${selection.text}"`)}
          />
        )}
        <div
          className={`fixed top-0 right-0 h-full bg-cyber-dark-surface z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ width: '384px' }}
        >
          <Sidekick isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
      </div>
    </div>
  );
}
