require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')


const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

app.use(express.json())
//routes

app.use('/api/products', productRoute);
app.get('/', (req, res) => {
    res.send('helloooo node api');
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