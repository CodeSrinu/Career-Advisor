// src/components/mobile/LearningPathDisplay.tsx
'use client';

import { useState } from 'react';
import { LearningPath, LearningPathStep, getProgress, getNextSteps } from '@/lib/learningPath';

interface LearningPathDisplayProps {
  learningPath: LearningPath;
  onBack: () => void;
  onStartStep: (stepId: string) => void;
}



export default function LearningPathDisplay({ learningPath, onBack, onStartStep }: LearningPathDisplayProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStepCompletion = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const toggleStepExpansion = (stepId: string) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
    } else {
      setExpandedStep(stepId);
    }
  };

  const progress = getProgress(learningPath, completedSteps);
  const nextSteps = getNextSteps(learningPath, completedSteps);

  // Get icon for step type
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'reading':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'hands-on':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'project':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'assessment':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={onBack} className="text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-gray-800">Your Learning Path</h1>
          </div>
          <div className="w-6"></div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{learningPath.name}</h2>
          <p className="text-gray-600">{learningPath.description}</p>
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{learningPath.estimatedDuration}</span>
          </div>
        </div>

        {/* Next Steps */}
        {nextSteps.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Next Steps</h3>
            <div className="space-y-3">
              {nextSteps.slice(0, 2).map((step) => (
                <div 
                  key={step.id} 
                  className="p-4 rounded-xl border border-green-200 bg-green-50 cursor-pointer"
                  onClick={() => onStartStep(step.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      {getStepIcon(step.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.duration}</p>
                    </div>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Steps */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">All Steps</h3>
          <div className="space-y-3">
            {learningPath.steps.map((step, index) => (
              <div 
                key={step.id} 
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <div 
                  className={`p-4 flex items-center cursor-pointer ${
                    completedSteps.includes(step.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleStepExpansion(step.id)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                    {completedSteps.includes(step.id) ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-2">
                        {getStepIcon(step.type)}
                      </div>
                      <h4 className={`font-medium ${completedSteps.includes(step.id) ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{step.duration}</p>
                  </div>
                  <button 
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-500 text-white' 
                        : 'border border-gray-300 text-gray-400 hover:border-green-500 hover:text-green-500'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStepCompletion(step.id);
                    }}
                  >
                    {completedSteps.includes(step.id) && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      expandedStep === step.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedStep === step.id && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {step.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {step.resources.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Resources</h5>
                        <div className="space-y-2">
                          {step.resources.map((resource, resourceIndex) => (
                            <a 
                              key={resourceIndex} 
                              href={resource} 
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Resource {resourceIndex + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
                      onClick={() => onStartStep(step.id)}
                    >
                      Start This Step
                    </button>
                    <button
                      className="mt-2 w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all"
                      onClick={() => {
                        // In a real implementation, you would mark the step as complete and move to the next one
                        alert('In a full implementation, you would complete this step and move to the next one.');
                      }}
                    >
                      Mark as Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-green-600 hover:to-green-700"
          onClick={() => {
            const nextStep = nextSteps[0];
            if (nextStep) {
              onStartStep(nextStep.id);
            } else {
              alert('Congratulations! You\'ve completed all steps in this learning path.');
            }
          }}
        >
          {nextSteps.length > 0 ? `Start: ${nextSteps[0].title}` : 'All Steps Completed!'}
        </button>
      </footer>
    </div>
  );
}