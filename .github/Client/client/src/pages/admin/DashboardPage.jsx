import React from "react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-2xl text-blue-600">N/A</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-2xl text-green-600">N/A</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-2xl text-red-600">Ksh N/A</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
