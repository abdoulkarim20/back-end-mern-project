const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    posterId: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true,
        maxlength: 500
    },
    picture: {
        type: String,
    },
    video: {
        type: String
    },
    likers: {
        type: [String],
        require: true
    },
    commentaires: {
        type: [
            {
                commentaireId: String,
                commentairePseudo: String,
                text: String,
                timestamps: Number
            }
        ],
        require: true
    }
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('posts', postSchema);