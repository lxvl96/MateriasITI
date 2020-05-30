const { Schema, model } = require('mongoose')

const keySchemas = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = model('keys', keySchemas)