const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const uploadFile = multer();

/*La route pour authentification*/
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

/*Les routes pour les crud users*/
router.get('/', userController.getAllUser);
router.get('/:id', userController.getOnUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteOneUser);

/*Upload image pour en faire le profile de user*/
router.post('/upload', uploadFile.single('file'), uploadController.uploadProfile);

module.exports = router;
