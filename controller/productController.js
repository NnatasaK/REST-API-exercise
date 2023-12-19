const { Error } = require('mongoose');
const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
/* const productList = require('../test.products.json', {
    with: { type: "json" },
}); */
const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products)

    } catch (error) {
        res.status(500);
        throw new Error(error.message);

    }
}

const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error(`Cannot find any product with ID ${id}`);

        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
const renderPage = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).render('pages/index',
            { products })

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}

const createProduct = async (req, res) => {
    try {
        const products = await Product.create(req.body)
        /* res.status(201).render('pages/index',
            { products }) */
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message })
        /*  res.status(500);
         throw new Error(error.message); */
    }

}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404);
            throw new Error(`Cannot find any product with ID ${id}`);

        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}

const updateProducts = async (req, res) => {
    try {
        const updatedProducts = await Product.updateMany({}, req.body);
        /* const updatedProducts = await Product.findById(id); */
        res.status(200).json(updatedProducts)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}
const deleteProducts = async (req, res) => {
    try {
        const products = await Product.deleteMany(req.body);
        res.status(200).json(products)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    updateProducts,
    deleteProduct,
    deleteProducts,
    renderPage

}