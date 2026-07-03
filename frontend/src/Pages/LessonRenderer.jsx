// LessonRenderer.jsx
import React, { useState } from "react";
import HeadingBlock from "./Blocks/HeadingBlock.jsx";
import ParagraphBlock from "./Blocks/ParagraphBlock.jsx";
import CodeBlock from "./Blocks/CodeBlock.jsx";
import VideoBlock from "./Blocks/VideoBlock.jsx";
import MCQBlock from "./Blocks/MCQBlock.jsx";
import LessonPDFExporter from "./LessonPDFExporter";
import LessonAudioPlayer from "./Blocks/LessonAudioPlayer.jsx";
import { BookOpen, BookOpenCheck, Loader2, Wand2, ListChecks } from "lucide-react";
import "./LessonRenderer.css";
import AskAiSidebar from "./Askaisidebar.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const blockComponentMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  code: CodeBlock,
  mcq: MCQBlock,
};

function LessonRenderer({ lesson }) {
  if (!lesson) {
    return (
      <div className="text-gray-400 text-center py-10">
        No lesson data available.
      </div>
    );
  }

  const title = lesson.title;
  const objectives = lesson.objectives;
  const isEnriched = lesson.isEnriched;

  // courseId is needed to trigger the "generate all lessons" endpoint
  const courseId = lesson.module?.course?._id || lesson.module?.course;

  // Simple state variables
  const [completed, setCompleted] = useState(lesson.completed || false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  // New state for the "generate all lessons in course" action
  const [generatingAll, setGeneratingAll] = useState(false);
  const [generateAllError, setGenerateAllError] = useState("");

  // Mark lesson as complete
  async function handleMarkComplete() {
    try {
      const res = await fetch(`${BASE_URL}/lessons/${lesson._id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setCompleted(true);
      } else {
        console.error("Failed to mark lesson complete");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  // Generate content for THIS lesson only
  async function handleGenerateContent() {
    setGenerating(true);
    setGenerateError("");

    try {
      const res = await fetch(`${BASE_URL}/lessons/${lesson._id}/generate`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Something went wrong while generating content");
      }

      // Simple way to refresh: just reload the page
      // The lesson data will be fetched fresh from the backend
      window.location.reload();
    } catch (err) {
      console.error("Failed to generate lesson content:", err);
      setGenerateError("Failed to generate content. Please try again.");
      setGenerating(false);
    }
  }

  // Generate ALL lessons for the whole course, one by one (backend handles the sequential loop
  // and skips lessons that already have content — see generateLessonsForCourse)
  async function handleGenerateAllLessons() {
    if (!courseId) {
      setGenerateAllError("Course ID not found for this lesson.");
      return;
    }

    setGeneratingAll(true);
    setGenerateAllError("");

    try {
      const res = await fetch(`${BASE_URL}/courses/${courseId}/generate-lessons`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Something went wrong while generating course lessons");
      }

      // Refresh so this lesson (and others) pick up freshly generated content
      window.location.reload();
    } catch (err) {
      console.error("Failed to generate all course lessons:", err);
      setGenerateAllError("Failed to generate lessons. Please try again.");
      setGeneratingAll(false);
    }
  }

  // Get lesson content (checking different possible field names)
  let lessonContent = [];
  if (Array.isArray(lesson.content)) {
    lessonContent = lesson.content;
  } else if (Array.isArray(lesson.blocks)) {
    lessonContent = lesson.blocks;
  } else if (Array.isArray(lesson.lessonContent)) {
    lessonContent = lesson.lessonContent;
  }

  // Get video url
  let lessonVideoUrl = null;
  if (lesson.videoUrl) {
    lessonVideoUrl = lesson.videoUrl;
  } else if (lesson.videoId) {
    lessonVideoUrl = lesson.videoId;
  }

  // Render a single content block
  function renderBlock(block, index) {
    if (block.type === "video") {
      return (
        <VideoBlock
          key={index}
          block={block}
          videoUrl={lessonVideoUrl}
          isEnriched={isEnriched}
        />
      );
    }

    const BlockComponent = blockComponentMap[block.type];

    if (!BlockComponent) {
      return (
        <div
          key={index}
          className="text-sm text-red-450 border border-dashed border-red-200 rounded-xl p-4 mb-5"
        >
          ⚠️ Unsupported content type: "{block.type}"
        </div>
      );
    }

    return <BlockComponent key={index} block={block} />;
  }

  return (
    <div className="lr-container">
      {/* Top gradient strip */}
      <div className="lr-top-decoration" />

      {/* Header */}
      <header className="lr-header">
        <div className="lr-breadcrumb">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Curriculum Lesson</span>
        </div>
        <h1 className="lr-title">{title}</h1>

        <div className="lr-meta">
          {lesson.module?.title && (
            <div className="lr-meta-item">
              <span className="text-slate-400">Module:</span>
              <span className="font-semibold text-slate-700">
                {lesson.module.title}
              </span>
            </div>
          )}
          <div className="lr-meta-item">
            <span className="lr-meta-badge">Interactive Content</span>
          </div>
        </div>

        {/* Generate all lessons for the course, one by one */}
        <div className="mt-3 flex flex-col items-start gap-1">
          <button
            onClick={handleGenerateAllLessons}
            disabled={generatingAll}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
              generatingAll
                ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {generatingAll ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating all lessons...
              </>
            ) : (
              <>
                <ListChecks className="w-4 h-4" />
                Generate All Course Lessons
              </>
            )}
          </button>

          {generateAllError && (
            <span className="text-xs text-red-500">{generateAllError}</span>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="lr-body">
        {/* Objectives */}
        {objectives && objectives.length > 0 && (
          <div className="lr-objectives-card">
            <h3 className="lr-objectives-title">
              <BookOpenCheck className="h-4 w-4" />
              Learning Objectives
            </h3>
            <ul className="lr-objectives-list">
              {objectives.map((objective, index) => (
                <li key={index} className="lr-objectives-item">
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content OR Generate button if empty */}
        <div className="lesson-content">
          {lessonContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 text-gray-400 text-center py-12 border border-dashed border-slate-200 rounded-2xl px-6">
              <span>No content generated for this lesson yet.</span>

              <button
                onClick={handleGenerateContent}
                disabled={generating}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  generating
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Lesson Content
                  </>
                )}
              </button>

              {generateError && (
                <span className="text-xs text-red-500">{generateError}</span>
              )}
            </div>
          ) : (
            lessonContent.map((block, index) => renderBlock(block, index))
          )}
        </div>

        {/* Footer buttons */}
        <div className="lr-footer flex items-center justify-between! w-full">
          <button
            onClick={handleMarkComplete}
            disabled={completed}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
              completed
                ? "bg-green-600 text-white cursor-default"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {completed ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Completed
              </>
            ) : (
              "Mark as complete"
            )}
          </button>

          <div>
            <LessonAudioPlayer lessonContent={lessonContent} lessonTitle={title} />
          </div>

          <LessonPDFExporter lesson={lesson} />
        </div>

        <AskAiSidebar lessonTitle={title} lessonContent={lessonContent} />
      </main>
    </div>
  );
}

export default LessonRenderer;