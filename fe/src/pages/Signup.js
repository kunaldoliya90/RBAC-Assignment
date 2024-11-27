// src/pages/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ username: "", password: "", role: "User" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", user);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Moderator">Moderator</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
