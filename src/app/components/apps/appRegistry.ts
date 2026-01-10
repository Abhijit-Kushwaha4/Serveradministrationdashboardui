
import { lazy } from 'react';
import { AppInterface } from './AppInterface';

export const appRegistry: AppInterface[] = [
  {
    id: 'AIChat',
    name: 'AI Chat',
    component: lazy(() => import('./AIChat')),
  },
  {
    id: 'AnalysisApp',
    name: 'Analysis',
    component: lazy(() => import('./AnalysisApp')),
  },
  {
    id: 'BrowserApp',
    name: 'Browser',
    component: lazy(() => import('./BrowserApp')),
  },
  {
    id: 'CodeGenerator',
    name: 'Code Generator',
    component: lazy(() => import('./CodeGenerator')),
  },
  {
    id: 'CodeRunner',
    name: 'Code Runner',
    component: lazy(() => import('./CodeRunner')),
  },
  {
    id: 'CollaborateApp',
    name: 'Collaborate',
    component: lazy(() => import('./CollaborateApp')),
  },
  {
    id: 'DataCenter',
    name: 'Data Center',
    component: lazy(() => import('./DataCenter')),
  },
  {
    id: 'ExcelGrid',
    name: 'Excel Grid',
    component: lazy(() => import('./ExcelGrid')),
  },
  {
    id: 'FilesApp',
    name: 'Files',
    component: lazy(() => import('./FilesApp')),
  },
  {
    id: 'ImageGenerator',
    name: 'Image Generator',
    component: lazy(() => import('./ImageGenerator')),
  },
  {
    id: 'KeepNotes',
    name: 'Keep Notes',
    component: lazy(() => import('./KeepNotes')),
  },
  {
    id: 'MailCallApp',
    name: 'Mail & Call',
    component: lazy(() => import('./MailCallApp')),
  },
  {
    id: 'MapApp',
    name: 'Map',
    component: lazy(() => import('./MapApp')),
  },
  {
    id: 'MonacoEditor',
    name: 'Monaco Editor',
    component: lazy(() => import('./MonacoEditor')),
  },
  {
    id: 'OcrApp',
    name: 'OCR',
    component: lazy(() => import('./OcrApp')),
  },
  {
    id: 'PPTEditor',
    name: 'PPT Editor',
    component: lazy(() => import('./PPTEditor')),
  },
  {
    id: 'PhotoStudio',
    name: 'Photo Studio',
    component: lazy(() => import('./PhotoStudio')),
  },
  {
    id: 'SettingsApp',
    name: 'Settings',
    component: lazy(() => import('./SettingsApp')),
  },
  {
    id: 'SoundStudio',
    name: 'Sound Studio',
    component: lazy(() => import('./SoundStudio')),
  },
  {
    id: 'Studio3D',
    name: '3D Studio',
    component: lazy(() => import('./Studio3D')),
  },
  {
    id: 'TerminalApp',
    name: 'Terminal',
    component: lazy(() => import('./TerminalApp')),
  },
  {
    id: 'UIDesigner',
    name: 'UI Designer',
    component: lazy(() => import('./UIDesigner')),
  },
  {
    id: 'VideoGenerator',
    name: 'Video Generator',
    component: lazy(() => import('./VideoGenerator')),
  },
  {
    id: 'VideoStudio',
    name: 'Video Studio',
    component: lazy(() => import('./VideoStudio')),
  },
  {
    id: 'VoiceRecorder',
    name: 'Voice Recorder',
    component: lazy(() => import('./VoiceRecorder')),
  },
  {
    id: 'Whiteboard',
    name: 'Whiteboard',
    component: lazy(() => import('./Whiteboard')),
  },
  {
    id: 'WordEditor',
    name: 'Word Editor',
    component: lazy(() => import('./WordEditor')),
  },
];
