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
  eventStartDate: {
    type: Date
  },
  eventEndDate: {
    type: Date
  },
  eventState: {
    type: String,
    default: "Planning",
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
