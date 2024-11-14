import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
const Profile = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {/* Profile Initials */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-600">
            {name ? name.charAt(0) : "U"}
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

//   return (
//
//         <div className="flex items-center justify-center mb-4">
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-600">
//             {name ? name.charAt(0) : "U"}{" "}
//             {/* First letter of the user's name or a placeholder */}
//             </div>
//             </div>

//             <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
//               Hello, {name || "Guest"}!
//             </h1>

//             <div className="text-center mt-6">
//               <p className="text-gray-600">Wel Come To React-Redux Tutorial</p>
//             </div>
//
//       );
//     };

//     export default ProfilePage;
//      */
