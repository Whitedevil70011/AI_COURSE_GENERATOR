import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicCourseDetails from "./BasicCoursdetails";
import CourseDetail from "./CourseDetail";
import ChapterList from "./ChapterList";
import { Button } from "../../components/ui/button";
import Header from "../../_components/Header";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AterCourseGeneration() {
  const { courseId } = useParams();

  // Course data state
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tracks whether lesson generation is currently running
  const [generating, setGenerating] = useState(false);

  // Load the course as soon as we know the courseId
  useEffect(() => {
    if (courseId) {
      getCourseByID();
    }
  }, [courseId]);

  // Fetch course details + modules from the backend
  const getCourseByID = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/courses/${courseId}`);
      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      const data = await response.json();
      setCourse(data.course);
      setModules(data.modules || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  // Called when the user clicks "Generate Course Content"
  const handleGenerateCourse = async () => {
    if (!courseId) {
      alert("Missing courseId");
      return;
    }

    try {
      setGenerating(true);

      const url = `${BASE_URL}/courses/${courseId}/generate-lessons`;
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || `Request failed with status ${res.status}`);
      }

      alert("Lessons generated!");

      // Refresh course data so the new lessons show up
      getCourseByID();
    } catch (err) {
      console.error("Failed to generate lessons:", err);
      alert(err.message);
    } finally {
      setGenerating(false);
    }
  };

  // ── Loading / error / empty states ──────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Course not found
      </div>
    );
  }

  // ── Main page ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-center text-lg font-bold text-gray-800 mb-6">
          Course Layout
        </h2>

        <BasicCourseDetails
          course={course}
          onCourseUpdate={(updatedCourse) => {
            setCourse(updatedCourse);
            getCourseByID(); // refresh from backend to confirm it saved
          }}
        />

        <CourseDetail course={course} />

        <ChapterList modules={modules} />

        {/* Generate course content button, aligned to the right */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleGenerateCourse}
            disabled={generating}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
          >
            {generating ? "Generating..." : "GENERATE COURSE CONTENT"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AterCourseGeneration;