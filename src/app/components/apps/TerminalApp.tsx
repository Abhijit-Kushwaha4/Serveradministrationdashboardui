import { useState } from 'react';

export function TerminalApp() {
  const [history, setHistory] = useState<string[]>(['Welcome to H&K Terminal. Type "help" for commands.']);
  const [input, setInput] = useState('');

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmed) {
      case 'help':
        output = 'Available commands: help, clear, date, echo [text]';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case '':
        return;
      default:
        if (trimmed.startsWith('echo ')) {
          output = trimmed.substring(5);
        } else {
          output = `Command not found: ${trimmed}`;
        }
    }

    setHistory([...history, `$ ${cmd}`, output]);
    setInput('');
  };

  return (
    <div className="h-full p-6 overflow-auto font-mono text-sm"
         style={{
           backgroundColor: '#000000',
           color: '#00ff00',
         }}>
      {history.map((line, i) => (
        <div key={i} className="mb-1">{line}</div>
      ))}
      
      <div className="flex items-center gap-2">
        <span>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              executeCommand(input);
            }
          }}
          className="flex-1 bg-transparent outline-none"
          style={{ color: '#00ff00' }}
          autoFocus
        />
      </div>
    </div>
  );
}
