/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Home, Settings, Search, Plus, User, Menu, ChevronLeft } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SimulatorProps {
  code: string;
}

// A very basic "Flutter to React" simulator
// In a real app, this would be a proper AST parser.
// Here we use regex to detect key patterns.
export const FlutterSimulator: React.FC<SimulatorProps> = ({ code }) => {
  const parsedData = useMemo(() => {
    const appBarTitleMatch = code.match(/AppBar\([\s\S]*?title:\s*?const\s*?Text\(['"](.*?)['"]\)/);
    const bodyTextMatch = code.match(/body:\s*?[\s\S]*?Text\(['"](.*?)['"]\)/);
    const fabLabelMatch = code.match(/FloatingActionButton\([\s\S]*?child:\s*?Icon\(Icons\.(.*?)\)/i);
    
    // Check for Column/Row children
    const columnChildrenMatch = code.match(/children:\s*\[([\s\S]*?)\]/);
    let items: string[] = [];
    if (columnChildrenMatch) {
      const itemsRaw = columnChildrenMatch[1];
      const textMatches = itemsRaw.matchAll(/Text\(['"](.*?)['"]\)/g);
      for (const match of textMatches) {
        items.push(match[1]);
      }
    }

    // Styles
    const fontSizeMatch = code.match(/fontSize:\s*?(\d+)/);
    const colorMatch = code.match(/color:\s*?Colors\.(.*?)[,)]/);

    return {
      appBarTitle: appBarTitleMatch ? appBarTitleMatch[1] : 'Flutter App',
      bodyText: bodyTextMatch ? bodyTextMatch[1] : null,
      fabIcon: fabLabelMatch ? fabLabelMatch[1] : null,
      items,
      style: {
        fontSize: fontSizeMatch ? parseInt(fontSizeMatch[1]) : 16,
        color: colorMatch ? colorMatch[1].toLowerCase() : 'black'
      }
    };
  }, [code]);

  const getFlutterColor = (c: string) => {
    switch(c) {
      case 'blue': return 'text-blue-500';
      case 'red': return 'text-red-500';
      case 'green': return 'text-green-500';
      case 'orange': return 'text-orange-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-gray-900';
    }
  };

  const getLucideIcon = (name: string) => {
    switch(name.toLowerCase()) {
      case 'add': return <Plus size={24} />;
      case 'favorite': return <Heart size={24} />;
      case 'home': return <Home size={24} />;
      case 'settings': return <Settings size={24} />;
      default: return <Plus size={24} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-900 transition-colors duration-300">
      {/* Phone Frame */}
      <div className="relative w-[280px] h-full max-h-[580px] bg-white dark:bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-slate-800 dark:border-slate-800 overflow-hidden flex flex-col scale-90 md:scale-100 transition-transform duration-500">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-800 rounded-b-2xl z-20" />
        
        {/* AppBar */}
        <div className="h-12 bg-blue-600 flex items-center px-4 shadow-md text-white gap-3 pt-2">
          <Menu size={16} />
          <h1 className="font-semibold text-sm truncate flex-1">{parsedData.appBarTitle}</h1>
          <Search size={16} />
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto bg-white p-4 relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={code}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full flex flex-col"
            >
              {parsedData.bodyText && !parsedData.items.length && (
                <div className="flex-1 flex items-center justify-center">
                   <p className={cn("text-center font-bold px-4 leading-tight", getFlutterColor(parsedData.style.color))} style={{ fontSize: parsedData.style.fontSize }}>
                    {parsedData.bodyText}
                  </p>
                </div>
              )}

              {parsedData.items.length > 0 && (
                <div className="flex flex-col gap-3 py-2">
                  {parsedData.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm text-sm font-medium text-slate-700"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* FAB */}
          {parsedData.fabIcon && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg z-10"
            >
              {getLucideIcon(parsedData.fabIcon)}
            </motion.button>
          )}
        </div>
        
        {/* Navigation Bar (Mock) */}
        <div className="h-14 border-t border-slate-100 flex items-center justify-around px-2 pb-1 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center text-blue-600 font-bold">
            <Home size={18} />
            <span className="text-[9px] mt-0.5">Home</span>
          </div>
          <div className="flex flex-col items-center text-slate-300 group hover:text-slate-500 cursor-pointer">
            <Search size={18} />
            <span className="text-[9px] font-bold mt-0.5">Search</span>
          </div>
          <div className="flex flex-col items-center text-slate-300 group hover:text-slate-500 cursor-pointer">
            <User size={18} />
            <span className="text-[9px] font-bold mt-0.5">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
