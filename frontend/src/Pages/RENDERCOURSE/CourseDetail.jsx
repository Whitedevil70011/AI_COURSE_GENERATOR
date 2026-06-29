import { HiOutlineChartBar } from "react-icons/hi2";
import { LuClock, LuBookOpen, LuCirclePlay, LuLayoutList } from "react-icons/lu";

function CourseDetail({ course }) {
  const data = course?.course ?? course;

  return (
    <div className="border bg-white p-6 rounded-xl shadow-sm mt-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        <div className="flex gap-2 items-start">
          <HiOutlineChartBar className="text-violet-600 text-2xl mt-1 shrink-0" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-semibold text-gray-900 text-base">{data?.difficulty || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <LuClock className="text-violet-600 text-2xl mt-1 shrink-0" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-semibold text-gray-900 text-base">{data?.duration || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <LuBookOpen className="text-violet-600 text-2xl mt-1 shrink-0" />
          <div>
            <h2 className="text-xs text-gray-500">Topic</h2>
            <h2 className="font-semibold text-gray-900 text-base">{data?.topic || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <LuCirclePlay className="text-violet-600 text-2xl mt-1 shrink-0" />
          <div>
            <h2 className="text-xs text-gray-500">Category</h2>
            <h2 className="font-semibold text-gray-900 text-base">{data?.category || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <LuLayoutList className="text-violet-600 text-2xl mt-1 shrink-0" />
          <div>
            <h2 className="text-xs text-gray-500">Modules</h2>
            <h2 className="font-semibold text-gray-900 text-base">
              {Array.isArray(data?.modules) ? data.modules.length : "—"}
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseDetail;