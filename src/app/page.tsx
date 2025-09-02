// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import LoginScreen from '@/components/mobile/LoginScreen';
import OnboardingScreen from '@/components/mobile/OnboardingScreen';
import PsychologyQuiz from '@/components/mobile/PsychologyQuiz';
import DomainExplorer from '@/components/mobile/DomainExplorer';
import ResultsPage from '@/components/mobile/ResultsPage';
import DomainExplorerPage from '@/components/mobile/DomainExplorerPage';
import SubRoleDeepDivePage from '@/components/mobile/SubRoleDeepDivePage';

export default function Home() {
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState<'login' | 'onboarding' | 'psychologyQuiz' | 'results' | 'domainExplorerPage' | 'subRoleDeepDive'>('login');
  const [onboardingData, setOnboardingData] = useState<{
    language: string;
    state: string;
    hasGoal: boolean;
    goal: string;
  } | null>(null);
  const [psychologyAnswers, setPsychologyAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedDomainId, setSelectedDomainId] = useState<string>('');
  const [selectedSubRoleId, setSelectedSubRoleId] = useState<string>('');

  // Check if user is already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      // If we're still on the login step, send user to onboarding
      if (currentStep === 'login') {
        setCurrentStep('onboarding');
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
      // Instead of going directly to domain explorer, we should go to results first
      // Then results page can determine the domain based on the goal
      setCurrentStep('results');
    } else {
      // User wants to explore, show psychology quiz
      setCurrentStep('psychologyQuiz');
    }
  };

  const handlePsychologyQuizComplete = (answers: Record<number, string | string[]>) => {
    // In a real implementation, we would calculate domain matches based on answers
    // For now, we'll just proceed to results page
    setPsychologyAnswers(answers);
    localStorage.setItem('psychologyAnswers', JSON.stringify(answers));
    setCurrentStep('results');
  };

  const handleDomainSelect = (domainId: string) => {
    // Set the selected domain ID and navigate to the domain explorer page
    setSelectedDomainId(domainId);
    setCurrentStep('domainExplorerPage');
  };

  const handleSelectSubRole = (subRoleId: string) => {
    // Set the selected sub-role ID and navigate to the sub-role deep dive page
    setSelectedSubRoleId(subRoleId);
    setCurrentStep('subRoleDeepDive');
  };

  const handleStartLearning = () => {
    // In a real implementation, we would start the learning path
    // For now, we'll just show an alert
    alert(`You're ready to start learning! In a full implementation, you would begin your personalized learning path for ${selectedSubRoleId}.`);
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

  // Show results page
  if (currentStep === 'results') {
    return (
      <ResultsPage 
        answers={psychologyAnswers}
        onBack={() => setCurrentStep('psychologyQuiz')}
        onSelectDomain={handleDomainSelect}
      />
    );
  }

  // Show domain explorer page
  if (currentStep === 'domainExplorerPage') {
    return (
      <DomainExplorerPage 
        domainId={selectedDomainId}
        onBack={() => setCurrentStep('results')}
        onSelectSubRole={handleSelectSubRole}
      />
    );
  }

  // Show sub-role deep dive page
  if (currentStep === 'subRoleDeepDive') {
    return (
      <SubRoleDeepDivePage 
        subRoleId={selectedSubRoleId}
        domainId={selectedDomainId}
        onBack={() => setCurrentStep('domainExplorerPage')}
        onStartLearning={handleStartLearning}
      />
    );
  }

  return null;
}