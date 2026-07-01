// CourseCard.jsx

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // same env var your CreateCourse.jsx already uses
const SERVER_ORIGIN = BASE_URL?.replace(/\/api\/?$/, "") || "";

function CourseCard({ course, onGetStarted, onDelete }) {
  // course.title        -> course name
  // course.description  -> short description
  // course.category     -> e.g. "Programming"
  // course.topic        -> e.g. "make web dev in mern"
  // course.difficulty   -> e.g. "Beginner"
  // course.duration     -> e.g. "1 Hour"
  // course.thumbnail    -> relative path like "/uploads/xxx.png" (may be missing/null)

  // Build the full thumbnail URL, or null if none exists
  const thumbnailUrl = course.thumbnail
    ? `${SERVER_ORIGIN}${course.thumbnail}`
    : null;

  return (
    <div
      onClick={() => onGetStarted && onGetStarted(course._id)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden 
                 cursor-pointer transition-all duration-200
                 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
    >

      {/* Image section - always reserves the same height, whether image loads or not */}
      <div className="w-full h-40 bg-gray-100 overflow-hidden flex items-center justify-center">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            // If the image URL is broken/fails to load, swap to a fallback instead of showing a broken icon
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `<span class="text-gray-400 text-sm">No image</span>`;
            }}
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
          {course.title}
        </h3>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-3">
          {course.category}
        </p>

        {/* Meta info row */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span>📘 {course.topic}</span>
          <span>⏱ {course.duration}</span>
          <span>📊 {course.difficulty}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onGetStarted) onGetStarted(course._id);
            }}
            className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg 
                       hover:bg-blue-700 active:scale-95 transition-all"
          >
            Get Started
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(course._id);
            }}
            className="px-3 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-semibold 
                       hover:bg-red-50 hover:border-red-400 active:scale-95 transition-all"
          >
            🗑
          </button>
        </div>

      </div>
    </div>
  );
}

export default CourseCard;