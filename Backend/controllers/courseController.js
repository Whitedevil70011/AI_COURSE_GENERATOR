const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { generateCourseLayout } = require('../services/aiService');

const generateAndSaveCourse = async (req, res) => {
  try {
    const courseData = await generateCourseLayout(req.body);

    if (!courseData || typeof courseData.title !== 'string' || !Array.isArray(courseData.modules)) {
      throw new Error('Invalid course data returned from AI');
    }

    // Use userId from request body (sent by frontend) or fallback
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

    // Create modules and lessons, and link them back to the course
    for (const mod of courseData.modules) {
      const savedModule = await Module.create({
        title: mod.title,
        course: course._id,
      });

      // Push module ID into course.modules array
      course.modules.push(savedModule._id);

      for (const lessonTitle of mod.lessons) {
        const savedLesson = await Lesson.create({
          title: lessonTitle,
          module: savedModule._id,
        });
        // Push lesson ID into module.lessons array
        savedModule.lessons.push(savedLesson._id);
      }

      // Save module with its lesson IDs
      await savedModule.save();
    }

    // Save course with its module IDs
    await course.save();

    res.status(201).json({ success: true, courseId: course._id, course: courseData });
  } catch (error) {
    console.error('generateAndSaveCourse error:', error);
    res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
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

const getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.params.userId });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateAndSaveCourse,
  getCourseById,
  getUserCourses,
  deleteCourse,
};