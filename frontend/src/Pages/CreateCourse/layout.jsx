import React from "react";
import Header from "../../_components/Header";
import Sidebar from "../Dashboard/Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_28%),linear-gradient(180deg,#f8faff_0%,#eef2ff_100%)] text-slate-900 flex flex-col">
      <Header />
      <div className="flex flex-1 w-full min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_26%),linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,255,0.96))]">
        <aside className="w-72 shrink-0 border-r border-slate-200/80 bg-white/75 backdrop-blur-xl text-slate-900 shadow-[10px_0_30px_-24px_rgba(15,23,42,0.35)] hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 min-w-0">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
