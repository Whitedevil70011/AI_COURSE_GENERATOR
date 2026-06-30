const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { generateCourseLayout } = require('../services/aiService');
const multer = require('multer');
const path = require('path');

// ── File Upload Setup (multer) ────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// ── Upload Thumbnail ──────────────────────────────────────────
const uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const thumbnailUrl = `/uploads/${req.file.filename}`;

    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { thumbnail: thumbnailUrl },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, thumbnailUrl: course.thumbnail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Generate and Save Course ──────────────────────────────────
const generateAndSaveCourse = async (req, res) => {
  try {
    const courseData = await generateCourseLayout(req.body);

    if (!courseData || typeof courseData.title !== 'string' || !Array.isArray(courseData.modules)) {
      throw new Error('Invalid course data returned from AI');
    }

    const creator = req.body.userId || req.body.userEmail || 'anonymous';

    const course = await Course.create({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      topic: courseData.topic,
      difficulty: courseData.difficulty,
      duration: courseData.duration,
      creator,
    });

    for (const mod of courseData.modules) {
      const savedModule = await Module.create({
        title: mod.title,
        description: mod.description || '',
        duration: mod.duration || '',
        course: course._id,
      });

      course.modules.push(savedModule._id);

      for (const lesson of mod.lessons) {
        const lessonTitle = typeof lesson === 'string' ? lesson : lesson.title;
        const lessonDesc  = typeof lesson === 'object' ? lesson.description || '' : '';
        const lessonDur   = typeof lesson === 'object' ? lesson.duration || '' : '';

        const savedLesson = await Lesson.create({
          title: lessonTitle,
          description: lessonDesc,
          duration: lessonDur,
          module: savedModule._id,
        });

        savedModule.lessons.push(savedLesson._id);
      }

      await savedModule.save();
    }

    await course.save();

    res.status(201).json({ success: true, courseId: course._id, course: courseData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get Single Course ─────────────────────────────────────────
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
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

// ── Get All Courses for a User ────────────────────────────────
const getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.params.userId });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Delete Course ─────────────────────────────────────────────
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Update Course ─────────────────────────────────────────────
const updateCourse = async (req, res) => {
  try {
    const allowed = ['title', 'description', 'category', 'difficulty', 'duration', 'topic', 'thumbnail'];

    // Only pick the fields we allow to be updated
    const payload = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    }

    const course = await Course.findByIdAndUpdate(req.params.courseId, payload, { new: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Exports ───────────────────────────────────────────────────
module.exports = {
  upload,
  uploadThumbnail,
  generateAndSaveCourse,
  getCourseById,
  getUserCourses,
  deleteCourse,
  updateCourse,
};