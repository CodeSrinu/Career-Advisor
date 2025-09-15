// src/components/mobile/AISkillAssessmentResults.tsx
'use client';

import { useState } from 'react';

interface SkillAssessmentResult {
  skillLevel: number; // 0-4 scale (0: Absolute Beginner, 1: Novice, 2: Apprentice, 3: Advanced, 4: Expert)
  analysisSummary: string;
  strengths: string[];
  learningOpportunities: string[];
}

interface AISkillAssessmentResultsProps {
  roleId: string;
  roleName: string;
  result: SkillAssessmentResult;
  onBack: () => void;
  onContinue: () => void;
}

export default function AISkillAssessmentResults({ 
  roleId, 
  roleName, 
  result, 
  onBack, 
  onContinue 
}: AISkillAssessmentResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths'>('overview');

  // Get skill level description
  const getSkillLevelDescription = (level: number) => {
    switch (level) {
      case 0: return 'Absolute Beginner';
      case 1: return 'Novice';
      case 2: return 'Apprentice';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      default: return 'Unknown';
    }
  };

  // Get skill level color
  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-red-100 text-red-800';
      case 1: return 'bg-orange-100 text-orange-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-green-100 text-green-800';
      case 4: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <button 
            onClick={onBack}
            className="text-gray-800 flex size-10 shrink-0 items-center justify-center rounded-full"
            aria-label="Back"
          >
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Your Skill Assessment
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24 flex-grow">
        <div className="pt-4 pb-6 text-center">
          <h2 className="text-gray-800 tracking-tight text-2xl font-bold leading-tight pb-2">
            {roleName} Skill Analysis
          </h2>
          <p className="text-gray-600 text-base font-normal leading-normal">
            Based on your responses, here's your personalized assessment
          </p>
        </div>

        {/* Skill Level Badge */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getSkillLevelColor(result.skillLevel)}`}>
            <span className="mr-2">Level {result.skillLevel}</span>
            <span>({getSkillLevelDescription(result.skillLevel)})</span>
          </div>
        </div>

        {/* Tab Navigation - Removed roadmap tab */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'overview' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'strengths' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('strengths')}
          >
            Insights
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Your Assessment Summary</h3>
              <p className="text-gray-600 mb-4">
                {result.analysisSummary}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(result.skillLevel / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Absolute Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-lg text-blue-800 mb-3">Next Steps</h3>
              <p className="text-blue-700 mb-4">
                {result.skillLevel === 0 
                  ? "You're just starting out. Focus on foundational courses and hands-on beginner projects."
                  : result.skillLevel === 1
                  ? "You have theoretical knowledge. Now it's time to apply it through practical projects."
                  : result.skillLevel === 2
                  ? "You've completed some projects. Focus on specialization and building a stronger portfolio."
                  : result.skillLevel === 3
                  ? "You're quite skilled! Focus on advanced concepts and leadership opportunities."
                  : "You're highly experienced! Consider mentoring others and staying at the cutting edge of your field."}
              </p>
              <p className="text-blue-700">
                Click "Continue to Your Career Roadmap" below to begin your personalized learning journey.
              </p>
            </div>

            {/* Continue Button in Overview Tab */}
            <div className="mt-6">
              <button
                onClick={() => {
                  console.log("Continue button clicked from overview tab");
                  onContinue();
                }}
                className="flex w-full min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#3fe44a] text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-md shadow-green-200/50 hover:bg-green-500 transition-colors"
              >
                <span className="truncate">Continue to Your Career Roadmap</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'strengths' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Your Strengths</h3>
              <div className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Learning Opportunities</h3>
              <div className="space-y-3">
                {result.learningOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-700">{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-lg text-green-800 mb-3">Your Personalized Learning Roadmap</h3>
              <p className="text-green-700 mb-3">
                Based on your skill assessment, we've created a personalized learning roadmap just for you. 
                This roadmap will guide you through a structured path with courses, projects, and rewards 
                designed to help you master {roleName}.
              </p>
              <p className="text-green-700">
                Click "Continue to Your Career Roadmap" below to begin your journey. The roadmap is organized 
                into units and nodes, similar to a gamified path that will keep you motivated and track your progress.
              </p>
            </div>

            {/* Continue Button in Strengths Tab */}
            <div className="mt-6">
              <button
                onClick={() => {
                  console.log("Continue button clicked from strengths tab");
                  onContinue();
                }}
                className="flex w-full min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#3fe44a] text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-md shadow-green-200/50 hover:bg-green-500 transition-colors"
              >
                <span className="truncate">Continue to Your Career Roadmap</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}