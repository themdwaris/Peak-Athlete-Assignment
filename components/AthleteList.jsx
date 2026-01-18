"use client";
import { SlBadge } from "react-icons/sl";
import AddScoreForm from "./AddScoreForm";
import Modal from "./Modal";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AthleteList = ({ athlete }) => {
  const {
    scoreModel,
    setScoreModal,
    setOpenModal,
    setAthleteId,
    isLoggedIn,
    setFormData,
    fetchAthletes
  } = useAthleteAppContext();

  const totalScore = athlete?.scores?.reduce((acc, val) => acc + val?.score, 0);

  const deleteAthlete = async (athleteId) => {
    try {
      const { data } = await axios.delete("/api/athletes", {
        data: { athleteId },
      });
      if(data?.success){
        toast.success("Deleted successully")
        await fetchAthletes()
      }
    } catch (error) {
      toast.error("Failed to delete")
      console.log("Failed to delete::",error);
      
    }
  };
  return (
    <div className="p-5 rounded-lg bg-white/80 shadow">
      <span>
        {totalScore >= 100 ? (
          <SlBadge size={35} color="green" />
        ) : totalScore >= 50 && totalScore < 100 ? (
          <SlBadge size={35} color="blue" />
        ) : (
          <SlBadge size={35} color="red" />
        )}
      </span>
      <div className="flex flex-col gap-1 mt-3">
        <p className="text-lg font-semibold">{athlete?.name}</p>
        <p className="">
          <span className="text-sm text-gray-700">Age: </span>
          <span className="text-black text-md md:text-lg">{athlete?.age}</span>
        </p>
        <p className="">
          <span className="text-sm text-gray-700">Sport: </span>
          <span className="text-black text-md md:text-lg">{athlete?.sport}</span>
        </p>

        <p className="">
          <span className="text-sm text-gray-700">Score: </span>
          <span className="text-black text-md md:text-lg">{totalScore}</span>
        </p>

        {isLoggedIn && (
          <div className="flex items-center justify-between flex-wrap gap-2 mt-4">
            <button
              className="px-3 py-1 text-white text-xs font-semibold bg-blue-900 cursor-pointer rounded-md transition transform active:scale-90"
              onClick={() => {
                setScoreModal(!scoreModel);
                setOpenModal(false);
                setAthleteId(athlete?._id);
              }}
            >
              Add score
            </button>
            <button
              className="px-3 py-1 text-white text-xs font-semibold bg-green-900 cursor-pointer rounded-md transition transform active:scale-90"
              onClick={() => {
                setFormData({
                  name: athlete?.name,
                  age: athlete?.age,
                  sport: athlete?.sport,
                });
                setAthleteId(athlete?._id);
                setOpenModal(true);
              }}
            >
              Update
            </button>

            <button
              className="px-3 py-1 text-white text-xs font-semibold bg-red-900 cursor-pointer rounded-md transition transform active:scale-90"
              onClick={() => deleteAthlete(athlete?._id)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      {scoreModel && (
        <Modal>
          <AddScoreForm />
        </Modal>
      )}
    </div>
  );
};

export default AthleteList;
