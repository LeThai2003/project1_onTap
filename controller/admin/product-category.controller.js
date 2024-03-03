const ProductCategory = require("../../model/product-category.model");
const SystemConfig = require("../../config/system");

//[GET]/admin/product-category
module.exports.index =async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    })
    res.render("admin/pages/products-category/index", {
        title: "Trang danh mục sản phẩm",
        records: records
    })
};

//[GET]/admin/products-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create", {
        title: "Thêm mới danh mục sản phẩm",
    }); 
};

//[POST]/admin/products-category/create
module.exports.createPost = async (req, res) => {
    console.log(req.body);
    if(req.body.position == "")
    {
        const countProductCategory = await ProductCategory.countDocuments({
            deleted: false 
        });
        req.body.position = countProductCategory + 1;
    }
    else
    {
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    req.flash("success", "Thêm mới mục sản phẩm thành công");

    res.redirect(`/${SystemConfig.prefixAdmin}/products-category`);
};