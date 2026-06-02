const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    }, 
    password:{
        type: String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:["active","blocked"],
        default:"active"
    },
    role:{
        type:String,    
        enum:["user","admin"],
        default:"user"
    }

    }, {timestamps:true}
)

const authModel = mongoose.model("userData", authSchema)

module.exports = authModel