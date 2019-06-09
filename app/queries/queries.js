const dbQueries = {
	product: {
		getProducts: 'call getAllProducts();',
		getUserProducts: 'call getUserProducts();',
		getProductsCount: 'call getProductsCount();',
		getProduct: 'call getOneProduct(?);',
		getProductByName: 'call getProductByName(?);',
		getProductByCategory: 'call getProductByCategory(?);',
		getProductSku: 'call getProductSku();',
		getProductSkuByName: 'call getProductSkuByName(?);',
		getProductVariantValuesBySku: 'call getProductVariantValuesBySkuId(?);',
		newProduct: 'call newProduct(?, ?, ?, ?);',
		updateProduct: 'call updateProduct(?, ?, ?, ?);',
		removeProduct: 'call removeProduct(?);',
		removeProducts: 'call removeAllProducts();'
	},
	variant: {
		getVariants: 'call getVariants();',
		getVariant: 'call getVariant(?);',
		getVariantsCountByProduct: 'call getVariantsCountByProduct(?);',
		newVariant: 'call newVariant(?);',
		updateVariant: 'call updateVariant(?, ?);',
		removeVariant: 'call removeVariant(?);'
	},
	variant_values: {
		getVariantValues: 'call getVariantValues();',
		getVariantValuesByProduct: 'call getVariantValuesByProduct(?);',
		getVariantValuesByName: 'call getVariantValuesByName(?, ?);',
		newVariantValues: 'call newVariantValues(?, ?, ?);',
		updateVariantValues: 'call updateVariantValues(?, ?, ?);',
		removeVariantValues: 'call removeVariantValues(?);'
	},
	sku: {
		newSku: 'call newSku(?, ?, ?, @insertId); select @insertId;',
		newSkuValues: 'INSERT INTO sku_values (sku_id, value_id) values ?;',
		updateSku: 'call updateSku(?, ?, ?, ?);'
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
