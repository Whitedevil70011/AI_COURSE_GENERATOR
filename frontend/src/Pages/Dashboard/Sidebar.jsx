import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IoHomeOutline, IoShieldOutline, IoLogOut } from "react-icons/io5";
import { RiStackFill } from "react-icons/ri";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BUILD_STAGES = ["Create", "Review", "Ship"];

function Sidebar({ isCollapsed, onToggle, courseCount = 6, buildStage = "Review" }) {
  const { logout } = useAuth0();
  const stageIndex = Math.max(0, BUILD_STAGES.indexOf(buildStage));

  const menuItems = [
    { id: 1, name: "Home", icon: <IoHomeOutline />, path: "/dashboard" },
    { id: 2, name: "Create Course", icon: <RiStackFill />, path: "/create-course" },
    { id: 3, name: "Upgrade", icon: <IoShieldOutline />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <IoLogOut />, path: "/dashboard/logout" },
  ];

  return (
    <div
      className={`relative flex h-full min-h-[calc(100vh-73px)] flex-col bg-white transition-all duration-300 ${
        isCollapsed ? "items-center gap-6 p-3 py-6" : "gap-7 p-5 lg:p-6"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3.5 top-8 z-50 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all hover:text-[#4F46E5] hover:shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Workspace brand */}
      {isCollapsed ? (
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/15">
          <span className="text-lg font-bold">C</span>
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#F59E0B] ring-2 ring-white" />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/70">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] text-white shadow-lg shadow-indigo-500/25">
            <span className="text-lg font-bold">C</span>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#F59E0B] ring-2 ring-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Workspace</p>
            <h2 className="m-0 truncate text-[15px] font-bold text-[#10122B]">CourseGenius</h2>
          </div>
        </div>
      )}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Navigation */}
      <ul className="flex w-full flex-col gap-1.5">
        {menuItems.map((item) => {
          const isLogout = item.name === "Logout";

          const content = (isActive) => (
            <>
              {isActive && !isCollapsed && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#4F46E5]" />
              )}
              <span
                className={[
                  "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-200",
                  isLogout
                    ? "text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600"
                    : isActive
                    ? "bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-900",
                ].join(" ")}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <span
                  className={
                    isActive
                      ? "font-semibold text-[#10122B]"
                      : "font-medium text-slate-600 group-hover:text-slate-900"
                  }
                >
                  {item.name}
                </span>
              )}
              {isCollapsed && (
                <div className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                  {item.name}
                </div>
              )}
            </>
          );

          return (
            <li key={item.id} className="w-full">
              {isLogout ? (
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  className={[
                    "group relative flex w-full cursor-pointer items-center border border-transparent text-left transition-all duration-200",
                    isCollapsed
                      ? "mx-auto h-12 w-12 justify-center rounded-2xl"
                      : "gap-3 rounded-2xl px-3 py-2.5 text-[15px]",
                    "hover:border-rose-100/60 hover:bg-rose-50/50",
                  ].join(" ")}
                >
                  {content(false)}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    [
                      "group relative flex items-center border border-transparent transition-all duration-200",
                      isCollapsed
                        ? "mx-auto h-12 w-12 justify-center rounded-2xl"
                        : "gap-3 rounded-2xl px-3 py-2.5 text-[15px]",
                      isActive ? "border-indigo-100/60 bg-indigo-50/40" : "hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => content(isActive)}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>

      {/* Build meter — mirrors the dashboard's own "Create, review, ship" language */}
      {!isCollapsed && (
        <div className="mt-auto rounded-3xl border border-slate-200/60 bg-gradient-to-b from-white to-slate-50/80 p-4.5 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#10122B]">Your build</p>
              <p className="mt-0.5 truncate text-xs text-slate-500">{courseCount} courses in your library</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#F59E0B]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#B45309]">
              {buildStage}
            </span>
          </div>

          <div className="mt-4 flex items-center">
            {BUILD_STAGES.map((stage, i) => (
              <React.Fragment key={stage}>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full ring-4 transition-colors",
                      i <= stageIndex ? "bg-[#4F46E5] ring-indigo-100" : "bg-slate-200 ring-slate-50",
                    ].join(" ")}
                  />
                  <span
                    className={`text-[10px] font-semibold ${
                      i <= stageIndex ? "text-[#10122B]" : "text-slate-400"
                    }`}
                  >
                    {stage}
                  </span>
                </div>
                {i < BUILD_STAGES.length - 1 && (
                  <span
                    className={`mx-1 mb-4 h-px flex-1 ${i < stageIndex ? "bg-[#4F46E5]" : "bg-slate-200"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
            Upgrade for unlimited generations, exports, and premium lesson tools.
          </p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;