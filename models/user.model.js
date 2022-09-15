const mongoose = require('mongoose');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validator: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 1024,
    },
    biographie: {
      type: String,
      max: 1024,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('users', userSchema);
