const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesInfo = new Schema({
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    targetPrice: {
        type: Number
    },

});

const salesModel = mongoose.model('sales', salesInfo);
module.exports = salesModel;
