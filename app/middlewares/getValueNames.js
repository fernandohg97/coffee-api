const db = require('../db/db-connection')

module.exports = function getValueIds(req, res, next) {
	let { getVariantValuesByName } = req.variant_values
	let { product_id } = req.params
	let queryParams = req.query // value_names from the route params

	req.valuesId = [] // Array to store values_id

	if (Array.isArray(queryParams.valueNames)) { // In case the property of query params is an array

		for (const value of queryParams.valueNames) { // Loop through valueNames properties
			db.query(getVariantValuesByName, [product_id, value], (err, data) => {

				if (err) return res.status(500).send({ message: `Error getting value_id from variant_values: ${err}` }) //
				console.log(data[0])
				req.valuesId.push(data[0].value_id) // Store the value_id from the sql query

			})
		}
	} else { // In case query params property is not an array
		db.query(getVariantValuesByName, [product_id, queryParams.valueNames], (err, data) => {

			if (err) return res.status(500).send({ message: `Error getting value_id from variant_values: ${err}` })
			req.valuesId.push(data[0].value_id)

		})
	}
	next()
}
