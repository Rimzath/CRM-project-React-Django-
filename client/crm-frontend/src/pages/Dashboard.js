import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_customers: 0,
    total_leads: 0,
    converted_leads: 0,
  });

  const getStats = async () => {
    try {
      const res = await API.get("/dashboard/stats/");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">CRM Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Total Customers</h2>
          <p className="text-3xl font-bold">{stats.total_customers}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Total Leads</h2>
          <p className="text-3xl font-bold">{stats.total_leads}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-gray-500">Converted Leads</h2>
          <p className="text-3xl font-bold">{stats.converted_leads}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/customers")}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Manage Customers
        </button>

        <button
          onClick={() => navigate("/leads")}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Manage Leads
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
