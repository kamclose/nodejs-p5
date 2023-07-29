const express = require('express')
const questionController = require('../controller/questions_controller')
const questionRouting = express()
questionRouting.post('/',questionController.postQuestion)
questionRouting.get('/:id',questionController.findQuestions)
module.exports = questionRouting