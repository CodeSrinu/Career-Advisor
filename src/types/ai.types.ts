// src/types/ai.types.ts
export interface AIRecommendationResponse {
  personaName: string;
  personaSummary: string;
  recommendedRoles: Array<{
    role: string;
    reason: string;
  }>;
}

export interface AIDeepDiveResponse {
  role: string;
  description: string;
  dailyResponsibilities: string[];
  salaryRange: {
    entry: string;
    mid: string;
    senior: string;
  };
  careerPath: string[];
  requiredSkills: string[];
  education: string;
  jobMarket: string;
}