import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicCourseDetails from "./BasicCoursdetails";
import CourseDetail from "./CourseDetail";
import ChapterList from "./ChapterList";

import Header from "../../_components/Header";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AterCourseGeneration() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) getCourseByID();
  }, [courseId]);

  const getCourseByID = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/courses/${courseId}`);
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      const data = await response.json();
      console.log("API response:", data);
      console.log("Course object:", data.course);
      console.log("Modules array:", data.modules);
      
      setCourse(data.course);
      setModules(data.modules || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
  if (!course) return <div className="flex items-center justify-center min-h-screen text-gray-500">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
    <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-center text-lg font-bold text-gray-800 mb-6">Course Layout</h2>
        <BasicCourseDetails course={course} onCourseUpdate={(updatedCourse) => {
          console.log('Course updated:', updatedCourse);
          setCourse(updatedCourse);
          // Optionally refresh from backend to verify persistence
          getCourseByID();
        }} />
        <CourseDetail course={course} />
        <ChapterList modules={modules} />
      </div>
    </div>
  );
}

export default AterCourseGeneration;