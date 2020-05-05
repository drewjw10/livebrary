const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artist",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Song = mongoose.model("Song", SongSchema);
