/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { useAuth } from './lib/AuthContext';
import { useTheme } from './lib/ThemeContext';
import { signInWithGoogle } from './lib/firebase';
import { Navbar } from './components/Navigation/Navbar';
import { Home } from './pages/Home';
import { Studio } from './pages/Studio';
import { Curriculum } from './pages/Curriculum';

export default function App() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20"
        >
          <Cpu size={24} />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-purple-600/5 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl text-center relative z-10"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-600/50">
            <Cpu size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">FlutterGuardian</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            Learn Flutter with a personal AI mentor. Start building your next big app today.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-200 transition-all hover:shadow-lg active:scale-95 group"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>
          </div>

          <p className="mt-10 text-[10px] uppercase font-black tracking-[0.2em] text-slate-300 dark:text-slate-600">
            Securely encrypted
          </p>
        </motion.div>
        
        <div className="mt-8 flex gap-6 text-slate-400 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">
          <span>Lessons</span>
          <span>•</span>
          <span>AI Feedback</span>
          <span>•</span>
          <span>Preview</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/curriculum" element={<Curriculum />} />
          {/* Workshop and Community can be added later or redirect to home for now */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Analytics />
    </Router>
  );
}
