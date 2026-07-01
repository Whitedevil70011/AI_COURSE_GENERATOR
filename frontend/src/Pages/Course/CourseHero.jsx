// CourseHero.jsx
import { BookOpen, Users, BarChart3, FileText } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SERVER_ORIGIN = BASE_URL?.replace(/\/api\/?$/, "") || "";

function CourseHero({ course, onResume }) {
  const thumbnailUrl = course.thumbnail
    ? `${SERVER_ORIGIN}${course.thumbnail}`
    : null;

  return (
    <div className="rounded-2xl border-2 border-blue-100 bg-white p-4 md:p-5 shadow-[0_4px_20px_-2px_rgba(59,130,246,0.02)]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Banner image */}
        <div className="lg:w-[420px] shrink-0 rounded-2xl overflow-hidden h-56 lg:h-auto bg-[#0F1B3D]">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm font-mono">
              NO PREVIEW
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-extrabold text-[#0F1B3D]">
            {course.title}
          </h1>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-5 max-w-md">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BookOpen className="h-4 w-4 text-[#0F1B3D]" />
              {course.chapterCount} Chapters
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BarChart3 className="h-4 w-4 text-[#0F1B3D]" />
              {course.difficulty}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4 text-[#0F1B3D]" />
              {course.studentsEnrolled} Students Enrolled
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FileText className="h-4 w-4 text-[#0F1B3D]" />
              {course.resourceCount} Resources
            </div>
          </div>

          {/* Resume / progress button */}
          <button 
            onClick={onResume} 
            className="mt-auto pt-6 w-full cursor-pointer"
          >
            <div className="w-full h-11 rounded-xl bg-[#004c6d] hover:bg-[#003d58] transition-all duration-200 flex items-center justify-center gap-1.5 text-sm font-semibold text-white shadow-md shadow-[#004c6d]/15 hover:shadow-[#004c6d]/25">
              <span>{course.progress > 0 ? "Resume Course" : "Start Course"}</span>
              <span className="text-base leading-none">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;