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
  slug: {
    type: String,
  },
});

SongSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

//create the slug
function slugify(name) {
  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

module.exports = Song = mongoose.model("song", SongSchema);
