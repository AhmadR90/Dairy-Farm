import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./components/CreateAccount";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import OTP from "./components/OTP";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/ResetPassword";
import Members from "./components/Members";
import GroupMembers from "./components/GroupMembers";
import FramMembers from "./components/FarmMembers";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./components/Projects";
import ChatMessage from "./components/Chat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/otp" element={<OTP />}></Route>
          <Route element={<ProtectedRoute />}>
        

            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/members" element={<Members />}></Route>
            <Route path="/groupmembers" element={<GroupMembers />}></Route>
            <Route path="/framMembers" element={<FramMembers />}></Route>
            <Route path="/chatmessage" element={<ChatMessage />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
