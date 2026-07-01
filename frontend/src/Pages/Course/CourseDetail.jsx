// CourseDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CourseHero from "./CourseHero";
import CourseTabs from "./CourseTabs.jsx";
import TopicAccordion from "./TopicAccordion";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CourseDetail() {
  // Get the courseId from the URL, e.g. /courses/123 -> courseId = "123"
  const { courseId } = useParams();
  const navigate = useNavigate();

  // ---- State variables ----
  const [course, setCourse] = useState(null);       // course info (title, description, etc.)
  const [modules, setModules] = useState([]);        // list of chapters/modules
  const [loading, setLoading] = useState(true);       // true while fetching
  const [error, setError] = useState("");             // error message, if any
  const [activeTab, setActiveTab] = useState("chapters"); // which tab is selected
  const [openTopics, setOpenTopics] = useState({});   // which chapters are expanded

  // ---- Step 1: Fetch the course when the page loads ----
  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  async function fetchCourseData() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/courses/${courseId}`);

      if (!response.ok) {
        setError("Could not load this course.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Some APIs return { course: {...} }, others return the course directly.
      // Handle both cases simply:
      let courseData = data;
      if (data.course) {
        courseData = data.course;
      }

      setCourse(courseData);

      // Modules might come as data.modules or courseData.modules
      if (Array.isArray(data.modules)) {
        setModules(data.modules);
      } else if (Array.isArray(courseData.modules)) {
        setModules(courseData.modules);
      } else {
        setModules([]);
      }
    } catch (err) {
      setError("Something went wrong while loading the course.");
    }

    setLoading(false);
  }

  // ---- Step 2: Open the first chapter automatically once modules load ----
  useEffect(() => {
    const firstChapterOpen = {};
    if (modules.length > 0) {
      firstChapterOpen[0] = true; // only open chapter 1 by default
    }
    setOpenTopics(firstChapterOpen);
  }, [modules]);

  // ---- Helper functions ----
  function toggleTopic(index) {
    const updated = { ...openTopics };
    updated[index] = !updated[index];
    setOpenTopics(updated);
  }

  function goToLesson(lessonId) {
    if (!lessonId) return;
    navigate(`/course/${courseId}/lesson/${lessonId}`);
  }

  // Count total lessons across all modules
  function getTotalLessons() {
    let total = 0;
    for (let i = 0; i < modules.length; i++) {
      const lessons = modules[i].lessons || [];
      total += lessons.length;
    }
    return total;
  }

  // Find the very first lesson (used for "Start Course" button)
  function getFirstLessonId() {
    for (let i = 0; i < modules.length; i++) {
      const lessons = modules[i].lessons || [];
      if (lessons.length > 0) {
        return lessons[0]._id || lessons[0].id;
      }
    }
    return null;
  }

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-[#0F1B3D] animate-spin" />
          Loading course...
        </div>
      </div>
    );
  }

  // ---- Error state ----
  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center">
        <p className="text-sm text-red-500">{error || "Course not found."}</p>
      </div>
    );
  }

  // Data to pass into the hero section (adds a couple of computed fields)
  const heroCourse = {
    ...course,
    chapterCount: modules.length,
    resourceCount: getTotalLessons(),
  };

  // ---- Main page ----
  return (
    <div className="min-h-screen bg-[#F4F7FC] px-6 py-6 md:px-10">
      <CourseHero
        course={heroCourse}
        onResume={() => goToLesson(course.lastLessonId || getFirstLessonId())}
      />

      <CourseTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Chapters tab */}
      {activeTab === "chapters" && (
        <div className="mt-4 flex flex-col gap-4">
          {modules.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              No chapters available for this course yet.
            </div>
          )}

          {modules.map((module, index) => (
            <TopicAccordion
              key={module._id || index}
              topic={module}
              index={index}
              isOpen={!!openTopics[index]}
              onToggle={() => toggleTopic(index)}
              onLessonClick={goToLesson}
            />
          ))}
        </div>
      )}

      {/* Leaderboard tab */}
      {activeTab === "leaderboard" && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Leaderboard coming soon.
        </div>
      )}

      {/* About tab */}
      {activeTab === "about" && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 leading-relaxed">
          {course.description}
        </div>
      )}
    </div>
  );
}

export default CourseDetail;