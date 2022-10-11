const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const uploadFile = multer();

router.get('/', postController.getAllPost);
router.post('/', uploadFile.single('file'), postController.createPost);
router.put('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.getDetailPost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);
/*La route pour les commentaires*/
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deletCommentPost);

module.exports = router;