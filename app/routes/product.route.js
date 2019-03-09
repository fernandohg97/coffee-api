const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')

// Endpoints
router.get('/products/name', product.getProductByName) // Get product by name
router.get('/products/cost', product.getProductByCost) // Get product by cost
router.get('/products', product.getProducts) // Get all products
router.get('/products/:product_id', product.getProduct) // Get just one product
router.post('/products', product.newProduct) // Create new product
router.put('/products/:product_id', product.updateProduct) // Update an existing product
router.delete('/products/:product_id', product.removeProduct) // Remove one product

module.exports = router
