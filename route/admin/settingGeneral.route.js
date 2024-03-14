const express = require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controller/admin/setting-general.controller");

router.get("/general", controller.settingsGeneral);

router.patch(
    "/general", 
    upload.single('logo'), 
    uploadCloud.uploadSingle,
    controller.settingsGeneralPost
);

module.exports = router;