const express = require('express')
const bodyParser = require('body-parser')
const userRouting = require('./routing/users_routing')
const categoryRouting = require('./routing/categories_routing')
const questionRouting = require('./routing/question_routing')
const answerRouting = require('./routing/answer_routing')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

app = express()
app.use(bodyParser.json())
app.use(cors());
app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }))

mongoose.connect('mongodb+srv://kamclose3312:TQ2vuctgBVkEaOR8@cluster0.ztzrkhg.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('Connection establised')
}).catch((err)=>{
    console.log(err)
})

app.use('/user',userRouting)
app.use('/category',categoryRouting)
app.use('/question',questionRouting)
app.use('/answer',answerRouting)

app.listen(8080,()=>{
    console.log('Sever is running.')
})

