// lessonRoutes.js
// This file ONLY defines URLs and connects them to controller functions.
// No actual logic should live here.

const express = require("express");
const router = express.Router();

const { enrichLessonVideo } = require("../controllers/lessonController");

// When a POST request hits this URL, run the enrichLessonVideo function
router.post("/lessons/:lessonId/enrich-video", enrichLessonVideo);

module.exports = router;