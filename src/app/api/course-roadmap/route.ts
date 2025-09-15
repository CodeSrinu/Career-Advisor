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
  type: 'lecture' | 'task' | 'quiz';
  title: string;
  description?: string;
  videoResource?: VideoResource;
  cheatSheet?: string;
  quiz?: QuizQuestion[];
  practicalTask?: string;
}

interface MajorProject {
  title: string;
  description: string;
}

interface FinalExamQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface CourseRoadmap {
  courseTitle: string;
  learningUnits: LearningUnit[];
  majorProject: MajorProject;
  finalExam: FinalExamQuestion[];
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
    
    // PROMPT FOR GENERATING COURSE ROADMAP - AI TUTOR
    // This prompt is designed to create a comprehensive learning roadmap for a single course
    const prompt = `ROLE:
You are a lead curriculum designer and a senior ${body.careerField} with 15+ years of real-world experience. You are creating a course module on "${body.courseTitle}". Your primary goal is to teach not just the theory, but the practical, real-world truths that can only be learned on the job or from deep community discussions.

CONTEXT:
A student is about to start the course titled "${body.courseTitle}". Your task is to generate the complete, detailed curriculum for this single course. You must act as an expert who is actively connected to the professional community.

TASK:
Generate a complete, structured course module. The curriculum must be dynamic; you will determine the necessary number of lectures, tasks, and their sequence based on the topic's real-world complexity.

Perform Real-Time Research: Before generating the content, actively search for current discussions, tutorials, and expert opinions on this topic from platforms like YouTube, Reddit (e.g., r/cscareerquestions, r/uidesign), Medium, Twitter, and top-tier technical blogs. Your goal is to find the most effective teaching resources and the most common "pain points" beginners face right now.

Generate a Dynamic Curriculum: Based on your research, create a logical learning path. The curriculum is a continuous flow of lectures, cheat sheets, quizzes, and tasks. It is not a fixed number of lectures. You will insert tasks and quizzes wherever they are most effective for reinforcing a concept.

For Each Learning Unit (Lecture/Concept), you MUST provide:

videoResource: Based on your research, recommend one specific, high-quality YouTube video that is highly praised by the community for teaching this concept. Provide the title and channel.

cheatSheet: This is the most critical component. Create a detailed, NxtWave-style "Cheat Sheet." It must be a "super-summary" that:

Summarizes the core concepts.

Adds 20-30% more value, including detailed code snippets or examples.

Critically, it must include "Insider Tips & Common Pitfalls" that you discovered from your research on Reddit, Twitter, and blogs. This is where you provide the mentor's wisdom.

quiz: A multiple-choice quiz to test understanding.

practicalTask: A hands-on exercise to apply the knowledge.

Conclude with a Major Project & Final Exam: The course must end with:

A realistic majorProject that a junior professional would be expected to build.

A comprehensive finalExam.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object representing the entire dynamic curriculum.

{
  "courseTitle": "${body.courseTitle}",
  "learningUnits": [
    {
      "type": "lecture",
      "title": "Variables, Data Types, and Operators",
      "videoResource": {
        "title": "JavaScript Variables - Beau teaches JavaScript",
        "channel": "freeCodeCamp.org"
      },
      "cheatSheet": "...",
      "quiz": [ ... ]
    },
    {
      "type": "task",
      "title": "Task: The Calculator",
      "description": "Build a simple calculator function that uses different operators."
    },
    {
      "type": "lecture",
      "title": "Functions and Scope",
      "videoResource": {
        "title": "JavaScript Functions - Mosh Hamedani",
        "channel": "Programming with Mosh"
      },
      "cheatSheet": "### Pro-Tip from Reddit:\nMany beginners get confused by 'hoisting'. A simple rule to remember is to always declare your functions and variables at the top of their scope to avoid unexpected behavior...",
      "quiz": [ ... ]
    }
  ],
  "majorProject": {
    "title": "Build a Dynamic To-Do List App",
    "description": "Create a functional to-do list application where a user can add, delete, and mark tasks as complete. This will test your knowledge of functions, DOM manipulation, and event listeners."
  },
  "finalExam": [ ... ]
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
    if (!parsedResponse.courseTitle || !parsedResponse.learningUnits || !Array.isArray(parsedResponse.learningUnits)) {
      console.log("ERROR: AI response does not have the expected structure");
      throw new Error("AI response does not have the expected structure");
    }
    
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
    learningUnits: [
      {
        type: "lecture",
        title: "Introduction to " + courseTitle,
        videoResource: {
          title: "Getting Started with " + courseTitle,
          channel: "Expert Channel"
        },
        cheatSheet: "### Key Concepts\n- Basic terminology\n- Fundamental principles\n\n### Pro Tips\n- Start with simple examples\n- Practice regularly\n\n### Common Pitfalls\n- Don't skip fundamentals\n- Avoid copying without understanding",
        quiz: [
          {
            question: "What is the most important aspect of learning " + courseTitle + "?",
            options: [
              "Memorizing syntax",
              "Understanding concepts",
              "Watching videos",
              "Reading documentation"
            ],
            correctAnswer: "Understanding concepts",
            explanation: "Understanding concepts is more important than memorizing syntax."
          }
        ]
      },
      {
        type: "task",
        title: "Hands-on Exercise",
        description: "Complete a basic exercise to practice what you've learned."
      }
    ],
    majorProject: {
      title: "Capstone Project",
      description: "Build a comprehensive project that demonstrates your understanding of " + courseTitle
    },
    finalExam: [
      {
        question: "What is the key takeaway from this course?",
        options: [
          "Syntax memorization",
          "Conceptual understanding",
          "Tool usage",
          "Framework knowledge"
        ],
        correctAnswer: "Conceptual understanding",
        explanation: "Conceptual understanding is the foundation for long-term success."
      }
    ]
  };
}