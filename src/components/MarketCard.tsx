import React from 'react';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';

interface MarketCardProps {
  market: {
    levelFit: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    demand: string;
  };
}

export function MarketCard({ market }: MarketCardProps) {
  const difficultyColor = {
    'Easy': { bg: 'bg-[#10b981]/10', border: 'border-[#10b981]/20', text: 'text-[#10b981]' },
    'Medium': { bg: 'bg-[#f59e0b]/10', border: 'border-[#f59e0b]/20', text: 'text-[#f59e0b]' },
    'Hard': { bg: 'bg-[#ef4444]/10', border: 'border-[#ef4444]/20', text: 'text-[#ef4444]' }
  };

  const difficultyStyle = difficultyColor[market.difficulty];

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <TrendingUp className="w-4 h-4 text-[#00ff9d]" />
        </div>
        Market Context
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level Fit */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#00ff9d]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-md bg-[#00ff9d]/10 text-[#00ff9d]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Career Level Fit</h4>
          </div>
          <p className="text-lg font-medium text-[#00ff9d] leading-relaxed">
            {market.levelFit}
          </p>
          <p className="text-sm text-gray-500 mt-3 font-light">How well your experience aligns with the role level</p>
        </div>

        {/* Difficulty */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${difficultyStyle.bg} border-opacity-50 ${difficultyStyle.border} hover:${difficultyStyle.border}`}>
          <div className={`flex items-center gap-3 mb-4 ${difficultyStyle.text}`}>
            <div className={`p-1.5 rounded-md bg-opacity-10 ${difficultyStyle.bg}`}>
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Difficulty Level</h4>
          </div>
          <p className={`text-lg font-medium ${difficultyStyle.text} leading-relaxed`}>
            {market.difficulty}
          </p>
          <p className="text-sm text-gray-500 mt-3 font-light">Challenge rating for this position</p>
        </div>

        {/* Demand */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#8b5cf6]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-md bg-[#8b5cf6]/10 text-[#8b5cf6]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Market Demand</h4>
          </div>
          <p className="text-lg font-medium text-[#8b5cf6] leading-relaxed">
            {market.demand}
          </p>
          <p className="text-sm text-gray-500 mt-3 font-light">Current market need for this skill set</p>
        </div>
      </div>
    </div>
  );
}
