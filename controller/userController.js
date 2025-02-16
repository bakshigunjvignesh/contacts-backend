const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//desc User Registration
//@route POST api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  if (!userName || !userEmail || !userPassword) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const user = await User.findOne({ userEmail });
  if (user) {
    res.status(400);
    throw new Error("Email already in use");
  }
  // Hash the password and save in DB
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  console.log({ password: userPassword, hashPass: hashedPassword });

  const newUser = await User.create({
    userName,
    userEmail,
    userPassword: hashedPassword,
  });
  console.log(`User created: ${newUser}`);
  if (newUser) {
    console.log({
      message: "User ID Created successfully",
      _id: newUser._id,
      userEmail: newUser.userEmail,
    });
    res.status(201).json({
      message: "User ID Created successfully",
      _id: newUser._id,
      userEmail: newUser.userEmail,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//desc Login User
//@route POST api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail || !userPassword) {
    res.status(400);
    throw new Error("Email ID and Password are mandatory!");
  }
  const user = await User.findOne({ userEmail });
  // Compare password with the hashed password
  if (user && (await bcrypt.compare(userPassword, user.userPassword))) {
    const accessToken = jwt.sign(
      {
        userName: user.userName,
        email: user.userEmail,
        id: user.id,
      },
      process.env.ACCESS_TOKEN_STRING,
      { expiresIn: "1h" }
    );
    res.json({ message: "User Login successfully", token: accessToken });
  } else {
    res.status(400);
    throw new Error("Email or Password are required");
  }
});

//desc Current User info
//@route GET api/users/currentUser
//@access Private
const getCurrentUserInfo = asyncHandler(async (req, res) => {
  res.json({ message: "Current User Details", data: req.user });
});

//desc Delete User Info
// @route DELETE api/users/deleteUser
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
  const { userEmail } = req.body;
  const id = req.params.id;
  if (!userEmail) {
    res.status(400);
    throw new Error("Please provide user email");
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  console.log({ message: "User deleted successfully", data: user });
  res.json({ message: "User deleted successfully", data: user });
});

module.exports = { registerUser, loginUser, getCurrentUserInfo, deleteUser };
