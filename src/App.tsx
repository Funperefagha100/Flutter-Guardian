/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Layers, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  ChevronRight,
  Menu,
  Monitor,
  Phone,
  Layout as LayoutIcon,
  Sparkles,
  Sun,
  Moon,
  LogOut,
  Github
} from 'lucide-react';
import { CodeEditor } from './components/Editor/CodeEditor';
import { FlutterSimulator } from './components/Preview/FlutterSimulator';
import { Guardian } from './components/AI/Guardian';
import { LESSONS } from './constants';
import { cn } from './lib/utils';
import { useAuth } from './lib/AuthContext';
import { useTheme } from './lib/ThemeContext';
import { signInWithGoogle, logout } from './lib/firebase';

export default function App() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [code, setCode] = useState(LESSONS[0].initialCode);

  const currentLesson = LESSONS[currentLessonIndex];

  const handleNextLesson = () => {
    const next = currentLessonIndex + 1;
    if (next < LESSONS.length) {
      setCurrentLessonIndex(next);
      setCode(LESSONS[next].initialCode);
    }
  };

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
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans overflow-hidden transition-colors duration-300">
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Cpu size={18} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">FlutterGuardian</h1>
          <div className="hidden sm:flex items-center gap-2 ml-4">
             <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">Studio v1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <button className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">Learning Studio</button>
            <button className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Workshop</button>
            <button className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Community</button>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-100 dark:border-slate-800 pl-6 space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="flex items-center gap-3 ml-2 group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{user.displayName?.split(' ')[0]}</p>
                <button 
                  onClick={logout}
                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1 justify-end"
                >
                  <LogOut size={10} />
                  Quit
                </button>
              </div>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                className="w-10 h-10 rounded-2xl border-2 border-white dark:border-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 group-hover:scale-105 transition-transform" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Bento Grid Area */}
      <main className="p-4 md:p-6 grid grid-cols-12 grid-rows-6 gap-4 flex-grow overflow-hidden max-w-[1800px] mx-auto w-full">
        
        {/* AI Guardian (Large Top Left) */}
        <section className="col-span-12 lg:col-span-8 row-span-3 lg:row-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors duration-300">
          <Guardian currentCode={code} currentTask={currentLesson.challenge} />
        </section>

        {/* Lessons Path (Right Top) */}
        <section className="col-span-12 lg:col-span-4 row-span-1 lg:row-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col overflow-hidden transition-colors duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Learning Path</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest font-semibold">Flutter Foundations</p>
            </div>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase py-1 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              {currentLessonIndex + 1} / {LESSONS.length}
            </span>
          </div>
          
          <div className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {LESSONS.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLessonIndex(idx);
                  setCode(lesson.initialCode);
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-left",
                  idx === currentLessonIndex 
                    ? "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 ring-2 ring-blue-500/10" 
                    : idx < currentLessonIndex 
                      ? "bg-white dark:bg-slate-850 border-slate-100 dark:border-slate-800 opacity-60"
                      : "bg-white dark:bg-slate-850 border-slate-50 dark:border-slate-800/50 opacity-40 hover:opacity-100"
                )}
              >
                 <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                    idx <= currentLessonIndex ? "bg-blue-600 text-white" : "border-2 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700"
                  )}>
                    {idx < currentLessonIndex ? <CheckCircle2 size={14} /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-bold truncate", idx === currentLessonIndex ? "text-blue-900 dark:text-blue-100" : "text-slate-700 dark:text-slate-300")}>{lesson.title}</p>
                    {idx === currentLessonIndex && <div className="h-1 w-8 bg-blue-500 rounded-full mt-1" />}
                  </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]" 
                style={{ width: `${((currentLessonIndex + 1) / LESSONS.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Mastery: {Math.round(((currentLessonIndex + 1) / LESSONS.length) * 100)}%</p>
              {currentLessonIndex < LESSONS.length - 1 && (
                 <button 
                  onClick={handleNextLesson}
                  className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1 hover:gap-2 transition-all group"
                >
                  Continue <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Code Editor (Bottom Left) */}
        <section className="col-span-12 lg:col-span-6 row-span-2 lg:row-span-4 bg-[#1E1E1E] rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-slate-800 dark:border-slate-900 group relative">
           <CodeEditor code={code} onChange={setCode} />
           <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white hover:bg-blue-700 transition-colors shadow-lg">
                <Play size={10} fill="currentColor" />
                Hot Reload
              </button>
           </div>
        </section>

        {/* Preview Pane (Center Right) */}
        <section className="col-span-12 lg:col-span-4 row-span-2 lg:row-span-3 bg-slate-200 dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-800 overflow-hidden relative group transition-colors duration-300">
           <FlutterSimulator code={code} />
           <div className="absolute bottom-4 left-4 right-4 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-300 dark:border-slate-700 rounded-xl flex items-center px-4 justify-between transition-transform duration-300 transform group-hover:translate-y-[-4px]">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">SDK 3.22 • Metal Graphics</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
            </div>
          </div>
        </section>

        {/* Learning Tips (Bottom Right) - Combined or Grid Layout */}
        <section className="col-span-12 lg:col-span-2 row-span-1 lg:row-span-1 bg-indigo-600 dark:bg-indigo-700 rounded-3xl p-5 flex flex-col justify-center text-white shadow-xl shadow-indigo-500/20 group hover:scale-[1.02] transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-yellow-300 group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Mentor Tip</span>
          </div>
          <p className="text-xs font-semibold leading-relaxed">
            Stateless widgets are immutable builders. Use <span className="font-mono bg-white/20 px-1 rounded">const</span> to optimize!
          </p>
        </section>

      </main>
    </div>
  );
}
