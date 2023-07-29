const express = require('express')
const categoriesController = require('../controller/categories_controller')
const categoriesRouting = express()
categoriesRouting.get('/',categoriesController.findCategories)
module.exports = categoriesRouting