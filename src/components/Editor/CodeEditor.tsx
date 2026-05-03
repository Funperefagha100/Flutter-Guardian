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

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="flex-1 bg-[#1e1e1e] overflow-hidden flex flex-col">
      <div className="h-10 bg-[#2d2d2d] border-b border-[#3d3d3d] flex items-center px-4 gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="h-7 px-3 bg-[#1e1e1e] rounded-t-md flex items-center text-[11px] text-gray-300 gap-2 border-x border-t border-[#3d3d3d]">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          main.dart
        </div>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-sm custom-scrollbar">
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={code => highlight(code, languages.dart, 'dart')}
          padding={20}
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 14,
            minHeight: '100%',
            backgroundColor: 'transparent',
            outline: 'none',
          }}
          className="editor"
        />
      </div>
      <div className="h-6 bg-[#2d2d2d] border-t border-[#3d3d3d] flex items-center px-4 justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold">
        <span>Dart | Flutter SDK 3.x</span>
        <span>Line: {code.split('\n').length}</span>
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
