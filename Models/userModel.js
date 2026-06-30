const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

name : {
    type : String,
    require : true
},
username : {
    type : String,
    require : true
},
email : {
    type : String,
    require : true
},
password : {
    type : String,
    require : true
}
},
{
    timestamps : true
})

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel