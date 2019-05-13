const express = require('express')
const productRouter = express.Router()
const product = require('../controllers/product.controller')
const { check } = require('express-validator/check')
const errorHandler = require('../middlewares/errors/error.validation').handleErrorValidation

// Endpoints
productRouter.get('/products', product.getUserProducts) // Get all products (user)

productRouter.get('/products/name', [
	check('product_name').not().isEmpty()
], errorHandler, product.getProductByName) // Get product by name

productRouter.get('/products/admin', product.getAdminProducts) // Get all products (admin)

productRouter.get('/products/variants', product.getProductVariants) // Get all product variants

productRouter.get('/products/category/:category_id', product.getProductByCategory) // Get product/s by category

productRouter.get('/products/:product_id', product.getProduct) // Get just one product

productRouter.post('/products', [
	check('product_name').isAlphanumeric(),
	check('category_id').isInt()
], errorHandler, product.newProduct) // Create new product

productRouter.post('/products/variants', [
	check('variant_name').isAlpha()
], errorHandler, product.newVariant) // Create new variant

productRouter.post('/products/variants/:product_id', [
	check('value_name').isAlphanumeric(),
	check('variant_id').isInt(),
	check('price').isFloat()
], errorHandler, product.addVariant) // Add new product variant

productRouter.put('/products/:product_id', [
	check('product_name').isAlphanumeric(),
	check('category_id').isInt()
], errorHandler, product.updateProduct) // Update an existing product

productRouter.put('/products/variants/:product_id', [
	check('value_name').isAlphanumeric(),
	check('variant_id').isInt(),
	check('price').isFloat()
], errorHandler, product.updateVariant) // Update an exisitng variant from a product

productRouter.delete('/products/:product_id', product.removeProduct) // Remove one product

productRouter.delete('/products', product.removeProducts) // Remove all products

productRouter.delete('/products/variants/:value_id', product.removeVariant) // Remove existing variant from a product

module.exports = productRouter
