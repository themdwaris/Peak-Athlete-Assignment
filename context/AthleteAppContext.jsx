"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AthleteAppContext = createContext();

export const AthleteAppContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [scoreModel, setScoreModal] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [athleteId, setAthleteId] = useState();
  const [formData, setFormData] = useState({ name: "", age: "", sport: "" });
  const [loadingAthletes, setLoadingAthletes] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogged")||"";
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const fetchAthletes = async () => {
    try {
      setLoadingAthletes(true);
      const data = await axios.get("/api/athletes");
      //   console.log(data);
      console.log(data.data);

      if (data?.data?.success) {
        setAthletes(data?.data?.athletes);
        setLoadingAthletes(false);
      } else {
        setLoadingAthletes(false);
      }
    } catch (error) {
      console.log("Failed to fetch athletes::", error);
      setLoadingAthletes(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  return (
    <AthleteAppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        isLoggedIn,
        setIsLoggedIn,
        router,
        openModal,
        setOpenModal,
        athletes,
        setAthletes,
        loadingAthletes,
        fetchAthletes,
        scoreModel,
        setScoreModal,
        athleteId,
        setAthleteId,
        formData,
        setFormData,
      }}
    >
      {children}
    </AthleteAppContext.Provider>
  );
};

export const useAthleteAppContext = () => useContext(AthleteAppContext);
