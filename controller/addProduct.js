const catchAsync = require("../utils/catchAsync");
const Product = require("../model/productModel");
const multer = require("multer");
const util = require("../utils/message");
const axios = require("axios");

require("dotenv").config("config.env");
// multer diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

exports.upload = multer({ storage: storage });

// create product
exports.createProduct = catchAsync(async (req, res, next) => {
  console.log("req", req.body);
  const config = {
    method: "post",
    url: ` ${process.env.BASE_URL}/admin/api/2023-10/products.json`,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ACCESSTOKEN,
    },
    data: req.body,
  };

  const responce = await axios(config);
  return util.successResponse(responce.data, res);
});

// get order
exports.getOrder = catchAsync(async (req, res, next) => {
  const orderId = req.query.orderId;
  const config = {
    method: "get",
    url: ` ${process.env.BASE_URL}/admin/api/2023-10/orders/${orderId}.json`,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ACCESSTOKEN,
    },
  };

  const responce = await axios(config);
  res.message = "Order data fetch successfully";
  return util.successResponse(responce.data, res);
});

// create order
exports.createOrder = catchAsync(async (req, res, next) => {
  const config = {
    method: "post",
    url: ` ${process.env.BASE_URL}/admin/api/2023-10/orders.json`,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ACCESSTOKEN,
    },
    data: req.body,
  };

  const responce = await axios(config);
  res.message = "Order create successfully.";
  return util.successResponse(responce.data, res);
});
