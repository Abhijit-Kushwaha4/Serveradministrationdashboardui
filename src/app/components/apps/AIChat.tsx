
import { useState } from 'react';
import { Send } from 'lucide-react';
import { useAIChat, Message } from './useAIChat'; // Import the new hook
import { Skeleton } from '@/app/components/ui/skeleton'; // For loading states

// --- ARCHITECT'S NOTES ---
//
// FILE: `src/app/components/apps/AIChat.tsx`
//
// OVERVIEW:
// This component has been refactored to be a purely presentational (or "dumb") component.
// All business logic, state management, and API interactions have been abstracted into the
// `useAIChat` custom hook. This is a best practice for building scalable and maintainable
// React applications.
//
// KEY IMPROVEMENTS:
// 1.  **Separation of Concerns:** This component's only responsibility is to render the UI
//     based on the props it receives from the `useAIChat` hook. It is no longer concerned
//     with *how* the data is fetched or managed.
//
// 2.  **Enhanced UX with Loading Skeletons:** When a bot message is in its optimistic state
//     (i.e., the AI is thinking), we now render a `Skeleton` component. This provides a
//     much more professional and intuitive loading experience for the user.
//
// 3.  **Code Simplicity:** The component is now dramatically simpler and easier to read.
//     The core JSX is clean and directly reflects the UI, making it easier for developers
//     to understand and modify the layout.
//
// --- END ARCHITECT'S NOTES ---

// A presentational component for a single message.
const MessageBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.sender === 'user';

  // If the message is optimistic (i.e., loading), render a skeleton.
  if (msg.isOptimistic) {
    return (
      <div className="flex justify-start">
        <Skeleton className="w-48 h-12 rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className="max-w-md px-4 py-3 rounded-lg border font-mono text-sm"
        style={{
          backgroundColor: isUser ? 'var(--cyber-dark-surface)' : 'var(--cyber-glass)',
          borderColor: isUser ? 'var(--cyber-green)' : 'var(--cyber-border)',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {msg.text}
      </div>
    </div>
  );
};

// The main chat component, now powered by the useAIChat hook.
export function AIChat() {
  const { messages, isLoading, handleSend } = useAIChat();
  const [input, setInput] = useState('');

  const onSend = () => {
    handleSend(input);
    setInput(''); // Clear input immediately
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--cyber-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-lg border outline-none font-mono text-sm"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
            disabled={isLoading}
          />
          <button
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
          </button>
        </div>
      </div>
    </div>
  );
}
