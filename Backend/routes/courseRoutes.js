const express = require('express');
const router = express.Router();
const {
  generateAndSaveCourse,
  getUserCourses,
  getCourseById,
  deleteCourse
} = require('../controllers/courseController');

router.post('/generate', generateAndSaveCourse);

//// write for all 





module.exports = router;
