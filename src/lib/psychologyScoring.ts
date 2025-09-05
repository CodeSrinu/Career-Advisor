// src/lib/psychologyScoring.ts
// Psychology scoring algorithms

// Version information
export const PSYCHOLOGY_QUIZ_VERSION = "1.0.0";

export interface PsychologyAnswer {
  questionId: number;
  answer: string;
}

export interface DomainScore {
  domain: string;
  score: number;
}

// Sample domain data
const domains = [
  "Digital & Core Tech",
  "Data, AI & Research",
  "Healthcare & Life Sciences",
  "Education & Academia",
  "Business, Management & Support",
  "Creative, Media & Performing Arts",
  "Skilled Trades, Services & Physical",
  "Entrepreneurship & Self-Employment"
];

// Simplified scoring algorithm
export function calculateDomainMatches(answers: PsychologyAnswer[]): DomainScore[] {
  // Initialize scores for all domains
  const domainScores: Record<string, number> = {};
  domains.forEach(domain => {
    domainScores[domain] = 0;
  });

  // Score based on answers
  answers.forEach(({ questionId, answer }) => {
    switch (questionId) {
      case 1: // Childhood interests
        if (answer.includes("disassembling") || answer.includes("radio")) {
          domainScores["Digital & Core Tech"] += 10;
        } else if (answer.includes("drawing") || answer.includes("rangoli") || answer.includes("designs")) {
          domainScores["Creative, Media & Performing Arts"] += 10;
        } else if (answer.includes("helping") || answer.includes("shop")) {
          domainScores["Business, Management & Support"] += 10;
        } else if (answer.includes("building") || answer.includes("houses") || answer.includes("stumps")) {
          domainScores["Skilled Trades, Services & Physical"] += 10;
        }
        break;
        
      case 2: // Favorite toy/game
        if (answer.includes("science kit")) {
          domainScores["Data, AI & Research"] += 10;
        } else if (answer.includes("carrom") || answer.includes("cricket")) {
          domainScores["Skilled Trades, Services & Physical"] += 8;
        } else if (answer.includes("video game")) {
          domainScores["Digital & Core Tech"] += 10;
        }
        break;
        
      case 4: // Spending preference
        if (answer.includes("Himalayan trip")) {
          domainScores["Skilled Trades, Services & Physical"] += 8;
        } else if (answer.includes("smartphone")) {
          domainScores["Digital & Core Tech"] += 8;
        } else if (answer.includes("help fund")) {
          domainScores["Healthcare & Life Sciences"] += 10;
          domainScores["Education & Academia"] += 8;
        } else if (answer.includes("DJ console")) {
          domainScores["Creative, Media & Performing Arts"] += 10;
        } else if (answer.includes("stock-market")) {
          domainScores["Business, Management & Support"] += 10;
        }
        break;
        
      case 5: // Inspirational statement
        if (answer.includes("fixed")) {
          domainScores["Skilled Trades, Services & Physical"] += 10;
        } else if (answer.includes("convinced")) {
          domainScores["Business, Management & Support"] += 10;
        } else if (answer.includes("poem")) {
          domainScores["Creative, Media & Performing Arts"] += 10;
        } else if (answer.includes("hackathon")) {
          domainScores["Digital & Core Tech"] += 10;
        } else if (answer.includes("organised")) {
          domainScores["Business, Management & Support"] += 8;
        } else if (answer.includes("taught coding")) {
          domainScores["Education & Academia"] += 10;
          domainScores["Digital & Core Tech"] += 8;
        }
        break;
        
      case 6: // Ideal daily vibe
        if (answer.includes("quiet hostel")) {
          domainScores["Data, AI & Research"] += 8;
        } else if (answer.includes("chai-break")) {
          domainScores["Healthcare & Life Sciences"] += 8;
        } else if (answer.includes("co-working")) {
          domainScores["Business, Management & Support"] += 10;
        } else if (answer.includes("field visits")) {
          domainScores["Skilled Trades, Services & Physical"] += 10;
        } else if (answer.includes("work-from-home")) {
          domainScores["Digital & Core Tech"] += 8;
          domainScores["Entrepreneurship & Self-Employment"] += 10;
        }
        break;
        
      case 7: // Top 3 non-negotiables
        if (answer.includes("Remote job")) {
          domainScores["Digital & Core Tech"] += 5;
          domainScores["Entrepreneurship & Self-Employment"] += 7;
        }
        if (answer.includes("High starting salary")) {
          domainScores["Business, Management & Support"] += 5;
        }
        if (answer.includes("Creative freedom")) {
          domainScores["Creative, Media & Performing Arts"] += 10;
        }
        if (answer.includes("Social impact")) {
          domainScores["Healthcare & Life Sciences"] += 8;
          domainScores["Education & Academia"] += 6;
        }
        break;
        
      case 8: // Public speaking (1-5 scale)
        if (answer.includes("5")) {
          domainScores["Creative, Media & Performing Arts"] += 10;
          domainScores["Business, Management & Support"] += 8;
          domainScores["Education & Academia"] += 6;
        } else if (answer.includes("4")) {
          domainScores["Business, Management & Support"] += 6;
          domainScores["Education & Academia"] += 4;
        } else if (answer.includes("1") || answer.includes("2")) {
          domainScores["Data, AI & Research"] += 6;
        }
        break;
        
      case 10: // Goal ownership (1-5 scale)
        if (answer.includes("5")) {
          domainScores["Entrepreneurship & Self-Employment"] += 10;
          domainScores["Creative, Media & Performing Arts"] += 6;
        } else if (answer.includes("4")) {
          domainScores["Entrepreneurship & Self-Employment"] += 8;
        } else if (answer.includes("1") || answer.includes("2")) {
          domainScores["Government roles"] += 6; // Note: Government roles aren't a top-level domain in our list
        }
        break;
    }
  });

  // Convert to array and sort
  const results = Object.entries(domainScores)
    .map(([domain, score]) => ({ domain, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return results;
}

// Validate user's existing goal
export function validateGoal(
  goal: string,
  answers: PsychologyAnswer[]
): { score: number; recommendation: string } {
  // This is a simplified validation
  // In a real implementation, this would be more sophisticated
  let score = 0;
  let recommendation = "";

  // Check if answers align with stated goal
  const motivationAlignment = answers.find(a => a.questionId === 1)?.answer || "";
  const longTermVision = answers.find(a => a.questionId === 2)?.answer || "";
  
  // Simple scoring based on alignment
  if (goal.toLowerCase().includes("software") && motivationAlignment.includes("disassembling")) {
    score += 20;
  }
  
  if (goal.toLowerCase().includes("data") && motivationAlignment.includes("science kit")) {
    score += 20;
  }
  
  // Add scores from other validation questions
  answers.forEach(({ questionId, answer }) => {
    switch (questionId) {
      case 3: // Motivation source
        if (answer.includes("Passion")) score += 10;
        else if (answer.includes("Financial")) score += 5;
        break;
      case 4: // Long-term vision
        if (answer.includes("Technical expert")) score += 10;
        else if (answer.includes("Team leader")) score += 8;
        break;
      case 5: // Challenge response
        if (answer.includes("Solve it alone")) score += 5;
        else if (answer.includes("Research")) score += 7;
        break;
    }
  });

  // Generate recommendation based on score
  if (score >= 80) {
    recommendation = "Your goal aligns well with your interests and motivations. Proceed with confidence!";
  } else if (score >= 50) {
    recommendation = "Your goal has some alignment with your interests. Consider exploring similar domains.";
  } else {
    recommendation = "Your goal may not align with your interests. Consider exploring alternative paths.";
  }

  return { score, recommendation };
}