// src/app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test if environment variables are available
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const nextAuthSecret = process.env.NEXTAUTH_SECRET;
    
    console.log("Environment variables test:");
    console.log("- GEMINI_API_KEY available:", !!geminiApiKey);
    console.log("- NEXTAUTH_SECRET available:", !!nextAuthSecret);
    
    if (geminiApiKey) {
      console.log("- GEMINI_API_KEY length:", geminiApiKey.length);
      console.log("- GEMINI_API_KEY starts with:", geminiApiKey.substring(0, 10) + "...");
    }
    
    return NextResponse.json({
      success: true,
      geminiApiKeyAvailable: !!geminiApiKey,
      nextAuthSecretAvailable: !!nextAuthSecret,
      geminiApiKeyLength: geminiApiKey ? geminiApiKey.length : null,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error("Error testing environment variables:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}