const product = {
	getProducts: 'call getProducts();',
	getProduct: 'select product_name, cost, product_image from product where product_id = ?;',
	getProductByName: 'call getProductByName(?);',
	getProductByCost: 'call getProductByCost(?);',
	newProduct: 'call newProduct(?, ?, ?);',
	updateProduct: 'call updateProduct(?, ?, ?, ?);',
	removeProduct: 'call removeProduct(?);'
}

module.exports = product
