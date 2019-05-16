const dbQueries = {
	product: {
		getProducts: 'call getAllProducts();',
		getUserProducts: 'call getUserProducts();',
		getProductsCount: 'call getProductsCount();',
		getProduct: 'call getOneProduct(?);',
		getProductByName: 'call getProductByName(?);',
		getProductByCategory: 'call getProductByCategory(?);',
		getProductVariants: 'call getProductVariants();',
		newProduct: 'call newProduct(?, ?, ?, ?);',
		updateProduct: 'call updateProduct(?, ?, ?, ?);',
		removeProduct: 'call removeProduct(?);',
		removeProducts: 'call removeAllProducts();'
	},
	variant: {
		getVariants: 'call getVariants();',
		getVariant: 'call getVariant(?);',
		newVariant: 'call newVariant(?);',
		updateVariant: 'call updateVariant(?, ?);',
		removeVariant: 'call removeVariant(?);'
	},
	variant_values: {
		getVariantValues: 'select value_id, value_name, product_id, variant_id from variant_values where product_id = ?;',
		newVariantValues: 'call newVariantValues(?, ?, ?);',
		updateVariantValues: 'call updateVariantValues(?, ?, ?);',
		removeVariantValues: 'call removeVariantValues(?);'
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
		removeCategory: 'call removeCategory(?);',
		removeCategories: 'call removeCategories();'
	}
}

module.exports = dbQueries
