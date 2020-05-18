const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Song = require("../../models/Song");
const Artist = require("../../models/Artist");

// @route    POST api/songs/
// @desc     Create a song
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Song name is required").not().isEmpty(),
      check("artist", "Artist is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      console.error(errors);
    }

    const { name, artist } = req.body;

    try {
      let song = await Song.findOne({ name: name });
      let artistObj = await Artist.findOne({ name: artist });

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

      song = new Song({ name: name, artist: artistObj, user: req.user.id });
      await song.save();
      res.json(song);
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

module.exports = router;
