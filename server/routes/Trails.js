const express = require("express");
const router = express.Router();
const { Trails } = require("../models");

router.get("/", async (req, res) => {
  const listOfTrails = await Trails.findAll();
  res.json(listOfTrails);
});

router.post("/", async (req, res) => {
  try {
    const trail = req.body;

    const createdTrail = await Trails.create(trail);

    res.json(createdTrail);
  } catch (error) {
    console.error("Error creating trail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
