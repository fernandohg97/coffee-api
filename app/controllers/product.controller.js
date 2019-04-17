const mysql = require('mysql')
const db = require('../db/db-connection')
const query = require('../queries/queries')

// Get all products (admin)
function getAdminProducts(req, res) {

	let { getProducts } = query.product

	db.query(getProducts, (err, products) => {

		if (err) return res.status(500).send({message: `Error getting the products: Server doesn't work ${err}`})
		else if (!products[0].length) return res.status(404).send({ message: 'Products not found!'})

		return res.status(200).json({products: products[0]})
	})
}

// Get all products (user)
function getUserProducts(req, res) {

	let { getUserProducts } = query.product

	db.query(getUserProducts, (err, products) => {

		if (err) return res.status(500).send({message: `Error getting the products: Server doesn't work ${err}`})
		else if (!products[0].length) return res.status(404).send({ message: 'Products not found!'})

		return res.status(200).json({products: products[0]})
	})
}

// Get product by product_id
function getProduct(req, res) {

	let { getProduct } = query.product
	const { product_id } = req.params

	db.query(getProduct, product_id, (err, data) => {

		if (err) return res.status(500).json({message: `Error getting the product: ${err}`})
		else if (!data[0].length) return res.status(404).json({message: 'Product not found!'})

		return res.status(200).json({product: data[0]})
	})
}

// Get product/s by name
function getProductByName(req, res) {

	let { getProductByName } = query.product
	let { product_name } = req.body

	db.query(getProductByName, product_name, (err, product) => {

		if (err) return res.status(500).json({message: `Error getting the product: ${err}`})
		else if (!product[0].length) return res.status(404).json({message: 'Product/s not found!'})

		return res.status(200).json({product: product[0]})
	})
}

// Get product/s by category
function getProductByCategory(req, res) {

	let { getProductByCategory } = query.product
	let { category_id } = req.body

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

		if (err) return res.status(500).json({message: `Error getting the product count: ${err}`})

		return res.status(200).json({product: data[0]})
	})
}

// Method to create a new product
function newProduct(req, res) {

	let { newProduct } = query.product // New product SP query
	let { newVariantValues } = query.variant_values // New variant values SP query
	let { newSku } = query.sku // New sku SP query
	let { product_name, description, product_image, category_id, variant_id, value_name, price} = req.body // Get all the from values from the body
	product_image = product_image || null

	let lastInsertId = { toSqlString: function() { return '(select last_insert_id())' } }

	// Create product full query formatted
	let createQuery = mysql.format(`${newProduct} ${newVariantValues} ${newSku}`, [product_name, description, product_image, category_id, value_name, lastInsertId, variant_id, price, lastInsertId])

	db.query(createQuery, (err, data) => {

		if (err) return res.status(500).send({message: `Error creating the product ${err}`})
		console.log(data)
		return res.status(200).send({message: 'Product successfully created'})
	})

}

// Method to update an existing product
function updateProduct(req, res) {

	let { updateProduct } = query.product
	let { updateVariantValues} = query.variant_values
	let { updateSku } = query.sku

	const productId = req.params.product_id // Get the product id to be updated
	let { product_name, description, product_image, variant_id, value_name, price} = req.body // Get all the from values from the body
	product_image = product_image || null

	// Update product full query formatted
	let updateQuery = mysql.format(updateProduct + updateVariantValues + updateSku, [productId, product_name, description, product_image, value_name, productId, variant_id, price, productId])

	db.query(updateQuery, (err, data) => {
		if (err) return res.status(500).json({message: `Error updating the product: ${err}`})

		return res.status(200).json({
			message: 'Product successfully updated!',
			product: data[0]
		})
	})
}

// Method to remove one product
function removeProduct(req, res) {

	let { removeProduct } = query.product
	const productId = req.params.product_id

	db.query(removeProduct, productId, (err, data) => {
		if (err) return res.status(500).json({message: `Error removing the product: ${err}`})
		console.log(data[0])

		return res.status(200).json({message: 'Product successfully removed!'})
	})
}

// Method to remove all products
function removeProducts(req, res) {

	let { removeProducts } = query.product

	db.query(removeProducts, (err, data) => {
		if (err) return res.status(500).send({message: `Error removing all the products: ${err}`})

		return res.status(200).send({message: 'Products successfully removed'})
	})
}

module.exports = {
	getAdminProducts,
	getUserProducts,
	getProduct,
	getProductByName,
	getProductByCategory,
	getProductsCount,
	newProduct,
	updateProduct,
	removeProduct,
	removeProducts
}
