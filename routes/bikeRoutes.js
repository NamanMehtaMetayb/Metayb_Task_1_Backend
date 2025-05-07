const express = require('express');
const { getAllBikes } = require('../controllers/bikeController');

const router = express.Router();
router.get('/', getAllBikes);

module.exports = router;
