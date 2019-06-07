const express = require('express')
const productRouter = express.Router()
const productCtrl = require('../controllers/product.controller')
const { check } = require('express-validator/check')
const errorHandler = require('../middlewares/errors/error.validation').handleErrorValidation

// Endpoints
productRouter.get('/products', productCtrl.getUserProducts) // Get all products (user)

productRouter.get('/products/admin', productCtrl.getAdminProducts) // Get all products (admin)

productRouter.get('/products/name', [
	check('product_name').not().isEmpty()
], errorHandler, productCtrl.getProductByName) // Get products by name

productRouter.get('/products/sku', productCtrl.getProductSku) // Get products with sku and price

productRouter.get('/products/count', productCtrl.getProductsCount) // Get total number of products

productRouter.get('/products/sku/name', [
	check('product_name').not().isEmpty()
], errorHandler, productCtrl.getProductSkuByName) // Get one product with sku and price by product name

productRouter.get('/products/:product_id', productCtrl.getProduct) // Get just one product

productRouter.get('/products/category/:category_id', productCtrl.getProductByCategory) // Get product/s by category

productRouter.get('/products/variants/values/:sku_id', productCtrl.getProductVariantValues) // Get all product variants

productRouter.post('/products', [
	check('product_name').not().isEmpty(),
	check('category_id').isInt()
], errorHandler, productCtrl.newProduct) // Create new product

productRouter.put('/products/:product_id', [
	check('product_name').isAlphanumeric(),
	check('category_id').isInt()
], errorHandler, productCtrl.updateProduct) // Update an existing product

productRouter.delete('/products/:product_id', productCtrl.removeProduct) // Remove one product

productRouter.delete('/products', productCtrl.removeProducts) // Remove all products

module.exports = productRouter
