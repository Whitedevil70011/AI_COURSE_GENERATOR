// LessonRenderer.jsx

import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";

const blockComponentMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  code: CodeBlock,
  mcq: MCQBlock,
};

// This component now receives the WHOLE lesson object,
// instead of just the content array.
function LessonRenderer({ lesson }) {
  // Safety check: if there's no lesson at all, don't try to render anything
  if (!lesson) {
    return (
      <div className="text-gray-400 text-center py-10">
        No lesson data available.
      </div>
    );
  }

  const { title, objectives, content, videoId, isEnriched } = lesson;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

      {/* Objectives */}
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
        {!content || content.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No content available for this lesson yet.
          </div>
        ) : (
          content.map((block, index) => {
            // SPECIAL CASE: video needs extra props
            if (block.type === "video") {
              return (
                <VideoBlock
                  key={index}
                  block={block}
                  videoId={videoId}
                  isEnriched={isEnriched}
                />
              );
            }

            // GENERIC CASE: look up component from the map
            const BlockComponent = blockComponentMap[block.type];

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

            return <BlockComponent key={index} block={block} />;
          })
        )}
      </div>
    </div>
  );
}

export default LessonRenderer;
