const product = {
	getProducts: 'call getProducts();',
	getProduct: 'select product_name, cost, product_image from product where product_id = ?;',
	getProductByName: 'call getProductByName(?);',
	getProductByCost: 'call getProductByCost(?);',
	newProduct: 'insert into product set ?;',
	updateProduct: 'update product set ? where product_id = ?;',
	removeProduct: 'call removeProduct(?);'
}

module.exports = product
