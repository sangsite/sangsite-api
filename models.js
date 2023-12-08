/*jshint esversion: 6 */

const mongoose = require("mongoose");

let countertopSchema = mongoose.Schema({
    Color: { type: String, required: true },
    Material: { type: String, required: true },
    Description: { type: String, required: true },
    Image: String
});

let Countertop = mongoose.model("Countertop", countertopSchema);

module.exports.Countertop = Countertop;