import { useState } from 'react';
import { WorkspaceSidebar } from './components/WorkspaceSidebar';

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

export default function App() {
  const [activeApp, setActiveApp] = useState('chat');

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--cyber-obsidian)',
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 176, 32, 0.02) 0%, transparent 50%)
        `,
      }}
    >
      {/* Sidebar */}
      <WorkspaceSidebar activeApp={activeApp} onAppChange={setActiveApp} />

      {/* Main Content Window */}
      <main className="ml-20 h-screen">
        <div className="h-full rounded-tl-2xl border-l border-t overflow-hidden"
             style={{
               backgroundColor: 'var(--cyber-dark-surface)',
               borderColor: 'var(--cyber-border)',
             }}>
          
          {/* Window Manager - Switch between apps */}
          {activeApp === 'chat' && <AIChat />}
          {activeApp === 'voice' && <VoiceRecorder />}
          {activeApp === 'imagegen' && <ImageGenerator />}
          {activeApp === 'videogen' && <VideoGenerator />}
          {activeApp === 'codegen' && <CodeGenerator />}
          
          {activeApp === 'word' && <WordEditor />}
          {activeApp === 'excel' && <ExcelGrid />}
          {activeApp === 'ppt' && <PPTEditor />}
          {activeApp === 'keep' && <KeepNotes />}
          {activeApp === 'whiteboard' && <Whiteboard />}
          
          {activeApp === 'photo' && <PhotoStudio />}
          {activeApp === 'video' && <VideoStudio />}
          {activeApp === '3d' && <Studio3D />}
          {activeApp === 'sound' && <SoundStudio />}
          
          {activeApp === 'coderunner' && <CodeRunner />}
          {activeApp === 'designer' && <UIDesigner />}
          {activeApp === 'terminal' && <TerminalApp />}
          {activeApp === 'datacenter' && <DataCenter />}
          {activeApp === 'analysis' && <AnalysisApp />}
          {activeApp === 'map' && <MapApp />}
          {activeApp === 'files' && <FilesApp />}
          {activeApp === 'browser' && <BrowserApp />}
          {activeApp === 'collaborate' && <CollaborateApp />}
          {activeApp === 'mail' && <MailCallApp />}
          {activeApp === 'settings' && <SettingsApp />}
        </div>
      </main>
    </div>
  );
}
