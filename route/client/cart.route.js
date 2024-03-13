const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller");

router.get("/", controller.index);

router.post("/add/:id", controller.addPost);

router.get("/delete/:id", controller.delete);

router.get("/update/:productId/:quantity", controller.update);

module.exports = router;