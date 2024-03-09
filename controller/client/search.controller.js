const Product = require("../../model/product.model");

//[GET]/search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    let products = [];

    if(keyword)
    {
        const titleRegex = new RegExp(keyword, "i");

        products = await Product.find({
            title: titleRegex,
            deleted: false,
            status: "active",
        }).sort({ position: "desc" });
    }

    res.render("client/pages/product/search", {
        title: "Trang danh sách sản phẩm",
        products: products
    });
}