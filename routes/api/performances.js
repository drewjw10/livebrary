const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validationResult, check } = require("express-validator");

const Performance = require("../../models/Performance");
const Song = require("../../models/Song");
const Artist = require("../../models/Artist");
const User = require("../../models/User");

// @route    POST api/performances
// @desc     Create a performance object
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("venue", "Venue is required").not().isEmpty(),
      check("song", "Song is required").not().isEmpty(),
      check("link", "Link is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.json() });
    }

    const { venue, song, link } = req.body;

    try {
      // Check if performance already exists
      let performance = await Performance.findOne({
        venue: venue,
        song: song,
        link: link,
      });
      if (performance) {
        return res.status(400).send({ msg: "Song already exists" });
      }

      performance = new Performance({
        venue: venue,
        song: song,
        link: link,
        user: req.user.id,
      });
      await performance.save();
      res.json(performance);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route    DELETE api/performances/:id
// @desc     Delete a performance
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let performance = await Performance.findById(req.params.id);
    if (!performance) {
      return res.status(400).json({ msg: "Performance not found" });
    }
    if (performance.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await performance.remove();
    res.json({ msg: "Performance removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Performance not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/performances/
// @desc     Get a list of all performances
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const performances = await Performance.find().sort({ date: -1 });
    res.json(performances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/performances/top
// @desc     Get a list of the top ten performances
// @access   Public

router.get("/top", async (req, res) => {
  try {
    const performances = await Performance.find().sort({ votesCount: 1 });
    const size = performances.length >= 10 ? 10 : performances.length;
    const topPerformances = performances.slice(0, size);
    let data = [];

    for (let i = 0; i < topPerformances.length; i++) {
      performance = topPerformances[i];
      const song = await Song.findById(performance.song.toString());
      const artist = await Artist.findById(song.artist.toString());
      const user = await User.findById(performance.user.toString());

      const { link, votesCount, date } = performance;

      data.push({
        performance: performance.venue,
        song: song.name,
        artist: artist.name,
        user: user.name,
        link: link,
        votesCount: votesCount,
        date: date,
      });
    }
    res.json({
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/performances/recent
// @desc     Get a list of the nine most recent performances
// @access   Public

router.get("/recent", async (req, res) => {
  try {
    const performances = await Performance.find().sort({ date: -1 });
    const size = performances.length >= 9 ? 9 : performances.length;
    const topPerformances = performances.slice(0, size);
    let data = [];

    for (let i = 0; i < topPerformances.length; i++) {
      performance = topPerformances[i];
      const song = await Song.findById(performance.song.toString());
      const artist = await Artist.findById(song.artist.toString());
      const user = await User.findById(performance.user.toString());

      const { link, votesCount, date } = performance;

      data.push({
        performance: performance.venue,
        song: song.name,
        artist: artist.name,
        user: user.name,
        link: link,
        votesCount: votesCount,
        date: date,
      });
    }
    res.json({
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
