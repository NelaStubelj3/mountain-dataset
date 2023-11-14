const express = require("express");
const router = express.Router();
const { MountainsAll } = require("../models");

router.get("/", async (req, res) => {
  const listOfMountainsAll = await MountainsAll.findAll();
  res.json(listOfMountainsAll);
});

router.post("/", async (req, res) => {
  try {
    const mountain = req.body;

    const createdMountain = await Mountains.create(mountain);

    res.json(createdMountain);
  } catch (error) {
    console.error("Error creating mountain:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
