const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({

    name : {
        type : String,
        required : true 

    },

    price : {
        type : String,
        required : true 
    },

    image : {
        type : String,
        required : true 
    },

    category : {
        type : String,
        required : true 
    },

    quantity : {
        type : Number,
        required : true,
        default : 1
    },

    userId : {
        type : String,
        required : true
    }

},

{
   Timestamp : true
}
)

const cartModel = mongoose.model('cartModel', cartSchema)

module.exports = cartModel

