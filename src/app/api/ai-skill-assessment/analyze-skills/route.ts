// src/app/api/ai-skill-assessment/analyze-skills/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define TypeScript interfaces for our request
interface SkillQuestion {
  id: string;
  text: string;
  category: 'technical' | 'soft' | 'experience' | 'education';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface AnalyzeSkillsRequest {
  roleId: string;
  roleName: string;
  domainId: string;
  questions: SkillQuestion[];
  answers: Record<string, boolean>;
  openResponse: string;
}

// Define TypeScript interface for our response
interface SkillAssessmentResult {
  skillLevel: number; // 0-4 scale (0: Absolute Beginner, 1: Novice, 2: Apprentice, 3: Advanced, 4: Expert)
  analysisSummary: string;
  strengths: string[];
  learningOpportunities: string[];
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: AnalyzeSkillsRequest = await request.json();
    
    // Log the incoming request
    console.log("=== AI SKILL ANALYSIS API CALLED ===");
    console.log("Request Body:", JSON.stringify(body, null, 2));
    
    // Validate input
    if (!body.roleId || !body.roleName || !body.questions || !body.answers) {
      console.log("ERROR: Missing required fields");
      return NextResponse.json(
        { error: 'Missing required fields: roleId, roleName, questions, answers' },
        { status: 400 }
      );
    }

    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("API Key Available:", !!apiKey);
    
    if (!apiKey) {
      // Fallback response if API key is not available
      console.log("NO API KEY - Using default analysis");
      return NextResponse.json(getDefaultAnalysis());
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // PROMPT FOR ANALYZING USER INPUTS AND GIVING RESULTS
    // This prompt is designed to analyze a student's self-assessed skill level
    const prompt = `ROLE:
You are an expert career mentor and performance coach. Your task is to analyze a student's self-assessed skill level for their chosen career and provide a clear, encouraging, and actionable evaluation.

CONTEXT:
A student has answered a skill assessment test for the career: "${body.roleName}". Analyze their answers below to determine their starting skill level, identify their current strengths, and pinpoint the best learning opportunities for them.

User's Checklist Answers:
${body.questions.map(q => {
  const userAnswer = body.answers[q.id] ? 'Yes' : 'No';
  return '* "' + q.text + '": ' + userAnswer;
}).join('\n')}

User's Open Response Answer: "${body.openResponse || 'No response provided'}"

TASK:
Based on your expert analysis of all the user's answers, perform the following tasks:

1.  Determine Skill Level: Assign a single skill level from 0 to 4 based on the combination of their checklist answers and the depth and quality of their open response.
    * 0: Absolute Beginner (Little to no experience)
    * 1: Novice (Has theoretical knowledge but little practical application)
    * 2: Apprentice (Has completed some small projects or courses)
    * 3: Advanced (Has solid practical experience and can work independently)
    * 4: Expert (Deep knowledge and extensive project experience)
2.  Analysis Summary: Provide a brief, encouraging summary of their current position (2-3 sentences).
3.  Identify Strengths: Based on their positive answers ("Yes" responses) and project descriptions, identify 1-2 key "Strengths." These are the skills they can already build upon.
4.  Identify Learning Opportunities: Based on the gaps in their knowledge (the "No" answers) and their open response, identify the top 2-3 most important "Learning Opportunities." These are the areas they should focus on first.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object.

{
  "skillLevel": 2,
  "analysisSummary": "You have a great foundation! You've started using the right tools and have completed a real project, which puts you at a solid Apprentice level.",
  "strengths": [
    "Practical Experience: You've already built a real website, which is the most important first step.",
    "Tool Familiarity: You have hands-on experience with Figma."
  ],
  "learningOpportunities": [
    "Focus on User Research: Your next big step is to learn how to conduct user research to inform your designs.",
    "Master Prototyping: Learn how to create interactive prototypes in Figma to bring your designs to life.",
    "Learn Design Systems: Understanding design systems is a key skill for working in professional teams."
  ]
}

Important Notes:
1. Treat all "No" answers seriously - they represent genuine gaps in knowledge or experience
2. Focus on the specific tools, technologies, and skills mentioned in the questions
3. Pay special attention to any hands-on experience mentioned in the open response
4. Consider the depth and quality of the open response when determining skill level`;

    console.log("Sending prompt to AI:");
    console.log("--- PROMPT START ---");
    console.log(prompt);
    console.log("--- PROMPT END ---");
    
    // Generate content using the AI model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("AI Response received:");
    console.log("--- RESPONSE START ---");
    console.log(text);
    console.log("--- RESPONSE END ---");
    
    // Parse the JSON response
    // Note: The AI might include markdown formatting, so we need to extract the JSON
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    // Validate that we have a valid JSON string
    if (jsonString.length === 0) {
      console.log("ERROR: AI response did not contain valid JSON");
      throw new Error("AI response did not contain valid JSON");
    }
    
    console.log("Extracted JSON:");
    console.log(jsonString);
    
    const parsedResponse: SkillAssessmentResult = JSON.parse(jsonString);
    
    // Validate that the response has the expected structure
    if (parsedResponse.skillLevel === undefined || !parsedResponse.analysisSummary || 
        !parsedResponse.strengths || !parsedResponse.learningOpportunities) {
      console.log("ERROR: AI response does not have the expected structure");
      throw new Error("AI response does not have the expected structure");
    }
    
    console.log("Successfully parsed AI response");
    
    return NextResponse.json(parsedResponse);
    
  } catch (error: any) {
    console.error("=== ERROR IN AI SKILL ANALYSIS API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    // Return a fallback response in case of error
    console.log("USING FALLBACK ANALYSIS");
    return NextResponse.json(
      getDefaultAnalysis(),
      { status: 200 }
    );
  }
}

// Helper function to format checklist answers
function formatChecklistAnswers(questions: SkillQuestion[], answers: Record<string, boolean>): string {
  return questions.map(q => {
    const userAnswer = answers[q.id] ? 'Yes' : 'No';
    return '* "' + q.text + '": ' + userAnswer;
  }).join('\n');
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