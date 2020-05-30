const mongoose = require('mongoose')
const keys = require('../Models/Keys')










const verifyKey = async (req, res, next) => {

    var keyInput = req.params.key;
    await keys.findById(keyInput)
    if (keyInput === keyBD) {
        next()
    } else {
        
    }
}

const genKey = (req, res, next) => {
    console.log('jdjsj');

}


module.exports = {
    verifyKey, genKey
}