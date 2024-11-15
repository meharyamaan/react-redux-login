import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../../redux/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { hideLoader, showLoader } from "../../redux/loader/loaderSLice";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loader.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader());
    if (!formData.email || !formData.password) {
      dispatch(hideLoader());
      toast.error("Passwords OR Email Missing.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/signin",
        formData
      );

      const { name, token } = response.data;

      localStorage.setItem("token", token);

      dispatch(setInfo(name));

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
      toast.success("User Login Successfull");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2 mt-2"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Link
          to="/forgotpassword"
          className="text-blue-500 hover:underline pl-2 font-semibold flex justify-end mb-2"
        >
          Forgot Password?
        </Link>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-black flex  justify-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline pl-2 font-semibold"
          >
            SignUp
          </Link>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default SignIn;
