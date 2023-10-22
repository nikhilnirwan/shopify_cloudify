const express = require("express");
const addProductCon = require("../controller/addProduct");
const router = express.Router();

router.post("/addProduct", addProductCon.createProduct);
router.post("/order", addProductCon.createOrder);

router.get("/getOrder", addProductCon.getOrder);

module.exports = router;
