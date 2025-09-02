# Learning Path Structure

## Overview
This document outlines the structure and implementation of the learning path system for the Career Advisor platform.

## Level Structure

### Dynamic Level System
The number of levels depends on the complexity of the subject:
- **Beginner Topics** (0-4 hours): 3-4 levels
- **Intermediate Topics** (4-8 hours): 4-5 levels
- **Advanced Topics** (8-20 hours): 5-6 levels

### Level Components
Each level consists of:
1. **Concept Explanation** (Text + Video)
2. **Practical Example** (Code/Process Walkthrough)
3. **Knowledge Check** (Quiz with ≥85% passing score)
4. **Hands-on Task** (Practical application)
5. **Reflection** (Self-assessment questions)

## Content Format

### Concept Explanation
- **Text**: 80% English + 20% native language terms
- **Video**: 5-10 minute native language video with English subtitles
- **Interactive Elements**: Code snippets, diagrams, simulations

### Practical Example
- **Step-by-step walkthrough** of a real-world application
- **Code samples** with explanations
- **Common pitfalls** and how to avoid them

### Knowledge Check (Quiz)
- **5-10 multiple choice questions**
- **Immediate feedback** on answers
- **Explanation** for both correct and incorrect answers
- **85% minimum passing score** to unlock next level

### Hands-on Task
- **Clear instructions** with expected outcomes
- **Submission mechanism** for completed work
- **Automated validation** where possible
- **Peer review** for subjective tasks

### Reflection
- **3-5 self-assessment questions**
- **Journal-style responses** to encourage deeper thinking
- **Connection to career goals** and real-world applications

## Level Progression

### Unlocking Criteria
- **Quiz Score**: ≥85% on knowledge check
- **Task Completion**: Submit hands-on task
- **Reflection**: Complete self-assessment questions
- **Time Investment**: Minimum time spent on level (if applicable)

### Progress Tracking
- **Visual indicators**: Progress bars, checkmarks
- **Completion certificates**: For finished levels
- **Skill badges**: For mastered competencies
- **Learning streak**: Daily engagement tracking

## Prerequisite System

### When Prerequisites Apply
- **Skill Level 0**: Always required
- **Skill Level 1**: Required if significant gaps identified
- **Skill Level 2**: Required only for specific missing skills

### Prerequisite Format
- **Single in-app page** with:
  - Concept explanation
  - ≤10 minute native language video
  - 10 multiple choice questions
  - 1 micro-task for hands-on practice

## Domain-Specific Structure

### Digital & Core Tech
**Example: Front-End Development**
- **Level 1**: HTML Basics
- **Level 2**: CSS Fundamentals
- **Level 3**: JavaScript Essentials
- **Level 4**: DOM Manipulation
- **Level 5**: Responsive Design
- **Level 6**: Framework Introduction

### Data, AI & Research
**Example: Data Analysis with Python**
- **Level 1**: Python Basics
- **Level 2**: Pandas Fundamentals
- **Level 3**: Data Visualization
- **Level 4**: Statistical Analysis
- **Level 5**: Machine Learning Intro
- **Level 6**: Model Deployment

### Healthcare & Life Sciences
**Example: Clinical Procedures**
- **Level 1**: Basic Anatomy
- **Level 2**: Patient Assessment
- **Level 3**: Vital Signs Measurement
- **Level 4**: Diagnostic Procedures
- **Level 5**: Treatment Planning
- **Level 6**: Patient Education

### Business, Management & Support
**Example: Project Management**
- **Level 1**: Project Planning Basics
- **Level 2**: Resource Management
- **Level 3**: Risk Assessment
- **Level 4**: Team Leadership
- **Level 5**: Budget Management
- **Level 6**: Stakeholder Communication

## Gamification Integration

### Progress Rewards
- **Level Completion**: Unlock next level
- **Quiz Mastery**: Bonus points for 100% scores
- **Early Completion**: Time-based bonuses
- **Helping Others**: Points for peer assistance

### Streak System
- **Daily Login**: 1 point
- **Level Progress**: 5 points
- **Quiz Completion**: 2 points
- **Task Submission**: 3 points
- **7-day Streak**: 10 bonus points

### Leaderboard
- **Weekly Rankings**: Top 10 learners
- **Category Leaders**: Top in specific domains
- **Streak Champions**: Longest active streaks
- **Peer Recognition**: Votes from fellow learners

## Content Delivery

### Adaptive Loading
- **Preload next level** content after current level completion
- **Cache frequently accessed** materials
- **Offline access** for downloaded content
- **Progressive enhancement** for low-bandwidth users

### Personalization
- **Learning pace adjustment** based on user performance
- **Content difficulty scaling** based on skill level
- **Native language preference** for all materials
- **Career goal alignment** in examples and tasks

## Assessment and Validation

### Automated Checking
- **Code validation** for programming tasks
- **Multiple choice grading** for quizzes
- **Keyword matching** for text responses
- **Format validation** for submissions

### Peer Review
- **Task evaluation** by fellow learners
- **Feedback scoring** system
- **Dispute resolution** for disagreements
- **Reviewer reputation** system

### Expert Validation
- **Spot checks** by domain experts
- **Content quality assurance**
- **Certification pathways**
- **Industry alignment** verification

## Implementation Structure

### JSON Data Format
```json
{
  "levelId": "frontend-html-1",
  "domain": "Digital & Core Tech",
  "subRole": "Front-End Developer",
  "level": 1,
  "title": "HTML Basics",
  "description": "Learn the fundamentals of HTML structure and elements",
  "estimatedTime": "2 hours",
  "content": {
    "text": "HTML (HyperText Markup Language) is the standard markup language...",
    "videoUrl": "/videos/telugu/frontend-html-1.mp4",
    "interactiveElements": [
      {
        "type": "code-editor",
        "initialCode": "<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>My Page</title>\\n</head>\\n<body>\\n  \\n</body>\\n</html>",
        "instructions": "Add a heading and paragraph to the body"
      }
    ]
  },
  "quiz": {
    "questions": [
      {
        "question": "What does HTML stand for?",
        "options": [
          "HyperText Markup Language",
          "HighTech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinking Text Markup Language"
        ],
        "correctAnswer": 0,
        "explanation": "HTML stands for HyperText Markup Language..."
      }
    ],
    "passingScore": 85
  },
  "task": {
    "title": "Create a Simple Webpage",
    "description": "Create a webpage with your favorite hobbies",
    "requirements": [
      "Use at least 3 different HTML elements",
      "Include a title and headings",
      "Add at least one image"
    ],
    "submissionType": "code|file|url",
    "validation": {
      "requiredElements": ["h1", "p", "img"],
      "minLength": 100
    }
  },
  "reflection": {
    "questions": [
      "How can HTML structure improve user experience?",
      "What challenges did you face while creating your webpage?",
      "How does this relate to your career goals?"
    ]
  },
  "prerequisites": ["basic-computer-skills"],
  "nextLevel": "frontend-css-1"
}
```

### Progress Tracking Structure
```json
{
  "userId": "user_google_id",
  "levelId": "frontend-html-1",
  "status": "completed",
  "quizScore": 90,
  "taskSubmitted": true,
  "taskApproved": true,
  "reflectionCompleted": true,
  "timeSpent": 120,
  "completedAt": "2025-01-15T10:30:00Z",
  "unlockedLevels": ["frontend-css-1"]
}
```

## Future Enhancements

### AI-Powered Personalization
- **Adaptive content** based on learning style
- **Intelligent tutoring** for difficult concepts
- **Predictive difficulty** adjustment
- **Personalized feedback** and recommendations

### Community Features
- **Study groups** for collaborative learning
- **Mentor matching** with industry professionals
- **Project collaboration** opportunities
- **Knowledge sharing** platform

### Advanced Assessment
- **Portfolio building** through level work
- **Real-world project** simulations
- **Industry certification** pathways
- **Employer showcase** of skills