# Lib

This directory contains utility functions and libraries for the Career Advisor platform.

## Files

- `data.ts` - Data models and utility functions for handling domain and sub-role data
- `psychologyScoring.ts` - Psychology scoring algorithms for matching users to career domains

## Implementation Status

### Completed Utilities
- Data models and sample data
- Basic domain/sub-role data handling functions
- Simplified psychology scoring algorithms

### Planned Utilities
- Skill assessment scoring algorithms
- Learning path progression tracking
- Gamification point calculation
- User progress persistence
- Content recommendation engine

## Usage

### Data Utilities
```typescript
import { getDomains, getDomainById } from '@/lib/data';

// Get all domains
const domains = await getDomains();

// Get a specific domain
const domain = await getDomainById('digital-core-tech');
```

### Psychology Scoring
```typescript
import { calculateDomainMatches } from '@/lib/psychologyScoring';

const answers = [
  { questionId: 1, answer: "Disassembling the old radio/TV remote" },
  // ... more answers
];

const matches = calculateDomainMatches(answers);
```