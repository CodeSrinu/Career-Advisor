// src/app/learning-module/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  progress: number; // 0-100
  modules: LearningContentModule[];
}

interface LearningContentModule {
  id: string;
  type: 'lecture' | 'cheat-sheet' | 'quiz' | 'project' | 'assignment';
  title: string;
  description: string;
  duration?: string;
  status: 'completed' | 'available' | 'locked';
}

export default function LearningModulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nodeId = searchParams.get('nodeId') || '';
  const roleId = searchParams.get('roleId') || '';
  const roleName = searchParams.get('roleName') || '';
  const domainId = searchParams.get('domainId') || '';
  
  const [learningModule, setLearningModule] = useState<LearningModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLearningModule = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Loading learning module for:", { nodeId, roleId, roleName, domainId });
        
        // Call our API to generate the course roadmap
        const response = await fetch('/api/course-roadmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            courseId: nodeId, 
            courseTitle: 'HTML & CSS Deep Dive', // This would be dynamically determined
            careerField: roleName 
          }),
        });
        
        console.log("Course Roadmap API response status:", response.status);
        
        if (!response.ok) {
          throw new Error('Failed to load course roadmap');
        }
        
        const data = await response.json();
        console.log("Received course roadmap data:", data);
        
        // Transform the course roadmap data to our internal format
        const transformedModule: LearningModule = {
          id: nodeId,
          title: data.roadmap.courseTitle,
          description: `A comprehensive guide to ${data.roadmap.courseTitle}.`,
          duration: '2 weeks', // This would be dynamically determined
          difficulty: 'beginner', // This would be dynamically determined
          progress: 40, // This would be dynamically determined
          modules: data.roadmap.learningUnits.map((unit: any, index: number) => ({
            id: `unit_${index}`,
            type: unit.type === 'lecture' ? 'lecture' : 
                  unit.type === 'task' ? 'assignment' : 
                  unit.type === 'quiz' ? 'quiz' : 'cheat-sheet',
            title: unit.title,
            description: unit.description || `Learn ${unit.title}`,
            duration: '20 min', // This would be dynamically determined
            status: index === 0 ? 'available' : index < 3 ? 'completed' : 'locked'
          }))
        };
        
        setLearningModule(transformedModule);
      } catch (err: any) {
        console.error('Error loading learning module:', err);
        setError('Failed to load the learning module. Please try again.');
        
        // Fallback to mock data
        const mockModule: LearningModule = {
          id: nodeId,
          title: 'HTML & CSS Deep Dive',
          description: 'A comprehensive guide to modern web development.',
          duration: '2 weeks',
          difficulty: 'beginner',
          progress: 40,
          modules: [
            {
              id: 'lecture1',
              type: 'lecture',
              title: 'Lecture 1: Semantic HTML',
              description: 'Learn the fundamentals of semantic HTML tags and their proper usage.',
              duration: '20 min',
              status: 'completed'
            },
            {
              id: 'cheat1',
              type: 'cheat-sheet',
              title: 'Cheat Sheet: HTML Tags',
              description: 'Quick reference guide for commonly used HTML tags and attributes.',
              duration: '10 min',
              status: 'completed'
            },
            {
              id: 'quiz1',
              type: 'quiz',
              title: 'Quiz 1: HTML Basics',
              description: 'Test your knowledge of HTML fundamentals.',
              duration: '15 min',
              status: 'available'
            },
            {
              id: 'lecture2',
              type: 'lecture',
              title: 'Lecture 2: CSS Fundamentals',
              description: 'Introduction to CSS styling and selectors.',
              duration: '25 min',
              status: 'locked'
            },
            {
              id: 'cheat2',
              type: 'cheat-sheet',
              title: 'Cheat Sheet: CSS Selectors',
              description: 'Comprehensive guide to CSS selectors and their usage.',
              duration: '12 min',
              status: 'locked'
            },
            {
              id: 'quiz2',
              type: 'quiz',
              title: 'Quiz 2: CSS Styling',
              description: 'Test your knowledge of CSS styling techniques.',
              duration: '20 min',
              status: 'locked'
            }
          ]
        };
        
        setLearningModule(mockModule);
      } finally {
        setLoading(false);
      }
    };
    
    if (nodeId) {
      loadLearningModule();
    } else {
      setError('No module specified');
    }
  }, [nodeId, roleId, roleName, domainId]);

  const handleBack = () => {
    router.back();
  };

  const handleStartModule = (moduleId: string) => {
    // In a real implementation, you would navigate to the specific module
    alert(`Starting module: ${moduleId}

In a full implementation, you would begin this learning activity.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center p-4">
            <div className="text-gray-800 flex size-10 shrink-0 items-center justify-center rounded-full">
              <div className="w-6 h-6 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
            </div>
            <h1 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
              Loading Module
            </h1>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-4 flex-grow">
          <div className="pt-4 pb-6 text-center">
            <h2 className="text-gray-800 tracking-tight text-2xl font-bold leading-tight pb-2">
              Preparing Your Learning Content
            </h2>
            <p className="text-gray-600 text-base font-normal leading-normal">
              Getting your personalized learning module ready...
            </p>
          </div>
          
          {/* Module Skeleton */}
          <div className="space-y-4 mt-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Module</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={handleBack}
          >
            Back to Roadmap
          </button>
        </div>
      </div>
    );
  }

  if (!learningModule) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Module Not Found</h1>
          <p className="text-gray-600 mb-6">The requested learning module could not be found.</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={handleBack}
          >
            Back to Roadmap
          </button>
        </div>
      </div>
    );
  }

  // Get icon for module type
  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'play_circle';
      case 'cheat-sheet':
        return 'description';
      case 'quiz':
        return 'help_outline';
      case 'project':
        return 'code';
      case 'assignment':
        return 'assignment';
      default:
        return 'school';
    }
  };

  // Get icon color based on status
  const getIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'available':
        return 'text-green-500 bg-green-50';
      case 'locked':
        return 'text-gray-400 bg-gray-100';
      default:
        return 'text-gray-400 bg-gray-100';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'check_circle';
      case 'available':
        return 'play_circle';
      case 'locked':
        return 'lock';
      default:
        return 'lock';
    }
  };

  // Get status icon color
  const getStatusIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'available':
        return 'text-green-500';
      case 'locked':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between group/design-root overflow-x-hidden" style={{ fontFamily: "'Space Grotesk', 'Noto Sans', sans-serif" }}>
      <div className="flex-grow">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center p-4">
            <button 
              onClick={handleBack}
              className="text-gray-800 flex size-10 shrink-0 items-center justify-center rounded-full"
              aria-label="Back"
            >
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <h1 className="text-gray-800 text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
              Course Dashboard
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 @container">
          {/* Progress Card */}
          <div className="mb-6 rounded-xl bg-green-50 p-5 shadow-sm">
            <div className="flex items-center gap-5">
              {/* Progress Circle */}
              <div className="relative size-24">
                <svg className="size-full" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                  <circle className="stroke-gray-200" cx="18" cy="18" fill="none" r="16" stroke-width="3"></circle>
                  <circle 
                    className="stroke-green-500" 
                    cx="18" 
                    cy="18" 
                    fill="none" 
                    r="16" 
                    stroke-dasharray="100" 
                    stroke-dashoffset={100 - learningModule.progress} 
                    stroke-linecap="round" 
                    stroke-width="3" 
                    transform="rotate(-90 18 18)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-gray-800">{learningModule.progress}%</span>
                  <span className="text-xs text-gray-600">Complete</span>
                </div>
              </div>
              
              {/* Module Info */}
              <div className="flex-1">
                <h2 className="text-gray-800 text-xl font-bold leading-tight tracking-[-0.015em]">
                  {learningModule.title}
                </h2>
                <p className="text-gray-600 text-sm font-normal leading-normal mt-1">
                  {learningModule.description}
                </p>
              </div>
            </div>
          </div>

          {/* Learning Modules List */}
          <div className="space-y-3">
            {learningModule.modules.map((module) => (
              <div 
                key={module.id}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                  module.status === 'locked' ? 'opacity-70' : ''
                }`}
                onClick={() => module.status !== 'locked' && handleStartModule(module.id)}
              >
                {/* Module Icon */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getIconColor(module.status)}`}>
                  <span className="material-symbols-outlined">
                    {getModuleIcon(module.type)}
                  </span>
                </div>
                
                {/* Module Info */}
                <div className="flex-1">
                  <p className={`text-base font-medium leading-normal ${
                    module.status === 'locked' ? 'text-gray-500' : 'text-gray-800'
                  }`}>
                    {module.title}
                  </p>
                </div>
                
                {/* Status Icon */}
                <span className={`material-symbols-outlined text-2xl ${getStatusIconColor(module.status)}`}>
                  {getStatusIcon(module.status)}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}