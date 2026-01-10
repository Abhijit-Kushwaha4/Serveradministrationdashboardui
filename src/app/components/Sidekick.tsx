
import { useState } from 'react';
import { Send, Paperclip, FileText, ChevronRight, Library, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat, Message } from './apps/useAIChat';
import { Skeleton } from './ui/skeleton';
import { PromptLibrary } from './PromptLibrary';
import { useSmoothAnimation } from '../hooks/useSmoothAnimation';

const MessageBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.sender === 'user';
  const animationProps = useSmoothAnimation();

  if (msg.isOptimistic) {
    return (
      <div className="flex justify-start">
        <Skeleton className="w-48 h-12 rounded-lg" />
      </div>
    );
  }

  return (
    <motion.div
      layout
      {...animationProps}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{ willChange: 'transform, opacity' }} // GPU Offloading
    >
      <div
        className="max-w-md px-4 py-3 rounded-lg border font-mono text-sm"
        style={{
          backgroundColor: isUser ? 'var(--cyber-surface)' : 'var(--cyber-glass)',
          borderColor: isUser ? 'var(--cyber-green)' : 'var(--cyber-border)',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  );
};

interface SidekickProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidekick({ isOpen, onToggle }: SidekickProps) {
  const { messages, isLoading, handleSend } = useAIChat();
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const animationProps = useSmoothAnimation();

  const onSend = () => {
    handleSend(input);
    setInput('');
  };

  const handleChatWithPage = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const pageText = mainContent.innerText;
      handleSend(`Summarize the following content:`, pageText);
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setInput(prompt);
    setActiveTab('chat');
  };

  return (
    <motion.div
      layout
      className="h-full flex flex-col bg-cyber-dark-surface border-l border-cyber-border"
      style={{ willChange: 'transform' }} // GPU Offloading for the whole panel
    >
      <div className="p-4 border-b border-cyber-border flex justify-between items-center">
        <h2 className="text-lg font-bold text-cyber-white">Sider.ai</h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onToggle} className="p-2">
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
        </motion.button>
      </div>

      <div className="flex border-b border-cyber-border">
        <button onClick={() => setActiveTab('chat')} className={`flex-1 p-2 text-sm flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'bg-cyber-surface' : ''}`}><MessageSquare className="w-4 h-4" />Chat</button>
        <button onClick={() => setActiveTab('library')} className={`flex-1 p-2 text-sm flex items-center justify-center gap-2 ${activeTab === 'library' ? 'bg-cyber-surface' : ''}`}><Library className="w-4 h-4" />Library</button>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'chat' ? (
          <motion.div {...animationProps} key="chat" className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div {...animationProps} key="library">
            <PromptLibrary onSelectPrompt={handleSelectPrompt} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 border-t border-cyber-border">
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleChatWithPage} className="p-2 border rounded-lg"><FileText className="w-5 h-5"/></motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 border rounded-lg"><Paperclip className="w-5 h-5"/></motion.button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
            disabled={isLoading}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSend}
            className="px-6 rounded-lg border transition-all hover:border-opacity-50 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
