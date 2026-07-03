

const express = require("express");
const router = express.Router();

const {
  getLessonById,
  enrichLessonVideo,
  markLessonComplete,
  generateLessonContent,
} = require("../controllers/lessonController");

router.get("/:lessonId", getLessonById);

// When a POST request hits this URL, run the enrichLessonVideo function
router.post("/:lessonId/enrich-video", enrichLessonVideo);
router.post("/:lessonId/complete", markLessonComplete);
router.post("/:lessonId/generate", generateLessonContent);

module.exports = router;