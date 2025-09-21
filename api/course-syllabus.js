const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load the AI Architect prompt
const architectPromptPath = path.join(__dirname, '..', 'prompts', 'ai-architect-prompt.md');
const architectPromptTemplate = fs.readFileSync(architectPromptPath, 'utf8');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * @route POST /api/course/syllabus
 * @desc Generate course syllabus with video lectures and tasks
 * @param {string} course_topic - The topic of the course
 * @param {string} complexity_level - The complexity level (beginner, intermediate, advanced)
 * @returns {object} JSON object containing the course syllabus
 */
router.post('/syllabus', async (req, res) => {
  try {
    const { course_topic, complexity_level } = req.body;

    // Validate input
    if (!course_topic || !complexity_level) {
      return res.status(400).json({
        error: 'Missing required parameters: course_topic and complexity_level'
      });
    }

    // Replace placeholders in the prompt template
    const prompt = architectPromptTemplate
      .replace('{{course_topic}}', course_topic)
      .replace('{{complexity_level}}', complexity_level);

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    // Parse the JSON
    const syllabus = JSON.parse(jsonString);

    // Return the generated syllabus
    res.json({
      success: true,
      data: syllabus
    });
  } catch (error) {
    console.error('Error generating course syllabus:', error);
    res.status(500).json({
      error: 'Failed to generate course syllabus',
      details: error.message
    });
  }
});

module.exports = router;