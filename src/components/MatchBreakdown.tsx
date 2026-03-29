import React from 'react';
import { Check, X, AlertTriangle, Activity } from 'lucide-react';

interface MatchBreakdownProps {
  strengths: string[];
  missing: string[];
  learnable: string[];
}

export function MatchBreakdown({ strengths, missing, learnable }: MatchBreakdownProps) {
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <Activity className="w-4 h-4 text-[#00ff9d]" />
        </div>
        Match Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#10b981]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#10b981]/10 text-[#10b981]">
              <Check className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Strengths</h4>
          </div>
          <ul className="space-y-4">
            {strengths.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                <span className="text-[#10b981] mt-1 opacity-50 text-xs">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#ef4444]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#ef4444]/10 text-[#ef4444]">
              <X className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Missing</h4>
          </div>
          <ul className="space-y-4">
            {missing.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                <span className="text-[#ef4444] mt-1 opacity-50 text-xs">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Learnable */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#f59e0b]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#f59e0b]/10 text-[#f59e0b]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Learnable</h4>
          </div>
          <ul className="space-y-4">
            {learnable.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                <span className="text-[#f59e0b] mt-1 opacity-50 text-xs">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
