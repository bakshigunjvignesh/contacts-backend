const express = require("express");

const userRoute = express.Router();

userRoute.post("/tokenCreation", (req, res) => {
  res.json({ message: "Token Creation" });
});

userRoute.post("/tokenValidation", (req, res) => {
  res.json({ message: "Token Validation" });
});

module.exports = userRoute;
