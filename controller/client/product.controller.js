//[GET]/products
module.exports.index = (req, res) => {
    res.render("client/pages/product/index.pug", {
        Title: "Products"
    });
};