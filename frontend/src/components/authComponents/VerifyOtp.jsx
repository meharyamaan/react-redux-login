import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const location = useLocation();
  const { email } = location.state || {};

  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if current one is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter a complete OTP.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/auth/verifyotp",
          {
            email: email,
            otp: otpValue,
          }
        );

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {email ? (
        <p className="mb-4 p-4 text-green-800 bg-green-100 rounded-xl">
          OTP sent to {email} mail..
        </p>
      ) : (
        <p className="mb-4 p-4 text-green-800 bg-green-100 rounded-xl">
          Email Not Found
        </p>
      )}
      <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>

      <div className="flex justify-between mb-6">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Verify OTP
      </button>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default VerifyOtp;
