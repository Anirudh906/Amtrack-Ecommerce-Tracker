const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const schedule = require("node-schedule");
const updatePrices = require("./utils/updatePrices");
const path = require("path");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json({ extended: false }));

const URL = process.env.MONGO_URL;

mongoose
  .connect(URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

app.use("/api/products", require("./api/products"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const job = schedule.scheduleJob("00 00 * * 0-6", function () {
  updatePrices();
});
