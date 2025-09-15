// Simple test to verify AI service fallback behavior
import { generatePersonaAndRoles } from './src/lib/aiService.js';

// Mock quiz answers
const mockQuizAnswers = {
  childhoodInterests: "Making paper boats during monsoon",
  favoriteToy: "Carrom board",
  childhoodAspiration: "Engineer",
  spendingPreference: "Latest smartphone + Jio recharge",
  inspirationalStatement: "I fixed the village water-pump wiring myself.",
  idealDailyVibe: "Small chai-break team of 4 friends",
  nonNegotiables: "Remote job from hometown",
  publicSpeaking: "3",
  secretChoice: "Software developer",
  goalOwnership: "4"
};

console.log("Testing AI service with mock quiz answers...");
console.log("This should trigger the rate limit error and fallback to hardcoded data.");

generatePersonaAndRoles(mockQuizAnswers)
  .then(result => {
    console.log("AI Service Response:");
    console.log(JSON.stringify(result, null, 2));
    
    // Check if this is the fallback data
    if (result.personaName === "The Adaptive Explorer") {
      console.log("\n⚠️  WARNING: Received fallback data instead of AI-generated content");
      console.log("This indicates the AI service is rate-limited or experiencing issues.");
    } else {
      console.log("\n✅ Received AI-generated content");
    }
  })
  .catch(error => {
    console.error("Error calling AI service:", error);
  });