const chalk = require('chalk')
const User = require('../model/userModel');
exports.register = async (req,res) => {
    const user = await new User(req.body)
    try {
        await user.save()
        res.render('home-guest',{
            message:"registered.Please login now"
        })
    } catch (e) {
        res.render('home-guest',{
            message:e
        })
    }
}
exports.login = async(req,res) =>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        req.session.user = user
        await req.session.save()
        res.render('dashboard')
    }catch(e){
        res.render('home-guest',{
            message:e
        })
    }

}
exports.getUsers = async(req,res) =>{
    const users = await User.find()
    try{
        res.status(200).send(users)
    }catch(e){
        res.status(404).send()
    }
}

exports.home = (req,res)=>{
    if(req.session.user){
        res.render('dashboard')
    }else{
        res.render('home-guest')
    }
}