const Product = require("../models/Product");
const { extractData } = require("../utils/extractor");

const AddProduct = async (req, res) => {
  const { url } = req.body;
  const existingDocument = await Product.findOne({ url });
  if (existingDocument) {
    return res.status(400).send("Product already exists!");
  }
  const requiredData = await extractData(url);
  const prices = [requiredData.price];
  const date = [Date.now()];
  const newProduct = new Product({
    url: url,
    name: requiredData.name,
    image_url: requiredData.imageUrl,
    prices: prices,
    date: date,
    created_at: Date.now(),
    minimum_value: requiredData.price,
    rating: requiredData.rating,
    rating_count: requiredData.ratingCount,
    emails: [],
  });
  await newProduct.save();
  let products = await Product.find();
  res.status(200).send(products);
};

const GetAllProducts = async (req, res) => {
  let products = await Product.find();
  res.status(200).send(products);
};

const GetProductById = async (req, res) => {
  let product = await Product.find({ _id: req.params.id });
  res.status(200).send(product);
};
const AddEmailToProduct = async (req, res) => {
  let { id, email } = req.body;
  let emailsArr = await Product.find({ _id: id }).populate("emails");
  let emailsObj = emailsArr[0];
  if (emailsObj?.emails.includes(email)) {
    return res.status(400).send("Email already added !!");
  }
  let newEmails;
  if (emailsObj?.emails.length > 0) newEmails = [...emailsObj.emails, email];
  else newEmails = [email];
  await Product.findOneAndUpdate({ _id: id }, { emails: newEmails });
  res.status(200).send("Email added successfully!");
};

const DeleteProductById = async (req, res) => {
  let productRemove = await Product.findByIdAndDelete({ _id: req.params.id });
  if (!productRemove) {
    return res.status(400).send("Product doesn't exists!");
  }
  let products = await Product.find({});
  res.status(200).send(products);
};

module.exports = {
  AddProduct,
  GetAllProducts,
  GetProductById,
  AddEmailToProduct,
  DeleteProductById
};
