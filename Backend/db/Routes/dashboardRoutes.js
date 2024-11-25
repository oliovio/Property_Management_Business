const express = require("express");
const db = require("../config/db"); // Adjust the path based on your DB config file
const router = express.Router();

// Endpoint: GET /dashboard/summary
router.get("/summary", async (req, res) => {
  try {
    const [properties] = await db.query("SELECT COUNT(*) AS total FROM properties");
    const [tenants] = await db.query("SELECT COUNT(*) AS total FROM tenants");
    const [payments] = await db.query("SELECT SUM(amount) AS total FROM payments WHERE status = 'Paid'");
    const [maintenance] = await db.query("SELECT COUNT(*) AS total FROM maintenance WHERE status = 'Pending'");

    res.json({
      totalProperties: properties[0].total,
      totalTenants: tenants[0].total,
      totalPayments: payments[0].total || 0,
      pendingMaintenance: maintenance[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
});

// Endpoint: GET /payments/recent
router.get("/payments/recent", async (req, res) => {
  try {
    const [recentPayments] = await db.query(`
      SELECT tenant_name AS tenantName, amount, status 
      FROM payments 
      ORDER BY payment_date DESC 
      LIMIT 5
    `);
    res.json(recentPayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recent payments" });
  }
});

// Endpoint: GET /maintenance/pending
router.get("/maintenance/pending", async (req, res) => {
  try {
    const [pendingRequests] = await db.query(`
      SELECT issue, property_name AS propertyName, status 
      FROM maintenance 
      WHERE status = 'Pending' 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    res.json(pendingRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch maintenance requests" });
  }
});

module.exports = router;
