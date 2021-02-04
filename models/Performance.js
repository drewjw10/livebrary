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
  thumbnail: {
    type: String,
  },
  votesCount: {
    type: Number,
    default: 0,
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
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
});

PerformanceSchema.pre("save", function (next) {
  // assuming YouTube link is in correct format https://www.youtube.com/watch?v=MI_XU1iKRRc
  this.thumbnail = `http://i3.ytimg.com/vi/${
    this.link.split("=")[1]
  }/hqdefault.jpg`;
  next();
});

module.exports = Performance = mongoose.model("performance", PerformanceSchema);
