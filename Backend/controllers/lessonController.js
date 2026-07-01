// lessonController.js
// This file holds the LOGIC for lesson-related actions.
// Routes will just call these functions — routes don't contain logic themselves.

const Lesson = require("../models/Lesson"); // adjust path if needed
const { searchYoutubeVideo } = require("../services/youtubeService");

// Controller function to enrich a lesson with a YouTube video
async function enrichLessonVideo(req, res) {
  try {
    const { lessonId } = req.params;

    // Step 1: Find the lesson in the database
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Step 2: Search YouTube using the lesson's saved search query
    const videoId = await searchYoutubeVideo(lesson.videoSearchQuery);

    if (!videoId) {
      return res.status(404).json({ message: "No matching video found" });
    }

    // Step 3: Build the real YouTube link
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Step 4: Save it into the lesson document
    lesson.videoUrl = videoUrl;
    lesson.isEnriched = true;
    await lesson.save();

    // Step 5: Send back the updated lesson
    res.status(200).json(lesson);

  } catch (error) {
    console.error("Enrich video error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Export this function so the routes file can use it
module.exports = { enrichLessonVideo };