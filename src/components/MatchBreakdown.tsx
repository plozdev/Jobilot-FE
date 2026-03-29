import React from 'react';
import { Check, X, AlertTriangle, Activity } from 'lucide-react';

interface MatchBreakdownProps {
  matchedKeywords: string[];
  missingKeywords: string[];
  strengthsHR: string[];
  gaps: string[];
}

export function MatchBreakdown({ matchedKeywords, missingKeywords, strengthsHR, gaps }: MatchBreakdownProps) {
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <Activity className="w-4 h-4 text-[#00ff9d]" />
        </div>
        Match Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#10b981]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#10b981]/10 text-[#10b981]">
              <Check className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Matched Skills</h4>
          </div>
          <ul className="space-y-3">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((keyword, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                  <span className="text-[#10b981] font-bold text-xs">✓</span>
                  <span>{keyword}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">No matched keywords found</li>
            )}
          </ul>
        </div>

        {/* Missing Keywords */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#ef4444]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#ef4444]/10 text-[#ef4444]">
              <X className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Missing Skills</h4>
          </div>
          <ul className="space-y-3">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((keyword, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                  <span className="text-[#ef4444] font-bold text-xs">✕</span>
                  <span>{keyword}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">All required skills matched!</li>
            )}
          </ul>
        </div>

        {/* HR Strengths */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#fbbf24]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#fbbf24]/10 text-[#fbbf24]">
              <Check className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Your Strengths</h4>
          </div>
          <ul className="space-y-3">
            {strengthsHR.length > 0 ? (
              strengthsHR.map((strength, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                  <span className="text-[#fbbf24] mt-1 opacity-50 text-xs">■</span>
                  <span>{strength}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">No strengths identified</li>
            )}
          </ul>
        </div>

        {/* Gaps */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#f87171]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-1.5 rounded-md bg-[#f87171]/10 text-[#f87171]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Areas to Develop</h4>
          </div>
          <ul className="space-y-3">
            {gaps.length > 0 ? (
              gaps.map((gap, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                  <span className="text-[#f87171] mt-1 opacity-50 text-xs">■</span>
                  <span>{gap}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">No significant gaps identified</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

