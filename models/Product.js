const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String
  },
  prices: [String],
  date: [Date],
  created_at: {
    type: Date,
  },
  minimum_value: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
  },
  rating_count: {
    type: Number,
  },
  emails: [String],
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
