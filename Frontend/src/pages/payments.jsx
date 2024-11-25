import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/payments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPayments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Records</h1>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id} className="bg-white shadow-md p-4 rounded mb-4">
            <h2 className="font-bold">Tenant: {payment.tenantName}</h2>
            <p>Amount: ${payment.amount}</p>
            <p>Status: {payment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
