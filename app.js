require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const connectionDB = require("./db/connection");
const route = require('./routes/apiRoutes');
const fileUpload = require("express-fileupload");
const path = require("path");


app.use(bodyParser.json());
app.use(express.json());

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
connectionDB();
app.use('/', route);


// Start the server
app.listen(5000, () => {
    // console.log(`Server is running on port ${4000}`);
});