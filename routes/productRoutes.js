const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect,getAllProducts)
    .post(protect, createProduct);

router.route('/:id')
    .get(protect,getProductById)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;