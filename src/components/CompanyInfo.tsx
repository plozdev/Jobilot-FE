import React from 'react';
import { Building2, Globe, Users, Calendar, MapPin } from 'lucide-react';
import { CompanyInfo as CompanyInfoType } from '../services/api';

interface CompanyInfoProps {
  company: CompanyInfoType;
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.12] transition-colors duration-500">
      <h3 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
          <Building2 className="w-4 h-4 text-[#00ff9d]" />
        </div>
        Company Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#00ff9d]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-md bg-[#00ff9d]/10 text-[#00ff9d]">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Company Name</h4>
          </div>
          <p className="text-lg font-medium text-white leading-relaxed">{company.name}</p>
        </div>

        {/* Industry */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#3b82f6]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-md bg-[#3b82f6]/10 text-[#3b82f6]">
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Industry</h4>
          </div>
          <p className="text-lg font-medium text-[#3b82f6] leading-relaxed">{company.industry}</p>
        </div>

        {/* Company Size */}
        <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#8b5cf6]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 rounded-md bg-[#8b5cf6]/10 text-[#8b5cf6]">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Company Size</h4>
          </div>
          <p className="text-lg font-medium text-[#8b5cf6] leading-relaxed">{company.size}</p>
        </div>

        {/* Founded */}
        {company.founded && (
          <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#f59e0b]/30 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 rounded-md bg-[#f59e0b]/10 text-[#f59e0b]">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Founded</h4>
            </div>
            <p className="text-lg font-medium text-[#f59e0b] leading-relaxed">{company.founded}</p>
          </div>
        )}

        {/* Location */}
        {company.location && (
          <div className="bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-[#10b981]/30 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 rounded-md bg-[#10b981]/10 text-[#10b981]">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400">Location</h4>
            </div>
            <p className="text-lg font-medium text-[#10b981] leading-relaxed">{company.location}</p>
          </div>
        )}
      </div>

      {/* Description - Full Width */}
      <div className="mt-6 bg-black/40 border border-white/[0.05] rounded-xl p-6 hover:border-white/[0.1] transition-colors duration-300">
        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">About</h4>
        <p className="text-gray-300 leading-relaxed">{company.description}</p>
      </div>

      {/* Website Link */}
      {company.website && (
        <div className="mt-6">
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-lg text-[#00ff9d] hover:bg-[#00ff9d]/20 hover:border-[#00ff9d]/50 transition-all duration-200 font-mono text-sm"
          >
            <Globe className="w-4 h-4" />
            Visit Website
            <span className="text-xs opacity-50">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
