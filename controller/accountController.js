const Account = require('../model/accountsModel')
exports.accounts = (req,res)=>{
    res.render('accounts')
}
exports.accounts = async(req,res) =>{
    try{
        const accounts = await new Account({
            ...req.body,
            user:req.session.user._id
        })
        await accounts.save()
        console.log(accounts.amount)
        res.render('accounts',{
            message:"Successfully added to your account"
        })

    }catch(e){
       res.render('accounts',{
           message:e
       })
    }
}