const express = require("express");
const router = express();
const controller = require("../../controller/admin/dashboard.controller");

router.get("/", controller.index);

module.exports = router;