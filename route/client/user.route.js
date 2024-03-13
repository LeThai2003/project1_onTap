const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller");
const validate = require("../../validates/client/user.validate")

router.get("/register", controller.register);

router.post(
    "/register", 
    validate.register,
    controller.registerPost
);

router.get("/login", controller.login);

router.post(
    "/login", 
    validate.login,
    controller.loginPost
);

module.exports = router;