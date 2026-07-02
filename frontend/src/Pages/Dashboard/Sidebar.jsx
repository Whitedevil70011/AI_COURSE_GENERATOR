import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IoHomeOutline, IoShieldOutline, IoLogOut } from "react-icons/io5";
import { RiStackFill } from "react-icons/ri";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "../../components/ui/progress";

function Sidebar({ isCollapsed, onToggle }) {
  const { logout } = useAuth0();

  const menuItems = [
    { id: 1, name: "Home", icon: <IoHomeOutline />, path: "/dashboard" },
    { id: 2, name: "Create Course", icon: <RiStackFill />, path: "/create-course" },
    { id: 3, name: "Upgrade", icon: <IoShieldOutline />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <IoLogOut />, path: "/dashboard/logout" }
  ];

  return (
    <div className={`relative flex h-full min-h-[calc(100vh-73px)] flex-col transition-all duration-300 ${isCollapsed ? "p-3 py-6 gap-6 items-center" : "p-5 lg:p-6 gap-6"}`}>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-8 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Workspace Header */}
      {isCollapsed ? (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,1),rgba(109,40,217,1))] text-white shadow-lg shadow-violet-500/20 ring-1 ring-slate-200/70">
          <span className="text-lg font-bold">C</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/70">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,1),rgba(109,40,217,1))] text-white shadow-lg shadow-violet-500/20">
            <span className="text-lg font-bold">C</span>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">Workspace</p>
            <h2 className="m-0 text-sm font-bold text-[#0F1B3D]">CourseGenius</h2>
          </div>
        </div>
      )}

      <div className="h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <ul className="flex flex-col gap-2 w-full">
        {menuItems.map((item) => (
          <li key={item.id} className="w-full">
            {item.name === "Logout" ? (
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className={[
                  "group relative flex items-center transition-all duration-200 cursor-pointer w-full text-left",
                  isCollapsed
                    ? "h-12 w-12 justify-center mx-auto rounded-2xl"
                    : "gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-medium w-full",
                  "text-slate-600 hover:bg-red-50 hover:text-red-600",
                ].join(" ")}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-105">
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.name}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-950 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity whitespace-nowrap shadow-md z-50">
                    {item.name}
                  </div>
                )}
              </button>
            ) : (
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center transition-all duration-200",
                    isCollapsed
                      ? "h-12 w-12 justify-center mx-auto rounded-2xl"
                      : "gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-medium w-full",
                    isActive
                      ? "bg-[#E5ECF9] text-[#2563eb] shadow-md shadow-blue-500/5 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")
                }
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-105">
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.name}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-950 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity whitespace-nowrap shadow-md z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Plan progress block */}
      {!isCollapsed && (
        <div className="mt-auto rounded-3xl border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,245,255,0.92))] p-4 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[15px] font-semibold text-slate-900">Plan progress</p>
              <p className="mt-1 text-[13px] text-slate-500">5 of 3 AI courses complete</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              33%
            </span>
          </div>
          <div className="mt-4">
            <Progress value={33} />
          </div>
          <p className="mt-3 text-[13px] leading-5 text-slate-500">
            Upgrade your plan for more generations, exports, and premium lesson tools.
          </p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

