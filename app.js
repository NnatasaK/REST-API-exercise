require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
//routes

app.get('/', (req, res) => {
    res.send('helloooo node api');
})


app.get('/products', async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
    /* console.log(req.body);
    res.send(req.body) */
})

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`)
        })
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log(error)
    })