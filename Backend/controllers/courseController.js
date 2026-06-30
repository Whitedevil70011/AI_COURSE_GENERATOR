const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const { generateCourseLayout } = require("../services/aiService");
const { generateLessonLayout } = require("../services/aiservice1");
const multer = require("multer");
const path = require("path");

// ── File Upload Setup (multer) ──────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// Small helper: pause execution for a given number of milliseconds.
// Used between AI calls so we don't hit provider rate limits.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Upload Thumbnail ─────────────────────────────────────────────
const uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const thumbnailUrl = `/uploads/${req.file.filename}`;

    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { thumbnail: thumbnailUrl },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, thumbnailUrl: course.thumbnail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Generate and Save Course ─────────────────────────────────────
const generateAndSaveCourse = async (req, res) => {
  try {
    const courseData = await generateCourseLayout(req.body);

    if (!courseData) {
      throw new Error("AI did not return any course data");
    }
    if (typeof courseData.title !== "string") {
      throw new Error("Course title is missing");
    }
    if (!Array.isArray(courseData.modules)) {
      throw new Error("Course modules are missing");
    }

    let creator = "anonymous";
    if (req.body.userId) {
      creator = req.body.userId;
    } else if (req.body.userEmail) {
      creator = req.body.userEmail;
    }

    const course = await Course.create({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      topic: courseData.topic,
      difficulty: courseData.difficulty,
      duration: courseData.duration,
      creator: creator,
    });

    for (let i = 0; i < courseData.modules.length; i++) {
      const mod = courseData.modules[i];

      const savedModule = await Module.create({
        title: mod.title,
        description: mod.description || "",
        duration: mod.duration || "",
        course: course._id,
      });

      course.modules.push(savedModule._id);

      for (let j = 0; j < mod.lessons.length; j++) {
        const lesson = mod.lessons[j];

        let lessonTitle = "";
        if (typeof lesson === "string") {
          lessonTitle = lesson;
        } else {
          lessonTitle = lesson.title;
        }

        // Only basic info saved here — title + module link.
        // Full content gets filled in later by generateLessonsForCourse.
        const savedLesson = await Lesson.create({
          title: lessonTitle,
          module: savedModule._id,
        });

        savedModule.lessons.push(savedLesson._id);
      }

      await savedModule.save();
    }

    await course.save();

    res.status(201).json({
      success: true,
      courseId: course._id,
      course: courseData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get Single Course ────────────────────────────────────────────
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const modules = await Module.find({ course: course._id });
    const modulesWithLessons = await Promise.all(
      modules.map(async (mod) => {
        const lessons = await Lesson.find({ module: mod._id });
        return { ...mod.toObject(), lessons };
      })
    );

    res.status(200).json({ success: true, course, modules: modulesWithLessons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get All Courses for a User ───────────────────────────────────
const getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.params.userId });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Delete Course ────────────────────────────────────────────────
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Update Course ────────────────────────────────────────────────
const updateCourse = async (req, res) => {
  try {
    const allowed = [
      "title",
      "description",
      "category",
      "difficulty",
      "duration",
      "topic",
      "thumbnail",
    ];

    const payload = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    }

    const course = await Course.findByIdAndUpdate(req.params.courseId, payload, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Generate Full Lesson Content for an Existing Course ──────────
// Finds the lessons already created in generateAndSaveCourse (title only)
// and fills each one in with full AI content. Already-enriched lessons
// are skipped. A delay is added between AI calls to avoid rate limits.
const generateLessonsForCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const modules = await Module.find({ course: courseId });

    for (const mod of modules) {
      const existingLessons = await Lesson.find({ module: mod._id });

      for (const lesson of existingLessons) {
        // Skip lessons that are already fully generated
        if (lesson.isEnriched) {
          continue;
        }

        const lessonData = await generateLessonLayout(
          course.title,
          mod.title,
          lesson.title
        );

        lesson.objectives = lessonData.objectives;
        lesson.content = lessonData.content;
        lesson.videoSearchQuery = lessonData.videoSearchQuery;
        lesson.isEnriched = true;

        await lesson.save();

        // Pause briefly before the next AI call to avoid hitting
        // Groq / Gemini rate limits when generating many lessons in a row
        await wait(3000);
      }
    }

    res.json({
      success: true,
      message: "Lessons generated and saved successfully",
    });
  } catch (error) {
    console.error("Error generating lessons:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Exports ───────────────────────────────────────────────────────
module.exports = {
  upload,
  uploadThumbnail,
  generateAndSaveCourse,
  getCourseById,
  getUserCourses,
  deleteCourse,
  updateCourse,
  generateLessonsForCourse,
};