import { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! I am your AI assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Bot replies after 1s
    setTimeout(() => {
      const botMessage: Message = { 
        id: Date.now() + 1, 
        text: `I received: "${input}". This is a simulated response.`, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className="max-w-md px-4 py-3 rounded-lg border font-mono text-sm"
              style={{
                backgroundColor: msg.sender === 'user' ? 'var(--cyber-dark-surface)' : 'var(--cyber-glass)',
                borderColor: msg.sender === 'user' ? 'var(--cyber-green)' : 'var(--cyber-border)',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--cyber-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />
          <button
            onClick={handleSend}
            className="px-6 rounded-lg border transition-all hover:border-opacity-50"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
