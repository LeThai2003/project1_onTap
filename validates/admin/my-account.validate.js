const Account = require("../../model/account.model")

module.exports.edit = async (req, res, next) => {
    // console.log(res.locals.user);
    const emailOriginal = res.locals.user.email;

    if(!req.body.fullname)
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

    const user = await Account.findOne({
        email: req.body.email, 
    });

    if((emailOriginal != req.body.email) && user) // email thay doi va trung
    {
        req.flash("error", "Email trùng!");
        res.redirect("back");
        return;
    }

    next();
}