import React, { useState, useEffect } from 'react';
import { Upload, FileText, Terminal, Sparkles, X, AlertCircle, Link as LinkIcon, AlignLeft } from 'lucide-react';

interface InputCardProps {
  onAnalyze: (jdText: string, cvFile: File | null, targetLevel: 'intern' | 'fresher' | 'junior') => void;
  isLoading: boolean;
}

export function InputCard({ onAnalyze, isLoading }: InputCardProps) {
  const [jobDesc, setJobDesc] = useState('');
  const [jobDescError, setJobDescError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [targetLevel, setTargetLevel] = useState<'intern' | 'fresher' | 'junior'>('junior');

  // Cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    };
  }, [pdfPreviewUrl]);

  const handleJobDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJobDesc(value);
    
    const trimmed = value.trim();
    if (!trimmed) {
      setJobDescError(null);
      return;
    }

    const isUrlPrefix = trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('www.');
    
    if (isUrlPrefix) {
      const urlToTest = trimmed.startsWith('www.') ? `https://${trimmed}` : trimmed;
      try {
        new URL(urlToTest);
        setJobDescError(null);
      } catch {
        setJobDescError('Please enter a valid URL');
      }
    } else {
      // Basic validation for text: if it's too short and has no spaces, it's likely an invalid URL attempt or too brief
      if (trimmed.length < 15 && !trimmed.includes(' ')) {
        setJobDescError('Please enter a valid URL or a longer description');
      } else {
        setJobDescError(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        setPdfPreviewUrl(url);
      } else {
        setPdfPreviewUrl(null);
      }
    }
  };

  const clearFile = () => {
    setCvFile(null);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

  const handleAnalyze = () => {
    if (!jobDesc.trim() || jobDescError) return;
    onAnalyze(jobDesc, cvFile, targetLevel);
  };

  const isUrl = jobDesc.trim().startsWith('http') || jobDesc.trim().startsWith('www.');

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:border-white/[0.12]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff9d]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/[0.05] shadow-inner">
          <Terminal className="w-5 h-5 text-[#00ff9d]" />
        </div>
        <h2 className="text-xl font-medium tracking-tight text-white">Target Role</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-widest">Target Career Level</label>
          <div className="grid grid-cols-3 gap-3">
            {(['intern', 'fresher', 'junior'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setTargetLevel(level)}
                className={`py-2.5 px-4 rounded-lg font-mono text-sm transition-all duration-200 uppercase tracking-widest border ${
                  targetLevel === level
                    ? 'bg-[#00ff9d] text-black border-[#00ff9d] shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                    : 'bg-black/40 text-gray-400 border-white/[0.1] hover:border-white/[0.2] hover:text-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-widest">Job Description or URL</label>
          <textarea
            value={jobDesc}
            onChange={handleJobDescChange}
            placeholder="Paste job description or job URL here..."
            className={`w-full h-36 bg-black/40 border ${jobDescError ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-[#00ff9d]/40 focus:ring-[#00ff9d]/20'} rounded-xl p-5 text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-300 resize-none font-mono text-sm leading-relaxed shadow-inner`}
          />
          <div className="mt-2.5 flex items-center justify-between h-5">
            {jobDescError ? (
              <span className="text-xs font-mono text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {jobDescError}
              </span>
            ) : jobDesc.trim() ? (
              isUrl ? (
                <span className="text-xs font-mono text-[#00ff9d] flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" /> Valid URL detected
                </span>
              ) : (
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5" /> Text description detected
                </span>
              )
            ) : <span />}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-widest">Upload CV (Optional)</label>
          
          {!cvFile ? (
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.txt,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center justify-center w-full p-6 border border-dashed border-white/[0.1] rounded-xl bg-black/20 hover:bg-white/[0.02] hover:border-[#00ff9d]/30 transition-all duration-300 cursor-pointer group/upload"
              >
                <div className="flex items-center gap-3 text-gray-500 group-hover/upload:text-[#00ff9d] transition-colors duration-300">
                  <Upload className="w-5 h-5" />
                  <span className="font-mono text-sm">Select PDF, DOCX, or TXT</span>
                </div>
              </label>
            </div>
          ) : (
            <div className="relative border border-white/[0.1] rounded-xl bg-black/40 overflow-hidden group/preview transition-all duration-300 hover:border-white/[0.2]">
              <div className="absolute top-3 right-3 z-10">
                <button 
                  onClick={clearFile}
                  className="p-1.5 bg-black/60 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg backdrop-blur-md transition-colors border border-transparent hover:border-red-500/30"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {pdfPreviewUrl ? (
                <div className="h-48 w-full bg-white/[0.02] relative">
                  <iframe 
                    src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                    className="w-full h-full opacity-70 group-hover/preview:opacity-100 transition-opacity duration-300"
                    title="PDF Preview"
                  />
                </div>
              ) : (
                <div className="h-24 w-full flex items-center justify-center gap-3 text-[#00ff9d]">
                  <FileText className="w-6 h-6" />
                  <span className="font-mono text-sm truncate max-w-[200px]">{cvFile.name}</span>
                </div>
              )}
              
              <div className="p-3.5 border-t border-white/[0.05] bg-[#050505]/80 backdrop-blur-md flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#00ff9d]" />
                <span className="font-mono text-xs text-gray-300 truncate">{cvFile.name}</span>
                <span className="font-mono text-[10px] text-gray-500 ml-auto bg-white/[0.05] px-2 py-1 rounded-md">
                  {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !jobDesc.trim() || !!jobDescError}
          className="w-full py-4 px-6 bg-[#00ff9d] hover:bg-[#00e68d] disabled:bg-white/[0.05] disabled:text-gray-600 disabled:cursor-not-allowed text-black font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,157,0.15)] hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] disabled:shadow-none hover:-translate-y-0.5 disabled:hover:translate-y-0 mt-4"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze Match</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
