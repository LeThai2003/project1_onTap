const express = require("express");
const router = express();
const controller = require("../../controller/admin/product.controller");
const multer  = require('multer')
const storageHelper = require("../../helper/storageMulter.helper");
const validate = require("../../validates/admin/product.validate")

const upload = multer({ storage: storageHelper()})

router.get("/", controller.index);

router.patch("/changeStatus/:status/:id", controller.changeStatus);

router.patch("/changeMulti", controller.changeMulti);

router.patch("/delete/:id", controller.deleteOne);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'), 
    validate.createPost,
    controller.createPOST
);

router.get(
    "/edit/:id",
    controller.edit
)

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPATCH
)

router.get("/detail/:id", controller.detail)

module.exports = router;