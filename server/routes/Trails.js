const express = require("express");
const router = express.Router();
const { Trails } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const trails = await Trails.findAll();
    res.json(trails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const trail = await Trails.findByPk(id);
    if (trail) {
      res.json(trail);
    } else {
      res.status(404).json({ error: "Trail not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/difficulty/:difficulty", async (req, res) => {
  const { difficulty } = req.params;
  try {
    const trailsByDifficulty = await Trails.findAll({
      where: { difficulty: difficulty },
    });
    res.json(trailsByDifficulty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/length/:minLength/:maxLength", async (req, res) => {
  const { minLength, maxLength } = req.params;
  try {
    console.log(minLength);
    const trailsInRange = await Trails.findAll({
      where: {
        length: {
          [Op.between]: [minLength, maxLength],
        },
      },
    });
    res.json(trailsInRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const trail = req.body;
  try {
    const newTrail = await Trails.create(trail);
    res.status(201).json(newTrail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newTrail = req.body;
  try {
    const updatedTrail = await Trails.update(newTrail, {
      where: { trail_id: id },
      returning: true,
    });
    if (updatedTrail[0] === 1) {
      res.json(updatedTrail[1][0]);
    } else {
      res.status(404).json({ error: "Trail not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrail = await Trails.destroy({
      where: { trail_id: id },
      returning: true,
    });
    if (deletedTrail === 1) {
      res.json({ message: "Trail deleted successfully" });
    } else {
      res.status(404).json({ error: "Trail not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
