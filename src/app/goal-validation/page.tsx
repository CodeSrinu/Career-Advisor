// src/app/goal-validation/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GoalValidation from '@/components/mobile/GoalValidation';

interface ValidationQuizAnswers {
  primaryDrive: string;
  tenYearVision: string;
  problemSolvingApproach: string;
  preferredLearningStyle: string;
  confidenceRating: string;
}

export default function GoalValidationPage() {
  const router = useRouter();
  const [userGoal, setUserGoal] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [pressureScore, setPressureScore] = useState<number | null>(null);

  // Get user goal from session/local storage or props
  // This is a simplified example - in a real app, you'd get this from context or API
  useEffect(() => {
    // In a real implementation, you would fetch the user's goal from context or API
    // For now, we'll simulate getting the goal from URL params or session
    const goal = typeof window !== 'undefined' ? sessionStorage.getItem('userGoal') || 'Software Engineer' : 'Software Engineer';
    setUserGoal(goal);
  }, []);

  const handleValidationComplete = (answers: Record<number, string>, score: number) => {
    setQuizAnswers(answers);
    setPressureScore(score);
    
    // In a real implementation, you would save the validation results
    // and potentially redirect based on the score
    console.log('Validation complete with score:', score);
  };

  const handleBack = () => {
    // Go back to the previous screen (likely the onboarding screen)
    router.back();
  };

  const handleExploreAlternatives = () => {
    // Navigate to the domain explorer
    router.push('/domain-explorer');
  };

  const handleGetAIRecommendation = () => {
    // Navigate to the main app flow which will show the mobile psychology quiz
    router.push('/?skipOnboarding=true');
  };

  const handleContinueWithGoal = () => {
    // Redirect to the main page with query parameters to trigger deep-dive
    const roleId = `user-goal-${userGoal.toLowerCase().replace(/\s+/g, '-')}`;
    const roleName = userGoal;
    const personaContext = `User has chosen ${userGoal} as their career goal with a pressure score of ${pressureScore}. Primary motivation: ${quizAnswers[0] || 'Not specified'}.`;
    const roleRank = 1;
    
    // Encode the parameters for URL
    const queryParams = new URLSearchParams({
      deepDive: 'true',
      roleId,
      roleName,
      personaContext,
      roleRank: roleRank.toString()
    }).toString();
    
    router.push(`/?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GoalValidation
        userGoal={userGoal}
        onComplete={handleValidationComplete}
        onBack={handleBack}
        onExploreAlternatives={handleExploreAlternatives}
        onGetAIRecommendation={handleGetAIRecommendation}
        onContinueWithGoal={handleContinueWithGoal}
      />
    </div>
  );
}