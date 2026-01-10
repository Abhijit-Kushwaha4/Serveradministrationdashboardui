
import { useState } from 'react';
import { useAIChat, Message } from './apps'; // Importing from the new index file
import { Send } from 'lucide-react';

const MessageBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {msg.text}
      </div>
    </div>
  );
};

export function CustomerSupportChat() {
  const { messages, isLoading, handleSend } = useAIChat();
  const [input, setInput] = useState('');

  const onSend = () => {
    handleSend(input, 'customer_support'); // Example of sending context
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Customer Support</h2>
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {isLoading && <p>Thinking...</p>}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type your question..."
          className="flex-1 px-4 py-2 border rounded-lg"
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
