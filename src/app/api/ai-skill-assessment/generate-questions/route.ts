// src/app/api/ai-skill-assessment/generate-questions/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define TypeScript interface for our request
interface GenerateQuestionsRequest {
  roleId: string;
  roleName: string;
  domainId: string;
}

// Define TypeScript interface for our response
interface SkillQuestion {
  id: string;
  text: string;
  category: 'technical' | 'soft' | 'experience' | 'education';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface GenerateQuestionsResponse {
  questions: SkillQuestion[];
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: GenerateQuestionsRequest = await request.json();
    
    // Log the incoming request
    console.log("=== AI QUESTION GENERATION API CALLED ===");
    console.log("Request body:", body);
    console.log("Timestamp:", new Date().toISOString());
    
    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("API Key available:", !!apiKey);
    if (apiKey) {
      console.log("API Key length:", apiKey.length);
      console.log("API Key starts with:", apiKey.substring(0, 10) + "...");
    } else {
      console.log("API Key is NULL or UNDEFINED");
      console.log("Available env vars:", Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API')).length);
      // List some environment variables (without exposing sensitive data)
      Object.keys(process.env).forEach(key => {
        if (key.includes('GEMINI') || key.includes('API') || key.includes('KEY')) {
          console.log(`Env var ${key}:`, process.env[key] ? 'SET' : 'NOT SET');
        }
      });
    }
    
    if (!apiKey) {
      console.log("NO API KEY - Using default questions");
      // Fallback response if API key is not available
      return NextResponse.json({
        questions: getDefaultQuestions(body.roleId, body.roleName)
      });
    }
    console.log("Request Body:", JSON.stringify(body, null, 2));
    
    // Validate input
    if (!body.roleId || !body.roleName) {
      console.log("ERROR: Missing required fields");
      return NextResponse.json(
        { error: 'Missing required fields: roleId, roleName' },
        { status: 400 }
      );
    }

    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("API Key Available:", !!apiKey);
    console.log("API Key Length:", apiKey ? apiKey.length : 0);
    console.log("Role ID:", body.roleId);
    console.log("Role Name:", body.roleName);
    console.log("Full API Key (first 10 chars):", apiKey ? apiKey.substring(0, 10) + "..." : "NONE");
    
    if (!apiKey) {
      console.log("NO API KEY - Using default questions");
      // Fallback response if API key is not available
      return NextResponse.json({
        questions: getDefaultQuestions(body.roleId, body.roleName)
      });
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // PROMPT FOR GENERATING QUESTIONS - SKILL LEVEL TEST
    // This prompt is designed to create a comprehensive skill assessment for beginners
    const prompt = `ROLE:
You are a senior hiring manager and technical lead with 15+ years of experience in ${body.roleName}. Your task is to create a concise and practical skill assessment test for a beginner who is new to the field.

CONTEXT:
A user has selected "${body.roleName}" as their career path. Generate a structured skill assessment to accurately gauge their current foundational knowledge and practical experience.

TASK:
Generate a structured skill assessment consisting of exactly 10 specific "Yes/No" or "Have you ever..." style questions. These questions should cover the most important foundational tools, concepts, and practical skills that a beginner should be familiar with for ${body.roleName}.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object with exactly this structure:

{
  "questions": [
    "Have you ever worked with [SPECIFIC_TOOL_OR_TECHNOLOGY_RELEVANT_TO_THIS_ROLE]?",
    "Do you understand [CORE_CONCEPT_RELEVANT_TO_THIS_ROLE]?",
    "Have you built or contributed to [TYPE_OF_PROJECT_RELEVANT_TO_THIS_ROLE]?",
    // ... exactly 10 total questions specific to ${body.roleName}
  ]
}

EXAMPLE OUTPUT FORMAT (for a Software Engineer role):
{
  "questions": [
    "Have you ever written code in any programming language?",
    "Do you understand basic data structures like arrays and lists?",
    "Can you debug simple programming errors?",
    "Have you used version control systems like Git?",
    "Have you built any personal projects, even small ones?",
    "Do you understand basic algorithms like sorting?",
    "Have you worked with databases?",
    "Can you explain technical concepts to non-technical people?",
    "Can you work effectively in a team environment?",
    "Have you completed any coding courses or tutorials?"
  ]
}

Additional Requirements:
1. Focus exclusively on ${body.roleName} - do not provide generic examples
2. Ask about specific tools, technologies, and frameworks commonly used in ${body.roleName}
3. Ask about hands-on experience with actual projects or coursework
4. Ask about specific knowledge areas relevant to ${body.roleName}
5. Questions should help determine the user's current skill level in ${body.roleName}
6. Do not use generic examples like "Figma, Sketch, or Adobe XD" unless ${body.roleName} specifically involves design tools`;

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
    
    // Parse and transform the response to match our expected format
    const parsedResponse = JSON.parse(jsonString);
    
    // Transform questions to our format
    const transformedQuestions: SkillQuestion[] = [];
    
    // Add questions
    if (parsedResponse.questions && Array.isArray(parsedResponse.questions)) {
      parsedResponse.questions.forEach((question: string, index: number) => {
        // Categorize questions based on content
        let category: 'technical' | 'soft' | 'experience' | 'education' = 'technical';
        let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
        
        // Simple categorization based on keywords
        if (question.toLowerCase().includes('team') || question.toLowerCase().includes('communicat') || 
            question.toLowerCase().includes('collaborat') || question.toLowerCase().includes('present')) {
          category = 'soft';
        } else if (question.toLowerCase().includes('project') || question.toLowerCase().includes('built') || 
                   question.toLowerCase().includes('created') || question.toLowerCase().includes('developed')) {
          category = 'experience';
        } else if (question.toLowerCase().includes('course') || question.toLowerCase().includes('educat') || 
                   question.toLowerCase().includes('certificat') || question.toLowerCase().includes('train')) {
          category = 'education';
        }
        
        // Simple difficulty assignment based on question complexity
        if (question.toLowerCase().includes('advanced') || question.toLowerCase().includes('complex') || 
            question.toLowerCase().includes('expert') || question.toLowerCase().includes('master')) {
          difficulty = 'advanced';
        } else if (question.toLowerCase().includes('intermediate') || question.toLowerCase().includes('moderate') || 
                   question.toLowerCase().includes('solid') || question.toLowerCase().includes('good')) {
          difficulty = 'intermediate';
        }
        
        // Create ID based on category and index
        const categoryInitial = category.charAt(0);
        const difficultyInitial = difficulty.charAt(0);
        const id = `${categoryInitial}${difficultyInitial}${index + 1}`;
        
        transformedQuestions.push({
          id,
          text: question,
          category,
          difficulty
        });
      });
    }
    
    console.log("Transformed Questions:", JSON.stringify(transformedQuestions, null, 2));
    
    return NextResponse.json({
      questions: transformedQuestions
    });
    
  } catch (error: any) {
    console.error("=== ERROR IN AI QUESTION GENERATION API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    // Return a fallback response in case of error
    console.log("USING FALLBACK QUESTIONS");
    return NextResponse.json(
      {
        questions: getDefaultQuestions("default", "General Role")
      },
      { status: 200 }
    );
  }
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
    'entrepreneur': [
      { id: 't1', text: 'Have you ever identified a problem and thought of a solution for it?', category: 'technical', difficulty: 'beginner' },
      { id: 's1', text: 'Can you communicate your ideas effectively to others?', category: 'soft', difficulty: 'beginner' },
      { id: 'e1', text: 'Have you ever started a small business or project, even a hobby one?', category: 'experience', difficulty: 'beginner' },
      { id: 'e2', text: 'Have you researched the market or competition for an idea?', category: 'experience', difficulty: 'beginner' },
      { id: 't2', text: 'Do you understand basic financial concepts like profit and loss?', category: 'technical', difficulty: 'beginner' },
      { id: 's2', text: 'Can you work with uncertainty and adapt to changing situations?', category: 'soft', difficulty: 'beginner' },
      { id: 'e3', text: 'Have you created any business plans or pitch decks?', category: 'experience', difficulty: 'intermediate' },
      { id: 't3', text: 'Do you understand basic marketing concepts?', category: 'technical', difficulty: 'beginner' },
      { id: 's3', text: 'Can you lead and motivate a team towards a common goal?', category: 'soft', difficulty: 'intermediate' },
      { id: 'e4', text: 'Have you raised any funds or investments for a project?', category: 'experience', difficulty: 'intermediate' }
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
  } else if (roleId.includes('entrepreneur') || roleName.includes('Entrepreneur')) {
    return defaultQuestions['entrepreneur'];
  } else if (defaultQuestions['default']) {
    return defaultQuestions['default'];
  } else {
    return [
      { id: 'q1', text: 'Have you worked in this field before?', category: 'experience', difficulty: 'beginner' },
      { id: 'q2', text: 'Are you committed to learning and growing?', category: 'soft', difficulty: 'beginner' }
    ];
  }
}