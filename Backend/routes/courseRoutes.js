const express = require('express');
const router = express.Router();
const {
  generateAndSaveCourse,
  getUserCourses,
  getCourseById,
  deleteCourse
} = require('../controllers/courseController');

// Test endpoint to check API
router.post('/test', async (req, res) => {
  try {
    console.log("Test endpoint called");
    const { generateCourseLayout } = require('../services/aiService');
    
    const testData = {
      category: "Technology",
      topic: "Python Basics",
      description: "Learn Python programming",
      difficulty: "Beginner",
      duration: "10 hours",
      video: "Yes",
      chapters: 2
    };
    
    console.log("Calling generateCourseLayout with:", testData);
    const result = await generateCourseLayout(testData);
    console.log("Result:", result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Test error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ success: false, error: error.message, stack: error.stack });
  }
});

// POST routes first
router.post('/generate', generateAndSaveCourse);

// Specific named routes BEFORE generic parameter routes
router.get('/user/:userId', getUserCourses);

// Generic parameter routes last
router.get('/:courseId', getCourseById);
router.delete('/:courseId', deleteCourse);

module.exports = router;
