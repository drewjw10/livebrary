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

    const { venue, song, artist, link } = req.body;

    try {
      // Check if performance already exists

      const artistObj = await Artist.findOne({ name: artist });
      const songObj = await Song.findOne({ name: song, artist: artistObj._id });

      let performance = await Performance.findOne({
        venue: venue,
        song: songObj,
        link: link,
      });
      if (performance) {
        return res.status(400).send({ msg: "Performance already exists" });
      }

      performance = new Performance({
        venue: venue,
        song: songObj._id,
        link: link,
        user: req.user.id,
      });
      await performance.save();
      res.json({ song_slug: songObj.slug, artist_slug: artistObj.slug });
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
    const performances = await Performance.find().sort({ votesCount: -1 });
    const size = performances.length >= 10 ? 10 : performances.length;
    const topPerformances = performances.slice(0, size);
    let data = [];

    for (let i = 0; i < topPerformances.length; i++) {
      performance = topPerformances[i];
      const song = await Song.findById(performance.song.toString());
      const artist = await Artist.findById(song.artist.toString());
      const user = await User.findById(performance.user.toString());

      const { link, votesCount, date, thumbnail } = performance;
      let userVote = 0;
      if (req.body.user) {
        performance.votes.forEach((vote) => {
          if (vote.user === req.body.user.id) userVote = vote.value;
        });
      }

      data.push({
        venue: performance.venue,
        song: song.name,
        artist: artist.name,
        user: user.name,
        link: link,
        thumbnail: thumbnail,
        votesCount: votesCount,
        userVote: userVote,
        date: date,
        id: performance._id,
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

// @route    GET api/performances/song/:id
// @desc     Get a list of the performances for a song
// @access   Public

router.get("/song/:id", async (req, res) => {
  try {
    const song = await Song.findOne({ slug: req.params.id });
    const performances = await Performance.find({ song: song._id }).sort({
      votesCount: -1,
    });
    let data = [];

    for (let i = 0; i < performances.length; i++) {
      performance = performances[i];
      const song = await Song.findById(performance.song.toString());
      const artist = await Artist.findById(song.artist.toString());
      const user = await User.findById(performance.user.toString());

      const { link, votesCount, date, thumbnail } = performance;
      let userVote = 0;
      if (req.body.user) {
        performance.votes.forEach((vote) => {
          if (vote.user === req.body.user.id) userVote = vote.value;
        });
      }

      data.push({
        venue: performance.venue,
        song: song.name,
        artist: artist.name,
        user: user.name,
        link: link,
        thumbnail: thumbnail,
        votesCount: votesCount,
        userVote: userVote,
        date: date,
        id: performance._id,
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

      const { link, votesCount, date, thumbnail } = performance;

      data.push({
        performance: performance.venue,
        song: song.name,
        artist: artist.name,
        user: user.name,
        link: link,
        votesCount: votesCount,
        date: date,
        thumbnail: thumbnail,
        id: performance._id,
      });
    }
    res.json({
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/performances/:id
// @desc     Get a performance based on id
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    res.json(performance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/performances/vote/:id
// @desc     Vote on a performance based on id
// @access   Private

router.post("/vote/:id", auth, async (req, res) => {
  // req.body.user.id
  // req.body.index
  // req.body.voteValue
  // check if performance exists, then change performance.votes object accordingly
  // return req.body.index and the new performance.votes[user].voteCount

  try {
    let performance = await Performance.findById(req.params.id);
    if (!performance) {
      return res.status(400).json({ msg: "Performance not found" });
    }

    let userIndex = -1;
    for (let i = 0; i < performance.votes.length; i++) {
      console.log(
        `performance.votes.user: ${performance.votes[i].user}, req.user.id: ${req.user.id}`
      );
      if (performance.votes[i].user.toString() === req.user.id) userIndex = i;
    }
    if (userIndex === -1) {
      performance.votes.push({ user: req.user.id, value: req.body.voteValue });
      performance.votesCount += req.body.voteValue;
    } else {
      const previousVote = performance.votes[userIndex].value;
      performance.votes[userIndex].value = req.body.voteValue;
      if (previousVote === 0) performance.votesCount += req.body.voteValue;
      else if (previousVote === 1 && req.body.voteValue === 0)
        performance.votesCount -= 1;
      else if (previousVote === -1 && req.body.voteValue === 0)
        performance.votesCount += 1;
      else if (previousVote === -1 && req.body.voteValue === 1)
        performance.votesCount += 2;
      else if (previousVote === 1 && req.body.voteValue === -1)
        performance.votesCount -= 2;
    }
    await performance.save();
    res.json({ index: req.body.index });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Performance not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/performances/search
// @desc     Search through artist, song, performance objects for text
// @access   Public

router.get("/search/:text", async (req, res) => {
  try {
    text = req.params.text.toLowerCase();
    const artists = await Artist.find();
    const songs = await Song.find();
    let data = { artists: [], songs: [] };

    for (artist of artists) {
      if (artist.name.toLowerCase().indexOf(text) !== -1)
        data["artists"].push([artist.name, artist.slug]);
    }

    for (song of songs) {
      let artist = await Artist.findById(song.artist);
      if (song.name.toLowerCase().indexOf(text) !== -1)
        data["songs"].push([song.name, song.slug, artist.slug]);
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
