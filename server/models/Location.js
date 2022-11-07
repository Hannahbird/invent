const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const locationSchema = new Schema(
    {
        locationName:{ 
        type: String,
        required: true,
        index:true,
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        }
    }

)

locationSchema.index({ locationName: 1, company: 1 }, { unique: true });
locationSchema.plugin(uniqueValidator);
//maybe do a pre-save function here to auto generate the sign-up Link??

const Location = model('Location', locationSchema);

module.exports = Location;