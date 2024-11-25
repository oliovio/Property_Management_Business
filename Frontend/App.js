import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './assets/components/navbar'; // Ensure the file is named `navbar.jsx` or update this path accordingly
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import Properties from './pages/properties';
import Tenants from './pages/tenants';
import Maintenance from './pages/maintenance';
import Payments from './pages/payments';
import './styles.css'; // Include global styles if applicable

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="content-container">
                {/* Ensure your global styles define proper margins/paddings */}
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/tenants" element={<Tenants />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/payments" element={<Payments />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
