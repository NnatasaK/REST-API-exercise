const express = require('express');
const Product = require('../models/productModel');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, keywordSearch } = require('../controller/productController');
const { query } = require('express');

const router = express.Router();



router.get('/', getProducts)
router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.get("/", async (req, res) => {
    try {
        const keyword = req.query.name;

        // Use a regular expression to perform a case-insensitive search
        /*  const products = await Product.find({ name: keyword }); */

        res.json(keyword);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;