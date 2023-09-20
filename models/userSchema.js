const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    id: Number,
    name: String,
    parent_id: Number,
    child: Array
})
const userSchemaModel = mongoose.model("user", userSchema); 
module.exports = userSchemaModel;