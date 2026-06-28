import React from "react";
import Header from "../../_components/Header";
function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_28%),linear-gradient(180deg,#f8faff_0%,#eef2ff_100%)] text-slate-900 flex flex-col">
      <Header />
      <div className="flex-1 max-w-5xl mx-auto px-6 py-10 md:px-8 md:py-12 w-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;
