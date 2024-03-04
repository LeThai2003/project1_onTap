const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const rolesRoute = require("./role.route");
const config = require("../../config/system");

module.exports = (app) => {
    app.use(`/${config.prefixAdmin}/dashboard`, dashboardRoute);
    app.use(`/${config.prefixAdmin}/products`, productRoute);
    app.use(`/${config.prefixAdmin}/products-category`, productCategoryRoute);
    app.use(`/${config.prefixAdmin}/roles`, rolesRoute);
}

