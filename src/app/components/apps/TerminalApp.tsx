
import { useState, useRef, useEffect } from 'react';
import { run_terminal_command } from '../../../default_api';

interface HistoryItem {
    command: string;
    output: string;
}

export function TerminalApp() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = input.trim();
            if (command) {
                setIsProcessing(true);
                const output = await runCommand(command);
                setHistory(prev => [...prev, { command, output }]);
                setIsProcessing(false);
            }
            setInput('');
        }
    };

    const runCommand = async (command: string): Promise<string> => {
        try {
            const { result } = await run_terminal_command(command);
            return result;
        } catch (error: any) {
            return error.message || 'An unknown error occurred.';
        }
    };

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isProcessing]);

    return (
        <div className="bg-cyber-obsidian text-cyber-white font-mono h-full flex flex-col p-4">
            <div className="flex-grow overflow-y-auto custom-scrollbar">
                {history.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center">
                            <span className="text-cyber-green mr-2">&gt;</span>
                            <span>{item.command}</span>
                        </div>
                        <div className="text-gray-300 whitespace-pre-wrap">{item.output}</div>
                    </div>
                ))}
                {isProcessing && (
                    <div className="flex items-center">
                         <span className="text-cyber-green mr-2">&gt;</span>
                        <div className="animate-pulse">Processing...</div>
                    </div>
                )}
                <div ref={endOfHistoryRef} />
            </div>
            <div className="flex items-center mt-4">
                <span className="text-cyber-green mr-2">&gt;</span>
                <input 
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="bg-transparent border-none focus:ring-0 flex-grow text-cyber-white p-0"
                    placeholder="Enter command..."
                    disabled={isProcessing}
                    autoFocus
                />
            </div>
        </div>
    );
}
