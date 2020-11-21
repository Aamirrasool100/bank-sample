require('dotenv').config()
const mongoose  = require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err,client)=>{
    if(err){
        return console.log(err);
    }console.log('db connected');
})
