const express = require('express')
const variantRouter = express.Router()
const variantCtrl = require('../controllers/variant.controller')
const { check } = require('express-validator/check')
const errorHandler = require('../middlewares/errors/error.validation').handleErrorValidation
const getValueIds = require('../middlewares/getValueNames')

// ENPOINTS
variantRouter.get('/variants', variantCtrl.getVariants) // Get all variants name

variantRouter.get('/variants/values', variantCtrl.getVariantValues) // Get all variant values

variantRouter.get('/variants/:variant_id', variantCtrl.getVariant) // Get variant name by variant id

variantRouter.get('/variants/product/:product_id', variantCtrl.getVariantsByProduct) // Get all variants group by product id

variantRouter.get('/variants/product/total/:product_id', variantCtrl.getVariantsCountByProduct) // Get total number of variants by product

variantRouter.post('/variants', [
	check('variant_name').isAlpha()
], errorHandler, variantCtrl.newVariant) // Create new variant

variantRouter.post('/variants/product/:product_id', [
	check('value_name').isAlphanumeric(),
	check('variant_id').isInt(),
], errorHandler, variantCtrl.newVariantValue) // Add new product variant value

variantRouter.post('/variants/price/:product_id', getValueIds, [
	check('sku').not().isEmpty(),
	check('price').isFloat()
], errorHandler, variantCtrl.newSku) // Set price to product

variantRouter.put('/variants/:variant_id', [
	check('variant_name').not().isEmpty()
], errorHandler, variantCtrl.updateVariant) // Update a variant name

variantRouter.put('/variants/product/:value_id', [
	check('value_name').isAlphanumeric(),
	check('variant_id').isInt(),
], errorHandler, variantCtrl.updateVariantValue) // Update an exisitng variant value from a product

variantRouter.put('/variants/price/:product_id/sku/:sku_id', [
	check('price').isFloat()
], errorHandler, variantCtrl.updateSku) // Update price or sku to an existing variant value from a product

variantRouter.delete('/variants/value/:value_id', variantCtrl.removeVariantValue) // Remove existing variant from a product

variantRouter.delete('/variants/:variant_id', variantCtrl.removeVariant) // Remove existing variant name

module.exports = variantRouter
