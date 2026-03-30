
import React from 'react';
import { LoadingStage } from '../types';

interface LoadingScreenProps {
  stage: LoadingStage;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ stage }) => {
  const getProgress = () => {
    switch (stage) {
      case 'searching': return 'w-1/3';
      case 'analyzing': return 'w-2/3';
      case 'drafting': return 'w-full';
      default: return 'w-0';
    }
  };

  const getLabel = () => {
    switch (stage) {
      case 'searching': return 'Searching Job Market Trends 2026-2027...';
      case 'analyzing': return 'Analyzing Growth Sectors & Skill Gaps...';
      case 'drafting': return 'Drafting Personal Growth Strategy...';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 space-y-8 animate-fade-in-up">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <div className="text-center space-y-4 max-w-md">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Consulting Intelligence
        </h3>
        <p className="text-slate-500 font-medium">
          {getLabel()}
        </p>
        
        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full bg-indigo-600 transition-all duration-700 ease-in-out ${getProgress()}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
