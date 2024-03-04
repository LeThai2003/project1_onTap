const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    products_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false 
    }
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;