import { LuClock } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

function ChapterList({ modules }) {
  if (!modules || modules.length === 0) {
    return (
      <div className="mt-6 p-8 border-2 border-blue-100 rounded-2xl bg-white shadow-sm text-center text-slate-400">
        No chapters available yet.
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white border-2 border-blue-100 rounded-2xl shadow-[0_4px_20px_-2px_rgba(59,130,246,0.02)] p-6">
      <h2 className="font-bold text-[#0F1B3D] text-lg mb-5">Chapters & Modules</h2>

      <div className="flex flex-col gap-4">
        {modules.map((module, index) => (
          <div 
            key={module._id || index} 
            className="relative flex gap-4 items-start border-2 border-blue-100 rounded-xl p-5 hover:bg-slate-50/30 transition-all pr-12"
          >
            {/* Number Badge */}
            <div className="w-9 h-9 rounded-full bg-[#004c6d] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm shadow-[#004c6d]/20">
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1.5 flex-1">
              <h3 className="font-bold text-slate-800 text-base">{module.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{module.description || ""}</p>
              <div className="flex items-center gap-1 text-[#004c6d] text-xs font-semibold mt-1">
                <LuClock className="text-sm" />
                <span>{module.duration || "—"}</span>
              </div>
            </div>
            
            <button className="absolute top-4.5 right-4.5 text-slate-400 hover:text-[#004c6d] p-1.5 rounded-lg hover:bg-slate-100/80 transition-all shrink-0 hover:scale-105 active:scale-95">
              <FaEdit className="w-4.5 h-4.5" />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;