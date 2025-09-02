# Career Advisor

A language-smart, zero-cost LMS that lives entirely in-app and turns any learner into a job-ready professional.

## Project Overview

This is a Next.js 14 application that implements the core workflow of the Career Advisor platform:

1. Google OAuth authentication (simplified for demo)
2. Native language selection (Telugu, Hindi, Tamil, Marathi)
3. Career goal setting (already set vs. discovery through psychology questions)
4. Responsive UI with Tailwind CSS and enhanced animations

## Features Implemented

- [x] User authentication flow with Google OAuth (NextAuth.js)
- [x] Language selection interface
- [x] Goal setting workflow
- [x] Responsive UI with mobile-first design
- [x] Animated progress indicators
- [x] LocalStorage for data persistence
- [x] Enhanced UI with gradients, shadows, and transitions
- [x] Smooth animations between steps
- [x] Psychology quiz component (demo)
- [x] Domain explorer component (demo)

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

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

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
3. ~~Create Domain Explorer component~~ (Demo created)
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
- Business, Management & Support Functions
- Creative, Media & Performing Arts
- Skilled Trades, Services & Physical
- Entrepreneurship & Self-Employment

## Hackathon Progress

This project was created for a hackathon with the goal of building a Minimum Viable Product (MVP) that demonstrates the core value proposition of Career Advisor. The current implementation includes:

1. **Authentication Flow**: Google OAuth login
2. **Onboarding**: Language selection and goal setting
3. **Psychology Quiz**: Demo component for career discovery
4. **Domain Explorer**: Demo component for browsing career domains

The next steps for the hackathon would be to implement:
1. Goal validation for users with existing goals
2. Skill assessment component
3. Learning path system
4. Gamification elements