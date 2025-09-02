# Hackathon Implementation Plan

## Overview
For the hackathon, we'll focus on building a Minimum Viable Product (MVP) that demonstrates the core value proposition of Career Advisor: helping users discover and validate their career goals with a personalized learning path.

## Core Features to Implement

### 1. User Authentication & Onboarding (Completed)
- [x] Google OAuth login
- [x] Language selection (Telugu, Hindi, Tamil, Marathi)
- [x] Goal status selection (Yes/No)

### 2. Psychology-Based Goal Discovery
- [ ] Implement 10-question psychology quiz
- [ ] Create algorithm to match users to career domains
- [ ] Display recommended domains and sub-roles

### 3. Goal Validation for Users with Existing Goals
- [ ] Implement 5-question psychology validation
- [ ] Map user's goal to existing domains/sub-roles
- [ ] Show domain-specific information

### 4. Domain & Sub-Role Deep Dive
- [ ] Create detailed pages for each domain
- [ ] Include native-language subtitled videos
- [ ] Show day-to-day life timelines
- [ ] Display salary bands and career trajectories

### 5. Skill Assessment
- [ ] Implement 15-question skill test
- [ ] Create open response question
- [ ] Generate skill level score (0-4)
- [ ] Identify skill gaps

### 6. Learning Path System
- [ ] Create dynamic level system
- [ ] Implement prerequisite micro-course (if needed)
- [ ] Build content delivery mechanism
- [ ] Add quiz and task validation

### 7. Gamification & Progress Tracking
- [ ] Implement progress bars and checkmarks
- [ ] Add streak tracker
- [ ] Create simple leaderboard
- [ ] Unlock levels based on completion

## Technical Implementation

### Frontend (Next.js 14)
- Continue using existing components
- Add new pages for psychology questions
- Implement domain/sub-role display pages
- Create skill assessment interface
- Build learning path UI
- Add gamification elements

### Backend
- Keep using localStorage for data persistence
- Implement Python content engine for RAG pipeline
- Create JSON structure for domain/sub-role information
- Build skill assessment scoring algorithm

### Content Strategy
- Pre-populate domain/sub-role information
- Create sample videos with native language subtitles
- Develop sample content for learning levels
- Prepare psychology questions and scoring logic

## Day-by-Day Plan

### Day 1: Foundation & Psychology Questions
- [ ] Implement psychology quiz (10 questions)
- [ ] Create persona matching algorithm
- [ ] Build psychology validation (5 questions)
- [ ] Design domain/sub-role display components

### Day 2: Domain Deep Dive & Skill Assessment
- [ ] Create detailed domain/sub-role pages
- [ ] Implement video display with subtitles
- [ ] Build salary band and trajectory visualizations
- [ ] Implement skill assessment (15 questions + open response)

### Day 3: Learning Path & Gamification
- [ ] Create dynamic level system
- [ ] Implement prerequisite micro-course
- [ ] Build content delivery mechanism
- [ ] Add gamification elements (progress, streaks, etc.)

### Day 4: Polish & Presentation
- [ ] Refine UI/UX based on testing
- [ ] Fix bugs and improve performance
- [ ] Prepare demo presentation
- [ ] Create documentation and user guide

## Success Metrics
- Users can complete the full flow from login to learning path
- Psychology questions effectively match users to domains
- Skill assessment accurately identifies user level
- Gamification elements motivate continued engagement
- Platform works smoothly on both desktop and mobile

## Post-Hackathon Roadmap
- Add community features
- Implement offline capability
- Add accessibility features
- Expand content for more domains
- Add real internship feeds
- Implement auto-resume builder