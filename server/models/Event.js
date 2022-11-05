const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const EventTask = require("./EventTask");
const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
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
  },
  active: {
    type: Boolean,
    default: true
  }
});

eventSchema.plugin(uniqueValidator);
eventSchema.post("remove", function (doc, next) {
  EventTask.deleteMany({ eventId: this._id }).exec();
  next();
});
const Event = model("Event", eventSchema);

module.exports = Event;
