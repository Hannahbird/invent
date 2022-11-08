const { Schema, model } = require('mongoose')

const imageSchema = new Schema(
    {
        encodedImage: {
            type: String,
            required: true
        },
        imageName: {
        type: String
        }
    }
);



module.exports = imageSchema;