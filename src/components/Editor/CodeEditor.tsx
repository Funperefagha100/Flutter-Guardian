/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-dart';
import 'prismjs/themes/prism-tomorrow.css';
import { useTheme } from '../../lib/ThemeContext';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 bg-white dark:bg-[#1e1e1e] overflow-hidden flex flex-col">
      {/* VS Code Tab Bar */}
      <div className="h-9 bg-slate-100 dark:bg-[#252526] flex items-center shrink-0">
        <div className="h-full px-3 bg-white dark:bg-[#1e1e1e] border-t border-t-blue-500 flex items-center text-[11px] text-slate-800 dark:text-gray-200 gap-2 border-r border-[#252526] cursor-default font-medium">
          <span className="w-3.5 h-3.5 flex items-center justify-center rounded-sm bg-[#512da8] text-[8px] font-bold text-white uppercase italic">D</span>
          main.dart
          <span className="ml-2 text-slate-400 dark:text-gray-500 hover:text-slate-800 dark:hover:text-gray-300 transition-colors font-black">×</span>
        </div>
        <div className="flex-1 h-full bg-slate-100 dark:bg-[#252526]" />
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto font-mono text-sm custom-scrollbar bg-white dark:bg-[#1e1e1e]">
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={code => highlight(code, languages.dart, 'dart')}
          padding={20}
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 13,
            lineHeight: '1.5',
            minHeight: '100%',
            backgroundColor: 'transparent',
            outline: 'none',
            color: isDark ? '#d4d4d4' : '#333333',
          }}
          className="editor"
        />
      </div>

      {/* VS Code Status Bar */}
      <div className="h-6 bg-blue-600 dark:bg-[#007acc] flex items-center px-3 justify-between text-[11px] text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 h-full transition-colors cursor-default">
            <div className="w-2.5 h-2.5 rounded-full border border-white/40 flex items-center justify-center">
              <span className="text-[6px]">×</span>
            </div>
            <span>0</span>
            <div className="w-2.5 h-2.5 rounded-full border border-white/40 flex items-center justify-center ml-1">
              <span className="text-[6px]">!</span>
            </div>
            <span>0</span>
          </div>
          <div className="hover:bg-white/10 px-1.5 h-full transition-colors cursor-default">
            main*
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hover:bg-white/10 px-1.5 h-full transition-colors cursor-default">Ln 1, Col 1</div>
          <div className="hover:bg-white/10 px-1.5 h-full transition-colors cursor-default">Spaces: 2</div>
          <div className="hover:bg-white/10 px-1.5 h-full transition-colors cursor-default font-bold italic">Dart</div>
          <div className="hover:bg-white/10 px-1.5 h-full transition-colors cursor-default">
            <span className="opacity-70">Flutter: 3.22.0</span>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3d3d3d;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4d4d4d;
        }
      `}</style>
    </div>
  );
};
