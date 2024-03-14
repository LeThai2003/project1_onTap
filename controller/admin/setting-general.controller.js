const SettingGeneral = require("../../model/settings-general.model");

//[GET]/admin/setting/general
module.exports.settingsGeneral = async (req, res) => {
    const settingsGeneral = await SettingGeneral.find({});

    console.log(settingsGeneral);

    res.render("admin/pages/setting-general/index", {
        title: "Trang cài đặt chung",
        settingsGeneral: settingsGeneral,
    });
}

//[PATCH]/admin/setting/general
module.exports.settingsGeneralPost = async (req, res) => {
    const settingsGeneral = await SettingGeneral.findOne({});

    if(settingsGeneral) 
    {
        await SettingGeneral.updateOne({
            _id: settingsGeneral.id
        }, req.body);
    } 
    else 
    {
        const record = new SettingGeneral(req.body);
        await record.save(); 
    }
    
    res.redirect("back");
}