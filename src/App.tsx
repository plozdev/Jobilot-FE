import React, { useState, useCallback } from 'react';
import { InputCard } from './components/InputCard';
import { DecisionCard } from './components/DecisionCard';
import { MatchBreakdown } from './components/MatchBreakdown';
import { CVImprovements } from './components/CVImprovements';
import { InterviewQuestions } from './components/InterviewQuestions';
import { MatchedTech } from './components/MatchedTech';
import { Terminal, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeJobMatch, AnalyzeResponse } from './services/api';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const handleAnalyze = useCallback(async (jobDesc: string, cvFile: File | null) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // 1. File Processing (Text Extraction)
      let cvText = "";
      if (cvFile) {
        if (cvFile.type === 'text/plain') {
          cvText = await cvFile.text();
        } else {
          // In production: use pdf.js for PDFs or mammoth for DOCX
          cvText = `[Simulated text extraction from ${cvFile.name}]`;
        }
      }

      // 2. API Integration
      const response = await analyzeJobMatch({
        jobDescription: jobDesc,
        cvText: cvText
      });

      setResult(response);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-[#00ff9d]/30 selection:text-[#00ff9d] pb-24">
      {/* Header */}
      <header className="border-b border-white/[0.05] bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-sm">
              <Terminal className="w-4 h-4 text-[#00ff9d]" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Jobilot<span className="text-[#00ff9d]">.</span>
            </span>
          </div>
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest border border-white/[0.05] px-2.5 py-1 rounded-full bg-white/[0.02]">
            Beta
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2">
            Decode the Job Description
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            AI-powered analysis to determine if you should apply, what you're missing, and how to tailor your CV.
          </p>
        </div>

        {/* Input Section */}
        <InputCard onAnalyze={handleAnalyze} isLoading={isLoading} />

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-medium mb-1">Analysis Failed</h3>
                  <p className="text-red-400/80 text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Skeleton */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="h-48 bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse"></div>
              <div className="h-72 bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {result && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.15 }}
              className="space-y-8"
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <DecisionCard decision={result.decision} score={result.score} />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <MatchedTech tech={result.matchedTech} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <MatchBreakdown 
                  strengths={result.match.strengths} 
                  missing={result.match.missing} 
                  learnable={result.match.learnable} 
                />
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                  <CVImprovements improvements={result.cvFix} />
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                  <InterviewQuestions questions={result.questions} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
