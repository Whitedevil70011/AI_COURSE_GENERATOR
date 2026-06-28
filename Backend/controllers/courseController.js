const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { generateCourseLayout } = require('../services/aiService');

const generateAndSaveCourse = async (req, res) => {
  try {
    const courseData = await generateCourseLayout(req.body);

    const course = await Course.create({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      topic: courseData.topic,
      difficulty: courseData.difficulty,
      duration: courseData.duration,
      creator: 'test-user'
    });

    for (const mod of courseData.modules) {
      const savedModule = await Module.create({
        title: mod.title,
        course: course._id
      });
      for (const lessonTitle of mod.lessons) {
        await Lesson.create({
          title: lessonTitle,
          module: savedModule._id
        });
      }
    }

    res.status(201).json({ success: true, courseId: course._id, course: courseData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateAndSaveCourse,
};