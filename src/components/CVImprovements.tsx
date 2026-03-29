import React from 'react';
import { ArrowRight, FileEdit } from 'lucide-react';

interface Improvement {
  type: string;
  before: string;
  after: string;
}

interface CVImprovementsProps {
  improvements: Improvement[];
}

export function CVImprovements({ improvements }: CVImprovementsProps) {
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 h-full hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <FileEdit className="w-4 h-4 text-[#00ff9d]" />
        </div>
        CV Improvements
      </h3>
      
      <div className="space-y-4">
        {improvements.map((item, i) => (
          <div key={i} className="group flex flex-col gap-4 p-5 rounded-xl bg-black/40 border border-white/[0.05] hover:border-[#00ff9d]/30 hover:bg-white/[0.02] transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#00ff9d] uppercase tracking-widest border border-[#00ff9d]/20 bg-[#00ff9d]/10 px-2 py-0.5 rounded">
                {item.type}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="flex-1">
                <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">Current</div>
                <p className="text-sm text-gray-500 line-through decoration-gray-700 leading-relaxed">{item.before}</p>
              </div>
              
              <div className="hidden sm:flex items-center justify-center text-gray-700 group-hover:text-[#00ff9d]/50 transition-colors duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
              
              <div className="flex-1">
                <div className="text-[10px] font-mono text-[#00ff9d]/80 mb-2 uppercase tracking-widest">Suggested</div>
                <p className="text-sm text-gray-200 font-medium leading-relaxed">{item.after}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
