const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({

    name : {
        type : String,
        require : true 

    },

    price : {
        type : String,
        require : true 
    },

    image : {
        type : String,
        require : true 
    },

    category : {
        type : String,
        require : true 
    },

    quantity : {
        type : Number,
        require : true,
        default : 1
    }

},

{
   Timestamp : true
}
)

const cartModel = mongoose.model('cartModel', cartSchema)

module.exports = cartModel

