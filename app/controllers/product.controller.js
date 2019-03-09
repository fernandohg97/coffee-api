const db = require('../db/db-connection')
const query = require('../queries/queries')

function getProducts(req, res) {

	let promise = new Promise((resolve, reject) => {
		db.query(query.getProducts, (err, data) => {
			if (err) reject(err)

			resolve(data[0])
		})
	})

	promise
		.then(data => { return res.status(200).json({ products: data }) })
		.catch(err => { return res.status(500).send({ message: `Error getting the products: ${err}` }) })
}

function getProduct(req, res) {
	const productId = req.params.product_id

	db.query(query.getProduct, productId, (err, data) => {

		if (err) return res.status(500).json({message: `Error getting the product: ${err}`})
		else if (!data[0]) return res.status(404).json({message: 'Product not found!'})

		return res.status(200).json({product: data[0]})
	})
}

function getProductByName(req, res) {

	const productName = req.body.product_name
	console.log(productName)

	db.query(query.getProductByName, productName, (err, data) => {

		if (err) return res.status(500).json({message: `Error getting the product: ${err}`})
		else if (!data[0]) return res.status(404).json({message: 'Product not found!'})

		return res.status(200).json({product: data[0]})
	})
}

function getProductByCost(req, res) {
	const productCost = req.body.cost
	console.log(productCost)

	db.query(query.getProductByCost, productCost, (err, data) => {

		if (err) return res.status(500).json({message: `Error getting the product: ${err}`})
		else if (!data[0]) return res.status(404).json({message: 'Product not found!'})

		return res.status(200).json({product: data[0]})
	})
}

function newProduct(req, res) {
	const product = req.body
	console.log(product)

	db.query(query.newProduct, product, (err, data) => {
		if (err) return res.status(500).json({message: `Error creating the product: ${err}`})
		console.log(data[0])

		return res.status(200).json({
			message: 'Product successfully created!',
			product: data[0]
		})
	})
}

function updateProduct(req, res) {
	const productId = req.params.product_id
	const product = req.body
	console.log(productId)

	db.query(query.updateProduct, [product, productId], (err, data) => {
		if (err) return res.status(500).json({message: `Error updating the product: ${err}`})
		console.log(data[0])

		return res.status(200).json({
			message: 'Product successfully updated!',
			product: data[0]
		})
	})
}

function removeProduct(req, res) {
	const productId = req.params.product_id
	console.log(productId)

	db.query(query.removeProduct, productId, (err, data) => {
		if (err) return res.status(500).json({message: `Error removing the product: ${err}`})
		console.log(data[0])

		return res.status(200).json({message: 'Product successfully removed!'})
	})
}

module.exports = {
	getProducts,
	getProduct,
	getProductByName,
	getProductByCost,
	newProduct,
	updateProduct,
	removeProduct
}
