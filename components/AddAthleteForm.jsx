"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";

const AddAthleteForm = () => {
  const { setOpenModal, fetchAthletes, formData, setFormData, athleteId,setAthleteId } =
    useAthleteAppContext();

  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (athleteId) {
        setLoading(true);
        const { data } = await axios.patch("/api/athletes", {
          ...formData,
          athleteId,
        });
        if (data?.success) {
          toast.success("Athlete updated");
          setLoading(false);
          setOpenModal(false);
          setFormData({ name: "", age: "", sport: "" });
          await fetchAthletes();
        } else {
          setLoading(false);
        }
      } else {
        setLoading(true);
        const { data } = await axios.post("/api/athletes", formData);
        if (data?.success) {
          toast.success("Athlete added");
          setLoading(false);
          setOpenModal(false);
          setFormData({ name: "", age: "", sport: "" });
          await fetchAthletes();
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("Failed to add athlete::", error);
      setLoading(false);
    }
  };
  return (
    <div
      className="w-full max-w-xl mx-auto pt-16 relative flex flex-col items-center justify-center rounded-lg border border-gray-300 p-4 bg-linear-to-r from-[#ffeeb5] via-gray to-black/20"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="absolute right-5 top-6 cursor-pointer transition transform active:scale-90"
        onClick={() => {
          setOpenModal(false);
          setAthleteId("")
          setFormData({ name: "", age: "", sport: "" });
        }}
      >
        <IoMdClose size={22} />
      </span>
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-3.5">
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          required
          value={formData.name}
          onChange={inputHandler}
          className="w-full outline-none px-3 py-2 rounded-lg bg-white/80"
        />
        <input
          type="text"
          placeholder="Enter Age"
          name="age"
          required
          value={formData.age}
          onChange={inputHandler}
          className="w-full outline-none px-3 py-2 rounded-lg bg-white/80"
        />
        <input
          type="text"
          placeholder="Enter Sport"
          name="sport"
          required
          value={formData.sport}
          onChange={inputHandler}
          className="w-full outline-none px-3 py-2 rounded-lg bg-white/80"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-1.5 font-semibold rounded-lg bg-[#74642F] text-white cursor-pointer transition transform active:scale-90 mt-8 mb-5"
        >
          <span className="flex items-center justify-center gap-2.5">
            {athleteId ? "Update" : "Add Athlete"}
            {loading && <Loader className={"w-5 h-5 border-t-white"} />}
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddAthleteForm;
