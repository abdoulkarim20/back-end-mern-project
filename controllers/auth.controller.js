const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErros } = require('../utils/errors.utils');

/*Generation du token par id user*/
const maxAge = 20 * 60 * 1000; /*La duree du token*/
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  //   console.log(req.body);
  const { pseudo, email, password } = req.body; /*destructuration*/
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).send({ error: signUpErrors(error) });
  }
};

/*La methode permettant de se connecter*/
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).send({ error: signInErros(error) });
  }
}
/*La fonction permettant de se deconnecter*/
module.exports.logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
