import React from 'react';
import { MessageSquare } from 'lucide-react';

interface InterviewQuestionsProps {
  questions: string[];
}

export function InterviewQuestions({ questions }: InterviewQuestionsProps) {
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 h-full hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <MessageSquare className="w-4 h-4 text-[#00ff9d]" />
        </div>
        Likely Questions
      </h3>
      
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-black/40 border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-300 group">
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-xs font-mono text-[#00ff9d] group-hover:bg-[#00ff9d]/10 group-hover:border-[#00ff9d]/30 transition-colors duration-300">
              0{i + 1}
            </div>
            <p className="text-sm text-gray-300 pt-1 leading-relaxed font-mono">{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
