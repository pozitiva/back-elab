const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require("body-parser");
require("./userDetails");

require("./db")();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const User = mongoose.model("UserInfo");

app.post("/poruci", async (req, res) => {
  const { imePrezime, telefon, adresa, drzava, napomena, torte, kafe } =
    req.body;
  const data = req.body;

  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync("data.json", "utf8"));
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }

  existingData.push(data);
  fs.writeFileSync(
    "data.json",
    JSON.stringify(existingData, null, 2),
    "utf8",
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  try {
    await User.create({
      imePrezime,
      telefon,
      adresa,
      drzava,
      napomena,
      torte,
      kafe,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
