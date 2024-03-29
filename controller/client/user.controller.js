const md5 = require("md5");
const generateHelper = require("../../helper/generate.helper");
const User = require("../../model/user.model");
const ForgotPassword = require("../../model/forgotPassword.model");
const mailHelper = require("../../helper/send-mail.helper"); 
const Cart = require("../../model/cart.model");

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

    await Cart.updateOne({
        _id: req.cookies.cartId,
    }, {
        user_id: user.id,
    });

    res.redirect("/");
}

//[GET]/user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}


//[GET]user/password/forgot
module.exports.forgotPassword = (req, res) => {

    res.render("client/pages/user/forgot-password", {
        title: "Quên mật khẩu",
    });
}

//[POST]user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {

    const email = req.body.email;

    const user = await User.findOne({
        email: email, 
        deleted: false,
    });

    if(!user)
    {
        req.flash("error", "Email sai!");
        res.redirect("back");
        return;
    }

    const otp = generateHelper.generateRandomNumber(8);

    const objectForgot = {
        email: email,
        otp: otp,
    };

    // ---luu thong tin vao database
    const record = new ForgotPassword(objectForgot);
    await record.save();

    //---gui ma otp tu dong
    const subject = `Mã OTP lấy lại lại mật khẩu`;
    const content = `Mã OTP của bạn là <b>${otp}</b>. Vui lòng không chia sẻ với bất cứ ai.`;

    mailHelper.sendMail(email, subject, content);


    res.redirect(`/user/password/otp?email=${email}`);
}

//[GET]user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
  
    res.render("client/pages/user/otp-password", {
      title: "Nhập mã OTP",
      email: email,
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const find = {
        email: email,
        otp: otp
    };

    const result = await ForgotPassword.findOne(find);

    if(!result) {
        req.flash("error", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect(`/user/password/reset`);
};

//[GET]user/password/reset
module.exports.resetPassword = async (req, res) =>{ 
    res.render("client/pages/user/reset-password", {
      title: "Tạo mật khẩu mới",
    });
};

//[GET]user/password/reset
module.exports.resetPasswordPost = async (req, res) =>{ 
    const tokenUser = req.cookies.tokenUser;
    const newPassword = req.body.password;

    await User.updateOne({
        tokenUser: tokenUser,
    }, {
        password: md5(newPassword),
    })

    res.redirect("/");
};

//[GET]user/info
module.exports.info = async (req, res) => {
    res.render("client/pages/user/info", {
      pageTitle: "Thông tin tài khoản",
    });
  };