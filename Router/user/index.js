const express = require('express')
const { RegisterUser, LoginUser, PostPDF, GetPDF } = require('../../Controler/User')
const passport = require('passport')

const userRouter = express.Router()

userRouter.post('/register',RegisterUser)
userRouter.post('/login',LoginUser)
userRouter.post('/post-pdf',PostPDF)
userRouter.get('/get-pdf',GetPDF)

module.exports = userRouter