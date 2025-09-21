const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load the AI Tutor prompt
const tutorPromptPath = path.join(__dirname, '..', 'prompts', 'ai-tutor-prompt.md');
const tutorPromptTemplate = fs.readFileSync(tutorPromptPath, 'utf8');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * @route POST /api/course/content
 * @desc Generate detailed content (cheat sheet and quiz) for a lecture
 * @param {string} lecture_title - The title of the lecture
 * @param {string} video_transcript - The transcript of the video lecture
 * @returns {object} JSON object containing the cheat sheet and quiz
 */
router.post('/content', async (req, res) => {
  try {
    const { lecture_title, video_transcript } = req.body;

    // Validate input
    if (!lecture_title || !video_transcript) {
      return res.status(400).json({
        error: 'Missing required parameters: lecture_title and video_transcript'
      });
    }

    // Replace placeholders in the prompt template
    const prompt = tutorPromptTemplate
      .replace('{{lecture_title}}', lecture_title)
      .replace('{{video_transcript}}', video_transcript);

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    // Parse the JSON
    const content = JSON.parse(jsonString);

    // Return the generated content
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error generating detailed content:', error);
    res.status(500).json({
      error: 'Failed to generate detailed content',
      details: error.message
    });
  }
});

module.exports = router;