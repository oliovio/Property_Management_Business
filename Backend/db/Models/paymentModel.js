const connection = require('../db/connection');

const makePayment = (tenantId, amount, paymentDate, status, callback) => {
    const query = 'INSERT INTO rent_payments (tenant_id, amount, payment_date, status) VALUES (?, ?, ?, ?)';
    connection.query(query, [tenantId, amount, paymentDate, status], callback);
};

const getAllPayments = (callback) => {
    const query = 'SELECT * FROM rent_payments';
    connection.query(query, callback);
};

module.exports = {
    makePayment,
    getAllPayments,
};
