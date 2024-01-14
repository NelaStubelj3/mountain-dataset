const express = require("express");
const router = express.Router();
const { Mountains } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const mountains = await Mountains.findAll();
    res.json(mountains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mountain = await Mountains.findByPk(id);
    if (mountain) {
      res.json(mountain);
    } else {
      res.status(404).json({ error: "Mountain not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/country/:country", async (req, res) => {
  const { country } = req.params;
  try {
    const mountainsInCountry = await Mountains.findAll({
      where: { country: country },
    });
    res.json(mountainsInCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/height/:minHeight/:maxHeight", async (req, res) => {
  const { minHeight, maxHeight } = req.params;
  try {
    console.log(minHeight + " " + maxHeight);
    const mountainsInRange = await Mountains.findAll({
      where: {
        height: {
          [Op.between]: [minHeight, maxHeight],
        },
      },
    });
    res.json(mountainsInRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const mountain = req.body;
  try {
    const newMountain = await Mountains.create(mountain);
    res.status(201).json(newMountain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newMountain = req.body;
  try {
    console.log(newMountain);
    const updatedMountain = await Mountains.update(newMountain, {
      where: { mountain_id: id },
      returning: true,
    });
    if (updatedMountain[0] === 1) {
      res.json(updatedMountain[1][0]);
    } else {
      res.status(404).json({ error: "Mountain not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMountain = await Mountains.destroy({
      where: { mountain_id: id },
    });
    if (deletedMountain === 1) {
      res.json({ message: "Mountain deleted successfully" });
    } else {
      res.status(404).json({ error: "Mountain not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
