const path = require('path')
const express = require('express')
const hbs = require('hbs')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
require('./mongoose')
const userRouter = require('../routes/userRouter')
const accountRouter = require('../routes/accountRouter')
const app = express()

// MONGO DB STORE CONFIGURATION
const store = new MongoDBStore({
    uri:process.env.MONGO_URL,
    collection:"sessions"
})
// SESSION CONFIGURATION
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store
}))

//PUBLIC PATH DIRECTORY
app.use(express.static(path.join(__dirname,'../public')))

//JSON BODY TO OBJECT
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// HBS HANDLER
app.set('view engine','hbs')
// app.use('views','views')
// ROUTER HANDLLER
app.use(userRouter)
app.use(accountRouter)


//LISTENER
app.listen(9000,console.log(`onport ${process.env.PORT} 9000`))