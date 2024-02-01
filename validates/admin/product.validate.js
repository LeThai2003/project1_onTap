module.exports.createPost = (req, res, next) => {
    if(!req.body.title)
    {
        req.flash("error", "Tiêu đề không được bỏ tróng");
        res.redirect("back");
        return;
    }
    if(req.body.title.length < 5)
    {
        req.flash("error", "Tiêu đề phải có độ dài lớn hơn 5");
        res.redirect("back");
        return;
    }

    next();
}