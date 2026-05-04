/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useTheme } from '../../lib/ThemeContext';
import { logout } from '../../lib/firebase';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Dart Course', path: '/curriculum' },
    { name: 'Learning Studio', path: '/studio' },
  ];

  return (
    <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Cpu size={18} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">FlutterGuardian</h1>
        </Link>
        <div className="hidden sm:flex items-center gap-2 ml-4">
           <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">Studio v1.0</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "pb-1 transition-colors hover:text-slate-800 dark:hover:text-slate-200",
                location.pathname === item.path 
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" 
                  : ""
              )}
            >
              {item.name}
            </Link>
          ))}
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
  );
};
