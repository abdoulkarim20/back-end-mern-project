const UserModel = require('../models/user.model');
const objectID = require('mongoose').Types.ObjectId;
/*La methode permettant de recuperer tous les users*/
module.exports.getAllUser = async (req, res) => {
  try {
    const password = req.body.passord;
    const users = await UserModel.find().select(
      '-password'
    ); /*pour exclure les donnees qu'on ne souhaite pas voir*/
    // .select('-email');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(`error for getting all users:  ${error}`);
  }
};
/*La methode permettant de recuperer un user*/
module.exports.getOnUser = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!objectID.isValid(userID))
      return res
        .status(400)
        .send(`Un utilisateur dont id est: ${userID} n'existe pas`);
    await UserModel.findById(userID, (error, docs) => {
      if (!error) res.status(200).send(docs);
    }).select('-password');
  } catch (error) {
    res.status(400).send(`error for getting detail for user: ${userID}`);
  }
};
