import { useState } from 'react';
import { Play } from 'lucide-react';

export function CodeRunner() {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      // Simulate code execution
      const result = eval(code);
      setOutput(String(result || 'Code executed successfully'));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('Error: Unknown error occurred');
      }
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Code Editor</h3>
        <button
          onClick={runCode}
          className="px-4 py-2 rounded-lg border flex items-center gap-2 font-mono text-sm"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}>
          <Play className="w-4 h-4" />
          Run
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 flex">
          <div className="w-12 py-3 pr-3 text-right font-mono text-xs"
               style={{ color: 'rgba(255, 255, 255, 0.3)', backgroundColor: 'var(--cyber-obsidian)' }}>
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-3 outline-none font-mono text-sm resize-none"
            style={{
              backgroundColor: 'var(--cyber-obsidian)',
              color: 'var(--cyber-green)',
              fontFamily: 'monospace',
            }}
          />
        </div>

        <div className="h-32 p-3 rounded-lg border overflow-auto font-mono text-sm"
             style={{
               backgroundColor: 'var(--cyber-obsidian)',
               borderColor: 'var(--cyber-border)',
               color: 'rgba(255, 255, 255, 0.7)',
             }}>
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Output:</div>
          {output}
        </div>
      </div>
    </div>
  );
}
