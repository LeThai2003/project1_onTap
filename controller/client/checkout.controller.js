const Cart = require("../../model/cart.model");
const Order = require("../../model/order.model");
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

//[POST]/chekout/order
module.exports.order = async(req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const orderInfo = {
        cartId: cartId,
        userInfo: userInfo,
        products: [],
    }
    
    const cart = await Cart.findOne({
        _id: cartId, 
    });

    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.products_id,
        }).select("price discountPercentage");

        const infoProduct = {
            product_id: item.products_id,
            price: product.price,
            discountPercentage: product.discountPercentage,
            quantity: item.quantity,
        }

        orderInfo.products.push(infoProduct);
    }

    const order = new Order(orderInfo);
    await order.save();

    await Cart.updateOne({
        _id: cartId,
    }, {
        products: [],
    });

    res.redirect(`/checkout/success/${order.id}`);
}

//[GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        _id: orderId,
    });

    order.totalPrice = 0;

    for (const item of order.products) {
        const infoProduct = await Product.findOne({
            _id: item.product_id,
        });

        item.thumbnail = infoProduct.thumbnail,
        item.priceNew = Math.ceil(item.price * (100 - item.discountPercentage) / 100 );
        item.totalPrice = item.quantity * item.priceNew;

        order.totalPrice += item.totalPrice;
    }

    res.render("client/pages/checkout/success", {
        title: "Đặt hàng thành công",
        order: order,
      });;
}