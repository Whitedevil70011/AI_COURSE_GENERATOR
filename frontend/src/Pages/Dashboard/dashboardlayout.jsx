import React, { useState } from "react";
import Sidebar from "./Sidebar";

function DashboardLayout({ header, children }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("dashboard-sidebar-collapsed") === "true";
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem("dashboard-sidebar-collapsed", String(newVal));
      return newVal;
    });
  };

  return (
    <div className="flex flex-1 w-full min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_26%),linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,255,0.96))]">
      <aside className={`transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"} shrink-0 border-r border-slate-200/80 bg-white/75 backdrop-blur-xl text-slate-900 shadow-[10px_0_30px_-24px_rgba(15,23,42,0.35)] relative`}>
        <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      </aside>

      <main className="flex-1 min-w-0">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
          {header}
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
