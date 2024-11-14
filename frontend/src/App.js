import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import SignUp from "./components/authComponents/SignUp";
import VerifyOtp from "./components/authComponents/VerifyOtp";
import SignIn from "./components/authComponents/SignIn";
import Home from "./components/homepage";
import Profile from "./components/profile";
import ProtectedRoute from "./middlewares/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
