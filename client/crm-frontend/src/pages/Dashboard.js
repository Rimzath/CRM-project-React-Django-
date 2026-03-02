import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <div>
      <h2>CRM Dashboard</h2>

      <p>You are logged in.</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
