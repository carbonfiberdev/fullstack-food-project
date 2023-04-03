var express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .get(userController.findAllUsersController)
  .post(userController.registerUserController)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.post("/login", userController.loginUser);
router.post("/add_food", userController.addFoodd);
router.post("/add_pp", userController.addPP);
router.post("/get_food_data", userController.getFoodData);

router.get("/find_foods", userController.findFoods);
router.get("/generate_food_cart", userController.generateFoodCart);
router.get("/auth", userController.auth);

module.exports = router;
