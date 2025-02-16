const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUserInfo,
  deleteUser,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/current", validateToken, getCurrentUserInfo);
userRoute.delete("/deleteUser/:id", deleteUser);

module.exports = userRoute;
