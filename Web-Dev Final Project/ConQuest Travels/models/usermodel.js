const mongoose = require("mongoose");
const Joi = require("joi");
var bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user",
      },
});
var User = mongoose.model("User", userSchema);

module.exports = User;
