import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

//auth compnents
import SignUp from "./components/authComponents/SignUp";
import VerifyOtp from "./components/authComponents/VerifyOtp";
import SignIn from "./components/authComponents/SignIn";
import ForgotPassword from "./components/authComponents/ForgotPassword";
import ResetPassword from "./components/authComponents/ResetPassword";
//other components
import Home from "./components/homepage";
import Profile from "./components/profile";

//Middlewares
import ProtectedRoute from "./middlewares/ProtectedRoute";
import Loader from "./components/Loader";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Other comps */}
        <Route path="/" element={<Home />} />
        <Route path="/loader" element={<Loader />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/*auth comps */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
