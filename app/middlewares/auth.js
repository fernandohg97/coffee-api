const express = require('express')
const config = require('../config/unsplash')

const isAuth = (req, res, next) => {

	if (!req.headers.authorization) {
		req.headers.authorization = new URLSearchParams(`client_id=${config.accessKey}`).toString()
		res.locals.publicAuthPath = `${config.endpoint}?${req.headers.authorization}`
		return next()
	}
	return next()
}

const setReqPath = (req, res, next) => {

	if (req.path) {

		// Add the request path to the unsplash api endpoint before the authorization path
		res.locals.unsplashUrl = res.locals.publicAuthPath.split('?')
		res.locals.unsplashUrl.splice(0, 1, res.locals.unsplashUrl[0].concat(req.path))
		res.locals.unsplashUrl = res.locals.unsplashUrl.join('?')

		return next()
	} else { next() }
}

module.exports = { isAuth, setReqPath }
