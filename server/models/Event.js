const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            required: true,
        },
        departments: [{
            type: Schema.Types.ObjectId,
            ref: 'Department',
        }],
        contactInfo: {
            type: String,
            required: true,
            trim: true,
        },
        contactName: {
            type: String,
            required: true,
        },
        eventDate: {
            type: Date,
            required: true,
        },
        eventState: {
            type: String,
            default: "planning",
        }
    }
);

eventSchema.plugin(uniqueValidator);

const Event = model('Event', eventSchema);

module.exports = Event;