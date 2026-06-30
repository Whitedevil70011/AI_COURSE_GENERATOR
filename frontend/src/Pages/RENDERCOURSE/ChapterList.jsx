import { LuClock } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

function ChapterList({ modules }) {
  if (!modules || modules.length === 0) {
    return (
      <div className="mt-4 p-6 border rounded-xl bg-white shadow-sm text-center text-gray-400">
        No chapters available yet.
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white border rounded-xl shadow-sm p-6">
      <h2 className="font-bold text-gray-800 text-lg mb-4">Chapters</h2>

      <div className="flex flex-col gap-4">
        {modules.map((module, index) => (
          <div key={module._id} className="flex gap-4 items-start border rounded-xl p-4">
            
            {/* Number Badge */}
            <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-500">{module.description || ""}</p>
              <div className="flex items-center gap-1 text-violet-600 text-xs mt-1">
                <LuClock className="text-sm" />
                <span>{module.duration || "—"}</span>
              </div>
            </div>
            <FaEdit />

          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;