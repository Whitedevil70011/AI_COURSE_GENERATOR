const express = require('express');
const router = express.Router();
const {
  generateAndSaveCourse,
  getUserCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
  uploadThumbnail,
  upload
} = require('../controllers/courseController');

// POST /generate - Create new course
router.post('/generate', generateAndSaveCourse);

// POST /:courseId/upload-thumbnail - Upload course thumbnail
router.post('/:courseId/upload-thumbnail', upload.single('file'), uploadThumbnail);

// GET /user/:userId - Get user's courses
router.get('/user/:userId', getUserCourses);

// PUT /:courseId - Update course
router.put('/:courseId', updateCourse);

// GET /:courseId - Get course by ID
router.get('/:courseId', getCourseById);

// DELETE /:courseId - Delete course
router.delete('/:courseId', deleteCourse);

module.exports = router;
