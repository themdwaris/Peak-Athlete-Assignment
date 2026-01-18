"use client";
import { useAthleteAppContext } from "@/context/AthleteAppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn, router } = useAthleteAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    try {
      if (username.trim() === "" || password.trim() === "") return;

      if (
        username === process.env.NEXT_PUBLIC_USERNAME &&
        password === process.env.NEXT_PUBLIC_PASSWORD
      ) {
        setIsLoggedIn(true);
        router.push("/");
        localStorage.setItem("isLogged", JSON.stringify(true));
        toast.success("Login successfully");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.log("Failed to login::", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  return (
    <div className="w-full max-w-xl mx-auto rounded-lg bg-yellow-50 p-5">
      <h1 className="text-2xl mb-6 font-bold bg-linear-to-r from-[#dba456] via-black/60 to-black inline-block text-transparent bg-clip-text">
        Login as Coach
      </h1>
      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col items-center justify-center gap-5"
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-b-2 border-[#dba456] rounded-lg outline-none bg-white/80 py-1.5 px-2"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b-2 border-[#dba456] rounded-lg outline-none bg-white/80 py-1.5 px-2"
        />

        <button
          type="submit"
          className="w-full px-3 py-2 rounded-lg bg-[#dba456] text-white font-semibold cursor-pointer transition transform active:scale-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
