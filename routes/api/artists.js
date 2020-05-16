const express = require("express");
const router = express.Router();
const Artist = require("../../models/Artist");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

// @route    GET api/artists
// @desc     Get a list of artists
// @access   Public
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find().populate("user", ["name", "avatar"]);
    res.json(artists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/artists
// @desc     Create an artist
// @access   Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    name = req.body.name;

    try {
      let artist = await Artist.findOne({ name: name });
      console.log(artist);

      if (artist) {
        return res.status(400).send("Artist already exists");
      }

      artist = new Artist({ name: name });

      await artist.save();
      res.json(artist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
