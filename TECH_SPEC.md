# Technical Specification

## Overview
This document outlines the technical implementation details for the Career Advisor platform, focusing on the hackathon MVP.

## Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **State Management**: React useState and useEffect hooks
- **Storage**: localStorage for user data persistence

### Backend
- **Content Engine**: Python with Gemini API
- **Data Storage**: Local JSON files + localStorage
- **Deployment**: Vercel (frontend), local execution (Python engine)

## Component Structure

### 1. Authentication & Onboarding
```
/src/app/page.tsx (already implemented)
- Google OAuth login
- Language selection
- Goal status selection
```

### 2. Psychology Quiz Component
```
/src/components/PsychologyQuiz.tsx
- 10-question quiz for users without goals
- Question types: multiple choice, ranking, rating
- Scoring algorithm to match users to domains
```

### 3. Goal Validation Component
```
/src/components/GoalValidation.tsx
- 5-question validation for users with goals
- Psychology-based validation of user's chosen path
- Mapping to existing domains/sub-roles
```

### 4. Domain Explorer Component
```
/src/components/DomainExplorer.tsx
- Grid display of all 8 domains
- Detailed view for each domain
- Sub-role listing within each domain
```

### 5. Sub-Role Deep Dive Component
```
/src/components/SubRoleDetail.tsx
- Native-language subtitled videos
- Day-to-day life timeline
- Salary bands visualization
- 3-5 year career trajectory
- Transformation paths
```

### 6. Skill Assessment Component
```
/src/components/SkillAssessment.tsx
- 15 Yes/No questions
- Open response question
- Resume upload option
- Scoring algorithm (0-4 levels)
- Gap identification
```

### 7. Learning Path Component
```
/src/components/LearningPath.tsx
- Dynamic level system
- Prerequisite micro-course (if needed)
- Content delivery (video, text, quizzes)
- Task submission and validation
```

### 8. Gamification Component
```
/src/components/Gamification.tsx
- Progress tracking
- Streak counter
- Simple leaderboard
- Level unlocking mechanism
```

## Data Structure

### User Profile
```json
{
  "id": "user_google_id",
  "language": "telugu|hindi|tamil|marathi",
  "goalStatus": "yes|no",
  "goalText": "user's career goal (if set)",
  "psychologyAnswers": [],
  "skillLevel": 0-4,
  "skillGaps": [],
  "domain": "selected_domain",
  "subRole": "selected_sub_role",
  "completedLevels": [],
  "currentLevel": 0,
  "streak": 0,
  "lastActive": "date"
}
```

### Domain Data
```json
{
  "id": "domain_id",
  "name": "Domain Name",
  "description": "Brief description",
  "subRoles": [
    {
      "id": "sub_role_id",
      "name": "Sub Role Name",
      "videoUrl": "url_to_video",
      "dailyLife": ["task1", "task2", "task3"],
      "salaryBands": {
        "entry": "₹X-Y/month",
        "mid": "₹X-Y/month",
        "senior": "₹X-Y/month"
      },
      "trajectory": ["Year 1", "Year 2", "Year 3", "Year 5"],
      "transformationPaths": ["path1", "path2"],
      "potential": "description"
    }
  ]
}
```

### Level Data
```json
{
  "id": "level_id",
  "domain": "domain_id",
  "subRole": "sub_role_id",
  "level": 1-6,
  "title": "Level Title",
  "content": "Learning content",
  "videoUrl": "url_to_video",
  "quiz": {
    "questions": [],
    "passingScore": 85
  },
  "task": "Hands-on task description",
  "estimatedTime": "X hours"
}
```

## API Endpoints

### Content Engine API (Python)
```
GET /api/domains
- Returns all domains and sub-roles

GET /api/domains/{domainId}
- Returns detailed information for a domain

GET /api/domains/{domainId}/subroles/{subRoleId}
- Returns detailed information for a sub-role

GET /api/domains/{domainId}/subroles/{subRoleId}/levels
- Returns all levels for a sub-role

GET /api/domains/{domainId}/subroles/{subRoleId}/levels/{levelId}
- Returns content for a specific level

POST /api/psychology-match
- Takes psychology answers, returns domain matches

POST /api/skill-assessment
- Takes skill answers, returns level and gaps
```

## Storage Strategy

### localStorage Keys
- `userProfile`: User profile data
- `domainsData`: Cached domain information
- `levelProgress`: User's progress through levels
- `quizAnswers`: User's quiz answers
- `taskSubmissions`: User's task submissions

### File Structure
```
/public
  /videos
    /telugu
    /hindi
    /tamil
    /marathi
/data
  /domains
    domain1.json
    domain2.json
    ...
  /levels
    /domain1
      /subrole1
        level1.json
        level2.json
        ...
/src
  /app
    page.tsx
    layout.tsx
    ...
  /components
    PsychologyQuiz.tsx
    GoalValidation.tsx
    DomainExplorer.tsx
    SubRoleDetail.tsx
    SkillAssessment.tsx
    LearningPath.tsx
    Gamification.tsx
  /lib
    utils.ts
    data.ts
```

## Implementation Priority

### High Priority (Hackathon Focus)
1. Psychology quiz implementation
2. Domain/sub-role mapping algorithm
3. Skill assessment component
4. Basic learning path system
5. Gamification elements

### Medium Priority (Post-Hackathon)
1. Content engine API
2. Advanced domain/sub-role details
3. Video subtitle system
4. Progress visualization

### Low Priority (Future Enhancement)
1. Community features
2. Offline capability
3. Accessibility features
4. Real internship feeds