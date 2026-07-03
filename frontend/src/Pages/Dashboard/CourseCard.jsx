// CourseCard.jsx
import { useNavigate } from "react-router-dom";
import { Clock, BarChart3, Trash2, ArrowRight, Users, Pencil } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SERVER_ORIGIN = BASE_URL?.replace(/\/api\/?$/, "") || "";

const difficultyStyles = {
  Beginner: "bg-emerald-50 text-emerald-600",
  Intermediate: "bg-amber-50 text-amber-600",
  Advanced: "bg-rose-50 text-rose-600",
};

// Gemini-style animated gradient border styles.
// Injected once; safe to render multiple CourseCard instances.
const geminiStyles = `
@property --gemini-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes gemini-spin {
  to {
    --gemini-angle: 360deg;
  }
}

.gemini-border-wrap {
  position: relative;
  border-radius: 1rem; /* matches rounded-2xl */
  padding: 2px; /* border thickness */
  background: conic-gradient(
    from var(--gemini-angle),
    #4285F4,
    #9B72CB,
    #D96570,
    #F2A93B,
    #34A853,
    #4285F4
  );
  animation: gemini-spin 6s linear infinite;
  transition: filter 0.3s ease, box-shadow 0.3s ease;
  filter: saturate(0.75) brightness(1.02);
}

.gemini-border-wrap:hover {
  animation-duration: 2.5s;
  filter: saturate(1.2) brightness(1.05);
  box-shadow: 0 0 24px 2px rgba(66, 133, 244, 0.25);
}

.gemini-border-inner {
  border-radius: calc(1rem - 2px);
  background: white;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .gemini-border-wrap {
    animation: none;
  }
  .gemini-border-wrap:hover {
    animation: none;
  }
}
`;

let stylesInjected = false;
function injectGeminiStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-gemini-card-styles", "true");
  styleEl.innerHTML = geminiStyles;
  document.head.appendChild(styleEl);
  stylesInjected = true;
}

function CourseCard({ course, onDelete }) {
  
  injectGeminiStyles();

  const navigate = useNavigate();

  const thumbnailUrl = course.thumbnail
    ? `${SERVER_ORIGIN}${course.thumbnail}`
    : null;

  const difficultyStyle =
    difficultyStyles[course.difficulty] || "bg-slate-100 text-slate-600";


  const goToCourse = () => navigate(`/courses/${course._id}`);



  const goToEditCourse = () => navigate(`/course/${course._id}`);

  return (
    <div className="gemini-border-wrap">
      <div
        onClick={goToCourse}
        className="gemini-border-inner group bg-white rounded-2xl overflow-hidden
                   cursor-pointer transition-all duration-300
                   hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1"
      >
        {/* Image section */}
        <div className="relative w-full h-40 bg-gradient-to-br from-[#0F1B3D] to-[#1E2E5C] overflow-hidden flex items-center justify-center">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span class="text-white/40 text-xs font-mono tracking-wide">NO PREVIEW</span>`;
              }}
            />
          ) : (
            <span className="text-white/40 text-xs font-mono tracking-wide">NO PREVIEW</span>
          )}

          {/* Category badge floating on the image */}
          {course.category && (
            <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-[#0F1B3D] shadow-sm">
              {course.category}
            </span>
          )}

          {/* Edit (pencil) button floating on the image, top-right */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // don't trigger the card's own onClick
              goToEditCourse();
            }}
            className="absolute top-3 right-3 flex items-center justify-center
                       w-7 h-7 rounded-full bg-white/95 backdrop-blur shadow-sm
                       text-[#0F1B3D] hover:bg-white hover:scale-105 active:scale-95 transition-all"
            aria-label="Edit course"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Card content */}
        <div className="p-4">
          <h3 className="font-bold text-[#0F1B3D] mb-1 leading-snug line-clamp-1">
            {course.title}
          </h3>

          <p className="text-sm text-slate-500 mb-3 line-clamp-2 min-h-[2.5rem]">
            {course.topic}
          </p>

          {/* Meta info row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
              <Clock className="h-3 w-3" />
              {course.duration}
            </span>
            {course.studentsEnrolled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                <Users className="h-3 w-3" />
                {course.studentsEnrolled}+
              </span>
            ) : null}
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${difficultyStyle}`}>
              <BarChart3 className="h-3 w-3" />
              {course.difficulty}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-3 border-t border-blue-50">
            <button
              onClick={(e) => {
                e.stopPropagation(); // don't double-fire with the card's own onClick
                goToCourse();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#0F1B3D] text-white
                         text-sm font-semibold py-2 rounded-lg
                         hover:bg-[#18285C] active:scale-95 transition-all"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(course._id);
              }}
              className="px-3 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-semibold
                         hover:bg-red-50 hover:border-red-400 active:scale-95 transition-all"
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