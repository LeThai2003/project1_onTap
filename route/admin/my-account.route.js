const express = require("express");
const router = express();
const controller = require("../../controller/admin/my-account.controller");
const validate = require("../../validates/admin/my-account.validate");
const multer  = require('multer')
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch("/edit", 
    upload.single('avatar'), 
    uploadCloud.uploadSingle,
    validate.edit,
    controller.editPatch
);

module.exports = router;