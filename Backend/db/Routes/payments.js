const express = require('express');
const { makePayment, getPayments } = require('../controllers/paymentsController');
const router = express.Router();

router.post('/', makePayment);
router.get('/', getPayments);

module.exports = router;
