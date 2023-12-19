require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
/* const queryString = require('query-string') */
const bodyParser = require('body-parser')
const errorMiddleware = require('./middleware/errorMiddleware')
const Product = require('./models/productModel')
const { name } = require('ejs')
const { getProducts } = require('./controller/productController')
const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())
app.set("view engine", "ejs")
/* fetch('./test.products.json')
    .then((res) => res.json()).then((json) => ); */


/* const cors = require('cors');


const whitelist = ['http://localhost:3000']; // assuming front-end application is running on localhost port 3000

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions)); */
//routes

app.use('/api/products', productRoute);
app.use(errorMiddleware);




/* app.get('/render', async (req, res) => {
    res.render('pages/index',
        { productList }) */
/*  await productList.find({}, (products) => {
     res.render('pages/index', {
         products: productList
     })
 })) */


//});

app.get('/keyword', async (req, res) => {
    try {
        const keyword = req.query.name;

        // Use a regular expression to perform a case-insensitive search
        const products = await Product.find({ name: { $regex: new RegExp(keyword, 'i') } });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


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