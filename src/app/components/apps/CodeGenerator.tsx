
import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { runQwenCoder } from '../../bytezClient-qwen3-coder'; // Using Qwen Coder for code generation

export function CodeGenerator() {
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const prompt = `Generate a code snippet based on the following description: ${description}`;
      const code = await runQwenCoder(prompt);
      
      // Qwen Coder might return the code in a markdown block, let's try to extract it.
      const codeBlockRegex = /```(?:[a-zA-Z]+)?\n([\s\S]*?)```/;
      const match = code.match(codeBlockRegex);
      const extractedCode = match ? match[1] : code;

      setGeneratedCode(extractedCode);

    } catch (e: any) {
      console.error("Code Generation Error:", e);
      setError(e.message || "An unknown error occurred during code generation.");
      setGeneratedCode("// An error occurred. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full grid grid-cols-2">
      {/* Left: Input */}
      <div className="p-6 border-r" style={{ borderColor: 'var(--cyber-border)' }}>
        <h3 className="text-lg mb-4 flex items-center gap-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Code2 className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          Describe What You Want to Code
        </h3>
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., 'A React component that fetches and displays a list of users from an API'"
          className="w-full h-64 p-4 rounded-lg border outline-none font-mono text-sm resize-none"
          style={{
            backgroundColor: 'var(--cyber-dark-surface)',
            borderColor: 'var(--cyber-border)',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        />
        
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 w-full py-3 rounded-lg border transition-all hover:border-opacity-50 font-mono disabled:opacity-50"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>

      {/* Right: Output */}
      <div className="p-6">
        <h3 className="text-lg mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Generated Code
        </h3>
        
        <pre className="w-full h-full p-4 rounded-lg border overflow-auto font-mono text-sm"
             style={{
               backgroundColor: 'var(--cyber-obsidian)',
               borderColor: 'var(--cyber-border)',
               color: 'var(--cyber-green)',
             }}>
          {error ? <span className="text-red-500">{error}</span> : (generatedCode || '// Code will appear here...')}
        </pre>
      </div>
    </div>
  );
}
