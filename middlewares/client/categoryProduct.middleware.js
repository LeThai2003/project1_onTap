const ProductCategory = require("../../model/product-category.model");
const createTreeHelper = require("../../helper/create-tree.helper")

module.exports.category = async (req, res, next) => {
    const categoryProducts = await ProductCategory.find({
        deleted: false,
    });

    const newCategoryProducts = createTreeHelper(categoryProducts);

    res.locals.layoutCategoryProducts = newCategoryProducts;

    next();
}