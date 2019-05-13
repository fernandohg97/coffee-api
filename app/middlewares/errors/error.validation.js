const { check, validationResult } = require('express-validator/check')

module.exports = {
	handleErrorValidation (req, res, next) {

		const errors = validationResult(req)

		return !errors.isEmpty() ? res.status(422).json({ errors: errors.array() }) : next()
	}
}
