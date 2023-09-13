const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesInfo = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    }
});

const categoriesModel = mongoose.model('categories', categoriesInfo);
module.exports = categoriesModel;
