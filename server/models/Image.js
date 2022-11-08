const { Schema, model } = require('mongoose')

const imageSchema = new Schema(
    {
        encodedImage: {
            type: String,
            required: true
        },
        imageType: {
        type: String
        },
        imageName: {
        type: String
        }
    }
);



module.exports = imageSchema;