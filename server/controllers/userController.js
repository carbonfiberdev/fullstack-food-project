const {
  findUser,
  findAllUsers,
  registerUser,
  checkIfExists,
  addFood,
  findAllFoods,
  dbAddPP,
  getUserDataForCards,
  addRecipeFormData,
} = require("./dbController");

const findAllUsersController = async (req, res) => {
  let data = await findAllUsers();
  res.json(data);
};
const registerUserController = async (req, res) => {
  if (!(await checkIfExists(req.query.mail))) {
    await registerUser({
      isim: req.query.isim,
      soy_isim: req.query.soy_isim,
      mail: req.query.mail,
      sifre: req.query.sifre,
    });
    res.status(200).send("kullanıcı başarıyla oluşturuldu");
  } else {
    res.status(400).send("kullanıcı oluşturulamadı");
  }
};

const findFoods = async (req, res) => {
  if (req.session.authenticated) {
    try {
      let data = await findAllFoods(req.session.user_name);
      console.log(data);
      res.status(200).send(data);
    } catch (error) {
      res.status(403).send(error);
    }
  } else {
    res.status(403).send("hata");
  }
};

const updateUser = (req, res) => {};
const deleteUser = (req, res) => {};

const loginUser = async (req, res) => {
  const { isim, sifre } = req.body;
  if (isim && sifre) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      var user = await findUser(isim, sifre);
      if (user) {
        req.session.authenticated = true;
        req.session.user_name = isim;
        res.status(200).send(req.session);
      } else {
        res.status(403).send("hata");
      }
    }
  }
};

const addFoodd = async (req, res) => {
  const { _yemek_adi, _yemek_icerigi, _yemek_url } = req.body;
  console.log(req.session);
  if (req.session.authenticated) {
    if (_yemek_url) {
      var data = {
        yemek_adi: _yemek_adi,
        yemek_icerigi: _yemek_icerigi,
        yemek_url: _yemek_url,
      };
    } else {
      var data = {
        yemek_adi: _yemek_adi,
        yemek_icerigi: _yemek_icerigi,
      };
    }

    if (await addFood(data)) {
      res.status(200).send("yemek ekleme basarili");
    } else {
      res.status(403).send("hata");
    }
  } else {
    res.status(403).send("lütfen login olun");
  }
};

const auth = (req, res) => {
  if (req.session.authenticated) {
    req.session.touch();
    res.status(200).send(req.session.user_name);
  } else {
    res.status(403).send("hata");
  }
};

const generateFoodCart = async (req, res) => {
  var user_data = await getUserDataForCards();

  var userArr = [];

  user_data.forEach((item) => {
    userArr.push(item);
  });

  res.status(200).send(userArr);
};

const addPP = async (req, res) => {
  const { pp_url } = req.body;
  try {
    let data = await dbAddPP(pp_url);
    res.status(200).send(data);
  } catch (err) {
    res.status(403).send(err);
  }
};

const getFoodData = async (req, res) => {
  const { user_id } = req.user_id;
};

const recipeForm = async (req, res) => {
  const { food_name, food_url, form_data } = req.body;
  let user_name = req.session.user_name;
  await addRecipeFormData(user_name, food_name, food_url, form_data);
};

module.exports = {
  registerUserController,
  findAllUsersController,
  updateUser,
  deleteUser,
  loginUser,
  auth,
  addFoodd,
  findFoods,
  generateFoodCart,
  addPP,
  getFoodData,
  recipeForm,
};
