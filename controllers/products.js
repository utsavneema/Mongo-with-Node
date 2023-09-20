const mongoose = require("mongoose")
const products = require("../models/productsModel")

async function operators (req, res){
    try {
        const {price , name}= req.body;
        const result = await products.find(
            // {price: {$eq: req.body.price}}
            // {price: {$gte: req.body.price}}
            // {price: {$in: [req.body.price, req.body.price2]}}
            {$and: [{price: {$gt:req.body.price}}, {name:req.body.name}] }
        );  //.sort({price: 1}), .count();  

        res.status(200).json({ message: "Data agyaaaaaaa", result });
        // console.log("desireddd Dataaaaaa");
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}

module.exports = {operators}