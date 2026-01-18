"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import AddAthleteForm from "@/components/AddAthleteForm";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import React from "react";
import Modal from "@/components/Modal";
import AthleteList from "@/components/AthleteList";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const {
    setFormData,
    setOpenModal,
    openModal,
    athletes,
    loadingAthletes,
    isLoggedIn,
    setAthleteId,
    sidebarOpen,
    setSidebarOpen
  } = useAthleteAppContext();

  return (
    <div className="">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <h2 className="text-xl mb-8 font-semibold bg-linear-to-r from-[#74642F] via-black/60 to-black inline-block text-transparent bg-clip-text">
        Dashboard
      </h2>
      <div className="w-full flex flex-wrap gap-3.5">
        {isLoggedIn && (
          <div
            className="grow px-4 py-6 rounded-xl flex gap-3 items-center bg-white shadow cursor-pointer transition transform active:scale-90"
            onClick={() => {
              setOpenModal(!openModal);
              setAthleteId("");
              setFormData({ name: "", age: "", sport: "" });
            }}
          >
            <div className="p-3 rounded-lg flex justify-center items-center bg-[#74642F] text-white">
              <IoMdAdd size={30} />
            </div>
            <div className="">
              <h1 className="text-xl font-medium">Add athlete</h1>
              <p className="text-sm text-gray-600">Athletes</p>
            </div>
          </div>
        )}

        <div className="grow px-4 py-6 rounded-xl flex gap-3 items-center bg-white shadow">
          <div className="p-3 rounded-lg flex justify-center items-center bg-[#74642F] text-white">
            <MdOutlineSportsMartialArts size={30} />
          </div>
          <div className="">
            <h1 className="text-2xl font-medium">{athletes?.length}</h1>
            <p className="text-sm text-gray-600">Total Athletes</p>
          </div>
        </div>
      </div>

      <div className="">
        {loadingAthletes ? (
          <div className="flex items-center justify-center mt-10">
            <Loader className={"w-10 h-10 border-t-yellow-500"} />
          </div>
        ) : !athletes?.length ? (
          <p className="text-center text-xl font-semibold mt-10">
            No athletes found
          </p>
        ) : (
          <>
            <h1 className="text-xl font-semibold my-8 md:mb-4">Athlete List</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {athletes?.length > 0 &&
                athletes?.map((athlete) => (
                  <AthleteList key={athlete?._id} athlete={athlete} />
                ))}
            </div>
          </>
        )}
      </div>

      {openModal && (
        <Modal>
          <AddAthleteForm />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
