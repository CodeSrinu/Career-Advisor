# Skill Assessment Scoring

## Overview
This document outlines the skill assessment methodology for determining a user's proficiency level in their chosen domain/sub-role.

## Assessment Structure

### Question Format
- **15 Yes/No questions** related to specific skills
- **1 Open response question** for detailed experience
- **Optional resume upload** for additional context

### Scoring Levels
- **Level 0**: Absolute beginner (0-3 correct answers)
- **Level 1**: Novice (4-6 correct answers)
- **Level 2**: Intermediate (7-9 correct answers)
- **Level 3**: Advanced (10-12 correct answers)
- **Level 4**: Expert (13-15 correct answers)

## Sample Questions by Domain

### Digital & Core Tech (Front-End Development Focus)
1. Have you written any HTML file?
2. Have you used CSS Flexbox or Grid?
3. Have you used JavaScript variables or loops?
4. Have you used Git for version control?
5. Have you debugged browser DevTools?
6. Have you created responsive layouts?
7. Have you used npm or yarn?
8. Have you built a React/Vue/Angular component?
9. Have you consumed a REST API in code?
10. Have you written unit tests?
11. Have you deployed a site to GitHub Pages/Netlify?
12. Have you used a CSS preprocessor (Sass, PostCSS)?
13. Have you optimized images or assets?
14. Have you used Webpack/Vite/Parcel?
15. Have you participated in a front-end project with ≥2 people?

### Data, AI & Research
1. Have you used Python for data analysis?
2. Have you worked with pandas or NumPy?
3. Have you created data visualizations?
4. Have you used SQL to query databases?
5. Have you trained a machine learning model?
6. Have you used scikit-learn or TensorFlow?
7. Have you performed statistical analysis?
8. Have you worked with big data tools (Spark, Hadoop)?
9. Have you deployed a model to production?
10. Have you used cloud platforms (AWS, GCP, Azure)?
11. Have you written research papers or reports?
12. Have you used Jupyter notebooks?
13. Have you worked with APIs for data collection?
14. Have you performed data cleaning and preprocessing?
15. Have you collaborated on a data science project?

### Healthcare & Life Sciences
1. Have you completed relevant coursework?
2. Have you performed clinical procedures?
3. Have you used medical software or equipment?
4. Have you worked with patient data?
5. Have you conducted medical research?
6. Have you published in medical journals?
7. Have you presented at medical conferences?
8. Have you completed clinical rotations?
9. Have you obtained relevant certifications?
10. Have you worked in a healthcare team?
11. Have you used electronic health records?
12. Have you performed diagnostic procedures?
13. Have you managed patient care plans?
14. Have you used telemedicine platforms?
15. Have you participated in medical outreach?

## Scoring Algorithm

### Basic Scoring
```
function calculateSkillLevel(correctAnswers, openResponseQuality, resumeRelevance) {
  // Base score from correct answers (0-15)
  let baseScore = correctAnswers;
  
  // Adjust based on open response quality (±2 points)
  let openResponseAdjustment = 0;
  if (openResponseQuality === 'detailed') openResponseAdjustment = 2;
  else if (openResponseQuality === 'moderate') openResponseAdjustment = 1;
  else if (openResponseQuality === 'poor') openResponseAdjustment = -1;
  
  // Adjust based on resume relevance (±1 point)
  let resumeAdjustment = 0;
  if (resumeRelevance === 'high') resumeAdjustment = 1;
  else if (resumeRelevance === 'low') resumeAdjustment = -1;
  
  // Calculate final score
  let finalScore = baseScore + openResponseAdjustment + resumeAdjustment;
  
  // Convert to level (0-4)
  if (finalScore <= 3) return 0;      // Level 0: Absolute beginner
  if (finalScore <= 6) return 1;      // Level 1: Novice
  if (finalScore <= 9) return 2;      // Level 2: Intermediate
  if (finalScore <= 12) return 3;     // Level 3: Advanced
  return 4;                           // Level 4: Expert
}
```

### Gap Analysis
For each level, identify specific skill gaps:

```
function identifyGaps(correctAnswers, questions, level) {
  const gaps = [];
  
  // Define required skills for each level
  const levelRequirements = {
    0: [], // No requirements for absolute beginners
    1: [1, 2, 3], // Basic HTML, CSS, JavaScript
    2: [1, 2, 3, 4, 5, 6], // Add Git, DevTools, responsive design
    3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Add npm, frameworks, APIs, testing
    4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // All skills
  };
  
  // Identify missing skills
  const requiredSkills = levelRequirements[level];
  for (const skillIndex of requiredSkills) {
    if (!correctAnswers[skillIndex]) {
      gaps.push(questions[skillIndex]);
    }
  }
  
  return gaps;
}
```

## Prerequisite Determination

### When Prerequisites Are Needed
- **Level 0**: Always need prerequisites
- **Level 1**: Need prerequisites if < 3 correct answers
- **Level 2**: Need prerequisites if < 5 correct answers
- **Level 3**: Need prerequisites if < 7 correct answers
- **Level 4**: No prerequisites needed

### Prerequisite Content
Based on identified gaps:
1. **Foundational concepts** for missing basics
2. **Hands-on exercises** for practical skills
3. **Video tutorials** for visual learners
4. **Practice quizzes** for reinforcement

## Level Mapping to Learning Path

### Level 0: Absolute Beginner
- **Starting Point**: Level 1 of learning path
- **Prerequisites**: Required for all domains
- **Time Estimate**: 4-6 hours for prerequisites
- **Focus**: Basic concepts and terminology

### Level 1: Novice
- **Starting Point**: Level 1 of learning path
- **Prerequisites**: Required if significant gaps
- **Time Estimate**: 0-2 hours for prerequisites
- **Focus**: Foundational skills and first projects

### Level 2: Intermediate
- **Starting Point**: Level 3 of learning path
- **Prerequisites**: Only for specific gaps
- **Time Estimate**: 0-1 hour for prerequisites
- **Focus**: Practical application and problem-solving

### Level 3: Advanced
- **Starting Point**: Level 5 of learning path
- **Prerequisites**: Rarely needed
- **Time Estimate**: 0 hours
- **Focus**: Complex projects and optimization

### Level 4: Expert
- **Starting Point**: Level 6 of learning path
- **Prerequisites**: Not needed
- **Time Estimate**: 0 hours
- **Focus**: Mastery projects and teaching others

## Open Response Evaluation

### Quality Scoring
1. **Detailed (2 points)**: Specific examples, measurable outcomes, clear timeline
2. **Moderate (1 point)**: Some details, general examples, vague timeline
3. **Poor (-1 point)**: Vague statements, no examples, unclear experience

### Evaluation Criteria
- **Relevance**: How well experience matches the domain
- **Depth**: Level of detail in describing experiences
- **Breadth**: Variety of skills and projects mentioned
- **Results**: Measurable outcomes and achievements
- **Growth**: Evidence of learning and improvement

## Resume Analysis

### Relevance Scoring
- **High (1 point)**: Direct experience in the chosen domain
- **Medium (0 points)**: Related experience in adjacent domains
- **Low (-1 point)**: Unrelated experience or no experience

### Key Factors
- **Work experience** in the field
- **Projects** related to the domain
- **Certifications** relevant to the domain
- **Education** in related disciplines
- **Volunteer work** in relevant areas

## Implementation Example

```
// Example user assessment
const userAnswers = {
  correct: [true, true, true, false, false, true, false, false, false, false, false, false, false, false, false],
  openResponse: "I've built a simple website using HTML and CSS for a local business. I learned the basics through online tutorials.",
  resume: null
};

// Calculate level
const level = calculateSkillLevel(
  userAnswers.correct.filter(Boolean).length, // 4 correct answers
  'moderate', // Quality of open response
  'low' // Resume relevance
); // Result: Level 1 (4 + 1 - 1 = 4)

// Identify gaps
const gaps = identifyGaps(
  userAnswers.correct,
  frontendQuestions,
  level
); // Returns missing skills like Git, JavaScript loops, etc.

// Determine prerequisites
const needsPrerequisites = level < 3; // true for Level 1
```

## Continuous Assessment

### Progress Tracking
- **Pre-level assessment**: Before starting each level
- **Mid-level check**: Halfway through complex levels
- **Post-level evaluation**: After completing each level

### Adaptive Difficulty
- **Adjust content depth** based on performance
- **Provide additional resources** for struggling areas
- **Offer advanced challenges** for excelling users

### Feedback Loop
- **User feedback** on content relevance
- **Performance analytics** for content improvement
- **Regular updates** to assessment questions