import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/signup", form);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input name="name" onChange={handleChange} placeholder="Name" className="w-full mb-3 p-2 border rounded" />
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full mb-4 p-2 border rounded" />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Signup</button>
    </form>
  );
}
