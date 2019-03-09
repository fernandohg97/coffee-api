const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override')

// Declare local variable
app.locals.title = 'Coffee Menu'

// Define app settings
app.set('env', process.env.NODE_ENV || 'development')
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Default middlewares
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(logger('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Error handler
app.use(function (err, req, res, next) {
	console.error('error: ' + err.stack)
	res.render('error', {
		error: err
	})
})

// Send default header for unsplash API
app.use(function (req, res, next) {
	res.set('Accept-Version', 'v1')
	next()
})

// Routes
const productRouter = require('./routes/product.route')

app.use('/api', productRouter)

// Middleware to handle main route
app.use('/', (req, res) => { res.render('index') })

module.exports = app
