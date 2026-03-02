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
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">CRM Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/customers")}
          className="bg-white shadow-md p-6 rounded-lg cursor-pointer hover:shadow-xl"
        >
          <h2 className="text-xl font-bold">Customers</h2>
          <p className="text-gray-500">Manage all customers</p>
        </div>

        <div
          onClick={() => navigate("/leads")}
          className="bg-white shadow-md p-6 rounded-lg cursor-pointer hover:shadow-xl"
        >
          <h2 className="text-xl font-bold">Leads</h2>
          <p className="text-gray-500">Track potential customers</p>
        </div>

        <div
          onClick={logout}
          className="bg-red-500 text-white p-6 rounded-lg cursor-pointer hover:bg-red-600"
        >
          <h2 className="text-xl font-bold">Logout</h2>
          <p>Sign out of CRM</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
