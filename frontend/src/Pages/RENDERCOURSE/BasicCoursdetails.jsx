export default function BasicCourseDetails({ course }) {
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-2xl p-6 w-full shadow-sm gap-6">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-gray-900">
          {course?.title || course?.course?.title || "Course"}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          {course?.description || course?.course?.description || "No description available."}
        </p>
        <div className="flex items-center gap-1 text-violet-600 text-sm font-medium">
          <span>⌂</span>
          <span>{course?.category || course?.course?.category || "Uncategorized"}</span>
        </div>
        <button className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors">
          Start
        </button>
      </div>

      {/* Right Thumbnail */}
      <div className="w-56 h-44 bg-slate-200 rounded-xl flex items-center justify-center shrink-0">
        <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center">
          <img src="/your-image.png" alt="course" className="w-12 h-12 object-contain opacity-50" />
        </div>
      </div>
    </div>
  );
}