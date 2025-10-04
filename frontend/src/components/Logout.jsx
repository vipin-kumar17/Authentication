import React from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await API.get("/logout");
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/Login");
  };

  return <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>;
}
