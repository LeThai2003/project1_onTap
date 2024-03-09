const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
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
    },
    createdBy:{
        accountId: String,
        createAt: Date,
    },
    updateBy: [
        {
            accountId: String,
            updateAt: Date,
        }
    ],
    // deletedAt: Date
    deletedBy:{
        accountId: String,
        deleteAt: Date,
    },
    featured: String,
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;