// src/app/api/test-skill-assessment/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log("Test Skill Assessment API called with:", body);
    
    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("API Key available in test endpoint:", !!apiKey);
    if (apiKey) {
      console.log("API Key length:", apiKey.length);
    } else {
      console.log("API Key is NULL or UNDEFINED");
    }
    
    // Simulate the actual skill assessment API behavior
    if (!apiKey) {
      console.log("NO API KEY - Would use default questions in real implementation");
      return NextResponse.json({
        message: "API Key not available - would use default questions",
        wouldUseFallback: true,
        apiKeyAvailable: false
      });
    } else {
      console.log("API KEY AVAILABLE - Would call Gemini API in real implementation");
      return NextResponse.json({
        message: "API Key available - would call Gemini API",
        wouldUseFallback: false,
        apiKeyAvailable: true
      });
    }
    
  } catch (error: any) {
    console.error("Error in test skill assessment API:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message
      },
      { status: 500 }
    );
  }
}