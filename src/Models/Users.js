const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    username: String,
    password: String,
})


userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = model('Users', userSchema)