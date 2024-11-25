import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get("/tenants", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTenants(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Manage Tenants</h1>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id} className="bg-white shadow-md p-4 rounded mb-4">
            <h2 className="font-bold">{tenant.name}</h2>
            <p>Email: {tenant.email}</p>
            <p>Phone: {tenant.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tenants;
