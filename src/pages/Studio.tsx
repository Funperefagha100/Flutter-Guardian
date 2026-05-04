/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Files,
  Search as SearchIcon,
  GitBranch,
  PlayCircle,
  Puzzle,
  Settings,
  MoreHorizontal,
  ChevronDown,
  FileCode,
  Layout as LayoutIcon,
  PanelRight,
  Zap
} from 'lucide-react';
import { CodeEditor } from '../components/Editor/CodeEditor';
import { FlutterSimulator } from '../components/Preview/FlutterSimulator';
import { Guardian } from '../components/AI/Guardian';
import { LESSONS } from '../constants';
import { cn } from '../lib/utils';

export const Studio: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [code, setCode] = useState(LESSONS[0].initialCode);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'explorer' | 'search' | 'github' | 'run'>('explorer');
  const [isGuardianOpen, setIsGuardianOpen] = useState(false);

  const currentLesson = LESSONS[currentLessonIndex];

  const handleNextLesson = () => {
    const next = currentLessonIndex + 1;
    if (next < LESSONS.length) {
      setCurrentLessonIndex(next);
      setCode(LESSONS[next].initialCode);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-white dark:bg-[#181818] text-slate-800 dark:text-[#cccccc] font-sans transition-colors duration-300">
      
      {/* 1. Activity Bar (Narrowest Left) */}
      <div className="w-12 bg-slate-100 dark:bg-[#333333] flex flex-col items-center py-4 gap-4 shrink-0 border-r border-slate-200 dark:border-[#2b2b2b]">
        {[
          { icon: Files, id: 'explorer' },
          { icon: SearchIcon, id: 'search' },
          { icon: GitBranch, id: 'github' },
          { icon: PlayCircle, id: 'run' },
          { icon: Puzzle, id: 'extension' }
        ].map(({ icon: Icon, id }) => (
          <button 
            key={id}
            onClick={() => {
              if (activeTab === id) setSidebarOpen(!sidebarOpen);
              else {
                setActiveTab(id as any);
                setSidebarOpen(true);
              }
            }}
            className={cn(
              "p-2.5 transition-colors relative group",
              activeTab === id && sidebarOpen 
                ? "text-blue-600 dark:text-white" 
                : "text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300"
            )}
          >
            <Icon size={24} strokeWidth={1.5} />
            {activeTab === id && sidebarOpen && (
              <div className="absolute left-0 top-0 w-0.5 h-full bg-blue-600 dark:bg-white" />
            )}
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 dark:bg-[#252526] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-xl border border-slate-700 dark:border-[#454545]">
              {id.toUpperCase()}
            </div>
          </button>
        ))}
        <div className="mt-auto flex flex-col gap-4 mb-2">
          <button className="text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 p-2.5">
            <Settings size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* 2. Sidebar (Explorer) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-slate-50 dark:bg-[#252526] flex flex-col shrink-0 border-r border-slate-200 dark:border-[#2b2b2b] overflow-hidden"
          >
            <div className="h-9 flex items-center justify-between px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
              {activeTab}
              <MoreHorizontal size={14} className="cursor-pointer" />
            </div>

            {activeTab === 'explorer' && (
              <div className="flex flex-col">
                <div className="flex items-center px-4 py-1.5 bg-slate-200 dark:bg-[#37373d] text-[11px] font-bold text-slate-700 dark:text-white group cursor-pointer">
                  <ChevronDown size={14} className="mr-1" />
                  FLUTTER_GUARDIAN_PROJECT
                </div>
                <div className="flex flex-col py-1">
                  <div className="flex items-center px-6 py-1 text-[13px] text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-[#2a2d2e] cursor-pointer group font-medium">
                    <ChevronDown size={14} className="mr-1 text-slate-400 dark:text-gray-500" />
                    <span className="text-slate-400 dark:text-gray-500 mr-1.5">📁</span> lib
                  </div>
                  <div className="flex items-center px-10 py-1 text-[13px] text-blue-600 dark:text-white bg-blue-50 dark:bg-[#37373d] cursor-pointer group border-l-2 border-blue-600 dark:border-blue-500 font-bold">
                    <span className="w-3.5 h-3.5 flex items-center justify-center rounded-sm bg-[#512da8] text-[8px] font-bold text-white uppercase italic mr-2 shrink-0">D</span>
                    main.dart
                  </div>
                  <div className="flex items-center px-6 py-1 text-[13px] text-slate-400 dark:text-gray-500 opacity-60 hover:bg-slate-100 dark:hover:bg-[#2a2d2e] cursor-not-allowed">
                    <span className="mr-1.5 opacity-50">📄</span> pubspec.yaml
                  </div>
                </div>

                {/* Learning Progress as a "File System" extension */}
                <div className="mt-4 border-t border-slate-200 dark:border-[#333] pt-4">
                  <div className="px-4 py-1 text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center justify-between">
                    Learning Path
                    <div className="w-12 h-1.5 bg-slate-200 dark:bg-[#333] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${((currentLessonIndex + 1) / LESSONS.length) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {LESSONS.map((lesson, idx) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setCurrentLessonIndex(idx);
                          setCode(lesson.initialCode);
                        }}
                        className={cn(
                          "px-6 py-1.5 text-[12px] flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-[#2a2d2e] transition-colors font-medium",
                          idx === currentLessonIndex ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#37373d]/50" : "text-slate-500 dark:text-gray-400"
                        )}
                      >
                         {idx < currentLessonIndex ? (
                           <CheckCircle2 size={12} className="text-green-500" />
                         ) : (
                           <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-gray-600 flex items-center justify-center text-[8px]">
                             {idx + 1}
                           </div>
                         )}
                         <span className="truncate">{lesson.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Editor & Preview Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#1e1e1e]">
        
        {/* IDE Toolbar */}
        <div className="h-9 bg-slate-100 dark:bg-[#2d2d2d] flex items-center justify-between px-4 shrink-0 border-b border-slate-200 dark:border-[#1e1e1e]">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-gray-400 font-medium">
                Studio <ChevronRight size={10} /> main.dart
             </div>
          </div>
          <div className="flex items-center gap-1">
             <button 
               className="p-1 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2 text-[11px] font-bold transition-all active:scale-95 shadow-lg group"
               title="Hot Reload"
             >
               <Zap size={14} className="fill-white group-hover:animate-pulse" />
               Hot Reload
             </button>
             <button className="p-1.5 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 rounded transition-colors ml-2">
               <Play size={14} fill="currentColor" />
             </button>
             <button className="p-1.5 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 rounded transition-colors">
               <PanelRight size={16} />
             </button>
          </div>
        </div>

        {/* Editor Wrapper with Grid Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Editor Center */}
          <div className="flex-[3] flex flex-col border-r border-slate-200 dark:border-[#1e1e1e] relative min-w-0">
             <CodeEditor code={code} onChange={setCode} />
          </div>

          {/* 右侧面板: Preview */}
          <div className="flex-[2] flex flex-col bg-slate-50 dark:bg-[#1e1e1e] border-l border-slate-200 dark:border-[#2b2b2b] min-w-[320px]">
             
             {/* Unified Preview Title */}
             <div className="h-9 bg-slate-100 dark:bg-[#252526] border-b border-slate-200 dark:border-[#1e1e1e] flex items-center px-4 justify-between">
                <div className="flex gap-4">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-white border-b border-slate-800 dark:border-white py-2 px-1">PREVIEW</span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-gray-500 py-2 px-1 hover:text-slate-600 dark:hover:text-gray-300 cursor-pointer">DEBUG CONSOLE</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500">Device: iPhone 15</span>
                </div>
             </div>

             <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {/* Simulator Area */}
                <div className="flex-1 p-6 bg-slate-200 dark:bg-[#0a0a0a] flex items-center justify-center">
                   <FlutterSimulator code={code} />
                </div>
             </div>

          </div>

        </div>

      </div>

      {/* Floating Guardian Chatbot */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isGuardianOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[380px] h-[550px] bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#333] overflow-hidden flex flex-col ring-1 ring-black/10 dark:ring-black/50"
            >
              <div className="h-12 bg-slate-50 dark:bg-[#252526] px-4 flex items-center justify-between border-b border-slate-200 dark:border-[#333] shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-gray-200">The Guardian</span>
                </div>
                <button 
                  onClick={() => setIsGuardianOpen(false)}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md transition-colors text-slate-400 dark:text-gray-400"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden flex flex-col">
                <Guardian currentCode={code} currentTask={currentLesson.challenge} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsGuardianOpen(!isGuardianOpen)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 group relative",
            isGuardianOpen ? "bg-slate-800 dark:bg-[#333] text-white rotate-180" : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          {isGuardianOpen ? (
            <MoreHorizontal size={28} />
          ) : (
            <>
              <Sparkles size={28} fill="currentColor" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-[#181818]" />
            </>
          )}
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
};
