
import { useState } from 'react';
import { Play, Loader, BrainCircuit, Code } from 'lucide-react';
import { MonacoEditor } from './MonacoEditor';
import { run_terminal_command } from '../../../default_api';

export function CodeRunner() {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    if (language === 'javascript') {
      const logs: string[] = [];
      const originalConsoleLog = console.log;

      console.log = (...args: any[]) => {
        logs.push(args.map(arg => {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }).join(' '));
      };

      try {
        const func = new Function(code);
        let result = func();

        if (result && typeof result.then === 'function') {
          result = await result;
        }

        console.log = originalConsoleLog;

        let outputText = logs.join('\n');

        if (result !== undefined) {
          let resultString;
          try {
            resultString = JSON.stringify(result, null, 2);
          } catch (e) {
            resultString = String(result);
          }
          if (outputText) {
            outputText += '\n';
          }
          outputText += `Return value: ${resultString}`;
        }

        if (!outputText) {
          outputText = 'Code executed with no output.';
        }
        setOutput(outputText);
      } catch (error: any) {
        console.log = originalConsoleLog;
        setOutput(`Error: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    } else if (language === 'python') {
      try {
        const { result } = await run_terminal_command(`python3 -c "${code.replace(/"/g, '\\"')}"`);
        setOutput(result);
      } catch (err: any) {
        setOutput(`Error: ${err.message || 'Unknown error'}`);
      } finally {
        setIsRunning(false);
      }
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (lang === 'python') {
      setCode('print("Hello from Python!")');
    } else {
      setCode('console.log("Hello, World!");');
    }
    setOutput('');
  };

  return (
    <div className="h-full flex flex-col p-6 bg-cyber-obsidian text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-200">Code Runner</h3>
          <div className="flex items-center rounded-lg bg-cyber-dark-surface p-1">
            <button onClick={() => handleLanguageChange('javascript')} className={`px-3 py-1 text-sm rounded-md flex items-center gap-2 transition-colors ${language === 'javascript' ? 'bg-cyber-primary text-white' : 'text-gray-400 hover:bg-cyber-surface'}`}>
              <Code size={16} /> JavaScript
            </button>
            <button onClick={() => handleLanguageChange('python')} className={`px-3 py-1 text-sm rounded-md flex items-center gap-2 transition-colors ${language === 'python' ? 'bg-cyber-primary text-white' : 'text-gray-400 hover:bg-cyber-surface'}`}>
              <BrainCircuit size={16} /> Python
            </button>
          </div>
        </div>
        <button onClick={runCode} disabled={isRunning} className="px-4 py-2 rounded-lg border border-cyber-green bg-cyber-green text-cyber-obsidian flex items-center gap-2 font-mono text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isRunning ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>

      <div className="flex-1 grid grid-rows-2 gap-4">
        <div className="bg-cyber-dark-surface rounded-lg overflow-hidden border border-cyber-border">
          <MonacoEditor value={code} onChange={setCode} language={language} />
        </div>
        <div className="bg-cyber-dark-surface rounded-lg p-4 border border-cyber-border overflow-auto font-mono text-sm">
          <div className="text-xs text-gray-500 mb-2">Output:</div>
          <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
        </div>
      </div>
    </div>
  );
}
