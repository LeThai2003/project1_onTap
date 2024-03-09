const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    // user_id: String,
    products: [
        {
            products_id: String,
            quantity: Number,
        }
    ]
}, {
    timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;