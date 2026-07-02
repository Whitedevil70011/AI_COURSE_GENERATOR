// LessonRenderer.jsx
import React from "react";
import HeadingBlock from "./Blocks/HeadingBlock.jsx";
import ParagraphBlock from "./Blocks/ParagraphBlock.jsx";
import CodeBlock from "./Blocks/CodeBlock.jsx";
import VideoBlock from "./Blocks/VideoBlock.jsx";
import MCQBlock from "./Blocks/MCQBlock.jsx";
import LessonPDFExporter from "./LessonPDFExporter";
import { BookOpen, Sparkles, BookOpenCheck } from "lucide-react";
import "./LessonRenderer.css";

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
              <span className="font-semibold text-slate-700">{lesson.module.title}</span>
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
        <div className="lr-footer">
          <LessonPDFExporter lesson={lesson} />
        </div>
      </main>
    </div>
  );
}

export default LessonRenderer;