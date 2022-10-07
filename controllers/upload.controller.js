const UserModel = require('../models/user.model');
const fileSysteme = require('fs');
const { promisify } = require('util');
const { uploadErrrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfile = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error('Invalid file')
        if (req.file.size > 500000) throw Error('max size')

    } catch (error) {
        return res.status(400).json({ error: uploadErrrors(error) })
    }
    const fileName = req.body.name + ".jpg";
    try {
        await pipeline(
            req.file.stream,
            fileSysteme.createWriteStream(
                `${__dirname}/../client/public/uploads/profil/${fileName}`
            )
        ).then((docs) => {
            return res.status(200).json("file saved", docs)
        }).catch((error) => {
            return res.status(400).json({ error })
        })

    } catch (error) {
        return res.status(400).json({ error })
    }
}