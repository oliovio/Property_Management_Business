const connection = require('../db/connection');

const addMaintenanceRequest = (tenantId, description, status, callback) => {
    const query = 'INSERT INTO maintenance_requests (tenant_id, description, status) VALUES (?, ?, ?)';
    connection.query(query, [tenantId, description, status], callback);
};

const getAllMaintenanceRequests = (callback) => {
    const query = 'SELECT * FROM maintenance_requests';
    connection.query(query, callback);
};

module.exports = {
    addMaintenanceRequest,
    getAllMaintenanceRequests,
};
