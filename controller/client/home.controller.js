const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
//[GET]/
module.exports.index = async (req, res) => {
    // ----san pham noi baat -----
    const productsFeatured = await Product.find({
        deleted: false,
        status: "active",
        featured: "1",
    }).sort({position: "desc"}).limit(6);

    // console.log(productsFeatured);

    for (const product of productsFeatured) {
        product.priceNew = Math.ceil(product.price * (100 - product.discountPercentage)/100);
    }


    // ------san pham moi nhat 
    const newProducts = await Product.find({
        deleted: false,
        status: "active",
    }).sort({position: "desc"}).limit(6);

    for (const product of newProducts) {
        product.priceNew = Math.ceil(product.price * (100 - product.discountPercentage)/100);
    }

    res.render("client/pages/home/index.pug", {
        Title: "home",
        productsFeatured: productsFeatured,
        newProducts: newProducts,
    });
};