// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to Our App
      </h1>
      <button
        onClick={() => navigate("/signup")}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 mb-4"
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/signin")}
        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        Sign In
      </button>
    </div>
  );
}

export default Home;
