module.exports.register = (req, res, next) => {

    if(!req.body.fullName)
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.email)
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password)
    {
        req.flash("error", "Mât khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}


module.exports.login = (req, res, next) => {

    if(!req.body.email)
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password)
    {
        req.flash("error", "Mât khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.forgotPassword = (req, res, next) => {

    if(!req.body.email)
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    
    next();
}

module.exports.otpPassword = (req, res, next) => {

    if(!req.body.otp)
    {
        req.flash("error", "OTP không được để trống!");
        res.redirect("back");
        return;
    }
    
    next();
}