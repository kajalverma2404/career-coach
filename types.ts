
export interface CareerRecommendation {
  role: string;
  explanation: string;
  matchScore: number;
  nextSkills: string[];
  personalSynergy: string;
}

export interface CareerAnalysis {
  strategistOutlook: string;
  recommendations: CareerRecommendation[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  analysis: CareerAnalysis;
  sources: GroundingSource[];
}

export type LoadingStage = 'idle' | 'searching' | 'analyzing' | 'drafting';
