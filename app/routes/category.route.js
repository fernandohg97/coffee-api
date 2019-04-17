const express = require('express')
const categoryRouter = express.Router()
const categoryCtrl = require('../controllers/category.controller')

// ENDPOINTS
categoryRouter.get('/categories', categoryCtrl.getCategories) // Get all categories
categoryRouter.get('/categories/:category_id', categoryCtrl.getCategory) // Get one category
categoryRouter.post('/categories', categoryCtrl.newCategory) // Create new category
categoryRouter.put('/categories/:category_id', categoryCtrl.updateCategory) // Update a category
categoryRouter.delete('/categories/:category_id', categoryCtrl.removeCategory) // Remove a category

module.exports = categoryRouter
