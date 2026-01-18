"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import React from "react";

const Modal = ({ children }) => {
  const { setOpenModal } = useAthleteAppContext();
  return (
    <div
      className="w-full fixed inset-0 z-40 flex items-center justify-center h-screen backdrop-blur-sm px-5"
      onClick={(e) => {
        e.stopPropagation();
        setOpenModal(false);
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
