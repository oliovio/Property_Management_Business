const connection = require('../connection'); // Fixed the path to `connection.js`

// Add a new property
const addProperty = (req, res) => {
    const { landlord_id, name, address, city, state, zip_code } = req.body;

    // Input validation
    if (!landlord_id || !name || !address || !city || !state || !zip_code) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO properties (landlord_id, name, address, city, state, zip_code) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [landlord_id, name, address, city, state, zip_code], (err, results) => {
        if (err) {
            console.error('Error adding property:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Property added successfully', propertyId: results.insertId });
    });
};

// Get all properties
const getProperties = (req, res) => {
    const query = 'SELECT * FROM properties';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving properties:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};

// Get properties by landlord_id
const getPropertiesByLandlord = (req, res) => {
    const { landlord_id } = req.params;

    if (!landlord_id) {
        return res.status(400).json({ error: 'Landlord ID is required' });
    }

    const query = 'SELECT * FROM properties WHERE landlord_id = ?';

    connection.query(query, [landlord_id], (err, results) => {
        if (err) {
            console.error('Error retrieving properties:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No properties found for this landlord' });
        }

        res.json(results);
    });
};

// Delete a property by ID
const deleteProperty = (req, res) => {
    const { property_id } = req.params;

    if (!property_id) {
        return res.status(400).json({ error: 'Property ID is required' });
    }

    const query = 'DELETE FROM properties WHERE id = ?';

    connection.query(query, [property_id], (err, results) => {
        if (err) {
            console.error('Error deleting property:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    });
};

module.exports = { addProperty, getProperties, getPropertiesByLandlord, deleteProperty };
