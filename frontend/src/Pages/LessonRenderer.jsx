// LessonRenderer.jsx

import HeadingBlock from "./Blocks/HeadingBlock.jsx";
import ParagraphBlock from "./Blocks/ParagraphBlock.jsx";
import CodeBlock from "./Blocks/CodeBlock.jsx";
import VideoBlock from "./Blocks/VideoBlock.jsx";
import MCQBlock from "./Blocks/MCQBlock.jsx";

// This object maps a block's "type" string to the component that should render it.
// Example: if block.type is "heading", we use the HeadingBlock component.
import LessonPDFExporter from "./LessonPDFExporter";
const blockComponentMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  code: CodeBlock,
  mcq: MCQBlock,
};

function LessonRenderer({ lesson }) {
  // ---- Step 1: Handle the case where there's no lesson yet ----
  if (!lesson) {
    return (
      <div className="text-gray-400 text-center py-10">
        No lesson data available.
      </div>
    );
  }

  // ---- Step 2: Pull out the fields we need from the lesson ----
  const title = lesson.title;
  const objectives = lesson.objectives;
  const isEnriched = lesson.isEnriched;

  // ---- Step 3: Figure out where the list of content blocks actually lives ----
  // Different lessons might store their blocks under different field names,
  // so we check each one in order and use the first array we find.
  let lessonContent = [];

  if (Array.isArray(lesson.content)) {
    lessonContent = lesson.content;
  } else if (Array.isArray(lesson.blocks)) {
    lessonContent = lesson.blocks;
  } else if (Array.isArray(lesson.lessonContent)) {
    lessonContent = lesson.lessonContent;
  }

  // ---- Step 4: Figure out the video URL (could come from either field) ----
  let lessonVideoUrl = null;
  if (lesson.videoUrl) {
    lessonVideoUrl = lesson.videoUrl;
  } else if (lesson.videoId) {
    lessonVideoUrl = lesson.videoId;
  }

  // ---- Step 5: A helper function that renders ONE block ----
  function renderBlock(block, index) {
    // Special case: video blocks need extra props (videoUrl, isEnriched)
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

    // Look up which component handles this block type
    const BlockComponent = blockComponentMap[block.type];

    // If we don't recognize this block type, show a warning instead of crashing
    if (!BlockComponent) {
      return (
        <div
          key={index}
          className="text-sm text-red-400 border border-dashed border-red-200 rounded-lg p-3 mb-4"
        >
          ⚠️ Unsupported content type: "{block.type}"
        </div>
      );
    }

    // Normal case: render the matched component
    return <BlockComponent key={index} block={block} />;
  }

  // ---- Step 6: Render the page ----
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

      {/* Learning objectives (only show if they exist) */}
      {objectives && objectives.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {objectives.map((objective, index) => (
              <li key={index} className="text-gray-700 text-sm">
                {objective}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content blocks */}
      <div className="lesson-content">
        {lessonContent.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No content available for this lesson yet.
          </div>
        ) : (
          lessonContent.map((block, index) => renderBlock(block, index))
        )}
      </div>

      {/* Download button (title removed here — it was a duplicate of the one above) */}
      <div className="flex items-start justify-end gap-4 mb-2">
        <LessonPDFExporter lesson={lesson} />
      </div>
    </div>
  );
}

export default LessonRenderer;