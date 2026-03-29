import React from 'react';
import { Code2 } from 'lucide-react';

interface MatchedTechProps {
  tech: string[];
}

export function MatchedTech({ tech }: MatchedTechProps) {
  if (!tech || tech.length === 0) return null;
  
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <Code2 className="w-4 h-4 text-[#00ff9d]" />
        </div>
        Matched Tech Stack
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {tech.map((t, i) => (
          <span 
            key={i} 
            className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm font-mono text-gray-300 hover:border-[#00ff9d]/50 hover:text-[#00ff9d] hover:bg-[#00ff9d]/5 transition-all duration-300 cursor-default shadow-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
