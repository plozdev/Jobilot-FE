import React from 'react';
import { CheckCircle2, XCircle, Target } from 'lucide-react';

interface DecisionCardProps {
  decision: {
    result: 'APPLY' | 'SKIP';
    confidence: number;
    reason: string;
  };
  score: number;
}

export function DecisionCard({ decision, score }: DecisionCardProps) {
  const isApply = decision.result === 'APPLY';
  const scorePercentage = (score / 10) * 100;
  const strokeDasharray = 251.2; // 2 * pi * r (r=40)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * scorePercentage) / 100;
  
  return (
    <div className={`border rounded-2xl p-8 relative overflow-hidden transition-all duration-500 ${isApply ? 'bg-gradient-to-b from-[#0a1a12]/80 to-[#050505] border-[#00ff9d]/20' : 'bg-gradient-to-b from-[#1a0a0a]/80 to-[#050505] border-[#ef4444]/20'}`}>
      <div className={`absolute -right-20 -top-20 w-64 h-64 blur-[80px] rounded-full opacity-20 pointer-events-none ${isApply ? 'bg-[#00ff9d]' : 'bg-[#ef4444]'}`}></div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-10">
        
        {/* Score Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/[0.05]" />
            <circle 
              cx="64" cy="64" r="40" 
              stroke="currentColor" 
              strokeWidth="6" 
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${isApply ? 'text-[#00ff9d]' : 'text-[#ef4444]'}`}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center mt-1">
            <span className={`text-3xl font-bold tracking-tighter ${isApply ? 'text-[#00ff9d]' : 'text-[#ef4444]'}`}>{score}</span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">/ 10</span>
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Verdict</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent"></div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded-md border border-white/[0.05]">
              <Target className="w-3 h-3 text-[#00ff9d]" />
              {decision.confidence}% Confidence
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className={`text-5xl md:text-6xl font-bold tracking-tighter ${isApply ? 'text-[#00ff9d]' : 'text-[#ef4444]'}`}>
              {decision.result}
            </div>
            {isApply ? <CheckCircle2 className="w-8 h-8 text-[#00ff9d] opacity-80" /> : <XCircle className="w-8 h-8 text-[#ef4444] opacity-80" />}
          </div>
          <p className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl">
            {decision.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
