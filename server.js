const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import route handlers
const courseSyllabusRoutes = require('./api/course-syllabus');
const courseContentRoutes = require('./api/course-content');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/course', courseSyllabusRoutes);
app.use('/api/course', courseContentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Career Quest AI Mentor API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Career Quest AI Mentor API is running on port ${PORT}`);
});

module.exports = app;