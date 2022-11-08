const { Schema, model } = require('mongoose')

const imageSchema = new Schema(
    {
        encodedImage: {
            type: String,
        },
        imageName: {
        type: String
        }
    }
);



module.exports = imageSchema;