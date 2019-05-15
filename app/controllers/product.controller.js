const mysql = require('mysql')
const db = require('../db/db-connection')
const query = require('../queries/queries')

// Get all products (admin)
function getAdminProducts(req, res) {

	let { getProducts } = query.product

	db.query(getProducts, (err, products) => {

		if (err) return res.status(500).send({ message: `Error getting the products: Server doesn't work ${err}` })
		else if (!products[0].length) return res.status(404).send({ message: 'Products not found!' })

		return res.status(200).json({ products: products[0] })
	})
}

// Get all products (user)
function getUserProducts(req, res) {

	let { getUserProducts } = query.product

	db.query(getUserProducts, (err, products) => {

		if (err) return res.status(500).send({ message: `Error getting the products: Server doesn't work ${err}` })
		else if (!products[0].length) return res.status(404).send({ message: 'Products not found!' })

		return res.status(200).json({ products: products[0] })
	})
}

// Get product by product_id
function getProduct(req, res) {

	let { getProduct } = query.product
	const { product_id } = req.params

	db.query(getProduct, product_id, (err, data) => {

		if (err) return res.status(500).json({ message: `Error getting the product: ${err}` })
		else if (!data[0].length) return res.status(404).json({ message: 'Product not found!' })

		return res.status(200).json({ product: data[0] })
	})
}

// Get product/s by name
function getProductByName(req, res) {

	let { getProductByName } = query.product
	let { product_name } = req.body

	db.query(getProductByName, product_name, (err, product) => {

		if (err) return res.status(500).json({ message: `Error getting the product: ${err}` })
		else if (!product[0].length) return res.status(404).json({ message: 'Product/s not found! '})

		return res.status(200).json({ product: product[0] })
	})
}

// Get product/s by category
function getProductByCategory(req, res) {

	let { getProductByCategory } = query.product
	let { category_id } = req.params

	db.query(getProductByCategory, category_id, (err, products) => {

		if (err) return res.status(500).send({ message: `Error getting the products: ${err}`})
		else if (!products[0].length) return res.status(404).send({ message: 'Product/s not found'})

		return res.status(200).json({ products: products[0]})
	})
}

// Method to get total number of products
function getProductsCount(req, res) {

	let { getProductsCount } = query.product

	db.query(getProductsCount, (err, data) => {

		if (err) return res.status(500).json({ message: `Error getting the product count: ${err}` })

		return res.status(200).json({ product: data[0] })
	})
}

//Method to get all product variants
function getProductVariants(req, res) {

	let { getProductVariants } = query.product

	db.query(getProductVariants, (err, variants) => {

		if (err) return res.status(500).send({ message: `There was an error getting the product variants: ${err}` })
		else if (!variants[0].length) return res.status(404).send({ message: 'Variants not found!' })

		return res.status(200).send({ variants: variants[0] })
	})
}

// Method to create a new product
function newProduct(req, res) {

	let { newProduct } = query.product
	let { product_name, description, product_image, category_id } = req.body
	product_image = product_image || null

	db.query(newProduct, [product_name, description, product_image, category_id], (err, product) => {

		if (err) return res.status(500).send({ message: `There was an error: ${err}` })

		return res.status(200).send({ message: 'Product successfully created' })
	})
}

// Method to update an existing product
function updateProduct(req, res) {

	let { updateProduct } = query.product
	let { product_name, description, product_image, category_id } = req.body
	let { product_id } = req.params

	db.query(updateProduct, [product_id, product_name, description, product_image, category_id], (err, data) => {

		if (err) return res.status(500).send({ message:`There was an error updating the product: ${err}` })

		return res.status(200).send({ message: 'Product successfully updated' })

	})
}

// Method to remove one product
function removeProduct(req, res) {

	let { removeProduct } = query.product
	const { product_id } = req.params

	db.query(removeProduct, product_id, (err, data) => {

		if (err) return res.status(500).json({ message: `Error removing the product: ${err}` })

		return res.status(200).json({ message: 'Product successfully removed!' })
	})
}

// Method to remove all products
function removeProducts(req, res) {

	let { removeProducts } = query.product

	db.query(removeProducts, (err, data) => {

		if (err) return res.status(500).send({ message: `Error removing all the products: ${err}` })

		return res.status(200).send({ message: 'Products successfully removed' })
	})
}

// Method to create new variant
function newVariant(req, res) {

	let { newVariant } = query.variant
	let { variant_name } = req.body

	db.query(newVariant, variant_name, (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error creating the variant: ${err}` })

		return res.status(200).send({ message: 'Variant successfully created' })
	})
}

// Method to add variant to a product
function addVariant(req, res) {

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

function addPrice(req, res) {

	let { newSku } = query.sku
	let { price } = req.body
	let { product_id } = req.params

	db.query(newSku, [price, product_id], (err, data) => {

		if (err) return res.status(500).send({ message: `Error setting the price to product: ${err}` })

		return res.status(200).send({ message: 'Price successfully created '})
	})
}

// Method to edit an existing varaint from a product
function updateVariant(req, res) {

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

// Method to remove variant value from a product
function removeVariant(req, res) {

	let { removeVariantValues } = query.variant_values
	let { value_id } = req.params

	db.query(removeVariantValues, value_id, (err, data) => {

		if (err) return res.status(500).send({ message: `There was an error removing the product variant: ${err}` })

		return res.status(500).send({ message: 'Product variant successfully removed' })
	})
}

module.exports = {
	getAdminProducts,
	getUserProducts,
	getProduct,
	getProductByName,
	getProductByCategory,
	getProductsCount,
	getProductVariants,
	newProduct,
	newVariant,
	updateProduct,
	removeProduct,
	removeProducts,
	addVariant,
	addPrice,
	updateVariant,
	removeVariant
}
