const connection = require('../db/connection');

const addProperty = (landlordId, name, address, city, state, zipCode, callback) => {
    const query = 'INSERT INTO properties (landlord_id, name, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [landlordId, name, address, city, state, zipCode], callback);
};

const getAllProperties = (callback) => {
    const query = 'SELECT * FROM properties';
    connection.query(query, callback);
};

module.exports = {
    addProperty,
    getAllProperties,
};
