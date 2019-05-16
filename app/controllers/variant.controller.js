const mysql = require('mysql')
const db = require('../db/db-connection')
const query = require('../queries/queries')

// Method to get all variants name
function getVariants(req, res) {

	let { getVariants } = query.variant

	db.query(getVariants, (err, variants) => {

		if (err) return res.status(500).send({ message: `Error getting all variants name: ${err}` })
		else if (!variants[0].length) return res.status(404).send({ message: 'Variants not found!' })

		return res.status(200).send({ variants: variants[0] })
	})
}

// Method to get variant name by variant id
function getVariant(req, res) {

	let { getVariant } = query.variant
	let { variant_id } = req.params

	db.query(getVariant, variant_id, (err, variant) => {

		if (err) return res.status(500).send({ message: `Error getting the variant name: ${err}` })
		else if (!variant[0].length) return res.status(404).send({ message: 'Variant not found!' })

		return res.status(200).send({ variant: variant[0] })
	})
}

// Method to get all variants in group by product_id
function getVariantsByProduct(req, res) {

	let { getVariantValues } = query.variant_values
	let { product_id } = req.params

	db.query(getVariantValues, product_id, (err, data) => {

		if (err) return res.status(500).send({ message: `Error from server: ${err}` })
		else if (!data[0].length) return res.status(404).send({ message: `Variant values not found for product_id: ${product_id}` })

		let variantValues = data[0] // Assign retrieved data from database
		let groupVariants = [] // Array to group variants of the same product
		let isEqual = true // Determine if enters the condition of differente variant_id

		for (let i = 0; i < variantValues.length; i++) {
			for (let j = 1; j < variantValues.length - 1; j++) {
				if (variantValues[i].product_id == variantValues[j].product_id && variantValues[i].variant_id != variantValues[j].variant_id) {
					groupVariants.push(new Object(variantValues[i].value_name, variantValues[j].value_name))
					isEqual = false
				}
			}
			if (isEqual) groupVariants.push(new Object(variantValues[i].value_name))
		}

		return res.status(200).send({ variants: groupVariants })
	})
}

// Method to create new variant name
function newVariant(req, res) {

	let { newVariant } = query.variant
	let { variant_name } = req.body

	db.query(newVariant, variant_name, (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error creating the variant: ${err}` })

		return res.status(200).send({ message: 'Variant successfully created' })
	})
}



// Method to add variant to a product
function addVariantValue(req, res) {

	let { newVariantValues } = query.variant_values
	// let { newSku } = query.sku
	let { value_name, variant_id } = req.body
	let { product_id } = req.params

	// let sql = mysql.format(`${newVariantValues} ${newSku}`, [value_name, product_id, variant_id, price, product_id])
	let sql = mysql.format(`${newVariantValues}`, [value_name, product_id, variant_id])


	db.query(sql, (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error creating the product variant: ${err}` })

		return res.status(200).send({ message: 'Product variant successfully created' })
	})
}

function newSku(req, res) {

	let { newSku } = query.sku
	let { sku, price } = req.body
	let { product_id } = req.params

	db.query(newSku, [sku, price, product_id], (err, data) => {

		if (err) return res.status(500).send({ message: `Error setting the price to product: ${err}` })

		return res.status(200).send({ message: 'Sku & price successfully created '})
	})
}

// Method to update existing variant name
function updateVariant(req, res) {

	let { updateVariant } = query.variant
	let { variant_id } = req.params
	let { variant_name } = req.body

	db.query(updateVariant, [variant_id, variant_name], (err, data) => {

		if (err) return res.status(500).send({ message: `Error updating the variant: ${err}` })

		return res.status(200).send({ message: 'Variant successfully updated' })
	})
}

// Method to edit an existing varaint from a product
function updateVariantValue(req, res) {

	let { updateVariantValues } = query.variant_values
	let { updateSku } = query.sku
	let { value_name, variant_id, price } = req.body
	let { product_id } = req.params

	let sql = mysql.format(`${updateVariantValues} ${updateSku}`, [value_name, product_id, variant_id, price, product_id])

	db.query(sql, (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error updating the product variant: ${err}` })

		return res.status(500).send({ message: 'Product variant successfully updated' })
	})
}

// Method to remove exisitng variant name
function removeVariant(req, res) {

	let { removeVariant } = query.variant
	let { variant_id } = req.params

	db.query(removeVariant, variant_id, (err, data) => {

		if (err) return res.status(500).send({ message: `Error removing the variant: ${err}` })

		return res.status(200).send({ message: 'Variant successfully removed' })
	})
}

// Method to remove variant value from a product
function removeVariantValue(req, res) {

	let { removeVariantValues } = query.variant_values
	let { value_id } = req.params

	db.query(removeVariantValues, value_id, (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error removing the product variant: ${err}` })

		return res.status(500).send({ message: 'Product variant successfully removed' })
	})
}

module.exports = {
	getVariants,
	getVariant,
	getVariantsByProduct,
	newVariant,
	newSku,
	addVariantValue,
	updateVariant,
	updateVariantValue,
	removeVariantValue,
	removeVariant
}
