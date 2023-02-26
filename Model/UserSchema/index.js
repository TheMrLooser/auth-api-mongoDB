const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        required:true,
        type:String,
        minLength:3
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        minLength:10,
        maxLength:10,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pdf:{
        type:String
    },
    address:{
        type:String,
        unique:true
    }
    


},{timestamps:true})

module.exports = mongoose.model("User", userSchema)