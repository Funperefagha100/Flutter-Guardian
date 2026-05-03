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
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Bento Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🤖</div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide text-xs">Guardian Feedback</h2>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">{isLoading ? 'AI is thinking...' : 'System Optimal'}</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-100 dark:border-green-900/30 shadow-sm">
           WIDGET ENGINE: LIVE
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 dark:bg-slate-900/30 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <div className="text-sm">🤖</div>}
                </div>
                <div className={`p-4 rounded-3xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'}`}>
                   <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30 prose-code:text-blue-700 dark:prose-code:text-blue-300 prose-code:px-1 prose-code:rounded">
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
            className="flex justify-start gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm shadow-sm">
               🤖
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-3xl shadow-sm rounded-tl-none px-6">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Cora about your Flutter code..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 transition-all shadow-lg shadow-blue-600/20"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
