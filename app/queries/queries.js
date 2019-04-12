const product = {
	getProducts: 'call getAllProducts();',
	getProduct: 'call getOneProduct(?);',
	getProductByName: 'call getProductByName(?);',
	newProduct: 'call newProduct(?, ?, ?);',
	updateProduct: 'call updateProduct(?, ?, ?, ?);',
	removeProduct: 'call removeProduct(?);'
}

const variant = {
	newVariant: 'call newVariant(?);'
}

const sku = {
	newSku: 'call newSku(?, ?);'
}

const variantValues = {
	newVariantValues: 'call newVariantValues(?, ?, ?);'
}


module.exports = {
	product,
	variant,
	sku,
	variantValues
}
