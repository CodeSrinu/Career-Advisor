// src/app/learning-path/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LearningPathDisplay from '@/components/mobile/LearningPathDisplay';
import { generateLearningPath, LearningPath } from '@/lib/learningPath';
import SuspenseWrapper from '@/components/SuspenseWrapper';

export default function LearningPathPage() {
  return (
    <SuspenseWrapper>
      <LearningPathPageContent />
    </SuspenseWrapper>
  );
}

function LearningPathPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams?.get('roleId') || '';
  const roleName = searchParams?.get('roleName') || '';
  const domainId = searchParams?.get('domainId') || '';
  const skillLevel = parseInt(searchParams?.get('skillLevel') || '1');
  
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLearningPath = async () => {
      try {
        setLoading(true);
        // Use the skillLevel from URL params to determine the appropriate learning path
        const path = await generateLearningPath(roleId, roleName, skillLevel, [], domainId);
        setLearningPath(path);
      } catch (err) {
        console.error('Error loading learning path:', err);
        setError('Failed to generate your personalized learning path. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (roleId || domainId) {
      loadLearningPath();
    }
  }, [roleId, roleName, domainId, skillLevel]);

  const handleBack = () => {
    router.back();
  };

  const handleStartStep = (stepId: string) => {
    // In a real implementation, you would navigate to the specific step
    alert(`Starting step: ${stepId}

In a full implementation, you would begin this learning activity.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-gray-800">Generating Your Learning Path</h1>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-600">Creating your personalized learning path...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {learningPath && (
        <LearningPathDisplay 
          learningPath={learningPath} 
          onBack={handleBack}
          onStartStep={handleStartStep}
        />
      )}
    </div>
  );
}