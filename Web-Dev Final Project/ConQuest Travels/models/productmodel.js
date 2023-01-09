const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema({
    img: {
        
    }, 
    name: String,
    description: String,
    price: String,
    region: String,

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
