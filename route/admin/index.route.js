const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const rolesRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const myaccountRoute = require("./my-account.route");
const config = require("../../config/system");
const AuthMiddleware = require("../../middlewares/admin/auth.middlewares");

module.exports = (app) => {
    app.use(
        `/${config.prefixAdmin}/dashboard`, 
        AuthMiddleware.requireAuth, 
        dashboardRoute
    );

    app.use(`/${config.prefixAdmin}/products`, 
        AuthMiddleware.requireAuth, 
        productRoute
    );

    app.use(`/${config.prefixAdmin}/products-category`, 
        AuthMiddleware.requireAuth,  
        productCategoryRoute
    );

    app.use(`/${config.prefixAdmin}/roles`,
        AuthMiddleware.requireAuth,  
        rolesRoute
    );

    app.use(`/${config.prefixAdmin}/accounts`,
        AuthMiddleware.requireAuth,  
        accountRoute
    );

    app.use(`/${config.prefixAdmin}/my-account`,
        AuthMiddleware.requireAuth,  
        myaccountRoute
    );

    app.use(`/${config.prefixAdmin}/auth`, authRoute)
}

