const mongoose = require('mongoose')
const validator = require('validator')

const accountsSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId
    }
})

const Account = mongoose.model('Account',accountsSchema)
module.exports = Account