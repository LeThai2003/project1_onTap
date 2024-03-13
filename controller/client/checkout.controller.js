const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");

//[GET]/checkout
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId,
    });
    
    cart.totalPrice = 0;


    for(const item of cart.products)
    {
        const product = await Product.findOne({
            _id: item.products_id,
        }).select("thumbnail title slug price discountPercentage");

        const priceNew = Math.ceil(product.price * (100 - product.discountPercentage) / 100);

        product.priceNew = priceNew;

        item.productInfo = product;

        item.totalPrice = item.quantity * product.priceNew;

        cart.totalPrice += item.totalPrice;

    }


    res.render("client/pages/checkout/index", {
        title: "Trang đặt hàng",
        cart: cart,
    });
}