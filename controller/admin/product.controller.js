const Product = require("../../model/product.model");
const paginationHelper = require("../../helper/pagination.helper");
const filterStatusHelper = require("../../helper/filterStatus");

//[GET]/admin/products
module.exports.index = async (req, res) => {
    try {
        const filterStatus = filterStatusHelper(req.query);

        const find = {
            deleted: false,
        };

         //filter status
         if(req.query.status)
         {
             find.status = req.query.status;
         }
         //filter status

         //search 
        if(req.query.keyword)
        {
            let regex = new RegExp(req.query.keyword, "i");
            find.title = regex;
        }
         //search

        //pagination
        const countProducts = await Product.countDocuments(find);
        const objectPagination = paginationHelper(5, req.query, countProducts);
        //pagination

        const products = await Product.find(find)
            .limit(objectPagination.limitItem)
            .skip(objectPagination.skip)
            .sort({position : "desc"});
    
        res.render("admin/pages/product/index.pug", {
            title: "Trang danh sách sản phẩm",
            pageTitle: "Danh sách sản phẩm",
            products: products,
            pagination: objectPagination,
            filterStatus: filterStatus,
            keyword: req.query.keyword
        });
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
};

//[PATCH]/admin/products/changeStatus/:status/:id
module.exports.changeStatus = async(req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        await Product.updateOne({
            _id: id
        }, {
            status: status 
        });
    } catch (error) {
        console.log(error)
    }
    req.flash('success', 'Thay đổi trạng thái thành công');
    res.redirect("back");
}

//[PATCH]/admin/products/changeMulti
module.exports.changeMulti = async(req, res) => {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case "active":
        case "inactive":
        {
            await Product.updateMany({
                _id: {$in : ids}
            }, {
                status: type
            })
            req.flash('success', 'Thay đổi trạng thái thành công');
            break;
        }
        case "deleteAll":
        {
            await Product.updateMany({
                _id : {$in : ids}
            }, {
                deleted : true
            });
            req.flash('success', 'Xóa sản phẩm thành công');
            break;
        }
        case "change-position":
        {
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({
                    _id:id
                },{
                    position:position
                });
            }  
            req.flash('success', 'Thay đổi vị trí thành công');
            break;
        }
        default:
            break;
    }
    res.redirect("back");
}

//[PATCH]/admin/products/delete/id
module.exports.deleteOne = async(req, res) => {
    try {
        const id = req.params.id;
        await Product.updateOne({
            _id : id
        }, {
            deleted : true
        });        
    } catch (error) {
        console.log(error)
    }
    req.flash('success', 'Xóa sản phẩm thành công');
    res.redirect("back");
}

//[GET]/admin/products/create
module.exports.create = async(req, res) => {

    res.render("admin/pages/product/create");
}

//[POST]/admin/products/create
module.exports.createPOST = async(req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == "")
    {
        const countProduct = await Product.countDocuments({
            deleted: false 
        });
        req.body.position = countProduct + 1;
    }
    else
    {
        req.body.position = parseInt(req.body.position);
    }
    if(req.file && req.file.filename)
    {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product = new Product(req.body);
    product.save();
    res.redirect("/admin/products");
}

//[GET]/admin/products/edit
module.exports.edit = async(req, res) => {
    try {
        const product = await Product.findOne({
            _id : req.params.id,
            deleted: false
        })
    
        res.render("admin/pages/product/edit.pug",
        {
            title: "Trang chỉnh sửa sản phẩm",
            product: product
        })
    } catch (error) {
        res.redirect("/admin/products")
    }
}

//[PATCH]/admin/products/edit/id
module.exports.editPATCH = async(req, res) => {
    try {
        const id = req.params.id;

        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = parseInt(req.body.position);

        if(req.file && req.file.filename) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        }

        await Product.updateOne({
            _id : id,
            deleted: false
        }, req.body);
        
        req.flash("success", "Cập nhật sản phẩm thành công");
        res.redirect("back");
    } catch (error) {
        res.redirect("/admin/products")
    }
}

//[GET] /admin/produtcs/detail/:id
module.exports.detail = async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({
            _id : id
        })
        res.render("admin/pages/product/detail.pug", {
            title: "Trang chi tiết sản phẩm",
            product: product
        })
    } catch (error) {
        res.render("/admin/products")
    }
    
}