const mongoose = require('mongoose')

// let schema = mongoose.Schema()

const productSchema = new mongoose.Schema( 
    {
    name : {
        type : String,
        require : true,
        },

    price : {
        type : String,
        require : true,
    },

    image : {
        type : String,
        require : true,
    },

    category : {
        type : String,
        require : true 
    }

},
{
    Timestamp : true 
}
);

const productModel = mongoose.model('ProductModel', productSchema)

module.exports = productModel