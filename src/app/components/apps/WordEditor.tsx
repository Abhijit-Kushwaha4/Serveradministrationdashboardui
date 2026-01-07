import { useState } from 'react';
import { Bold, Italic, Save } from 'lucide-react';

export function WordEditor() {
  const [content, setContent] = useState('');

  const handleSave = () => {
    alert('Document saved!');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="sticky top-0 flex items-center gap-2 p-4 border-b z-10"
           style={{
             backgroundColor: 'var(--cyber-charcoal)',
             borderColor: 'var(--cyber-border)',
           }}>
        <button className="p-2 rounded border hover:bg-opacity-50 transition-all"
                style={{
                  backgroundColor: 'var(--cyber-dark-surface)',
                  borderColor: 'var(--cyber-border)',
                }}>
          <Bold className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
        </button>
        <button className="p-2 rounded border hover:bg-opacity-50 transition-all"
                style={{
                  backgroundColor: 'var(--cyber-dark-surface)',
                  borderColor: 'var(--cyber-border)',
                }}>
          <Italic className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
        </button>
        <div className="flex-1" />
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded border font-mono text-sm transition-all hover:border-opacity-50"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}>
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your document..."
        className="flex-1 p-8 outline-none resize-none"
        style={{
          backgroundColor: 'var(--cyber-dark-surface)',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '16px',
          lineHeight: '1.6',
        }}
      />
    </div>
  );
}
