import { useState } from 'react';
import { Code2 } from 'lucide-react';

export function CodeGenerator() {
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerate = () => {
    if (!description.trim()) return;
    
    // Simulate code generation
    const code = `// Generated code based on: "${description}"
function ${description.toLowerCase().replace(/\s+/g, '_')}() {
  console.log('This is AI-generated code');
  
  const result = {
    status: 'success',
    data: [],
    timestamp: Date.now()
  };
  
  return result;
}

export default ${description.toLowerCase().replace(/\s+/g, '_')};`;
    
    setGeneratedCode(code);
  };

  return (
    <div className="h-full grid grid-cols-2">
      {/* Left: Input */}
      <div className="p-6 border-r" style={{ borderColor: 'var(--cyber-border)' }}>
        <h3 className="text-lg mb-4 flex items-center gap-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Code2 className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          Describe Code
        </h3>
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you want the code to do..."
          className="w-full h-64 p-4 rounded-lg border outline-none font-mono text-sm resize-none"
          style={{
            backgroundColor: 'var(--cyber-dark-surface)',
            borderColor: 'var(--cyber-border)',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        />
        
        <button
          onClick={handleGenerate}
          className="mt-4 w-full py-3 rounded-lg border transition-all hover:border-opacity-50 font-mono"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}
        >
          Generate Code
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
          {generatedCode || '// Code will appear here...'}
        </pre>
      </div>
    </div>
  );
}
