const { user } = require("../models/userModel");
const mongoose = require("mongoose");

const path = "mongodb+srv://chill:1@cluster0.60ra55a.mongodb.net/yemeklerim";

async function ConnectToDB() {
  try {
    await mongoose.connect(path);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function checkIfExists(mail) {
  var _user = await user.findOne({ mail: mail });
  if (_user !== null) return true;
  return false;
}

async function registerUser(data) {
  try {
    let isim = data.isim;
    let soy_isim = data.soy_isim;
    let mail = data.mail;
    let sifre = data.sifre;

    const newUser = new user({
      isim: isim,
      soy_isim: soy_isim,
      mail: mail,
      sifre: sifre,
    });
    await newUser.save();
  } finally {
  }
}

async function listDatabases() {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

const findAllUsers = async () => await user.find();

const findAllFoods = async (user_name) => {
  let _user = await user.findOne({ isim: user_name });
  return _user.yemekler;
};

const findUser = async (user_name, user_password) =>
  await user.findOne({ isim: user_name, sifre: user_password });

async function addFood(data) {
  try {
    if (data.yemek_url) {
      await user.updateOne({
        $push: {
          yemekler: {
            yemek_adi: data.yemek_adi,
            yemek_icerigi: data.yemek_icerigi,
            yemek_url: data.yemek_url,
          },
        },
      });
      return true;
    } else {
      await user.updateOne({
        $push: {
          yemekler: {
            yemek_adi: data.yemek_adi,
            yemek_icerigi: data.yemek_icerigi,
          },
        },
      });
      return true;
    }
  } catch (error) {
    return false;
  }
}

const getUser = async (user_name, user_password) =>
  await user.findOne({
    isim: user_name,
    sifre: user_password,
  });
var data = [];
const getFoodNames = async () => {
  var data = [];
  let yemek_adlari = await await user.find({}, "yemekler.yemek_adi");

  yemek_adlari[0].yemekler.forEach((item) => data.push(item.yemek_adi));

  return data;
};

const getFoodUrls = async () => {
  var data = [];
  let urls = await user.find({}, "yemekler.yemek_url");

  urls[0].yemekler.forEach((item) => data.push(item.yemek_url));

  return data;
};

const dbAddPP = async (data) => {
  await user.updateOne({ pp_url: data });
};

const get_pp_url = async () => {
  var data = [];
  let urls = await user.find({}, "pp_url");
  urls.forEach((item) => data.push(item.pp_url));
  return data;
};

const getUserDataForCards = async () => {
  let data = await user.find({}, "_id pp_url yemekler");
  return data;
};

const generateFoodData = async (user_id) => {
  let user = await user.findById(user_id);
  return user;
};

const addRecipeFormData = async (user_name, food_name, form_data) => {
  let _user = await user.updateOne(
    { isim: user_name },
    {
      $push: {
        yemekler: {
          yemek_adi: food_name,
          yemek_icerigi: form_data,
        },
      },
    }
  );
  console.log(_user);
};

module.exports = {
  ConnectToDB,
  listDatabases,
  checkIfExists,
  registerUser,
  findAllUsers,
  addFood,
  findUser,
  getUser,
  findAllFoods,
  getFoodNames,
  getFoodUrls,
  dbAddPP,
  get_pp_url,
  getUserDataForCards,
  generateFoodData,
  addRecipeFormData,
};
