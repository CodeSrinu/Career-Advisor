// src/app/api/skill-assessment/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define TypeScript interface for our request
interface SkillAssessmentRequest {
  correctAnswers: number;
  totalQuestions: number;
  openResponse: string;
  questions: Array<{ id: number; text: string }>;
  answers: boolean[]; // Array of boolean answers
  roleId: string;
  roleName: string;
}

// Define TypeScript interface for our response
interface SkillAssessmentResponse {
  analysis: string;
  strengths: string[];
  weaknesses: string[];
  level: number;
  startingLevel: number;
  needsPrerequisites: boolean;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: SkillAssessmentRequest = await request.json();
    
    // Validate input
    if (!body.correctAnswers || !body.totalQuestions || !body.questions || !body.answers) {
      return NextResponse.json(
        { error: 'Missing required fields: correctAnswers, totalQuestions, questions, answers' },
        { status: 400 }
      );
    }

    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // Fallback response if API key is not available
      return NextResponse.json({
        analysis: "Based on your assessment results, we've analyzed your skill level. You have a good foundation but can improve in several areas.",
        strengths: ["Foundational knowledge", "Practical experience", "Learning motivation"],
        weaknesses: ["Advanced concepts", "Industry tools", "Project complexity"],
        level: Math.floor((body.correctAnswers / body.totalQuestions) * 4),
        startingLevel: Math.max(1, Math.floor((body.correctAnswers / body.totalQuestions) * 6)),
        needsPrerequisites: (body.correctAnswers / body.totalQuestions) < 0.5
      });
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Construct the prompt for the AI
    const prompt = `
      ROLE: You are an expert career counselor and skills assessor for the Indian job market.
      
      CONTEXT: A student has completed a skill assessment test with ${body.totalQuestions} questions and provided an open response about their experience.
      
      SKILL ASSESSMENT DATA:
      - Role: ${body.roleName || 'Not specified'}
      - Correct Answers: ${body.correctAnswers} out of ${body.totalQuestions}
      - Percentage Score: ${Math.round((body.correctAnswers / body.totalQuestions) * 100)}%
      
      QUESTIONS AND ANSWERS:
      ${body.questions.map((q, i) => `${q.id}. ${q.text}: ${body.answers[i] ? 'YES' : 'NO'}`).join('\n')}
      
      OPEN RESPONSE:
      "${body.openResponse || 'No response provided'}"
      
      TASK:
      Based on the assessment data, provide:
      1. A comprehensive analysis of the student's skill level (2-3 sentences)
      2. 3 key strengths the student has demonstrated
      3. 3 areas for improvement the student should focus on
      4. A skill level from 0-4 (0: Absolute Beginner, 1: Novice, 2: Intermediate, 3: Advanced, 4: Expert)
      5. A starting level from 1-6 for their learning path
      6. Whether they need prerequisites (true/false)
      
      OUTPUT FORMAT:
      Return a JSON object with the following structure:
      {
        "analysis": "Comprehensive analysis text",
        "strengths": ["strength1", "strength2", "strength3"],
        "weaknesses": ["weakness1", "weakness2", "weakness3"],
        "level": 0,
        "startingLevel": 1,
        "needsPrerequisites": true
      }
    `;

    // Generate content using the AI model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    // Note: The AI might include markdown formatting, so we need to extract the JSON
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    // Validate that we have a valid JSON string
    if (jsonString.length === 0) {
      throw new Error("AI response did not contain valid JSON");
    }
    
    const parsedResponse: SkillAssessmentResponse = JSON.parse(jsonString);
    
    // Validate that the response has the expected structure
    if (!parsedResponse.analysis || !parsedResponse.strengths || !parsedResponse.weaknesses) {
      throw new Error("AI response does not have the expected structure");
    }
    
    return NextResponse.json(parsedResponse);
    
  } catch (error: any) {
    console.error("Error in skill assessment API:", error);
    
    // Return a fallback response in case of error
    return NextResponse.json(
      {
        analysis: "Based on your assessment results, we've analyzed your skill level. You have a good foundation but can improve in several areas.",
        strengths: ["Foundational knowledge", "Practical experience", "Learning motivation"],
        weaknesses: ["Advanced concepts", "Industry tools", "Project complexity"],
        level: 1,
        startingLevel: 1,
        needsPrerequisites: true
      },
      { status: 200 }
    );
  }
}