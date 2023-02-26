const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    walletAddress:{
        required:true,
        type:String,
        minLength:3,
        unique:true
    },
    email:{
        required:true,
        type:String,
        minLength:3,
        unique:true
    },
    
    pdf:{
        type:String
    },
    pdfAddress:{
        type:String,
        unique:true
    }
    


},{timestamps:true})

module.exports = mongoose.model("User", userSchema)