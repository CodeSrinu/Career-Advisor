// src/lib/skillAssessment.ts

interface SkillQuestion {
  id: number;
  text: string;
}

interface SkillAssessmentResult {
  level: number; // 0-4 (0: Absolute Beginner, 1: Novice, 2: Intermediate, 3: Advanced, 4: Expert)
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  gaps: string[];
  needsPrerequisites: boolean;
  startingLevel: number; // Level in the learning path to start at
  analysis: string; // AI-generated analysis of the user's skills
  strengths: string[]; // AI-identified strengths
  weaknesses: string[]; // AI-identified areas for improvement
}

// Calculate skill level based on correct answers
export function calculateSkillLevel(
  correctAnswers: number,
  openResponse: string,
  questions: SkillQuestion[],
  roleId: string = 'default',
  roleName: string = 'General'
): Promise<SkillAssessmentResult> {
  return new Promise(async (resolve) => {
    // Get AI analysis
    const aiAnalysis = await analyzeSkillsWithAI(questions, correctAnswers, openResponse, roleId, roleName);
    
    resolve({
      level: aiAnalysis.level,
      correctAnswers,
      totalQuestions: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
      gaps: [], // This would be populated with specific skill gaps
      needsPrerequisites: aiAnalysis.needsPrerequisites,
      startingLevel: aiAnalysis.startingLevel,
      analysis: aiAnalysis.analysis,
      strengths: aiAnalysis.strengths,
      weaknesses: aiAnalysis.weaknesses
    });
  });
}

// Analyze skills with AI
async function analyzeSkillsWithAI(
  questions: SkillQuestion[],
  correctAnswers: number,
  openResponse: string,
  roleId: string,
  roleName: string
): Promise<{ analysis: string; strengths: string[]; weaknesses: string[]; level: number; startingLevel: number; needsPrerequisites: boolean }> {
  try {
    // Create boolean array of answers (for now, we'll pass empty array and let the API handle it)
    const answers: boolean[] = Array(questions.length).fill(false);
    
    // Call our API route to generate AI analysis
    const response = await fetch('/api/skill-assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        correctAnswers, 
        totalQuestions: questions.length, 
        openResponse, 
        questions,
        answers, // Pass the answers array
        roleId,
        roleName
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to analyze skills with AI API');
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error analyzing skills with AI:", error.message);
    // Fallback response if AI fails
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const level = percentage <= 20 ? 0 : percentage <= 40 ? 1 : percentage <= 60 ? 2 : percentage <= 80 ? 3 : 4;
    const startingLevel = Math.max(1, level * 1.5);
    const needsPrerequisites = level < 2;
    
    return {
      analysis: "Based on your assessment results, we've analyzed your skill level. You have a good foundation but can improve in several areas.",
      strengths: ["Foundational knowledge", "Practical experience", "Learning motivation"],
      weaknesses: ["Advanced concepts", "Industry tools", "Project complexity"],
      level,
      startingLevel,
      needsPrerequisites
    };
  }
}

// Identify gaps based on incorrect answers
export function identifyGaps(
  answers: boolean[],
  questions: SkillQuestion[]
): string[] {
  const gaps: string[] = [];
  
  // For each incorrect answer, add the question to gaps
  answers.forEach((answer, index) => {
    if (!answer && questions[index]) {
      gaps.push(questions[index].text);
    }
  });
  
  return gaps;
}

// Get level name based on level number
export function getLevelName(level: number): string {
  switch (level) {
    case 0: return 'Absolute Beginner';
    case 1: return 'Novice';
    case 2: return 'Intermediate';
    case 3: return 'Advanced';
    case 4: return 'Expert';
    default: return 'Unknown';
  }
}

// Get level description based on level number
export function getLevelDescription(level: number): string {
  switch (level) {
    case 0: 
      return 'Just starting out. You\'ll need foundational knowledge before diving into practical projects.';
    case 1: 
      return 'Basic understanding. You\'re ready for introductory projects with some guidance.';
    case 2: 
      return 'Solid foundation. You can work on intermediate projects with occasional support.';
    case 3: 
      return 'Strong skills. You can tackle advanced projects and solve complex problems.';
    case 4: 
      return 'Expert level. You\'re ready for mastery projects and can mentor others.';
    default: 
      return 'Unknown level.';
  }
}

// Get prerequisite recommendation based on level
export function getPrerequisiteRecommendation(level: number): string {
  switch (level) {
    case 0: 
      return 'Complete our foundational course to build essential skills before starting projects.';
    case 1: 
      return 'Review basic concepts and complete a few guided projects to strengthen your foundation.';
    case 2: 
      return 'Jump right into hands-on projects with our intermediate curriculum.';
    case 3: 
      return 'Start with advanced challenges and complex problem-solving exercises.';
    case 4: 
      return 'Begin with mastery-level projects and consider mentoring others.';
    default: 
      return 'Complete foundational learning before starting projects.';
  }
}