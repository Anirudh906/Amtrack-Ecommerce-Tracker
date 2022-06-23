const {
  extractData,
  start,
  valueExtractor,
  nameExtractor,
  ratingExtractor,
  imageExtractor,
  close,
} = require("./extractor");
require("dotenv").config();
const Product = require("../models/Product");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const updatePrices = async () => {
  let products = await Product.find({});

  products.forEach(async (product) => {
    await start(product.url);
    let price = await valueExtractor();
    const date = Date.now();
    let { rating, ratingCount } = await ratingExtractor();
    let imageUrl = await imageExtractor();
    let prices = product.prices;
    let dates = product.date;
    if (prices.length == 50) {
      prices = prices.splice(1);
      dates = dates.splice(1);
    }
    prices.push(price);
    dates.push(date);

    await Product.findOneAndUpdate(
      { url: product.url },
      {
        prices: prices,
        date: dates,
        rating: rating,
        rating_count: ratingCount,
        image_url: imageUrl,
      }
    );
    if (price <= product.minimum_value) {
      const minValue = price;
      await Product.findOneAndUpdate(
        { url: product.url },
        { minimum_value: minValue }
      );
      product.emails?.forEach((email) => {
        const mailHTML = `
             <p>Price change detected in the folllwing product</p>
             <strong>${product.name}</strong>
             <p>Latest price: <strong>₹${minValue}<strong></p>
             <p>Visit <a href=${product.url}>this link</a> to buy it now on Amazon.</p>
          `;
        let options = {
          from: "Amtrack <rohitt0896@gmail.com>",
          to: email,
          subject: "Price change detected",
          html: mailHTML,
        };
        transporter.sendMail(options, (err, data) => {
          if (err) {
            console.log(err);
            return console.log("Error occured");
          }
          console.log("Mail sent successfully");
        });
      });
    }
  });
};

module.exports = updatePrices;
