// LessonRow.jsx
import { Clock, CheckCircle2, Code2, FileType } from "lucide-react";

function LessonRow({ lesson, isLast, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors hover:bg-slate-50
        ${!isLast ? "border-b border-slate-100" : ""}`}
    >
      <div className="flex items-center gap-3">
        {lesson.type === "code" ? (
          <Code2 className="h-4 w-4 text-[#3B4A7A]" />
        ) : (
          <FileType className="h-4 w-4 text-[#3B4A7A]" />
        )}
        <span className="text-sm font-medium text-[#0F1B3D]">
          {lesson.title}
        </span>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        {lesson.completed && (
          <span className="hidden sm:flex items-center gap-1 text-xs text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed on {lesson.completedDate || "recently"}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {lesson.duration || "—"}
        </span>
      </div>
    </div>
  );
}

export default LessonRow;