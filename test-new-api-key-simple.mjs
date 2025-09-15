// Test script to verify if the new API key is working with a simpler prompt
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Get API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
  process.exit(1);
}

console.log("Testing new Gemini API key:", apiKey.substring(0, 5) + "...");

// Import the GoogleGenerativeAI client
import('@google/generative-ai').then(({ GoogleGenerativeAI }) => {
  // Initialize the Google Generative AI client
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Get the generative model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Simple test prompt
  const prompt = "What is 2+2?";
  
  console.log("Sending simple test prompt to Gemini API...");
  
  model.generateContent(prompt)
    .then(result => {
      const response = result.response;
      const text = response.text();
      console.log("✅ Successfully received response from Gemini API:");
      console.log(text);
    })
    .catch(error => {
      console.error("❌ Error calling Gemini API:", error.message);
      if (error.message.includes("429")) {
        console.error("This indicates you've hit the rate limit. Try again tomorrow or upgrade your plan.");
      } else if (error.message.includes("503")) {
        console.error("This indicates the model is temporarily overloaded. Try again later.");
      }
    });
}).catch(error => {
  console.error("Failed to import @google/generative-ai:", error);
});