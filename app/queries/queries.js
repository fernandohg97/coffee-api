const dbQueries = {
	product: {
		getProducts: 'call getAllProducts();',
		getUserProducts: 'call getUserProducts();',
		getProductsCount: 'call getProductsCount();',
		getProduct: 'call getOneProduct(?);',
		getProductByName: 'call getProductByName(?);',
		getProductByCategory: 'call getProductByCategory(?);',
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
	},
	category: {
		getCategories: 'call getCategories();',
		getOneCategory: 'call getOneCategory(?);',
		newCategory: 'call newCategory(?);',
		updateCategory: 'call updateCategory(?, ?);',
		removeCategory: 'call removeCategory(?);'
	},
	coffeeBean: {
		getCoffeeBean: 'call getCoffeeBean();'
	}
}

module.exports = dbQueries
