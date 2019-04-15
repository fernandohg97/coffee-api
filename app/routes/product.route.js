const express = require('express')
const productRouter = express.Router()
const product = require('../controllers/product.controller')

// Endpoints
productRouter.get('/products/name', product.getProductByName) // Get product by name
productRouter.get('/products', product.getProducts) // Get all products
productRouter.get('/products/:product_id', product.getProduct) // Get just one product
productRouter.post('/products', product.newProduct) // Create new product
productRouter.put('/products/:product_id', product.updateProduct) // Update an existing product
productRouter.delete('/products/:product_id', product.removeProduct) // Remove one product
productRouter.delete('/products', product.removeProducts) // Remove all products

module.exports = productRouter
