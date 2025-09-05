# Career Advisor

A language-smart, zero-cost LMS that lives entirely in-app and turns any learner into a job-ready professional.

## Project Overview

This is a Next.js 14 application that implements the core workflow of the Career Advisor platform:

1. Google OAuth authentication (simplified for demo)
2. Native language selection (Telugu, Hindi, Tamil, Marathi)
3. Career goal setting (already set vs. discovery through psychology questions)
4. AI-powered career recommendations using Google Gemini
5. Responsive UI with Tailwind CSS and enhanced animations

## 🔥 Firebase Status Update

**Important Notice**: The Firebase backend is currently experiencing connectivity issues. The app gracefully degrades to sample data mode when Firebase is unavailable. All features remain functional with the following limitations:

- User responses are stored locally (lost on refresh)
- Recommendations use sample data instead of real algorithms
- Progress is not persisted across sessions

See [FIREBASE_STATUS.md](FIREBASE_STATUS.md) for detailed information and troubleshooting steps.

## ✨ AI-Powered Features

The Career Advisor now includes AI-powered career recommendations using Google Gemini:

1. **Dynamic Career Persona Generation**: Based on psychology quiz answers, the AI creates a unique career persona for each user
2. **Personalized Role Recommendations**: The AI recommends 5 specific job roles that match the user's persona
3. **Detailed Role Information**: For each recommended role, the AI generates comprehensive information including:
   - Role description
   - Daily responsibilities
   - Salary ranges
   - Career progression paths
   - Required skills
   - Educational requirements
   - Job market outlook

## Features Implemented

- [x] User authentication flow with Google OAuth (NextAuth.js)
- [x] Language selection interface
- [x] Goal setting workflow
- [x] Responsive UI with mobile-first design
- [x] Animated progress indicators
- [x] LocalStorage for data persistence
- [x] Enhanced UI with gradients, shadows, and transitions
- [x] Smooth animations between steps
- [x] Psychology quiz component (full implementation)
- [x] Domain explorer component (full implementation)
- [x] AI-powered career recommendations using Google Gemini
- [x] Role deep-dive pages with detailed career information
- [x] Real-time recommendations with Firebase backend (degraded to sample data mode)
- [x] Graceful error handling for backend failures
- [x] Debugging tools for Firebase connectivity issues

## 🛠️ Debugging Tools

When experiencing issues, visit these debugging pages:

- `/test-firebase` - Basic Firebase connectivity test
- `/test-init` - Detailed initialization diagnostics
- `/debug-auth` - Authentication debugging tools
- `/test-firestore` - API endpoint for raw Firestore testing
- `/test-gemini` - Test Google Gemini API connectivity
- `/test-ai` - Test AI recommendations service
- `/test-ai-service` - Automated AI service test
- `/check-env` - Check environment variables

## Color Palette

- Background: `slate-100`
- Primary buttons: `blue-600` to `blue-700` gradient
- Continue buttons: `green-600` to `green-700` gradient
- Progress bar: `blue-500` to `green-500` gradient

## Files in this Repository

- `src/app/page.tsx` - Main page with login and workflow
- `src/app/layout.tsx` - Root layout with navigation
- `src/app/globals.css` - Global styles with custom animations
- `src/components/` - React components
- `src/lib/` - Utility functions and data models
- `.env.local` - Environment variables template
- `SETUP.md` - Detailed setup instructions
- `demo.html` - Static HTML demo of the enhanced UI

## How to Run

Due to environment issues, we've included a static HTML demo (`demo.html`) that shows the UI components.

To run the Next.js application:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.local.example` to create your own `.env.local` file
   - Add your Google OAuth credentials
   - Add your Firebase configuration values
   - Add your Google Gemini API key

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing AI Features

To test the AI-powered features:

1. Visit `/check-env` to verify your environment variables are properly configured
2. Visit `/test-gemini` to test the Google Gemini API connectivity
3. Visit `/test-ai-service` to test the AI recommendations service
4. Complete the full user flow in the main application to see AI-generated recommendations

## UI/UX Enhancements

### Animations and Transitions
- Smooth fade-in animations for page elements
- Slide transitions between workflow steps
- Hover effects with scaling and shadow enhancements
- Progress bar with gradient color transition
- Interactive button states with visual feedback

### Visual Design Improvements
- Rounded corners for modern appearance
- Subtle shadows for depth and hierarchy
- Gradient backgrounds for buttons and progress indicators
- Consistent spacing and padding for clarity
- Enhanced typography with better hierarchy

### User Experience Improvements
- Clear visual feedback on interactive elements
- Improved progress indicators with scaling effects
- Better form field styling with focus states
- Enhanced button styling with hover effects
- Consistent design language throughout the application

## Next Steps for Full Implementation

1. ~~Implement proper Google OAuth with NextAuth.js~~ (Completed)
2. ~~Create Psychology Quiz component~~ (Demo created)
3. ~~Implement AI-powered career recommendations~~ (Completed)
4. Add the full psychology question flow
5. Implement the skill assessment section
6. Add the course content and video viewing features
7. Implement the GitHub portfolio integration
8. Add the job scraping and internship matching features

## Design Principles

1. **The Guided Path**: Eliminate all guesswork with a linear progression system
2. **Motivation Through Momentum**: Show progress in tangible, rewarding ways
3. **Frictionless Practice**: Instant, integrated practice without leaving the platform
4. **Clarity Over Clutter**: Clean, organized interface with generous whitespace

## Psychology Questions

The platform includes 10 psychology questions to help users discover their ideal career path if they haven't already set a goal.

## Goal Domains

The platform covers 8 job domains with multiple sub-roles in each:
- Digital & Core Tech
- Data, AI & Research
- Healthcare & Life Sciences
- Education & Academia
- Business, Management & Support
- Creative, Media & Performing Arts
- Skilled Trades, Services & Physical
- Entrepreneurship & Self-Employment

## Hackathon Progress

This project was created for a hackathon with the goal of building a Minimum Viable Product (MVP) that demonstrates the core value proposition of Career Advisor. The current implementation includes:

1. **Authentication Flow**: Google OAuth login
2. **Onboarding**: Language selection and goal setting
3. **Psychology Quiz**: Complete 10-question quiz for career discovery
4. **AI-Powered Recommendations**: Personalized career personas and role recommendations
5. **Role Deep-Dive**: Detailed information about recommended career paths

The next steps for the hackathon would be to implement:
1. Goal validation for users with existing goals
2. Skill assessment component
3. Learning path system
4. Gamification elements