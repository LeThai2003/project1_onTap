const Product = require("../../model/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({
        position:"desc"
    });

    for (const item of products) {
        item.priceNew = Math.ceil((item.price * (1 - item.discountPercentage/100)));
    }

    console.log(products);

    res.render("client/pages/product/index", {
        title: "Trang danh sách sản phẩm",
        products: products
    });
}

//[GET] /products/detail
module.exports.detail = (req, res) => {
    res.send("Trang chi tiet san pham");
}