const express = require('express')
const unsplashRouter = express.Router()
const setReqPath = require('../middlewares/auth').setReqPath
const checkUsername = require('../middlewares/checkUsername')
const unsplash = require('../controllers/unsplash.controller')

// Endpoints
// Get random photos
unsplashRouter.get('/photos', setReqPath, unsplash.getPhotos)

// Get photos by keyword
unsplashRouter.get('/search/photos', setReqPath, unsplash.getPhotoByName)

// Search username and redirect to below endpoint
unsplashRouter.get('/users', checkUsername)

// Get photos by user
unsplashRouter.get('/users/:username/photos', setReqPath, unsplash.getUserPhotos)

module.exports = unsplashRouter
