const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validator: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 1024,
    },
    picture: {
      type: String,
      minlength: 3,
      maxlength: 200,
    },
    biographie: {
      type: String,
      maxlength: 1024,
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

/*Decripter le mot de passe afin que user puisse se connecter avec son mot de passe format normal*/
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
}
module.exports = mongoose.model('users', userSchema);
