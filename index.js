/*jshint esversion: 6 */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { check, validationResult } = require("express-validator");

const Models = require("./models.js");
const Countertops = Models.Countertop;

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

mongoose.connect('mongodb+srv://sangsite:SSkenshin13@sangsite.v6gs5rj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

require("./auth")(app);

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
 * @param {string} endpoint - endpoint to fetch movies. "url/countertops"
 * @returns {object} - returns the movie object
 */

app.get(
    "/countertops",
    (req, res) => {
        Movies.find()
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
 * Get countertops by material
 * @method GET
 * @param {string} endpoint - endpoint - fetch countertops by material
 * @param {string} Title - is used to get specific countertop "url/countertops/:Material"
 * @returns {object} - returns the countertop with specific material
 */

app.get(
    "/countertops/:Material",
    (req, res) => {
        Movies.findOne({ Material: req.params.Material })
            .then(countertop => {
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