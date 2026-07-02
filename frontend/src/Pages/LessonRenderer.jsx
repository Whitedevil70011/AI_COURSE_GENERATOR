// LessonRenderer.jsx
import React from "react";
import HeadingBlock from "./Blocks/HeadingBlock.jsx";
import ParagraphBlock from "./Blocks/ParagraphBlock.jsx";
import CodeBlock from "./Blocks/CodeBlock.jsx";
import VideoBlock from "./Blocks/VideoBlock.jsx";
import MCQBlock from "./Blocks/MCQBlock.jsx";
import LessonPDFExporter from "./LessonPDFExporter";
import LessonAudioPlayer from "./Blocks/LessonAudioPlayer.jsx";
import { BookOpen, Sparkles, BookOpenCheck } from "lucide-react";
import "./LessonRenderer.css";
import AskAiSidebar from "./Askaisidebar.jsx";
import { useState } from "react";
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
  const [completed, setCompleted] = useState(lesson.completed || false);

  async function handleMarkComplete() {
    try {
      const res = await fetch(`${BASE_URL}/lessons/${lesson._id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setCompleted(true);
      } else {
        console.error("Failed to mark lesson complete:", res.status, await res.text());
      }
    } catch (err) {
      console.error("Failed to mark lesson complete:", err);
    }
  }

  let lessonContent = [];
  if (Array.isArray(lesson.content)) {
    lessonContent = lesson.content;
  } else if (Array.isArray(lesson.blocks)) {
    lessonContent = lesson.blocks;
  } else if (Array.isArray(lesson.lessonContent)) {
    lessonContent = lesson.lessonContent;
  }

  let lessonVideoUrl = null;
  if (lesson.videoUrl) {
    lessonVideoUrl = lesson.videoUrl;
  } else if (lesson.videoId) {
    lessonVideoUrl = lesson.videoId;
  }

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
      {/* Decorative gradient strip at the top */}
      <div className="lr-top-decoration" />

      {/* Premium Lesson Header */}
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
      </header>

      {/* Lesson Body Contents */}
      <main className="lr-body">
        {/* Learning objectives section */}
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

        {/* Content blocks */}
        <div className="lesson-content">
          {lessonContent.length === 0 ? (
            <div className="text-gray-400 text-center py-12 border border-dashed border-slate-200 rounded-2xl">
              No content generated for this lesson yet.
            </div>
          ) : (
            lessonContent.map((block, index) => renderBlock(block, index))
          )}
        </div>

        {/* Export / Footer section */}
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

          {/* Hinglish audio player - converts lesson to Hinglish and plays audio */}
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