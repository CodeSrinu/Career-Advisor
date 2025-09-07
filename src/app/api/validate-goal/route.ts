// src/app/api/validate-goal/route.ts
import { validateUserGoalWithAI, calculatePressureScoreFromAI } from '@/lib/aiGoalValidation';
import { ValidationQuizAnswers } from '@/lib/goalValidation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userGoal, answers } = await request.json();
    
    // Validate input
    if (!userGoal || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields: userGoal and answers' },
        { status: 400 }
      );
    }
    
    // Validate that answers has the required structure
    const requiredFields = ['primaryDrive', 'tenYearVision', 'problemSolvingApproach', 'preferredLearningStyle', 'confidenceRating'];
    for (const field of requiredFields) {
      if (!answers[field]) {
        return NextResponse.json(
          { error: `Missing required field in answers: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Call AI validation service
    const validationResponse = await validateUserGoalWithAI(userGoal, answers);
    
    // Return the validation response
    return NextResponse.json({
      validationResponse
    });
    
  } catch (error: any) {
    console.error('Error in goal validation API:', error);
    
    // Return a user-friendly error message
    return NextResponse.json(
      { 
        error: 'Failed to validate goal with AI',
        message: error.message || 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
}