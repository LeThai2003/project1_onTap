const { model } = require("mongoose");
const Account = require("../../model/account.model");
const generateHelper = require("../../helper/generate.helper");
const Role = require("../../model/role.model");
const md5 = require('md5');
const systemConfig = require("../../config/system")

//[GET]/admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await Account.find(find);

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
        });
        record.role = role.title;
    }

    res.render("admin/pages/accounts/index", {
        title: "Trang tài khoản",
        records: records,
    })
};

//[GET]/admin/accounts/create
module.exports.create = async(req, res) => {
    const roles = await Role.find({
        deleted: false,
    })

    res.render("admin/pages/accounts/create", {
        title: "Tạo tài khoản",
        roles: roles,
    })
}

//[POST]/admin/accounts/create
module.exports.createPost =async (req, res) => {
    req.body.token = generateHelper.generateRandomString(30);
    req.body.password = md5(req.body.password);
    console.log(req.body)

    const record = new Account(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}