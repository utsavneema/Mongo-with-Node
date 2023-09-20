const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

const products = require("../models/productsModel")
const categories = require("../models/categoriesModel"); //collection name
const items = require("../models/itemsModel")

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
        const { purchased_freq, name } = req.body;
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
        const { purchased_freq, newName } = req.body;
        const result = await items.updateOne(
            { purchased_freq: purchased_freq },
            { $set: { name: newName } }
        );  /* "purchased_freq":"48", "newName":"heloooooo"} In postman */ 

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

        const { purchased_freq, name } = req.body;

        const result = await items.findByIdAndUpdate(id, {
            name: name, purchased_freq: purchased_freq
        });
        console.log("Updated Data:", result);
        res.status(200).json({ message: "Data successfully updated" });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}
//--------------------------------------------------------------------------------------------
async function lookupAggregate(req, res) {
    try {
        const result = await products.aggregate([ //returns all document with category name from categories collection 
            {
                $lookup: {
                    from: "categories", // collection name jisme lookup lgana hai
                    localField: "category", //Field in the current collection (products)
                    foreignField: "_id",// Field in the other collection jis se join krna hai (categories)
                    as: "CategoryName" //jisme result aega
                }
            },
            {
                $unwind: "$CategoryName"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    company: 1,
                    price: 1,
                    colors: 1,
                    image: 1,
                    // category: 1,
                    isFeatured: 1,
                    // __v: 1,
                    CategoryName: {
                        name: "$CategoryName.name" 
                    }
                }
            }
        ]);
        res.status(200).json({ message: "lookup worked", result });
        // console.log(result, "-------------------");
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Error --------------------------------" });
    }
}

//-------------------------------------------------------------------------------------------
module.exports = { getDetails, postDetails, getItems, updateItems, insertItems, updateItemsbyID, lookupAggregate };