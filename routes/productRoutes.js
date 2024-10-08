const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/authenticate');

// CRUD routes
router.get('/', getProducts);
router.post('/', isAuthenticated, createProduct);
router.put('/:id', isAuthenticated, updateProduct);
router.delete('/:id', isAuthenticated, deleteProduct);

module.exports = router;
