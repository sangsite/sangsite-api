/*jshint esversion: 6 */

const mongoose = require("mongoose");

let countertopSchema = mongoose.Schema({
    Material: { type: String, required: true },
    Title: { type: String, required: true },
    Color: { type: String, required: true },
    Description: { type: String, required: true },
    Image: String
});

let Countertop = mongoose.model("Countertop", countertopSchema);

module.exports.Countertop = Countertop;