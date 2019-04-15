const dbQueries = {
	product: {
		getProducts: 'call getAllProducts();',
		getProduct: 'call getOneProduct(?);',
		getProductByName: 'call getProductByName(?);',
		newProduct: 'call newProduct(?, ?, ?);',
		updateProduct: 'call updateProduct(?, ?, ?, ?);',
		removeProduct: 'call removeProduct(?);',
		removeProducts: 'call removeAllProducts();'
	},
	variant: {
		newVariant: 'call newVariant(?);',
	},
	variant_values: {
		newVariantValues: 'call newVariantValues(?, ?, ?);',
		updateVariantValues: 'call updateVariantValues(?, ?, ?);'
	},
	sku: {
		newSku: 'call newSku(?, ?);',
		updateSku: 'call updateSku(?, ?);'
	}
}


module.exports = dbQueries
