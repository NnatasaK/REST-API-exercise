const express = require('express')
const app = express()
const mongoose = require('mongoose')

//routes

app.get('/', (req, res) => {
    res.send('helloooo node api');
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