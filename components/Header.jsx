"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";

const Header = () => {
  const { sidebarOpen, setSidebarOpen, isLoggedIn, setIsLoggedIn } =
    useAthleteAppContext();

  //Prevent scroll when sidebar menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="w-full fixed top-0 py-3 px-5 flex items-center justify-between z-50 border-b border-gray-200 bg-linear-to-b from-[#EDEBE4] to-white">
      <div className="flex items-center gap-2">
        <span
          className="cursor-pointer inline-block md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MdMenuOpen size={24} />
        </span>
        <Link
          href={"/"}
          className="cursor-pointer font-medium text-xl md:text-2xl"
        >
          <span>Peak </span>
          <span className="font-serif italic text-[#dba456]">athlete</span>
        </Link>
      </div>
      {isLoggedIn ? (
        <button
          className="px-4 py-1.5 rounded-full cursor-pointer flex items-center justify-center font-semibold md:font-medium gap-1.5 bg-[#dba456] text-sm text-white transition transform active:scale-90 hover:bg-[#c48b3a]"
          onClick={() => {
            setIsLoggedIn(false);
            localStorage.removeItem("isLogged");
          }}
        >
          Logout
        </button>
      ) : (
        <Link
          href={"/login"}
          className="px-4 py-1.5 rounded-full cursor-pointer flex items-center justify-center font-semibold md:font-medium gap-1.5 bg-[#dba456] text-sm text-white transition transform active:scale-90 hover:bg-[#c48b3a]"
        >
          Login as Coach
        </Link>
      )}
    </div>
  );
};

export default Header;
