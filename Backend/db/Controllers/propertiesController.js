const connection = require('../db/connection');

const addProperty = (req, res) => {
    const { landlord_id, name, address, city, state, zip_code } = req.body;

    connection.query(
        'INSERT INTO properties (landlord_id, name, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?)',
        [landlord_id, name, address, city, state, zip_code],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Property added successfully' });
        }
    );
};

const getProperties = (req, res) => {
    connection.query('SELECT * FROM properties', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { addProperty, getProperties };
