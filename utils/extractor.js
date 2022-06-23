const puppeteer = require("puppeteer");
const { parse } = require("node-html-parser");
let browser, page, dom;

const start = async (url) => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(() => document.querySelector("*").outerHTML);
  dom = parse(data);
};

const valueExtractor = async () => {
  const price = parseInt(
    (
      dom.querySelector(".reinventPricePriceToPayMargin .a-offscreen") ||
      dom.querySelector(".apexPriceToPay .a-offscreen")
    )?.innerText
      .slice(1)
      .split(".")[0]
      .split(",")
      .join("")
  );
  return price;
};

const nameExtractor = async () => {
  let name = dom
    .querySelector(".product-title-word-break")
    ?.innerHTML.replace(/\&nbsp;/g, "")
    .replace(/\&amp;/g, "");
  name = name?.trim();
  return name;
};

const ratingExtractor = async () => {
  let rating = dom.querySelector(
    ".AverageCustomerReviews .a-size-base"
  )?.innerText;
  rating = rating?.split("\n")[0];
  let ratingCount = dom
    .querySelector(".averageStarRatingNumerical")
    ?.innerText.trim()
    .split(" ")[0]
    .split(",")
    .join("");
  return { rating, ratingCount };
};

const imageExtractor = () => {
  let imageUrl = dom.querySelector(".a-dynamic-image")?.getAttribute("src");
  return imageUrl;
};
const close = async () => {
  await browser.close();
};
const extractData = async (url) => {
  await start(url);
  const price = await valueExtractor();
  const name = await nameExtractor();
  const { rating, ratingCount } = await ratingExtractor();
  const imageUrl = await imageExtractor();
  await close();
  return { price, name, rating, ratingCount, imageUrl };
};

module.exports = {
  extractData,
  start,
  valueExtractor,
  nameExtractor,
  ratingExtractor,
  imageExtractor,
  close,
};
