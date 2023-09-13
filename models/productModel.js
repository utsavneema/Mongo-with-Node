const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
})
const productModel = mongoose.model("test_products", productSchema); //user is table name
module.exports = productModel;