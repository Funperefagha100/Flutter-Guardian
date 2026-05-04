/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Book, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Lock, 
  Star,
  Code2,
  Terminal,
  Zap,
  Box,
  Layers,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: string[];
  icon: any;
  level: 'Beginner' | 'Intermediate' | 'Pro';
  color: string;
}

const MODULES: Module[] = [
  {
    id: 'm1',
    title: 'The Dart Basics',
    description: 'Master the syntax and fundamental building blocks of the Dart language.',
    lessons: ['Variables & Data Types', 'Built-in Types (Strings, Booleans, Numbers)', 'Operators', 'Control Flow (If/Else, Loops)'],
    icon: Terminal,
    level: 'Beginner',
    color: 'bg-blue-500'
  },
  {
    id: 'm2',
    title: 'Functions & Collections',
    description: 'Learn how to organize code and work with groups of data.',
    lessons: ['Defining Functions', 'Parameters & Returns', 'Lists & Maps', 'Spreads & Control-flow in collections'],
    icon: Box,
    level: 'Beginner',
    color: 'bg-green-500'
  },
  {
    id: 'm3',
    title: 'Object-Oriented Dart',
    description: 'The core of Flutter. Classes, Objects, and Inheritance.',
    lessons: ['Classes & Constructors', 'Static Members', 'Inheritance & Mixins', 'Abstract Classes & Interfaces'],
    icon: Layers,
    level: 'Intermediate',
    color: 'bg-purple-500'
  },
  {
    id: 'm4',
    title: 'Asynchronous Programming',
    description: 'Handle data from APIs and databases without blocking the UI.',
    lessons: ['Futures & async/await', 'Error Handling', 'Streams & Sinks', 'Generators'],
    icon: Zap,
    level: 'Intermediate',
    color: 'bg-yellow-500'
  },
  {
    id: 'm5',
    title: 'Advanced Types & Null Safety',
    description: 'Write robust, crash-proof code with Modern Dart features.',
    lessons: ['Sound Null Safety', 'Generics', 'Extension Methods', 'Typedefs & Records'],
    icon: Code2,
    level: 'Pro',
    color: 'bg-orange-500'
  },
  {
    id: 'm6',
    title: 'Dart for Flutter Masters',
    description: 'Techniques used in professional enterprise Flutter apps.',
    lessons: ['Memory Management', 'Isolates & Multithreading', 'FFI (Foreign Function Interface)', 'Custom Lint Rules'],
    icon: Database,
    level: 'Pro',
    color: 'bg-red-500'
  }
];

export const Curriculum: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest mb-4 inline-block">
              Full Learning Track
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
              Mastering Dart: <br />
              <span className="text-blue-600">From Zero to Pro</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
              Dart is the expressive, developer-friendly language behind Flutter. This course takes you through every level of mastery, ensuring you can build production-ready apps with confidence.
            </p>
          </motion.div>
        </header>

        <div className="space-y-8">
          {MODULES.map((module, mIdx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mIdx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Module Sidebar */}
                <div className="md:w-64 shrink-0">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", module.color)}>
                    <module.icon size={32} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      module.level === 'Beginner' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      module.level === 'Intermediate' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    )}>
                      {module.level}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                      Module {mIdx + 1}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-3">
                    {module.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Lesson List */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Lessons in this module</h3>
                  {module.lessons.map((lesson, lIdx) => (
                    <div 
                      key={lesson}
                      className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {lIdx + 1}
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{lesson}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={16} className="text-blue-600" fill="currentColor" />
                      </div>
                    </div>
                  ))}
                  
                  {mIdx > 1 && (
                    <div className="mt-6 flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                       <Lock size={16} />
                       <span className="text-xs font-bold uppercase tracking-wider">Complete Modules 1 & 2 to Unlock</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pro Tip Section */}
        <section className="mt-16 bg-slate-900 dark:bg-slate-800 rounded-3xl p-10 text-white relative overflow-hidden group">
          <Star className="absolute top-10 right-10 w-32 h-32 text-yellow-500/10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Ready to reach Pro status?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl leading-relaxed">
              Our advanced tracks cover production internals used by the Google Chrome and Flutter teams. Get certified as a Flutter Developer today.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20">
              Claim Your Pro Token
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
