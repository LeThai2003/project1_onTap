const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const searchRouter = require("./search.route");
const categoryProductMiddleware = require("../../middlewares/client/categoryProduct.middleware");
const cartRouter = require("./cart.route");

module.exports = (app) => {
    app.use(categoryProductMiddleware.category);

    app.use("/", homeRouter);

    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", searchRouter);
};

