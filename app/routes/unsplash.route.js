const express = require('express')
const unsplashRouter = express.Router()
const fetch = require('node-fetch')
const setReqPath = require('../middlewares/auth').setReqPath
const checkStatus = require('../middlewares/checkStatus')

// Endpoints
// Get random photos
unsplashRouter.get('/photos', setReqPath, (req, res) => {

	fetch(`${res.locals.unsplashUrl}&per_page=15&page=2`)
		.then(checkStatus)
		.then(body => {
			res.send(body[0])
		})
		.catch(err => console.error(err))
})

// Search photos by user input
unsplashRouter.get('/search/photos', setReqPath, (req, res) => {

	// Get the user search terms from the body
	let userSearch = req.body
	console.log(0 == false)

	// Make the call to Unsplash API URL
	if (Object.getOwnPropertyNames(userSearch).length != 0) { // In case the search form was filled by the user

		fetch(`${res.locals.unsplashUrl}&query=${userSearch.keyword}`)
			.then(response => response.json())
			.then(body => res.send(body))
			.catch(err => console.error(err))

	} else { // In case the user doesn't type any value
		res.status(400).json({message: 'You must enter a search value'})
	}
})

module.exports = unsplashRouter
