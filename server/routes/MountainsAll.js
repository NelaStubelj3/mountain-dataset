const express = require("express");
const router = express.Router();
const { Mountains, Trails } = require("../models");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const {
      mountain_name,
      country,
      height,
      mountain_description,
      highest_peak,
      trail,
    } = req.body;

    const createdMountain = await Mountains.create({
      mountain_name,
      country,
      height,
      mountain_description,
      highest_peak,
    });

    trail.mountain_id = createdMountain.mountain_id;

    const createdTrail = await Trails.create(trail);

    res.status(201).json({
      status: "Created",
      message: "Mountain and trail created successfully",
      response: {
        mountain: createdMountain,
        trail: createdTrail,
      },
    });
  } catch (error) {
    console.error("Error creating mountain and trail:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const mountainsWithTrails = await Mountains.findAll({
      include: Trails,
    });

    res.json({ status: "OK", response: mountainsWithTrails });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});
router.get("/:trail_id", async (req, res) => {
  try {
    const mountainTrail = await Trails.findByPk(req.params.trail_id, {
      include: Mountains,
    });
    if (mountainTrail) {
      res.status(200).json({
        status: "OK",
        message: "Fetched mountain trail",
        response: mountainTrail,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "Mountain trail not found",
        response: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});
router.get("/difficulty/:difficulty", async (req, res) => {
  const difficultyParam = req.params.difficulty.toLowerCase();
  try {
    const mountainTrails = await Trails.findAll({
      where: {
        difficulty: {
          [Op.iLike]: difficultyParam,
        },
      },
      include: Mountains,
    });

    if (mountainTrails.length > 0) {
      res.json({
        status: "OK",
        message: `Fetched ${difficultyParam} mountain trails`,
        response: mountainTrails,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: `No ${difficultyParam} mountain trails found`,
        response: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});
router.get("/country/:country", async (req, res) => {
  try {
    const countryParam = req.params.country.toLowerCase();
    const mountainsByCountry = await Mountains.findAll({
      where: {
        country: {
          [Op.iLike]: countryParam,
        },
      },
      include: Trails,
    });

    if (mountainsByCountry.length > 0) {
      res.json({
        status: "OK",
        message: `Fetched mountains in ${countryParam}`,
        response: mountainsByCountry,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: `No mountains found in ${countryParam}`,
        response: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});
router.get("/mountain_name/:mountain_name", async (req, res) => {
  const mountainNameParam = req.params.mountain_name.toLowerCase();

  try {
    const mountainTrailsByMountain = await Mountains.findAll({
      where: {
        mountain_name: {
          [Op.iLike]: mountainNameParam,
        },
      },
      include: Trails,
    });

    if (mountainTrailsByMountain.length > 0) {
      res.json({
        status: "OK",
        message: `Fetched mountain trails for ${mountainNameParam}`,
        response: mountainTrailsByMountain,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: `No mountain trails found for ${mountainNameParam}`,
        response: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});
router.put("/:trail_id", async (req, res) => {
  try {
    const trailId = req.params.trail_id;

    const existingTrail = await Trails.findOne({
      where: {
        trail_id: trailId,
      },
      include: Mountains,
    });

    if (!existingTrail) {
      return res.status(404).json({
        status: "Not Found",
        message: "Mountain trail not found",
        response: null,
      });
    }

    await existingTrail.Mountain.update({
      mountain_name: req.body.mountain_name,
      country: req.body.country,
      height: req.body.height,
      mountain_description: req.body.mountain_description,
      highest_peak: req.body.highest_peak,
    });

    await existingTrail.update({
      trail_name: req.body.trail_name,
      trail_description: req.body.trail_description,
      difficulty: req.body.difficulty,
      length: req.body.length,
      elevation_gain: req.body.elevation_gain,
    });

    res.status(200).json({
      status: "OK",
      message: "Mountain trail updated",
      response: {
        mountain: existingTrail.Mountain,
        trail: existingTrail,
      },
    });
  } catch (error) {
    console.error("Error updating mountain and trail:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

router.delete("/:trail_id", async (req, res) => {
  try {
    const deletedMountainTrail = await Trails.destroy({
      where: {
        trail_id: req.params.trail_id,
      },
    });

    if (deletedMountainTrail > 0) {
      res.status(200).json({
        status: "OK",
        message: "Mountain trail deleted",
        response: deletedMountainTrail,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "Mountain trail not found",
        response: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});
module.exports = router;
