import { HiOutlineChartBar } from "react-icons/hi2";
import { LuClock, LuBookOpen, LuCirclePlay, LuLayoutList } from "react-icons/lu";

function CourseDetail({ course }) {
  const data = course?.course ?? course;

  return (
    <div className="border-2 border-blue-100 bg-white p-5 md:p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(59,130,246,0.02)] mt-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        <div className="flex gap-2.5 items-start">
          <HiOutlineChartBar className="text-[#004c6d] text-2xl mt-0.5 shrink-0" />
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skill Level</h2>
            <h2 className="font-bold text-slate-800 text-sm md:text-base mt-0.5">{data?.difficulty || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2.5 items-start">
          <LuClock className="text-[#004c6d] text-2xl mt-0.5 shrink-0" />
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</h2>
            <h2 className="font-bold text-slate-800 text-sm md:text-base mt-0.5">{data?.duration || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2.5 items-start">
          <LuBookOpen className="text-[#004c6d] text-2xl mt-0.5 shrink-0" />
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Topic</h2>
            <h2 className="font-bold text-slate-800 text-sm md:text-base mt-0.5">{data?.topic || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2.5 items-start">
          <LuCirclePlay className="text-[#004c6d] text-2xl mt-0.5 shrink-0" />
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</h2>
            <h2 className="font-bold text-slate-800 text-sm md:text-base mt-0.5">{data?.category || "—"}</h2>
          </div>
        </div>

        <div className="flex gap-2.5 items-start col-span-2 md:col-span-1">
          <LuLayoutList className="text-[#004c6d] text-2xl mt-0.5 shrink-0" />
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Modules</h2>
            <h2 className="font-bold text-slate-800 text-sm md:text-base mt-0.5">
              {Array.isArray(data?.modules) ? data.modules.length : "—"}
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseDetail;