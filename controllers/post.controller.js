const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
module.exports.getAllPost = async (req, res) => {
    try {
        await PostModel.find()
            .sort({ createdAt: -1 })
            .then((docs) => {
                return res.status(200).json({ docs });
            }).catch((error) => {
                return res.status(400).json({ error: error })
            })

    } catch (error) {
        return res.status(500).send(`Error for getting all post ${error}`)
    }

}
module.exports.createPost = async (req, res) => {
    try {
        const { posterId, message, video, likers, commentaires } = req.body;
        const newPost = await PostModel.create({ posterId, message, video, likers, commentaires })
            .then((docs) => {
                return res.status(200).json({ docs });
            })
            .catch((error) => {
                return res.status(400).json({ error: error })
            })

    } catch (error) {
        return res.status(500).send(`error for creating post`);
    }

}
module.exports.editPost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).json(`Un poste avec cet identifiant ${postId} n'existe pas`);
    }
    try {
        const postUpdated = {
            message: req.body.message
        }
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: postUpdated },
            { new: true }
        )
            .then((docs) => {
                return res.status(200).json({ docs });
            })
            .then((error) => {
                return res.status(400).json({ error: error })
            })

    } catch (error) {
        return res.status(500).send(`Error for updating post`);
    }

}
module.exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).json(`Un poste avec cet identifiant ${postId} n'existe pas`);
    }
    try {
        await PostModel.findByIdAndDelete(postId)
            .then((docs) => {
                return res.status(200).json(docs.id);
            })
            .catch((error) => {
                return res.status(400).send({ error: error });
            })

    } catch (error) {
        return res.status(500).send(`Error for deleting post`);
    }

}
module.exports.getDetailPost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).json(`Un poste avec cet identifiant ${postId} n'existe pas`);
    }
    try {
        await PostModel.findById(postId)
            .then((docs) => {
                return res.status(200).json({ docs });
            })
            .catch((error) => {
                return res.status(400).json({ error })
            })
    } catch (error) {
        return res.status(500).send(`Error for geting detail post`);
    }

}
/*Gestion des like et unlike poste*/
module.exports.likePost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).json(`Un poste avec cet identifiant ${postId} n'existe pas`);
    }
    try {
        await PostModel.findByIdAndUpdate(
            postId,
            {
                $addToSet: { likers: req.body.id }/*l'identifiant de user qui a liker le poste*/
            },
            { new: true }
        ).then((docs) => {
            return res.status(200).json({ docs })
        }).catch((error) => {
            return res.status(400).json({ message: error })
        })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}
module.exports.unlikePost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).json(`Un poste avec cet identifiant ${postId} n'existe pas`);
    }
    try {
        await PostModel.findByIdAndUpdate(
            postId,
            {
                $pull: { likers: req.body.id }/*l'identifiant de user qui a liker le poste*/
            },
            { new: true }
        ).then((docs) => {
            return res.status(200).json({ docs })
        }).catch((error) => {
            return res.status(400).json({ message: error })
        })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}
module.exports.commentPost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).json(`Un poste avec cet identifiant ${postId} n'existe pas`);
    }
    try {
        await PostModel.findByIdAndUpdate(
            postId,
            {
                $push: {
                    commentaires: {
                        commentaireId: req.body.commentaireId,
                        commentairePseudo: req.body.commentairePseudo,
                        text: req.body.text,
                        timestamps: new Date().getTime()
                    }
                }
            },
            { new: true }
        ).then((docs) => {
            return res.status(200).json({ docs })
        }).catch((error) => { return res.status(400).json({ message: error }) })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}