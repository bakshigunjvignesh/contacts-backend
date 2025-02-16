const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter User Name"],
    },
    userEmail: {
      type: String,
      required: [true, "Please enter User Email Address"],
      unique: [true, "Email address already exists"],
    },
    userPassword: {
      type: String,
      required: [true, "Please enter User Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
