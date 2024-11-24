const connection = require('../db/connection');

const addRequest = (req, res) => {
    const { tenant_id, description, status } = req.body;

    connection.query(
        'INSERT INTO maintenance_requests (tenant_id, description, status) VALUES (?, ?, ?)',
        [tenant_id, description, status],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Maintenance request submitted successfully' });
        }
    );
};

const getRequests = (req, res) => {
    connection.query('SELECT * FROM maintenance_requests', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { addRequest, getRequests };
