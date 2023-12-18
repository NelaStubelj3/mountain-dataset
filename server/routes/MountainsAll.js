const express = require("express");
const router = express.Router();
const { MountainsAll } = require("../models");
const { route } = require("./Mountains");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const mountain = req.body;

    console.log(mountain);
    const createdMountain = await MountainsAll.create(mountain);

    res.status(201).json({
      status: "Created",
      message: "Mountain trail created successfully",
      response: createdMountain,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const listOfMountainTrails = await MountainsAll.findAll();
    res.json({
      status: "OK",
      message: "Fetched all mountain trails",
      response: listOfMountainTrails,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
      response: null,
    });
  }
});

router.get("/:trail_id", async (req, res) => {
  try {
    const mountainTrail = await MountainsAll.findAll({
      where: {
        trail_id: req.params.trail_id,
      },
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
    const mountainTrails = await MountainsAll.findAll({
      where: {
        difficulty: {
          [Op.iLike]: difficultyParam,
        },
      },
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
    const mountainsByCountry = await MountainsAll.findAll({
      where: {
        country: {
          [Op.iLike]: countryParam,
        },
      },
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
    const mountainTrailsByMountain = await MountainsAll.findAll({
      where: {
        mountain_name: {
          [Op.iLike]: mountainNameParam,
        },
      },
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

    const [updatedRowCount, updatedMountainTrail] = await MountainsAll.update(
      req.body,
      {
        where: {
          trail_id: trailId,
        },
        returning: true,
      }
    );
    if (updatedRowCount > 0) {
      res.status(200).json({
        status: "OK",
        message: "Mountain trail updated",
        response: updatedMountainTrail[updatedMountainTrail.length - 1],
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

router.delete("/:trail_id", async (req, res) => {
  try {
    const deletedMountainTrail = await MountainsAll.destroy({
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
