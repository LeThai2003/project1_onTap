const systemConfig = require("../../config/system");
const Account = require("../../model/account.model");
const Role = require("../../model/role.model")

module.exports.requireAuth = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token)
    {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    try {
        const user = await Account.findOne({
            token: token,
            deleted: false,
            status: "active" 
        }).select("-password");

        if(!user)
        {
            res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
            return;
        }

        const role = await Role.findOne({
            _id: user.role_id
        })

        res.locals.user = user;
        res.locals.role = role;

        next();

    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
}