import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInfo } from "../../redux/auth/authSlice";
const SignIn = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //  setFormData((prevFormData) => ({ ...prevFormData, [email.name]: email.value,}))
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.email || !formData.password) {
      setError("Passwords OR Email Missing.");
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

      setSuccessMessage("User Login Successfull");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      {error && (
        <div className="mb-4 p-4 text-red-800 bg-red-100 rounded-xl">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-100 rounded-xl">
          {successMessage}
        </div>
      )}
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
        <p className="text-black flex  justify-end ">
          Don't Have an Account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline pl-2 font-semibold"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
