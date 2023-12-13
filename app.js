const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')
app.use(express.json())
//routes

app.get('/', (req, res) => {
    res.send('helloooo node api');
})

app.post('/product', async (req, res) => {
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
mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        app.listen(3000, () => {
            console.log('App running on port 3000')
        })
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log(error)
    })