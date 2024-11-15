import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import BG from "../images/BG.png";
import User from "../images/user.png";
import { persistor } from "../redux/store";
const Profile = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    persistor.purge();
    navigate("/signin");
  };
  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      style={{
        backgroundImage: `url(${BG})`,
        background: "cover",
      }}
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {/* Profile Initials */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-600">
            <img
              src={User}
              alt="user-image"
              className="w-auto h-auto rounded-full"
            />
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Hello, {name || "Guest"}!
        </h1>

        {/* Tutorial Welcome Text */}
        <p className="text-gray-600 mb-6">
          Welcome to the React-Redux Tutorial!
        </p>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
