const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const eventTaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
});

eventTaskSchema.plugin(uniqueValidator);

const EventTask = model("EventTask", eventTaskSchema);

module.exports = EventTask;
