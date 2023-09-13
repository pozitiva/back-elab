const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    imePrezime: { type: String, required: true },
    telefon: { type: String, required: true },
    adresa: { type: String, required: true },
    drzava: { type: String, required: true },
    napomena: String,
    torte: [String],
    kafe: [String],
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailSchema);
