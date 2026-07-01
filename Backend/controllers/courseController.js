const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { generateCourseLayout } = require('../services/aiService');
const { generateLessonLayout } = require('../services/aiservice1');

const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, safeName);
  },
});

const upload = multer({ storage });

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
        const lessonDur   = typeof lesson === 'object' ? lesson.duration   || '' : '';

        const savedLesson = await Lesson.create({
          title:       lessonTitle,
          description: lessonDesc,
          duration:    lessonDur,
          module:      savedModule._id,
        });

        savedModule.lessons.push(savedLesson._id);
      }

      await savedModule.save();
    }

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

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const update = req.body;
    console.log('updateCourse called for:', courseId, 'payload:', update);

    // Only allow specific fields to be updated
    const allowed = ['title', 'description', 'category', 'difficulty', 'duration', 'topic'];
    const payload = {};
    for (const key of allowed) if (update[key] !== undefined) payload[key] = update[key];

    const updated = await Course.findByIdAndUpdate(courseId, payload, { new: true });
    console.log('updateCourse result:', updated);
    if (!updated) return res.status(404).json({ success: false, message: 'Course not found' });

    res.status(200).json({ success: true, course: updated });
  } catch (error) {
    console.error('updateCourse error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const thumbnailUrl = `/uploads/${req.file.filename}`;
    course.thumbnail = thumbnailUrl;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Thumbnail uploaded successfully',
      thumbnailUrl,
      course,
    });
  } catch (error) {
    console.error('uploadThumbnail error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateLessonsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const modules = await Module.find({ course: course._id });
    if (!modules.length) {
      return res.status(404).json({ success: false, message: 'No modules found for this course' });
    }

    const generatedLessons = [];

    for (const moduleDoc of modules) {
      let lessons = await Lesson.find({ module: moduleDoc._id });

      if (!lessons.length) {
        const fallbackLesson = await Lesson.create({
          title: `${moduleDoc.title} Overview`,
          objectives: [
            `Understand the core ideas in ${moduleDoc.title}`,
            `Apply the concepts covered in ${moduleDoc.title}`,
            `Recognize common use cases for ${moduleDoc.title}`,
          ],
          content: [
            { type: 'heading', text: moduleDoc.title },
            { type: 'paragraph', text: moduleDoc.description || `This lesson introduces ${moduleDoc.title}.` },
            { type: 'paragraph', text: `You will get a structured overview of the most important ideas in ${moduleDoc.title}.` },
            { type: 'video', query: `${course.title} ${moduleDoc.title}` },
          ],
          videoSearchQuery: `${course.title} ${moduleDoc.title}`,
          module: moduleDoc._id,
        });

        moduleDoc.lessons.push(fallbackLesson._id);
        await moduleDoc.save();
        generatedLessons.push(fallbackLesson);
        continue;
      }

      for (const lesson of lessons) {
        try {
          const lessonLayout = await generateLessonLayout(course.title, moduleDoc.title, lesson.title);

          lesson.title = lessonLayout.title || lesson.title;
          lesson.objectives = Array.isArray(lessonLayout.objectives) ? lessonLayout.objectives : lesson.objectives;
          lesson.content = Array.isArray(lessonLayout.content) ? lessonLayout.content : lesson.content;
          lesson.videoSearchQuery = lessonLayout.videoSearchQuery || lesson.videoSearchQuery || `${course.title} ${moduleDoc.title}`;
          lesson.isEnriched = false;

          await lesson.save();
          generatedLessons.push(lesson);
        } catch (lessonError) {
          console.error(`generateLessonsForCourse lesson error for ${lesson._id}:`, lessonError.message);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: 'Lessons generated successfully',
      lessons: generatedLessons,
    });
  } catch (error) {
    console.error('generateLessonsForCourse error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateAndSaveCourse,
  getCourseById,
  getUserCourses,
  deleteCourse,
  updateCourse,
  uploadThumbnail,
  upload,
  generateLessonsForCourse,
};