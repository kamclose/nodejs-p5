const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answersSchema = Schema({
    answer:{
        type:String,
        required:true
    },
    userId: {
        type:String,
        ref: "users",
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('answer',answersSchema)