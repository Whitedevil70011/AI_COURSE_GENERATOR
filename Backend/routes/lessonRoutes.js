// lessonRoutes.js
// This file ONLY defines URLs and connects them to controller functions.
// No actual logic should live here.

const express = require("express");
const router = express.Router();
//const { markLessonComplete } = require("../controllers/lessonController");
// router.post("/lessons/:lessonId/complete", markLessonComplete);
const {
  getLessonById,
  enrichLessonVideo,
  markLessonComplete,
} = require("../controllers/lessonController");

router.get("/:lessonId", getLessonById);

// When a POST request hits this URL, run the enrichLessonVideo function
router.post("/:lessonId/enrich-video", enrichLessonVideo);
router.post("/:lessonId/complete", markLessonComplete);

module.exports = router;
