const express = require("express");
const router = express.Router();
const { Mountains } = require("../models");

router.get("/", async (req, res) => {
  const listOfMountains = await Mountains.findAll();
  res.json(listOfMountains);
});

router.post("/", async (req, res) => {
  try {
    const mountain = req.body;

    console.log(mountain);

    console.log(mountain.mountain_name);
    const createdMountain = await Mountains.create(mountain);

    res.json(createdMountain);
  } catch (error) {
    console.error("Error creating mountain:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
