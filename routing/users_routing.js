const express = require('express')
const usersController = require('../controller/users_controller')
const usersRouting = express()
usersRouting.post('/login',usersController.checkUser)
usersRouting.post('/signup',usersController.createNewUser)
usersRouting.get('/:id',usersController.findUser)
module.exports = usersRouting