import { FileText, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import LessonRow from "./LessonRow";

function TopicAccordion({ topic, index, isOpen, onToggle, onLessonClick }) {
  const total = topic.lessons?.length || 0;
  const completed = topic.lessons?.filter((l) => l.completed).length || 0;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-2xl border-2 border-blue-100 bg-white overflow-hidden transition-colors duration-200 hover:border-blue-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
      >
        <div className="flex-1">
          <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
            Topic {index + 1} · {pct}% Completed
          </p>
          <h3 className="text-base font-bold text-[#0F1B3D] mt-0.5">
            {topic.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {completed} of {total} completed
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      <div className="px-5">
        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 border-t border-blue-100">
          {topic.lessons?.map((lesson, i) => (
            <LessonRow
              key={lesson._id || i}
              lesson={lesson}
              isLast={i === topic.lessons.length - 1}
              onClick={() => onLessonClick(lesson._id || lesson.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TopicAccordion;