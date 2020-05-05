const mongoose = require("mongoose");

ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Artist = mongoose.model("Artist", ArtistSchema);
