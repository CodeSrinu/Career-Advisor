# Component Structure

## Overview
This document outlines the component structure for the Career Advisor platform, detailing the React components that will be created for the hackathon MVP.

## Component Hierarchy

```
App
├── Header
├── Main
│   ├── LoginPage
│   ├── OnboardingFlow
│   │   ├── LanguageSelection
│   │   ├── GoalStatus
│   │   ├── GoalInput
│   │   └── PsychologyQuiz (for users without goals)
│   │       ├── QuestionCard
│   │       ├── ProgressIndicator
│   │       └── Results
│   │   └── GoalValidation (for users with goals)
│   │       ├── QuestionCard
│   │       ├── ProgressIndicator
│   │       └── Results
│   ├── DomainExplorer
│   │   ├── DomainGrid
│   │   │   ├── DomainCard
│   │   │   └── DomainModal
│   │   └── SubRoleList
│   │       └── SubRoleCard
│   ├── SubRoleDetail
│   │   ├── VideoPlayer
│   │   ├── DailyLifeTimeline
│   │   ├── SalaryBands
│   │   ├── CareerTrajectory
│   │   ├── TransformationPaths
│   │   └── PotentialSection
│   ├── SkillAssessment
│   │   ├── QuestionList
│   │   │   ├── YesNoQuestion
│   │   │   └── OpenResponseQuestion
│   │   ├── ResumeUpload
│   │   ├── Results
│   │   │   ├── LevelIndicator
│   │   │   ├── GapAnalysis
│   │   │   └── PrerequisiteRecommendation
│   │   └── PrerequisiteCourse (if needed)
│   │       ├── VideoLesson
│   │       ├── Quiz
│   │       └── MicroTask
│   ├── LearningPath
│   │   ├── LevelList
│   │   │   └── LevelCard
│   │   ├── LevelDetail
│   │   │   ├── ContentViewer
│   │   │   ├── QuizSection
│   │   │   ├── TaskSubmission
│   │   │   └── Reflection
│   │   └── ProgressTracker
│   │       ├── ProgressBar
│   │       ├── StreakCounter
│   │       └── Leaderboard
│   └── Dashboard
│       ├── UserProfile
│       ├── CurrentProgress
│       ├── Recommendations
│       └── QuickActions
└── Footer
```

## Component Details

### 1. LoginPage
**Props**: None
**State**: Authentication status
**Functions**:
- Handle Google OAuth login
- Redirect to onboarding after login

### 2. LanguageSelection
**Props**: 
- onSelectLanguage: (language: string) => void
**State**: 
- selectedLanguage: string
**Functions**:
- Handle language selection
- Validate selection before proceeding

### 3. GoalStatus
**Props**: 
- onSelect: (status: 'yes' | 'no') => void
**State**: 
- selectedStatus: 'yes' | 'no' | null
**Functions**:
- Handle goal status selection

### 4. GoalInput
**Props**: 
- onSubmit: (goal: string) => void
- onBack: () => void
**State**: 
- goalText: string
**Functions**:
- Handle goal text input
- Validate and submit goal

### 5. PsychologyQuiz (for users without goals)
**Props**: None
**State**: 
- currentQuestion: number
- answers: Record<number, string>
- results: DomainMatch[] | null
**Functions**:
- Navigate between questions
- Record answers
- Calculate domain matches
- Display results

#### 5.1 QuestionCard
**Props**: 
- question: PsychologyQuestion
- onSelect: (answer: string) => void
- selectedAnswer: string | null
**State**: None
**Functions**: None

#### 5.2 ProgressIndicator
**Props**: 
- current: number
- total: number
**State**: None
**Functions**: None

#### 5.3 Results
**Props**: 
- matches: DomainMatch[]
- onSelectDomain: (domainId: string) => void
**State**: None
**Functions**: None

### 6. GoalValidation (for users with goals)
**Props**: 
- userGoal: string
**State**: 
- currentQuestion: number
- answers: Record<number, string>
- validationScore: number | null
**Functions**:
- Navigate between questions
- Record answers
- Calculate validation score
- Display recommendations

### 7. DomainExplorer
**Props**: None
**State**: 
- selectedDomain: string | null
**Functions**:
- Handle domain selection
- Filter sub-roles by domain

#### 7.1 DomainGrid
**Props**: 
- domains: Domain[]
- onSelectDomain: (domainId: string) => void
**State**: None
**Functions**: None

#### 7.2 DomainCard
**Props**: 
- domain: Domain
- onClick: () => void
**State**: None
**Functions**: None

#### 7.3 DomainModal
**Props**: 
- domain: Domain
- onClose: () => void
**State**: None
**Functions**: None

#### 7.4 SubRoleList
**Props**: 
- subRoles: SubRole[]
  onSelectSubRole: (subRoleId: string) => void
**State**: None
**Functions**: None

#### 7.5 SubRoleCard
**Props**: 
- subRole: SubRole
  onClick: () => void
**State**: None
**Functions**: None

### 8. SubRoleDetail
**Props**: 
- subRole: SubRole
  onContinue: () => void
**State**: None
**Functions**: None

#### 8.1 VideoPlayer
**Props**: 
- videoUrl: string
  subtitles: Subtitle[]
**State**: 
- isPlaying: boolean
- currentTime: number
**Functions**:
- Play/pause video
- Handle subtitles

#### 8.2 DailyLifeTimeline
**Props**: 
- activities: string[]
**State**: None
**Functions**: None

#### 8.3 SalaryBands
**Props**: 
- salaryData: SalaryBands
**State**: None
**Functions**: None

#### 8.4 CareerTrajectory
**Props**: 
- trajectory: CareerTrajectory
**State**: None
**Functions**: None

#### 8.5 TransformationPaths
**Props**: 
- paths: TransformationPath[]
**State**: None
**Functions**: None

#### 8.6 PotentialSection
**Props**: 
- potential: string
**State**: None
**Functions**: None

### 9. SkillAssessment
**Props**: 
- domain: string
  subRole: string
  onComplete: (level: number, gaps: string[]) => void
**State**: 
- currentQuestion: number
  answers: boolean[]
  openResponse: string
  resumeFile: File | null
**Functions**:
- Navigate questions
- Record answers
- Handle file upload
- Calculate results

#### 9.1 QuestionList
**Props**: 
- questions: string[]
  currentQuestion: number
  answers: boolean[]
  onAnswer: (index: number, answer: boolean) => void
**State**: None
**Functions**: None

#### 9.2 YesNoQuestion
**Props**: 
- question: string
  index: number
  answer: boolean | null
  onAnswer: (index: number, answer: boolean) => void
**State**: None
**Functions**: None

#### 9.3 OpenResponseQuestion
**Props**: 
- value: string
  onChange: (value: string) => void
**State**: None
**Functions**: None

#### 9.4 ResumeUpload
**Props**: 
- onFileSelect: (file: File) => void
**State**: None
**Functions**: None

#### 9.5 Results
**Props**: 
- level: number
  gaps: string[]
  needsPrerequisites: boolean
  onContinue: () => void
**State**: None
**Functions**: None

#### 9.6 LevelIndicator
**Props**: 
- level: number
**State**: None
**Functions**: None

#### 9.7 GapAnalysis
**Props**: 
- gaps: string[]
**State**: None
**Functions**: None

#### 9.8 PrerequisiteRecommendation
**Props**: 
- needsPrerequisites: boolean
  onViewPrerequisites: () => void
**State**: None
**Functions**: None

### 10. PrerequisiteCourse (if needed)
**Props**: 
- onComplete: () => void
**State**: 
- currentStep: 'video' | 'quiz' | 'task'
  quizAnswers: Record<number, string>
  taskCompleted: boolean
**Functions**:
- Navigate course steps
- Handle quiz answers
- Mark task as complete

#### 10.1 VideoLesson
**Props**: 
- videoUrl: string
  onComplete: () => void
**State**: 
- isPlaying: boolean
- currentTime: number
**Functions**:
- Play/pause video
- Track completion

#### 10.2 Quiz
**Props**: 
- questions: QuizQuestion[]
  onSubmit: (answers: Record<number, string>) => void
**State**: 
- answers: Record<number, string>
**Functions**:
- Record answers
- Validate submission

#### 10.3 MicroTask
**Props**: 
- task: string
  onComplete: () => void
**State**: 
- isCompleted: boolean
**Functions**:
- Mark task as complete

### 11. LearningPath
**Props**: 
- domain: string
  subRole: string
  startingLevel: number
**State**: 
- currentLevel: number
  levelProgress: Record<string, LevelProgress>
**Functions**:
- Track level progress
- Unlock next levels

#### 11.1 LevelList
**Props**: 
- levels: Level[]
  currentLevel: number
  progress: Record<string, LevelProgress>
  onSelectLevel: (levelId: string) => void
**State**: None
**Functions**: None

#### 11.2 LevelCard
**Props**: 
- level: Level
  progress: LevelProgress
  isSelected: boolean
  onClick: () => void
**State**: None
**Functions**: None

#### 11.3 LevelDetail
**Props**: 
- level: Level
  onComplete: (quizScore: number, taskCompleted: boolean) => void
**State**: 
- currentSection: 'content' | 'quiz' | 'task' | 'reflection'
  quizAnswers: Record<number, string>
  taskSubmission: string | File
  reflectionAnswers: Record<number, string>
**Functions**:
- Navigate sections
- Handle quiz answers
- Submit task
- Record reflections

#### 11.4 ContentViewer
**Props**: 
- content: LevelContent
**State**: None
**Functions**: None

#### 11.5 QuizSection
**Props**: 
- quiz: Quiz
  onSubmit: (answers: Record<number, string>) => void
**State**: 
- answers: Record<number, string>
**Functions**:
- Record answers
- Validate submission

#### 11.6 TaskSubmission
**Props**: 
- task: Task
  onSubmit: (submission: string | File) => void
**State**: 
- submission: string | File | null
**Functions**:
- Handle submission input
- Submit task

#### 11.7 Reflection
**Props**: 
- questions: string[]
  onSubmit: (answers: Record<number, string>) => void
**State**: 
- answers: Record<number, string>
**Functions**:
- Record answers
- Submit reflections

#### 11.8 ProgressTracker
**Props**: 
- progress: LearningProgress
**State**: None
**Functions**: None

#### 11.9 ProgressBar
**Props**: 
- progress: number
**State**: None
**Functions**: None

#### 11.10 StreakCounter
**Props**: 
- streak: number
**State**: None
**Functions**: None

#### 11.11 Leaderboard
**Props**: 
- users: LeaderboardUser[]
**State**: None
**Functions**: None

### 12. Dashboard
**Props**: None
**State**: None
**Functions**: None

#### 12.1 UserProfile
**Props**: 
- user: User
**State**: None
**Functions**: None

#### 12.2 CurrentProgress
**Props**: 
- progress: UserProgress
**State**: None
**Functions**: None

#### 12.3 Recommendations
**Props**: 
- recommendations: Recommendation[]
**State**: None
**Functions**: None

#### 12.4 QuickActions
**Props**: 
- actions: QuickAction[]
**State**: None
**Functions**: None

## State Management

### Global State (Context API or Redux)
- **User Authentication**: user, isAuthenticated
- **User Profile**: language, goalStatus, goalText
- **Current Position**: currentDomain, currentSubRole, currentLevel
- **Progress Tracking**: completedLevels, streak, leaderboardPosition

### Local State
- Each component manages its own local state for UI interactions
- Forms maintain their own input state
- Modals and overlays manage their visibility state

## Data Flow

### Authentication Flow
```
LoginPage → Google OAuth → OnboardingFlow
```

### Psychology Quiz Flow (No Goal)
```
OnboardingFlow → GoalStatus('no') → PsychologyQuiz → Results → DomainExplorer
```

### Goal Validation Flow (Has Goal)
```
OnboardingFlow → GoalStatus('yes') → GoalInput → GoalValidation → DomainExplorer
```

### Domain Exploration Flow
```
DomainExplorer → DomainGrid → DomainCard → SubRoleList → SubRoleCard → SubRoleDetail
```

### Skill Assessment Flow
```
SubRoleDetail → SkillAssessment → Results → PrerequisiteCourse (if needed) → LearningPath
```

### Learning Path Flow
```
LearningPath → LevelList → LevelCard → LevelDetail → ContentViewer → QuizSection → TaskSubmission → Reflection → ProgressTracker
```

## Component Reusability

### Reusable Components
1. **Button**: Primary, secondary, and tertiary buttons
2. **Card**: Generic card component for consistent styling
3. **Modal**: Reusable modal for detailed views
4. **ProgressIndicator**: Visual progress tracking
5. **VideoPlayer**: Standardized video component with subtitles
6. **QuizQuestion**: Generic quiz question component
7. **FormInput**: Standardized input fields

### Component Libraries
- Consider using existing libraries like:
  - ** react-icons** for icons
  - **react-player** for video playback
  - **chart.js** or **d3** for data visualization
  - **formik** or **react-hook-form** for form handling

## Styling Guidelines

### Tailwind CSS Classes
- Use consistent color palette defined in globals.css
- Follow mobile-first responsive design
- Maintain accessibility standards (contrast, focus states)
- Use consistent spacing (padding, margin) with Tailwind's spacing scale

### Animation and Transitions
- Use subtle animations for state changes
- Implement page transitions for better UX
- Add loading states for async operations
- Use CSS transitions for hover and focus states

## Testing Strategy

### Unit Tests
- Test each component in isolation
- Mock API calls and external dependencies
- Test edge cases and error conditions
- Validate prop types and required props

### Integration Tests
- Test component interactions
- Validate data flow between components
- Test user journeys through the application
- Verify state management across components

### End-to-End Tests
- Test complete user flows
- Validate authentication and authorization
- Test responsive design on different devices
- Verify accessibility compliance

## Performance Considerations

### Lazy Loading
- Load components only when needed
- Implement code splitting for large components
- Lazy load images and media assets
- Defer non-critical JavaScript

### Optimization
- Memoize expensive calculations
- Use useCallback and useMemo hooks appropriately
- Optimize re-renders with React.memo
- Implement virtual scrolling for large lists

### Caching
- Cache API responses locally
- Use localStorage for user preferences
- Implement service worker for offline capability
- Cache static assets with proper cache headers