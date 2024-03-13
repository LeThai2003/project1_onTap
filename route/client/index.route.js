const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const searchRouter = require("./search.route");
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route");
const categoryProductMiddleware = require("../../middlewares/client/categoryProduct.middleware");
const cartRouter = require("./cart.route");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
    app.use(categoryProductMiddleware.category);

    app.use(cartMiddleware.cart);
    
    app.use(userMiddleware.inforUser);

    app.use("/", homeRouter);

    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/carts", cartRouter);

    app.use("/checkout", checkoutRouter);

    app.use("/user", userRouter);
};

