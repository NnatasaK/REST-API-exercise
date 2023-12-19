// Middleware

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middleware/errorMiddleware')
const Product = require('./models/productModel')
const { name } = require('ejs')
const { getProducts } = require('./controller/productController')
const app = express()
const cors = require('cors');

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

// example for later ( can put multiple options ), save address in env files instead
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionSuccessStatus: 200
}


// Apply all middleware

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use('/api/products', productRoute);
app.use(errorMiddleware);




// Search name based on a keyword 
//(note: other routes are refactored an exported, this one worked only like this -- look into it later!)

/* app.get('/keyword', async (req, res) => {
    try {
        const keyword = req.query.name;

        const products = await Product.find({ name: { $regex: new RegExp(keyword, 'i') } });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
 */




// Gives only a number of products but not the content ???

app.get('/keyword', async (req, res) => {

    try {
        const request = req.query;
        if (request.name) {
            const filteredByName = await Product.find({ "name": request.name })
            res.json(filteredByName)
        } else {
            const filteredByPrice = await Product.find({ "price": parseInt(request.price) })

            res.json(filteredByPrice)
        }


    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Connect to the database

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`)
        })
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log(error)
    })




/* Status codes

200 OK – Success
201 Created – Created
204 No Content – No Content
400 Bad Request – Bad Request
401 Unauthorized – Unauthorized
403 Forbidden – Forbidden
404 Not Found – Not Found
500 Internal Server Error – Internal Error
503 Service Unavailable – Unavailable */