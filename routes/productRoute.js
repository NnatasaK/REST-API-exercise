const express = require('express');
const Product = require('../models/productModel');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, renderPage, updateProducts, deleteProducts } = require('../controller/productController');
const { query } = require('express');

const router = express.Router();



router.get('/', getProducts)
router.get('/render', renderPage)
router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

// use $set to update or $unset to remove any property
router.put('/', updateProducts)

// delete by id
router.delete('/:id', deleteProduct)

// delete by any property
router.delete('/', deleteProducts)



module.exports = router;