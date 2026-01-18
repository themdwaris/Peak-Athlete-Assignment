"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import { SlBadge } from "react-icons/sl";

const Leaderboard = () => {
  const { athletes, loadingAthletes } = useAthleteAppContext();

  const rankedAthlete = athletes?.sort(
    (a, b) =>
      b?.scores?.reduce((acc, val) => acc + val?.score, 0) -
      a?.scores?.reduce((acc, val) => acc + val?.score, 0),
  );
  if (loadingAthletes)
    return <p className="text-center text-xl font-semibold py-4">Loading...</p>;
  if (!athletes.length)
    return (
      <p className="text-center text-xl font-semibold mt-10">
        No athletes found
      </p>
    );

  return (
    <div>
      <h2 className="text-xl mb-8 font-semibold bg-linear-to-r from-[#74642F] via-black/60 to-black inline-block text-transparent bg-clip-text">
        Leaderboard
      </h2>

      <div className="overflow-x-auto">
        <div className="mt-2 flex flex-col gap-4 items-center min-w-4xl">
          {/* ***********table head row*********** */}
          <div className="w-full grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1.5fr_2fr_1.5fr] p-1 border bg-[#74642F] text-white bg-opacity-[37.3%] shrink-0">
            <p className=" pl-3 ">Badge</p>
            <p className=" md:pl-0">Name</p>
            <p className=" ">Age</p>
            <p className=" ">Sport</p>
            <p className=" ">Scores</p>
          </div>

          {/* // **********Product table********* */}
          {rankedAthlete?.map((p, index) => {
            const totalScore = p?.scores?.reduce(
              (acc, val) => acc + val?.score,
              0,
            );
            return (
              <div
                key={index}
                className="w-full grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1.5fr_2fr_1.5fr] px-2 border-b border-gray-300 items-center justify-center pb-5 shrink-0"
              >
                {/* image */}
                <div className="p-3 bg-[#e4e3dd] w-fit ">
                  <span>
                    {totalScore >= 100 ? (
                      <SlBadge size={35} color="green" />
                    ) : totalScore >= 50 && totalScore < 100 ? (
                      <SlBadge size={35} color="blue" />
                    ) : (
                      <SlBadge size={35} color="red" />
                    )}
                  </span>
                </div>

                {/* Title */}
                <div className="w-full">
                  <p className={`text-sm font-semibold`}>{p.name}</p>
                </div>

                <div className="w-full">
                  <p className={`text-sm font-semibold`}>{p.age}</p>
                </div>

                <div className="w-full">
                  <p className={`text-sm font-semibold`}>{p.sport}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                  <span className="cursor-pointer font-semibold text-green-900 transition transform active:scale-90">
                    {p?.scores?.reduce((acc, val) => acc + val?.score, 0)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
