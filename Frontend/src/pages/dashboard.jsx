import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import Card from '../assets/components/card'; 


const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalProperties: 0,
    totalTenants: 0,
    totalPayments: 0,
    pendingMaintenance: 0,
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch summary stats
        const summaryResponse = await axios.get("/dashboard/summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSummary(summaryResponse.data);

        // Fetch recent payments
        const paymentsResponse = await axios.get("/payments/recent", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRecentPayments(paymentsResponse.data);

        // Fetch pending maintenance requests
        const maintenanceResponse = await axios.get("/maintenance/pending", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMaintenanceRequests(maintenanceResponse.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Properties"
          description={`${summary.totalProperties} Properties`}
        />
        <Card
          title="Total Tenants"
          description={`${summary.totalTenants} Tenants`}
        />
        <Card
          title="Total Payments Collected"
          description={`$${summary.totalPayments}`}
        />
        <Card
          title="Pending Maintenance"
          description={`${summary.pendingMaintenance} Requests`}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Recent Payments */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
          <ul>
            {recentPayments.map((payment) => (
              <li
                key={payment.id}
                className="flex justify-between items-center py-2 border-b"
              >
                <span className="font-bold">{payment.tenantName}</span>
                <span>${payment.amount}</span>
                <span
                  className={`text-sm font-bold ${
                    payment.status === "Paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {payment.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Maintenance Requests */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Pending Maintenance Requests</h2>
          <ul>
            {maintenanceRequests.map((request) => (
              <li
                key={request.id}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{request.issue}</span>
                <span className="text-sm">{request.propertyName}</span>
                <span className="text-sm text-gray-500">{request.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
