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

// Method to get all variant values
function getVariantValues(req, res) {

	let { getVariantValues } = query.variant_values

	db.query(getVariantValues, (err, data) => {

		if (err) return res.status(500).send({ message: `Error getting variant values: ${err}` })
		else if (!data[0].length) return res.status(404).send({ message: 'Variants not found!' })

		return res.status(200).send({ variants_values: data[0] })
	})
}

function getVariantsCountByProduct(req, res) {

	let { getVariantsCountByProduct } = query.variant
	let { product_id } = req.params

	db.query(getVariantsCountByProduct, product_id, (err, variants) => {

		return err ? res.status(500).send({ message: `Error getting total number of variants for product_id ${product_id}: ${err.sqlMessage} `})
			: res.status(200).json({ data: variants[0] })

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

	let { getVariantValuesByProduct } = query.variant_values
	let { product_id } = req.params

	db.query(getVariantValuesByProduct, product_id, (err, data) => {

		if (err) return res.status(500).send({ message: `Error from server: ${err}` })
		else if (!data) return res.status(404).send({ message: `Variant values not found for product_id: ${product_id}` })

		console.log(data)

		let variantValues = data // Assign retrieved data from database
		let groupVariants = [] // Array to group variants of the same product
		let isEqual = true // Determine if enters the condition of differente variant_id

		// Manipulate database result set
		// Join variant values according to certain conditions
		// Validate product_id and variant_id to set variant values as one group.
		// Final result: [{'12oz', 'vainilla'}, {'12oz', 'normal'}]
		for (let i = 0; i < variantValues.length; i++) { // Loop result set starting from position 0
			for (let j = 1; j <= variantValues.length - 1; j++) { // Loop result set starting from position 1

				// In case product_id from first loop is equal to product_id from second loop and variant_id from first loop is different to variant_id from second loop
				if (variantValues[i].product_id == variantValues[j].product_id && variantValues[i].variant_id != variantValues[j].variant_id) {
					// Multiple variable declaration
					let variantId1 = variantValues[i].variant_id, valueName1 = variantValues[i].value_name, variantId2 = variantValues[j].variant_id, valueName2 = variantValues[j].value_name
					let manyVariants = { [variantId1]: valueName1, [variantId2]: valueName2 } // Create an object with the variant_id as property name and value name as property value
					groupVariants.push(manyVariants)
					isEqual = false
				}
			}
			if (isEqual) {
				let oneVariant = { [variantValues[i].variant_id]: variantValues[i].value_name }
				groupVariants.push(oneVariant) // Add oneVariant object
			}
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

// Method to create new variant value to an existing product
function newVariantValue(req, res) {

	let { newVariantValues } = query.variant_values
	let { value_name, variant_id } = req.body
	let { product_id } = req.params

	db.query(newVariantValues, [value_name, product_id, variant_id], (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error creating the product variant: ${err}` })

		return res.status(200).send({ message: 'Product variant successfully created' })
	})
}

// Method to create a sku and price for an existing product
function newSku(req, res) {

	let { newSku, newSkuValues } = query.sku
	let { sku, price } = req.body
	let { product_id } = req.params

	// Transaction
	db.beginTransaction(err => {
		if (err) return res.status(500).send({ message: `Hubo un error al iniciar la transaccion: ${err}` })

		db.query(newSku, [sku, price, product_id], (err, result) => {

			if (err) return db.rollback(err) // Error creating the sku and price

			let insertSkuId = result[1][0]['@insertId'] // Last inserted sku id
			let concatSkuIds = req.valuesId.map(e => e.toString().split()) // Each element parse to String and each element split it into an array
			concatSkuIds.map(e => e.splice(0,0, insertSkuId)) // Concatenate the last inserted sku id at the first position in each array element
			let skuIdsValuesIds = concatSkuIds.map(e => e.map(Number)) // Each element of the arrays parse it to Number

			db.query(newSkuValues, [skuIdsValuesIds], (error, data) => {

				if (error) return res.status(500).send({ message: `Hubo un error al crear sku_values: ${error}` })

				db.commit(function(err) {
					if (err) db.rollback(err)
					res.status(200).send({ message: 'Transaction complete!' })
					db.end()
				})
			})
		})
	})
}

// Method to update sku and price from a product
function updateSku(req, res) {

	let { updateSku } = query.sku
	let { sku, price } = req.body
	let { product_id, sku_id } = req.params

	db.query(updateSku, [sku_id, sku, price, product_id], (err, data) => {

		if (err) return res.status(500).send({ message: `Error updating the price to product: ${err}` })

		return res.status(200).send({ message: 'Sku & price successfully updated' })
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
	let { value_name, variant_id } = req.body
	let { value_id } = req.params

	db.query(updateVariantValues, [value_id, value_name, variant_id], (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error updating the product variant: ${err}` })

		return res.status(200).send({ message: 'Product variant value successfully updated' })
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

		return res.status(200).send({ message: 'Product variant successfully removed' })
	})
}

module.exports = {
	getVariants,
	getVariant,
	getVariantValues,
	getVariantsByProduct,
	getVariantsCountByProduct,
	newVariant,
	newSku,
	newVariantValue,
	updateVariant,
	updateSku,
	updateVariantValue,
	removeVariantValue,
	removeVariant
}
