const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
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
/*cryptage du password avant de l'enregistrer dans la base de donnees*/
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next(); /*siginfie que c'est fini on passe au suivant*/
});
/*Fin extrait code permettant de hasher le mot de passe*/
module.exports = mongoose.model('users', userSchema);
