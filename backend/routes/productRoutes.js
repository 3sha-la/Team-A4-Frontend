const express = require('express');
const router = express.Router();
const {
  searchProducts,
  filterProducts,
  checkStock,
  validateProduct
} = require('../controllers/productController');

router.get('/search', searchProducts);
router.get('/filter', filterProducts);
router.get('/:id/stock', checkStock);
router.post('/validate', validateProduct);

module.exports = router;