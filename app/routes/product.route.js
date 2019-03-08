const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')

// Endpoints
router.get('/products', product.getProducts)
router.get('/products/:id', product.getProduct)
router.get('/products/:name', product.getProductByName)
router.get('/products/:cost', product.getProductByCost)
router.post('/products', product.newProduct)
router.put('/products/:id', product.updateProduct)
router.delete('/products/:id', product.removeProduct)

module.exports = router
