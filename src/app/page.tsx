// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import LoginScreen from '@/components/mobile/LoginScreen';
import OnboardingScreen from '@/components/mobile/OnboardingScreen';
import PsychologyQuiz from '@/components/mobile/PsychologyQuiz';
import ResultsPage from '@/components/mobile/ResultsPage';
import RoleDeepDivePage from '@/components/mobile/RoleDeepDivePage';

export default function Home() {
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState<'login' | 'onboarding' | 'psychologyQuiz' | 'results' | 'roleDeepDive'>('login');
  const [onboardingData, setOnboardingData] = useState<{
    language: string;
    state: string;
    hasGoal: boolean;
    goal: string;
  } | null>(null);
  const [psychologyAnswers, setPsychologyAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [selectedRoleName, setSelectedRoleName] = useState<string>('');
  const [personaContext, setPersonaContext] = useState<string>('');
  const [selectedRoleRank, setSelectedRoleRank] = useState<number>(1);

  // Check if user is already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      // If we're still on the login step, check if we should skip onboarding
      if (currentStep === 'login') {
        // Check if we should skip onboarding (coming from goal validation)
        const urlParams = new URLSearchParams(window.location.search);
        const skipOnboarding = urlParams.get('skipOnboarding') === 'true';
        
        if (skipOnboarding) {
          setCurrentStep('psychologyQuiz');
        } else {
          setCurrentStep('onboarding');
        }
      }
    } else if (status === 'unauthenticated') {
      // If user is not authenticated, make sure we're on login step
      if (currentStep !== 'login') {
        setCurrentStep('login');
      }
    }
  }, [status, currentStep]);

  const handleGoogleLogin = () => {
    // Clear any existing onboarding data to ensure user goes through onboarding
    localStorage.removeItem('userLanguage');
    localStorage.removeItem('userState');
    localStorage.removeItem('userGoal');
    localStorage.removeItem('psychologyAnswers');
    
    signIn('google', { callbackUrl: '/' });
  };

  const handleOnboardingComplete = (data: {
    language: string;
    state: string;
    hasGoal: boolean;
    goal: string;
  }) => {
    setOnboardingData(data);
    localStorage.setItem('userLanguage', data.language);
    localStorage.setItem('userState', data.state);
    
    if (data.hasGoal) {
      localStorage.setItem('userGoal', data.goal);
    }
    
    // Always show the psychology quiz
    setCurrentStep('psychologyQuiz');
  };

  const handlePsychologyQuizComplete = (answers: Record<number, string | string[]>) => {
    // Save the psychology answers and proceed to results page
    setPsychologyAnswers(answers);
    localStorage.setItem('psychologyAnswers', JSON.stringify(answers));
    setCurrentStep('results');
  };

  const handleRoleSelect = (roleId: string, roleName: string, personaSummary: string, roleRank: number = 1) => {
    // Set the selected role ID and navigate to the role deep dive page
    setSelectedRoleId(roleId);
    setSelectedRoleName(roleName);
    setPersonaContext(personaSummary);
    setSelectedRoleRank(roleRank);
    setCurrentStep('roleDeepDive');
  };

  const handleStartLearning = () => {
    // In a real implementation, we would start the learning path
    // For now, we'll just show an alert
    alert(`You're ready to start learning! In a full implementation, you would begin your personalized learning path for ${selectedRoleName}.`);
    // setCurrentStep('learningPath');
  };

  const handleLogout = () => {
    localStorage.removeItem('userLanguage');
    localStorage.removeItem('userState');
    localStorage.removeItem('userGoal');
    localStorage.removeItem('psychologyAnswers');
    setOnboardingData(null);
    setCurrentStep('login');
    signOut({ callbackUrl: '/' });
  };

  // Show login screen if user is not authenticated
  if (status === 'unauthenticated' || currentStep === 'login') {
    return <LoginScreen />;
  }

  // Show onboarding screen
  if (currentStep === 'onboarding') {
    return (
      <OnboardingScreen 
        onContinue={handleOnboardingComplete} 
      />
    );
  }

  // Show psychology quiz
  if (currentStep === 'psychologyQuiz') {
    return (
      <PsychologyQuiz 
        onComplete={handlePsychologyQuizComplete}
        onBack={() => setCurrentStep('onboarding')}
      />
    );
  }

  // Show results page with AI-generated recommendations
  if (currentStep === 'results') {
    return (
      <ResultsPage 
        answers={psychologyAnswers}
        onBack={() => setCurrentStep('psychologyQuiz')}
        onSelectRole={handleRoleSelect}
      />
    );
  }

  // Show role deep dive page
  if (currentStep === 'roleDeepDive') {
    return (
      <RoleDeepDivePage 
        roleId={selectedRoleId}
        roleName={selectedRoleName}
        personaContext={personaContext}
        roleRank={selectedRoleRank}
        onBack={() => setCurrentStep('results')}
        onStartLearning={handleStartLearning}
      />
    );
  }

  return null;
}