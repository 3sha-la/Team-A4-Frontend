const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  confirmPayment,
} = require('../controllers/paymentController');

router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.put('/:id/status', updatePaymentStatus);
router.post('/:id/confirm', confirmPayment);

module.exports = router;
