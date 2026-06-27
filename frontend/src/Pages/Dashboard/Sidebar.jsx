import React from "react";
import { IoHomeOutline, IoShieldOutline, IoLogOut } from "react-icons/io5";
import { RiStackFill } from "react-icons/ri";
import { Progress } from "../../components/ui/progress";

function Sidebar() {
  const menuItems = [
    { id: 1, name: "Home", icon: <IoHomeOutline />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <RiStackFill />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <IoShieldOutline />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <IoLogOut />, path: "/dashboard/logout" }
  ];

  return (
    <div className="relative h-full min-h-[calc(100vh-73px)] p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {/* <img
          src="/logo.png"
          alt="Logo"
          width={156}
          height={52}
          className="h-12 w-auto object-contain"
        /> */}
      </div>
      <hr className="border-slate-200" />
      {/* <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-600 shadow-sm">
        Build lessons, track progress, and generate course plans from one
        workspace.
      </div> */}
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-1000 hover:bg-slate-50 transition-all duration-200"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-10 left-6 right-6" >
        <Progress value={33} />
        <p className="text-xs font-medium text-slate-700 mt-2">5 Out of 3 complete</p>
        <p className="text-[10px] text-slate-500 mt-1">Upgrade your plan for unlimited access</p>
      </div>
    </div>
  );
}

export default Sidebar;

