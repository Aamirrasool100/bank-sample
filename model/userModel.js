const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isAlphanumeric(value)){
                throw new Error('Username can only contain letters and numbers')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(('Email is invalid'))
            }
        }
    },
    tokens:[{
        token:{
            type:String
        }
    }],
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain letter "password"')
         }
        }
    }
})
//  HIDE PRIVATE DATA
// userSchema.methods.toJSON = function(){
//     const user = this
//     const userObj = user.toObject()
//     delete userObj.password
//     delete userObj.password
//     return userObj
// }
//   GENERATE AUTH TOKEN
// userSchema.methods.generateAuthToken = async function(){
//     const user = this
//     const token =  jwt.sign({id:user._id},process.env.JWT_SECRET)
//     user.tokens = user.tokens.concat({token:token})
//     await user.save()
//     return token
// }
 //    LOGIN AUTHENTICATION(MATCHING PASSWORD AND EMAIL)
userSchema.statics.findByCredentials = async function(email,password){
    const user  = await User.findOne({email})
    if(!user){
        throw new Error('Email is invalid')
    }
    const isValid = await bcrypt.compare(password,user.password)
    if(!isValid){
        throw new Error('Password is incorrect..try again')
    }
    return user
}

//            HASING THE PASSWORD
userSchema.pre('save',async function(next){
    const user  = this
    if(user.isModified('password')){
         user.password = await bcrypt.hash(user.password,12)
    }
    next()
})
const User = mongoose.model("User",userSchema)
module.exports = User