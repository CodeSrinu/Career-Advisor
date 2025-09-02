# Psychology Scoring Algorithm

## Overview
This document outlines the algorithm for scoring psychology questions and matching users to career domains based on their responses.

## Question Scoring

### For Users Without Goals (10 Questions)

Each question maps to one or more domains based on the response:

1. **Childhood Interests**:
   - Making paper boats → Skilled Trades (Water-related)
   - Arranging cards → Business/Management (Organization)
   - Helping in shop → Business/Management (Customer service)
   - Drawing designs → Creative/Media (Visual arts)
   - Disassembling electronics → Digital/Tech (Technical)
   - Building structures → Skilled Trades (Construction)
   - Story-telling → Creative/Media (Performance)
   - Kite flying → Skilled Trades (Outdoor/Physical)
   - Other → Based on user input

2. **Favorite Toy/Game**:
   - Gilli-danda/Lagori → Skilled Trades (Physical)
   - Carrom board → Business/Management (Strategy)
   - Cricket → Skilled Trades (Sports)
   - Kitchen set → Healthcare (Caregiving)
   - Paper planes → Digital/Tech (Engineering)
   - Video games → Digital/Tech (Development)
   - DIY science kit → Data/AI/Research (Scientific)
   - None → Entrepreneurship (Self-directed)

3. **Childhood Aspiration**:
   - Free text analysis using keyword matching to domains

4. **Spending Preference**:
   - Himalayan trip → Creative/Media (Adventure)
   - Latest smartphone → Digital/Tech (Technology)
   - Help cousin's education → Education/Academia (Teaching)
   - DJ console → Creative/Media (Performance)
   - Stock market account → Business/Management (Finance)
   - Designer cricket bat → Skilled Trades (Sports)
   - Online guitar classes → Creative/Media (Performance)
   - Other → Based on user input

5. **Inspirational Statement**:
   - Fixing electrical issues → Skilled Trades (Technical)
   - Convincing for discounts → Business/Management (Sales)
   - Writing poetry → Creative/Media (Writing)
   - Winning hackathons → Digital/Tech (Development)
   - Organizing events → Business/Management (Operations)
   - Teaching coding → Education/Academia (Teaching)

6. **Work Environment**:
   - Quiet hostel room → Data/AI/Research (Independent)
   - Small team → Healthcare (Collaborative)
   - Bustling co-working → Business/Management (Dynamic)
   - Field visits → Skilled Trades (Mobile)
   - Work-from-home → Digital/Tech (Remote)

7. **Career Priorities** (Rank top 3):
   - Remote job → Digital/Tech, Entrepreneurship
   - Festival holidays → Government roles
   - High salary → Business/Management, Digital/Tech
   - Big brands → Business/Management, Government
   - Creative freedom → Creative/Media
   - Social impact → Healthcare, Education, NGO

8. **Public Speaking** (Rate 1-5):
   - 1-2 → Data/AI/Research, Skilled Trades
   - 3 → Digital/Tech, Business/Management
   - 4-5 → Creative/Media, Education/Academia

9. **Secret Choice**:
   - Free text analysis using keyword matching to domains

10. **Goal Ownership** (Rate 1-5):
    - 1-2 → Government roles, Skilled Trades
    - 3 → Business/Management, Healthcare
    - 4-5 → Entrepreneurship, Creative/Media

### For Users With Goals (5 Questions)

Each question validates the user's existing goal:

1. **Motivation Source**:
   - Passion → High intrinsic motivation
   - Financial → Extrinsic motivation
   - Family/Peer → External pressure
   - Personal achievement → Balanced motivation
   - Social impact → Altruistic motivation

2. **Long-term Vision**:
   - Technical expert → Deep specialization
   - Team leader → Management path
   - Entrepreneur → Business creation
   - Researcher → Knowledge creation
   - Educator → Knowledge sharing
   - Policy maker → System influence

3. **Challenge Response**:
   - Solve alone → Independent learner
   - Seek help → Collaborative approach
   - Research → Analytical approach
   - Take break → Reflective approach
   - Ask expert → Mentor-seeking
   - Try different → Experimental approach

4. **Learning Style**:
   - Hands-on → Kinesthetic learner
   - Watching → Visual learner
   - Reading → Auditory/Reading learner
   - Group discussions → Social learner
   - Mentoring → Teaching-based learner
   - Formal education → Structured learner

5. **Work-Life Balance**:
   - High-pressure → Thrives under stress
   - Collaborative → Team-oriented
   - Independent → Self-directed
   - Structured → Process-oriented
   - Flexible → Adaptability-focused
   - Competitive → Achievement-focused

## Domain Matching Algorithm

### For Users Without Goals

1. **Scoring each domain** (0-100 points):
   - Direct matches from questions: 10 points each
   - Indirect matches: 5 points each
   - Priority matches: 15 points each
   - Text analysis matches: 7 points each

2. **Final ranking**:
   - Top 3 domains with highest scores
   - Tie-breaking based on priority questions (7, 8, 10)

3. **Confidence level**:
   - High (80-100): Strong match
   - Medium (50-79): Moderate match
   - Low (30-49): Weak match
   - Very low (<30): Unclear match

### For Users With Goals

1. **Validation score** (0-100 points):
   - Motivation alignment: 20 points
   - Vision alignment: 20 points
   - Approach compatibility: 20 points
   - Learning style match: 20 points
   - Environment fit: 20 points

2. **Recommendation**:
   - High validation (80-100): Proceed with confidence
   - Medium validation (50-79): Consider alternatives
   - Low validation (<50): Explore other options

## Implementation Logic

### User Without Goals Flow:
1. User answers 10 psychology questions
2. Each answer increments domain scores
3. Algorithm calculates final domain rankings
4. Top 3 domains are presented to user
5. User selects one domain to explore

### User With Goals Flow:
1. User answers 5 validation questions
2. Algorithm scores alignment with chosen path
3. If high validation (>80): Proceed to skill assessment
4. If medium validation (50-79): Show alternatives
5. If low validation (<50): Recommend domain exploration

## Sample Implementation (Pseudocode)

```
function calculateDomainScores(answers) {
  const domainScores = {
    'Digital & Core Tech': 0,
    'Data, AI & Research': 0,
    'Healthcare & Life Sciences': 0,
    'Education & Academia': 0,
    'Business, Management & Support': 0,
    'Creative, Media & Performing Arts': 0,
    'Skilled Trades, Services & Physical': 0,
    'Entrepreneurship & Self-Employment': 0
  };

  // Question 1: Childhood Interests
  switch(answers[1]) {
    case 'Disassembling electronics':
      domainScores['Digital & Core Tech'] += 10;
      break;
    case 'Drawing designs':
      domainScores['Creative, Media & Performing Arts'] += 10;
      break;
    // ... other cases
  }

  // ... similar logic for other questions

  // Normalize scores to 0-100
  for (const domain in domainScores) {
    domainScores[domain] = Math.min(100, domainScores[domain]);
  }

  return domainScores;
}

function getTopDomains(domainScores) {
  return Object.entries(domainScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([domain, score]) => ({ domain, score }));
}
```

## Edge Cases Handling

1. **Tied scores**: Use priority questions (7, 8, 10) as tie-breakers
2. **Low scores across all domains**: Suggest entrepreneurship or ask for clarification
3. **Inconsistent answers**: Flag for manual review or additional questions
4. **Unusual combinations**: Show multiple relevant domains