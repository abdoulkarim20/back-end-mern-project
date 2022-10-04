const router = require('express').Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.getAllPost);
router.post('/', postController.createPost);
router.put('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.getDetailPost);
router.patch('/like-post/:id',postController.likePost);
router.patch('/unlike-post/:id',postController.unlikePost);
/*La route pour les commentaires*/
router.patch('/comment-post/:id',postController.commentPost);

module.exports = router;