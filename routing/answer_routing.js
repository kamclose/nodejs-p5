const express = require('express')
const answerController = require('../controller/answers_controller')
const answerRouting = express()
answerRouting.post('/',answerController.postAnswer)
answerRouting.get('/:id',answerController.findAnswers)
module.exports = answerRouting