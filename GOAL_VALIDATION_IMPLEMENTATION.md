# Goal Validation Flow Implementation

This document provides an overview of the implementation for users who have already set a career goal.

## Components

### 1. GoalValidation Component (`src/components/mobile/GoalValidation.tsx`)
- Mobile-first interface for the 5-question validation quiz
- Displays AI-generated validation results and pressure score
- Provides appropriate recommendations based on pressure score
- Handles navigation to different paths (AI recommendation, domain explorer, deep-dive)

### 2. Goal Validation Service (`src/lib/goalValidation.ts`)
- Contains the `validateUserGoal` function that sends user responses to AI for validation via API
- Includes the `calculatePressureScore` function to convert AI validation status to pressure score
- Implements fallback scoring mechanism if AI validation fails

### 3. AI Goal Validation API Route (`src/app/api/validate-goal/route.ts`)
- Server-side API route that handles the actual AI validation using Google Generative AI
- Receives validation requests from client-side components
- Returns AI-generated validation results and pressure scores

### 4. Goal Validation Page (`src/app/goal-validation/page.tsx`)
- Main page that renders the GoalValidation component
- Handles navigation between different paths based on user choices
- Manages state for user goal, quiz answers, and pressure score

## Flow Overview

1. **User with Predefined Goal** → Goal Validation Quiz (5 questions)
2. **Quiz Answers + Goal** → Client-side service calls API route
3. **API Route** → Server-side AI validation with Google Generative AI
4. **AI Response** → Pressure Score Calculation
5. **Pressure Score** → Appropriate Recommendations:
   - High Pressure (≥70%): AI Recommendation (priority), Explore All Domains, Continue Anyway
   - Moderate Pressure (40-69%): Balanced options to explore or continue
   - Low Pressure (<40%): Direct path to deep-dive
6. **All Paths** → Career Deep Dive Page → Skill Assessment → Learning Path

## AI Integration

The AI validation uses the Google Generative AI SDK to analyze the user's goal and quiz responses. The prompt is structured according to the template in `a.md` and requests:

1. Alignment analysis between user's motivations and career demands
2. Validation status assignment ("Excellent Match", "Good Foundation", "Requires Reflection")
3. Validation summary explaining the reasoning
4. Two actionable insights:
   - "Your Superpower for this Goal"
   - "Something to Keep in Mind"

## Data Flow

1. User answers 5 validation questions in the GoalValidation component
2. Answers are sent to the `validateUserGoal` service function
3. Service makes a POST request to the `/api/validate-goal` API route
4. API route runs server-side and calls Google Generative AI
5. AI response is parsed to determine validation status
6. Validation status is converted to pressure score
7. API route returns results to client-side service
8. Component displays results and appropriate recommendations
9. User chooses a path forward:
   - AI Recommendation → Psychology Quiz → AI Career Recommendations
   - Explore All Domains → Domain Explorer
   - Continue Anyway → Career Deep Dive
10. All paths converge at the Career Deep Dive page
11. Proceed to Skill Assessment and Learning Path creation

## Key Features

- **Pressure Score**: Inverted scoring where higher percentages indicate more external pressure
- **Priority Options**: For high pressure users, AI Recommendation is prioritized over Explore All Domains
- **Consistent Experience**: Same deep-dive page used regardless of how user arrives there
- **Fallback Mechanism**: Simple scoring algorithm if AI validation fails
- **Mobile-First Design**: Responsive interface optimized for mobile devices
- **Security**: API keys are kept server-side and never exposed to client
- **Architecture**: Client-server architecture with API route handling AI validation