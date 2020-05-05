const mongoose = require("mongoose");

PerformanceSchema = new mongoose.Schema({
  venue: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "song",
  },
  link: {
    type: String,
    required: true,
  },
  votesCount: {
    type: Number,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      value: {
        type: Number,
      },
    },
  ],
});

module.exports = Performance = mongoose.model("Performance", PerformanceSchema);
