// src/lib/aiGoalValidation.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ValidationQuizAnswers {
  primaryDrive: string;
  tenYearVision: string;
  problemSolvingApproach: string;
  preferredLearningStyle: string;
  confidenceRating: string;
}

interface AIValidationResponse {
  validatedGoal: string;
  validationStatus: "Excellent Match" | "Good Foundation" | "Requires Reflection";
  validationSummary: string;
  actionableInsights: {
    superpower: string;
    thingToConsider: string;
  };
}

// Function to validate user's goal using AI
export async function validateUserGoalWithAI(
  userGoal: string,
  answers: ValidationQuizAnswers
): Promise<AIValidationResponse> {
  try {
    // Debug logging
    console.log("Checking for GEMINI_API_KEY...");
    console.log("process.env.GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
    console.log("process.env.GEMINI_API_KEY length:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use the correct model name - gemini-pro is deprecated, use gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Construct the prompt based on the template in a.md
    const prompt = `**ROLE:**
You are an expert career counselor and performance coach for the Indian context. Your specialty is helping ambitious students validate their chosen career goals. You are not just a cheerleader; you provide a balanced analysis, highlighting both their strengths and potential challenges to ensure they are making a well-considered choice.

---

**CONTEXT:**
A student has already decided on a career goal and has answered a 5-question validation quiz. Your task is to analyze their stated goal in light of their answers about their motivations, working style, and long-term vision.

* **User's Stated Career Goal:** "${userGoal}"

* **User's Validation Quiz Answers:**
    1.  **Primary Drive:** "${answers.primaryDrive}"
    2.  **10-Year Vision:** "${answers.tenYearVision}"
    3.  **Problem-Solving Approach:** "${answers.problemSolvingApproach}"
    4.  **Preferred Learning Style:** "${answers.preferredLearningStyle}"
    5.  **Confidence Rating (1-5):** "${answers.confidenceRating}"

---

**TASK:**
Based on your expert analysis, perform the following two tasks:

**Part 1: Determine the Alignment Score & Summary**
1.  **Analyze Alignment:** Critically assess how well the user's motivations and preferences (from their answers) align with the typical demands and realities of their chosen career goal.
2.  **Assign a Status:** Based on your analysis, assign one of three validation statuses:
    * **"Excellent Match":** Use this if the user's drivers and goals are perfectly aligned with the career.
    * **"Good Foundation":** Use this if there is a solid alignment but some potential areas for growth or consideration.
    * **"Requires Reflection":** Use this only if there's a significant mismatch between their stated goal and their core motivations (e.g., choosing a highly collaborative role but preferring to solve problems alone).
3.  **Write a Validation Summary:** Write a concise, 2-3 sentence summary explaining your reasoning. Be encouraging, but also realistic. **DO NOT MENTION THE USER'S SPECIFIC ANSWERS IN THIS SUMMARY.** Focus on the general alignment between their motivations and the career path.

**Part 2: Provide Actionable Insights**
Based on the user's answers, provide two specific, actionable insights:
1.  **"Your Superpower for this Goal":** Identify the user's single biggest strength from their answers that will help them succeed in this career.
2.  **"Something to Keep in Mind":** Identify one potential challenge or area for self-awareness based on their answers. Frame this constructively.

---

**OUTPUT FORMAT:**
Your final output MUST be a single, clean, valid JSON object. Do not include any text outside of this structure.

{
  "validatedGoal": "${userGoal}",
  "validationStatus": "Excellent Match",
  "validationSummary": "Your passion for the subject combined with your preference for hands-on practice indicates strong alignment with technical fields. Your long-term vision of becoming an expert shows you have the focus needed to succeed.",
  "actionableInsights": {
    "superpower": "Your preference for 'Researching Extensively' is a true superpower for an AI Developer, as the field is constantly evolving and requires continuous learning.",
    "thingToConsider": "Your confidence rating is solid at 4/5. As you begin, focus on building small, successful projects to turn that confidence into proven skill and push it to a 5/5."
  }
}`;

    // Generate content using the AI model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    // Note: The AI might include markdown formatting, so we need to extract the JSON
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    // Validate that we have a valid JSON string
    if (jsonString.length === 0) {
      throw new Error("AI response did not contain valid JSON");
    }
    
    const parsedResponse = JSON.parse(jsonString);
    
    // Validate that the response has the expected structure
    if (!parsedResponse.validationStatus || !parsedResponse.validationSummary || !parsedResponse.actionableInsights) {
      throw new Error("AI response does not have the expected structure");
    }
    
    return parsedResponse;
    
  } catch (error: any) {
    console.error("Error validating user goal with AI:", error.message);
    throw new Error(`Failed to validate user goal with AI: ${error.message}`);
  }
}

// Function to calculate pressure score based on AI validation response
export function calculatePressureScoreFromAI(validationResponse: AIValidationResponse): number {
  // Convert validation status to pressure score
  // Lower pressure score means more genuine interest
  switch (validationResponse.validationStatus) {
    case "Excellent Match":
      return 20; // Low pressure (20%)
    case "Good Foundation":
      return 50; // Moderate pressure (50%)
    case "Requires Reflection":
      return 80; // High pressure (80%)
    default:
      return 50; // Default moderate pressure
  }
}