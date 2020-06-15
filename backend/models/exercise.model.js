const mogoose = require('mongoose')

const Schema = mogoose.Schema

const exerciseSchema = new Schema
(
    {
        username: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        date:{
            type: Date,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

