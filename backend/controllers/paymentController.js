const Payment = require('../models/Payment');

const PAYMENT_METHODS = ['card', 'paypal', 'cod'];
const PAYMENT_STATUS = ['pending', 'paid', 'failed', 'refunded'];

const mockPayments = [
  {
    id: 'pay_1001',
    orderId: 'ord_501',
    userId: 'usr_101',
    amount: 5200,
    method: 'card',
    status: 'paid',
    currency: 'LKR',
    confirmationCode: 'PAY-1001',
    paymentReference: 'REF-0001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const validatePaymentData = (body) => {
  const { orderId, userId, amount, method, status } = body;
  const errors = [];

  if (!orderId || !String(orderId).trim()) {
    errors.push('Order ID is required.');
  }

  if (!userId || !String(userId).trim()) {
    errors.push('User ID is required.');
  }

  if (!amount || Number(amount) <= 0) {
    errors.push('Amount must be greater than zero.');
  }

  if (!method || !PAYMENT_METHODS.includes(method)) {
    errors.push('Payment method must be one of: card, paypal, cod.');
  }

  if (status && !PAYMENT_STATUS.includes(status)) {
    errors.push('Payment status must be one of: pending, paid, failed, refunded.');
  }

  return { isValid: errors.length === 0, errors };
};

const createPayment = async (req, res) => {
  try {
    const validation = validatePaymentData(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment validation failed.',
        errors: validation.errors,
      });
    }

    const { orderId, userId, amount, method, status, currency, paymentReference } = req.body;
    const payment = {
      id: `pay_${Date.now()}`,
      orderId: String(orderId).trim(),
      userId: String(userId).trim(),
      amount: Number(amount),
      method,
      status: status || 'pending',
      currency: currency || 'LKR',
      confirmationCode: `PAY-${Date.now()}`,
      paymentReference: paymentReference || `REF-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPayments.push(payment);

    return res.status(201).json({
      success: true,
      message: 'Payment created successfully.',
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  return res.status(200).json({
    success: true,
    count: mockPayments.length,
    payments: mockPayments,
  });
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  const payment = mockPayments.find((item) => item.id === id);

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found.',
    });
  }

  return res.status(200).json({
    success: true,
    payment,
  });
};

const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !PAYMENT_STATUS.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be one of: pending, paid, failed, refunded.',
    });
  }

  const payment = mockPayments.find((item) => item.id === id);

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found.',
    });
  }

  payment.status = status;
  payment.updatedAt = new Date().toISOString();

  if (status === 'paid' && !payment.confirmationCode) {
    payment.confirmationCode = `PAY-${Date.now()}`;
  }

  return res.status(200).json({
    success: true,
    message: 'Payment status updated successfully.',
    payment,
  });
};

const confirmPayment = async (req, res) => {
  const { id } = req.params;
  const payment = mockPayments.find((item) => item.id === id);

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found.',
    });
  }

  payment.status = 'paid';
  payment.confirmationCode = payment.confirmationCode || `PAY-${Date.now()}`;
  payment.updatedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: 'Payment confirmed successfully.',
    payment,
  });
};

module.exports = {
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  confirmPayment,
};
