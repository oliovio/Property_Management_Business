import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white flex justify-between">
    <h1 className="text-xl font-bold">PropEase</h1>
    <div className="space-x-4">
      <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
      <Link to="/properties" className="hover:text-gray-200">Properties</Link>
      <Link to="/tenants" className="hover:text-gray-200">Tenants</Link>
      <Link to="/maintenance" className="hover:text-gray-200">Maintenance</Link>
      <Link to="/payments" className="hover:text-gray-200">Payments</Link>
    </div>
  </nav>
);

export default Navbar;
