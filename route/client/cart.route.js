const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller");

router.get("/add/:id", controller.addPost);

module.exports = router;