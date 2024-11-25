const connection = require('../connection');


const makePayment = (req, res) => {
    const { tenant_id, amount, payment_date, status } = req.body;

    connection.query(
        'INSERT INTO rent_payments (tenant_id, amount, payment_date, status) VALUES (?, ?, ?, ?)',
        [tenant_id, amount, payment_date, status],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Payment recorded successfully' });
        }
    );
};

const getPayments = (req, res) => {
    connection.query('SELECT * FROM rent_payments', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { makePayment, getPayments };
