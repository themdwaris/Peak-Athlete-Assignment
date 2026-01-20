"use client";
import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { HiClipboardList, HiOutlineLogout } from "react-icons/hi";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, router, setIsLoggedIn, isLoggedIn } =
    useAthleteAppContext();
  const pathname = usePathname();
  const navItems = [
    { path: "/", label: "Dashboard", Icon: MdSpaceDashboard },
    { path: "/leaderboard", label: "Leaderboard", Icon: HiClipboardList },
  ];

  return (
    <div
      className={`
    fixed top-14 left-0 z-50 w-60 h-[calc(100vh-56px)] bg-linear-to-r from-[#EDEBE4] to-white border-r border-r-gray-200 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
  `}
    >
      <div className="my-6 w-full">
        <div className="mt-4 flex gap-1.5 flex-col pl-4 pr-3 select-none">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.Icon;
            return (
              <div
                key={item.label}
                onClick={() => {
                  router.push(item.path);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-2 text-sm font-medium p-2 rounded-md cursor-pointer select-none transition transform active:scale-90`}
                style={{ backgroundColor: isActive ? "#74642F" : "" }}
              >
                <span className={`${isActive ? "text-white" : "text-black"}`}>
                  <Icon size={18} />
                </span>
                <span className={`${isActive ? "text-white" : "text-black"}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-10 py-6 flex items-center justify-between gap-2.5">
        {isLoggedIn && (
          <button
            className="cursor-pointer px-4 py-2 rounded-full flex items-center gap-1.5 bg-[#74642F] text-sm text-white transition transform active:scale-90 hover:bg-[#55481d]"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("isLogged");
            }}
          >
            <HiOutlineLogout size={20} />
            <span className="cursor-pointer">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
