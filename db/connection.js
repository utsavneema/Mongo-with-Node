require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const connectionDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");

    } catch (err) {
        console.error(err, "<<<<")
    }
};

module.exports = connectionDB;