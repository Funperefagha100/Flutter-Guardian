/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  BookOpen, 
  Trophy, 
  Plus, 
  ArrowRight, 
  Code2, 
  Smartphone, 
  History,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { LESSONS } from '../constants';

export const Home: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for demo purposes - in a real app these would come from Firestore
  const stats = [
    { label: 'Lessons Done', value: '4/12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Mastery Score', value: '850', icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { label: 'Apps Built', value: '2', icon: Rocket, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  const recentProjects = [
    { name: 'My First Flutter App', language: 'Dart', updated: '2 days ago', progress: 100 },
    { name: 'Coffee Shop UI', language: 'Dart', updated: '5 hours ago', progress: 45 },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black text-slate-800 dark:text-white tracking-tight"
            >
              Welcome back, {user?.displayName?.split(' ')[0]}!
            </motion.h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
              Ready to continue your journey to becoming a Flutter Master?
            </p>
          </div>
          <Link 
            to="/studio"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 group"
          >
            <Plus size={20} />
            Start New Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6"
            >
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Track Record */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                <History className="text-blue-600" />
                Track Record
              </h2>
              <button className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project, i) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Smartphone size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">{project.name}</h3>
                        <p className="text-xs text-slate-400 font-medium">{project.language} • Updated {project.updated}</p>
                      </div>
                    </div>
                    <Link to="/studio" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                      <Code2 size={18} />
                    </Link>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Quick Learning Path */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
              <TrendingUp className="text-green-500" />
              Focus Now
            </h2>
            
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
              <Award className="absolute -top-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Next Lesson</span>
                <h3 className="text-2xl font-black mt-4 mb-2">{LESSONS[1].title}</h3>
                <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-6">
                  Learn to style your widgets and master the Art of Flutter UI.
                </p>
                <Link 
                  to="/studio"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95"
                >
                  Jump In
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Daily Challenges Snippet */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
               <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider mb-4">Daily Goal</h4>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-slate-100 dark:border-t-slate-800 flex items-center justify-center text-xs font-black text-blue-600">
                    65%
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Write 50 lines of code</p>
                    <p className="text-xs text-slate-400">32/50 completed today</p>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
