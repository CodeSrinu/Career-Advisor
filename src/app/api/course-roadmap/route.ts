// src/app/api/course-roadmap/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define TypeScript interfaces for our request
interface GenerateCourseRoadmapRequest {
  courseId: string;
  courseTitle: string;
  careerField: string;
}

// Define TypeScript interfaces for our response
interface VideoResource {
  title: string;
  channel: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface LearningUnit {
  type: 'lecture' | 'task';
  id: string;
  title: string;
  videoUrl?: string;
  problemStatement?: string;
  requirements?: string[];
}

interface CourseRoadmap {
  courseTitle: string;
  complexityLevel: string;
  syllabus: LearningUnit[];
}

interface GenerateCourseRoadmapResponse {
  roadmap: CourseRoadmap;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: GenerateCourseRoadmapRequest = await request.json();
    
    // Validate input
    if (!body.courseId || !body.courseTitle || !body.careerField) {
      return NextResponse.json(
        { error: 'Missing required fields: courseId, courseTitle, careerField' },
        { status: 400 }
      );
    }

    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("Course Roadmap API called with:", { courseId: body.courseId, courseTitle: body.courseTitle, careerField: body.careerField });
    console.log("API Key available:", !!apiKey);
    if (apiKey) {
      console.log("API Key length:", apiKey.length);
    } else {
      console.log("API Key is NULL or UNDEFINED");
    }
    
    if (!apiKey) {
      // Fallback response if API key is not available
      console.log("NO API KEY - Using default course roadmap");
      return NextResponse.json({
        roadmap: getDefaultCourseRoadmap(body.courseTitle, body.careerField)
      });
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // PROMPT FOR GENERATING COURSE ROADMAP - AI ARCHITECT (PHASE 1)
    // This prompt is designed to create a comprehensive learning roadmap for a single course
    const prompt = `ROLE:
You are an expert curriculum planner and senior ${body.careerField} professional. Your task is to design a complete structural syllabus for a course on "${body.courseTitle}" at a beginner level.

CONTEXT:
A student is about to start this course. You must create a logical, step-by-step learning plan that takes them from their current level to proficiency in this specific topic. The course must be built around high-quality educational YouTube videos and practical, hands-on tasks.

TASK:
Generate a JSON object that defines the complete syllabus for this course. Your task is to decide the correct sequence of lectures (with YouTube videos) and practical tasks.

ANALYZE THE TOPIC: Break down the course topic into a logical sequence of individual lecture subjects appropriate for the beginner level.

FIND HIGH-QUALITY VIDEO RESOURCES: For each lecture, you must find a specific, high-quality YouTube video link.

Prioritize Reputable Sources: Your primary choices should be videos from official documentation channels (e.g., Google for Developers), renowned university lectures (e.g., NPTEL, Stanford), or creators highly regarded by the professional community (e.g., freeCodeCamp, Programming with Mosh, Fireship, The Net Ninja).

Ensure Relevance & Clarity: The video must directly and clearly teach the lecture's subject and be suitable for the specified beginner level.

PLACE PRACTICAL TASKS: Strategically insert task nodes between lectures. These tasks must be designed to test the knowledge from the lectures that came just before them. Each task must be structured as a professional project brief.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object representing the course syllabus.

JSON

{
  "courseTitle": "${body.courseTitle}",
  "complexityLevel": "beginner",
  "syllabus": [
    {
      "type": "lecture",
      "id": "lec_1",
      "title": "Lecture Title 1",
      "videoUrl": "https://www.youtube.com/watch?v=..."
    },
    {
      "type": "lecture",
      "id": "lec_2",
      "title": "Lecture Title 2",
      "videoUrl": "https://www.youtube.com/watch?v=..."
    },
    {
      "type": "task",
      "id": "task_1",
      "title": "Practical Task Title",
      "problemStatement": "A clear, real-world problem the user needs to solve.",
      "requirements": [
        "A bulleted list of specific requirement #1.",
        "A bulleted list of specific requirement #2."
      ]
    }
  ]
}`;

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
    
    const parsedResponse = JSON.parse(jsonString);
    
    // Validate that the response has the expected structure
    if (!parsedResponse.courseTitle || !parsedResponse.syllabus || !Array.isArray(parsedResponse.syllabus)) {
      console.log("ERROR: AI response does not have the expected structure");
      throw new Error("AI response does not have the expected structure");
    }
    
    console.log("Syllabus from AI response:", parsedResponse.syllabus);
    console.log("Number of syllabus items:", parsedResponse.syllabus.length);
    
    // Log the types of syllabus items
    parsedResponse.syllabus.forEach((unit: any, index: number) => {
      console.log(`Syllabus item ${index}: type = ${unit.type}, title = ${unit.title}`);
    });
    
    console.log("Successfully parsed AI response");
    
    return NextResponse.json({ roadmap: parsedResponse });
    
  } catch (error: any) {
    console.error("=== ERROR IN COURSE ROADMAP API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    // Return a fallback response in case of error
    console.log("USING FALLBACK COURSE ROADMAP");
    return NextResponse.json(
      {
        roadmap: getDefaultCourseRoadmap("Introduction to Course", "General Field")
      },
      { status: 200 }
    );
  }
}

// Default course roadmap for fallback
function getDefaultCourseRoadmap(courseTitle: string, careerField: string): CourseRoadmap {
  return {
    courseTitle: courseTitle,
    complexityLevel: "beginner",
    syllabus: [
      {
        type: "lecture",
        id: "lec_1",
        title: "Introduction to " + courseTitle,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        type: "task",
        id: "task_1",
        title: "Hands-on Exercise",
        problemStatement: "Complete a basic exercise to practice what you've learned.",
        requirements: [
          "Follow the instructions provided",
          "Submit your completed work"
        ]
      }
    ]
  };
}