const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");

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

    // console.log(products);

    res.render("client/pages/product/index", {
        title: "Trang danh sách sản phẩm",
        products: products
    });
}

//[GET] /products/detail/:slug  (product)
module.exports.detailProduct = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        deleted: false,
        status: "active",
        slug: slug,
    })

    product.priceNew = Math.ceil(product.price/100*(100-product.discountPercentage));


    if(product.products_category_id)
    {
        const category = await ProductCategory.findOne({
            _id: product.products_category_id,
        })

        product.category = category;
    }

    console.log(product);

    res.render("client/pages/product/detail", {
        title: "Trang chi tiết sản phẩm",
        product: product,
    });
}

//[GET]/products/:slugCategory
module.exports.category = async (req, res) => {
    const slugCategory = req.params.slugCategory;
    const category = await ProductCategory.findOne({
        slug: slugCategory,
        deleted: false,
        status: "active",
    });

    console.log(category);

    const getSubCategorys = async(parentId) => {
        // lay ra cac con cua category co id la parentId
        const subs = await ProductCategory.find({
            deleted: false,
            status: "active",
            parent_id: parentId,
        });

        let allSubs = [...subs]; // dau tien la con cap 1 ... sau khi chay vong for se chay xuong kieu DFS

        for (const sub of subs) {
            const child = await getSubCategorys(sub.id);
            allSubs.concat(child);
        }

        return allSubs;
    }
    
    const subProductsCategory = await getSubCategorys(category.id);

    const subsProductsCategoryId = subProductsCategory.map(item => item.id);

    const products = await Product.find({
        products_category_id: {
            $in: [category.id, ...subsProductsCategoryId]
        },
        status: "active",
        deleted: false,
    }).sort({
        position:"desc"
    });

    for (const item of products) {
        item.priceNew = Math.ceil((item.price * (1 - item.discountPercentage/100)));
    }

    // console.log(products);

    res.render("client/pages/product/index", {
        title: "Trang danh sách sản phẩm",
        products: products
    });
}

