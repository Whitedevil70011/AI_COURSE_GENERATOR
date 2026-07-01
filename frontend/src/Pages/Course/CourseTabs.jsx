// CourseTabs.jsx
const TABS = [
  { key: "chapters", label: "Chapters" },
  { key: "leaderboard", label: "Leaderboard" },
  { key: "about", label: "About" },
];

function CourseTabs({ activeTab, onChange }) {
  return (
    <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors
            ${
              activeTab === tab.key
                ? "bg-[#0F1B3D] text-white"
                : "text-slate-500 hover:text-[#0F1B3D]"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default CourseTabs;