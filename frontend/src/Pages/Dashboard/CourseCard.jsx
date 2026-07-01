// CourseCard.jsx
import { useNavigate } from "react-router-dom";
import { Clock, BarChart3, Trash2, ArrowRight } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SERVER_ORIGIN = BASE_URL?.replace(/\/api\/?$/, "") || "";

function CourseCard({ course, onDelete }) {
  // course.title        -> course name
  // course.description  -> short description
  // course.category     -> e.g. "Programming"
  // course.topic        -> e.g. "make web dev in mern"
  // course.difficulty   -> e.g. "Beginner"
  // course.duration     -> e.g. "1 Hour"
  // course.thumbnail    -> relative path like "/uploads/xxx.png" (may be missing/null)

  const navigate = useNavigate();

  const thumbnailUrl = course.thumbnail
    ? `${SERVER_ORIGIN}${course.thumbnail}`
    : null;

   // Central place that decides where "Get Started" goes
   const goToCourse = () => navigate(`/courses/${course._id}`);

  return (
    <div
      onClick={goToCourse}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden
                 cursor-pointer transition-all duration-200
                 hover:shadow-lg hover:-translate-y-1 hover:border-[#0F1B3D]/20"
    >
      {/* Image section */}
      <div className="w-full h-40 bg-slate-100 overflow-hidden flex items-center justify-center">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `<span class="text-slate-400 text-sm">No image</span>`;
            }}
          />
        ) : (
          <span className="text-slate-400 text-sm">No image</span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
          {course.category}
        </p>

        <h3 className="font-bold text-[#0F1B3D] mb-1 leading-snug line-clamp-1">
          {course.title}
        </h3>

        <p className="text-sm text-slate-500 mb-3 line-clamp-2 min-h-[2.5rem]">
          {course.topic}
        </p>

        {/* Meta info row */}
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5" />
            {course.difficulty}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
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
            <ArrowRight className="h-4 w-4" />
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
  );
}

export default CourseCard;