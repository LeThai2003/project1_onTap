const md5= require("md5");
const systemConfig = require("../../config/system");
const Account = require("../../model/account.model");

//[GET]/admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index", {
        title: "Trang thông tin cá nhân",
    })
};

//[GET]/admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit", {
        title: "Trang chỉnh sửa thông tin cá nhân",
    })
};

//[PATCH]/admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;
    if(req.body.password)
    {
        req.body.password = md5(req.body.password);
    }
    else
    {
        delete req.body.password;
    }
    await Account.updateOne({
        _id: id, 
    }, req.body );

    res.redirect(`back`);
};