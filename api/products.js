const express = require("express");
const router = express.Router();
const {
  AddProduct,
  GetAllProducts,
  GetProductById,
  AddEmailToProduct,
  DeleteProductById,
} = require("../controllers/Product");
const Product = require("../models/Product");
const { extractData } = require("../utils/extractor");

//@route POST /api/products
//@desc Add a product
//@access Public
router.post("/", AddProduct);

//@route GET /api/products
//@desc get all products
//@access Public
router.get("/", GetAllProducts);

//@route GET /api/products/:id
//@desc get product details of single product
//@access Public
router.get("/:id", GetProductById);

//@route POST /api/products/email/new
//@desc Add email to a particular product
//@access Public
router.post("/email/new", AddEmailToProduct);

//@route DELETE /api/products/:id
//@desc Delete a particular product
//@access Public
router.delete("/:id", DeleteProductById);

module.exports = router;
