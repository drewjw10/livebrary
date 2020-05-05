const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validationResult, check } = require("express-validator/check");

const Performance = require("../../models/Performance");

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

      performance = new Performance({ venue: venue, song: song, link: link });
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
    const performances = await Performances.find().sort({ date: -1 });
    res.json(performances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
