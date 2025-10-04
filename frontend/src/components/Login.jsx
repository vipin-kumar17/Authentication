import React, { useState } from "react";
import API from "../api";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Login({setUser}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: form.email, password: form.password },
        { withCredentials: true }
      );
      
      localStorage.setItem("token", res.data.token);
      alert("Login successful")
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full mb-4 p-2 border rounded" />
      <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
    </form>
  );
}
