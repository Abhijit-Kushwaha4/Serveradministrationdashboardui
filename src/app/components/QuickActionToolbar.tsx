
import React from 'react';

interface QuickActionToolbarProps {
  x: number;
  y: number;
  onSummarize: () => void;
  onTranslate: () => void;
  onExplain: () => void;
  onRewrite: () => void;
}

export const QuickActionToolbar: React.FC<QuickActionToolbarProps> = ({ x, y, onSummarize, onTranslate, onExplain, onRewrite }) => {
  return (
    <div 
      className="fixed bg-cyber-dark-surface border border-cyber-border rounded-lg p-2 flex gap-2"
      style={{ top: y, left: x }}
    >
      <button onClick={onSummarize} className="p-2 hover:bg-cyber-surface">Summarize</button>
      <button onClick={onTranslate} className="p-2 hover:bg-cyber-surface">Translate</button>
      <button onClick={onExplain} className="p-2 hover:bg-cyber-surface">Explain</button>
      <button onClick={onRewrite} className="p-2 hover:bg-cyber-surface">Rewrite</button>
    </div>
  );
};
