const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 6,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

module.exports = mongoose.model("User", UserSchema);
