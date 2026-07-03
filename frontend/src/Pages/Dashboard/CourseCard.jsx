// CourseCardGemini.jsx
import { useNavigate } from "react-router-dom";
import { Clock, BarChart3, Trash2, ArrowRight, Users, Pencil } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SERVER_ORIGIN = BASE_URL?.replace(/\/api\/?$/, "") || "";

const difficultyStyles = {
  Beginner: "bg-emerald-50 border border-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-50 border border-amber-100 text-amber-700",
  Advanced: "bg-rose-50 border border-rose-100 text-rose-700",
};

// Rendered once per card instance as a real JSX node (not injected via
// document.createElement) so it can never silently fail to attach.
function GeminiBorderStyles() {
  return (
    <style>{`
      @property --gemini-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes gemini-rotate {
        to { --gemini-angle: 360deg; }
      }
      .gemini-border {
        position: relative;
        border-radius: 1.05rem;
        padding: 2px;
        background: conic-gradient(
          from var(--gemini-angle),
          #4285F4,
          #9B72CB,
          #D96570,
          #F2A600,
          #34A853,
          #4285F4
        );
        animation: gemini-rotate 4s linear infinite;
        transition: animation-duration 0.3s ease;
      }
      .gemini-border:hover {
        animation-duration: 1.4s;
      }
      @media (prefers-reduced-motion: reduce) {
        .gemini-border {
          animation: none;
        }
      }
    `}</style>
  );
}

function CourseCard({ course, onDelete }) {
  const navigate = useNavigate();

  const thumbnailUrl = course.thumbnail
    ? `${SERVER_ORIGIN}${course.thumbnail}`
    : null;

  const difficultyStyle =
    difficultyStyles[course.difficulty] || "bg-slate-50 border border-slate-200 text-slate-700";

  const goToCourse = () => navigate(`/courses/${course._id}`);
  const goToEditCourse = () => navigate(`/course/${course._id}`);

  return (
    <div className="gemini-border">
      <GeminiBorderStyles />
      <div
        onClick={goToCourse}
        className="group bg-white rounded-[0.9rem] overflow-hidden
                   cursor-pointer transition-all duration-300 ease-out
                   hover:-translate-y-1"
      >
        {/* Image section */}
        <div className="relative w-full h-40 bg-gradient-to-br from-[#0F1B3D] to-[#1E2E5C] overflow-hidden flex items-center justify-center">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span class="text-white/40 text-xs font-mono tracking-wide">NO PREVIEW</span>`;
              }}
            />
          ) : (
            <span className="text-white/40 text-xs font-mono tracking-wide">NO PREVIEW</span>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent" />

          {course.category && (
            <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0F1B3D] shadow-sm">
              {course.category}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToEditCourse();
            }}
            className="absolute top-3 right-3 flex items-center justify-center
                       w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-white/20 shadow-sm
                       text-slate-700 hover:text-indigo-600 hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Edit course"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Card content */}
        <div className="p-5">
          <h3 className="font-bold text-[#0F1B3D] mb-1.5 leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {course.title}
          </h3>

          <p className="text-[13px] text-slate-500 mb-4 line-clamp-2 min-h-[2.25rem] leading-relaxed">
            {course.topic}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              <Clock className="h-3 w-3" />
              {course.duration}
            </span>
            {course.studentsEnrolled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                <Users className="h-3 w-3" />
                {course.studentsEnrolled}+
              </span>
            ) : null}
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyStyle}`}>
              <BarChart3 className="h-3 w-3" />
              {course.difficulty}
            </span>
          </div>

          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToCourse();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white
                         text-xs font-bold py-2.5 rounded-xl cursor-pointer
                         hover:from-indigo-950 hover:to-slate-900 hover:shadow-md active:scale-[0.98] transition-all"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(course._id);
              }}
              className="px-3 py-2.5 rounded-xl border border-rose-100 text-rose-500 text-sm font-semibold cursor-pointer
                         hover:bg-rose-50 hover:border-rose-300 active:scale-[0.98] transition-all"
              aria-label="Delete course"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;