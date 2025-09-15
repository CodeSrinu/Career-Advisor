// src/components/mobile/AISkillAssessment.tsx
'use client';

import { useState, useEffect } from 'react';

interface SkillQuestion {
  id: string;
  text: string;
  category: 'technical' | 'soft' | 'experience' | 'education';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface SkillAssessmentResult {
  skillLevel: number; // 0-4 scale (0: Absolute Beginner, 1: Novice, 2: Apprentice, 3: Advanced, 4: Expert)
  analysisSummary: string;
  strengths: string[];
  learningOpportunities: string[];
}

interface AISkillAssessmentProps {
  roleId: string;
  roleName: string;
  domainId: string;
  onBack: () => void;
  onSubmit: (result: SkillAssessmentResult) => void;
}

export default function AISkillAssessment({ 
  roleId, 
  roleName, 
  domainId, 
  onBack, 
  onSubmit 
}: AISkillAssessmentProps) {
  const [questions, setQuestions] = useState<SkillQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [openResponse, setOpenResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("AISkillAssessment mounted with:", { roleId, roleName, domainId });
  
  // Load questions from AI API
  useEffect(() => {
    console.log("useEffect triggered for:", { roleId, roleName });
    
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Loading questions for:", { roleId, roleName, domainId });
        
        // Call our API to generate career-specific questions
        const response = await fetch('/api/ai-skill-assessment/generate-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roleId, roleName, domainId }),
        });
        
        console.log("Question API response status:", response.status);
        
        if (!response.ok) {
          throw new Error('Failed to load questions');
        }
        
        const data = await response.json();
        console.log("Received questions data:", data);
        
        setQuestions(data.questions);
        
        // Initialize answers
        const initialAnswers: Record<string, boolean> = {};
        data.questions.forEach((q: SkillQuestion) => {
          initialAnswers[q.id] = false;
        });
        setAnswers(initialAnswers);
      } catch (err: any) {
        console.error('Error loading questions:', err);
        setError('Failed to load assessment questions. Using default questions.');
        
        // Fallback to default questions
        const defaultQuestions = getDefaultQuestions(roleId, roleName);
        console.log("Using default questions:", defaultQuestions);
        setQuestions(defaultQuestions);
        
        // Initialize answers
        const initialAnswers: Record<string, boolean> = {};
        defaultQuestions.forEach(q => {
          initialAnswers[q.id] = false;
        });
        setAnswers(initialAnswers);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (roleId && roleName) {
      loadQuestions();
    }
  }, [roleId, roleName]); // Remove domainId from dependencies since it's not used in the effect

  const handleAnswer = (id: string, checked: boolean) => {
    console.log("Updating answer:", { id, checked });
    setAnswers(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSubmit = async () => {
    // Always allow submission - treat unchecked questions as "No" answers
    // No validation needed since unchecked = No is the default behavior
    
    console.log("Submitting assessment with:", { 
      questionCount: questions.length, 
      answerCount: Object.keys(answers).length,
      checkedCount: Object.values(answers).filter(Boolean).length,
      hasOpenResponse: openResponse.trim().length > 0
    });
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Call our API to analyze skills
      // Send ALL questions and answers (unchecked = false = No)
      console.log("Sending analysis request to API...");
      const response = await fetch('/api/ai-skill-assessment/analyze-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          roleId, 
          roleName, 
          domainId, 
          questions, 
          answers, 
          openResponse 
        }),
      });
      
      console.log("Analysis API response status:", response.status);
      
      if (!response.ok) {
        throw new Error('Failed to analyze skills');
      }
      
      const result: SkillAssessmentResult = await response.json();
      console.log("Received analysis result:", result);
      
      // Store assessment data in localStorage for later use in career roadmap
      try {
        const assessmentData = {
          questions,
          answers,
          openResponse
        };
        localStorage.setItem('careerQuest_assessmentData', JSON.stringify(assessmentData));
        console.log("Stored assessment data in localStorage for career roadmap");
      } catch (err) {
        console.error("Error storing assessment data in localStorage:", err);
      }
      
      onSubmit(result);
    } catch (err: any) {
      console.error('Error analyzing skills:', err);
      setError('Failed to analyze your skills. Proceeding with default assessment.');
      
      // Fallback to default analysis
      const defaultResult = getDefaultAnalysis();
      console.log("Using default analysis result:", defaultResult);
      onSubmit(defaultResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const checkedCount = Object.values(answers).filter(Boolean).length;
  
  // Always enable the button - users can submit even without answering anything
  // Unchecked questions will be treated as "No" answers by the AI

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center p-4">
            <div className="text-gray-800 flex size-10 shrink-0 items-center justify-center rounded-full">
              <div className="w-6 h-6 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
            </div>
            <h1 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
              Loading Assessment
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-8 flex-grow flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Generating Your Assessment</h2>
            <p className="text-gray-600">
              Creating personalized questions for {roleName}...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center p-4">
            <div className="text-gray-800 flex size-10 shrink-0 items-center justify-center rounded-full">
              <div className="w-6 h-6 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
            </div>
            <h1 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
              Analyzing Your Skills
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-8 flex-grow flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">AI Analysis in Progress</h2>
            <p className="text-gray-600">
              Our AI is analyzing your skills and generating personalized recommendations...
            </p>
            <div className="mt-6 w-full max-w-md">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            Skill Assessment
          </h1>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mx-4 my-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Main Content */}
      <main className="px-4 pb-8 flex-grow">
        <div className="pt-4 pb-6">
          <h2 className="text-gray-800 tracking-tight text-2xl font-bold leading-tight pb-2">
            Let's check your current skills for {roleName}
          </h2>
          <p className="text-gray-600 text-base font-normal leading-normal">
            This will help us create a personalized learning roadmap for you.
          </p>
        </div>

        {questions.length > 0 && (
          <div className="border-t border-gray-200">
            {questions.map((question) => (
              <div key={question.id} className="flex items-center gap-4 py-4 border-b border-gray-200">
                <input
                  id={question.id}
                  type="checkbox"
                  checked={answers[question.id] || false}
                  onChange={(e) => handleAnswer(question.id, e.target.checked)}
                  className="size-6 shrink-0 appearance-none rounded-md border border-gray-300 bg-white checked:border-[#3fe44a] checked:bg-[#3fe44a] focus:outline-none focus:ring-2 focus:ring-[#3fe44a]/50 focus:ring-offset-2 focus:ring-offset-white"
                  style={{ 
                    backgroundImage: answers[question.id] ? "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27white%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')" : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  }}
                />
                <label 
                  htmlFor={question.id} 
                  className="text-gray-800 text-base font-medium leading-normal flex-1"
                >
                  {question.text}
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-gray-800 text-lg font-bold leading-tight tracking-[-0.015em]">
            Describe Your Experience
          </h3>
          <p className="text-gray-600 text-base font-normal leading-normal mt-1 mb-4">
            Briefly describe any projects, courses, or experience you have in {roleName}.
          </p>
          <textarea
            value={openResponse}
            onChange={(e) => setOpenResponse(e.target.value)}
            placeholder={`e.g., 'I completed a course in ${roleName} and built a project that...'`}
            className="w-full h-40 resize-none rounded-lg border border-gray-200 bg-gray-100 p-4 text-base text-gray-800 placeholder:text-gray-500 focus:border-[#3fe44a] focus:ring-2 focus:ring-[#3fe44a]/50"
          />
        </div>

        {/* Submit Button at the End of Content - NOT FIXED POSITION */}
        <div className="mt-8 mb-8">
          <button
            onClick={handleSubmit}
            className="flex w-full min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-md shadow-green-200/50 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className="truncate">Calculate My Starting Level</span>
          </button>
        </div>
      </main>
    </div>
  );
}

// Default questions for fallback
function getDefaultQuestions(roleId: string, roleName: string): SkillQuestion[] {
  const defaultQuestions: Record<string, SkillQuestion[]> = {
    'software-engineer': [
      { id: 't1', text: 'Have you ever written code in any programming language?', category: 'technical', difficulty: 'beginner' },
      { id: 't2', text: 'Do you understand basic data structures like arrays and lists?', category: 'technical', difficulty: 'beginner' },
      { id: 't3', text: 'Can you debug simple programming errors?', category: 'technical', difficulty: 'beginner' },
      { id: 's1', text: 'Can you explain technical concepts to non-technical people?', category: 'soft', difficulty: 'beginner' },
      { id: 'e1', text: 'Have you built any personal projects, even small ones?', category: 'experience', difficulty: 'beginner' },
      { id: 'e2', text: 'Have you used version control systems like Git?', category: 'experience', difficulty: 'beginner' },
      { id: 't4', text: 'Do you understand basic algorithms like sorting?', category: 'technical', difficulty: 'intermediate' },
      { id: 't5', text: 'Have you worked with databases?', category: 'technical', difficulty: 'intermediate' },
      { id: 's2', text: 'Can you work effectively in a team environment?', category: 'soft', difficulty: 'beginner' },
      { id: 'e3', text: 'Have you completed any coding courses or tutorials?', category: 'education', difficulty: 'beginner' }
    ],
    'data-scientist': [
      { id: 't1', text: 'Have you ever used Python or R for data analysis?', category: 'technical', difficulty: 'beginner' },
      { id: 't2', text: 'Do you understand basic statistics and probability?', category: 'technical', difficulty: 'beginner' },
      { id: 't3', text: 'Can you clean and preprocess messy data?', category: 'technical', difficulty: 'beginner' },
      { id: 's1', text: 'Can you translate business questions into analytical frameworks?', category: 'soft', difficulty: 'beginner' },
      { id: 'e1', text: 'Have you worked on any data analysis projects?', category: 'experience', difficulty: 'beginner' },
      { id: 'e2', text: 'Have you created data visualizations?', category: 'experience', difficulty: 'beginner' },
      { id: 't4', text: 'Do you understand machine learning concepts?', category: 'technical', difficulty: 'intermediate' },
      { id: 't5', text: 'Have you used SQL to query databases?', category: 'technical', difficulty: 'intermediate' },
      { id: 's2', text: 'Can you communicate insights effectively?', category: 'soft', difficulty: 'intermediate' },
      { id: 'e3', text: 'Have you completed any data science courses?', category: 'education', difficulty: 'beginner' }
    ],
    'default': [
      { id: 't1', text: 'Have you worked with computers regularly?', category: 'technical', difficulty: 'beginner' },
      { id: 's1', text: 'Do you communicate effectively with others?', category: 'soft', difficulty: 'beginner' },
      { id: 'e1', text: 'Have you completed any relevant courses or training?', category: 'education', difficulty: 'beginner' },
      { id: 'e2', text: 'Have you worked on any projects, even personal ones?', category: 'experience', difficulty: 'beginner' },
      { id: 't2', text: 'Are you comfortable learning new software tools?', category: 'technical', difficulty: 'beginner' },
      { id: 's2', text: 'Can you work in team environments?', category: 'soft', difficulty: 'beginner' },
      { id: 'e3', text: 'Have you solved problems systematically?', category: 'experience', difficulty: 'beginner' },
      { id: 't3', text: 'Are you committed to continuous learning?', category: 'technical', difficulty: 'beginner' },
      { id: 's3', text: 'Can you adapt to new situations?', category: 'soft', difficulty: 'beginner' },
      { id: 'e4', text: 'Have you sought out learning opportunities?', category: 'education', difficulty: 'beginner' }
    ]
  };
  
  if (defaultQuestions[roleId]) {
    return defaultQuestions[roleId];
  } else if (defaultQuestions['default']) {
    return defaultQuestions['default'];
  } else {
    return [
      { id: 'q1', text: 'Have you worked in this field before?', category: 'experience', difficulty: 'beginner' },
      { id: 'q2', text: 'Are you committed to learning and growing?', category: 'soft', difficulty: 'beginner' }
    ];
  }
}

// Default analysis for fallback
function getDefaultAnalysis(): SkillAssessmentResult {
  return {
    skillLevel: 1,
    analysisSummary: "You're taking your first steps in this exciting field! Your enthusiasm to learn is your greatest asset. With dedication and the right guidance, you'll progress quickly.",
    strengths: ["Enthusiasm to learn", "Willingness to grow"],
    learningOpportunities: [
      "Start with foundational courses in your chosen field",
      "Complete hands-on beginner projects",
      "Join online communities and forums for support",
      "Practice regularly to build muscle memory"
    ]
  };
}