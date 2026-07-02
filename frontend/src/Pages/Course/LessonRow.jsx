import { FileText, Clock, CheckCircle2 } from "lucide-react";

function LessonRow({ lesson, isLast, onClick }) {
  const isCompleted = lesson.completed;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-3.5 text-left
        hover:bg-slate-50/60 transition-colors
        ${!isLast ? "border-b border-slate-100" : ""}`}
    >
      <div className="flex items-center gap-3">
        <FileText className="h-4 w-4 text-blue-500 shrink-0" />
        <span className="text-sm font-medium text-[#0F1B3D]">
          {lesson.title}
        </span>
      </div>

      <div className="flex items-center shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="h-[18px] w-[18px] text-blue-500" />
        ) : (
          <Clock className="h-[18px] w-[18px] text-slate-300" />
        )}
      </div>
    </button>
  );
}

export default LessonRow;