const { Router } = require('express')
const express = require('express')
const accountRouter = new express.Router()
const accountController = require('../controller/accountController')
accountRouter.get('/accounts',accountController.accounts)
accountRouter.post('/amount',accountController.accounts)
module.exports = accountRouter