const express = require('express')
const variantRouter = express.Router()
const variantCtrl = require('../controllers/variant.controller')
const { check } = require('express-validator/check')
const errorHandler = require('../middlewares/errors/error.validation').handleErrorValidation

// ENPOINTS
variantRouter.get('/products/variants', variantCtrl.getVariants) // Get all variants name

variantRouter.get('/products/variants/:variant_id', variantCtrl.getVariant) // Get variant name by variant id

variantRouter.get('/variants/:product_id', variantCtrl.getVariantsByProduct) // Get all variants group by product id

variantRouter.post('/products/variants', [
	check('variant_name').isAlpha()
], errorHandler, variantCtrl.newVariant) // Create new variant

variantRouter.post('/products/variants/:product_id', [
	check('value_name').isAlphanumeric(),
	check('variant_id').isInt(),
], errorHandler, variantCtrl.addVariant) // Add new product variant

variantRouter.post('/products/variants/price/:product_id', [
	check('price').isFloat()
], errorHandler, variantCtrl.addPrice) // Set price to product

variantRouter.put('/products/variants/:product_id', [
	check('value_name').isAlphanumeric(),
	check('variant_id').isInt(),
	check('price').isFloat()
], errorHandler, variantCtrl.updateVariant) // Update an exisitng variant from a product

variantRouter.put('/products/variants/:variant_id', [
	check('variant_name').not().isEmpty()
], errorHandler, variantCtrl.updateVariant)

variantRouter.delete('/products/variants/:value_id', variantCtrl.removeVariantValue) // Remove existing variant from a product

variantRouter.delete('/products/variants/:variant_id', variantCtrl.removeVariant) // Remove existing variant name

module.exports = variantRouter
