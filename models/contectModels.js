const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter Email Address"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
