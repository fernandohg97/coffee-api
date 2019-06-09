const mysql = require('mysql')
const db = require('../db/db-connection')
const query = require('../queries/queries')
const fs = require('fs')

// Get all products (user)
function getUserProducts(req, res) {

	let { getUserProducts } = query.product

	db.query(getUserProducts, (err, products) => {

		return err ? res.status(500).send({ message: `Error getting the products: Server doesn't work ${err}` })
			: (!products[0].length) ? res.status(404).send({ message: 'Products not found!' })
				: res.status(200).json({ products: products[0] })
	})
}

// Get all products (admin)
function getAdminProducts(req, res) {

	let { getProducts } = query.product

	db.query(getProducts, (err, products) => {

		return err ? res.status(500).send({ message: `Error getting the products: Server doesn't work ${err}` })
			: (!products[0].length) ? res.status(404).send({ message: 'Products not found!' })
				: res.status(200).json({ products: products[0] })
	})
}

// Method to get all products with sku and price
function getProductSku(req, res) {

	let { getProductSku } = query.product

	db.query(getProductSku, (err, products) => {

		return err ? res.status(500).send({ message: `Error getting the products sku: ${err}` })
			: (!products[0].length) ? res.status(404).send({ message: 'Products not found!' })
				: res.status(200).json({ products: products[0] })
	})
}

// Method to get one product with sku and price by product name
function getProductSkuByName(req, res) {

	let { getProductSkuByName } = query.product
	let { product_name } = req.query

	db.query(getProductSkuByName, product_name, (err, product) => {

		return err ? res.status(500).send({ message: `Error getting the ${product_name} product: ${err}` })
			: (!product[0].length) ? res.status(404).send({ message: `Product ${product_name} not found!` })
				: res.status(200).json({ products: product[0] })
	})
}


// Get product/s by name
function getProductByName(req, res) {

	let { getProductByName } = query.product
	let { product_name } = req.body

	db.query(getProductByName, product_name, (err, product) => {

		return err ? res.status(500).json({ message: `Error getting the product: ${err}` })
			: (!product[0].length) ? res.status(404).json({ message: 'Product/s not found! '})
				: res.status(200).json({ product: product[0] })
	})
}

// Method to get total number of products
function getProductsCount(req, res) {

	let { getProductsCount } = query.product

	db.query(getProductsCount, (err, data) => {

		return err ? res.status(500).json({ message: `Error getting the product count: ${err}` })
			: res.status(200).json({ product: data[0] })
	})
}

// Get product by product_id
function getProduct(req, res) {

	let { getProduct } = query.product
	const { product_id } = req.params

	db.query(getProduct, product_id, (err, product) => {
		// TODO: Add the image visulaization on browser
		return err ? res.status(500).json({ message: `Error getting the product: ${err}` })
			: (!product[0].length) ? res.status(404).json({ message: 'Product not found!' })
				: res.status(200).json({ product: product[0][0] })
	})
}

// Get product/s by category
function getProductByCategory(req, res) {

	let { getProductByCategory } = query.product
	let { category_id } = req.params

	db.query(getProductByCategory, category_id, (err, products) => {

		return err ? res.status(500).send({ message: `Error getting the products: ${err}`})
			: (!products[0].length) ? res.status(404).send({ message: 'Product/s not found'})
				: res.status(200).json({ products: products[0]})
	})
}

//Method to get all product variants
// TODO: Watch this method
// function getProductVariants(req, res) {

// 	let { getProductVariants } = query.product

// 	db.query(getProductVariants, (err, variants) => {

// 		if (err) return res.status(500).send({ message: `There was an error getting the product variants: ${err}` })
// 		else if (!variants[0].length) return res.status(404).send({ message: 'Variants not found!' })

// 		return res.status(200).send({ variants: variants[0] })
// 	})
// }

// Method to get variant values for an specific sku_id
function getProductVariantValues(req, res) {

	let { getProductVariantValuesBySku } = query.product
	let { sku_id } = req.params

	db.query(getProductVariantValuesBySku, sku_id, (err, products) => {

		return err ? res.status(500).send({ message: `There was an error getting product variant values by sku: ${err}` })
			: (!products[0].length) ? res.status(404).send({ message: 'Product not found!' })
				: res.status(200).json({ products: products[0] })
	})
}

// Method to create a new product
function newProduct(req, res) {

	let { newProduct } = query.product
	let { product_name, description, product_image, category_id } = req.body
	product_image = product_image || null

	db.query(newProduct, [product_name, description, product_image, category_id], (err, product) => {

		return err ? res.status(500).send({ message: `There was an error: ${err}` })
			: res.status(201).send({ message: 'Product successfully created' })
	})
}

// Method to update an existing product
function updateProduct(req, res) {

	let { updateProduct } = query.product
	let { product_name, description, product_image, category_id } = req.body
	let { product_id } = req.params

	db.query(updateProduct, [product_id, product_name, description, product_image, category_id], (err, data) => {

		return err ? res.status(500).send({ message:`There was an error updating the product: ${err}` })
			: res.status(200).send({ message: 'Product successfully updated' })

	})
}

// Method to remove one product
function removeProduct(req, res) {

	let { removeProduct } = query.product
	const { product_id } = req.params

	db.query(removeProduct, product_id, (err, data) => {

		return err ? res.status(500).json({ message: `Error removing the product: ${err}` })
			: res.status(200).json({ message: 'Product successfully removed!' })
	})
}

// Method to remove all products
function removeProducts(req, res) {

	let { removeProducts } = query.product

	db.query(removeProducts, (err, data) => {

		return err ? res.status(500).send({ message: `Error removing all the products: ${err}` })
			: res.status(200).send({ message: 'Products successfully removed' })
	})
}

module.exports = {
	getAdminProducts,
	getUserProducts,
	getProduct,
	getProductByName,
	getProductByCategory,
	getProductsCount,
	getProductSku,
	getProductSkuByName,
	// getProductVariants,
	getProductVariantValues,
	newProduct,
	updateProduct,
	removeProduct,
	removeProducts
}
