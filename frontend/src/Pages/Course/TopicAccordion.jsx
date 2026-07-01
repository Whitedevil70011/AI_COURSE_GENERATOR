// TopicAccordion.jsx
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import LessonRow from "./LessonRow";

function TopicAccordion({ topic, index, isOpen, onToggle, onLessonClick }) {
  const lessonCount = topic.lessons?.length || 0;
  const completedLessons = topic.lessons?.filter((lesson) => lesson.completed)
    ?.length || 0;
  const completedPercent =
    topic.completedPercent ?? (lessonCount ? Math.round((completedLessons / lessonCount) * 100) : 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
      >
        <div className="flex-1">
          <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
            Topic {index + 1} · {completedPercent}% Completed
          </p>
          <h3 className="text-base font-bold text-[#0F1B3D] mt-0.5">
            {topic.title}
          </h3>
          {topic.description ? (
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500">
              {topic.description}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="hidden sm:flex items-center gap-1 text-sm text-slate-500">
            <FileText className="h-4 w-4" />
            {lessonCount}
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="px-5">
        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0F1B3D] transition-all duration-500"
            style={{ width: `${completedPercent}%` }}
          />
        </div>
      </div>

      {/* Lessons */}
      {isOpen && (
        <div className="mt-3 border-t border-slate-100">
          {lessonCount > 0 ? (
            topic.lessons?.map((lesson, i) => (
              <LessonRow
                key={lesson._id || lesson.id || i}
                lesson={lesson}
                isLast={i === lessonCount - 1}
                onClick={() => onLessonClick(lesson._id || lesson.id)}
              />
            ))
          ) : (
            <div className="px-5 py-4 text-sm text-slate-400">
              No lessons added yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TopicAccordion;