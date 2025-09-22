// src/app/skill-assessment/page.tsx
'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AISkillAssessment from '@/components/mobile/AISkillAssessment';
import AISkillAssessmentResults from '@/components/mobile/AISkillAssessmentResults';
import SuspenseWrapper from '@/components/SuspenseWrapper';

interface SkillAssessmentResult {
  skillLevel: number; // 0-4 scale (0: Absolute Beginner, 1: Novice, 2: Apprentice, 3: Advanced, 4: Expert)
  analysisSummary: string;
  strengths: string[];
  learningOpportunities: string[];
}

export default function SkillAssessmentPage() {
  return (
    <SuspenseWrapper>
      <SkillAssessmentPageContent />
    </SuspenseWrapper>
  );
}

function SkillAssessmentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams?.get('roleId') || '';
  const roleName = searchParams?.get('roleName') || '';
  const domainId = searchParams?.get('domainId') || '';
  
  const [assessmentResult, setAssessmentResult] = useState<SkillAssessmentResult | null>(null);

  const handleBack = () => {
    if (assessmentResult) {
      // Go back to the assessment
      setAssessmentResult(null);
    } else {
      // Go back to the previous page
      router.back();
    }
  };

  const handleSubmit = (result: SkillAssessmentResult) => {
    setAssessmentResult(result);
  };

  const handleContinue = () => {
    // Store assessment data in localStorage before navigating
    console.log("handleContinue called with:", { roleId, roleName, domainId, assessmentResult });
    
    // Navigate to the Career Quest roadmap page
    const skillLevel = assessmentResult?.skillLevel || 0;
    const url = `/career-quest?roleId=${roleId}&roleName=${encodeURIComponent(roleName)}&domainId=${domainId}&startingLevel=${skillLevel}`;
    console.log("Navigating to:", url);
    router.push(url);
  };

  if (!roleId && !domainId) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Request</h1>
          <p className="text-gray-600 mb-6">Missing required parameters for skill assessment.</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (assessmentResult) {
    return (
      <div className="min-h-screen bg-white">
        <AISkillAssessmentResults
          roleId={roleId}
          roleName={roleName}
          result={assessmentResult}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AISkillAssessment
        roleId={roleId}
        roleName={roleName}
        domainId={domainId}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
}