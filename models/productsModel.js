const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema ({
    name: {
        type: String
    },
    company: {
        type:String
    },
    price: {
        type: Number
    },
    colors: {
        type: Array
    },
    image: {
        type: String
    },
    category:{
        type: String
    },
    isFeatured: {
        type: Boolean
    }, 
 
})
const productsModel = mongoose.model("products", productsSchema); 
module.exports = productsModel;