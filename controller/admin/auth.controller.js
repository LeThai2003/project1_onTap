const Account = require("../../model/account.model")
const md5 = require("md5");
const systemConfig = require("../../config/system");

//[GET]/admin/auth/login
module.exports.login = (req, res) => {

    res.render("admin/pages/auth/login", {
        title: "Đăng nhập"
    });
}

//[POST]/admin/auth/login
module.exports.loginPost =async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        deleted: false,
    });

    console.log(user);

    if(!user)
    {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    // neu co email -> pass
    if(md5(password) != user.password)
    {
        req.flash("error", "Mật khẩu sai!");
        res.redirect("back");
        return;
    }

    // xet tai khoan co con active khong
    if(user.status != "active")
    {
        req.flash("error", "Tài khoản không hoạt động!");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);

    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}

//[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
};