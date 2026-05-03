/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGuardianResponse } from '../../lib/gemini';

interface Message {
  role: 'user' | 'guardian';
  content: string;
}

interface GuardianProps {
  currentCode: string;
  currentTask: string;
}

export const Guardian: React.FC<GuardianProps> = ({ currentCode, currentTask }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'guardian', content: "Hello! I'm your FlutterGuardian. I'm here to help you build your amazing app. What's on your mind today?" }
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
    <div className="flex flex-col h-full bg-white">
      {/* Bento Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🤖</div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide text-xs">Guardian Feedback</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{isLoading ? 'AI is thinking...' : 'Your logic is optimal'}</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100 shadow-sm">
           WIDGET ENGINE: ONLINE
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <div className="text-sm">🤖</div>}
                </div>
                <div className={`p-4 rounded-3xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'}`}>
                   <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-code:bg-blue-50 prose-code:text-blue-700 prose-code:px-1 prose-code:rounded">
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
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm shadow-sm">
               🤖
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm rounded-tl-none">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Cora about your Flutter code..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-blue-600/20"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
