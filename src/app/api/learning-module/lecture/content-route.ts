// src/app/api/learning-module/lecture/content-route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface LectureContentRequest {
  lectureId: string;
  lectureTitle: string;
  courseTitle: string;
  careerField: string;
  userId: string;
}

interface LectureContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  transcript: string;
  cheatSheet: string;
  quiz: QuizQuestion[];
  duration?: string;
  courseTitle: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: LectureContentRequest = await request.json();
    
    // Validate input
    if (!body.lectureId || !body.lectureTitle || !body.courseTitle || !body.careerField) {
      return NextResponse.json(
        { error: 'Missing required fields: lectureId, lectureTitle, courseTitle, careerField' },
        { status: 400 }
      );
    }

    console.log("Lecture Content API called with:", { 
      lectureId: body.lectureId, 
      lectureTitle: body.lectureTitle,
      courseTitle: body.courseTitle,
      careerField: body.careerField
    });
    
    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("API Key available:", !!apiKey);
    if (apiKey) {
      console.log("API Key length:", apiKey.length);
    } else {
      console.log("API Key is NULL or UNDEFINED");
    }
    
    if (!apiKey) {
      // Fallback response if API key is not available
      console.log("NO API KEY - Using default lecture content");
      return NextResponse.json({
        content: getDefaultLectureContent(body.lectureTitle, body.courseTitle, body.careerField)
      });
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // PROMPT FOR GENERATING LECTURE CONTENT - AI TUTOR (PHASE 2)
    // This prompt is designed to create detailed content for a single lecture
    const prompt = `ROLE:
You are an expert ${body.careerField} and senior tutor with 15+ years of real-world experience. Your task is to generate detailed, high-quality content for a lecture titled "${body.lectureTitle}" in the course "${body.courseTitle}".

CONTEXT:
A user has clicked on a lecture titled "${body.lectureTitle}" in their course "${body.courseTitle}". Your job is to act as an expert tutor and generate the detailed content for this specific lecture.

TASK:
Generate comprehensive content for this lecture. Your goal is to provide the student with everything they need to master this specific topic.

Perform Real-Time Research: Before generating the content, actively search for current discussions, tutorials, and expert opinions on this specific topic from platforms like YouTube, Reddit (e.g., r/cscareerquestions, r/uidesign), Medium, Twitter, and top-tier technical blogs.

For the Lecture Content, you MUST provide:

videoUrl: Based on your research, recommend one specific, high-quality YouTube video that is highly praised by the community for teaching this concept. Provide a direct embed URL.

transcript: A detailed, accurate transcript of the video content. This should be a comprehensive summary that captures the key points, examples, and explanations from the video.

cheatSheet: This is the most critical component. Create a detailed, NxtWave-style "Cheat Sheet." It must be a "super-summary" that:
- Summarizes the core concepts.
- Adds 20-30% more value, including detailed code snippets or examples.
- Critically, it must include "Insider Tips & Common Pitfalls" that you discovered from your research on Reddit, Twitter, and blogs.

quiz: A multiple-choice quiz (3-5 questions) to test understanding.

OUTPUT FORMAT:
Your final output MUST be a single, clean, valid JSON object.

{
  "title": "${body.lectureTitle}",
  "description": "Learn the fundamentals of ${body.lectureTitle}",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "transcript": "Detailed transcript of the video content...",
  "cheatSheet": "### Key Concepts
- Concept 1
- Concept 2

### Pro Tips
- Tip 1
- Tip 2

### Common Pitfalls
- Pitfall 1
- Pitfall 2",
  "quiz": [
    {
      "question": "What is the most important aspect of ${body.lectureTitle}?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 2",
      "explanation": "Explanation of why Option 2 is correct."
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
    if (!parsedResponse.title || !parsedResponse.videoUrl || !parsedResponse.transcript || !parsedResponse.cheatSheet) {
      console.log("ERROR: AI response does not have the expected structure");
      throw new Error("AI response does not have the expected structure");
    }
    
    console.log("Successfully parsed AI response");
    
    return NextResponse.json({ content: parsedResponse });
    
  } catch (error: any) {
    console.error("=== ERROR IN LECTURE CONTENT API ===");
    console.error("Error:", error);
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    
    // Return a fallback response in case of error
    console.log("USING FALLBACK LECTURE CONTENT");
    return NextResponse.json(
      {
        content: getDefaultLectureContent("Introduction to Lecture", "General Course", "General Field")
      },
      { status: 200 }
    );
  }
}

// Default lecture content for fallback
function getDefaultLectureContent(lectureTitle: string, courseTitle: string, careerField: string): LectureContent {
  return {
    id: 'default',
    title: lectureTitle,
    description: `Learn the fundamentals of ${lectureTitle}`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
    transcript: `This is a placeholder transcript for the lecture on ${lectureTitle}. In a real implementation, this would contain a detailed summary of the video content, including key concepts, examples, and explanations.`,
    cheatSheet: `## ${lectureTitle} - Cheat Sheet

### Key Concepts
- Fundamental principles of ${lectureTitle}
- Core techniques and best practices
- Common patterns and approaches

### Pro Tips
- Start with simple examples to build understanding
- Practice regularly to reinforce concepts
- Seek feedback from peers and mentors

### Common Pitfalls
- Don't skip fundamentals in favor of advanced topics
- Avoid copying code without understanding it
- Don't neglect testing and validation`,
    quiz: [
      {
        question: `What is the most important aspect of ${lectureTitle}?`,
        options: [
          "Memorizing syntax",
          "Understanding concepts",
          "Watching videos",
          "Reading documentation"
        ],
        correctAnswer: "Understanding concepts",
        explanation: "Understanding concepts is more important than memorizing syntax."
      }
    ],
    courseTitle: courseTitle
  };
}