// src/lib/psychologyScoring.test.ts
// Test cases for psychology scoring algorithms

import { calculateDomainMatches, validateGoal } from './psychologyScoring';

// Test data
const testAnswers = [
  { questionId: 1, answer: "Disassembling the old radio/TV remote" },
  { questionId: 2, answer: "Video game in neighbour's house (Mario, Contra)" },
  { questionId: 4, answer: "Latest smartphone + Jio recharge" },
  { questionId: 5, answer: "I fixed the village water-pump wiring myself." },
  { questionId: 6, answer: "Work-from-home in pyjamas" },
  { questionId: 7, answer: "Remote job from hometown" },
  { questionId: 8, answer: "4" },
  { questionId: 10, answer: "5 (Strongly Agree)" }
];

describe('Psychology Scoring', () => {
  describe('calculateDomainMatches', () => {
    it('should return domain matches based on answers', () => {
      const matches = calculateDomainMatches(testAnswers);
      
      // Should return exactly 3 matches
      expect(matches).toHaveLength(3);
      
      // Should be sorted by score (highest first)
      for (let i = 0; i < matches.length - 1; i++) {
        expect(matches[i].score).toBeGreaterThanOrEqual(matches[i + 1].score);
      }
      
      // Should contain valid domain names
      const validDomains = [
        "Digital & Core Tech",
        "Data, AI & Research",
        "Healthcare & Life Sciences",
        "Education & Academia",
        "Business, Management & Support",
        "Creative, Media & Performing Arts",
        "Skilled Trades, Services & Physical",
        "Entrepreneurship & Self-Employment"
      ];
      
      matches.forEach(match => {
        expect(validDomains).toContain(match.domain);
        expect(match.score).toBeGreaterThanOrEqual(0);
      });
    });
    
    it('should handle empty answers', () => {
      const matches = calculateDomainMatches([]);
      expect(matches).toHaveLength(3);
      
      // All scores should be 0
      matches.forEach(match => {
        expect(match.score).toBe(0);
      });
    });
  });
  
  describe('validateGoal', () => {
    it('should validate a user's existing goal', () => {
      const goal = "Software Engineer";
      const validation = validateGoal(goal, testAnswers);
      
      expect(validation.score).toBeGreaterThanOrEqual(0);
      expect(validation.score).toBeLessThanOrEqual(100);
      expect(typeof validation.recommendation).toBe('string');
      expect(validation.recommendation).toHaveLengthGreaterThan(0);
    });
  });
});