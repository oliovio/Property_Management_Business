import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="bg-gray-200 w-64 h-screen p-4">
    <ul className="space-y-4">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/properties">Properties</Link></li>
      <li><Link to="/tenants">Tenants</Link></li>
      <li><Link to="/maintenance">Maintenance</Link></li>
      <li><Link to="/payments">Payments</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
