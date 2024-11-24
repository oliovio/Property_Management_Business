const express = require('express');
const { addRequest, getRequests } = require('../controllers/maintenanceController');
const router = express.Router();

router.post('/', addRequest);
router.get('/', getRequests);

module.exports = router;
