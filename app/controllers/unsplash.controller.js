const fetch = require('node-fetch')
const checkStatus = require('../middlewares/checkStatus')

function getPhotos(req, res) {

	fetch(`${res.locals.unsplashUrl}&per_page=15&page=2`)
		.then(checkStatus)
		.then(body => {
			res.send(body[0])
		})
		.catch(err => console.error(err))
}

function getPhotoByName(req, res) {

	// Get the user search terms from the body
	let userSearch = req.body

	// Make the call to Unsplash API URL
	if (Object.getOwnPropertyNames(userSearch).length != 0) { // In case the search form was filled by the user

		fetch(`${res.locals.unsplashUrl}&query=${userSearch.keyword}`)
			.then(checkStatus)
			.then(body => {
				if (!body.results.length) {
					res.status(404).send({message: 'No photos found'})
				} else {
					res.send(body)
				}
			})
			.catch(err => console.error(err))

	} else { // In case the user doesn't type any value
		res.status(400).json({message: 'You must enter a search value', status: res.statusCode})
	}
}

module.exports = {
	getPhotos,
	getPhotoByName
}
