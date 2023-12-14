const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const { check, validationResult } = require("express-validator");

const Models = require("./models.js");
const Countertops = Models.Countertop;

app.use(cors());
const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});


mongoose.connect('mongodb+srv://sangsite:SSkenshin13@sangsite.v6gs5rj.mongodb.net/?retryWrites=true&w=majority', {
})

// mongoose.connect(process.env.CONNECTION_URI,
//     { useNewUrlParser: true, useUnifiedTopology: true });

// GET requests

/**
 * Get the welcome page
 * @method GET
 * @param {string} endpoint - endpoint to load the welcome page. "url/"
 * @returns {object} - returns the welcome page
 */

app.get("/", (req, res) => {
    res.send("Welcome to Sangsite!");
});

/**
 * Get all countertops
 * @method GET
 * @param {string} endpoint - endpoint to fetch countertops. "url/countertops"
 * @returns {object} - returns the countertop object
 */

app.get(
    "/countertops",
    (req, res) => {
        Countertops.find()
            .then(countertops => {
                res.status(201).json(countertops);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

/**
 * Get movies by material
 * @method GET
 * @param {string} endpoint - endpoint - fetch countertops by maeterial
 * @param {string} Material - is used to get specific movie "url/countertops/:Material"
 * @returns {object} - returns the countertops with specific material
 */

app.get(
    "/countertops/:Material",
    (req, res) => {
        Countertops.findOne({ Material: req.params.Material })
            .then(countertops => {
                res.json(countertop);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Error " + err);
            });
    }
);

//Create server

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
    console.log("Listening on Port " + port);
});