
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultsViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  const { analysis, sources } = data;

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Strategist Outlook */}
      <section className="bg-white border-l-4 border-indigo-500 rounded-r-xl p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Holistic Strategy Outlook</h2>
        <p className="text-slate-700 text-lg leading-relaxed font-medium">
          {analysis.strategistOutlook}
        </p>
      </section>

      {/* Career Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysis.recommendations.map((rec, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-black text-slate-900 leading-tight pr-4">{rec.role}</h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md shrink-0">
                {rec.matchScore}% Match
              </span>
            </div>
            
            <p className="text-slate-600 text-sm mb-4 leading-relaxed italic">
              "{rec.explanation}"
            </p>

            {rec.personalSynergy && (
              <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Personal Synergy</h4>
                <p className="text-slate-700 text-xs font-medium leading-relaxed">
                  {rec.personalSynergy}
                </p>
              </div>
            )}

            <div className="mt-auto space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Next Skills to Master</h4>
              <div className="flex flex-wrap gap-2">
                {rec.nextSkills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Market Research Sources */}
      {sources.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-900">Industry Intelligence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all"
              >
                <div className="mb-4">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{source.title}</h4>
                </div>
                <span className="text-[10px] text-slate-400 font-medium truncate">
                  {new URL(source.uri).hostname}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Start New Analysis</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
