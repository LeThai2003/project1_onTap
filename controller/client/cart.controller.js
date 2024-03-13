const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");

//[GET]/carts
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    
    const cart = await Cart.findOne({
        _id: cartId, 
    });

    cart.totalPrice = 0;

    if(cart.products.length > 0) // co san pham -> cap nhat gia
    {
        for (const item of cart.products) {
            const product = await Product.findOne({
                _id: item.products_id,
            }).select("thumbnail title slug price discountPercentage");
            
            product.priceNew = Math.ceil(product.price * (100 - product.discountPercentage)/100);

            item.productInfo = product;

            item.totalPrice = product.priceNew * item.quantity;

            cart.totalPrice += item.totalPrice;
        }
    }
    

    res.render("client/pages/cart/index", {
        title: "Trang giỏ hàng",
        cart: cart,
    })
}

//[POST] cart/add/:id
module.exports.addPost = async (req, res) => {
    try {
        const cartId = req.cookies.cartId;
        const productId = req.params.id;
        const quantity = parseInt(req.body.quantity);
        
        const cart = await Cart.findOne({
            _id: cartId,
        });

        const exitsProduct = cart.products.find(item => item.products_id == productId);

        if(exitsProduct)
        {
            const newQuantity = quantity + exitsProduct.quantity;

            await Cart.updateOne({
                _id: cartId,
                "products.products_id": productId,
            },{
                $set: {"products.$.quantity": newQuantity},
            });
        }
        else
        {
            const objectCart = {
                products_id: req.params.id,
                quantity: parseInt(req.body.quantity),
            };
        
            await Cart.updateOne({
                _id: cartId,
            }, {
                $push:{products: objectCart},
            });
        }
        req.flash("success", `Đã thêm sản phẩm vào giỏ hàng!`);
        res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", `Thêm sản phẩm vào giỏ hàng thất bại!`);
        res.redirect("back");
    }
}
//[GET] cart/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const cartId = req.cookies.cartId;
        const productId = req.params.id;
        await Cart.updateOne({
            _id: cartId,
        }, {
            $pull: {products: {products_id: productId}},
        });
        req.flash("success", `Xóa sản phẩm trong giỏ hàng thành công!`);
        res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", `Xóa sản phẩm trong giỏ hàng thất bại!`);
        res.redirect("back");
    }
}

//[GET]/carts/update/:productId/:quantity
module.exports.update = async (req, res) => {
    try {
        const productId = req.params.productId;
        const quantity = parseInt(req.params.quantity);
        const cartId = req.cookies.cartId;

        await Cart.updateOne({
            _id: cartId,
            "products.products_id": productId,
        }, {
            $set: {"products.$.quantity": quantity}
        });

        req.flash("success", "Cập nhật số lượng sản phẩm thành công!");
        res.redirect("back");
    } catch (error) {
        res.redirect("back");
    }
}