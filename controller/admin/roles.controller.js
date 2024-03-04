const Role = require("../../model/role.model")
const systemConfig = require("../../config/system")

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false 
    });

    res.render("admin/pages/roles/index",{
        title: "Trang danh sách nhóm quyền",
        records: records
    });
};

//[GET] /admin/roles/create
module.exports.create = (req, res) => {
    
    res.render("admin/pages/roles/create",{
        title: "Thêm nhóm quyền",
    });
};

//[POST] /admin/roles/create
module.exports.createPost =async (req, res) => {
    const record = new Role(req.body);
    await record.save();
    req.flash("success", "Thêm nhóm quyền thành công");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
};

//[GET] /admin/roles/edit/:id
module.exports.edit = async(req, res) => {
    const data = await Role.findOne({
        _id: req.params.id,
        deleted: false
    });

    res.render("admin/pages/roles/edit",{
        title: "Chỉnh sửa nhóm quyền",
        data: data
    });
};

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async(req, res) => {
    await Role.updateOne({
        _id: req.params.id,
        deleted: false 
    }, req.body);
    res.redirect("back");
};

//[GET] /admin/roles/permissions
module.exports.permissions = async(req, res) => {
    const records = await Role.find({
        deleted: false
    });

    console.log(records)

    res.render("admin/pages/roles/permissions",{
        title: "Phân quyền",
        records: records
    });
};
//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async(req, res) => {
    const roles = JSON.parse(req.body.roles)
    for (const item of roles) {
        await Role.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        })
    }
    req.flash("success", "Cập nhật phân quyền thành công!");
    res.redirect("back");
};