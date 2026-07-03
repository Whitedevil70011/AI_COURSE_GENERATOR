
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");
const { searchYoutubeVideo } = require("../services/youtubeService");
const { generateLessonLayout } = require("../services/aiservice1");

async function getLessonById(req, res) {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId).populate({
      path: "module",
      select: "title description course",
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.status(200).json(lesson);
  } catch (error) {
    console.error("Get lesson error:", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

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


    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;


    lesson.videoUrl = videoUrl;
    lesson.isEnriched = true;
    await lesson.save();


    res.status(200).json(lesson);
  } catch (error) {
    console.error("Enrich video error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Generate content for ONE lesson only — this is the one called by the
// "Generate Lesson Content" button in LessonRenderer.jsx
async function generateLessonContent(req, res) {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId).populate({
      path: "module",
      populate: { path: "course", select: "title" },
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    if (!lesson.module) {
      return res.status(404).json({ message: "Lesson module not found" });
    }

    const courseTitle = lesson.module.course?.title || "";
    const moduleTitle = lesson.module.title || "";
    const lessonTitle = lesson.title || "";

    if (!courseTitle || !moduleTitle || !lessonTitle) {
      return res.status(400).json({ message: "Invalid lesson context for generation" });
    }

    const lessonLayout = await generateLessonLayout(courseTitle, moduleTitle, lessonTitle);

    lesson.title = lessonLayout.title || lesson.title;
    lesson.objectives = Array.isArray(lessonLayout.objectives) ? lessonLayout.objectives : lesson.objectives;
    lesson.content = Array.isArray(lessonLayout.content) ? lessonLayout.content : lesson.content;
    lesson.videoSearchQuery = lessonLayout.videoSearchQuery || lesson.videoSearchQuery || `${courseTitle} ${moduleTitle}`;
    lesson.isEnriched = false;

    await lesson.save();

    res.status(200).json({ success: true, lesson });
  } catch (error) {
    console.error("generateLessonContent error:", error.message);
    res.status(500).json({ message: error.message || "Something went wrong while generating lesson content" });
  }
}

// Mark a lesson as complete
async function markLessonComplete(req, res) {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    lesson.completed = true;
    lesson.completedAt = new Date();
    await lesson.save();
    res.status(200).json({ message: "Lesson marked as complete" });
  } catch (error) {
    console.error("Mark lesson complete error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Export ALL functions in ONE object — never declare module.exports twice
module.exports = { getLessonById, enrichLessonVideo, markLessonComplete, generateLessonContent };