import React from "react";
import Sidebar from "./Sidebar";
import AddCourse from "./Addcourse";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-1 w-full min-h-[calc(100vh-73px)] bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(241,245,255,0.98))]">
      <div className="w-72 shrink-0 border-r border-slate-200/80 bg-white/75 backdrop-blur-xl text-slate-900 shadow-[10px_0_30px_-24px_rgba(15,23,42,0.35)]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
       <AddCourse />
       {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
