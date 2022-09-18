const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
/*Cette methode permete de verfier si un user est connecter*/
module.exports.checkedUserConnected = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                console.log('decoded token', decodedToken);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log('Current user is:', user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}
/*Cette methode permet d'evieter a un user si il se connecte une fois et ne pas se reconnecter a
chaque fois qu'il arrive dans le site tant que son token est valide*/
module.exports.requiredAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if (error) {
                console.log(error);
                res.status(200).send('Your have not a valide token');
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('NO TOKEN');
        res.status(400).send(`Your token has expired please SignIn with your login and password`);
    }
}