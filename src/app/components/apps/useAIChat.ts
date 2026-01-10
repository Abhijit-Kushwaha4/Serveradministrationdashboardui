
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { connectWebSocket, sendWebSocketMessage } from './WebSocketClient';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isOptimistic?: boolean;
}

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! I am your AI assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const socket = connectWebSocket('wss://bytes.com/ws');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'AI_RESPONSE') {
        const finalBotMessage: Message = {
          id: Date.now() + 1,
          text: data.payload.content,
          sender: 'bot'
        };

        setMessages(prev => 
          prev.map(msg => 
            msg.isOptimistic ? finalBotMessage : msg
          )
        );
        setIsLoading(false);
        toast.success('AI response received.');
      }
    };

    socket.onerror = () => {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry, an error occurred with the connection. Please try again.`,
        sender: 'bot'
      };
      setMessages(prev => prev.map(msg => msg.isOptimistic ? errorMessage : msg));
      setIsLoading(false);
      toast.error('Failed to get AI response.');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSend = useCallback((input: string, contextText?: string) => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    
    const optimisticBotMessage: Message = {
      id: Date.now() + 1,
      text: 'Thinking...',
      sender: 'bot',
      isOptimistic: true,
    };

    setMessages(prev => [...prev, userMessage, optimisticBotMessage]);
    setIsLoading(true);
    
    sendWebSocketMessage({ type: 'SEND_MESSAGE', payload: { content: input, context: contextText } });

  }, [isLoading]);

  return { messages, isLoading, handleSend };
}
