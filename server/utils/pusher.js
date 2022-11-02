const Pusher = require("pusher");
require("dotenv").config();
const pusher = new Pusher({
  appId: "1500344",
  key: "b4bd3ba699f2fde524c6",
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true,
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world",
// });

module.exports = pusher;
