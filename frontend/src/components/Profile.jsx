import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios"


export default function Profile() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null); // state se user hata do
      navigate("/login"); // logout ke baad login page dikhao
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };






  useEffect(() => {;
    API.get("/profile")
      .then(res => setUser(res.data.user))
      .catch(err => {
        console.error(err);
        alert("Please login");
       
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
        Logout
      </button>
         
        </>
      ) : <p>No user data</p>}
    </div>
  );
}
