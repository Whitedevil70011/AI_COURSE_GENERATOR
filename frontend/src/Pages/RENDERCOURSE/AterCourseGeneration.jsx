import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicCourseDetails from "./BasicCoursdetails";
import CourseDetail from "./CourseDetail";
import ChapterList from "./ChapterList";
import { Button } from "../../components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import Header from "../../_components/Header";
import Sidebar from "../Dashboard/Sidebar";

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

  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("dashboard-sidebar-collapsed") === "true";
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem("dashboard-sidebar-collapsed", String(newVal));
      return newVal;
    });
  };

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

  // Called when the user clicks "Generate Lesson Content"
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
        throw new Error(
          data?.message || `Request failed with status ${res.status}`,
        );
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

  // ── Main page with Sidebar layout ────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_28%),linear-gradient(180deg,#f8faff_0%,#eef2ff_100%)] text-slate-900 flex flex-col">
      <Header />
      <div className="flex flex-1 w-full min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_26%),linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,255,0.96))]">
        <aside className={`transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"} shrink-0 border-r border-slate-200/80 bg-white/75 backdrop-blur-xl text-slate-900 shadow-[10px_0_30px_-24px_rgba(15,23,42,0.35)] hidden md:block relative`}>
          <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
        </aside>

        <main className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="flex w-full max-w-[1100px] flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <h2 className="text-2xl font-bold text-[#0F1B3D]">Course Curriculum Outline</h2>
              <span className="text-sm font-semibold px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Setup Stage
              </span>
            </div>

            {/* Top-of-page notice — polished, glassmorphic style matching the page theme */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-orange-50/80 to-white shadow-[0_8px_30px_-12px_rgba(217,119,6,0.35)]">
              {/* decorative glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-300/20 blur-3xl" />

              <div className="relative flex items-start gap-4 px-5 py-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-amber-900">Action Required</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Empty
                    </span>
                  </div>
                  <p className="text-sm text-amber-800/90 leading-relaxed">
                    Lesson content hasn't been generated yet. Modules below only show
                    titles and descriptions — click{" "}
                    <span className="font-semibold text-amber-900">"Generate Lesson Content"</span>{" "}
                    at the bottom of this page so the course has real content and is
                    visible to learners.
                  </p>
                </div>
              </div>
            </div>

            <BasicCourseDetails
              course={course}
              onCourseUpdate={(updatedCourse) => {
                setCourse(updatedCourse);
                getCourseByID();
              }}
            />

            <CourseDetail course={course} />

            <ChapterList modules={modules} />

            {/* Generate lesson content button, with a "Very Important Notice" label on the left */}
            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-3.5 py-2 rounded-lg">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-extrabold uppercase tracking-wide">
                  Content is empty — generate it now
                </span>
              </div>

              <Button
                onClick={handleGenerateCourse}
                disabled={generating}
                className="bg-[#004c6d] hover:bg-[#003d58] text-white py-3 px-8 rounded-xl font-bold transition-all shadow-md shadow-[#004c6d]/15"
              >
                {generating ? "Generating..." : "GENERATE LESSON CONTENT"}
              </Button>
            </div>

          </div>
        </main>
      </div>

      {/* Premium Generating Loader Overlay */}
      {generating && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F1B3D]/80 backdrop-blur-md text-white px-6 animate-fadeIn">
          <div className="flex flex-col items-center max-w-md text-center">

            {/* Elegant Spinning Loader Wheel */}
            <div className="relative mb-6">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>

            <h3 className="text-xl font-extrabold tracking-tight mb-2.5 text-white">
              Synthesizing Learning Pathway
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Our AI engines are actively compiling your personalized lesson materials, structuring modular chapter logs, and configuring interactive quiz assessments.
            </p>

            {/* Subtle Progress Bar */}
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-24 bg-blue-500 rounded-full animate-infinite-loading" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-4">
              Please do not close this window
            </span>

          </div>
        </div>
      )}
    </div>
  );
}

export default AterCourseGeneration;