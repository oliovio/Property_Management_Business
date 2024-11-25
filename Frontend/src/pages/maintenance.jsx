import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const Maintenance = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/maintenance", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRequests(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Maintenance Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="bg-white shadow-md p-4 rounded mb-4">
            <h2 className="font-bold">Issue: {request.issue}</h2>
            <p>Property: {request.propertyName}</p>
            <p>Status: {request.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maintenance;
