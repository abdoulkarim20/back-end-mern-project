const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

/*La route pour authentification*/
router.post('/register', authController.signUp);

/*Les routes pour les crud users*/
router.get('/', userController.getAllUser);
router.get('/:id', userController.getOnUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteOneUser);

module.exports = router;
