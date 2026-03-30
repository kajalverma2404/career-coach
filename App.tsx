
import React, { useState } from 'react';
import { performCareerAnalysis } from './services/geminiService';
import { AnalysisResult, LoadingStage } from './types';
import LoadingScreen from './components/LoadingScreen';
import ResultsView from './components/ResultsView';

const App: React.FC = () => {
  const [profileText, setProfileText] = useState('');
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileText.trim() || profileText.length < 20) return;

    setError(null);
    setResults(null);
    setLoadingStage('searching');
    
    try {
      // Intentional delay for UX flow
      await new Promise(r => setTimeout(r, 1200));
      setLoadingStage('analyzing');
      const analysisData = await performCareerAnalysis(profileText);
      setLoadingStage('drafting');
      await new Promise(r => setTimeout(r, 800));
      setResults(analysisData);
      setLoadingStage('idle');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setLoadingStage('idle');
    }
  };

  const handleReset = () => {
    setProfileText('');
    setResults(null);
    setError(null);
    setLoadingStage('idle');
  };

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <header className="sticky top-0 z-50 glass-card border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight italic">
              AI CAREER <span className="text-indigo-600">COACH</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
             <div className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Market Feed: Live</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {loadingStage === 'idle' && !results && (
          <div className="max-w-4xl mx-auto flex flex-col space-y-12 animate-fade-in-up">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Holistic Analysis Engine</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                Your story is your <span className="text-indigo-600">strategy.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                Include your degree, core skills, hobbies, and interests. Our AI analyzes the overlap to find roles you'll actually love.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
                <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-indigo-50/50">
                  <div className="flex items-center justify-between mb-6">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center space-x-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Academic background, skills, hobbies, and interests</span>
                    </label>
                    <span className="text-[10px] font-bold text-slate-400">Min. 20 characters</span>
                  </div>
                  
                  <textarea
                    required
                    value={profileText}
                    onChange={(e) => setProfileText(e.target.value)}
                    placeholder={`Tell us everything. What is your degree? What are your top 5 skills? What do you do on weekends? What are you passionate about? 

Example: I have a B.S. in Biology but I've been working as a UI Designer for 3 years. I'm an expert in Figma and React. In my free time, I love urban gardening and sustainability. I want a role that merges design with environmental impact...`}
                    className="w-full h-64 p-0 bg-transparent border-none focus:ring-0 outline-none text-slate-700 text-lg font-medium leading-relaxed placeholder:text-slate-300 resize-none transition-all"
                  />
                  
                  <div className="mt-8 flex justify-end">
                    <button 
                      type="submit"
                      disabled={!profileText.trim() || profileText.length < 20}
                      className="group bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center space-x-3 uppercase tracking-widest text-sm"
                    >
                      <span>Analyze My Future</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span>Cross-Domain Logic</span>
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span>Passion Alignment</span>
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span>Skill-Market Gap</span>
                </span>
              </div>
            </form>
          </div>
        )}

        {loadingStage !== 'idle' && (
          <LoadingScreen stage={loadingStage} />
        )}

        {results && (
          <ResultsView data={results} onReset={handleReset} />
        )}

        {error && (
          <div className="max-w-md mx-auto p-10 bg-white border border-red-100 rounded-3xl text-center space-y-6 animate-fade-in-up shadow-2xl shadow-red-50">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-100">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-slate-900 text-2xl font-black tracking-tight">Strategy Disrupted</h3>
              <p className="text-slate-500 font-medium">{error}</p>
            </div>
            <button 
              onClick={handleReset}
              className="w-full py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-black transition-colors uppercase tracking-widest text-xs"
            >
              Back to Blueprint
            </button>
          </div>
        )}
      </main>

      <footer className="py-12 px-6 border-t border-slate-200 bg-white/50 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-black">AI</span>
            </div>
            <p className="text-slate-400 text-sm font-black italic tracking-tight">CAREER COACH</p>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Precision Intelligence for the Modern Workforce
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest transition-colors">Usage Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
