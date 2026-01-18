"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";

const AddScoreForm = () => {
  const { setScoreModal, setOpenModal, fetchAthletes, athleteId } =
    useAthleteAppContext();
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  const sumbitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/add-score", { score, athleteId });
      if (data?.success) {
        toast.success("Score added");
        setScoreModal(false);
        setScore("");
        setLoading(false);
        await fetchAthletes();
      }
    } catch (error) {
      console.log("Failed to add score::", error);
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
          setScoreModal(false);
          setOpenModal(false);
        }}
      >
        <IoMdClose size={22} color="white" />
      </span>
      <form onSubmit={sumbitHandler} className="w-full flex flex-col gap-3.5">
        <input
          type="number"
          placeholder="Enter Score"
          name="score"
          required
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full outline-none px-3 py-2 rounded-lg bg-white/80"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-1.5 font-semibold rounded-lg bg-[#74642F] text-white cursor-pointer transition transform active:scale-90 mt-8 mb-5"
        >
          <span className="flex items-center justify-center gap-2.5">
            {"Add score"}
            {loading && <Loader className={"w-5 h-5 border-t-white"} />}
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddScoreForm;
