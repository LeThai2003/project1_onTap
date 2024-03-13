const md5 = require("md5");
const generateHelper = require("../../helper/generate.helper");
const User = require("../../model/user.model");

//[GET]/user/register
module.exports.register = (req, res) => {

    res.render("client/pages/user/register", {
        title: "Đăng ký tài khoản",
    });
}

//[POST]/user/register
module.exports.registerPost = async (req, res) => {

    // fullName: String,
    // email: String,
    // password: String,
    // tokenUser: String,

    const email = req.body.email;
    const userExist = await User.findOne({
        email: email,
    });

    if(userExist)
    {
        req.flash("error", "Email trùng!");
        res.redirect("back");
        return;
    }
  
    const infoUser = {
        fullName: req.body.fullName,
        email: email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
    }

    const user = new User(infoUser);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

//[GET]/user/login
module.exports.login = (req, res) => {

    res.render("client/pages/user/login", {
        title: "Đăng nhập",
    });
}

//[POST]/user/login
module.exports.loginPost = async (req, res) => {

    console.log(req.body);

    const user = await User.findOne({
        email: req.body.email,
        deleted: false,
    });

    if(!user)
    {
        req.flash("error", "Email sai!");
        res.redirect("back");
        return;
    }
    
    if(md5(req.body.password) != user.password)
    {
        req.flash("error", "Mật khẩu sai!");
        res.redirect("back");
        return;
    }

    if(user.status != "active")
    {
        req.flash("error", "Tài khoản không hoạt động!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}