const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isim: {
    type: String,
    required: true,
  },
  soy_isim: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  sifre: {
    type: String,
    required: true,
  },
  pp_url: {
    type: String,
    required: false,
  },
  yemekler: [
    {
      yemek_adi: String,
      yemek_icerigi: String,
      yemek_url: {
        type: String,
        requires: false,
      },
    },
  ],
});

const user = mongoose.model("users", userSchema);
module.exports = { user };
