import React, { useState } from "react";
import { Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null)
  return (
  
      <div className="min-h-screen flex flex-col items-center p-6">
        <Navbar />
        <h1 className="text-3xl font-bold mb-6">Auth System 🚀</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/profile" element={<ProtectedRoute><Profile  user={user} setUser={setUser} /></ProtectedRoute>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
  
  );
}

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default App;
