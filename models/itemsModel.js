const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsInfo = new Schema({
    name: {
        type: String
    },
    purchased_freq: {
        type: Number
    },

});

const itemsModel = mongoose.model('items', itemsInfo);
module.exports = itemsModel;
