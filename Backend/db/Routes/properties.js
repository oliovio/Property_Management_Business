const express = require('express');
const { addProperty, getProperties } = require('../controllers/propertiesController');
const router = express.Router();

router.post('/', addProperty);
router.get('/', getProperties);

module.exports = router;
