import React from "react";

const Card = ({ title, description }) => (
  <div className="bg-white shadow-md rounded p-6 text-center">
    <h2 className="text-xl font-bold text-gray-700 mb-2">{title}</h2>
    <p className="text-lg text-gray-500">{description}</p>
  </div>
);

export default Card;
