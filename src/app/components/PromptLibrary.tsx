
import React, { useState } from 'react';

interface PromptLibraryProps {
  onSelectPrompt: (prompt: string) => void;
}

const defaultPrompts = [
  { id: '1', title: 'Summarize', prompt: 'Summarize the following text:' },
  { id: '2', title: 'Translate to Spanish', prompt: 'Translate the following text to Spanish:' },
  { id: '3', title: 'Explain like I am 5', prompt: 'Explain the following text like I am 5 years old:' },
];

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ onSelectPrompt }) => {
  const [prompts, setPrompts] = useState(defaultPrompts);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Prompt Library</h3>
      <div className="space-y-2">
        {prompts.map(prompt => (
          <div key={prompt.id} onClick={() => onSelectPrompt(prompt.prompt)} className="p-2 bg-cyber-surface rounded-lg cursor-pointer hover:bg-cyber-glass">
            <p className="font-semibold">{prompt.title}</p>
            <p className="text-sm text-gray-400">{prompt.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
