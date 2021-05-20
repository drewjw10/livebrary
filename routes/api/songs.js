const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Song = require("../../models/Song");
const Artist = require("../../models/Artist");
const Performance = require("../../models/Performance");

// @route    POST api/songs/
// @desc     Create a song
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Song name is required").not().isEmpty(),
      check("artistSpotifyId", "Artist is required").not().isEmpty(),
      check("songSpotifyId", "Song is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      console.error(errors);
    }

    const { name, artistSpotifyId, songSpotifyId } = req.body;

    try {
      let song = await Song.findOne({ name: name });
      let artistObj = await Artist.findOne({ spotifyId: artistSpotifyId });

      if (song) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Song already exists" }] });
      }

      if (!artistObj) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Artist does not exist" }] });
      }

      song = new Song({
        name: name,
        artist: artistObj,
        user: req.user.id,
        spotifyId: songSpotifyId,
      });
      await song.save();
      res.json({ song: song, artist_slug: artistObj.slug });
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route    GET api/songs/:id
// @desc     Get a song by id
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.json(song);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    DELETE api/songs/:id
// @desc     Delete a song
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  // TODO: delete performance objects associated with song
  try {
    let song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(400).json({ msg: "Song not found" });
    }
    if (song.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await song.remove();
    res.json({ msg: "Song removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Song not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/songs/
// @desc     Get a list of all songs
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const songs = await Song.find().sort({ date: -1 });
    res.json(songs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/songs/artist/:id
// @desc     Get a list of all songs by an artist id
// @access   Public

router.get("/artist/:id", async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.params.id });
    res.json(songs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/songs/artist/:artist_slug/:slug
// @desc     Get a song and its performances by artist slug and song slug
// @access   Public

router.get("/slug/:artist_slug/:slug", async (req, res) => {
  try {
    const artist = await Artist.findOne({ slug: req.params.artist_slug });
    if (!artist) {
      return res.status(400).json({ msg: "Artist not found" });
    }
    const song = await Song.findOne({
      artist: artist._id,
      slug: req.params.slug,
    });
    if (!song) {
      return res.status(400).json({ msg: "Song not found" });
    }
    const performances = await Performance.find({ song: song._id }).sort({
      date: -1,
    });
    res.json({
      song: { name: song.name, artist: artist.name },
      performances: performances,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
