import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/properties", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProperties(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Manage Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id} className="bg-white shadow-md p-4 rounded mb-4">
            <h2 className="font-bold">{property.name}</h2>
            <p>{property.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Properties;
