const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const categories = require("../models/categoriesModel"); //collection name
const items = require("../models/itemsModel")
const sales = require("../models/salesModel")

//----------------------------------------for maximum execution timeout--------------------------------------------------------------
// async function testing(req, res) {
//     await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true);
//         }, 5000);
//     });
//     res.status(200).json({ status: true, message: 'hello world' });
// }
//-------------------------------------------------------------------------------------------------------------

async function getDetails(req, res) {
    console.log("<<<<<<<<<<<");
    const a = await categories.find();
    console.log(a);
    res.json(a);
}
//-----------------------------------------------------------------------------------------------------------
async function postDetails(req, res) {
    try {
        const { name, slug } = req.body;
        const data = new categories({
            name: req.body.name,
            slug: req.body.slug
        });
        await data.save();
        // console.log("Data after save:", data);
        res.status(200).json({ message: "Data successfully inserted" });
    } catch (error) {
        console.error("Error while saving data:", error);
        res.status(500).json({ message: "An error occurred while saving data" });
    }
}
//----------------------------------------------------------------------------------------------------------------------
async function insertItems(req, res) {
    try {
        const { purchased_freq, category } = req.body;
        const result = await items.create({
            purchased_freq: req.body.purchased_freq,
            name: req.body.name
        });

        console.log(result);
        res.status(200).json({ message: "Item Inserted" });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}
//---------------------------------------------------------------------------------------------------------------
async function getItems(req, res) {
    const a = await items.find();
    // const a = await items.findOne({ "name": "abcd" });
    console.log(a);
    res.json(a);
}
//---------------------------------------------Using filter--------------------------------------------------------------------
async function updateItems(req, res) {
    try {
        const { purchased_freq, name, newName } = req.body;
        const result = await items.updateOne(
            { purchased_freq: purchased_freq },
            { $set: { name: newName } }
        );
        if (result.nModified === 0) {
            return res.status(404).json({ message: "No matching records found" });
        }
        res.status(200).json({ message: "Data successfully updated ++++++++++++++++++" });
        console.log(result, "New Dataaaaaa");
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}
//--------------------------------------------------------Using Id---------------------------------------------------
async function updateItemsbyID(req, res) {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid ID provided" });
        }

        const { purchased_freq, name } = req.body;

        const result = await items.findByIdAndUpdate(id, {
            name: name, purchased_freq: purchased_freq
        },
            { new: true });

        if (!result) {
            return res.status(404).json({ message: "No matching records found" });
        }

        console.log("Updated Data:", result);
        res.status(200).json({ message: "Data successfully updated" });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}
//--------------------------------------------------------------------------------------------
async function salesAggregation(req, res) {
    try {
        const { quantity } = req.body;
        const result = await sales.aggregate([
            { $match: { quantity: quantity } },
            { $group: { _id: '$quantity', totalPrice: { $sum: '$price' }, avgPrice: { $avg: '$price' } } }
        ]);
        res.status(200).json({ message: "Data successfully fetched", result });
        console.log(result, "-------------------");
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}

//-------------------------------------------------------------------------------------------
module.exports = { getDetails, postDetails, getItems, updateItems, insertItems, updateItemsbyID, salesAggregation };