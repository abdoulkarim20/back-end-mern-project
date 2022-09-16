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
module.exports.getOnUser = (req, res) => {
  const userID = req.params.id;
  if (!objectID.isValid(userID))
    return res
      .status(400)
      .send(`Un utilisateur dont id est: ${userID} n'existe pas`);
  UserModel.findById(userID, (error, docs) => {
    if (!error) res.status(200).send(docs);
    else res.status(400).send(`error for getting detail for user: ${userID}`);
  }).select('-password');
};
/*La methode permettant de modifier un user*/
module.exports.updateUser = async (req, res) => {
  const userID = req.params.id;
  if (!objectID.isValid(userID))
    return res
      .status(400)
      .send(`Un utilisateur dont id est: ${userID} n'existe pas`);
  try {
    await UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          biographie: req.body.biographie,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
      // (error, docs) => {
      //   if (!error) return res.status(200).send(docs);
      //   if (error)
      //     return res.status(400).send(`Error for updating user ${error}`);
      // }
    )
      .then(docs => {
        return res.status(200).send(docs);
      })
      .catch(error => {
        return res.status(400).send({ error: error });
      });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
/*La methode permettant de supprimer un user*/
module.exports.deleteOneUser = async (req, res) => {
  const userID = req.params.id;
  if (!objectID.isValid(userID))
    return res
      .status(400)
      .send(`Un utilisateur dont id est: ${userID} n'existe pas`);
  try {
    await UserModel.deleteOne({ _id: userID }).exec();

    res.status(200).send({ message: 'User deleting with success' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
