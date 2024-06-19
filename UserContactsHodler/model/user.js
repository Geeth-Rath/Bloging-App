const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema)