import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { hideLoader, showLoader } from "../../redux/loader/loaderSLice";
const ForgotPassword = () => {
  const loading = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoader());
    if (!email) {
      toast.error("Email Missing.");
      dispatch(hideLoader());
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/forgotpassword",
        email
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/resetpassword");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-40">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold text-center mb-6">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email.email}
            onChange={handleChange}
            required
            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default ForgotPassword;
