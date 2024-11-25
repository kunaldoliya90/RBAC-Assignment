// src/pages/Dashboard.js
import React from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { auth } = React.useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {auth.role}!</h1>
      {auth.role === "Admin" && <p>Admin Panel: Manage users, roles, etc.</p>}
      {auth.role === "Moderator" && <p>Moderator Panel: Moderate content.</p>}
      {auth.role === "User" && <p>User Dashboard: View your data.</p>}
    </div>
  );
};

export default Dashboard;
