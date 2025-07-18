import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-lg text-green-700">Ksh N/A</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Top Products</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
