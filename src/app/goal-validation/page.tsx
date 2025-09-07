// src/app/goal-validation/page.tsx
'use client';

import { useState } from 'react';
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
  useState(() => {
    // In a real implementation, you would fetch the user's goal from context or API
    // For now, we'll simulate getting the goal from URL params or session
    const goal = typeof window !== 'undefined' ? sessionStorage.getItem('userGoal') || 'Software Engineer' : 'Software Engineer';
    setUserGoal(goal);
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      <GoalValidation
        userGoal={userGoal}
        onComplete={handleValidationComplete}
        onBack={handleBack}
        onExploreAlternatives={handleExploreAlternatives}
        onGetAIRecommendation={handleGetAIRecommendation}
      />
    </div>
  );
}