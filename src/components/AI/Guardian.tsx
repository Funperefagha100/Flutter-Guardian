/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGuardianResponse } from '../../lib/gemini';

import { useAuth } from '../../lib/AuthContext';

interface Message {
  role: 'user' | 'guardian';
  content: string;
}

interface GuardianProps {
  currentCode: string;
  currentTask: string;
}

export const Guardian: React.FC<GuardianProps> = ({ currentCode, currentTask }) => {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(' ')[0] || 'there';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'guardian', content: `Hello ${firstName}! I'm your FlutterGuardian. I'm here to help you build your amazing app. What's on your mind today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await getGuardianResponse(userMessage, currentCode, currentTask);
    
    setMessages(prev => [...prev, { role: 'guardian', content: response || "Something went wrong." }]);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] transition-colors duration-300 min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2.5 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden ${msg.role === 'user' ? 'bg-[#007acc] text-white' : 'bg-slate-100 dark:bg-[#252526] border border-slate-200 dark:border-[#333] text-slate-400 dark:text-gray-400'}`}>
                  {msg.role === 'user' ? <User size={12} /> : <div className="text-xs">🤖</div>}
                </div>
                <div className={`px-3 py-2 rounded-lg text-[12px] shadow-sm ${msg.role === 'user' ? 'bg-[#007acc] text-white' : 'bg-slate-50 dark:bg-[#252526] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-[#333]'}`}>
                   <div className={`prose prose-xs ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'} max-w-none prose-p:leading-normal prose-code:bg-blue-900/30 prose-code:text-blue-300 prose-code:px-1 prose-code:rounded`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start gap-2.5"
          >
            <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-[#252526] border border-slate-200 dark:border-[#333] flex items-center justify-center text-xs shadow-sm">
               🤖
            </div>
            <div className="bg-slate-50 dark:bg-[#252526] border border-slate-200 dark:border-[#333] p-2 rounded-lg shadow-sm px-4">
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 bg-white dark:bg-[#1e1e1e] border-t border-slate-200 dark:border-[#333] shrink-0">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the Guardian..."
            className="w-full pl-3 pr-10 py-1.5 bg-slate-50 dark:bg-[#252526] border border-slate-200 dark:border-[#333] rounded text-[12px] focus:outline-none focus:ring-1 focus:ring-[#007acc] transition-all text-slate-800 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-slate-400 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white disabled:opacity-30 transition-all font-bold"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
