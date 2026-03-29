import React, { useState, useCallback } from 'react';
import { InputCard } from './components/InputCard';
import { DecisionCard } from './components/DecisionCard';
import { MatchBreakdown } from './components/MatchBreakdown';
import { MarketCard } from './components/MarketCard';
import { CompanyInfo } from './components/CompanyInfo';
import { Terminal, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeJobMatch, analyzeCompany, AnalyzeResponse, AnalyzeRequest, CompanyInfo as CompanyInfoType } from './services/api';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType | null>(null);
  const [jdText, setJdText] = useState<string>("");

  const handleAnalyze = useCallback(async (jdTextInput: string, cvFile: File | null, targetLevel: 'intern' | 'fresher' | 'junior') => {
    setIsLoading(true);
    setResult(null);
    setCompanyInfo(null);
    setError(null);
    setJdText(jdTextInput); // Save for later company fetch
    
    try {
      // 1. File Processing (Text Extraction)
      let cvText = "";
      if (cvFile) {
        if (cvFile.type === 'text/plain') {
          cvText = await cvFile.text();
        } else {
          cvText = `[Simulated text extraction from ${cvFile.name}]`;
        }
      }

      if (!cvText.trim()) {
        setError("Please provide CV text or upload a file");
        setIsLoading(false);
        return;
      }

      // 2. API Integration - Analyze Job Match ONLY
      const payload: AnalyzeRequest = {
        jdText: jdTextInput,
        cvText,
        targetLevel
      };

      const response = await analyzeJobMatch(payload);
      setResult(response);

    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Separate handler for company info
  const handleFetchCompanyInfo = useCallback(async () => {
    if (!jdText.trim()) return;
    
    setCompanyLoading(true);
    try {
      const info = await analyzeCompany({ jobDescription: jdText });
      setCompanyInfo(info);
    } catch (err) {
      console.error("Failed to fetch company info:", err);
      // Don't show error in main error state, just fail silently or toast
    } finally {
      setCompanyLoading(false);
    }
  }, [jdText]);

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
            v2
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2">
            Should You Apply?
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            AI-powered analysis for Vietnam backend roles. Get keyword matching, HR insights, and market fit assessment.
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
              {/* Company Info - Shows if available */}
              {companyInfo && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <CompanyInfo company={companyInfo} />
                </motion.div>
              )}

              {/* Fetch Company Info Button - Show if not loaded yet */}
              {!companyInfo && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <button
                    onClick={handleFetchCompanyInfo}
                    disabled={companyLoading}
                    className="w-full py-3 px-6 bg-white/[0.05] hover:bg-white/[0.1] disabled:bg-white/[0.03] text-[#00ff9d] border border-white/[0.1] hover:border-[#00ff9d]/50 disabled:border-white/[0.05] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest"
                  >
                    {companyLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-[#00ff9d]/50 border-t-[#00ff9d] rounded-full animate-spin"></div>
                        <span>Loading Company Info...</span>
                      </>
                    ) : (
                      <>
                        <span>📊 Fetch Company Information</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <DecisionCard decision={result.decision} score={result.match.score} />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <MatchBreakdown 
                  matchedKeywords={result.match.matchedKeywords} 
                  missingKeywords={result.match.missingKeywords}
                  strengthsHR={result.strengthsHR}
                  gaps={result.gaps}
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <MarketCard market={result.market} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
