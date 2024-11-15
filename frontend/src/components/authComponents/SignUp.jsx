import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader";

import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loader/loaderSLice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader());

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      dispatch(hideLoader());
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/signup",
        formData
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/verifyOtp", { state: { email: formData.email } });
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      dispatch(hideLoader());
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
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
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-black flex  justify-end ">
            Already Have an Account?{" "}
            <Link
              to="/signin"
              className="text-blue-500 hover:underline pl-2 font-semibold"
            >
              SignIn
            </Link>
          </p>
        </form>
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </>
  );
};

export default SignUp;
