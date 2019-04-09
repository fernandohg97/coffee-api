const express = require('express')
const unsplashRouter = express.Router()
const setReqPath = require('../middlewares/auth').setReqPath
const unsplash = require('../controllers/unsplash.controller')

// Endpoints
// Get random photos
unsplashRouter.get('/photos', setReqPath, unsplash.getPhotos)

// Search photos by user input
unsplashRouter.get('/search/photos', setReqPath, unsplash.getPhotoByName)

module.exports = unsplashRouter
