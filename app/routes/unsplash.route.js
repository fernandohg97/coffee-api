const express = require('express')
const unsplashRouter = express.Router()
const setReqPath = require('../middlewares/auth').setReqPath
const checkUsername = require('../middlewares/checkUsername')
const unsplash = require('../controllers/unsplash.controller')
const { check } = require('express-validator/check')
const errorHandler = require('../middlewares/errors/error.validation').handleErrorValidation
const fetch = require('node-fetch')

// ENDPOINTS
// Get random photos
unsplashRouter.get('/photos', setReqPath, unsplash.getPhotos)

// Get photos by keyword
unsplashRouter.get('/search/photos', setReqPath, [
	check('keyword').not().isEmpty()
], errorHandler, unsplash.getPhotoByName)

// Search username and redirect to below endpoint
unsplashRouter.get('/users', checkUsername)

// Get photos by user
unsplashRouter.get('/users/:username/photos', setReqPath, unsplash.getUserPhotos)

unsplashRouter.get('/login', (req, res) => {
	fetch('https://unsplash.com/oauth/authorize/client_id=5ba8ead3e49cf7972c4a7576326d29f2d272c32b07e04e476fedef0500067ac3?redirect_ui=urn:ietf:wg:oauth:2.0:oob?response_type=200?scope=public+read_user')
		.then(response => response.json())
		.then(body => console.log(body))
})

module.exports = unsplashRouter
