const express = require('express');
const { getOrderHistory } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/history', protect, getOrderHistory);

module.exports = router;