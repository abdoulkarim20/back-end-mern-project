const UserModel = require('../models/user.model');
module.exports.signUp = async (req, res) => {
//   console.log(req.body);
  const { pseudo, email, password } = req.body; /*destructuration*/
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).send({ error });
  }
};
