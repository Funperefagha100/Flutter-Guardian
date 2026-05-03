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
  Sparkles
} from 'lucide-react';
import { CodeEditor } from './components/Editor/CodeEditor';
import { FlutterSimulator } from './components/Preview/FlutterSimulator';
import { Guardian } from './components/AI/Guardian';
import { LESSONS } from './constants';
import { cn } from './lib/utils';

export default function App() {
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

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Cpu size={18} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">FlutterGuardian</h1>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">Learning mode</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1">Learning Studio</button>
            <button className="hover:text-slate-800 transition-colors">Curriculum</button>
            <button className="hover:text-slate-800 transition-colors">Showcase</button>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-slate-500">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </nav>

      {/* Main Bento Grid Area */}
      <main className="p-6 grid grid-cols-12 grid-rows-6 gap-4 flex-grow overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* AI Guardian (Large Top Left) */}
        <section className="col-span-8 row-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <Guardian currentCode={code} currentTask={currentLesson.challenge} />
        </section>

        {/* Lessons Path (Right Top) */}
        <section className="col-span-4 row-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Current Path</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Mastering Flutter Basics</p>
            </div>
            <span className="text-[10px] text-blue-600 font-bold uppercase py-1 px-2 bg-blue-50 rounded-full">
              {currentLessonIndex + 1} / {LESSONS.length} Lessons
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
                  "w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left",
                  idx === currentLessonIndex 
                    ? "bg-blue-50 border-blue-100 ring-2 ring-blue-500/10" 
                    : idx < currentLessonIndex 
                      ? "bg-white border-slate-100 opacity-60"
                      : "bg-white border-slate-50 hover:border-slate-200 opacity-40 hover:opacity-100"
                )}
              >
                 <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                    idx <= currentLessonIndex ? "bg-blue-600 text-white" : "border-2 border-slate-200 text-slate-300"
                  )}>
                    {idx < currentLessonIndex ? <CheckCircle2 size={12} /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-bold truncate", idx === currentLessonIndex ? "text-blue-900" : "text-slate-700")}>{lesson.title}</p>
                  </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${((currentLessonIndex + 1) / LESSONS.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery: {Math.round(((currentLessonIndex + 1) / LESSONS.length) * 100)}%</p>
              {currentLessonIndex < LESSONS.length - 1 && (
                 <button 
                  onClick={handleNextLesson}
                  className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Next Task <ChevronRight size={10} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Code Editor (Bottom Left) */}
        <section className="col-span-6 row-span-4 bg-[#1E1E1E] rounded-3xl shadow-xl overflow-hidden flex flex-col border-4 border-slate-800">
           <CodeEditor code={code} onChange={setCode} />
        </section>

        {/* Preview Pane (Center Right) */}
        <section className="col-span-4 row-span-3 bg-slate-200 rounded-3xl border border-slate-300 overflow-hidden relative group">
           <FlutterSimulator code={code} />
           <div className="absolute bottom-4 left-4 right-4 h-10 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl flex items-center px-4 justify-between transition-transform duration-300 transform group-hover:translate-y-[-4px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Rendering Engine: Flutter Skia</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-slate-300 rounded-full" />
            </div>
          </div>
        </section>

        {/* Learning Tips (Bottom Right) */}
        <section className="col-span-2 row-span-1 bg-indigo-600 rounded-3xl p-5 flex flex-col justify-center text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={12} className="text-yellow-300" />
            <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Master Tip</span>
          </div>
          <p className="text-xs font-semibold leading-tight">
            Use <span className="font-mono bg-white/20 px-1 rounded">Padding</span> to breathe life into your layouts!
          </p>
        </section>

      </main>
    </div>
  );
}
