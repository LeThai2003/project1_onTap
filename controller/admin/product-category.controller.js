const ProductCategory = require("../../model/product-category.model");
const SystemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/create-tree.helper")

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
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTreeHelper(records);

    res.render("admin/pages/products-category/create", {
        title: "Thêm mới danh mục sản phẩm",
        records: newRecords
    }); 
};

//[POST]/admin/products-category/create
module.exports.createPost = async (req, res) => {

    if(res.locals.role.permissions.includes("products-category_create"))
    {
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
    }
    else
    {
        res.send("404");
    }
};

//[GET]/admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const data = await ProductCategory.findOne({
        _id: id,
        deleted: false
    });

    console.log(data);
    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTreeHelper(records);

    res.render("admin/pages/products-category/edit", {
        title: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecords
    }); 
};

//[PATCH]/admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit"))
    {
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

        await ProductCategory.updateOne({
            _id: req.params.id,
            deleted: false
        },req.body);

        req.flash("success", "Chỉnh sửa danh mục sản phẩm thành công");

        res.redirect(`back`);
    }
    else
    {
        res.send("404");
    }
};