# REST-API-exercise
Project Report: Drezztore E-Commerce RESTful API

Background (copied directly from the project info)

Our customer has just launched a webshop for his new brand "Drezztore" and has bought up a supplier agreement with one Chinese department store. The customer wants us to help him set one up API so that product management will be easier. In this task you will create a REST server to apply what we have learned about APIs, server programming and JSON

Goals

Create a REST API for Node.js with Express that interacts with a MongoDB database for an e-commerce application

Project Setup:

Created folder that will contain my project
Initialized git repository and connected to github
Installed necessary packages (full list bellow)
Set up a .gitignore file to exclude node_modules
API Development:

List of npm packages used for the project:

express, cors, custom middleware(errorMiddleware), body-parser, mongoose, ejs, express-async-handler
Created an Express application

Connected to MongoDB with Mongoose

Created Product Model with Mongoose Schema that contains:

name (String)
description (String)
price (Number)
quantity (Number)
category (String)
Tried different routes with test database collection

CRUD methods used in the API:

GET, POST, DELETE, PUT routes for all the products
GET, POST, DELETE, PUT routes for specific product by ID
GET route that renders a HTML page ( used index.ejs, the page has dynamic content and javascript)
PUT route that allows updating or removing products by any property (not only ID) using $set and $unset - created mostly for practice
GET route for using query parameters instead of path parameters - NOTE: it can only filter products by name or price
Used Postman to test API endpoints.

When almost everything is working as expected i followed instructions for refactoring the code and creating separate files to export for: - main js file containing mostly middleware, server and database connection - .env file contains my MongoDB connection and port number - error middleware with a status code and a specific message - product Model with Schema - product Controller with all the routes logic and specifics - product Route with all the routers and imported product Controller - views folder with ejs file

Challenges and Solutions

Struggled with using query string parameters: - managed to show specific key-value pairs but not the product containing them - when filtering trough products i would get either full list or an empty array - couldn`t implement logic together with other routes but had to create separate route in main file - can filter only by one parameter at the time, not multiple ones - not enough knowledge about the subject - keep working on it
